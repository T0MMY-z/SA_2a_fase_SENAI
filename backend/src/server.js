// Importando express, cors e pg
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Configurando pool para acesso ao banco de dados
const pool = new Pool({
    user: 'postgres', // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'dreamz_db', // Nome da sua database
    password: 'senai', // Sua senha do PostgreSQL
    port: 5432, // Porta padrão do PostgreSQL
});

// Habilitando CORS para as rotas
app.use(cors());
app.use(express.json());

// Rota para inserção de usuário no banco de dados
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body; // Usando os campos corretos
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        res.status(201).json(result.rows[0]); // Retorna o novo usuário
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao cadastrar usuário!' });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Recebendo os dados do frontend
    try {
        // Verifica se o usuário existe e se a senha está correta
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2', // Corrigido para 'users'
            [username, password]
        );
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido!', user: result.rows[0] });
        } else {
            res.status(401).json({ error: 'Nome de usuário ou senha incorretos!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao realizar login!' });
    }
});

// Rota para atualizar dados do usuário
// Rota para atualizar dados do usuário
app.put('/users/:id', async (req, res) => {
    const { id } = req.params; // ID do usuário que será atualizado
    const { username, email, password } = req.body; // Novos dados para atualização

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [username, email, password, id]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Retorna o usuário atualizado
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar dados!' });
    }
});

// Rota para obter os dados de um usuário específico
app.get('/users/:id', async (req, res) => {
    const { id } = req.params; // ID do usuário que será recuperado

    try {
        // Consulta o banco de dados para encontrar o usuário pelo ID
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Retorna o usuário
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuário!' });
    }
});

// Listener para confirmação de servidor rodando
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
