const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Version_Details" , {
        
       id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
       },

       max_chance : {//! For Encounter
        type : DataTypes.INTEGER,
        allowNull : true
       },

       rarity : {//! For Items
        type : DataTypes.INTEGER,
        allowNull : true
       },
       
       rate : { //! For Method
        type : DataTypes.INTEGER,
        allowNull : true
       },
       
       held_item_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : "Held_Items",
            key : "id"
        }
       },
       version_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : "Versions",
            key : "id"
        }
       },
    }, {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['held_item_id' , 'version_id'] 
            }
          ]
    },
    {timestamps : false}
)
};