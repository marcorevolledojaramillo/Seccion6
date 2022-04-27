const inquirer = require('inquirer');
require('colors');


//Menu principal
const inquirerMenu = async() =>{
    const menu=[
        {   //Valores por defecto
            type:'list',
            name: 'opcion',
            message:'¿Que desea hacer?',
            choices: //Valores de la lista
            [
            {
                value:1,
                name:`${'1'.green}. Buscar ciudad`,
            },
            {
                value:2,
                name:`${'2'.green}. Historial`,
            },
            {
                value:0,
                name:`${'0'.green}. Salir\n`
            }
        ]
            
        },
    ];
    console.clear(); //Limpiar consola
    console.log('========================='.green)
    console.log('  Seleccione una opción  '.green)
    console.log('=========================\n'.green)

    const { opcion } = await inquirer.prompt(menu); //Hacer pregunta, y esperar respuesta
    return opcion; //retorna la opcion seleccionada
};

//Muestra listado completo con menu interactivo para borrar
const listadoCiudades = async(ciudades=[])=>{
    
        const choices = ciudades.map((ciudad,i)=>{
            const idx= `${i+1}.`.green;
            return{
                value: ciudad.id,
                name: `${idx} ${ciudad.nombre}`
            }
        })
        choices.unshift({ // Agregar una opcion 
            value:0,
            name:'0.'.green + ' Cancelar'
        })
        const menu=[
           {   //Valores por defecto
               type:'list',
               name: 'ciudad',
               message:'Eliga la ciudad que desee',
               choices}];
       console.clear(); //Limpiar consola
       console.log('========================='.green)
       console.log('  Seleccione una opción  '.green)
       console.log('=========================\n'.green)
           
       const { ciudad } = await inquirer.prompt(menu); //Hacer pregunta, y esperar respuesta
       return ciudad; //retorna la opcion seleccionada
    
    
};

//Presiona enter para continuar
const pausa = async()=>{
    // console.clear(); // se comenta por efectos de calidad
    
    //Mensaje de confirmacion
    const confirmacion= [
        {
            type:'input',
            name: 'opcion',
            message:`¿Presione ${'ENTER'.green} para continuar?\n`,
            
        }
    ];
    const { opcion } = await inquirer.prompt(confirmacion);
    return opcion;
}

//Se utiliza para leer los input, 
const leerInput = async(message /*Se pide el mensaje que se mostrara*/) =>{
    const question=[
        {
            type:'input',
            name:'desc',
            message,
            validate(value){// Se hace la validacion, para no aceptar valores vacios.
                if(value.length === 0){
                    return 'Por favor ingrese un valor.'
                }
                return true; //Retorna verdadero para salir de la validacion
            }
        }
    ]
        const {desc} = await inquirer.prompt(question); //Lanzar la pregunta, y asignar la respuesta a la variable
        return desc;// retorna la respuesta de lo solicitado
}

//Confirmacion de algo
const confirmar=async(message)=>{

    const question=[
        {   //Valores por defecto
            type:'confirm',
            name: 'ok',
            message
        }];
    const {ok}=await inquirer.prompt(question);
    return ok;
}
    

const listadoCompletarTareas = async(tareas=[])=>{
    
    const choices = tareas.map((tarea,i)=>{
        const idx= `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    })
    
    const menu=[
       {   //Valores por defecto
           type:'checkbox',
           name: 'ids',
           message:'Seleccione las tareas que desee completar',
           choices}];
   console.clear(); //Limpiar consola
   console.log('========================='.green)
   console.log('  Seleccione una opción  '.green)
   console.log('=========================\n'.green)
       
   const { ids } = await inquirer.prompt(menu); //Hacer pregunta, y esperar respuesta
   return ids; //retorna la opcion seleccionada


};


//Se exportan los moodulos que se utilizaran en por fuera del archivo
module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoCiudades,
    confirmar,
    listadoCompletarTareas
}