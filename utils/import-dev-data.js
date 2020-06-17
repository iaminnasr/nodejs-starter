const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Province = require('../models/provinceModel');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const province = JSON.parse(fs.readFileSync(`${__dirname}/../province.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Province.create(province);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Province.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
