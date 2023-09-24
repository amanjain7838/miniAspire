import { NextFunction, Request, response, Response } from "express";
import UserModule from '../../modules/UserModule';
import ApiResponse from '../../utils/Response';

export default class UserController {

    userModule;
    constructor(){
        this.userModule = new UserModule();
	}

    public async login(req:Request,res:Response,next:NextFunction){
        this.userModule.loginUser(req.body.email,req.body.password).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
    }

    public async signup(req:Request,res:Response,next:NextFunction){
        // this.
        this.userModule.saveUser(req.body.email,req.body.password).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
    }
}