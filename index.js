const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Mylosql',
  database : 'rolemodel'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


//for home
app.get('/:id',(req,res) => {

  let userId = req.body;
  userId = userId.email;
  //check weather the user exists or not
    const query1 = 'SELECT user_id from user where user_id = ' + mysql.escape(userId) ;
    connection.query(query1, (err, result) => {
         if(err) throw err;
         if(result.length === 0){
           res.status(400).json({msg: "No user with this id available"});
         }
         else{
           //check whether the user has the access to the page
           const query2 = "select per from user_per where user_per.per =" + mysql.escape(req.params.id) + " and user_per.user_id = " +  mysql.escape(userId);
           connection.query(query2,(err,result)=>{
              if(err) throw err;
              if(result.length === 0){
                res.status(400).json({msg: "The user has no permission to access this page"});
              }
              else{
                const query3 = "select role_feature.feature from role_feature inner join user_role on role_feature.roleType = user_role.roleType  inner join user_per on user_per.per = user_role.per where user_per.user_id = "  + mysql.escape(userId) + "user_role.per =" + mysql.escape(req.params.id) + "and user_role.user_id = user_per.user_id order by role_feature.feature" ; 
                connection.query(query3, (err, result) => {
                     if(err) throw err;
                     let result_1 = result.map(a => a.feature);
                     res.json(result_1);
                });
              }
           });          
         }
    });
});
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});


/** 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'rolemodel',
  'root',
 'Mylosql',
 {dialect:'mysql',
  host:'localhost'
  }
);
**/


/** const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Mylosql',
  database : 'rolemodel'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


//for home
app.get('/:id',(req,res) => {

  let userId = req.body;
  userId = userId.email;
  //check weather the user exists or not
    const query1 = 'SELECT user_id from user where user_id = ' + mysql.escape(userId) ;
    connection.query(query1, (err, result) => {
         if(err) throw err;
         if(result.length === 0){
           res.status(400).json({msg: "No user with this id available"});
         }
         else{
           //check whether the user has the access to the page
           const query2 = "select per from user_per where user_per.per =" + mysql.escape(req.params.id) + " and user_per.user_id = " +  mysql.escape(userId);
           connection.query(query2,(err,result)=>{
              if(err) throw err;
              if(result.length === 0){
                res.status(400).json({msg: "The user has no permission to access this page"});
              }
              else{
                const query3 = "select feature from role_feature join user_role on role_feature.roleType = user_role.roleType where user_role.user_id =" + mysql.escape(userId) +
                "join user_per on "+ "order by role_feature.feature";
                connection.query(query3, (err, result) => {
                     if(err) throw err;
                     let result_1 = result.map(a => a.feature);
                     res.json(result_1);
                });
              }
           });          
         }
    });
});
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});


/** 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'rolemodel',
  'root',
 'Mylosql',
 {dialect:'mysql',
  host:'localhost'
  }
);
**/ 