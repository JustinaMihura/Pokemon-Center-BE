const path = require("path");
const fs = require("fs");

module.exports = (sequelize) => {

    const loadMainModels = path.join(__dirname, "../src/Models/Main Tables");
    const loadJoinModels = path.join(__dirname, "../src/Models/Join Tables");


    const loadModels = (folderPath) => {

        const files = fs.readdirSync(folderPath);
    
        files.forEach((file) => {

          const fullPath = path.join(folderPath, file);
          const stats = fs.statSync(fullPath); 
    
          if (stats.isDirectory()) {

            loadModels(fullPath);

          } else if (stats.isFile() && file.endsWith(".js")) {
           
            try {
              require(fullPath)(sequelize);

            } catch (error) {

              console.error(`Error al cargar el modelo ${file}:`, error);
            }
          }
        });
      };
    
    loadModels(loadMainModels);
    loadModels(loadJoinModels);

    return
};
 

