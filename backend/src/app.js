const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer');

const PORT = process.env.PORT || 7500;
const conn = process.env.MONGO;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();

}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const customer = new Customer({
    name: 'Acme Corp',
    industry: 'Manufacturing'
});
customer.save();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/customers/:id', async (req, res) => {
    
})

app.get('/api/customers', async (req, res) => {
    try {
        const result = await Customer.find();
        res.json({ "customers": result });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }


})

app.post('/api/customers', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        industry: req.body.industry
    });
    try {
        await customer.save();

    } catch (e) {
        res.status(400).json({ error: e.message });
    }

    res.json({ customer });

})



const start = async () => {
    try {
        await mongoose.connect(conn);

    }
    catch (err) {
        console.log(err);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}
start();
