const { User } = require('../models');


/**En esta prueba primero crearemos un nuevo usuario (newUser) despues buscaremos ese usuario en la tabla(userFound) y al final eliminaremos ese usuario de la tabla(deletedUser) para dejar limpia la tabla. Se hara  por partes:
 * PRIMERO SE CREA
 * DEPUES LO BUCAMOS
 * AL FINAL SE ELIMINA
 *  **/


const testDatabase = async () => {
    try {
        /*
        const newUser = await User.create({
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password123'
        });

        console.log('Usuario creado:', newUser.toJSON());

        const userFound = await User.findOne({
            where: {
                email: 'testuser@example.com'
            }
        });

        console.log('Usuario encontrado:', userFound.toJSON());
        */
        const deletedUser = await User.destroy({
            where: {
                email: 'testuser@example.com'
            }
        });

        console.log('Usuarios eliminados:', deletedUser);

    } catch (error) {
        console.error('Error en la prueba:', error);
    }
};


testDatabase();