# Angular Todo List with .NET Backend

Este projeto é uma aplicação de lista de tarefas simples desenvolvida em Angular para o frontend e .NET para o backend. Cada usuário tem sua própria lista de atividades, e eles podem interagir com suas tarefas de várias maneiras.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados antes de iniciar:

- **Node.js:** [Instalação do Node.js](https://nodejs.org/)
- **Angular CLI:** Instale o Angular CLI globalmente usando o comando `npm install -g @angular/cli`.
- **Visual Studio:** Certifique-se de ter o Visual Studio instalado para executar o backend .NET.

## Configuração do Backend

1. Abra o projeto `TodoListApi` no Visual Studio.
2. Certifique-se de ter uma instância do SQL Server disponível.
3. Atualize a string de conexão no arquivo `appsettings.json` para apontar para o seu banco de dados SQL Server.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=<nome-do-servidor>;Database=TodoListDb;Trusted_Connection=True;"
}
