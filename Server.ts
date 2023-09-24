import express from 'express';
import Routes from './route/Index';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import db from './dependencyInjection/sequelize';

class Server{
    public static selfInstance:Server;
    public static app: express.Application;


    public static getInstance() {
        if(Server.selfInstance)
            return Server.selfInstance;
        console.log("server instance created");
        return new Server();
    }

    private constructor() {
        Server.app = express();
        this.init();
    }

    public init():void{
        this.loadMiddlewares();
        const routes = new Routes(Server.app);
    }

    private loadMiddlewares(): void{
        Server.app.use(logger('dev'));
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: false }));
        Server.app.use(cookieParser());
        Server.app.use(express.static(path.join(__dirname, 'public')));
        Server.app.set('view engine', 'pug')
        db;
        
        var corsOptions = {
          origin: ["http://localhost:3000"]
        };
        Server.app.use(cors(corsOptions));
        
    }

    public getApp(): express.Application{
        return Server.app;
    }


}
export default Server.getInstance();