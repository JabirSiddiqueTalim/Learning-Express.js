import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginController=async(req:Request,res:Response)=>
{
  
  
   try {
 
    const result=await authService.loginService(req.body);
    const {refreshToken}=result;
     res.cookie("refreshToken",refreshToken,{
      secure:false,
      httpOnly:true,
      sameSite:'lax'

     })

    // console.log(result)
      res.status(202).json(
        {
          message: "",
          data: result
        }
      )
    
   } catch (error :any) {
    res.status(500).json(
      {
        message: error.message,
        error: error
      }
    )
    
   }
}
const refreshTokenController=async(req:Request,res:Response)=>
{
  
  try {
 
    const result=await authService.refreshTokenService(req.cookies.refreshToken);
   
    
      res.status(200).json(
        {
          message: "access token : ",
          data: result
        }
      )
    
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
  refreshTokenController,
}