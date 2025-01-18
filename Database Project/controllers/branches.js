
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
            let query = "select * from branches";
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
            let query = 'INSERT INTO branches( BRANCH_ID, BRANCH_CODE, LOCATION_ID, PHONE_NUM, FAX, CAPITAL) \
         VALUES( :BRANCH_ID, :BRANCH_CODE, :LOCATION_ID, :PHONE_NUM, :FAX, :CAPITAL)';
            let binds = [req.body.BRANCH_ID ,                    
                req.body.BRANCH_CODE,
                req.body.LOCATION_ID, 
                req.body.PHONE_NUM, 
                req.body.FAX, 
                req.body.CAPITAL];
            console.log("Connected to Database")
            //let query = "select * from branches";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", branches: result});
            });
    
        });
}
}

exports.getBranche = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from branches where BRANCH_ID = " + id ;
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