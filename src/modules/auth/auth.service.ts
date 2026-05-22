import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
const loginService=async(payLoad:{email:"string",password:"string"})=>
{
  const {email,password}=payLoad;
  const userData=await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[email])

  if(userData.rows[0].length===0)
  {
    throw new Error("Invalid Credentials!!")
  }
  const user=userData.rows[0];

  const matchPassword= await bcrypt.compare(password,user.password);
  console.log(matchPassword);
  if (!matchPassword)
  {
    throw new Error("Invalid Credentials!!")
  }
  const jwtpayload ={
    id:user.id,
    name:user.name,
    role:user.role,
    is_active:user.is_active,
    email:user.email,
  }
  const accessToken=jwt.sign(jwtpayload,config.secret as string,{
    expiresIn:"1d"
  })
  const refreshToken=jwt.sign(jwtpayload,config.refreshSecret as string,{
    expiresIn:"1d"
  })
  return {accessToken,refreshToken}
  
}


const refreshTokenService=async(token :string)=>{
    

   
    if (!token) {
      throw new Error ("Unauthorized")
      
    }
    const decoded = jwt.verify(
      token as string,
      config.refreshSecret as string,
    ) as JwtPayload;
    // console.log(decoded)
    const userData = await pool.query(`
    
    SELECT * FROM users WHERE email=$1
    `, [decoded.email])
    const user = userData.rows[0];

    if (userData.rows[0].length === 0) {
      throw new Error ('User not found!!!')
    }
    if (!user?.is_active) {
      throw new Error ( "Forbidden!!!");
    }
    const jwtpayload ={
      id:user.id,
      name:user.name,
      role:user.role,
      is_active:user.is_active,
      email:user.email,
    }
    const accessToken=jwt.sign(jwtpayload,config.secret as string,{
      expiresIn:"1d"
    })
    return {accessToken};

  }
export const authService={
  loginService,
  refreshTokenService,
}