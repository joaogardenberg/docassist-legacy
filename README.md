# DocAssist

### Dependências
| Dependência | Versão |
| ----------- | ------ |
| Ruby | 2.5.1 |
| MongoDB | 3.6.3 ou maior |
| MongoDB | 4.0.9 ou maior |
| NodeJS | 8.10.0 ou maior |

### Como rodar
Depois de instalar as dependências, você deverá clonar o projeto, através do seguinte comando no terminal:
```sh
$ git clone git@gitlab.com:joaogardenberg/docassist.git -b master DocAssist
```
Depois disso, você deverá abrir um terminal na pasta raiz do projeto e digitar os seguintes comandos:
```sh
$ bundle install
$ rails db:migrate
$ rails s
```
Abra então outro terminal e digite os seguintes comandos:
```sh
$ yarn
```
```sh
$ yarn start
```
