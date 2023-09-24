import { NextFunction, Request, Response } from "express";
import db from '../dependencyInjection/sequelize';
import ApiResponse from '../utils/Response';
import Utility from '../utils/Functions';
import Config from 'config';
import moment from 'moment';

export default class LoanModule {

    public async createLoan(req:Request){
        try{
            const {loanrequired, tenure} = req.body;
            const {userid} = req.user;
            const data = {
                loanAmount:loanrequired,
                outStandingAmount:loanrequired,
                tenure:tenure,
                published:"1",
                approval: "PENDING",
                borrowerId:userid,
            };
            const Loan = await db.Loan.create(data);
            if(Loan) {
                return ApiResponse.setSuccessResponse(Loan);
            }
            return ApiResponse.setValidateErrorResponse(409,"Details are not correct");
        }
        catch(error:any) {
            Utility.log({
                METHOD: this.constructor.name + "@" + this.createLoan.name,
                REQUEST: JSON.stringify(req.body),
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }

    }

    public async approveLoan(req:Request){
        const t = await db.sequelize.transaction();
        try{
            const loanDetails = await db.Loan.findOne({
                where: {
                    id: req.params.loanId
                }
            });
            if(!loanDetails) {
                await t.rollback();
                Utility.log({
                    METHOD: this.constructor.name + "@" + this.approveLoan.name,
                    REQUEST: req.params,
                    MESSAGE:"Loan doesn't exists",
                    RESPONSE: loanDetails
                }).info();
                return ApiResponse.setValidateErrorResponse(400,"Loan doesn't exists");
            }
            if(loanDetails.approval == "APPROVED")  {
                await t.rollback();
                Utility.log({
                    METHOD: this.constructor.name + "@" + this.approveLoan.name,
                    REQUEST: req.params,
                    MESSAGE:"Loan is already approved!",
                    RESPONSE: loanDetails
                }).info();
                return ApiResponse.setValidateErrorResponse(400,"Loan is already approved!");
            }
            let payments = [];
            let currentPaymentDate = moment();
            let loanAmount = loanDetails.loanAmount;
            let _emi = loanAmount/loanDetails.tenure;

            for(let i = 0; i < loanDetails.tenure; i++) {
                currentPaymentDate.add(1, 'week');
                if(i<(loanDetails.tenure-1))
                    loanAmount-=parseInt(_emi.toFixed(2));
                else
                    _emi = loanAmount.toFixed(2);
                payments.push({
                    loanId: req.params.loanId,
                    emi: _emi,
                    payableOn: currentPaymentDate.toDate(),
                    approval: "APPROVED",
                    published: "1"
                })
            }
            await db.Payments.bulkCreate(payments);
            await db.Loan.update({
                approval: "APPROVED",
                approvedBy: req.user.userid
            },{
                where: {
                    id: req.params.loanId,
                },
                transaction: t
            })
            await t.commit();
            return ApiResponse.setSuccessResponse("Loan successfully approved!");
        }
        catch(error:any) {
            await t.rollback();
            Utility.log({
                METHOD: this.constructor.name + "@" + this.approveLoan.name,
                REQUEST: JSON.stringify(req.body),
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }
    }

    public async getLoansDetails(req:Request){
        try{
            const {userid} = req.user;
            const loans = await db.Loan.findAll({
                where: {
                    borrowerId: userid
                },
                include:[{
                    model: db.Payments,
                    as: "Payments",
                    where:{published:"1"},
                    required:false
                }]
            });
            if(loans) {
                return ApiResponse.setSuccessResponse(loans);
            }
            return ApiResponse.setValidateErrorResponse(409,"Details are not correct");
        }
        catch(error:any) {
            Utility.log({
                METHOD: this.constructor.name + "@" + this.createLoan.name,
                REQUEST: JSON.stringify(req.body),
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }
    }
}