# Dianome

Bem-vindo ao APP Dianome! Este é um aplicativo criado para realização de projeto de Graduação, destinado apenas para estudo, com bases em especificação realizada pela instituição.

## O que o APP contém
O APP contém um conjunto de:
- 5 rotas (GET / GET-{id} / POST / PATCH / DELETE) para CRUD de Reclamações (Claim)
- 5 rotas (GET / GET-{id} / POST / PUT / DELETE) para CRUD de Entregadores (DeliveryMan)
- 6 rotas (GET / GET-{id} / GET-byCode/{packageCode} / POST / PUT / DELETE) para CRUD de Pacotes (Packages)

Abaixo, listagem de rotas e parâmetros esperados.

## Framework/Linguagem de Programação Utilizada
Backend: SpringBoot/Java
Frontend: React/JS

## Database
Mysql

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (incluindo npm)
- [Java 17](https://www.oracle.com/java/)
- [Maven](https://maven.apache.org/)

## Como Baixar e Executar

Siga estas etapas para baixar e executar o aplicativo localmente:

1. Clone este repositório para o seu computador:
```bash
   git clone https://github.com/HenriqueSydney/POO---Sistematizacao.git
```

2. Navegue até o diretório do projeto:
```bash
   cd caminho/ate/diretorio/POO---SISTEMATIZACAO
```

3. Construa a imagem Docker:
```bash
    docker-compose build
```

4. Inicie os contêineres:
```bash
   docker-compose up -d
```
Agora, o aplicativo deve estar em execução.

Com isso do Docker deve ter subido 3 imagens: Database; Backend (http://localhost:8080/); Frontend (http://localhost:5173/)

Você pode acessar o front-end (http://localhost:5173/) no seu navegador para acessar as rotas ou utilizar algum cliente para requisição HTTP ou utilizar CURL com bash

Observar que as entidades possuem relacionamento. Sugere-se iniciar com a criação de entregadores, em seguida, pacotes e, por fim, reclamações.

Não obstante, na tela inicial há um botão para inicialização da aplicação, que basicamente cria registros randômicos para entregadores e pacotes.

## Parar e Remover os Contêineres

Se desejar parar e remover os contêineres, você pode usar o seguinte comando:
```bash
   docker-compose down
```

Isso encerrará e removerá os contêineres associados ao aplicativo.

## Rotas e Parâmetros
1. DeliveryMen<br>
GET: http://localhost:8080/deliverymen/{id} => listagem de um entregador por ID<br>
```bash
curl -X GET http://localhost:8080/deliverymen/{id}
```

GET: http://localhost:8080/deliverymen/ => Listar todos os pacotes<br>
```bash
curl -X GET http://localhost:8080/deliverymen/
```

POST: http://localhost:8080/deliverymen/ => Criar pacote<br>
```json
   {
        "cpf": "11111111111",
        "name": "Henrique Lima",
        "vehicleCapacity": "MEDIUM"
   }
```
```bash
curl -X POST http://localhost:8080/deliverymen/ -H "Content-Type: application/json" -d '{
    "cpf": "11111111111",
    "name": "Henrique Lima",
    "vehicleCapacity": "MEDIUM"
}'
```


PUT: http://localhost:8080/deliverymen/{id} => Atualizar um pacote<br>
```json
   {
        "cpf": "11111111111",
        "name": "Henrique Lima",
        "vehicleCapacity": "MEDIUM"
   }
```
```bash
curl -X PUT http://localhost:8080/deliverymen/{id} -H "Content-Type: application/json" -d '{
    "cpf": "11111111111",
    "name": "Henrique Lima",
    "vehicleCapacity": "MEDIUM"
}'
```


DELETE: http://localhost:8080/deliverymen/{id} => Deletar um pacote<br>
```bash
curl -X DELETE http://localhost:8080/deliverymen/{id}
```

2. packages<br>
GET: http://localhost:8080/packages/byCode/${packageCode} = listagem de um pacote por código<br>
```bash
curl -X GET http://localhost:8080/packages/byCode/${packageCode}
```

GET: http://localhost:8080/packages/{id} => listagem de um pacote por ID<br>
```bash
curl -X GET http://localhost:8080/packages/{id}
```

GET: http://localhost:8080/packages/ => Listar todos os pacotes<br>
```bash
curl -X GET http://localhost:8080/packages/
```

POST: http://localhost:8080/packages/ => Criar pacote<br>
```json
   {
        "itemName": "Casinha de Boneca",
        "receivedDateTime": "2023-11-08T15:45:32.000Z"
   }
```
```bash
curl -X POST http://localhost:8080/packages/ -H "Content-Type: application/json" -d '{
    "itemName": "Casinha de Boneca",
    "receivedDateTime": "2023-11-08T15:45:32.000Z"
}'
```


PUT: http://localhost:8080/packages/{id} => Atualizar um pacote<br>
```json
   {
        "itemName": "Casinha de Boneca",
        "receivedDateTime": "2023-11-08T15:45:32.000Z",
        "deliveredDateTime": "2023-12-08T15:45:32.000Z",
        "deliveryMan": {
            "id": "ID do Entregador"
        }
   }
```
```bash
curl -X PUT http://localhost:8080/packages/{id} -H "Content-Type: application/json" -d '{
    "itemName": "Casinha de Boneca",
    "receivedDateTime": "2023-11-08T15:45:32.000Z",
    "deliveredDateTime": "2023-12-08T15:45:32.000Z",
    "deliveryMan": {
        "id": "ID do Entregador"
    }
}'
```


DELETE: http://localhost:8080/packages/{id} => Deletar um pacote<br>
```bash
curl -X DELETE http://localhost:8080/packages/{id}
```


3. claim<br>
GET: http://localhost:8080/claims/{id} => listagem de uma reclamação por ID<br>
```bash
curl -X GET http://localhost:8080/claims/{id}
```

GET: http://localhost:8080/claims/ => Listar todos as reclamações<br>
```bash
curl -X GET http://localhost:8080/claims/
```

POST: http://localhost:8080/claims/ => Criar reclamação<br>
```json
   {
        "claimantName": "Henrique Lima",
        "phoneNumber": "61555555555",
        "claimDescription": "Tive um problema com o meu pacote. Não foi entregue",
        "packageModel": {
            "id": "ID do PACOTE"
        }
   }
```
```bash
curl -X POST http://localhost:8080/claims/ -H "Content-Type: application/json" -d '{
    "claimantName": "Henrique Lima",
    "phoneNumber": "61555555555",
    "claimDescription": "Tive um problema com o meu pacote. Não foi entregue",
    "packageModel": {
        "id": "ID do PACOTE"
    }
}'
```


PATCH: http://localhost:8080/claims/{id} => Atualizar um atributo de uma reclamação<br>
```json
   {
        "claimSolutionDescription": "Me desculpe senhor, verificaremos o que aconteceu"
   }
```
```bash
curl -X PATCH http://localhost:8080/claims/{id} -H "Content-Type: application/json" -d '{
    "claimSolutionDescription": "Me desculpe senhor, verificaremos o que aconteceu"
}'
```


DELETE: http://localhost:8080/claims/{id} => Deletar uma reclamação<br>
```bash
curl -X DELETE http://localhost:8080/claims/{id}
```


## Contextualização - Descrição do Projeto, segundo Sistematização da Instituição

A empresa de entregas Dianome está precisando de um software simples para gerenciar algumas de suas operações. Seus três principais problemas são: 

Controlar os entregadores (cpf, nome, capacidade do veículo) 

Controlar os pacotes (código de rastreamento, data de recebimento, status, entregador e data de entrega)

Controlar as reclamações (nome do reclamante, telefone, descrição da reclamação, código de rastreamento e descrição da solução)

Você deverá escolher APENAS UM dos problemas descritos acima para resolver. Para isso você deverá desenvolver uma API REST usando o framework Spring Boot e o banco de dados (MySQL ou PostgreSQL). Sua API deverá tratar as seguintes requisições:

Uma URI que recebe o formulário com as informações e efetua a gravação no banco de dados;

Uma URI para listar todos os itens;

Uma URI para apresentar os detalhes de um item específico a partir da sua identificação;

Uma URI que recebe o formulário com as alterações de um item, seu identificador e efetua a gravação no banco de dados;

Uma URI que recebe o identificador de um item e o remove do banco de dados.

O software deve gerenciar as respectivas dependências, exceto o banco de dados, cuja instalação e credenciais devem ser tratadas como premissas. O projeto deve estar disponível publicamente no GitHub, incluindo as orientações para colocá-lo em operação e a indicação de qual problema ele resolve.

