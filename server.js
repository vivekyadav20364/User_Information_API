const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const UserRoutes=require('./routes/userRoutes');
const connectDB=require('./config/db');

app.use(express.json());
connectDB();

app.use('/api/user',UserRoutes);

app.get('/',(req,res)=>{
    res.send("Running");
});



app.listen(process.env.PORT,()=>{
  console.log(`Server running on ${process.env.PORT}`);
})