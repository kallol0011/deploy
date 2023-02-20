const express = require ("express")
const cors = require ("cors")
const app = express()
require('dotenv').config()
const bcrypt= require ("bcrypt")
const jwt= require("jsonwebtoken")
const { connection } = require ("./model/config")
const { authModel } = require ("./model/auth")
const {postrouter}=require("./router/post.router")

app.use (express.json())


app.use(cors())

app.use("/posts",postrouter)

const port = process.env.port;


app.post("/users/register",async(req,res)=>{
    
    const {name,email,gender,password,age,city} = req.body

    try{
          bcrypt.hash(password,5,async(err,hash)=>{
            if(err)
            {
                res.send({"msg":"fill all the details",err})
            }
            else 
            {
                const user = new authModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({"msg":"register done",user})
            }
          })
        }
        catch(err)
        {
            res.send({"msg":"fill the details"})
         
        }
    
    
    })
        

          app.post("/users/login",async(req,res)=>{
            
            const {email,password} = req.body
            
            try{
                    
                 const user = await authModel.find({email})

                 if(user.length>0)
                 {
                    bcrypt.compare(password,user[0].password,(err,result)=>{
                        if(result)
                        {
                            const token=jwt.sign({auth:"userdetails"},"msi")

                            res.send({"msg":"login done",token:token})
                        }
                        else 
                        {
                            res.send({"msg":"Id and password not matched"})
                        }
                    })
                 }

            }
            catch(err)
            {
                res.send({"msg":"Id and password are not valid"})
            }

          })

    



app.listen(port,async()=>{
    try{
         await connection
    console.log(`server is running ${port}`)
    
    
    }

    catch(err)
    {
console.log(err)
    }
})
