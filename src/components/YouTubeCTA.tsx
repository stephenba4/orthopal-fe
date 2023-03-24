import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const YoutubeCTA = (): ReactElement => {
  const router = useRouter();

  const handleClick = () => {
    window.open(
      'https://www.youtube.com/@healwithstephen',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-4 mt-4 text-gray-500">
        Don't forget to check out my YouTube videos and subscribe to my YouTube
        channel for more amazing content!
      </p>
      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-red-600"
      >
        Subscribe to Heal With Stephen
      </button>
    </div>
  );
};

export default YoutubeCTA;
