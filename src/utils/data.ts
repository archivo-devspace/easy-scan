const getUniqueId = () => {
  const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return uniqueId;
};

const DataUtils = {
  getUniqueId,
};

export default DataUtils;
