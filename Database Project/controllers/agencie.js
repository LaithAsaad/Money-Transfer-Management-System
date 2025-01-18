
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
            let query = "select * from agencies";
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
            let query = 'INSERT INTO agencies( agency_id, agency_name, charge_pct, contract_start_date, contract_expired_date, bank_account_num, bank_name) \
         VALUES( :agency_id, :agency_name, :charge_pct, :contract_start_date, :contract_expired_date, :bank_account_num, :bank_name)';
            let binds = [req.body.agency_id ,                    
                req.body.agency_name,
                req.body.charge_pct, 
                req.body.contract_start_date, 
                req.body.contract_expired_date, 
                req.body.bank_account_num, 
                req.body.bank_name ];
            console.log("Connected to Database")
            //let query = "select * from agencies";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", agencies: result});
            });
    
        });
}
}
exports.getAgencie = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from agencies where agency_id = " + id ;
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