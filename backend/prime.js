

import express from 'express'
const app=express();
 

// program to print prime numbers between the two numbers

// take input from the user


// looping from lowerNumber to higherNumber
const primenumber =(a,b)=>{
  const primes=[]
for (let i = a; i <= b; i++) {
  let flag = 0;
  // looping through 2 to user input number
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
            flag = 1;
            break;
          }
        }
        // if number greater than 1 and not divisible by other numbers 
        if (i > 1 && flag == 0) {
        primes.push(i);
      }
    }
    return primes;
}

console.log(primenumber(1,10))
console.log(primenumber(1,20))


app.listen(5000,()=>console.log("server start"))

