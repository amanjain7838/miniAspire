import { NextFunction, Request, Response } from "express";
import LoanModule from '../../modules/LoanModule';
import ApiResponse from '../../utils/Response';


export default class AdminController {

	loanModule;
    constructor(){
		this.loanModule = new LoanModule();

    }

    public async approveLoan(req:Request,res:Response,next:NextFunction){
        this.loanModule.approveLoan(req).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
    }

}