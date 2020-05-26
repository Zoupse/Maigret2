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

//label click
const movelabel = obj => {
    if(obj.value !== "") {
        obj.classList.add("filled");
    }
    else {
        obj.classList.remove("filled");
    }
}

//slide

let translate = 0;
let current = 1;
const slide = (move, step) => {
    translate += move;
    document.querySelectorAll('main > div').forEach((el) => {
        el.style.transform = "translatex("+translate+"%)";
    });

    current += step;
    document.querySelector('main > .current').classList.remove("current");
    document.querySelector('main >div:nth-child('+current+')').classList.add("current");
}


///////////////////////
//events événements

//submit
document.querySelector('#loginForm').addEventListener('submit',onLoginFormSubmit);

//label
document.querySelectorAll('.input-container input').forEach((obj)=>{
    obj.addEventListener('focusout',()=>{
        movelabel(obj);
    });
    movelabel(obj); // for page load
});

//view password
document.querySelectorAll('.view-button').forEach((obj)=>{
    obj.addEventListener('mousedown',()=>{
        changePasswordView(obj);
    });
    obj.addEventListener('mouseup',()=>{
        changePasswordView(obj);
    });
});

//previous
document.querySelectorAll('.previous').forEach((obj)=>{
    obj.addEventListener('click',()=>{
        slide(+100, -1);
    });
});
//next
document.querySelectorAll('.next').forEach((obj)=>{
    obj.addEventListener('click',()=>{
        slide(-100, +1);
    });
});
