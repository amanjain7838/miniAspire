# MiniAspire


## Problem Statement
Your task is to build a mini-aspire API:
It is an app that allows authenticated users to go through a loan application. It doesn’t have to contain too many fields, but at least “amount
required” and “loan term.” All the loans will be assumed to have a “weekly” repayment frequency.
After the loan is approved, the user must be able to submit the weekly loan repayments. It can be a simplified repay functionality, which won’t
need to check if the dates are correct but will just set the weekly amount to be repaid.


## Installation
The application is containerized using the docker. For running the docker use below command.
```
sudo docker-compose up --build --force-recreate
```
Run the shared sql to add the admin and sample user

## Features
- Complete backend is containerized so no extra installation required
- Using ORM for db connection
- Using Typescript
- Additional APIs are created to make the flow smooth
- Unit test coverage added
- Log support added
- APIs are versioned
- Request Validation Added
- Additional validation added to check the access control


## Seeders for development environment
```
npx sequelize-cli db:seed --seed  seeders/20230924133429-miniaspire-seeders.js
```
Additionally, Shared the db export in sql format


## API Description
- SignUp API
    ```
    /v1/signup
    ```
    Request method: POST
    | Payload | Description |
    | ------------ | ----------- |
    | `email`   | Email of the user. |
    | `password`  | Password. |
- Login API
    ```
    /v1/login
    ```
    Request method: POST
    | Payload | Description |
    | ------------ | ----------- |
    | `email`   | Email of the user. |
    | `password`  | Password. |
- Create Loan
    ```
    /v1/loans
    ```
    Add authorization token taken from LOGIN API and pass as bearer token
    Request method: POST
    | Payload | Description |
    | ------------ | ----------- |
    | `loanrequired`   | Amount for the loan. |
    | `tenure`  | EMI tenure. |
- Loan Approve
    ```
    /v1/loans/:loanId/approve
    ```
    Add authorization token taken from LOGIN API and pass as bearer token
    Request method: PUT
    | Payload | Description |
    | ------------ | ----------- |
    | `loanId`   | loan Id. |
- View user loan
    Normal user can view his own loans, while admin can view all users laon by passing customer id.
    ```
    /v1/customers/:customerId/loans
    ```
    Add authorization token taken from LOGIN API and pass as bearer token
    Request method: GET
    | Payload | Description |
    | ------------ | ----------- |
    | `customerId`   | customer Id. |
- View user loan
    EMI Tenure is calculated bases on the current week
    ```
    /v1/loans/:loanId/repayments
    ```
    Add authorization token taken from LOGIN API and pass as bearer token
    Request method: POST
    | Payload | Description |
    | ------------ | ----------- |
    | `customerId`   | customer Id. |
    | `amount`   | Amount for the emi. |