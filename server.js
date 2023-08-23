const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS
app.use(cors());

// Add a custom middleware to rewrite URLs
app.use('/proxy', createProxyMiddleware({
  target: 'https://s3.eu-west-2.amazonaws.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' }, // Remove the '/proxy' path
}));

const host = '0.0.0.0';
const port = process.env.PORT || 8001;

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
