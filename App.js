import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Utilize CSS básico para estilização

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

// TELA 1: Listagem dos dados [cite: 12]
function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários.'); // Tratamento de erros 
    }
  };

  const deleteUser = async (id) => {
    if(window.confirm('Deseja realmente excluir?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        loadUsers();
      } catch (err) {
        setError('Erro ao deletar usuário.');
      }
    }
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Link to="/cadastrar"><button>Cadastrar Novo</button></Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nome} - {user.cpf} 
            <Link to={`/detalhes/${user.id}`}><button>Detalhes</button></Link>
            <Link to={`/editar/${user.id}`}><button>Editar</button></Link>
            <button onClick={() => deleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TELA 2: Cadastro e Edição de itens [cite: 13]
function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', anoNascimento: '', endereco: '', genero: '', cpf: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/usuarios/${id}`).then(res => setFormData(res.data)).catch(err => setError('Erro ao carregar dados.'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/usuarios/${id}`, formData);
      } else {
        await api.post('/usuarios', formData);
      }
      navigate('/');
    } catch (err) {
      setError('Erro ao salvar os dados. Verifique os campos.'); // Mensagem de erro 
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required /><br/>
        <input placeholder="Ano de Nascimento" type="number" value={formData.anoNascimento} onChange={e => setFormData({...formData, anoNascimento: e.target.value})} required /><br/>
        <input placeholder="Endereço" value={formData.endereco} onChange={e => setFormData({...formData, endereco: e.target.value})} required /><br/>
        <input placeholder="Gênero" value={formData.genero} onChange={e => setFormData({...formData, genero: e.target.value})} required /><br/>
        <input placeholder="CPF" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} required /><br/>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
}

// TELA 3: Visualização detalhada [cite: 14]
function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/usuarios/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Ano de Nascimento:</strong> {user.anoNascimento}</p>
      <p><strong>Endereço:</strong> {user.endereco}</p>
      <p><strong>Gênero:</strong> {user.genero}</p>
      <p><strong>CPF:</strong> {user.cpf}</p>
      <Link to="/"><button>Voltar</button></Link>
    </div>
  );
}

// Estrutura Principal
export default function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <h1>Sistema de Gestão</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/cadastrar" element={<UserForm />} />
          <Route path="/editar/:id" element={<UserForm />} />
          <Route path="/detalhes/:id" element={<UserDetails />} />
        </Routes>

        <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          {/* O nome do aluno deve estar claramente visível  */}
          <p>Desenvolvido por: <strong>Juliano Cesar Enns Miranda Marcos</strong></p>
        </footer>
      </div>
    </Router>
  );
}