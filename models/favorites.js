'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    audio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      artwork: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      band: {
        type: DataTypes.STRING,
        allowNull: false
      },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorites;
};