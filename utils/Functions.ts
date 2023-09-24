import moment from "moment-timezone";
import winston from "./Logger";
export default {

    /**
     * This function is to log the details in log file
     * @param data 
     */
    log : function(data:any, request:any=null, type: string = 'error'):any {
        const details: any = typeof data == "string" ? JSON.parse(data) : data;
        if (request) {
            details.HTTP_USER_AGENT = request.headers["user-agent"];
            details.REQUEST = request.originalUrl;
            details.REQUEST_BODY = request.body;
            details.REQUEST_PARAMS = request.params;
            details.REQUEST_QUERY_PARAMS = request.query;
        }

        details.TIMESTAMP = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
        
        return {
            info : function() {
                winston.info(details);
            },
            error : function() {
                winston.error(details)
            }
        }
        
    }
}