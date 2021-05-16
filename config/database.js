const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://dw4157:passgosi1q2w@passmecluster.lxiau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }
        ) 
        .then(() => console.log('MongoDB connected..'))
        .catch(err => console.log(err.message));