

export default async function face_IDMatchingData(doc: any) {
  var res:any={}
  try {
   
    const url = 'http://35.232.94.217:5800/api/facedoc';
  let facetemplateRaw=  localStorage.getItem("imageTemplateRaw")
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
      console.log('Data:', res);
    } else {
      console.log('Request failed with status:', response.status);
    }
  } catch (error) {
    console.log('Data:', error);
  }
  return res
}
