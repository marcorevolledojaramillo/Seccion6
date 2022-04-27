const axios = require('axios');
const { guardarDB,leerDB } = require('../helpers/dbcontroller');

class Busquedas{
    historial=[];

    constructor(){
       this.cargarHistorialDB();
    }
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,  
            'limit':5,
            'language':'es'
       }; 
    }
    get paramsOpenWheather(){
        return {
            'appid': process.env.OPENWHEATHER_KEY,  
            'lang':'es',
            'units':'metrics'
       }; 
    }

    get historialCapitalizado(){
        return this.historial.map(lugar=>{

            let palabras = lugar.split(' ');
            palabras= palabras.map(p => p[0].toUpperCase() +p.substring(1));
            return palabras.join(' ');
        })
    }
    async ciudad(lugar = ''){
        //Penticion http
        try{

            const instance =axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();

            return resp.data.features.map(lugar =>({
                id:lugar.id,
                nombre: lugar.place_name_es,
                lng:lugar.center[0],
                lat:lugar.center[1]
            }));
        }catch(error){
             return[]; // Retornar todos los lugares
        }
        
    }
    async clima(lat,lon){

        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsOpenWheather, lat, lon}
                
            }) ;
             const response = await instance.get();
            
             const {weather, main}= response.data;
             return  {
                 desc:weather[0].description,
                 min:main.temp_min,
                 max:main.temp_max,
                 temp:main.temp
             };
        }catch(err){
            console.log(err);
            return [];
        }


        


    }

    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
        
    }

    guardarDB(){
        const payload={
            historial:this.historial
        };
        guardarDB(payload);
    }

    cargarHistorialDB(){
        const data= leerDB();
        console.log(data);
        data.historial.forEach(element => {
            this.historial.unshift(element);
        });
       

    }
}
module.exports=Busquedas;