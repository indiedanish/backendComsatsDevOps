const mongoose = require('mongoose');

const connectDB = async () => {
    const DATABASE_URI = "mongodb+srv://comsatsdevops:comsatsdevops@cluster0.ae9nhdc.mongodb.net/ComsatsDevOpsDB?retryWrites=true&w=majority"
    
    try {
        await mongoose.connect(DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB