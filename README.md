<h1 align="center">Frontend Challenge - Easy Carros
</h1>

<h5 align="center"> Desafio Easy Carros para Frontend Developers. </h5>

<h1 align="center">
    <img width="400" src="\README\loginScreen.png") />
    <img width="400" src="\README\listScreen.png") />
</h1>

# :triangular_flag_on_post: Índice 
* Sobre
* Tecnologias Utilizadas
* Como utilizar o projeto

# :page_facing_up: Sobre
Desafio com o objetivo de avaliar as skills na criação de código para frontend para um problema do mundo real, criando uma *feature* que existe no **Easy Carros Docs**: <u>Controle de Veículos da Frota</u>.

A *feature* consiste em 

# :gem: Funcionalidades

## 1. Tela de login
**Permitir que o usuário se autentique na aplicação** :heavy_check_mark:

Ao enviar o formulário:
* Validar se ambos os campos estão preenchidos.
    * Caso algum não esteja, exibir uma mensagem de erro para o usuário.
    
Ao receber a resposta do servidor:
* Quando as credenciais de acesso estiverem corretas, o usuário deve ser redirecionado para a página de veículos.
* Quando as credenciais são inválidas, o usuário deve receber uma mensagem informando-o do problema.

Informações adicionais:

Credenciais válidas:
* E-mail: `frontend-dev@easycarros.com`
* Senha: `Fr0nt3ndR0ck5!`


## 2. Tela de lista de veículos
**Permitir que o usuário visualize seus veículos** :heavy_check_mark:

Exibir a lista de todos os veículos do usuário mostrando:
* Placa

**Permitir que o usuário adicione novos veículos** :heavy_check_mark:

* O usuário informa uma placa no campo logo acima da lista.
* Ao clicar no botão enviar:
    * Validar se a placa possui 7 caracteres alfanuméricos
        * Caso seja válida, enviar a placa para a API
        * Caso contrário, exibir uma mensagem de erro ao usuário
    * Aguardar a resposta da API
        * Caso seja inserido com sucesso, atualizar a lista de veículos
        * Caso contrário, exibir uma mensagem de erro ao usuário
        

**Permitir que o usuário remova um veículo** :heavy_check_mark:

* Ao clicar no botão excluir, relacionado a cada veículo:
    * Pedir para o usuário confirmar a exclusão
        * Caso positivo:
            * Enviar a requisição de exclusão para a API
            * Remover o veículo excluído da lista
        * Caso negativo:
            * Manter a lista como está
            
# :warning: Regras
* :page_with_curl: A aplicação deve ser uma SPA ou um mobile app.
* :u5408: Use o framework com o qual você se sente mais confortável (aqui nós utilizamos principalmente React e ReactNative, mas qualquer framework "mainstream" é bem vindo).
* :paintbrush: Fique à vontade para modificar a aparência das telas; os wireframes são apenas para referência.
* :artificial_satellite: Use qualquer bibloteca para conseguir se comunicar com o backend.
* :ship: Envie seu código para um repositório público para leitura (Github, Bitbucket, Gitlab, etc.).
* :spiral_notepad: Crie um arquivo README na raiz do projeto com instruções detalhadas de como executar seu código.

# :rocket: Tecnologias utilizadas

# :books: Instruções

## Pré-requisitos
* Sistema de controle de versão: <a href="https://git-scm.com/" target="_blank">`git`</a>
* Gerenciador de pacotes: <a href="https://yarnpkg.com/lang/en/docs/install" target="_blank">`yarn`</a>
* Editor de código - Sugestão: <a href="https://code.visualstudio.com/download" target="_blank">`Visual Studio Code`</a>

## API
```bash
# Clonar o repositório
$ git clone https://bitbucket.org/easycarros/frontend-challenge.git

# Entrar no diretório
$ cd ./api

# Instalar dependências
$ yarn install

# Executar o projeto
$ yarn start
```

Se tudo ocorrer bem, você verá a seguinte mensagem no seu terminal:
```bash
yarn run version
$ node server.js
App is listening on http://localhost:8181
```

O **CORS** da API está configurado para receber requisições de `localhost:3000`

## Endpoints
Documentação completa <a href="https://bitbucket.org/easycarros/frontend-challenge" target="_blank">`AQUI`</a>

## Frontend
:exclamation: **Necessário manter a API rodando para consumí-la** :exclamation:
```bash
# Clonar o repositório
$ git clone https://github.com/RafaelTrog/teste-easycarros.git

# Entrar no diretório
$ cd ./teste-easycarros

# Instalar dependências
$ yarn install

# Executar o projeto
$ yarn start
```

Se tudo ocorrer bem, você verá a seguinte mensagem no seu terminal:
```bash
Compiled successfully!

You can now view easycarros in the browser.

    Local:              http://localhost:3000
    On Yout Network:    http://192.168.x.x:3000
    
Note that the development build is not optimized.
To create a production build, use yarn build.
```