
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
            let query = "select * from customers";
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

// exports.add ={
//     controller: (req, res) => {
//         oracledb.getConnection(connAttr, function(err, connection){
//             console.log(req.body)
//             if(err){
//                 console.log(err);
//             }
//             let query = 'INSERT INTO customers( c_id, c_first_name, c_father_name, c_last_name, c_mobile_num, c_national_num, c_passport_num, c_career, c_address, commercial_num, remark) \
//          VALUES( :c_id, :c_first_name, :c_father_name, :c_last_name, :c_mobile_num, :c_national_num, :c_passport_num, :c_career, :c_address, :commercial_num, :remark)';
//             let binds = [req.body.c_id ,                    
//                 req.body.c_first_name,
//                 req.body.c_father_name, 
//                 req.body.c_last_name, 
//                 req.body.c_mobile_num, 
//                 req.body.c_national_num, 
//                 req.body.c_passport_num, 
//                 req.body.c_career,
//                 req.body.c_address,
//                 req.body.commercial_num,
//                 req.body.remark ];
//             console.log("Connected to Database")
//             //let query = "select * from customers";
//             connection.execute(query, binds, { autoCommit: true }, function(err, result){
//                 console.log("Executing query...")
//                 if(err){
//                     console.log(err);
//                 }
//                 connection.release(function(err){
//                     console.log(err);
//                     console.log("connection is releasesd");
    
//                   });
//                 return res.json({success: "true", customers: result});
//             });
    
//         });
// }
// }
exports.getCustomer = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from customers where c_id = " + id ;
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

exports.add ={
    controller: (req, res) => {
        oracledb.getConnection(connAttr, function(err, connection){
            console.log(req.body)
            if(err){
                console.log(err);
            }
            let query = "BEGIN add_customer(:c_first_name, :c_father_name, :c_last_name, c_mobile_num, c_national_num, c_passport_num, c_career, c_address, commercial_num, remark);END;";
            let binds = [                    
                req.body.c_first_name,
                req.body.c_father_name, 
                req.body.c_last_name, 
                req.body.c_mobile_num, 
                req.body.c_national_num, 
                req.body.c_passport_num, 
                req.body.c_career,
                req.body.c_address,
                req.body.commercial_num,
                req.body.remark 
                ];
            console.log("Connected to Database")
            //let query = "select * from customers";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", customers: result});
            });
    
        });
}
}