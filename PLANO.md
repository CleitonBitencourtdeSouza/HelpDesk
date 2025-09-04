# Plano de Projeto – HelpDesk

## ✅ Concluído
- API REST completa em .NET 8
- CRUD de chamados (GET, POST, PUT, DELETE)
- Paginação, filtros e ordenação
- Validações com [Required] e [MaxLength]
- SQLite para desenvolvimento
- SQL Server para produção
- Sistema de Migrations
- DbContext com injeção de dependência
- Remoção de código desnecessário
- DbSeeder para dados iniciais
- Configuração de appsettings.json
- Swagger/OpenAPI configurado
- Testes via Swagger/Postman
- Projeto versionado no GitHub

---

## 🚀 Próximos Passos

### 1. Autenticação JWT 🔐
- Implementar autenticação e autorização JWT
- Criar endpoints de login e registro
- Proteger rotas sensíveis

### 2. Nova entidade Usuários 👥
- Criar modelo Usuario (Id, Nome, Email, Senha, etc)
- Relacionar chamados a usuários
- Ajustar banco de dados e migrations

### 3. Frontend em HTML/CSS/JS 🌐
- Criar interface web para consumir a API
- Telas de login, cadastro, listagem e detalhes de chamados
- Integração via fetch/AJAX

### 4. Dashboard Power BI 📊
- Endpoints para exportação de dados
- Integração com Power BI

### 5. Deploy em nuvem ☁️
- Escolher provedor (Azure, AWS, Heroku)
- Configurar variáveis de ambiente
- Publicar aplicação e testar endpoints

---

## Observações
- Atualize este arquivo conforme o projeto evoluir.
- Marque as tarefas concluídas com ✅.
