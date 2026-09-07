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
          {/*
            Google Consent Mode v2 defaults.

            This MUST be the first script in <head>, before anything that could
            load a Google tag. It denies every storage category up front; the
            consent UI sends an 'update' once the visitor chooses.

            The GTM container itself is NOT loaded here -- it is loaded from
            components/consent/GatedTagManager.js only after consent, so no tag
            inside the container can fire pre-consent regardless of how it is
            configured. See docs/gtm-handoff.md.
          */}
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', false);
            `
          }}></script>
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Ultra"
            rel="stylesheet"
          />
          {/* Adobe kit on the client's own account. It carries
              nexa-rust-script-shad-2, rockwell, din-condensed, cubano and
              proxima-nova.

              This replaces kit yyq5ssh, which serves din-condensed alone from
              an account we do not control. The Regenerative design leans on
              Nexa Rust Script for four headings; against yyq5ssh those were
              silently falling back to a plain serif, which is what a font
              audit of the rendered page turned up -- document.fonts.check()
              reports true for a face it cannot load, so the only reliable
              test is measuring rendered glyph widths.

              The same swap is on feature/jammy-v2 (PR #59). Whichever lands
              first carries it; the other will conflict on this line and
              should keep gqk7pcv. */}
          <link rel="stylesheet" href="https://use.typekit.net/gqk7pcv.css" />
          {/* Styled Components CSS */}
          {this.props.styles}
        </Head>
        <body>
          {/*
            The GTM <noscript> iframe has been removed. It loads
            googletagmanager.com unconditionally for no-JS visitors and cannot
            be consent-gated -- there is no way to ask a no-JS visitor for
            consent before it fires. Restoring it would reintroduce exactly the
            pre-consent transmission this work removes.
          */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}