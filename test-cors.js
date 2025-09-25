// Test CORS configuration
const https = require('https');

const testUrl = 'https://your-vercel-app.vercel.app'; // Replace with your actual Vercel URL

function testCORS(url) {
  console.log(`Testing CORS for: ${url}`);
  
  const options = {
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://example.com',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    }
  };

  const req = https.request(url + '/api/feedback', options, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Headers:');
    console.log('  Access-Control-Allow-Origin:', res.headers['access-control-allow-origin']);
    console.log('  Access-Control-Allow-Methods:', res.headers['access-control-allow-methods']);
    console.log('  Access-Control-Allow-Headers:', res.headers['access-control-allow-headers']);
    console.log('  Access-Control-Allow-Credentials:', res.headers['access-control-allow-credentials']);
  });

  req.on('error', (err) => {
    console.error('Error:', err.message);
  });

  req.end();
}

// Test with your actual Vercel URL
// testCORS('https://your-app-name.vercel.app');

console.log('CORS Test Script');
console.log('Replace the URL in testCORS() with your actual Vercel deployment URL');
console.log('Then run: node test-cors.js');
