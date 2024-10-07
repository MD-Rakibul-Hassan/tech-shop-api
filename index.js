// Dependencies part start //

const express = require('express');
const db = require('./config/db/db_connect')
const cors = require('cors')

require('dotenv').config();


// Imports or Require Routes 
const regesterRouter = require('./routes/user_router');
const productRouter = require('./routes/product_route');
const cartRouter = require('./routes/cart_route');
const addressRoute = require('./routes/address_route')

// Dependencies part end //

// App Maked here 
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())

// Routes part start //
app.get('/', (req, res) => {
    res.send({message:"Welcome to home of tech-shop"})
})

app.use('/api/user', regesterRouter) // '/api/user/regester';
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address', addressRoute)
// Routes part end //





// App listening here //
app.listen(port,() => console.log("Tech Shop is Running on PORT : ",port))