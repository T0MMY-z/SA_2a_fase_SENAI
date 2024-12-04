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

// Habilitando CORS e configurando o express para aceitar JSON
app.use(cors());
app.use(express.json());

// Rota para inserção de usuário no banco de dados
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
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
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Deletar todas as sessões anteriores do usuário
            await pool.query('DELETE FROM sessions WHERE user_id = $1', [user.id]);

            // Cria uma sessão no banco de dados
            const sessionResult = await pool.query(
                'INSERT INTO sessions (user_id) VALUES ($1) RETURNING *',
                [user.id]
            );
            const session = sessionResult.rows[0];

            res.status(200).json({ message: 'Login bem-sucedido!', user: user, sessionId: session.id });
        } else {
            res.status(401).json({ error: 'Nome de usuário ou senha incorretos!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao realizar login!' });
    }
});

// Rota de logout
app.post('/logout', async (req, res) => {
    const { sessionId } = req.body;  // Recebe o sessionId da requisição

    try {
        // Deleta a sessão atual do usuário
        const deleteSessionResult = await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);

        // Verifique se a exclusão da sessão foi bem-sucedida
        if (deleteSessionResult.rowCount > 0) {
            res.status(200).json({ message: 'Logout bem-sucedido!' });
        } else {
            res.status(400).json({ error: 'Sessão não encontrada!' });
        }
    } catch (err) {
        console.error('Erro ao realizar logout:', err.message);
        res.status(500).json({ error: 'Erro ao realizar logout!' });
    }
});

// Rota para obter o perfil do usuário logado
app.get('/perfil', async (req, res) => {
    const { sessionId } = req.query;
    try {
        const sessionResult = await pool.query(
            'SELECT * FROM sessions WHERE id = $1',
            [sessionId]
        );

        if (sessionResult.rows.length > 0) {
            const session = sessionResult.rows[0];
            const userResult = await pool.query(
                'SELECT * FROM users WHERE id = $1',
                [session.user_id]
            );

            if (userResult.rows.length > 0) {
                res.status(200).json(userResult.rows[0]);
            } else {
                res.status(401).json({ error: 'Usuário não encontrado!' });
            }
        } else {
            res.status(401).json({ error: 'Sessão inválida ou expirada!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar perfil!' });
    }
});

// Rota para atualizar dados do usuário
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [username, email, password, id]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar dados!' });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});

//aaaaa versao certa

