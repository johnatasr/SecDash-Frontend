<h2 align="center">
    SecDash <img alt="GitHub last commit" src="https://travis-ci.com/johnatasr/SecDash.svg?branch=master" width="80">
</h2>
<p align="center">
  

</p>
SecDash é uma plataforma de relatórios por gráficos e tabelas, onde o foco é detalhar informações de segurança sobre determinados
relatórios obtidos por documentos. O foco da plataforma é trazer de forma detalhada todos insulmos existentes mantendo a precisão
e acuracidade.


## Como rodar o projeto ?

* Acesse o repositório do projeto principal em : https://github.com/johnatasr/SecDash
* Clone o projeto
* `cd djsrc/` e inicialize o ambiente virtual. 
```
python -m venv secdash_venv
```
* Instale as dependencias e execute o servidor Django
```
pip install -r requirements.txt
./manage.py runserver
```
Via Docker:
```
docker-compose build
docker-compose run
```

## API Autenticação
 
* Cadastrar novo usuário 
```
    curl --request POST \
      --url /users/user/create/ \
      --header 'content-type: application/json' \
        --data '{"email":<EMIAL>,"username":<USERNAME>,"password":<PASSWORD>}'
```
* Login
```
    curl --request POST \
      --url /users/token/obtain/ \
      --header 'content-type: application/json' \
      --data '{
        "username": <USERNAME>,
        "password" : <PASSWORD>
      }
```


### API Dados

* Obter Lista de Hosts

   Lista geral de hosts registrados na base.

```
curl --request GET \
  --url 'api/hosts/list_hosts/?page=1' \
  --header 'authorization: JWT <TOKEN>'
```

------------------------------------

* Filtrar Hosts 

   Lista hosts filtrados pelo nome da vulnerabilidade.

```
curl --request GET \
  --url '/api/hosts/filter_hosts/?page=<PAGE>&vulnerabilityTitle=<TITLE>' \
  --header 'authorization: JWT <TOKEN>'

```

-------------------------------------

* Detalhar Host

   Retorna todas informações de um determinado host registrado.

```
curl --request GET \
  --url '/api/hosts/detail_host/?id=<ID>' \
  --header 'authorization: JWT <TOKEN>'

```
------------------------------------------------

* Listar Vulnerabilidades

   Retorna todas vulnerabilidades.

```
curl --request GET \
  --url '/api/vulnerabilities/list_vulnerabilities/?page=<PAGE>' \
  --header 'authorization: JWT <TOKEN>'

```

--------------------------------------------------


* Filtrar Vulnerabilidades

  Filtra vulnerabilidades por Host específico.

```
curl --request GET \
  --url '/api/vulnerabilities/filter_vulnerabilities/?page=<PAGE>&host=<HOST>' \
  --header 'authorization: JWT <TOKEN>'
```

--------------------------------------------------------


* Corrgir Vulnerabilidade

  Altera o status de correção de vulnerabilidade específica pelo ID.

```
curl --request POST \
  --url 'http://192.168.0.47:8000/api/vulnerabilities/correct_vulnerabilitie/?=' \
  --header 'authorization: JWT <TOKEN>' \
  --header 'content-type: application/json' \
  --data '{
	"id": <ID>
}
```

