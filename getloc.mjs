import https from 'https';

https.get('https://maps.app.goo.gl/xxSxTXSLivYSAL7s5', (res) => {
  console.log(res.headers.location);
});
