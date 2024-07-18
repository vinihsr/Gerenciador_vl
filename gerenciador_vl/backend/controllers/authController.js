import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { validationResult } from 'express-validator';

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        await db.query(
            'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedPassword]
        );

        res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, user[0].senha);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const payload = {
            user: {
                id: user[0].usuario_id,
                nome: user[0].nome,
                email: user[0].email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
};

export { registerUser, loginUser };
