const axios =
require("axios");

const runCode =
async(req,res)=>{

try{

const{
source_code,
language_id,
stdin,
}=req.body;

const response=
await axios.post(

"https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",

{

source_code,

language_id,

stdin,

},

{

headers:{

"Content-Type":"application/json",

"X-RapidAPI-Key":
process.env.RAPIDAPI_KEY,

"X-RapidAPI-Host":
"judge0-ce.p.rapidapi.com",

},

}

);

res.json(response.data);

}

catch(error){

console.log(
error.response?.data
);

res.status(
error.response?.status||500
).json({

message:error.message,

error:error.response?.data,

});

}

};

module.exports={
runCode,
};