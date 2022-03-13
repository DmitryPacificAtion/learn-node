const fs = require("fs");

module.exports = saveToFile = (filePath, products) => {
  fs.writeFile(filePath, JSON.stringify(products), (error) => {
    if (error) {
      console.error(error);
    }
  });
};
