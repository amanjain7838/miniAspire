import bcrypt from 'bcrypt';
import db from '../dependencyInjection/sequelize';
import ApiResponse from '../utils/Response';
import Utility from '../utils/Functions';
import jwt from 'jsonwebtoken';
import Config from 'config';

export default class UserModule {

    public async saveUser(email:string, password:string) {
        try{
            const emailcheck = await db.User.findOne({
                where: {
                    email,
                }
            });
            if (emailcheck) {
                return ApiResponse.setValidateErrorResponse(409,"Authentication failed");
            }
            const _password = await bcrypt.hash(password, 10);
            const data = {
                email,
                password: _password
            };
            const user = await db.User.create(data);
            if (user) {
                return ApiResponse.setSuccessResponse("Successfully signed up!")
            } else {
                return ApiResponse.setValidateErrorResponse(409,"Details are not correct");
            }
        }
        catch(error:any) {
            Utility.log({
                METHOD: this.constructor.name + "@" + this.saveUser.name,
                REQUEST: email,
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }
    }

    public async loginUser(email:string, password:string) {
        try{
            const user = await db.User.findOne({
                where: {
                    email,
                }
            });
            if (user) {
                const isSame = await bcrypt.compare(password, user.password);
                if (isSame) {
                    const response = {token:""};
                    response.token = jwt.sign({ userid: user.id }, Config.get("auth.secret"));
                    return ApiResponse.setSuccessResponse(response)
                }
            }
            return ApiResponse.setValidateErrorResponse(409,"Authentication Failed");
        }
        catch(error:any) {
            Utility.log({
                METHOD: this.constructor.name + "@" + this.loginUser.name,
                REQUEST: email,
                RESPONSE: error.stack
            }).error();
            return ApiResponse.setFailureResponse(error);
        }
    }


    public async checkAdminAccess(userid:number) {
        const user = await db.User.count({
            where: {
                id: userid
            },
            include:[{
                model: db.AccessControl,
                as: "AccessControl",
                where:{published:"1",accesslevel:Config.get("accesslevel.admin")}
            }]
        });
        if(user>0)
            return true;
        return false;
    }
}