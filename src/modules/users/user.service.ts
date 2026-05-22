import { hasSubscribers } from "diagnostics_channel";
import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";
const createUserIntoDB=async(payLoad:IUser)=>
{
  const {name, email, password, age,role}=payLoad;
  const hashPassword=await bcrypt.hash(password,10);
  const result = await pool.query(`
    INSERT INTO users(name ,email,password,age,role) VALUES($1,$2,$3,$4,COALESCE($5,'user'))
    RETURNING *
    `,
    [name, email, hashPassword, age,role],
  );
  delete result.rows[0].password;
  return result;

}
const createGetAllIntoDB=async()=>{
  const result = await pool.query(`
    SELECT * FROM users;
  `)
  
  return result;
}
const createGetSingleIntoDB=async(id :string)=>{
  const result = await pool.query(`
    SELECT * FROM users WHERE id=$1;
  `, [id]);
  return result;
}

const createPutIntoDB=async(payLoad:IUser,id:string)=>
{
  const {name, password, age}=payLoad;
  // console.log(payLoad);
  const result = await pool.query(`
    UPDATE users 
    SET
     name=COALESCE($1,name),
     password=COALESCE($2,password),
     age=COALESCE($3,age) 
    WHERE id=$4
    RETURNING *;
  `, [name, password, age,id])
  return result;
}
const createDeleteIntoDB=async(id :string)=>{
  const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `,[id])
  return result;
}
export const userService={
  createUserIntoDB,
  createGetAllIntoDB,
  createGetSingleIntoDB,
  createPutIntoDB,
  createDeleteIntoDB
};