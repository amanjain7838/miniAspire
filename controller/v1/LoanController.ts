import { NextFunction, Request, Response } from "express";
import LoanModule from '../../modules/LoanModule';
import ApiResponse from '../../utils/Response';

export default class LoanController {

	loanModule;
	constructor(){
		this.loanModule = new LoanModule();
	}

	public async createLoan(req:Request,res:Response,next:NextFunction){
        this.loanModule.createLoan(req).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
	}


	public async getLoansDetails(req:Request,res:Response,next:NextFunction){
        this.loanModule.getLoansDetails(req).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
	}
}
