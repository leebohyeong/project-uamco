import {findOne, find, on} from '../helper';
import Cookies from 'js-cookie';
import Swiper, {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import Modal from "../Modal";
import Tab from "../Tab";

window.Cookies = Cookies;

const main = () => {

    //main visual
    (() => {
        const mainIntro = findOne('.main__intro');
        const menus = ['01','02','03'];

        const carousel = new Swiper(findOne('.swiper', mainIntro), {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            pagination: {
                el: '.swiper__menu',
                clickable: true,
                type : 'bullets',
                renderBullet(index, className) {
                    return `
                        <div class="swiper__menu-list ${className}">
                            <span class="progressbar">
                                <span class="progressbar-fill"></span>
                            </span>
                            ${menus[index]}
                        </div>`
                },
            },

            navigation: {
                prevEl: '.swiper__button-prev',
                nextEl: '.swiper__button-next',
            },

            on: {
                init() {
                    if (this.slides.length < 2) {
                        this.el.classList.add('disabled');
                    }
                }
            },
            modules: [Autoplay,Pagination,Navigation],
        });
    })();

    //main about
    // (() => {
    //     window.addEventListener('scroll', () => {
    //         const about = findOne('.main__about');
    //         const aboutPosition = findOne('.main__about').getBoundingClientRect().top;
    //         let scrollLocation = window.scrollY;
    //         // console.log('aboutPosition = ' + aboutPosition);
    //         // console.log(scrollLocation);
    //
    //         if(scrollLocation  >= aboutPosition){
    //             about.classList.add('active');
    //         }
    //     })
    // })();

    //main news
    (() => {
        const mainNews = findOne('.main__news');
        const tabList = find('li', mainNews);
        const tabContents = find('.main__news-item');
        const tabLink = find('.main__news-more-button');

        let activeContent = '';

        for(let i=0; i<tabList.length; i++) {
            tabList[i].querySelector('a').addEventListener('click', function(event){
                event.preventDefault();

                for(let j=0; j<tabList.length; j++) {
                    tabList[j].classList.remove('active')
                    tabContents[j].style.display = 'none';
                    tabLink[j].style.display = 'none';
                }

                this.parentNode.classList.add('active');
                tabLink[i].style.display = 'block';

                activeContent = this.getAttribute('href');
                document.querySelector(activeContent).style.display = 'block';


            })
        };

    })();

    //main modal
    (() => {
        const toggleMainModal = () => {
            const body = findOne('body');
            const mainModal = findOne('.main__modal');
            const modalActive = 'modal-open';
            const modalOpen = 'modal--open';
            const modalFade = 'modal--fade';
            const modalItems = find('.modal__container', mainModal);
            const todayCloses = find('.modal__button-cookie', mainModal);
            const btnCloses = find('.modal__button-close', mainModal);

            const modalClose = () => {
                body.classList.remove(modalActive);
                mainModal.classList.remove(modalOpen);
                mainModal.classList.remove(modalFade);
            }

            // 레이어 팝업 4개를 올리고 그중 3개를 오늘하루 열지않기를 했는데
            // 그럼 1개만 떠야하는데. 아무것도 뜨지 않는다.
            modalItems.forEach((item, index) => {
                item.classList.contains(`modal__container--${Cookies.get(item.classList[1])}`) && item.remove();
            });


            // 푸쉬된게 하나도 없다면 보여주고 푸쉬된게 해당 아이템과 같다면 안보이게
            // 팝업의 갯수와 쿠키 추가된 갯수가 같다면 팝업 자체를 열지 않음 아니라면 팝업 열기
            if (!find('.modal__container', mainModal).length) {
                modalClose()
            } else {
                body.classList.add(modalActive);

                mainModal.classList.add(modalOpen);
                mainModal.classList.add(modalFade);
            }

            // 오늘하루 보지 않기 버튼
            todayCloses.forEach((button, index) => {
                var todayDate = new Date();
                todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
                console.log(todayDate);

                on(button, 'click', () => {
                    const containerSeqClass = button.closest('.modal__container').classList[1];
                    if(find('.modal__container', button.closest('.main__modal')).length === 1) {
                        modalClose();
                    }

                    Cookies.set(containerSeqClass, containerSeqClass.split('--')[1], {expires: todayDate});
                    modalItems[index].remove();
                });
            })

            // 일반닫기 버튼
            btnCloses.forEach((button, index) => {
                on(button, 'click', () => {
                    if(find('.modal__container', button.closest('.main__modal')).length === 1) {
                        modalClose();
                    }

                    modalItems[index].remove();
                });
            });
        }

        toggleMainModal();
    })();

    //main 공지사항
    (() => {
        const notice = findOne('.main__notice');
        const items = find('.swiper-slide', notice);

        if(items.length < 2) {
            return;
        }

        const carousel = new Swiper(findOne('.swiper', notice),{
            loop: true,
            direction: "vertical",
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            navigation: {
                prevEl: '.swiper__button-prev',
                nextEl: '.swiper__button-next',
            },
            modules: [Autoplay,Navigation],

            on: {
                init() {
                    findOne('.swiper__paging', notice).hidden = false;
                }
            },
        });
    })();

    //main banner
    (() => {
        const banner = findOne('.main__banner');

        const carousel = new Swiper(findOne('.swiper', banner), {
            slidesPerView: 'auto',
            spaceBetween: 19,
        });
    })();


    //main scrolltop visual에서 안보이게
    (() => {
        if (!!findOne('.site-top')) {
            const siteTop = findOne('.site-top');
            const button = findOne('.site-top__button', siteTop);
            const buttonActive = 'site-top__button--active';

            on(window, 'scroll', () => {
                const mainVisual = findOne('#uamco-main .main__intro');
                const mainVisualPosition = mainVisual.getBoundingClientRect().top;
                let scrollLocation = window.scrollY;

                if(scrollLocation  >= mainVisualPosition){
                    button.classList.add(buttonActive);
                } else {
                    button.classList.remove(buttonActive);
                }
            })
        }
    })();


    collateralCarousel();
    inflowCarousel();
};

//담보물건
const collateralCarousel = () => {
    const information = findOne('.main__information');
    const collateral = findOne('.information__collateral', information);

    //담보물건 slide list
    const carousel = new Swiper(findOne('.swiper', collateral), {
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        spaceBetween: 59,
        // allowTouchMove: false,
        slideToClickedSlide: true,

        navigation: {
            prevEl: findOne('.carousel-paging__prev', collateral),
            nextEl: findOne('.carousel-paging__next', collateral),
        },

        pagination: {
            el: ".main .information__collateral .information__pagination",
            type: "fraction",
        },

        modules: [Autoplay,Navigation,Pagination],
    });
}

//유입물건
const inflowCarousel = () => {
    const information = findOne('.main__information');
    const inflow = findOne('.information__inflow', information);

    //담보물건 slide list
    const carousel = new Swiper(findOne('.swiper', inflow), {
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        spaceBetween: 59,
        // allowTouchMove: false,
        slideToClickedSlide: true,

        navigation: {
            prevEl: findOne('.carousel-paging__prev', inflow),
            nextEl: findOne('.carousel-paging__next', inflow),
        },

        pagination: {
            el: ".main .information__inflow .information__pagination",
            type: "fraction",
        },

        modules: [Autoplay,Navigation,Pagination],
    });
}

export {
    main,
    collateralCarousel,
    inflowCarousel,
};