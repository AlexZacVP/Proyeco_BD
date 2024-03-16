import oracledb from "oracledb";

const db= {
    user: 'Alex_user',
    password: 'Alex123',
    database: 'BD_developer',
    connectString: 'localhost: 1521'
}

export async function connection(){
    try {
        const pool= await oracledb.getConnection(db);
        //const result= await pool.execute("SELECT * From cliente");
        //console.log(result);
        return pool;
    } catch (error) {
        console.error(error);
    }
} 

