const app = require('./src/app');
const env = require('./src/config/env');

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 PERN Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📦 Items Endpoint:  http://localhost:${PORT}/api/items`);
  console.log(`==================================================\n`);
});
