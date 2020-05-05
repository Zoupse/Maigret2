import moment from 'moment';
import './style.css';

moment.locale('fr');

const element = document.createElement('p');
element.innerHTML =
    `Le cours a commencé : 
${moment("2020 04 27, 8:00:00 am", "YYYY MM DD, h:mm:ss a")
        .fromNow()}`;
document.body.appendChild(element);