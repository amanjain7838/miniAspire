import { NextFunction, Request, Response } from "express";
import db from '../dependencyInjection/sequelize';
import ApiResponse from '../utils/Response';
import Utility from '../utils/Functions';
import Config from 'config';
import moment from 'moment';
import { Op } from "sequelize";
import { isValid } from "../utils/common";

export default class PaymentsModule {

    public async makeRepayment(req:Request){
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
                    METHOD: this.constructor.name + "@" + this.makeRepayment.name,
                    REQUEST: req.params,
                    MESSAGE:"Loan doesn't exists",
                    RESPONSE: loanDetails
                }).info();
                return ApiResponse.setValidateErrorResponse(400,"Loan doesn't exists");
            }
            if(loanDetails.approval !== "APPROVED")  {
                await t.rollback();
                Utility.log({
                    METHOD: this.constructor.name + "@" + this.makeRepayment.name,
                    REQUEST: req.params,
                    MESSAGE:"Loan is already approved!",
                    RESPONSE: loanDetails
                }).info();
                return ApiResponse.setValidateErrorResponse(400,"Loan is not approved yet!");
            }
            const scheduledEmi = await db.Payments.findOne({
                where: {
                    loanId: req.params.loanId,
                    published: "1",
                    payableOn: {
                        [Op.gte]: moment().subtract(1, 'week'),
                        [Op.lte]: moment().add(1, 'week')
                    }
                }
            }); 
            if(!scheduledEmi) {
                await t.rollback();
                Utility.log({
                    METHOD: this.constructor.name + "@" + this.makeRepayment.name,
                    REQUEST: req.params,
                    MESSAGE:"No scheduled emi found!",
                    RESPONSE: loanDetails
                }).info();
                return ApiResponse.setValidateErrorResponse(400,"No scheduled emi found! Hint: Change the upcoming emi date to past date. We are finding current week emi.");
            }
            let _amountToPay = parseFloat(req.body.amount);
            let emipaid = (isValid(scheduledEmi.amountPaid)?parseFloat(scheduledEmi.amountPaid)+_amountToPay:_amountToPay);
            await db.Payments.update({
                amountPaid: emipaid
            },{
                where: {
                    id: scheduledEmi.id,
                },
                transaction: t
            });
            const _outstandingAmount = loanDetails.outStandingAmount-_amountToPay;
            await db.Loan.update({
                outStandingAmount: _outstandingAmount,
                loanStatus: (_outstandingAmount>0?"Active":"Paid")
            },{
                where: {
                    id: req.params.loanId
                },
                transaction: t
            })
            await t.commit();
            return ApiResponse.setSuccessResponse("Emi Paid Successfully!");
        }
        catch(error:any) {
            await t.rollback();
            Utility.log({
                METHOD: this.constructor.name + "@" + this.makeRepayment.name,
                REQUEST: JSON.stringify(req.body),
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }
    }
}