





export default async function face_IDMatchingData(doc: any) {
  var res:any={}

  try {
    let facetemplateRaw = localStorage.getItem("imageTemplateRaw");

    const url = 'http://35.232.94.217:5800/api/facedoc';
    const data ={
      "image1": doc,
      "faceTemplate1": facetemplateRaw
    }; // Replace with your request payload
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
  return res
}
