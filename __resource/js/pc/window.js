import {findOne, find, on} from '../helper';
import Cookies from 'js-cookie';

const windowPopup = () => {
    const footer = findOne('.footer');
    const today = findOne('input', footer);
    const params = new URLSearchParams(location.search);
    const closeButton = findOne('.main__modal-window__close', footer);

    var todayDate = new Date();
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);

    on(today, 'change', () => {
        Cookies.set(`modal__container--${params.get('seq')}`, `${params.get('seq')}`, {expires: todayDate});
        window.close();
    });

    closeButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.close();
    })



};

export default windowPopup;