import {Optional} from 'sequelize';

export interface AccessControlAttributes {
    id: number;
    userid: number;
    accesslevel: number;
    published: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AccessControlCreationAttributes extends Optional<AccessControlAttributes, "id"> {}