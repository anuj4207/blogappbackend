const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const port =  process.env.PORT || 3000 
const blogRoute = require('./routes/blog_route')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
require('dotenv').config()
app.use(express.json())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE" );
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use('/api/v1/blog',blogRoute)
app.use(notFound)
app.use(errorHandler)
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port: ${port}`))
    } catch (error) {
     console.log(error);   
    }
}
start()