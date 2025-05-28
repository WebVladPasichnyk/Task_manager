const https = require('https');

https.get('https://api.ipify.org', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ Internet access confirmed. Your public IP:', data);
  });
}).on('error', (err) => {
  console.error('❌ No internet access or request blocked:', err.message);
});
