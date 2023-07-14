const connection = require('../db');

async function getAllUsers(req, res) {
    console.log("usuarios");

    await connection.db.select().from('usuarios').innerJoin('personas', 'usuarios.id_persona', 'personas.id').then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    });
    
}
async function getUserById(req, res) {
    console.log("Usuario individual")
    const id = req.params.id;
    await connection.db.select().from('usuarios').innerJoin('personas', 'usuarios.id_persona', 'personas.id').where('usuarios.id', id).then((data) => {
        res.status(200).json(data[0]);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    });
}
async function createUser(req, res) {
    const { nombres, apellidos, telefono, email, password, rol } = req.body;
    try{
        await connection.db.transaction(async trx => {
            const id_persona = await trx('personas').insert({
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
            }).returning('id');

            await trx('usuarios').insert({
                email: email,
                password: password,
                rol: rol,
                id_persona: id_persona[0],
            });

            await trx.commit();

            return res.status(200).json({ message: 'Usuario creado correctamente' });
        });           
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
}
async function updateUser(req, res) {
    const id = req.params.id;
    const { nombres, apellidos, telefono, email, password, rol, id_persona } = req.body;
    await connection.db('usuarios').where('id', id).update({
        email: email,
        password: password,
        rol: rol
    }).then((count) => {
        console.log(count);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    });
    await connection.db('personas').where('id', id_persona).update({
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
    }).then((count) => {
        console.log(count);
        
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    });
    return res.status(200).json({ message: 'Usuario actualizado correctamente'});
}
async function deleteUser(req, res) {
    const id_persona = req.params.id;
    await connection.db('personas').where('id', id_persona).del()
    .then((count) => {
        console.log(count);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    });
}

async function verifyCredentials(req, res) {
    const { email, password } = req.body;
    //console.log("login");
    try {
      // Realizar la consulta en la base de datos para verificar las credenciales
      const user = await connection.db
        .select()
        .from('usuarios')
        .innerJoin('personas', 'usuarios.id_persona', 'personas.id')
        .where('usuarios.email', email)
        .andWhere('usuarios.password', password)
        .first();
      if (user) {
        console.log("Sesion Iniciada");
        res.status(200).json({ loggedIn: true });
      } else {
        console.log("No se pudo iniciar sesion");
        res.json({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error al verificar las credenciales' });
    }
  }
  
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    verifyCredentials
};