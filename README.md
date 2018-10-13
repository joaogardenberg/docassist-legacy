# DocAssist

### Dependências

| Dependência | Versão                 |
| ----------: | :--------------------- |
|        Ruby | 2.5.1                  |
|     MongoDB | 3.6.3 ou mais recente  |
|       Redis | 4.0.9 ou mais recente  |
|      NodeJS | 8.10.0 ou mais recente |
|        Yarn | 1.10.1 ou mais recente |

### Como rodar o ambiente de desenvolvimento

Depois de instalar as dependências, você deverá clonar o projeto, através do seguinte comando no terminal:

```sh
$ git clone git@gitlab.com:joaogardenberg/docassist.git -b master DocAssist
```

Depois disso, você deverá abrir um terminal na pasta raiz do projeto e digitar os seguintes comandos:

```sh
$ bundle install
```

```sh
$ rails s
```

A partir daqui, o backend vai estar rodando.

Caso quiser acessar suas apis, é só acessá-las através do seguinte endereço raiz:

```
http://localhost:3000/
```

Abra então outro terminal e digite os seguintes comandos:

```sh
$ yarn front_yarn
```

```sh
$ yarn start
```

Automaticamente será aberta no seu navegador uma aba com o front end rodando no seguinte endereço:

```
http://localhost:8080/
```

### Como adicionar/remover dependências no front end

NÃO é para utilizar os comandos `yarn add` e `yarn remove`! Ao invés disso...

Para adicionar, basta digitar num terminal na pasta raiz do projeto:

```sh
$ yarn front_add <nome-da-dependencia>
```

Para remover, basta digitar num terminal na pasta raiz do projeto:

```sh
$ yarn front_rem <nome-da-dependencia>
```

### Como fazer deploy do front end para o Heroku

Para criar o projeto no Heroku, basta digitar o seguinte comando num terminal na pasta raiz do projeto:

```sh
$ yarn create_heroku
```

Uma vez feito isso, não há a necessidade de fazer de novo a cada deploy.

Em seguida, para fazer o deploy, digite:

```sh
$ yarn deploy_heroku
```

Para abrir o Heroku no seu browser direto na página do projeto, digite:

```sh
$ yarn open_heroku
```

Caso dê algum problema relacionado a nome de diretório em algum destes comandos, ou então algum problema relacionado a git, talvez este comando ajude:

```sh
$ yarn fix_heroku
```
