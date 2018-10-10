# DocAssist

### Dependências
| Dependência | Versão          |
| ----------: | :-------------- |
| Ruby        | 2.5.1           |
| MongoDB     | 3.6.3 ou maior  |
| MongoDB     | 4.0.9 ou maior  |
| NodeJS      | 8.10.0 ou maior |

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
$ rails db:migrate
```
```sh
$ rails s
```
Abra então outro terminal e digite os seguintes comandos:
```sh
$ yarn
```
```sh
$ yarn start
```
Abra então seu navegador e acesse:
```
http://localhost:3000
```
