import type { NextPage } from 'next';
import Head from 'next/head';
import Chatbot from '../components/Chatbot';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chatbot App</title>
        <meta
          name="description"
          content="SoulGuru: Your spiritual guide chatbot"
        />
      </Head>

      <main className="min-h-screen bg-gray-200 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center text-teal-500">
            SoulGuru
          </h1>
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
