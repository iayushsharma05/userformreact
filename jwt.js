const jwt = require('jsonwebtoken');


let id = '201';
const secretcode = "ThisisSecret";

// signin the token

const token = jwt.sign(id,secretcode);
console.log('token id :',token);

// verify the token
const verifedtoken = jwt.verify(token,secretcode);

console.log('verifed token :',verifedtoken);