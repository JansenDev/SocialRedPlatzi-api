const jwt = require("jsonwebtoken");
const config = require("../config");
const err = require('../utils/error-trhow');

const SECRET = config.jwt.SECRET;

function code(payload) {
  return jwt.sign(payload, SECRET);
}

function decode(token) {
  return jwt.verify(token, SECRET);
}

const check = {
  own: (req, owner) => {
    const user = get_userOfToken(req);

    if( user.id.toString() !== owner){
      // const e = new Error("No tienes permisos para realizar esta acción");
      // e.statusCode = 401
      // throw e
      throw err("No tienes permisos para realizar esta acción",401)
    }
  },
  logged:(req, owner)=>{
    const decoded= get_userOfToken(req)
  }
};

function tokenSerialize(authorization) {

  if(!authorization){
    throw new Error("No token provided");
  }

  const isBearer = authorization.indexOf("Bearer ") === 0;

  if (!isBearer) {
    throw new Error("Invalid token");
  }

  return authorization.replace("Bearer ", "");
}

function get_userOfToken(req) {
  const bearerToken = req.headers.authorization || "";
  const token = tokenSerialize(bearerToken);
  const user = decode(token);
  req.user = user;
  return user;
}

module.exports = {
  code,
  check,
};
