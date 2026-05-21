import { pool } from "../../db";
import bcrypt from "bcrypt";
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
  // console.log(user)
  const matchPassword= await bcrypt.compare(password,user.password);
  console.log(matchPassword);
  if (!matchPassword)
  {
    throw new Error("Invalid Credentials!!")
  }

  
}

export const authService={
  loginService,
}