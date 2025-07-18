
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/log', async (req, res) => {
  try {
    const authRes = await fetch('http://20.244.56.144/evaluation-service/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'ramkrishna@abc.edu',
        name: 'Ram Krishna',
        rollNo: 'aa1bb',
        accessCode: 'JpzerQ',
        clientID: '475432e2-01e1-40f2-ba73-b3b20bb04191',
        clientSecret: 'dhntvsvQDeEwhWBM'
      })
    });

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    const logRes = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(req.body)
    });

    const logData = await logRes.json();
    res.status(logRes.status).json(logData);
  } catch (error) {
    console.error('Log error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
