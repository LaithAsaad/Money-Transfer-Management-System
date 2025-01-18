const express = require('express')


let app = express();
app.use(express.json());

const router = require('./routes');

app.use('/', router);

const port = 3000;
app.listen(port, () => {
    console.log("The web server is ready");
})



// function add(a, b, next) {
//     let sum = a + b;
//     next(sum);
//   }
  
//   function printResult(result) {
//     console.log('The result is: ' + result);
//   }
  
//   add(5, 10, printResult);

//   function add2(a, b, callback) {
//     setTimeout(() => {
//       let sum = a + b;
//       callback(sum);
//     }, 2000);
//   }
  
//   function printResult2(result) {
//     console.log('The result is: ' + result);
//   }
  
//   add2(5, 10, printResult2);
//   console.log('Waiting for result...');


