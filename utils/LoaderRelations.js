const fs = require("fs");
const path = require("path");

const asyncRetry = require("./asyncRetry");

/**
 * @param {Object} mainData - Los datos recolectados de tablas principales
 * @param {string} folderName - Nombre de la carpeta de relaciones (ej: "Pokedex_relations_data")
 */

module.exports = async (folderName, mainData) => {
    const baseDir = path.join(__dirname, "..", "scripts", folderName);

    const results = [];

    if (!fs.existsSync(baseDir)) {
        throw new Error(`Carpeta "${folderName}" no encontrada en ${baseDir}`);
    }

    const files = fs.readdirSync(baseDir).filter(file => file.endsWith(".js"));

    for (const file of files) {

           try {
            const scriptFn = require(filePath);

            if (typeof scriptFn !== "function") {
                throw new Error(`El archivo "${file}" no exporta una función válida`);
            }

            // Reintentar hasta 3 veces
            const retryResult = await asyncRetry(async () => {
                return await scriptFn(mainData);
            }, 3);

            // Guardamos resultado
            if (retryResult.success) {
                results.push({
                    task: relationName,
                    success: true,
                    attempts: retryResult.attempts,
                    data: retryResult.data
                });

                console.log(`✅ Relación completada: ${relationName}`);

            } else {
                results.push({
                    task: relationName,
                    success: false,
                    error: retryResult.error,
                    attempts: retryResult.attempts
                });

                console.error(`❌ Relación fallida después de ${retryResult.attempts} intentos: ${relationName}`);
            }

        } catch (error) {
            // Captura errores antes de ejecutar asyncRetry (ej: script inválido)
            results.push({
                task: relationName,
                success: false,
                error: `Error al cargar script: ${error.message}`,
                attempts: 0
            });

            console.error(`❌ No se pudo ejecutar el script "${relationName}":`, error.message);
        }
    }

    // Mostrar advertencia si hubo fallos
    const failedRelations = results.filter(r => !r.success);

    if (failedRelations.length > 0) {
        failedRelations.forEach(r => {
            console.warn(` - ${r.task}: ${r.error}`);
        });
    }

    return results;
}

