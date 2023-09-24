import { PaymentsAttributes, PaymentsCreationAttributes } from './Interface/Payments';
import { Model, DataTypes, Sequelize, Association } from 'sequelize';

class Payments extends Model<PaymentsAttributes, PaymentsCreationAttributes> implements PaymentsAttributes {
    id!: number;
    loanId!: number;
    emi!: number;
    payableOn!: Date;
    published!: number;
    approval!: string;
    amountPaid!: number;
    createdAt!: Date;
    updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			loanId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			emi: {
				type: DataTypes.DECIMAL(20, 2),
				allowNull: false,
			},
			payableOn: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			approval: {
				type: DataTypes.STRING
			},
			amountPaid: {
				type: DataTypes.INTEGER
			},
			published: {
				type: DataTypes.ENUM('-1','0','1'),
				allowNull: false,
			},
			createdAt:{
				type: DataTypes.DATE, 
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			updatedAt:{
				type: DataTypes.DATE, 
				defaultValue: DataTypes.NOW,
				allowNull: false,
			}
		},
		{
			tableName: "payments",
			sequelize,
			freezeTableName: true,
		}
    );
  }
}

export default Payments;