const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    if(!fs.existsSync('./db/')){
        fs.mkdirSync('./db/',{ recursive: true });
    }
    fs.writeFileSync(archivo,JSON.stringify(data));

};


const leerDB = () => {
    if(!fs.existsSync(archivo)){
        return null;
    }

    const info=fs.readFileSync(archivo,{encoding:'utf8'});
    const data= JSON.parse(info);
    return data;
};

module.exports={
    guardarDB,
    leerDB
}

