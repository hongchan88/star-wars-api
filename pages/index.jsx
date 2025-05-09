import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import Loading from '../components/loading';

export default function Home({ loading }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars movie search</title>
        <meta name='description' content='Star Wars movie search' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!loading && <Loading />}

      <div className={styles.banner}>
        <Header />
        <main className={styles.main}>
          <div className={styles.textcontainer}>
            <h1 className={styles.title}>Star Wars Movies and more.</h1>

            <div className={styles.description}>
              <Link href='/movies'>
                <p className={styles.moreinfo}>More info</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
