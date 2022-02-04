# Crie o seu próprio Aluracord!

### Pré-requisitos
Você vai precisar ter instalado em sua máquina a versão LTS do [Node.js](), o [Git]() e algum editor de código, como o [VSCode](). Também é recomendado ter instalado o [Yarn]().

[Link do layout da aplicação no Figma](https://www.figma.com/file/X5kVg1hNCajiV73ah7iyPz/Imers%C3%A3o-React---Aluracord---Matrix).

### Aula 01 - Matrix Chat: Criando o nosso projeto Aluracord

<details>
  <summary>Detalhes da aula</summary>
<h4>Detalhes desta aula</h4>

Nesta primeira aula de React começaremos a fazer a nossa área de login no Aluracord! E você vai colocá-la no ar!

Nesta aula vamos criar tudo do ZERO: desde o package.json até os arquivos bases do Next.js para iniciar nosso projeto e ter o CSS in JS com styled-jsx para cuidar da camada de estilo da nossa aplicação, duas ferramentas essenciais do mundo React. Também entenderemos como React se tornou tão popular no mercado de tecnologia e como iniciar o nosso aprendizado com a tecnologia.
<h4>Conteúdo detalhado desta aula</h4>

  -  Iniciaremos um projeto Next.js;
  -  Criaremos components com React usando CSS in JS;
  -  Vamos ver a estrutura inicial de um projeto Next.js;
  -  Passaremos propriedades para components;
  -  Faremos deploy do seu Aluracord na Vercel.

</details>

- Crie uma pasta chamada Aluracord (ou o nome que desejar para o projeto), abra a pasta pelo terminal e execute os seguintes comandos:

- Iniciando o projeto
```bash
yarn init -y
# ou
npm init -y
```
- Instalando as bibliotecas Next, React e React-dom
```bash
yarn add next react react-dom
# or
npm install next react react-dom
```
- Abra o ```package.json``` e adicione os seguintes scripts:

```bash
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

#### Criando a sua primeira página

- Crie uma pasta ```pages```, e dentro dela o arquivo ```index.js```.
- No arquivo ```index.js```, adicione o seguinte código:

```js
function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage
```

- Rodando o código no modo de desenvolvimento:
```bash
yarn dev
# ou
npm run dev
```
- Instalando a lib SkynexUI

```bash
yarn add @skynexui/components
# ou
npm i @skynexui/components
```

- Crie o arquivo ```config.json``` na raiz do projeto com o seguinte código:

```json
{
  "name": "Aluracord - Matrix (peas)",
  "stickers": [
    "http://2.bp.blogspot.com/-d21tffsTIQo/U_H9QjC69gI/AAAAAAAAKqM/wnvOyUr6a_I/s1600/Pikachu%2B2.gif",
    "https://media1.giphy.com/media/BdghqxNFV4efm/200.gif",
    "https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif",
    "https://i.pinimg.com/originals/0b/1c/23/0b1c2307c83e1ebdeed72e41b9a058ad.gif",
    "https://c.tenor.com/VylWt5lyjBoAAAAC/omg-yes.gif",
    "https://i.pinimg.com/originals/96/34/c5/9634c520c9a3cd4e7f23190bb2c96500.gif"
  ],
  "theme": {
    "colors": {
      "primary": {
        "050": "#E3F9E5",
        "100": "#C1EAC5",
        "200": "#A3D9A5",
        "300": "#7BC47F",
        "400": "#57AE5B",
        "500": "#3F9142",
        "600": "#2F8132",
        "700": "#207227",
        "800": "#0E5814",
        "900": "#05400A"
      },
      "neutrals": {
        "000": "#FFFFFF",
        "050": "#F5F7FA",
        "100": "#E4E7EB",
        "200": "#CBD2D9",
        "300": "#9AA5B1",
        "400": "#52667A",
        "500": "#313D49",
        "600": "#29333D",
        "700": "#212931",
        "800": "#181F25",
        "900": "#101418",
        "999": "#080A0C"
      }
    }
  }
}

```
- Atualize o index.js com o seguinte código:

```js
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function GlobalStyle(){
    return (
        <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
    )
}

//Componente React
function Titulo(props){

    let Tag = props.tag || 'h1';
    return (
    <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag} {
                color:${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
        )
}

export default function PaginaInicial() {
    const username = 'lariodiniz';

    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>

              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}


            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
  ```

  - Crie o arquivo ```.gitignore``` executando o comando:
```bash
  npx gitignore node
```

### Aula 02 - State, novas páginas e navegação SPA vs a Tradicional

<details>
  <summary>Detalhes da aula</summary>
<h4>Detalhes desta aula</h4>

Nesta aula aprenderemos a lidar com o state do React e entender melhor o que é uma SPA (Single Page Application).

<h4>Conteúdo detalhado desta aula</h4>

  -  Entender melhor o que é um SPA;
  -  Conhecer o useState do React;
  -  Como trabalhar com eventos no React onSubmit, onClick;
  -  E sempre após cada push na sua branch principal do GitHub faremos deploy do seu Aluracord na Vercel.
</details>

Usando o state do React para controlar a variável username no arquivo ```index.js```:

1. Importando o React e o ```useState```:

```js
import React, { useState } from 'react';
```

2. Declarando uma variável com o ```useState```:

```js
const [username, setUsername] = useState('peas');
```

3. Usando a variável ```username``` e a função ```setUsername``` no campo de input (compotente TextField):

```js
  <TextField
    value={username} onChange={function A(event){
      let valor = event.target.value;
      setUsername(valor)
    } }
    fullWidth
    textFieldColors={{
      neutral: {
        textColor: appConfig.theme.colors.neutrals[200],
        mainColor: appConfig.theme.colors.neutrals[900],
        mainColorHighlight: appConfig.theme.colors.primary[500],
        backgroundColor: appConfig.theme.colors.neutrals[800],
      },
    }}
  />
```

- Para criar uma nova página, basta criar um novo arquivo na pasta ```pages``` que o Next.js já reconhece.
- Vamos criar o arquivo ```chat.js``` na pasta ```pages``` com o seguinte código:

```js
function PaginadoChat(){
    return <div>Página do Chat</div>
}

export default PaginadoChat
```

- Para navegar entre as páginas, usaremos o ```useRouter``` do Next.js.
- Importando o ```useRouter``` no arquivo ```index.js```:

```js
import { useRouter } from 'next/router';
```
- Criando a variável de roteamento no ```index.js```:
```js
const roteamento = useRouter();
```

- Criando a função ```onSubmit``` no form do ```index.js``` (componente Box): 
```js
onSubmit={function(event){
  event.preventDefault();
  roteamento.push('/chat')}}
```
- Crie o arquivo ```_app.js``` dentro da pasta ```pages``` e adicione o seguinte código:

```js
function GlobalStyle(){
    return (
        <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
    )
}

export default function MyApp({ Component, pageProps}){
    return (
        <>
        <GlobalStyle />
        <Component {...pageProps} />
        </>
    )
}
```

### Aula 03 - Chat offline? Aprimorando as habilidades com State

<details>
<summary>Detalhes da aula</summary>

<h4>Detalhes desta aula</h4>

Nesta aula vamos criar a estrutura do nosso chat e fazer ele funcionar inicialmente sem nenhum Back-End. Explicaremos também muitos conceitos de Front-End que funcionam em diversos tipos de projetos. Você vai perceber como ser Dev em T facilita muito a sua vida como programador ou programadora!

<h4>Conteúdo detalhado desta aula</h4>

  -  Entender um pouco mais de como podemos trabalhar com state no React;
  -  Trabalhar com arrays no state;
  -  Criar um campo que ao apertamos o "Enter", faz o submit das informações;

</details>

- Template base da página de chat: 
```js
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/vanessametonini.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto}
            </Text>
        </Box>
    )
}
```

Criando a lógica da mensagem

1. Criando a variável mensagem com ```useState```:

```js
const [mensagem, setMensagem] = React.useState('');
```

2. Criando a variável lista de mensagem com ```useState```:

```js
const [listaMensagem, setListaMensagem] = React.useState([]);
```

3. Criando a função ```handleNovaMensagem```:

```js
    const handleNovaMensagem = (novaMensagem) =>{
        setListaMensagem([...listaMensagem, novaMensagem])
        setMensagem('')
    }
