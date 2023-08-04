export default async function livenessCheck(token: any) {
  var res:any = {};
  console.log(token);
  try {
    const url = 'https://facephi.orokii.com/api/selphid/passive-liveness/evaluate/token';
    const data = { "tokenImage": token }; // Replace with your request payload
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://orokii-test.vercel.app' // Replace with the allowed origin
      },
      body: JSON.stringify(data)
    });
    console.log('Data:', response);
    if (response.ok) {
      const responseData = await response.json();
      res = responseData;
      console.log('Data:', responseData);
    } else {
      console.log('Request failed with status:', response.status);
    }
  } catch (error) {
    // Handle error here
  }
  return res;
}
