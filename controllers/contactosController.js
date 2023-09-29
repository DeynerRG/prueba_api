import { json } from 'express';
import fs from 'fs';

let db = './db/db_contactos.json'

const getContactos = ( req, res )=>{

    let data = [];
    try {

        // Si la base de datos no existe
        if( !fs.existsSync( db )){
            data = [];
            res.json( data );
            return;
        }
        
        // Si el contenido del archivo db esta vacio
        const info = fs.readFileSync( db, { encoding: 'utf-8'});
        
        if( info === '' ){
            data = [];
            res.json( data );
            return;
        }
        
        data = JSON.parse( info );
        res.json( data );

    } catch (error) {
        console.log(error)
        res.json({msg: 'error en la bd'})
    }

   
}

const addContacto = ( req, res )=>{
    const contacto = req.body;


    let data = [];
    try {
        if( !contacto.nombre) {
            res.json({msg: 'no se detecto informacion en la peticion'})
            return 
        }
        // Si la base de datos no existe
        if( !fs.existsSync( db )){
            data = [];
            res.json( data );
            return;
        }
        
        // Si el contenido del archivo db esta vacio
        let info = fs.readFileSync( db, { encoding: 'utf-8'});
        
        if( info === '' ){
            info = "[]";
            
        }
        
        data = JSON.parse( info );
        data.push( contacto );
        
        fs.writeFileSync( db, JSON.stringify( data ));
        res.json( contacto );

    } catch (error) {
        console.log(error)
        res.json({msg: 'error en la bd'})
    }



};

const getContactoById = (req, res)=>{

    const { id } = req.params;
    
    let data = [];
    try {

        // Si la base de datos no existe
        if( !fs.existsSync( db )){
            data = [];
            res.json( data );
            return;
        }
        
        // Si el contenido del archivo db esta vacio
        const info = fs.readFileSync( db, { encoding: 'utf-8'});
        
        if( info === '' ){
            data = [];
            res.json( data );
            return;
        }
        
        data = JSON.parse( info );
        let contacto = data.find((item)=> item.id === id);
        if( !contacto ){
            res.json( { msg:"el contacto no existe"})
            return 
        }
        res.json( contacto );

    } catch (error) {
        console.log(error)
        res.json({msg: 'error en la bd'})
    }
};

const deleteContactoById = (req, res)=>{
    const { id } = req.params;
    
    
    let data = [];
    try {

        // Si la base de datos no existe
        if( !fs.existsSync( db )){
            data = [];
            res.json( data );
            return;
        }
        
        // Si el contenido del archivo db esta vacio
        const info = fs.readFileSync( db, { encoding: 'utf-8'});
        
        if( info === '' ){
            data = [];
            res.json( data );
            return;
        }
        
        data = JSON.parse( info );
        let newData = data.filter((item)=> item.id !== id);
        
        fs.writeFileSync( db, JSON.stringify( newData ));
        res.json( newData );


    } catch (error) {
        console.log(error)
        res.json({msg: 'error en la bd'})
    }
};


const updateContactoById = (req, res)=>{
    
    const newContacto = req.body
    
    let data = [];
    try {

        // Si la base de datos no existe
        if( !fs.existsSync( db )){
            data = [];
            res.json( data );
            return;
        }
        
        // Si el contenido del archivo db esta vacio
        const info = fs.readFileSync( db, { encoding: 'utf-8'});
        
        if( info === '' ){
            data = [];
            res.json( data );
            return;
        }
        
        data = JSON.parse( info );
        let newData = data.map((item)=>{
            if(item.id === newContacto.id){
                return newContacto
            }else{
                return item
            }
        } )
        
        fs.writeFileSync( db, JSON.stringify( newData ));
        res.json( newData );


    } catch (error) {
        console.log(error)
        res.json({msg: 'error en la bd'})
    }
}

export {
    getContactos,
    addContacto,
    getContactoById,
    deleteContactoById,
    updateContactoById
}