```

4. Atualizando o componente TextBox com as duas variáveis criadas e o evento ```onKeyPress```:

```js
<TextField
    placeholder="Insira sua mensagem aqui..."
    value={mensagem}
    onChange={(event) => setMensagem(event.target.value)}
    onKeyPress={(event) =>{
        if ((event.key === 'Enter') && (!event.shiftKey)){
            event.preventDefault();
            handleNovaMensagem(mensagem);
            }
        }}
        type="textarea"
        styleSheet={{
            width: '100%',
            border: '0',
            resize: 'none',
            borderRadius: '5px',
            padding: '6px 8px',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            marginRight: '12px',
            color: appConfig.theme.colors.neutrals[200],
        }}
/>
```

### Aula 04 - Integrando com o Supabase.io

<details>
<summary>Detalhes da aula</summary>
<h4>Detalhes desta aula</h4>

Nesta aula vamos integrar com o Supabase! Uma ferramenta de "Back-End as a Service" que vai nos ajudar a ter um banco de dados real time para guardar as mensagens do nosso chat.

<h4>Conteúdo detalhado desta aula</h4>

  -  AJAX e o que é?
  -  Supabase
  -  Aba network para debugarmos requests HTTP
  -  useEffect no React
</details>

Criando o servidor e a tabela de mensagem:

- Acesse **https://supabase.com/** e crie o banco de dados.
- Crie uma nova tabela chamada ```mensagens``` com os campos ```id``` (já vem por padrão), ```created_at``` (já vem por padrão), ```de``` e ```texto```.

- Instale a lib do supabase:

```bash
yarn add @supabase/supabase-js
# ou
npm i @supabase/supabase-js
```

Criando o client do supabase na página chat:

1. Importando a bliblioteca:

```js
import { createClient } from '@supabase/supabase-js';
```
2. Criando as variáveis ```SUPABASE_ANON_KEY``` e ```SUPABASE_URL``` utilizando as informações obtidas ao criar o projeto de banco de dados na plataforma:

```js
const SUPABASE_ANON_KEY = ***ANON KEY DO SUPABASE;
const SUPABASE_URL = ***URL DO SUPABASE;
```

3. Criando a variável ```supabaseClient```:

```js
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
- Crie a função para buscar as mensagens no banco:
```js
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });
    }, []);
```

