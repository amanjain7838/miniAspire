import {Optional} from 'sequelize';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}