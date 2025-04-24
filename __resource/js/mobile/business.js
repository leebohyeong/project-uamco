import {findOne, find, on} from '../helper';
import Tab from '../Tab';
import Swiper, {Autoplay, Pagination} from "swiper";
import Modal from "../Modal";

const business = () => {
    const business= findOne('.business');

    //tab
    (() => {
        const params = new URLSearchParams(location.search);
        const tab = new Tab(findOne('.tab', business));

        if (!!params.get('tab')) {
            //console.log(params.get('tab'));
            tab.menus[(params.get('tab') * 1) - 1].click();
        } else {
            tab.menus[0].click();
        }
    })();

    // 투자 Process
    (() => {
        const tabPanel = findOne('#tab-panel-contents-2');
        const processNavs = find('.process__nav', tabPanel);
        const processItems = find('.process__item', tabPanel);

        const toggle = (current) => {
            processNavs.forEach((processNav, index) => {
                processNav.classList.remove('process__nav--active');
                processNavs[current].classList.add('process__nav--active');
            })

            processItems.forEach((processItem, index) => {
                processItem.classList.remove('process__item--active');
                processItems[current].classList.add('process__item--active');
            })
        }

        processNavs.forEach((processNav, index) => {
            on(processNav, 'click', (event) => {
                event.preventDefault();

                toggle(index);
            })
        })
    })();

    // 투자사례
    (() => {
        const tabPanel = findOne('#tab-panel-contents-3');

        const case1Carousel = new Swiper(findOne('.swiper-case-1', tabPanel), {
            slidesPerView: 'auto',
            spaceBetween: -15,
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            modules: [Pagination],
        });

        const case2Carousel = new Swiper(findOne('.swiper-case-2', tabPanel), {
            slidesPerView: 'auto',
            spaceBetween: -15,
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            modules: [Pagination],
        });
    })();

}

export {
    business,
}