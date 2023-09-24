import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
const config = require('config');
import db from '../dependencyInjection/sequelize';
import UserModule from '../modules/UserModule';

export async function authenticateUser(req:Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                let verificationResponse = jwt.verify(authorization[1], config.get("auth.secret"));
                req.user = verificationResponse;
                next();
            }
        } catch (err) {
            return res.status(403).send('Access denied');
        }
    } else {
        return res.status(401).send('Access denied');
    }
}

export async function checkAdminPrivilege(req:Request, res: Response, next: NextFunction) {
    const isUserAdmin = await new UserModule().checkAdminAccess(req.user.userid);
    if(isUserAdmin)
        next();
    else
        return res.status(401).send('Access denied');
}

export async function checkLoanOwnership(req:Request, res: Response, next: NextFunction) {
    if(req.user.userid == req.params.customerId)
        next();
    else {
        const isUserAdmin = await new UserModule().checkAdminAccess(req.user.userid);
        if(isUserAdmin)
            next();
        else
            return res.status(401).send('Access denied');
    }
}