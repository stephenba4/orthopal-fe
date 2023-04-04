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
        {/* TO DO: edit the title and meta data */}
        <title>OrthoPal</title>
        <meta name="description" content="OrthoPal: Joint Care Made Easy" />
      </Head>

      <main
        className="min-h-screen py-10"
        style={{ backgroundColor: '#f0f4f8' }}
      >
        <div className="container mx-auto px-4">
          {/* TO DO: edit the title and subtitle */}
          <h1
            className="text-4xl font-bold mb-4 text-center"
            style={{ color: '#3182ce' }}
          >
            OrthoPal
          </h1>
          <h2 className="text-lg font-medium mb-10 text-center text-gray-700">
            Joint Care Made Easy
          </h2>
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
