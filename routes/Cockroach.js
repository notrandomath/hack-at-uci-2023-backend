const express = require("express");
const router = express.Router();
//const {body, validationResult} = require("express-validator");
require("dotenv").config();

const Sequelize = require("sequelize-cockroachdb");
const connectionString = process.env.DATABASE_URL
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "docs_simplecrud_node-sequelize"
  }
});


// Define the Account model for the "accounts" table.
const Account = sequelize.define("accounts", {
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  number: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

// Create the "accounts" table.
async function createAccount(account)
{   
    return Account.create({
        username: account.username,
        password: account.password,
        number: account.number,
    });
}

router.get("/all", async (req, res) => {
    const response = await Account.findAll()
    console.log(response)
    res.send(response)
})

router.post("/loadAccount", async (req, res) => {
    const accountBody = req.body;
    const results = await Account.findAll({
        where:{
            username: accountBody.username,
            password: accountBody.password
            }
    });
    res.send(results)
});


router.post("/createAccount", async (req,res) => {
    Account.sync({force: false}).then(() => {
    const accountBody =  req.body;
    
    createAccount(accountBody);
    res.send("something happened");

    
    //res.json();
    }
    )
}); 

module.exports = router;