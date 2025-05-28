                        Funciones reutilizables

1.AsyncRetry_fn = funcion asincronica que reintenta 3 veces ejecutar una llamada a PokeApi o DB.

2.Batching_fn = funcion que divide elementos (urls, datos) y los devuelve en un array de arrays.

3.LoaderMain = lee la carpeta main de la carpeta script y guarda en un array de objetos todos los returns de cada script para luego devolverlo como resultado de LoaderMain.

4.LoaderRelations = lee la carpeta relations de script y ejecuta cada script individualmente. Se le pasa por PROPS el array de objetos resultante de LoaderMain para crear las relacions posteriormente.

5.writeErrorsToFile = funcion que se ejecuta al fallar el asyncRetry_fn. Guarda el error con los datos correspondientes para luego reintantar nuevamente mas tarde. Estos errores seran guardados en logs/loaderErrors.json

