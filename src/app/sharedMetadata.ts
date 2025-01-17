export const APP_URL = 'https://jesse-greenough-portfolio.vercel.app/';

const PORTRAIT =
  'https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg';

export const OPEN_GRAPH = {
  images: [
    {
      url: PORTRAIT,
      width: 800,
      height: 600,
    },
  ],
  locale: 'en_US',
  type: 'website',
}

export const TWITTER_SHARE = {
  card: 'summary_large_image',
  creator: '@GoodGreens84',
  images: {
    url: PORTRAIT,
    alt: 'Jesse Greenough',
  },
}