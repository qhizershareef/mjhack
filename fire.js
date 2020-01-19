const list = document.querySelector('ul');
const form = document.querySelector('form');

const addLocation= (location)=>{
    let html=`
    <li>
        <div>${location.Formatted || location.FORMATTED} <div>${location.coordinates}</div></div> 
        <div>${location.created_at.toDate()}</div>
        <div><b>${location.description}</b></div>  
        <a href="${location.URL}">Open Maps</a> 
    </li>
    `;//in coordinates call a function and pass the values
    list.innerHTML+=html;
    console.log(html);
}
db.collection('Location').get().then(snapshot=>{
//    console.log(snapshot.docs[1].data());
//    const fdata=snapshot.docs[1].data();
//    console.log(fdata.URL);
    snapshot.docs.forEach((doc)=>{
      //  console.log(doc.data());
        addLocation(doc.data());
    });
}).catch(err=> {
    console.log(err);
});