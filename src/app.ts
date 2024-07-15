import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './inversify.config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import config from 'config'
import { connectDB } from './db'
import './controllers'
const server=new InversifyExpressServer(container)

server.setConfig(app=>{
    app.use(express.json())
    app.use(cors())
    app.use('/public',express.static(path.join(__dirname,'public','uploads')))
})

const app=server.build()

app.listen(config.get("PORT"),()=>{
    console.log(`Server connected to port ${config.get("PORT")}`);
    connectDB()
    .then(()=>{
        console.log(`DB Connected !!`);
    })
    .catch((error)=>{
        console.log(`Error in connecting DB !!`);
    })
})