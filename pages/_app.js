import 'typeface-lato'
import '../styles/globals.css'

import { TinaCMS, TinaProvider } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider
} from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import Script from "next/script"


function MyApp({ Component, pageProps }) {

  const github = new GithubClient({
    proxy: '/api/proxy-github',
    authCallbackRoute: '/api/create-github-access-token',
    clientId: process.env.GITHUB_CLIENT_ID,
    baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
    baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
  })

  const mediaStore = new NextGithubMediaStore(github)

  const cms = new TinaCMS({
    enabled: !!pageProps.preview,
    apis: {
      /**
       * 2. Register the GithubClient
       */
      github,
    },
    /**
     * 3. Register the Media Store
     */
    media: mediaStore,
    /**
     * 4. Use the Sidebar and Toolbar
     */
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
  })

  cms.plugins.add(MarkdownFieldPlugin)

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=UA-37752280-1`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-37752280-1', {
              page_path: window.location.pathname,
            });
        `}
      </Script>

      <TinaProvider cms={cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    </>
  )
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export default MyApp
