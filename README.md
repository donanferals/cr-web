## Sobre a aplicação cr-web

Aplicação web desenvolvida em Laravel e Vue.js, consumindo a API pública da loja virtual da Chico Rei, possibilitando:

-   Pesquisar e filtrar produtos;
-   Adicionar e remover do carrinho.

## Instalando a aplicação

Após realizar o download do repositório, serão necessários os seguintes passos abaixo para  executar a aplicação (backend/frontend).

## Backend
1 - Criar o banco `cr_database` no MYSQL;

2 - Acessar a pasta raiz do projeto e executar o comando no terminal:
```
composer install
```

3 - Após instalação dos pacotes, executar o comando no terminal:
```
php artisan serve
```

4 -  Testar a API via url:
```
http://localhost:8000/api/produtos?query=Minas&page=1&per_page=36&tipo=1
```
Ou importando a coleção via Postman (https://api.postman.com/collections/1851075-82c131fe-f972-4639-95ba-27641ccc02d0?access_key=PMAT-01GWMY4QH442QW1X09B63M8D2T)
e realizar a requisição "Recuperar produtos".

## Frontend

5 - Ainda na pasta raiz do projeto e com a API rodando, executar o comando em um segundo terminal:
```
npm install
```

6 - Após instalação dos pacotes, executar o comando em um segundo terminal:
```
npm run dev 
```

7 -  Testar a aplicação via url:
```
http://localhost:8000/produtos
```
