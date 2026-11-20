const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const catchError = require('../utils/catchError');
const {User} = require('../models');
const { json } = require("sequelize");

const createUser = catchError(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    
    /** VALIDACION DE QUE TODOS LOS DATOS ESTEN PRESENTES */
    if (!username || !firstName || !lastName || !email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Todos los campos son obligatorios'
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword
});
    return res.status(201).json({
        status: 'success',
        message: 'Usuario registrado correctamente',
        data: {
            id: newUser.id,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    });
});

const loginUser = catchError(async (req, res) => {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'El correo y la contraseña son obligatorios'
        });
    };

    // Buscar usuario por correo
    const user = await User.findOne({
        where: { email }
    });

    // Verificar existencia del usuario
    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Credenciales incorrectas'
        });
    };

    // Verificar que el usuario tenga permitido logear
    if (!user.isActive) {
    return res.status(403).json({
        status: 'error',
        message: 'Esta cuenta se encuentra desactivada'
    });
}

    // Comparar contraseña con el hash almacenado
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        return res.status(401).json({
            status: 'error',
            message: 'Credenciales incorrectas'
        });
    }

    // Generar token
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
        status: 'success',
        message: 'Inicio de sesión exitoso',
        data: {
            token,
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }
    });
});

const getAll = catchError( async (req, res) => {
    const results = await User.findAll({
        attributes: { exclude: ['password']}
    });
    return res.json(results);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    
    const results = await User.findByPk(id, {
        attributes: { exclude: ['password']}
    });
    if(!results) return res.status(404).json(
        {
            status: 'error',
            message: 'Usuario no encontrado'
        }
    );
    return res.json(results);
});
const getCurrentUser = catchError(async (req, res) => {
    const { id } = req.user;
    if(!id) return res.status(404).json({ message: 'Necesitas estar logeado'});
    
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password']}
    });
    if(!user) return res.status(404).json(
        {
            status: 'error',
            message: 'Usuario no encontrado'
        }
    );
    
    return res.json(user);
    
    
});
const isActive = catchError( async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password']}
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.isActive = !user.isActive; 
    await user.save();
    return res.json({
       status: 'success',
        message: 'Estado actualizado exitosamente',
        data: {
            id: user.id,
            username: user.username,
            isActive: user.isActive
        }
    });
});
const updateUser = catchError(async (req, res) => {
    const { id } = req.user;
    if(!id) return res.status(404).json({ message: 'Necesitas estar logeado'});

    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({ message: 'Usuario no encontrado'});

    const { username, firstName, lastName, email, password } = req.body;

    const fields = [username, firstName, lastName, email];
    
    if (fields.some(value => value !== undefined &&
        (typeof value !== 'string' || !value.trim()))) {
        return res.status(400).json({
            status: 'error',
            message: 'Los campos no pueden estar vacíos'
        });
    }
    
    if (password !== undefined && password.length < 8) {
            return res.status(400).json({
        status: 'error',
        message: 'La contraseña debe tener al menos 8 caracteres'
        });
    }

    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = await bcrypt.hash(password, 10);
    
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'No se proporcionaron campos válidos para actualizar'
        });
    }

    await user.update(updateData);

    return res.status(200).json({
        status: 'success',
        message: 'Cambios guardados correctamente',
        data: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        }
    });
    
}); 
module.exports = {
    createUser,
    loginUser, 
    getAll, 
    getOne,
    getCurrentUser,
    isActive, 
    updateUser
};