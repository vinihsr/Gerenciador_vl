import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post(
    '/register',
    [
        check('nome', 'Nome é obrigatório').not().isEmpty(),
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('senha', 'Senha deve ter 6 ou mais caracteres').isLength({ min: 6 })
    ],
    registerUser
);

router.post(
    '/login',
    [
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('senha', 'Senha é obrigatória').exists()
    ],
    loginUser
);

export default router;
