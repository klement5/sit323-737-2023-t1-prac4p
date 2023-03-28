const express = require("express");
const res = require("express/lib/response");
const app = express();
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
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        throw new Error("second parameter is incorrectly defined");
    }

    const result = multiply(n1,n2);
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
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        throw new Error("second parameter is incorrectly defined");
    }
    const result = divide(n1,n2);
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
        throw new Error("first parameter is incorrectly defined");
    }
    if(isNaN(n2)){
        throw new Error("second parameter is incorrectly defined");
    }
    const result = subtract(n1,n2);
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
            throw new Error("first parameter is incorrectly defined");
        }
        if(isNaN(n2)){
            throw new Error("second parameter is incorrectly defined");
        }

        const result = add(n1,n2);
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