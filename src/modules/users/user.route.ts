import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";


const router=Router();
//user 
router.post('/', userController.createUser);
router.get('/',userController.createGetAll )
router.get('/:id',userController.createGetSingle )
router.put('/:id', userController.createGetPut)
router.delete('/:id',userController.createDelete )
export const userRouter=router;