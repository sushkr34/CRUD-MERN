const express = require('express')
const app = express()
const mongoose =require('mongoose')
const cors=require('cors')
mongoose.connect('mongodb+srv://userName:<password>@cluster0.bhvnh.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api',require('./routes/index'))


const port = process.env.PORT | 8080



app.listen(port)