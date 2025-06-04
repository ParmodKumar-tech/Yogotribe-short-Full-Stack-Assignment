import React, { useState } from 'react'
import axios from 'axios'
import { FACT_API,RESOURCE_API } from '../endpoints/endPoints';

export default function RandomFact() {
  const [number,setNumber]=useState(null);
  const [fact,setFact]=useState("");
  const [error,setError]=useState("");
  const [result,setResult]=useState();

  const handleFact=async()=>{
    
    try{
      const response=await axios.get(FACT_API);
      if(response) setFact(response.data.fact);
    }
    catch(error){
      console.log(error.message);
    }
  }

  const handleCheck=async(e)=>{
    e.preventDefault();
    if(!number){
      setError("please enter a number!");
    }
    else{
          try{
          const response=await axios.post(RESOURCE_API,{number:parseInt(number)});

          if(response.data){
            setResult(response.data);
          } 
           
          }
          catch(error){
          setError(error.response.data.error);
          }
    }
    
  }

  return (
    <div>
    <div className='random-fact-section'>
      <h2> Yogotribe | Random Fact Generator</h2>
      <p style={{border:'2px solid black'}}>{fact}</p>
      <button onClick={handleFact}>Generate Fact</button>
    </div>
  
    <div className='prime-num-section'>
      {error && <p style={{color:'red', fontStyle:'italic'}}>{error}</p>}
      
      <form onSubmit={handleCheck}>
      <h2>Check Number is Prime or not?'</h2>
      
      <input type="type" onChange={(e)=>{setNumber(e.target.value); setError("")}} placeholder='enter any number' />
      <button type='submit' style={{marginTop:'10px'}}>Check</button>
      
      </form>
      {result && (
          <p>
            <strong>{result.number}</strong> is{" "}
            <span style={{ color: result.isPrime ? 'green' : 'red' }}>
              {result.isPrime ? "a Prime" : "Not Prime"} number
            </span>.
          </p>
        )}
    </div>
  </div>
  )
}
