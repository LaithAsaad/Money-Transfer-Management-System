
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const dbconnection = require('../config/config');

const connAttr = dbconnection.connAttr;

exports.test ={
    controller: (req, res) => {
    return res.json({message: "Hello world >>>>"})
}
}

exports.getAll ={
    controller: (req, res) => {
        oracledb.getConnection(connAttr, function(err, connection){
            if(err){
                console.log(err);
            }
            console.log("Connected to Database")
            let query = "select * from employees";
            connection.execute(query, {}, {}, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log("connection is releasesd");
                  });
                return res.json(result.rows);
            });
    
        });
}
}

exports.add ={
    controller: (req, res) => {
        oracledb.getConnection(connAttr, function(err, connection){
            console.log(req.body)
            if(err){
                console.log(err);
            }
            let query = 'INSERT INTO employees( E_ID, E_NUM, E_FIRST_NAME, E_LAST_NAME, E_MOBILE_NUM, E_ADDRESS, BRANCH_ID, JOB_ID) VALUES( :E_ID, :E_NUM, :E_FIRST_NAME, :E_LAST_NAME, :E_MOBILE_NUM, :E_ADDRESS, :BRANCH_ID, :JOB_ID)';
            let binds = [req.body.E_ID ,                    
                req.body.E_NUM,
                req.body.E_FIRST_NAME, 
                req.body.E_LAST_NAME, 
                req.body.E_MOBILE_NUM, 
                req.body.E_ADDRESS, 
                req.body.BRANCH_ID, 
                req.body.JOB_ID ];
            console.log("Connected to Database")
            //let query = "select * from employees";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", employees: result});
            });
    
        });
}
}
exports.getEmployee = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from employees where e_id = " + id ;
        connection.execute(query, {}, {}, function(err, result){
            console.log("Executing query...")
            if(err){
                console.log(err);
            }
            connection.release(function(err){
                console.log("connection is releasesd");
              });
            return res.json(result.rows);
        });

    });

}

exports.update = {
    controller: (req, res) => {
      oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(req.body)
        if(err){
          console.log(err);
        }
        let query = "UPDATE EMPLOYEES SET E_NUM = :E_NUM, E_FIRST_NAME = :E_FIRST_NAME, E_LAST_NAME = :E_LAST_NAME, E_MOBILE_NUM = :E_MOBILE_NUM, E_ADDRESS = :E_ADDRESS, BRANCH_ID = :BRANCH_ID, JOB_ID = :JOB_ID where E_ID =" + id ;
        let binds = [
          req.body.E_NUM,
          req.body.E_FIRST_NAME,
          req.body.E_LAST_NAME,
          req.body.E_MOBILE_NUM,
          req.body.E_ADDRESS,
          req.body.BRANCH_ID,
          req.body.JOB_ID
        ];
        console.log("Connected to Database");
        connection.execute(query, binds, { autoCommit: true }, function(err, result){
          console.log("Executing query...");
          if(err){
            console.log(err);
          }
          connection.release(function(err){
            console.log(err);
            console.log("Connection is released");
          });
          return res.json({success: true, message: "Employee with e_id updated successfully"});
        });
      });
    }
  };