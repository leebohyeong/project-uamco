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
    (()=> {
        const newsCarousel = findOne('.news-swiper');
        const carousel = new Swiper(findOne('.swiper', newsCarousel), {
            loop: true,
            speed: 500,
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            centeredSlides: true,
            slidesPerView: 'auto',

            navigation: {
                prevEl: '.news-swiper__paging--prev',
                nextEl: '.news-swiper__paging--next',
            },

            modules: [Autoplay,Navigation],
        });
    })();


    locationMenu();
    const dropdown= new DropdownSelect('.dropdown');
};

//공지사항 상세
const newsNoticeView = () => {
    newsPrint();
    snsLink();
};

//당사소식 리스트
const newsCompanyNewsList = () => {
    (()=> {
        const newsCarousel = findOne('.news-swiper');
        const carousel = new Swiper(findOne('.swiper', newsCarousel), {
            loop: true,
            speed: 500,
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            centeredSlides: true,
            slidesPerView: 'auto',

            navigation: {
                prevEl: '.news-swiper__paging--prev',
                nextEl: '.news-swiper__paging--next',
            },

            modules: [Autoplay,Navigation],
        });
    })();

    locationMenu();
};

//당사소식 상세
const newsCompanyNewsView = () => {
    newsPrint();
    snsLink();
};

//업계소식 리스트
const newsIndustryNewsList = () => {
    (()=> {
        const newsCarousel = findOne('.news-swiper');
        const carousel = new Swiper(findOne('.swiper', newsCarousel), {
            loop: true,
            speed: 500,
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            centeredSlides: true,
            slidesPerView: 'auto',

            navigation: {
                prevEl: '.news-swiper__paging--prev',
                nextEl: '.news-swiper__paging--next',
            },

            modules: [Autoplay,Navigation],
        });
    })();

    locationMenu();
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
    newsCompanyNewsList,
    newsCompanyNewsView,
    newsIndustryNewsList,
    newsIndustryNewsView
}



