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

Instruções de Utilização
Abra o navegador e vá para: http://localhost:4200/
Interagindo com as Atividades
Adicionando uma Atividade
Cada usuário pode adicionar uma nova atividade clicando no botão "Add New Do".
Isso abrirá uma página onde o usuário pode inserir o título, descrição e data da nova atividade.
Ao confirmar, a atividade será adicionada à lista do usuário.
Editando uma Atividade
O usuário pode editar uma atividade clicando no botão "Editar Cadastro" na tabela.
Isso o levará a uma página de edição onde ele pode modificar o título, descrição ou data da atividade.
Após a confirmação, as alterações serão refletidas na lista de atividades do usuário.
Excluindo uma Atividade
Cada atividade possui botões de edição e exclusão na tabela.
Ao clicar no botão de exclusão, o usuário será solicitado a confirmar a exclusão.
Após a confirmação, a atividade será removida da lista do usuário.
Mudando o Cadastro do Usuário
O usuário pode alterar seu cadastro clicando no botão "Alterar Cadastro".
Isso o levará a uma página onde ele pode modificar suas informações, como nome, senha, etc.
Após a confirmação, as alterações no cadastro serão aplicadas.
Contribuição
Se você quiser contribuir, sinta-se à vontade para abrir problemas ou enviar pull requests. Certifique-se de seguir as diretrizes de contribuição do projeto.

Licença
Este projeto está licenciado sob a Licença MIT.
