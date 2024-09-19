import Head from 'next/head';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/footer/Footer';
import { NewsWrapper } from '../../context/news';
import { Articles } from '../../components/news/Articles';
import { createDirectus, rest, readItems } from '@directus/sdk';

export async function getServerSideProps() {
  const client = createDirectus('http://cvr-env.eba-i8pyhtve.us-east-1.elasticbeanstalk.com').with(rest());
  // Fetch data from external API
  const res = await client.request(
    readItems('news_two', {
      sort: ['sort', '-date'], //Sort by sort field and creation date descending
    })
  );
  console.log('ARTICLES', res);

  return { props: { articles: res } }
}

export default function News({articles}) {

  return (
    <>
    <div className={`relative bg-repeat-y bg-contain`} style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
        }}>
      <Head>
      <title>{'News'} | Chino Valley Ranchers</title>
        <meta name="description" content={'Chino Valley Ranchers'}></meta>
        <meta name="keywords" content={'Chino Valley Ranchers'}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <NewsWrapper news={articles}>
        <Articles />
      </NewsWrapper>

    </div>
    <Footer />
    </>
  )
}
