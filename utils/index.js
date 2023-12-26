const trimKeyToBase = (key, base) => {
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  const baseIndex = key.indexOf(baseWithSlash);

  return baseIndex !== -1 ? key.substring(0, baseIndex + baseWithSlash.length) : key;
};

const createLink = (protocol, hostname, port, urlPath) => {
  return `${protocol}://${hostname}:${port}${urlPath}`;
};

module.exports = { trimKeyToBase, createLink };
