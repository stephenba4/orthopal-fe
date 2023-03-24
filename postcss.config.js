module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    [
      'tailwindcss',
      {
        // specify the location of your Tailwind CSS config file
        config: './tailwind.config.js',
      },
    ],
  ],
};
