const getUniqueFileName = (fileName: string) => {
  const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${uniquePrefix}-${fileName}`;
};

const FileUtils = {
  getUniqueFileName
}

export default FileUtils