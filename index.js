const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors');
const bodyParser=require('body-parser');
const app = express();
const mongoose=require('mongoose');
app.use(bodyParser.json())
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
const mongoURI=process.env.MONGO_URL;
mongoose
    .connect(
        mongoURI,
        {  useUnifiedTopology: true  ,useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))
mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
})
var AirChat = require('./routers/router')

app.use('/', AirChat)
// app.get('/users', (req, res) => {
//     const users = [
//         {id: 1, firstName: 'John', lastName: 'Doe'},
//         {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//         {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//     ];
//
//     res.json(users);
// });

const port =process.env.PORT|| 3000;

app.listen(port, () => `Server running on port ${port}`);