import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'





// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)


app.get('/',(req,res)=>{
    res.send('Api Working')
})

app.listen(port , ()=>console.log(`Server started on PORT :  ${port}`)
)