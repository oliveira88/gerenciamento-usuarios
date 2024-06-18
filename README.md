# Gerenciamento de Usuários

Criar uma aplicação com os seguintes requisitos:

- Login:
  - Deverá possuir uma tela de login básica, o usuário não poderá acessar outras rotas da aplicação enquanto não fizer o login.
- Tela principal:
  - Deverá possuir uma NavBar com as opções: TemplateDriven e Reactive. A ação de clique desses botões seguirão as mesmas especificações, porém um utilizará Template Driven Forms e o outro Reactive Forms.
- Página principal dos usuários:
  - Deverá possuir um botão no topo para cadastro de um usuário.
  - Deverá listar todos os usuários já cadastrados, mostrando seu nome e seu CPF no formato XXX.XXX.XXX-XX .
  - Ao lado de cada usuário deverá possuir um botão para editar e outro para excluir o usuário.
  - Se o usuário possuir um Nome Social, deverá mostrar este ao invés do Nome.
- Criar usuário:
  - Ao clicar no botão de criar usuário, deverá ser redirecionado para tela de criação de usuário.
  - Para cadastro do usuário, deverá conter obrigatoriamente os campos: nome, data de nascimento, cpf, email e se é admin ou não.
  - Opcionalmente, o usuário pode ter um Nome social e UM Endereço, com Cidade, Estado, CEP e Logradouro.
  - Caso o usuário seja menor de 18 anos, deverá possuir um campo para cpf do responsável.
  - Não é permitido o cadastro de usuário menores de 12 anos.
  - O CPF deverá ser válido e formatado corretamente em seu campo, obedecendo o padrão XXX.XXX.XXX-XX .
  - Ao clicar em salvar, adiciona o usuário a lista de todos usuários e volta para tela principal de listagem de usuários.
  - Ao clicar em cancelar, volta para tela principal de listagem de usuários.
- Editar usuário:
  - Ao clicar no botão de editar usuário, deverá ser redirecionado para a tela de edição de usuário, onde os campos deverão ser preenchidos com os valores atuais do usuário.
  - Caso o usuário clique em voltar página ou cancelar e tenha havido alguma mudança nos campos, deverá mostrar um alerta perguntando se deseja de fato retornar sem salvar.

**\*Dica, utilize o Local Storage para persistencia dos dados** <br>
**\*Será necessário fazer o uso de Services e Modules**