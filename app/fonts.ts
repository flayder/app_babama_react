import localFont from 'next/font/local';

const fontGotham = localFont({
  src: [
    {
      path: '../../public/fonts/gothampro-regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/gothampro-medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/gothampro-bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
});

const fontPanton = localFont({
  src: '../../public/fonts/Panton-Regular.woff2',
  display: 'swap',
});

export { fontPanton, fontGotham };
