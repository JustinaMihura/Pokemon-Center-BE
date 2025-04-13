const { DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Machines" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
       //* version.id 
       //* move.id 
       //*item.id
    }, 
        {
            timestamps : false
        })
};