const express = require('express')
const app = express()
const cors =require('cors');
const port = process.env.PORT || 6001;
require('dotenv').config()


app.use(cors());
app.use(express.json());

//sushmitashetty8080
//password : m37lvsGbJVHN2FJ9

//mongodb+srv://sushmitashetty8080:m37lvsGbJVHN2FJ9@demo-foodi-cluster.jituo.mongodb.net/

//mongo db config


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.jituo.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    const menuCollections=client.db("demo-foodi-client").collection("menus");
    const cartCollections =client.db("demo-foodi-client").collection("cartitems");

    

    app.get("/menu",async(req,res)=>{
        const result =await menuCollections.find().toArray();
        res.send(result);
        

    })

    // all carts operations

    //Posting cart to db
    app.post("/carts",async(req,res)=>{
      const cartItem=req.body;
      const result=await cartCollections.insertOne(cartItem);
      res.send(result);
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Sushmita')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




























// const express = require('express')
// const app = express()
// const cors =require('cors');

// const port = process.env.PORT || 6002
// require('dotenv').config()

// app.use(cors());
// app.use(express.json());


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.jituo.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
    
//     await client.connect();
    
//     const menuCollections =client.db("demo-foodi-client").collection("menu");
//     const cartCollection =client.db("demo-foodi-client").collection("cartItems"); 

//     app.get("/menu",async(req,res)=>{
//               const result =await menuCollections.find().toArray();
//               res.send(result);
//               })


//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
    
    //await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })