import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Chatbot from '../components/Chatbot';

const Home: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Head>
        <title>SoulGuru</title>
        <meta
          name="description"
          content="SoulGuru: Your Spiritual Guide Chatbot"
        />
      </Head>

      <main className="min-h-screen bg-gray-200 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center text-teal-500">
            SoulGuru
          </h1>
          <h2 className="text-lg font-medium mb-10 text-center text-gray-500">
            Your ChatGPT Spiritual Guide
          </h2>
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
