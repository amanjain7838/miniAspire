module.exports = function (models:any) {

  models.Payments.belongsTo(models.Loan, {
    foreignKey: 'loanId'
  });
  models.Loan.hasMany(models.Payments, {
    foreignKey: 'loanId'
  }); 


  models.Loan.belongsTo(models.User, {
    foreignKey: 'borrowerId'
  });
  models.User.hasOne(models.Loan, {
    foreignKey: 'borrowerId'
  });

  models.Loan.belongsTo(models.User, {
    foreignKey: 'approvedBy',
    // allowNull: true
  });
  models.User.hasOne(models.Loan, {
    foreignKey: 'approvedBy',
    allowNull: true
  });

  models.AccessControl.belongsTo(models.User, {
    foreignKey: 'userid'
  });
  models.User.hasOne(models.AccessControl, {
    foreignKey: 'userid'
  });

};