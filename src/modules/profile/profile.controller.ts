import type { Request, Response } from "express"

const createProfile=async(req:Request,res:Response)=>
{
  try {
    const result=await 
    
  } catch (error:any) {
    res.status(500).json(
      {
        message: error.message,
        error: error
      }
    )
    
  }
}
export const profileController={
  createProfile,
}