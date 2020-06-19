<h1>SGC - Sistema de Gestão de Clientes</h1>

## Requisitos

Para montar o ambiente é necessário:

* docker
* docker-compose

### Portas:

	* 8000 - aplicação
	* 3306 - banco de dados

## Instruções:

Baixe o repositório contendo os arquivos do projeto:

    $ git clone https://github.com/diegotesch/sysfarprojeto.git

Acesse o diretorio do projeto e execute os comandos abaixo:

	$ cd sysfarprojeto

	$ cp .env.example .env

	$ docker-compose up -d

	$ docker-compose run --rm app composer install

	$ docker-compose run --rm app php artisan key:generate

	$ docker-compose run --rm app php artisan migrate --seed

	$ docker-compose run --rm app php artisan passport:install

## Acesso ao Sistema

url: 

		http:\\localhost:8000

Dados para acesso:
		
		Usuário: usuário@teste.com.br
		Senha:   123456