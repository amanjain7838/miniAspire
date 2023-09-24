import { AccessControlAttributes, AccessControlCreationAttributes } from './Interface/AccessControl';
import { Model, DataTypes, Sequelize, Association } from 'sequelize';

class AccessControl extends Model<AccessControlAttributes, AccessControlCreationAttributes> implements AccessControlAttributes {
  id!: number;
  userid!: number;
  accesslevel!: number;
  published!: string;
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
        userid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        accesslevel: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        published: {
          type: DataTypes.ENUM('-1','0','1'),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        }
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "accessControl",
      }
    );
  }
}


export default AccessControl;