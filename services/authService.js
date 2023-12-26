const userRepository = require('../repositories/userRepository');
const emailService = require('./emailService');
const { comparePassword, signJWT, hashPasswordSync, generateRandomHexString } = require('../utils/crypto');

const login = async (usernameOrEmail, password) => {
  try {
    const user = await userRepository.getUserByUsernameOrEmail(usernameOrEmail);

    if (!user) throw { code: 404, message: 'User not found.' };
    if (!(await comparePassword(password, user.password))) throw { code: 401, message: 'Incorrect password.' };
    if (!user.isVerified)
      throw {
        code: 403,
        message: 'Account not verified. Please verify your account to access this resource.',
      };

    const userUsersRolesOrganizations = await user.getUsersRolesOrganizations();
    const userRolesOrganizationsPermissions = await Promise.all(
      userUsersRolesOrganizations.map(async (userRoleOrg) => {
        const role = await userRoleOrg.getRole();
        const organization = await userRoleOrg.getOrganization();
        const permissions = await role.getPermissions();

        return {
          id: user.id,
          organizationId: organization.id,
          roles: [
            {
              id: role.id,
              slug: role.slug,
              description: role.description,
            },
          ],
          permissions: permissions.map((permission) => ({
            id: permission.id,
            slug: permission.slug,
            description: permission.description,
          })),
        };
      })
    );
    const roles = userRolesOrganizationsPermissions
      .flatMap((item) => item.roles)
      .map((role) => role.slug);
    const permissions = userRolesOrganizationsPermissions
      .flatMap((item) => item.permissions)
      .map((permission) => permission.slug);

    const tokenData = {
      fullName: `${user.firstName} ${user.lastName}`,
      username: user.username,
      email: user.email,
      id: user.id,
      organizationId: userRolesOrganizationsPermissions[0].organizationId,
      roles,
      permissions,
    };

    return signJWT(tokenData, '1800s');
  } catch (err) {
    throw { code: err.code, message: err.message };
  }
};

const resetPassword = async (usernameOrEmail, protocol, hostname) => {
  try {
    const user = await userRepository.getUserByUsernameOrEmail(usernameOrEmail);
    const resetToken = generateRandomHexString(32, 'hex');

    if (!user) throw { code: 404, message: 'User not found.' };
    if (!user.isVerified)
      throw {
        code: 403,
        message: 'Account not verified. Please verify your account to access this resource.',
      };

    await userRepository.updateUser(user.id, { resetToken: resetToken });
    await emailService.sendResetPasswordEmail(user.email, resetToken, protocol, hostname);

    return { message: 'Password link send successfully', data: { success: true } };
  } catch (err) {
    throw { code: err.code, message: err.message };
  }
};

const resetPasswordToken = async (resetToken, password) => {
  try {
    const hash = hashPasswordSync(password, 10);
    const user = await userRepository.getUser(null, { resetToken: resetToken });

    if (!user) throw { code: 404, message: 'User not found.' };

    await userRepository.updateUser(user.id, { resetToken: null, password: hash });

    return { message: 'Password changed successfully', data: { success: true } };
  } catch (err) {
    throw { code: err.code, message: err.message };
  }
};

module.exports = {
  login,
  resetPassword,
  resetPasswordToken,
};
