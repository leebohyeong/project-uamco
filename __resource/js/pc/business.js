import {findOne, find, on} from '../helper';
import Tab from '../Tab';
import Modal from "../Modal";

const business = () => {
    const business= findOne('.business');

    //tab
    (() => {
        const params = new URLSearchParams(location.search);
        const tab = new Tab(findOne('.tab', business));

        if (!!params.get('tab')) {
            console.log(params.get('tab'));
            tab.menus[(params.get('tab') * 1) - 1].click();
        } else {
            tab.menus[0].click();
        }
    })();


}

export {
    business
}