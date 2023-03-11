if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const corsConfig = {
  origin: 'http://localhost:4200',
};
const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

(async function bootstrap() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('\nConnected to DB.');
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}.`)
    );
  } catch (error) {
    console.log(error);
  }
})();
