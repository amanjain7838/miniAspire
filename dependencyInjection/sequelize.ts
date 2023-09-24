import fs from 'fs';
import path from 'path';
import {Sequelize} from 'sequelize';


const dbName = process.env.MYSQL_DATABASE as string;
const dbUser = process.env.MYSQL_USERNAME as string;
const dbHost = process.env.MYSQL_HOST;
const dbPort = process.env.MYSQL_PORT as any;
const dbPassword = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(
	dbName,
	dbUser,
	dbPassword,
	{
		dialect: 'mysql',
		host: dbHost,
		port: dbPort,
		logging: true,
	}
);

const db:any = {};
const models = path.join(__dirname, '../models/'); 

fs.readdirSync(models)
	.filter(function (file) {
		return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
	})
	.forEach(function (file) {
		const model = require(path.join(models, file)).default;
		db[model.name] = model;
		model.initialize(sequelize);
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
require('./associations')(db);

// This creates the table if it doesn't exist (and does nothing if it already exists)
sequelize.sync().then((_result) => {
		console.log('Sequelize: All models were synchronized successfully.');
	}).catch((err) => {
		console.log(err);
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({ force: false, alter: true })

export default db;