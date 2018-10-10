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

Caso quiser acessar suas apis, é só acessar o seguinte endereço:

```
http://localhost:3000
```

Abra então outro terminal e digite os seguintes comandos:

```sh
$ yarn dependencies
```

```sh
$ yarn start
```

Automaticamente será aberta no seu navegador uma aba com o front end rodando no seguinte endereço:

```
http://localhost:8080
```
