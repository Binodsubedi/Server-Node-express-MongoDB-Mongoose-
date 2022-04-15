const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successfull'))
  .catch((err) => console.log(err));

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening in the port ${port}`);
});
