import {Request, Response, NextFunction, Router} from 'express';
import AdminController from '../../controller/v1/AdminController';
import LoanController from '../../controller/v1/LoanController';
import PaymentController from '../../controller/v1/PaymentController';
import UserController from '../../controller/v1/UserController';
import {authenticateUser, checkAdminPrivilege, checkLoanOwnership} from '../../middlewares/Authentication';
import RequestValidation from '../../middlewares/RequestValidation';

export default class IndexRoute{

    public router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes() {
        
        this.router.post('/signup',
            RequestValidation.validateGetUserSignUpForm,
            RequestValidation.handleValidationError,
            (req: Request, res: Response, next: NextFunction)=>new UserController().signup(req,res,next)
        );

        this.router.post('/login',
            RequestValidation.validateGetUserForm,
            RequestValidation.handleValidationError,
            (req: Request, res: Response, next: NextFunction)=>new UserController().login(req,res,next)
        );

        this.router.post('/loans',
            authenticateUser,
            RequestValidation.validateGetLoanForm,
            RequestValidation.handleValidationError,
            (req: Request, res: Response, next: NextFunction)=>new LoanController().createLoan(req,res,next)
        );

        this.router.put('/loans/:loanId/approve', 
            authenticateUser, 
            checkAdminPrivilege, 
            (req: Request, res: Response, next: NextFunction)=>new AdminController().approveLoan(req,res,next)
        );

        this.router.get('/customers/:customerId/loans', 
            authenticateUser, 
            checkLoanOwnership, 
            (req: Request, res: Response, next: NextFunction)=>new LoanController().getLoansDetails(req,res,next)
        );

        this.router.post('/loans/:loanId/repayments', 
            authenticateUser, 
            (req: Request, res: Response, next: NextFunction)=>new PaymentController().makeRepayment(req,res,next));
    }

}