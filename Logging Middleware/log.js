let accessToken = null;

async function authenticate() {
  const response = await fetch('http://20.244.56.144/evaluation-service/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'amitsinghtomar0001@gmail.com',
      name: 'Amit Singh Tomar',
      rollNo: 'A60205222254',
      accessCode: 'JpzerQ',
     clientID: "475432e2-01e1-40f2-ba73-b3b20bb04191",
    clientSecret: "dhntvsvQDeEwhWBM"
    })    
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to authenticate: ' + JSON.stringify(data));
  }
  accessToken = data.access_token;
}

async function Log(stack, level, pkg, message) {
  if (!accessToken) {
    await authenticate();
  }

  const logPayload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message
  };

  const res = await fetch('http://20.244.56.144/evaluation-service/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(logPayload)
  });

  const result = await res.json();
  if (!res.ok) {
    console.error('Log failed:', result);
  } else {
    console.log('Log sent:', result);
  }
}

Log('frontend', 'error', 'api', 'Something went wrong');

module.exports = { Log };
