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

    //retire la classe wrong des champs valides, dans le cas où ils ne sont pas traités individuellement juste après
    document.querySelectorAll("#"+id+" input:valid").forEach((obj)=>{
        obj.classList.remove("wrong");
    });

    //traitement indépendant des champs
    switch (id) {
        case 'loginForm':
            if (data.get('password') !== password || data.get('username') !== username) {
                alert.innerHTML = "Wrong username or password";
                alert.classList.add("show");
            }
            else {
                alert.classList.remove("show");
                translate = 0;
                current =  1;
                //then operate the slide with above function
                slide(0,0);
            }
            break;
        case 'signup1':
            if (data.get('password') !== data.get('password-2')) {
                alert.innerHTML = "Password fields are not the same";
                alert.classList.add("show");
                document.querySelectorAll("#signup1 input[type=password]").forEach((obj)=>{
                    obj.classList.add("wrong");
                });
            }
            else {
                alert.classList.remove("show");
                document.querySelectorAll("#signup1 input[type=password]").forEach((obj)=>{
                    obj.classList.remove("wrong");
                });
            }
            break;
        case 'signup3':
           let i = 0;
           document.querySelectorAll("aside .required").forEach((obj)=> {
               if(!obj.classList.contains("right")){
                   obj.classList.add("wrong");
                   i = 1;
               }
           });
           if(i){
               document.querySelectorAll(".signup input:invalid").forEach((obj)=>{
                   obj.classList.add("wrong");
               });
               alert.innerHTML = "Oops. Looks like you forgot something.";
               alert.classList.add("show");
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


//slide initialisation and variables
let translate = -200; //translate to view the first wanted slider
let current = 3; //nth child of the first wanted slide

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


// find required slides to define required points in aside
document.querySelectorAll(".signup").forEach((obj)=>{
    if(obj.querySelector('input:required')){
        let i = obj.id.match(/\d+/)[0];
        document.querySelector("aside > a:nth-child("+i+")").classList.add("required");
    }
});

// Note à M.Maigret / précisions : dans l'idée il devrait y avoir une sidebar unique pour tout type de groupe de champs.
// Là par exemple on a un "groupe de champs" défini par la class signup, avec le même nombre de points apparaissant dans la sidebar.
// Actuellement les points ne sont pas générés dynamiquement (par manque de temps à cause d'autres projets, et aussi parceque pour ce formulaire les points ne servent qu'une fois.
// Il n'y a aucun autre groupe de champs, donc en soit "peu importe".).
// TOUTEFOIS pour chaque groupe de champs il faudrait adapter le nombre de points.
// On aurait dans un premier temps 1) détection des groupes 2) calcul du nombre d'éléments par groupe 3) sauvegarde de la donnée dans un tableau (j'imagine) pour associer le nb à la classe du groupe
// 4) listener pour contrôler la classe courante et gérer l'apparition du bon nombre de points 5) traitement en étape finale du form de la validité de tous les champs du groupe.
// Alors certes dans l'absolu ça semble pas très utile, mais j'avais simplement envie de faire mon petit bout de code semi-dynamique pour avoir quelque chose d'un peu aboutit.
// "un PEU aboutit", car comme vous pouvez le constater, je ne suis pas allée jusqu'au bout de l'idée.
//
// J'espère que ces précisions vous permettront de mieux comprendre la démarche derrière les fonctions de cette page ! :)


///////////////////////
//events événements

//submit
document.querySelectorAll('form').forEach((obj)=>{
    obj.addEventListener('submit',onFormSubmit);
});

//label
document.querySelectorAll('.input-container input, .input-container textarea').forEach((obj)=>{
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
    }, { passive: true } );
    obj.addEventListener('touchend',()=>{
        changePasswordView(obj);
    }, { passive: true } );
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
        if(obj.type == "submit") { //specific action for submit type
            setTimeout(() => { //longer timeout than function wich handle submit action
                if(!alert.classList.contains("show") && !obj.parentElement.querySelector("input:invalid")) { //every thing is ok
                    if(document.querySelector("aside").classList.contains("show")) {
                        let point = document.querySelector("aside .current");
                        point.classList.remove("wrong");
                        point.classList.add("right");
                    }
                    slide(-100, +1);
                }
                else if(alert.classList.contains("show")) { //something's wrong
                    if(document.querySelector("aside").classList.contains("show")) {
                        let point = document.querySelector("aside .current");
                        point.classList.add("wrong");
                        point.classList.remove("right");
                    }
                }
            }, loadtime + 1);
        }
        else { //common action
            slide(-100, +1);
        }
    });
});

//aside
document.querySelectorAll('aside > a').forEach((obj)=>{
    obj.addEventListener('click',()=>{
        //remove eventual alert
        document.querySelector("#alert").classList.remove("show");
        //find node index
        let node = obj;
        let i = 1;
        while( (node = node.previousElementSibling) != null ) {
            i++;
        }
        slideaside(i);
    });
});