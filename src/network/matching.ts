

export default async function face_IDMatchingData(doc: any) {
  var res:any={}
  try {
   
    const url = 'https://facephi.orokii.com/api/selphid/authenticate-facial/document/face-template';
  let facetemplateRaw=  localStorage.getItem("bestImageTemplate")
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "documentTemplate":doc,
        "faceTemplate1":facetemplateRaw
        }),
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
