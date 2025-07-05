const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRouter = require('./routes/Product')
const OrderRouter = require('./routes/order')
const UserRouter = require('./routes/users')
const CategoryRouter = require('./routes/category')
const authjwt = require("./auth/jwt")
dotenv.config();

const app = express();
const PORT = 3000;
const api = process.env.Api_Url;
app.use(authjwt())
app.use(express.json());
app.use(`${api}/product`, productRouter);
app.use(`${api}/order`,OrderRouter)
app.use(`${api}/users`,UserRouter)
app.use(`${api}/Category`,CategoryRouter)


mongoose.connect(process.env.db).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.error("DB connection error:", err));
