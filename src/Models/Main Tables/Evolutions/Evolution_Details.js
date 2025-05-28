const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolution_Details",{
        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        trigger_id : {
            type :DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Triggers",
                key : "id"
            }
        },
        evolution_id : {
            type :DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Evolutions",
                key : "id"
            }
        },
        min_level : { 
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_happiness : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_beauty : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_affection : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        needs_overworld_rain : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        relative_physical_stats : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        time_of_day : {
            type : DataTypes.STRING(10),
            allowNull : true
        },
       
        turn_upside_down : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        trade_species_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Species',
              key: 'id'
            }
          },
          gender_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Genders',
              key: 'id'
            }
          },
          held_item_id : {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Items',
              key: 'id'
            }
          },
          item_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Items',
              key: 'id'
            }
          },
          known_move_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Moves',
              key: 'id'
            }
          },
          known_move_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Types',
              key: 'id'
            }
          },
          location_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Locations',
              key: 'id'
            }
          },
          party_species_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Species',
              key: 'id'
            }
          },
          party_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Types',
              key: 'id'
            }
          },

},{
    timestamps : false
}
)
};

