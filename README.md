# DEVInAgro - SQUAD 02

### Padrões para desenvolvimento

- Criar componentes, variáveis, serviços, interfaces... com nomeclaturas em inglês;
- Componentes na pasta `_components`;
- Serviços na pasta `_services`;
- Interfaces na pasta `_interfaces`
- Auths na pasta `_auths`
- Views na pasta `_views`

#

### Requisitos

| Ferramenta | Versão |
| ------ | ------ |
| Angular | 13.3.5 |
| Node | 16.14.2 |

- Clonar projeto do git para sua máquina.
- Dentro da pasta do projeto clonado abrir o cmd e utilizar o comando abaixo:

```
npm install
```
- Apos a instalação do npm, utilizar um dos comandos abaixo para start da aplicação:
```
ng serve
npm start
```
#

### Fluxo do desenvolvimento

- Ingressar na tarefa que você quer desenvolver no board do Trello entrando no card da tarefa e clicando no botão `Ingressar`.

- Mover a tarefa para a coluna `Doing` e criar um branch com o número da sua tarefa em letras minúsculas, por exemplo `task01`.

- Ao finalizar o desenvolvimento da tarefa, fazer commit (em português) das suas alterações na branch criada no passo anterior conforme exemplo: " task01 - Atualização README.md  "

- Subir as alterações para o repositório remoto.

- No Git será necessário fazer o Pull Request conforme abaixo:
    - Entrar na aba Pull Requests;
    - Clicar no botão `New pull request`;
    - Dentro de `Compare changes` selecionar sua branch conforme exemplo: `compare: <<Selecionar sua branch>>`;
    - Clicar em `Create new pull request`.

- Marcar o Product Owner do squad para aprovar o pull request;

- Mover a tarefa para coluna `Code review` no Trello.

#

### Jornada do usuário

1) Cadastrar grãos para a empresa;
2) Cadastrar fazendas para associar os grãos;
3) Cadastrar funcionários para empresa.