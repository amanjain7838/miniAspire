import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import UserController from '../../controller/v1/UserController';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  describe('signup', () => {
    it('success response when user is successfully created', async () => {
      const req = {
        body: {
          email: 'aman@gmail.com',
          password: '123456',
        },
      } as Request;

      const res = {
        status: (code: number) => {
          expect(code).to.equal(200);
          return {
            json: (data: any) => {
              expect(data.status).to.equal(200);
              expect(data.message).to.equal('Successfully signed up!');
            },
          };
        },
      } as unknown as Response;

      const next = () => {};

      userController.userModule.saveUser = async (email: string, password: string) => {
        return {
          status: 200,
          message: 'Successfully signed up!',
        };
      };

      await userController.signup(req, res, next);
    });

    it('error response when email already exists', async () => {
      const req = {
        body: {
          email: 'aman@gmail.com', 
          password: '123456',
        },
      } as Request;

      const res = {
        status: (code: number) => {
          expect(code).to.equal(409);
          return {
            json: (data: any) => {
              expect(data.status).to.equal(409);
              expect(data.message).to.equal('Authentication failed');
            },
          };
        },
      } as unknown as Response;

      const next = () => {};

      userController.userModule.saveUser = async (email: string, password: string) => {
        return {
          status: 409,
          message: 'Authentication failed',
        };
      };

      await userController.signup(req, res, next);
    });

  });

});