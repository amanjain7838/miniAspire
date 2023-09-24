import { validationResult, buildCheckFunction } from 'express-validator';
import {Request, Response, NextFunction } from 'express';
const checkQuery = buildCheckFunction(['query']);
const checkBody = buildCheckFunction(['body']);

class RequestValidation {
    validateGetUserForm:any;
    validateGetUserSignUpForm:any;
    validateGetLoanForm:any;
    validateLoanApproveForm:any;

    constructor() {
        this.validateGetUserForm = this.setValidateGetUserForm();
        this.validateGetUserSignUpForm = this.setValidateGetUserForm();
        this.validateGetLoanForm = this.setValidateGetLoanForm();
        this.validateLoanApproveForm = this.setvalidateLoanApproveForm();
    }

    public setValidateGetUserForm() {
        return [
            checkBody('email').exists().isEmail(),
            checkBody('password').exists().isString(),
        ];
    }

    public setValidateGetLoanForm() {
        return [
            checkBody('loanrequired').exists().isNumeric(),
            checkBody('tenure').exists().isNumeric(),
        ];
    }
    public setvalidateLoanApproveForm() {
        return [
            checkQuery('loanId').exists()
        ];
    }
    public handleValidationError(req:Request, res:Response, next:NextFunction){
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400)
                    .json({ status:400, 
                            error: errors.mapped(),
                            message:'Requst parameters validation failure.' 
                        });
        }
        next();
    }
}

export default (new RequestValidation());