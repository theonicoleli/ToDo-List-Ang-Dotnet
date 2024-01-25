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
```

### Executando o Projeto

Antes de executar a aplicação, certifique-se de que o backend e o frontend estão configurados corretamente.

#### Frontend (Angular)

No terminal, navegue até o diretório do projeto Angular e execute o seguinte comando:

```bash
ng serve
```

Isso iniciará o servidor de desenvolvimento do Angular. Abra o navegador e vá para: http://localhost:4200/

#### Backend (.NET)

Abra o projeto TodoListApi no Visual Studio e, em seguida, execute o seguinte comando no terminal:

```bash
dotnet run
```

## Instruções de Utilização

Abra o navegador e vá para: [http://localhost:4200/](http://localhost:4200/)

### Interagindo com as Atividades

#### Adicionando uma Atividade

- Cada usuário pode adicionar uma nova atividade clicando no botão "Add New Do".
- Isso abrirá uma página onde o usuário pode inserir o título, descrição e data da nova atividade.
- Ao confirmar, a atividade será adicionada à lista do usuário.

#### Editando uma Atividade

- O usuário pode editar uma atividade clicando no botão "Editar" na tabela.
- Isso o levará a uma página de edição onde ele pode modificar o título, descrição ou data da atividade.
- Após a confirmação, as alterações serão refletidas na lista de atividades do usuário.

#### Excluindo uma Atividade

- Cada atividade possui botões de edição e exclusão na tabela.
- Ao clicar no botão de exclusão, o usuário será solicitado a confirmar a exclusão.
- Após a confirmação, a atividade será removida da lista do usuário.

### Mudando o Cadastro do Usuário

- O usuário pode alterar seu cadastro clicando no botão "Editar Cadastro".
- Isso o levará a uma página onde ele pode modificar suas informações, como nome, email e senha.
- Após a confirmação, as alterações no cadastro serão aplicadas.

