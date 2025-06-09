let cors = require("cors");
let express = require("express");
let app = express();
let { getAllEmployees,  getEmployeeById} = require("./cantrollers/index")
// get all employees

app.get("/employees", async (req, res) => {
  let result = await getAllEmployees();
  res.status(200).json(result)
});


// get employee by id 

app.get("/employee/id/:id", async (req, res) => {
  try{
    let id = parseInt(req.params.id);
    let result = await getEmployeeById(id)
      if(result.employee.length === 0){
        res.status(404).json("no employee found")
      }
    res.status(200).json(result)
  }catch(error){
    res.status(500).json({error: error.message})
  }
   
})


module.exports = {
  app
}
 