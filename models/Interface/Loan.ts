import {Optional} from 'sequelize';

export interface LoanAttributes {
    id:number;
    loanAmount: number;
    outStandingAmount: number;
    published: number;
    approval: string;
    borrowerId: number;
    approvedBy: number;
    tenure: number;
    loanStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoanCreationAttributes extends Optional<LoanAttributes, "id"> {}