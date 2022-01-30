import Head from 'next/head';

function GlobalStyle() {
    return (
        <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap'); 
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
            font-family: 'Roboto Slab', serif;
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
    );
}

export default function CustomApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>PinkCord</title>
                <link rel="icon" type="image/png" href="https://github.com/Carol42/PinkCord/blob/main/assets/pink-floyd.png?raw=true" />
                <meta charSet="utf-8" />
                <meta name="description" content="A chat platform inspired by Discord & Pink Floyd & Matrix" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
  }