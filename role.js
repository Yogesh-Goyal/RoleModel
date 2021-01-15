module.exports =(sequelize,DataTypes)=> {
  const Role = sequelize.define('role',{
    role_type:{
      type:Sequelize.STRING,
      primaryKey:true
    }
  });
  Role.associate = models =>{
    Role.belongTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  } ;
  return Role;
};


//

db.sequelize.sync().then(() => {
  app.listen(3000,()=>{
      console.log("Server is responding");
  });
});

