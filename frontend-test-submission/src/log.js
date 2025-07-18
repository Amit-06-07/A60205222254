
export async function Log(stack, level, pkg, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  const res = await fetch('http://localhost:5000/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (!res.ok) {
    console.error('Failed to send log:', result);
    throw new Error('Failed to send log');
  }

  console.log('Log sent successfully:', result);
}
