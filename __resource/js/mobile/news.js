import {findOne, find, on} from "../helper";
import {locationMenu, snsLink} from "./common";
import Swiper, {Autoplay, Navigation} from "swiper";
import DropdownSelect from "../DropdownSelect";

const newsPrint = () => {
    //프린트
    const body  = findOne('body');
    const pageView = findOne('.page-view');
    const print = findOne('.btn-page-print', pageView);

    on(print, 'click', (event) => {
        event.preventDefault();

        body.classList.add('print');
        window.print();
        body.classList.remove('print');
    });
};

//공지사항 리스트
const newsNoticeList = () => {
    locationMenu();
    const dropdown= new DropdownSelect('.dropdown');
};

//공지사항 상세
const newsNoticeView = () => {
    newsPrint();
    snsLink();
};

//당사소식 리스트
const newsNewsOurCompanyList = () => {
    locationMenu();
    const dropdown= new DropdownSelect('.dropdown');
};

//당사소식 상세
const newsNewsOurCompanyView = () => {
    newsPrint();
    snsLink();
};

//업계소식 리스트
const newsIndustryNewsList = () => {
    locationMenu();
    const dropdown= new DropdownSelect('.dropdown');
};

//업계소식 상세
const newsIndustryNewsView = () => {
    newsPrint();
    snsLink();
};



export {
    newsPrint,
    newsNoticeList,
    newsNoticeView,
    newsNewsOurCompanyList,
    newsNewsOurCompanyView,
    newsIndustryNewsList,
    newsIndustryNewsView
}



