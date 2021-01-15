module.exports =(sequelize,DataTypes)=> {
  const User = sequelize.define('user',{
    UserId:{
      type:Sequelize.STRING,
      primaryKey:true
    }
  });
  User.associate = models =>{
    user.hasMany(models.role,{
      onDelete: "cascade"
    });
  } 
  return User;
};