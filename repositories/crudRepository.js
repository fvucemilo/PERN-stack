const { sequelize } = require('../models');
const logger = require('../config/logger');

/**
 * Creates a new entity for the specified model with the given data.
 *
 * @param {object} model - Sequelize model.
 * @param {object} data - Data to create the entity with.
 * @returns {Promise<object>} - Promise that resolves to the created entity.
 * @throws {object} - Error object with code and message properties if an error occurs.
 */
const createEntity = async (model, data) => {
  let t = await sequelize.transaction();
  try {
    const newEntity = await model.create(data, { transaction: t });
    await t.commit();

    return newEntity;
  } catch (err) {
    if (t) await t.rollback();
    logger.error(err.message);

    throw {
      code: err.code,
      message: `An error occurred while creating an entity for model ${model.name}.`,
    };
  }
};

/**
 * Retrieves all entities for the specified model.
 *
 * @param {object} model - Sequelize model.
 * @returns {Promise<Array<object>>} - Promise that resolves to an array of entities.
 * @throws {object} - Error object with code and message properties if an error occurs.
 */
const getAllEntities = async (model) => {
  try {
    return await model.findAll();
  } catch (err) {
    logger.error(err.message);

    throw {
      code: err.code,
      message: `An error occurred while fetching entities for model ${model.name}.`,
    };
  }
};

/**
 * Retrieves an entity for the specified model based on ID or a where clause.
 *
 * @param {object} model - Sequelize model.
 * @param {number} [id] - ID of the entity to retrieve.
 * @param {object} [where] - Where clause to filter the entity.
 * @returns {Promise<object>} - Promise that resolves to the retrieved entity.
 * @throws {object} - Error object with code and message properties if an error occurs.
 */
const getEntity = async (model, id, where) => {
  try {
    if (id) {
      return await model.findByPk(id);
    } else if (where) {
      return await model.findOne({ where });
    } else {
      const error = 'Invalid parameters. Provide either an ID or a "where" object';
      logger.error(error);

      throw {
        code: 401,
        message: error,
      };
    }
  } catch (err) {
    logger.error(err.message);

    throw {
      code: err.code,
      message: `An error occurred while fetching an entity for model ${model.name}.`,
    };
  }
};

/**
 * Updates an entity for the specified model based on ID and updates.
 *
 * @param {object} model - Sequelize model.
 * @param {number} id - ID of the entity to update.
 * @param {object} updates - Updates to apply to the entity.
 * @returns {Promise<object>} - Promise that resolves to the updated entity.
 * @throws {object} - Error object with code and message properties if an error occurs.
 */
const updateEntity = async (model, id, updates) => {
  let t = await sequelize.transaction();
  try {
    const entity = await model.findByPk(id, { transaction: t });

    if (!entity) throw { code: 404, message: `${model.name} not found.` };

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) entity[key] = updates[key];
    });

    const updatedEntity = await entity.save({ transaction: t });
    await t.commit();

    return updatedEntity;
  } catch (err) {
    if (t) await t.rollback();
    logger.error(err.message);

    throw {
      code: err.code,
      message: `An error occurred while updating an entity for model ${model.name}.`,
    };
  }
};

/**
 * Deletes an entity for the specified model based on ID.
 *
 * @param {object} model - Sequelize model.
 * @param {number} id - ID of the entity to delete.
 * @throws {object} - Error object with code and message properties if an error occurs.
 */
const deleteEntity = async (model, id) => {
  let t = await sequelize.transaction();
  try {
    const entity = await model.findByPk(id, { transaction: t });

    if (!entity) throw { code: 404, message: `${model.name} not found.` };

    await entity.destroy({ transaction: t });
    await t.commit();
  } catch (err) {
    if (t) await t.rollback();
    logger.error(err.message);

    throw {
      code: err.code,
      message: `An error occurred while deleting an entity for model ${model.name}.`,
    };
  }
};

module.exports = {
  createEntity,
  getAllEntities,
  getEntity,
  updateEntity,
  deleteEntity,
};
