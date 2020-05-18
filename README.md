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

Para instalar as dependências do projeto, primeiro é necessário fazer o download do [yarn](https://yarnpkg.com/).

Após instalar o yarn e clonar o repositório, utilize o seguinte comando no diretório do projeto para instalar as dependências necessárias:

	$ yarn

Após todas as dependências serem instaladas, utilize o comando a seguir para rodar o projeto:

	$ yarn start
O projeto estará disponivel no endereço localhost:3000 porém uma versão online pode ser utilizada [aqui](http://rafa-tube.herokuapp.com/).

## Telas

### Tela de Busca
![MockUp](https://i.imgur.com/GdX1yh9.jpg)
A tela de busca é a única tela do projeto, onde podem ser definidos os minutos diários que o usuário dispõe para assistir aos vídeos e também onde ele define o termo que será pesquisado no youtube.
Após todas as informações necessárias serem preenchidas o botão de pesquisar fica habilitado.

### Tela de Busca - Modal

![MockUpModal](https://i.imgur.com/rRuYhoB.png)
Após clicar no botão de busca, a aplicação irá fazer requisições a [API de dados do YouTube](https://developers.google.com/youtube/v3) para que os dados possam ser tratados e as informações sejam exibidas em um modal.


