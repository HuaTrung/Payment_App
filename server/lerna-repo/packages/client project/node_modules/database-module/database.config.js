// username and password to connect mongo db
const mongoURL = "mongodb://shinigami:Shinigami1997@ds243812.mlab.com:43812/online_payment";


const ConnectDatabase = (mongoose) => {
    mongoose
        .connect(mongoURL, { useNewUrlParser: true })
        .then( () => console.log('MongoDB connected successfully') )
        .catch( err => console.log(err) );

}

module.exports.ConnectDatabase = ConnectDatabase;