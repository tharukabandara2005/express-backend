const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer');
const cors = require('cors');

const PORT = process.env.PORT || 7500;
const conn = process.env.MONGO;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();

}

app.use(cors());
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



app.get('/api/customers', async (req, res) => {
    try {
        const result = await Customer.find();
        res.json({ "customers": result });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }


})

app.get('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);

    try {
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json({ customer });

        }

    } catch (e) {
        res.status(501).json({ error: e.message });
    }
})

app.delete("/api/customers/:id", async (req, res) => {
    const customerId = req.params.id;
    try{

        const result=await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount:result.deletedCount });
    }
    catch(e){
        res.status(501).json({ error: e.message });
    }
    


})

app.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);
    try {
        const result = await Customer.findOneAndReplace({ _id: customerId }, req.body, { new: true });
        res.json({ updatedCount: result});

    } catch (err) {
        res.status(501).json({ error: e.message });

    }

})
//post adding a resource and put in used to update a resource.



app.post('/api/customers', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        industry: req.body.industry
    });
    try {
        await customer.save();
        res.json({ customer });

    } catch (e) {
        res.status(400).json({ error: e.message });
    }

    

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
