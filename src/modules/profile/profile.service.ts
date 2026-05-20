import { Pool } from "pg";
import { pool } from "../../db";
import { error } from "console";

const createProfileIntoDB=async(payLoad:any)=>
{
  // console.log(payLoad)
  const {user_id,bio,address,phone,gender}=payLoad;
  const user=await pool.query(`
      SELECT * FROM users WHERE id=$1
    `,[user_id])
    if(user.rows.length==0)
    {
      throw new Error("User not exists!!!!")
    }

    const result=await pool.query(`
      INSERT INTO profile(user_id,bio,address,phone,gender) VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,[user_id,bio,address,phone,gender])
   
    return result;


}
export const profileService={
  createProfileIntoDB
}
 