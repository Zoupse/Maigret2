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

//alert
const alert = document.querySelector("#alert");

//time
const loadtime = 800;


//////////////////
/// various functions

const onFormSubmit = e => {
    e.preventDefault(); // Annule l'action par défaut

    let id = e.target.id;


    setTimeout(() => {
        // Récupère les données du formulaire
        const data = new FormData(e.target);
        const response = processDataForm(data, id);
    }, loadtime); // 1 seconde
}

//verif login
const processDataForm = (data, id) => {

    switch (id) {
        case 'loginForm':
            if (data.get('password') !== password || data.get('username') !== username) {
                alert.innerHTML = "Wrong username or password";
                alert.classList.add("show");
                console.log("False");
            }
            else {
                alert.classList.remove("show");
                slide(+100, -1);
            }
            break;
        case 'signup1':
            if (data.get('password') !== data.get('password-2')) {
                alert.innerHTML = "Password fields are not the same";
                alert.classList.add("show");
            }
            else {
                alert.classList.remove("show");
            }
            break;
    }

}

//view password
const changePasswordView = obj => {
    let el = obj.previousElementSibling.previousElementSibling;
   let type = el.getAttribute("type");
   switch (type) {
       case "password" :
          el.setAttribute("type", "text");
           break;
       case "text" :
           el.setAttribute("type", "password");
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
let translate = -100; //translate to view the first wanted slide
let current = 2; //nth child of the first wanted slide

const slide = (move, step) => {

    //move all
    translate += move;
    document.querySelectorAll('.slider > div').forEach((el) => {
        el.style.transform = "translatex("+translate+"%)";
    });

    //find current
    current += step;
    document.querySelector('.slider > .current').classList.remove("current");

    let currentel = document.querySelector('.slider >div:nth-child('+current+')');
    currentel.classList.add("current");

    console.log(currentel);

    //navbar
    if (!currentel.classList.contains('login')){
        document.querySelector("nav").classList.add('show');
    }
    else {
        document.querySelector("nav").classList.remove('show');
    }

    //aside
    if (currentel.classList.contains('signup')){
        document.querySelector("aside").classList.add('show');

        let i = currentel.id.match(/\d+/)[0];
        document.querySelector('aside > .current').classList.remove('current');
        document.querySelector('aside > a:nth-child('+i+')').classList.add('current');
    }
    else {
        document.querySelector("aside").classList.remove('show');
    }
}

const slideaside = childnb => {

    //use node index of clicked point to find the right element
    let el = document.querySelector('.slider >div#step'+childnb);

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
document.querySelectorAll('form').forEach((obj)=>{
    obj.addEventListener('submit',onFormSubmit);
});

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
    // for touchable screens
    obj.addEventListener('touchstart',()=>{
        changePasswordView(obj);
    });
    obj.addEventListener('touchend',()=>{
        changePasswordView(obj);
    });
});

//previous
document.querySelectorAll('.previous').forEach((obj)=>{
    obj.addEventListener('click',(e)=>{
        e.preventDefault();
        slide(+100, -1);
    });
});

//next
document.querySelectorAll('.next').forEach((obj)=>{
    obj.addEventListener('click',()=>{
        if(obj.type == "submit") {
            setTimeout(() => {
                if(!obj.parentElement.querySelector("input:invalid") && !alert.classList.contains("show")) {
                    slide(-100, +1);
                }
                else {
                    console.log("invalid input");
                }
            }, loadtime + 1);
        }
        else {
            slide(-100, +1);
        }
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