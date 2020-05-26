//import style
import './global';
//import all images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));


//////////////////
/// define const

//known user data
const username = 'user';
const password = 'password';


//////////////////
/// various functions

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

    //move all
    translate += move;
    document.querySelectorAll('main > div').forEach((el) => {
        el.style.transform = "translatex("+translate+"%)";
    });

    //find current
    current += step;
    document.querySelector('main > .current').classList.remove("current");

    let currentel = document.querySelector('main >div:nth-child('+current+')');
    currentel.classList.add("current");

    //navbar
    if (currentel.classList.contains('login')){
        document.querySelector("nav").classList.remove('show');
    }
    else {
        document.querySelector("nav").classList.add('show');
    }

    //aside
    if (currentel.classList.contains('signup')){
        document.querySelector("aside").classList.add('show');

        let i = currentel.id.match(/\d+/)[0];
        document.querySelector('aside > .current').classList.remove('current');
        document.querySelector('aside > a:nth-child('+i+')').classList.add('current');
    }
    else {
        document.querySelector("nav").classList.remove('show');
    }
}

const slideaside = childnb => {

    //use node index of clicked point to find the right element
    let el = document.querySelector('main >div#step'+childnb);

    // then find node index of this element (important if we want to add steps without changing script)
    let node = el;
    let i = 0;
    while( (node = node.previousElementSibling) != null ) {
        i++;
    }

    //use this index to define the slider translate
    translate = parseInt("-"+i+"00");
    current =  i + 1;

    //then operate the slide with above function
    slide(0,0);

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

//aside
document.querySelectorAll('aside > a').forEach((obj)=>{
    obj.addEventListener('click',()=>{
        //find node index
        let node = obj;
        let i = 1;
        while( (node = node.previousElementSibling) != null ) {
            i++;
        }
        slideaside(i);
    });
});