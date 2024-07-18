import express from 'express';

import db from '../db.js';

const router = express.Router();

// Obtendo configurações
router.get('/settings', async (req, res) => {
    try {
        const [settings] = await db.query('SELECT * FROM Configuracoes');
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar configurações' });
    }
});

// Atualizando configurações
router.put('/settings', async (req, res) => {
    const { nome_empresa, endereco, telefone, email } = req.body;
    try {
        await db.query('UPDATE Configuracoes SET nome_empresa = ?, endereco = ?, telefone = ?, email = ? WHERE id = 1', [nome_empresa, endereco, telefone, email]);
        res.json({ message: 'Configurações atualizadas com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar configurações' });
    }
});

export default router;
