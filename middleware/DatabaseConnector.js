const mongoose = require('mongoose');

module.exports.mongoConnect = () => {
    mongoose.connect(process.env.DBLINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).catch((r) => {
        console.log(r)
    });
}
