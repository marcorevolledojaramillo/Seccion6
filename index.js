require('dotenv').config();
require('colors');

const {inquirerMenu, pausa, leerInput, listadoCiudades}=require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main= async()=>{
    
    const busquedas= new Busquedas();
    do{
        opt = await inquirerMenu(); //Abrir Menu

        switch (opt) {
            case 1://Buscar ciudad

                //Mostrar mensaje
                const lugar =  await leerInput('Ingre el lugar que desee buscar: ');
                
                //Buscar los lugares
                const lugares= await busquedas.ciudad( lugar );
                
                //Seleccionar el lugar
                const id= await listadoCiudades(lugares);
                if(id==0) continue;
                
                const lugarSel = lugares.find(l=> l.id===id);

                busquedas.agregarHistorial(lugarSel.nombre);
                

                //Clima
                const clima = await busquedas.clima(lugarSel.lat,lugarSel.lng);
                console.clear();
                console.log('\nINFORMACION DE LA CIUDAD\n'.green);
                console.log('Ciudad: ',lugarSel.nombre)
                console.log('Lat: ',lugarSel.lat)
                console.log('Lng: ',lugarSel.lng)
                console.log('Temperatura: ',clima.temp)
                console.log('Temperatura minima: ',clima.min)
                console.log('Temperatura maxima: ',clima.max)
                console.log('¿Cómo esta el clima?: ',clima.desc)
            break;

            case 2://Historial
                console.clear();
                console.log('___________________________________')
                console.log('\t\tHISTORIAL')
                console.log('___________________________________\n')
                
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx=`${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
            break;

            case 0:
            break;

            default:break;
        }
        await pausa();     
        
    }while(opt!==0);
    console.clear();
}

main();