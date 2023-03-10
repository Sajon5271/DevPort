const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const router = require('./router');
const fileUpload = require('express-fileupload')
const PORT = 3000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


(async function bootstrap () {
  try {
    await mongoose.connect('mongodb+srv://shuhat:shuhat234@newcluster.adznrpo.mongodb.net/?retryWrites=true&w=majority');
    console.log('\nConnected to DB.');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
})();