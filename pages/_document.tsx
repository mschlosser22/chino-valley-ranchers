import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Google Tag Manager - add the <head> part here */}
          <script dangerouslySetInnerHTML={{
            __html: `
            <!-- Google Tag Manager -->
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5BWNNM7F');
            <!-- End Google Tag Manager -->

            `
          }}></script>
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Ultra"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://use.typekit.net/yyq5ssh.css" />
          {/* Styled Components CSS */}
          {this.props.styles}
        </Head>
        <body>
          {/* Google Tag Manager - add the <body> part here */}
          <noscript dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BWNNM7F"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}