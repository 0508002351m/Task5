const db = require("../../models/dbConnection")
const showAll = (req,res)=>{
    db((err,connection)=>{
    connection.collection("customer").find().toArray((e,data)=>{
        if (e) res.send(e)
        res.render("showAll",{
            pagetitle:"All users",
            data
        })
    })

    })
    
}

const addOp = (req,res)=>{

    res.render("addoperation",{

        pagetitle:"add operation"
    })
}



const addLogOp = (req,res)=>{

    const id = req.body.id
    const opvalue = req.body.opvalue
    const optype = req.body.optype
    
    db((err,connection)=>{
        connection.collection("customer").find().toArray((e,data)=>{
            if (e) res.send(e)
            let index = data.findIndex(u=>u._id==id)

            if (req.body.addop)         
            {   
               if (!(id && opvalue && optype)) {res.redirect("addoperation")}
           
               { if(optype=="add" && opvalue<=6000){
               
                   data[index].remainingbalance = Number(data[index].remainingbalance) +Number(req.body.opvalue)
               }
               else if(optype=="withdraw" && opvalue<data[index].remainingbalance){
                   
                data[index].remainingbalance = Number(data[index].remainingbalance) -Number(req.body.opvalue)
              
           }
            else(res.redirect("addoperation"))}
           
           let operation = { type: req.body.optype,
               value: req.body.opvalue,
               at: new Date()
           }
           data[index].operations.push(operation)
           
           res.redirect("/")
           }
           }
        )
    
        })}
    
   
    



const show = (req,res)=>{
const id = req.params.id
db((err,connection)=>{
    connection.collection("customer").find().toArray((e,data)=>{
        if (e) res.send(e)
        const cust = data.find(u=>u._id==id)
        if(req.query.showCu) if(!cust) res.send("user not fond")
        res.render("show",{
            pageTitle:"show",
           cust
        })
    }
    )

    })

}

const addCust = (req,res)=>{
res.render("add",{
    pageTitle:"Add new customer"
})
}
const addLogCust = (req,res)=>{
    let customers = {
        name: req.body.name,
        intialbalance: req.body.intiabalance,
        operations: []
    }
    db((err,connection)=>{
      connection.collection("customer").insertOne(customers,(e,result)=>{
          if(e) res.send(e)
          res.redirect("/")
      })
  })
        // operations:[]
}


module.exports = 
    {
        showAll,addCust,addOp,show,addLogCust,addLogOp
    }