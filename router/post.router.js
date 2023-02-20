
const express = require ("express")
const cors = require ("cors")
const { postModel } = require ("../model/post")

const postrouter= express.Router()

postrouter.use(express.json())
const {authentication} = require ("../middleware/authentication")

postrouter.use(cors())
postrouter.use(authentication)

// postrouter.get("/",async(req,res)=>{

//     const post = await postModel.find()

//     res.send({"msg":post})


// })

postrouter.get("/",async(req,res)=>{

    const qry = req.query.device
    if(qry)
    {
        const post = await postModel.find({device:qry})

    res.send({"msg":post})
    }
    else
    {
        const post = await postModel.find()
    
        res.send({"msg":post})

    }


})


// postrouter.get("/top",async(req,res)=>{

//     const post = await postModel.find()

//    let cmt_no= post.map((el)=>{
//         // let comments = el.no_of_comments
//         // let id = el._id

//         let notebook=0;

//         for(let posts of el)
//         {
//             if(posts.no_of_comments > notebook)
//             {
//                 notebook = posts.no_of_comments
//             }
//             return posts._id
//         }
//     })

//     res.send({"msg":cmt_no})


// })




postrouter.post("/create",async(req,res)=>{

    const details = req.body

    try{
         const post = new postModel(details)
         await post.save()
         res.send({"msg":"post done"})

    }
    catch(err)
    {
        res.send({"msg":err})
    }

})


postrouter.delete("/delete/:id",async(req,res)=>{
    
    const id=req.params.id
    
    
    const post = await postModel.findByIdAndDelete({_id:id})

    res.send({"msg":"post delete"})
}) 

postrouter.patch("/update/:id",async(req,res)=>{
    
    const id=req.params.id
     

    const updateDetaild=req.body
    
    const post = await postModel.findByIdAndUpdate({_id:id},updateDetaild)

    res.send({"msg":"post update"})
}) 

module.exports={postrouter}