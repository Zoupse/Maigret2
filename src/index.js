//import style
import './global';
//import all images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));



/// custom
const username = 'user';
const password = 'password';


const onLoginFormSubmit = e => {
    e.preventDefault(); // Annule l'action par défaut

    setTimeout(() => {
        // Récupère les données du formulaire
        const data = new FormData(e.target);
        const response = processDataForm(data);
    }, 1000); // 1 seconde
}

//verif login
const processDataForm = data => {
    if (data.get('password') !== password || data.get('username') !== username) {
        console.log("False")
    }
    else {
        console.log("Success");
    }
}

//view password
const changePasswordView = obj => {
   let type = obj.nextElementSibling.getAttribute("type");
   switch (type) {
       case "password" :
           obj.nextElementSibling.setAttribute("type", "text");
           break;
       case "text" :
           obj.nextElementSibling.setAttribute("type", "password");
           break;
   }
}

///////////////////////
//events événements

//submit
document.querySelector('#loginForm').addEventListener('submit',onLoginFormSubmit);

//view password
document.querySelectorAll('.view-button').forEach((obj)=>{
    obj.addEventListener('mousedown',()=>{
        changePasswordView(obj);
    });
    obj.addEventListener('mouseup',()=>{
        changePasswordView(obj);
    });
});