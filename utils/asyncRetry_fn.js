module.exports = async (fn, maxRetries = 3, delay = 1000) => {

    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

        const results = await fn(attempt);

         return {
             success : true,
             attempts : attempt,
             ...results
         };
 
        } catch (error) {
            
           lastError = error;

            if (attempt < maxRetries) {
                console.log(`⏳ Intento ${attempt} fallido. Reintentando en ${delay / 1000}s...`);
                await new Promise(res => setTimeout(res, delay * attempt));
                 // Delay exponencial
            }
            
        }
    }
        return {
        success: false,
        error: lastError.message,
        attempts: maxRetries,
        data: null
    };
}
