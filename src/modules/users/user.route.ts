import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import {auth} from "../../middleware/auth"
import { UserRole } from "../../types";


const router=Router();
//user 


router.post('/', userController.createUser);
router.get('/',auth(UserRole.admin,),userController.createGetAll )
router.get('/:id',userController.createGetSingle )
router.put('/:id', userController.createGetPut)
router.delete('/:id',userController.createDelete )
export const userRouter=router;