import {Optional} from 'sequelize';

export interface PaymentsAttributes {
    id: number;
    loanId: number;
    emi: number;
    payableOn: Date;
    published: number;
    approval: string;
    amountPaid: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentsCreationAttributes extends Optional<PaymentsAttributes, "id"> {}