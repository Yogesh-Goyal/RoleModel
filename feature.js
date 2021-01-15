const Sequelize = require('sequelize');
module.export=sequelize.define('feature',{
  feature_type:{
    type:Sequelize.STRING,
    primaryKey:true
  }
});