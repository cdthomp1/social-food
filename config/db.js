const mongoose = require('mongoose');

const prod = 'mongodb+srv://cameronthompson:304439-ad@transactions-pez1f.mongodb.net/Social-food?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(prod, {
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(err) {
        console.log(`HERE ERROR: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;