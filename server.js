const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors()); // Utilização do CORS 
app.use(express.json());

// Configuração de conexões e consultas [cite: 30]
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Coloque seu usuário do MySQL
    password: 'admin', // Coloque sua senha do MySQL
    database: 'sistema_usuarios'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// GET para listar itens [cite: 19]
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// GET para visualização detalhada de um item [cite: 14]
app.get('/api/usuarios/:id', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        res.json(results[0]);
    });
});

// POST para adicionar um novo item [cite: 21]
app.post('/api/usuarios', (req, res) => {
    const { nome, anoNascimento, endereco, genero, cpf } = req.body;
    // Implementação de validações básicas [cite: 25]
    if(!nome || !cpf) return res.status(400).json({ error: "Nome e CPF são obrigatórios" });

    const sql = 'INSERT INTO usuarios (nome, anoNascimento, endereco, genero, cpf) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, anoNascimento, endereco, genero, cpf], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    });
});

// PUT para atualizar um item existente [cite: 22]
app.put('/api/usuarios/:id', (req, res) => {
    const { nome, anoNascimento, endereco, genero, cpf } = req.body;
    const sql = 'UPDATE usuarios SET nome=?, anoNascimento=?, endereco=?, genero=?, cpf=? WHERE id=?';
    db.query(sql, [nome, anoNascimento, endereco, genero, cpf, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário atualizado com sucesso!' });
    });
});

// DELETE para remover um item [cite: 23]
app.delete('/api/usuarios/:id', (req, res) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário deletado com sucesso!' });
    });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});