/**
 * 
 */
/**
 * Configuración de mongoose
 */
const mongoose = require("mongoose");
let dev_db_url = 'mongodb://admin:admin123@ds135003.mlab.com:35003/db_escuela';
mongoose.connect(dev_db_url,{useNewUrlParser : true});
console.log(mongoose.connection.readyState);
///2 OK ---success