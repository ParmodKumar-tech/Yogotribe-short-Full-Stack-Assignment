import express from 'express';
import cors from "cors";
const app=express();

//middleware
app.use(cors());
app.use(express.json());

// function for checking Prime Number
const isPrime=(number)=>{
    let count=0;
    for(let i=1; i<=number; i++){ 
        if(number % i === 0){ 
            count++;
        }
    }
    if(count==2){
        return true;
    }
    
    return false;

    
    
}

app.post('/api/check-prime',(req,res)=>{
    const {number}=req.body;

    if(typeof number !== 'number'){
        return res.status(400).json({error:"Input should be number"});
    }

    const result=isPrime(number);
    return res.status(200).json({number,isPrime:result})

})
app.listen(8000,()=>{console.log("Server is listening...")})