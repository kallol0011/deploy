
const jwt= require("jsonwebtoken")

function authentication (req,res,next){

 const token = req.headers.token

  if(token)
  {

    jwt.verify(token,"msi",(err,decode)=>{
        if(decode)
        {
            next()
        }
        else 
        {
            res.send({"msg":"err"})
        }
    })
  }
  else
  {
    res.send({"msg":"login first"})
  }


}

module.exports={authentication}



