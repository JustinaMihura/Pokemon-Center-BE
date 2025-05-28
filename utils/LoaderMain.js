const fs = require("fs");
const path = require("path");

const asyncRetry = require("./asyncRetry_fn.js");

module.exports = async (folderName) => {
     
     const baseDir = path.join(__dirname, "..", "scripts", folderName);

    if (!fs.existsSync(baseDir)) {
        throw new Error(`Carpeta "${folderName}" no encontrada en ${baseDir}`);
    }

    const result = [];
    const files = fs.readdirSync(baseDir).filter(file => file.endsWith(".js"));

    for (const file of files) {
        
        const filePath = path.join(baseDir, file);

        try {
            const scriptFn = require(filePath);

            const retryResults = await asyncRetry(async () => {
                return await scriptFn(); 
            },3);

             if (retryResults.success) {
                
                result.push({
                    task: retryResults.task,
                    success: true,
                    data : retryResults.data,
                    duration : retryResults.duration
                });

                console.log(`✅ Relación completada: ${retryResults.task}`);

            } else {
                result.push({
                    task: retryResults.task,
                    success: false,
                    error: retryResults.error,
                    attempts: retryResults.attempts
                });

                console.error(`❌ Relación fallida después de ${retryResults.attempts} intentos: ${modelName}`);
            }


            console.log(`✅ Datos cargados: ${retryResults.task}`);

        } catch (error) {
            console.error(error.message);
        }
    }

    return result;

} 
