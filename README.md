# RafaTube
O RafaTube é uma aplicação web desenvolvida em React para o teste de Desenvolvedor da empresa Ahgora. O desafio consiste no desenvolvimento de uma aplicação que utilize um termo de busca para procurar e exibir videos do YouTube, bem como mostrar as 5 palavras mais utilizadas em titulos e descrições dos videos encontrados e por fim indique quantos dias são necessários para ver todos os videos tendo as seguintes condições: 

 * O Usuário deve inserir quanto tempo ele pode gastar diáriamente pela semana em minutos;
 * O Usuário não irá gastar mais tempo vendo vídeos do que o seu maximo por dia;
 * O Usuário não irá começar outro vídeo a não ser que ele possa termina-lo no mesmo dia;
 * Vídeos com uma duração superior ao maior tempo disponivel pelo usuário serão desconsiderados;
 * O Usuário assistirá os vídeos na ordem exata que a busca retornar;
 * Somente os primerios 200 vídeos serão considerados.

## Rodando o projeto
O aplicativo foi desenvolvido na versão 16.13.1 do React.

Para instalar as dependências do projeto, primeiro é necessário utilizar um gerenciador de pacotes como [yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/). Durante o desenvolvimento do projeto foi utilizado o yarn.

Após instalar o gerenciador e clonar o repositório, utilize um dos seguintes comandos no diretório do projeto para instalar as dependências necessárias:

	$ yarn
ou

	$ npm install
	
Após todas as dependências serem instaladas, utilize um dos comandos a seguir para rodar o projeto:

	$ yarn start
ou

	$ npm start
	
O projeto estará disponivel no endereço localhost:3000 porém uma versão online pode ser utilizada [aqui](http://rafa-tube.herokuapp.com/).

## Telas

### Tela de Busca
![MockUp](https://i.imgur.com/GdX1yh9.jpg)
A tela de busca é a única tela do projeto, onde podem ser definidos os minutos diários que o usuário dispõe para assistir aos vídeos e também onde ele define o termo que será pesquisado no youtube.
Após todas as informações necessárias serem preenchidas o botão de pesquisar fica habilitado.

### Tela de Busca - Modal

![MockUpModal](https://i.imgur.com/ke8z7Vv.png)
Após clicar no botão de busca, a aplicação irá fazer requisições a [API de dados do YouTube](https://developers.google.com/youtube/v3) para que os dados possam ser tratados e as informações sejam exibidas em um modal.


## Chave de API

Para poder fazer as requisições para a API de dados do YouTube, foi necessária a criação de uma chave de API que já se encontra no projeto.
Contudo ela tem um número de usos limitados por dia e se o limite de requisições for excedido, a aplicação não irá efetuar as buscas.
Para alterar a chave de API, você deve alterar a constante API_KEY dentro do arquivo **youTubeServices.js**.

### Criando uma nova chave de API

Para criar uma nova chave de API, primeiro é necessário que você acesse o [google cloud console](https://console.cloud.google.com/).
Após entrar na plataforma e aceitar os devidos termos, será criado automaticamente um projeto que você pode utilizar para gerar a chave de API.

![console.cloud.google.dashboard](https://i.imgur.com/hvsWOHI.png)

Na barra de pesquisa procure pela YouTube Data API v3 e clique em **Ativar**.

![console.cloud.google.youtubeAPI](https://i.imgur.com/0q0SpLQ.png)

Após ativar a API para o seu projeto, você precisará criar as credenciais para gerar a sua chave.

![console.cloud.google.createCredentials](https://i.imgur.com/diYI3jY.png)

Então você terá de responder um simples questionário acerca do projeto que irá utilizar a chave. Você deve informar qual API a chave ira consumir (YouTube Data API v3), de onde você fará as requisições (Navegador da Web) e indicar quais dados você acessará (Dados Públicos). Depois de finalizar o questionário, aperte no botão "Preciso de quais credenciais?" para prosseguir.
?
![console.cloud.google.questionarie](https://i.imgur.com/Bf21T24.png)

Pronto, se você seguiu todos os passos a plataforma deve lhe conceder uma chave para utilizar a API. :)
