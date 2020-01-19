//function
var form=document.querySelector('#butt');

//console.log(form);
function pass(l,L,message){
//  console.log(form.innerHTML); reference to the button when clicked
  var apikey = '666fce17ce4e49749296f99301c1c5c2';
  var latitude = l;//'17.4301';//
  var longitude = L;//'78.4424413';//
//  passlatlan(l,L);
  console.log(l,L);
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'
  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';
  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

///IMPORTANT MAP LINK IS http://www.openstreetmap.org/?mlat=latitude&mlon=longitude&zoom=12
  request.onload = function() {
  if (request.status == 200){ 
      // Success!
      var data = JSON.parse(request.responseText);
      console.log(data.results[0].formatted);
      //console.log(data.results[0].geometry);
      const temp=data.results;//[0];
      console.log(temp);
      
      //---------------------------------------------
      const a=data.results[0].formatted;           ///this is english version of latitude and longitude
      const mapurl=data;//[0].OSM;
      firebasestore(a,l,L);                                ///call this outside the function
    //  console.log(data.results[0].annotations); 
      alert(data.results[0].formatted);

    } else if (request.status <= 500){ 
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };
  request.send();  // make the request
}

 //-------------storing into firebase
 function firebasestore(format,l,L){
  const now=new Date();
  const location={
      Formatted: `${format}`,
      URL:`http://www.openstreetmap.org/?mlat=${l}&mlon=${L}}&zoom=12`,
      coordinates:`${l},${L}`,
      created_at:firebase.firestore.Timestamp.fromDate(now),
      description:`${message}`
    }

  db.collection('Location').add(location).then(()=>{
    console.log("added to firebase");
  }).catch(err=>{
    console.log(err);
  });

 }

//call another function and pass 3 parameters coordinates, formatted,

  
/*
function passlatlan(l,L){
  let a=[l,L]
  return a;
}
*/