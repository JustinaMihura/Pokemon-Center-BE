const callAllApi = require("../utils/callAllApi.js")
const { sequelize } = require("../db/db.js");
const {Executable_Logs} = sequelize.models   

module.exports = async (taskName) => {

    const time_now = new Date();

    try {

       const register = await Executable_Logs.findOne({
        where : { task : taskName },
        order: [['latest_run', 'DESC']]
        });

        if(!register) {

            const callResults = await callAllApi();
            await Executable_Logs.create({
            task : task,
            latest_run : time_now
        });

        } else {

           /*   const date_register = new Date(register.latest_run);
             const diff_month = (time_now.getFullYear() * 12 + time_now.getMonth()) -
                     (date_register.getFullYear() * 12 + date_register.getMonth());
            
             if(diff_month >= 1 ) {
                
                console.log("Paso mas de un mes! Actualizando base de datos"); */
                
                await saves_manager();
                await Executable_Logs.create({
                task : task,
                latest_run : time_now

            });
            // }
                return
        /* } */
    }
    } catch (error) {
        console.log({"error" : error});
        
    }
   
};
