import { NextFunction, Request, Response } from "express";
import PaymentModule from '../../modules/PaymentModule';
import ApiResponse from '../../utils/Response';


export default class PaymentController {

	paymentModule;
    constructor(){
		this.paymentModule = new PaymentModule();
	}

    public async makeRepayment(req:Request,res:Response,next:NextFunction){
        this.paymentModule.makeRepayment(req).then(response=> res.status(response.status).json(response)).catch(err=> ApiResponse.setFailureResponse(err))
    }

}