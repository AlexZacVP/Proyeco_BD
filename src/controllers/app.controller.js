import {connection} from '../database/connection';
import oracledb from 'oracledb';

export const controller = {};
export const result = {};

controller.inicio = (req, res)=>{

    res.render('index');
};

//Validacion usuarios contra BD
controller.principal= async (req,res)=>{
    const{  txt_codigo, txt_contraseña } = req.body;
    const pool = await connection();
    const result= await pool.execute(`SELECT ID_USUARIO, CONTRASEÑA FROM USUARIO WHERE ID_USUARIO = ${txt_codigo} AND CONTRASEÑA ='${txt_contraseña}'`);
    if(result.rows.length===1){
        const dato= result.rows[0];
        res.render("principal",{ dato });
    }else{
        res.render("index");
    }
    
} 

//Registro usuarios a BD
controller.registro= async (req,res)=>{
    const{  txt_rusurio, txt_rcontraseña } = req.body;
    const pool = await connection();
    const result= await pool.execute(`SELECT USUARIO FROM USUARIO WHERE USUARIO = '${txt_rusurio}'`);
    if(result.rows.length===1){
        console.log('Usuario ya existe')
    }else{
        await pool.execute(` INSERT INTO USUARIO (usuario,contraseña) VALUES('${txt_rusurio}', '${txt_rcontraseña}') `);
        pool.commit();
        res.render("index");
    }
} 

controller.table= async (req,res)=>{
    const pool = await  connection();
    const result = await pool.execute("SELECT * FROM CLIENTE");
    console.log(result);
}

controller.usuario= async (req,res)=>{
    const pool = await  connection();
    const result = await pool.execute("INSERT INTO USUARIO(id_usuario, nombre_usuario, contraseña) VAUES(1,'JUAN','123456');");
    console.log(result);
}






controller.transferencia=  (req,res)=>{
    const{id}= req.params
    res.render("transferencia", {id});
}

controller.trasnferir = async (req,res)=>{
    const{ txt_monto, txt_cuenta_destino, txt_cuenta_origen, txt_id_usuario } = req.body;
    const{id}= req.params
    const pool = await connection();
    await pool.execute(`BEGIN transaccion(:monto, :cuenta_destino, :cuenta_origen, :id_usuario); END;`, {monto: txt_monto, cuenta_destino: txt_cuenta_destino, cuenta_origen: txt_cuenta_origen, id_usuario: txt_id_usuario} );
    pool.commit();
    res.render("transferencia", {id});
}
controller.cuentas= async(req,res)=>{
    const { id } = req.params
    console.log(id);
    const pool = await connection();
    const result = await pool.execute('BEGIN CUENTAR(:txtId, :cuentas); END;', {txtId: id, cuentas: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }});
    const rowsConsultac = await result.outBinds.cuentas.getRows();
    console.log(rowsConsultac);
    res.render('cuentas', {rowsConsultac, id});
}

controller.estado_cuenta = async(req, res) => {
    const { id } = req.params
    //console.log(id);
    const pool = await connection();
    const result = await pool.execute('BEGIN ESTADOR(:txtId, :estados); END;', {txtId: id, estados: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }});
    const rowsConsulta = await result.outBinds.estados.getRows();
    res.render('estado_cuenta', {rowsConsulta, id});
};