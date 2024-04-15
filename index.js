import express from 'express';

const app = express();

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Hello');
});

app.post('/auth/login', (req,res) => {
    res.json({
        success:true
    });
})

app.listen(8083, (err) => {
    if(err){
        return console.log(err);
    }

    console.log("Server Ok");
});

