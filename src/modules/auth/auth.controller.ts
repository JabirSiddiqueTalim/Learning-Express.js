import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginController=async(req:Request,res:Response)=>
{
  
  
   try {
    const result=await authService.loginService(req.body)
    // console.log(result)
      // res.status(202).json(
      //   {
      //     message: "",
      //     data: result.rows[0]
      //   }
      // )
    
   } catch (error :any) {
    res.status(500).json(
      {
        message: error.message,
        error: error
      }
    )
    
   }
}

export const authController={
  loginController,
}