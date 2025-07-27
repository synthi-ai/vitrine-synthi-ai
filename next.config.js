/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'www.automate.org',
        'images.unsplash.com',
        'cdn.sanity.io',
        'cdn.pixabay.com',
        'd2ds8yldqp7gxv.cloudfront.net', // Notez qu'il ne faut pas le "https://"
        'encrypted-tbn0.gstatic.com', // Idem ici
        'fra.cloud.appwrite.io'
      ],
    },
  };
  
  module.exports = nextConfig;