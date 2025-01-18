
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
            let query = "select * from transfers";
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
//         oracledb.getConnection(connAttr,async function(err, connection){
//             let CNM = req.body.C_FIRST_NAME;
//             let id = 0;
//             let bindsC = [req.body.C_FIRST_NAME,
//                 req.body.C_FATHER_NAME, 
//                 req.body.C_LAST_NAME, 
//                 req.body.C_MOBILE_NUM, 
//                 req.body.C_NATIONAL_NUM, 
//                 req.body.C_PASSPORT_NUM, 
//                 req.body.C_CAREER,
//                 req.body.C_ADDRESS,
//                 req.body.COMMERCIAL_NUM,
//                 req.body.REMARK ];
//             console.log(req.body)
//             if(err){
//                 console.log(err);
//             }
//             let queryR = "select * from customers where C_FIRST_NAME  = '" + CNM +"'" ;
//             console.log(queryR);

//             connection.execute(queryR, {}, { autoCommit: true })
//                 .then((result) =>
//                 {
//                     if (result.rows.length === 0)
//                     {
//                         queryR = 'INSERT INTO CUSTOMERS(C_FIRST_NAME, C_FATHER_NAME, C_LAST_NAME, C_MOBILE_NUM, C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, COMMERCIAL_NUM, REMARK) \
//                         VALUES(:C_FIRST_NAME, :C_FATHER_NAME, :C_LAST_NAME, :C_MOBILE_NUM, :C_NATIONAL_NUM, :C_PASSPORT_NUM, :C_CAREER, :C_ADDRESS, :COMMERCIAL_NUM, :REMARK)';
//                         result = connection.execute(queryR, bindsC, { autoCommit: true })

//                         console.log("yazan halloul");
//                         //return res.json({ success: true, newCustomer: result })
//                     }
//                 });


//             let queryID = "select C_ID from customers where C_FIRST_NAME  = '" + CNM +"'" ;
//             console.log("ddddddddddddd"+id);
//             connection.execute("SELECT C_ID FROM customers WHERE C_FIRST_NAME  = '" + CNM +"'", {}, {})
//                 .then((result) => {
//                     if (result.rows.length > 0) {
//                     let id = result.rows[0][0];
//                     console.log("C_ID: " + id);
//                     } else {
//                     console.log("No matching rows found");
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//             // if (queryR == null){
//             //         queryR = 'INSERT INTO JOBS(JOB_ID, JOB_TITLE) VALUES(:JOB_ID, :JOB_TITLE)';
//             //         result = connection.execute(queryR, b, { autoCommit: true })
//             //         return res.json({ success: true, newCustomer: result })
//             //     }
//             //     else{
//             //         console.log("kkkkkkkkkkkkkkkkkk");
//             //     }


//             let query = 'INSERT INTO TRANSFERS(TRANSFER_ID, CHARGE_TYPE, CHARGE, SENDER, RECEIVER, RECEPTIONIST, SOURCE_ACCOUNTANT, DESTINATION_ACCOUNTANT, SOURCE_BRANCH, DESTINATION_BRANCH) \
//             VALUES(:TRANSFER_ID, :CHARGE_TYPE, :CHARGE, :SENDER, :RECEIVER, :RECEPTIONIST, :SOURCE_ACCOUNTANT, :DESTINATION_ACCOUNTANT, :SOURCE_BRANCH, :DESTINATION_BRANCH)';
//             let binds = [req.body.TRANSFER_ID ,                    
//                 req.body.CHARGE_TYPE,
//                 req.body.CHARGE,
//                 req.body.SENDER,
//                 req.body.RECEIVER,
//                 req.body.RECEPTIONIST,
//                 req.body.SOURCE_ACCOUNTANT,
//                 req.body.DESTINATION_ACCOUNTANT,
//                 req.body.SOURCE_BRANCH,
//                 req.body.DESTINATION_BRANCH ];
//             console.log("Connected to Database")
//             //let query = "select * from transfers";
//             connection.execute(query, binds, { autoCommit: true }, function(err, result){
//                 console.log("Executing query...")
//                     if(err){
//                         console.log(err.message);
//                         return res.status(500).json({error: err.message});
//                     }
//                     connection.release(function(err){
//                         if(err){
//                             console.log(err);
//                         }
//                         console.log("connection is released");
//                     });
//                     return res.json({success: "true", transfers: result});
//             });
    
//         });
// }
// }
exports.getTransfer = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from transfers where transfer_id = " + id ;
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


exports.updateReceive = {
    controller: (req, res) => {
      oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(req.body)
        if(err){
          console.log(err);
        }
        let query = "UPDATE TRANSFERS SET HANDED_DATE = :HANDED_DATE where TRANSFER_ID =" + id ;
        let binds = [
          req.body.HANDED_DATE
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
          return res.json({success: true, message: "TRANSFERS with e_id updated successfully"});
        });
      });
    }
  };



  exports.updateCancel = {
    controller: (req, res) => {
      oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(req.body)
        if(err){
          console.log(err);
        }
        let query = "UPDATE TRANSFERS SET CHARGE = 0 where TRANSFER_ID =" + id ;
        console.log("Connected to Database");
        connection.execute(query, {}, { autoCommit: true }, function(err, result){
          console.log("Executing query...");
          if(err){
            console.log(err);
          }
          connection.release(function(err){
            console.log(err);
            console.log("Connection is released");
          });
          return res.json({success: true, message: "TRANSFERS with e_id Canceled successfully"});
        });
      });
    }
  };


  exports.add = {
    controller: async (req, res) => {
      try {
        const connection = await oracledb.getConnection(connAttr);
  
        const query = "BEGIN add_transfers( :C_FIRST_NAME,:C_FATHER_NAME,:C_LAST_NAME,:C_MOBILE_NUM,:C_NATIONAL_NUM,:C_PASSPORT_NUM,:C_CAREER,:C_ADDRESS,:C2_FIRST_NAME,:C2_FATHER_NAME,:C2_LAST_NAME,:C2_MOBILE_NUM,:CHARGE_TYPE, :CHARGE, :RECEPTIONIST, :SOURCE_ACCOUNTANT, :DESTINATION_ACCOUNTANT, :SOURCE_BRANCH, :DESTINATION_BRANCH); END;";
        const binds = [
          req.body.C_FIRST_NAME,
          req.body.C_FATHER_NAME,
          req.body.C_LAST_NAME,
          req.body.C_MOBILE_NUM,
          req.body.C_NATIONAL_NUM,
          req.body.C_PASSPORT_NUM,
          req.body.C_CAREER,
          req.body.C_ADDRESS,
          req.body.C2_FIRST_NAME,
          req.body.C2_FATHER_NAME,
          req.body.C2_LAST_NAME,
          req.body.C2_MOBILE_NUM,
          req.body.CHARGE_TYPE,
          req.body.CHARGE,
          req.body.RECEPTIONIST,
          req.body.SOURCE_ACCOUNTANT,
          req.body.DESTINATION_ACCOUNTANT,
          req.body.SOURCE_BRANCH,
          req.body.DESTINATION_BRANCH
        ];
  
        const result = await connection.execute(query, binds, { autoCommit: true });
  
        await connection.close();
  
        return res.json({ success: true, transfers: result });
      } catch (err) {
        console.error(err);
        return res.json({ success: false, error: err.message });
      }
    }
  };