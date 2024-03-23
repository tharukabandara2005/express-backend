const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer');
const Employee = require('./models/employee');
const { encryptPassword, comparePassword } = require('./models/encrypt');
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

app.get('/api/orders/:id', async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);

    try {
        const customer = await Customer.findOne({"orders._id":req.params.id});
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
    try {

        const result = await Customer.deleteOne({ _id: customerId });
        res.json({ deletedCount: result.deletedCount });
    }
    catch (e) {
        res.status(501).json({ error: e.message });
    }



})

app.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);
    try {
        const result = await Customer.findOneAndReplace({ _id: customerId }, req.body, { new: true });
        res.json({ updatedCount: result });

    } catch (err) {
        res.status(501).json({ error: e.message });

    }

})
//post adding a resource and put in used to update a resource.



app.post('/api/customers', async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.json({ customer });

    } catch (e) {
        res.status(400).json({ error: e.message });
    }



})

app.patch('/api/customers/:id', async (req, res) => {

    const customerId = req.params.id;

    try {
        const result = await Customer.findOneAndUpdate({ _id: customerId }, req.body, { new: true });
        res.json({ updatedCount: result });

    } catch (err) {
        res.status(501).json({ error: e.message });

    }

})
app.patch('/api/orders/:id', async (req, res) => {

    const orderId = req.params.id;
    req.body._id=orderId;
    try {

        const result = await Customer.findByIdAndUpdate(
            { 'orders._id': orderId },
            //check the order id
            { $set: { 'orders.$': req.body } },
            { new: true }
        )
        if (result) {
            res.json(result)
        } else {
            res.json("error")
        }

    } catch (err) {
        res.status(501).json({ error: e.message });


    }

})
app.post('api/register/', async (req, res) => {

    console.log(req.body);

    const {username,email, password } = req.body
    const encyptedPassword = await encryptPassword(password)
    console.log(encyptedPassword)

    const emailExists = await userModel.findOne({ email: email })
    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' })
    }

    const user = userModel.create({ username,email, encyptedPassword })
    return res.json(user)



})




const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://tharuka:lucky@cluster0.ayxmxck.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB')

    }
    catch (err) {
        console.log(err);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}
start();
