import { UserAttributes, UserCreationAttributes } from './Interface/User';
import { Model, DataTypes, Sequelize, Association } from 'sequelize';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    email!: string;
    password!: string;
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
            email:{
				type: DataTypes.STRING,
				allowNull: false,
            },
			password: {
				type: DataTypes.STRING,
				allowNull: false
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
			tableName: "user",
			sequelize,
			freezeTableName: true,
		}
    );
  }
}
export default User;
