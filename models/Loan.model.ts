import { LoanAttributes, LoanCreationAttributes } from './Interface/Loan';
import { Model, DataTypes, Sequelize, Association } from 'sequelize';

class Loan extends Model<LoanAttributes, LoanCreationAttributes> implements LoanAttributes {
    id!:number;
    loanAmount!: number;
    outStandingAmount!: number;
    published!: number;
    approval!: string;
    borrowerId!: number;
    approvedBy!: number;
    tenure!: number;
	loanStatus!: string;
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
            loanAmount:{
				type: DataTypes.DECIMAL(20, 2),
				allowNull: false,
            },
            outStandingAmount:{
				type: DataTypes.DECIMAL(20, 2),
				allowNull: false,
            },
			published: {
				type: DataTypes.ENUM('-1','0','1'),
				allowNull: false,
			  },
			approval:{
				type: DataTypes.STRING,
				allowNull: false,
            },
			borrowerId:{
				type: DataTypes.INTEGER,
				allowNull: false,
            },
			tenure:{
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			approvedBy:{
				type: DataTypes.INTEGER,
            },
			loanStatus:{
				type: DataTypes.STRING,
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
			sequelize,
			tableName: "loan",
			freezeTableName: true,
		}
    );
  }
}

export default Loan;