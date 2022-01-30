const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:0412Gt98@sandboxcluster.1ywmx.mongodb.net/authBase?retryWrites=true&w=majority"

const connectDatabase = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
    }, (err) => {
        if(err) console.log(err);
    });
    console.log('Database connected');
}

module.exports = connectDatabase