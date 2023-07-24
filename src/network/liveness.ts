

export default async function livenessCheck(token: any) {
  var res:any={}
  console.log(token)
  try {
   
    const url = 'http://35.232.94.217:5800/api/liveness';
    const data = { tokenImage: token }; // Replace with your request payload
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log('Data:', response);
    if (response.ok) {
      const responseData = await response.json();
      res=responseData;
      console.log('Data:', responseData);
    } else {
      console.log('Request failed with status:', response.status);

    }
  } catch (error) {

  }
  return res
}