- Substitua o ```setListaDeMensagens``` no ```handleNovaMensagem``` por:
```js
        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
            });
```

- Não vamos mais utilizar essa forma de gerar os ids das mensagens, então pode excluir essa linha:

```js
    id: listaDeMensagens.length + 1,
```

- Substitua a ```src``` do componente ```Image``` por:
```js
    src={`https://github.com/${mensagem.de}.png`}
```

### Aula 05 - Adicionando suporte para Stickers e dicas essenciais para próximos passos

<details>
<summary>Detalhes da aula</summary>
<h4>Detalhes desta aula</h4>

E estamos chegando ao fim da nossa imersão... Mas não é pra ficar triste! Nesta aula vamos falar sobre:

  -  Web Sockets
  -  E adicionar os stickers
</details>

- Crie uma pasta ```components``` com o arquivo ```ButtonSendSticker.js``` com o seguinte código:
```js
import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '50px',
          minHeight: '50px',
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            right: '30px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflow: 'scroll',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
```
- No arquivo ```chat,js``` importe o novo arquivo criado:
```js
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
```
- Adicione o componente do botão para enviar stickers na página, junto com a função ```onStickerClick```:
```js
    <ButtonSendSticker
        onStickerClick={(sticker) => {
        // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
        handleNovaMensagem(':sticker: ' + sticker);
        }}
    />
```
- Dentro da função ```MessageList``` substitua o ```{mensagem.texto}``` pelo seguinte código:

```js
{/* [Declarativo] */}
            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />
              )
              : (
                mensagem.texto
              )}
            {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
            {/* {mensagem.texto} */}
```

- No arquivo ```chat,js``` importe o ```useRouter```:

```js
import { useRouter } from 'next/router';
```
*Dessa forma a aplicação poderá entender quando você quer enviar um sticker, e mostrará a imagem, não o link da imagem, como texto.

- Crie a seguinte função para sincronizar as mensagens e o banco de dados em tempo real:
```js
function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}
```
- No arquivo ```index.js``` substitua o ```roteamento.push('/chat?username=' + username);``` por:
```js
roteamento.push(`/chat?username=${username}`);
```
*Assim poderemos passar o nome do usuário pela URL e utilizá-lo na página de chat.

- Na função ```ChatPage()``` crie as seguintes variáveis:
```js
const roteamento = useRouter();
const usuarioLogado = roteamento.query.username;
```
- Na função ```handleNovaMensagem()``` atualiza o valor de ```de``` para o da variável recém-criada:
```js
de: usuarioLogado,
```
- Adiciona o seguinte código na função ```ChatPage()```, para atualizar a lista de mensagens em tempo real:
```js
    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log('Nova mensagem:', novaMensagem);
      console.log('listaDeMensagens:', listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array) 
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log('valorAtualDaLista:', valorAtualDaLista);
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);
```