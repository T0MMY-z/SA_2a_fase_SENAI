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

            // Cria uma nova sessão
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
    const { sessionId } = req.body;

    try {
        const deleteSessionResult = await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);

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

// Função para formatar o tempo apenas no formato HH:MM
const formatTime = (time) => {
    if (!time) return "00:00";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
};

// Função para calcular a diferença em horas entre dois horários no formato HH:MM
const calculateHoursSlept = (sleepTime, wakeTime) => {
    const sleepDate = new Date(`1970-01-01T${sleepTime}:00`);
    const wakeDate = new Date(`1970-01-01T${wakeTime}:00`);
    
    let differenceMs = wakeDate - sleepDate;

    // Caso a pessoa tenha acordado no dia seguinte
    if (differenceMs < 0) {
        differenceMs += 24 * 60 * 60 * 1000;  // Adiciona um dia em milissegundos
    }

    const differenceHours = differenceMs / (1000 * 60 * 60);
    return parseFloat(differenceHours.toFixed(2));  // Arredonda para 2 casas decimais
};

// Rota para inserção ou atualização de dados de sono
app.post('/sleep', async (req, res) => {
    const { week, day_of_week, sleep_time, wake_time, woke_up, dreamed, coffee_cups, thumbsup, thumbsdown } = req.body;

    console.log("Dados recebidos no servidor:", req.body);

    const weekValue = parseInt(week, 10) || 1;

    const formattedSleepTime = formatTime(sleep_time);
    const formattedWakeTime = formatTime(wake_time);

    const hoursSlept = calculateHoursSlept(formattedSleepTime, formattedWakeTime);

    try {
        // Verifica se já existe um registro para a mesma semana e dia da semana
        const existingEntry = await pool.query(
            'SELECT * FROM sleep_data WHERE week = $1 AND day_of_week = $2',
            [weekValue, day_of_week]
        );

        if (existingEntry.rows.length > 0) {
            // Atualiza o registro existente
            const result = await pool.query(
                `UPDATE sleep_data 
                 SET sleep_time = $1, wake_time = $2, hours_slept = $3, woke_up = $4, dreamed = $5, coffee_cups = $6, thumbsup = $7, thumbsdown = $8 
                 WHERE week = $9 AND day_of_week = $10 
                 RETURNING *`,
                [formattedSleepTime, formattedWakeTime, hoursSlept, woke_up, dreamed, coffee_cups, thumbsup, thumbsdown, weekValue, day_of_week]
            );

            res.status(200).json(result.rows[0]);
        } else {
            // Insere um novo registro
            const result = await pool.query(
                `INSERT INTO sleep_data (week, day_of_week, sleep_time, wake_time, hours_slept, woke_up, dreamed, coffee_cups, thumbsup, thumbsdown) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
                [weekValue, day_of_week, formattedSleepTime, formattedWakeTime, hoursSlept, woke_up, dreamed, coffee_cups, thumbsup, thumbsdown]
            );

            res.status(201).json(result.rows[0]);
        }
    } catch (err) {
        console.error('Erro ao salvar dados de sono:', err.message);
        res.status(500).json({ error: 'Erro ao salvar dados de sono!' });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
