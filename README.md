# Sistema HelpDesk

Sistema completo de gerenciamento de chamados desenvolvido com ASP.NET Core e React.

## 🚀 Tecnologias Utilizadas

### Backend
- **ASP.NET Core 8.0**
- **Entity Framework Core**
- **SQLite** (banco de dados)
- **JWT Authentication** (preparado, mas não obrigatório)

### Frontend
- **React 18** com TypeScript
- **Material-UI (MUI)** para interface
- **Axios** para requisições HTTP
- **React Router** para navegação

## 📋 Funcionalidades

- ✅ Criar novos chamados
- ✅ Visualizar lista de chamados
- ✅ Alterar status dos chamados (Aberto → Em Andamento → Fechado)
- ✅ Editar chamados existentes
- ✅ Excluir chamados
- ✅ Sistema de prioridades (Baixa, Média, Alta)
- ✅ Interface responsiva e moderna

## 🛠️ Como Executar

### Pré-requisitos
- .NET 8.0 SDK
- Node.js 16+ e npm

### 1. Backend (ASP.NET Core)

```bash
# Navegar para a pasta do backend
cd ProjetoHelpDesk

# Restaurar pacotes
dotnet restore

# Executar migrações do banco
dotnet ef database update

# Executar o projeto
dotnet run
```

O backend estará disponível em: `https://localhost:7137`

### 2. Frontend (React)

```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências
npm install

# Executar o projeto
npm start
```

O frontend estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
ProjetoHelpDesk/
├── ProjetoHelpDesk/           # Backend ASP.NET Core
│   ├── Controllers/           # Controladores da API
│   ├── Data/                  # Contexto do banco e migrações
│   ├── Models/                # Modelos de dados
│   └── Program.cs             # Configuração da aplicação
├── frontend/                  # Frontend React
│   ├── public/                # Arquivos públicos
│   ├── src/                   # Código fonte React
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Serviços de API
│   │   ├── types/             # Tipos TypeScript
│   │   ├── App.tsx            # Componente principal
│   │   └── index.tsx          # Ponto de entrada
│   └── package.json           # Dependências do frontend
└── README.md                  # Este arquivo
```

## 🔧 Configuração

### Backend
- A string de conexão do banco está em `appsettings.json`
- CORS está configurado para aceitar requisições do frontend
- A API está configurada para rodar na porta 7137

### Frontend
- Proxy configurado para a API backend em `package.json`
- Interface otimizada para desktop e mobile
- Tema Material-UI personalizado

## 📊 Endpoints da API

### Chamados
- `GET /api/chamados` - Listar todos os chamados
- `POST /api/chamados` - Criar novo chamado
- `GET /api/chamados/{id}` - Buscar chamado por ID
- `PUT /api/chamados/{id}` - Atualizar chamado
- `DELETE /api/chamados/{id}` - Excluir chamado
- `PUT /api/chamados/{id}/status` - Atualizar status do chamado

## 🎨 Interface

A interface foi desenvolvida com Material-UI e possui:
- Dashboard com cards para cada chamado
- Formulário modal para criar/editar chamados
- Sistema de cores para status e prioridades
- Design responsivo para diferentes tamanhos de tela
- Feedback visual para ações do usuário

## 🚀 Deploy

### Backend
O backend pode ser publicado usando:
```bash
dotnet publish -c Release
```

### Frontend
O frontend pode ser buildado usando:
```bash
npm run build
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvedor

Desenvolvido por Cleiton Bitencourt de Souza
