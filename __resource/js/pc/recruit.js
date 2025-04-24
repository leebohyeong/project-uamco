import {locationMenu, snsLink} from "./common";
import {findOne, on} from "../helper";
import {data} from "autoprefixer";

const recruitList = () => {
    locationMenu();
};

const recruitView = () => {
    //프린트
    (() => {
        const body  = findOne('body');
        const pageView = findOne('.page-view');
        const print = findOne('.btn-page-print', pageView);

        on(print, 'click', (event) => {
            event.preventDefault();
            body.classList.add('print');
            window.print();
            body.classList.remove('print');
        });
    })();

    snsLink();
};

export {
    recruitList,
    recruitView
}



