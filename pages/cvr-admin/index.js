import { useCMS } from 'tinacms'
import Head from 'next/head'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { EditLink } from '../../components/tinacms/EditLink'

export default function Admin() {

    const cms = useCMS()

    return (
      <>
      <div className={`relative`}>
        <Head>
          <title>Chino Valley Ranchers | Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />
        <EditLink cms={cms} />

      </div>
      <Footer />
      </>
    )
}