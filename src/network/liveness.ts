

export default async function livenessCheck(token: any) {
  var res:any={}
  try {
   
    const url = 'https://facephi.orokii.com/api/selphid/passive-liveness/evaluate/token';
    const data = { tokenImage: token }; // Replace with your request payload
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const responseData = await response.json();
      res=responseData;
      console.log('Data:', responseData);
    } else {
      console.log('Request failed with status:', response.status);
    }
  } catch (error) {

  }
  return res['diagnostic']
}
