const mongoose = require('mongoose')
const app=require('./app')
const Products = require('./models/products')
const newProducts = require('./models/seed')
require('dotenv').config();

const PORT = process.env.PORT||4000;
const DATABASE=process.env.DATABASE;
const MONGO_USER=process.env.MONGO_USER;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
const MONGO_BASE_URL=process.env.MONGO_BASE_URL;
const MONGO_URL=`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${DATABASE}?retryWrites=true&w=majority`

const resetDb = async() =>{
  await Products.deleteMany();
  console.log('db resetted')
}

mongoose.connect(MONGO_URL).then(async()=>{
  console.log('database connected')
  await resetDb();
  const seedData = await Products.create(newProducts)
  console.log(seedData)

  app.listen(PORT, () => { console.log('listening on', PORT) });
})
