const mongoose = require('mongoose');
const app = require('./app');
const port = 3000; // process.env.PORT

mongoose.connect('mongodb://localhost:27017/sonado', (err, res)=>{
    if(err){
        console.log(`El error es: ${err}`);
    }else{
        console.log('Funciona!');
        // app.set('port', process.nev.PORT || 3000); -> configuracion  de puerto del hosting
        app.listen(port, ()=>{
            console.log(`Puerto: ${port}`);
        });
    }
});