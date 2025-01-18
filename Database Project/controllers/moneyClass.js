
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
            let query = "select * from money_classes";
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
            let query = 'INSERT INTO MONEY_CLASSES(money_class_id, cash_class) VALUES(:money_class_id, :cash_class)';
            let binds = [req.body.money_class_id ,
                req.body.cash_class];
            console.log("Connected to Database")
            //let query = "select * from MONEY_CLASSES";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", money_classes: result});
            });
    
        });
}
}

exports.getMoneyClass = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from MONEY_CLASSES where money_class_id = " + id ;
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