const express = require("express");
const res = require("express/lib/response");
const app = express();
const winston = require('winston');

const logger = winston.createLogger({ //setup the logger
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

//definition of the arithmetic functions
const add= (num1,num2) => {
    return num1+num2;
}
const multiply= (num1,num2) =>{
    return num1 * num2;
}
const divide = (num1,num2)=>{
    return num1 / num2;
}
const subtract= (num1,num2)=>{
    return num1 - num2;
}

app.get("/multiply", (req,res) =>{
try{
    const n1= parseFloat(req.query.n1) // look for a parameter in the url called n1;
    const n2= parseFloat(req.query.n2)// look for a parameter in the url called n2;
    if(isNaN(n1)){ //throw error if query is not convertable to a number
        logger.error("first parameter in multiply is incorrectly defined");
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        logger.error("second parameter in multiply is incorrectly defined");
        throw new Error("second parameter is incorrectly defined");
    }

    const result = multiply(n1,n2);
    logger.info("multiply operation succesful." + " " + n1 + " * " + n2 + " = " + result);
    res.status(200).json({statuscode:200, data:result});
}catch(error){
    console.error(error);
    res.status(500).json({statuscode:500,msg:error.toString()})
}

});
app.get("/divide", (req,res) =>{
try{
    const n1= parseFloat(req.query.n1) // look for a parameter in the url called n1;
    const n2= parseFloat(req.query.n2)// look for a parameter in the url called n2;
    if(isNaN(n1)){ 
        logger.error("first parameter in divide is incorrectly defined");
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        logger.error("second parameter in divide is incorrectly defined");
        throw new Error("second parameter is incorrectly defined");
    }
    const result = divide(n1,n2);
    logger.info("division operation succesful." + " " + n1 + " / " + n2 + " = " + result);
    res.status(200).json({statuscode:200, data:result});
}catch(error){
    console.error(error);
    res.status(500).json({statuscode:500,msg:error.toString()})
}
});
app.get("/subtract", (req,res) =>{
try{
    const n1= parseFloat(req.query.n1) // look for a parameter in the url called n1;
    const n2= parseFloat(req.query.n2)// look for a parameter in the url called n2;
    if(isNaN(n1)){
        logger.error("first parameter in subtract is incorrectly defined");
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        logger.error("second parameter in subtract is incorrectly defined");
        throw new Error("second parameter is incorrectly defined");
    }
    const result = subtract(n1,n2);
    logger.info("subtraction operation succesful." + " " + n1 + " - " + n2 + " = " + result);
    res.status(200).json({statuscode:200, data:result});
}catch(error){
    console.error(error);
    res.status(500).json({statuscode:500,msg:error.toString()})
}
});

app.get("/add", (req,res) =>{
    try{
        const n1= parseFloat(req.query.n1) // look for a parameter in the url called n1;
        const n2= parseFloat(req.query.n2)// look for a parameter in the url called n2;
        if(isNaN(n1)){
            logger.error("first parameter in add is incorrectly defined");
            throw new Error("first parameter is incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("second parameter in add is incorrectly defined");
            throw new Error("second parameter is incorrectly defined");
        }

        const result = add(n1,n2);
        logger.info("addition operation succesful." + " " + n1 + " + " + n2 + " = " + result);
        res.status(200).json({statuscode:200, data:result});
    }
    catch(error){
        console.error(error); 
        res.status(500).json({statuscode:500,msg:error.toString()}) //send status 500 as http and insert error msg in frontend
    }
});
const port=3040;
var a= add('5','8');
console.log(a);
app.listen(port,()=>{
    console.log("hello im listening to port" + port);
})