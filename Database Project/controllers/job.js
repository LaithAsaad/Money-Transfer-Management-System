
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
            let query = "select * from jobs";
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
            let query = 'INSERT INTO JOBS(JOB_ID, JOB_TITLE) VALUES(:JOB_ID, :JOB_TITLE)';
            let binds = [req.body.JOB_ID ,
                req.body.JOB_TITLE];
            console.log("Connected to Database")
            //let query = "select * from jobs";
            connection.execute(query, binds, { autoCommit: true }, function(err, result){
                console.log("Executing query...")
                if(err){
                    console.log(err);
                }
                connection.release(function(err){
                    console.log(err);
                    console.log("connection is releasesd");
    
                  });
                return res.json({success: "true", jobs: result});
            });
    
        });
}
}

exports.getJOB = (req, res) => {
    oracledb.getConnection(connAttr, function(err, connection){
        let id = req.params.id;
        console.log(id);
        if(err){
            console.log(err);
        }
        console.log("Connected to Database")
        let query = "select * from JOBS where job_id = " + id ;
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

// exports.edit = {
//     controller: (req, res) =>
//     {
//         oracledb.getConnection(connAttr, function (err, connection)
//         {
//             console.log(req.body);
//             if (err)
//             {
//                 console.log(err);
//             }
//             let id = req.body.JOB_ID;
//             let job_title = req.body.JOB_TITLE;
//             let query = 'SELECT job_id FROM jobs WHERE job_id =' + id;
//             connection.execute(query).then((result) =>
//             {
//                 if (result.rows.length === 0)
//                 {
//                     return res.json({ success: false, result: "There is no such job" });
//                 } else
//                 {
//                     query = "update jobs set job_title ='" + job_title + "' where job_id ='" + id + "'";
//                     result = connection.execute(query, {}, { autoCommit: true })
//                     return res.json({ success: true, newJob: result })
//                 }
//             })
//         })
//     }
// }


exports.deleteById = {
    controller: (req, res) =>
    {
        oracledb.getConnection(connAttr, function (err, connection)
        {
            let id = req.params.id;
            console.log(req.body);
            if (err)
            {
                console.log(err);
            }
            let query = "SELECT JOB_ID FROM JOBS WHERE JOB_ID = " + id;

            connection.execute(query, {}, { autoCommit: true })
                .then((result) =>
                {
                    if (result.rows.length === 0)
                    {
                        return res.json({ success: false, result: "There is no such job" });
                    } else
                    {
                        query = "DELETE FROM jobs WHERE job_id = " + id;
                        console.log("Connected to Database");
                        connection.execute(query);
                        query = "COMMIT";
                        console.log("Connected to Database");
                        connection.execute(query);
                        return res.json({ success: true, message: "Job deleted successfully" });
                    }
                });
        });
    },
};