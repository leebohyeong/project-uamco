import {findOne, find, on} from '../helper';
import Cookies from 'js-cookie';
import Swiper, {Autoplay, EffectFade, Navigation, Pagination, Scrollbar} from "swiper";
import Modal from "../Modal";
import Tab from "../Tab";

window.Cookies = Cookies;

const main = () => {
    //main visual
    (() => {
        const mainIntro = findOne('.main__intro');
        const carousel = findOne('.swiper', mainIntro);
        const menus = ['01','02','03'];

        on(window, 'load', () => new Swiper(carousel, {
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
        }));
    })();

    //main 사업소개 배너
    (() => {
        const introBanner = findOne('.main__intro-banner');
        const tabLists = find('dl div', introBanner);

        tabLists.forEach(tabList => {
            tabList.addEventListener('mouseover', () => {
                tabList.classList.add('active');
            })
            tabList.addEventListener('mouseout', () => {
                tabList.classList.remove('active');
            })
        })

    })();

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
                document.querySelector(activeContent).style.display = 'grid';


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
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: '.swiper__button-prev',
                nextEl: '.swiper__button-next',
            },
            modules: [Autoplay,Navigation],

            on: {
                init() {
                    findOne('.swiper__paging', notice).hidden = false;
                    // findOne('.swiper__paging', notice).removeAttribute('hidden');
                }
            },
        });
    })();

    //main about
    (() => {
        window.addEventListener('scroll', () => {
            const about = findOne('.main__about');
            const aboutPosition = findOne('.main__about').getBoundingClientRect().top;
            let scrollLocation = window.scrollY;
            // console.log('aboutPosition = ' + aboutPosition);
            // console.log(scrollLocation);

            if(scrollLocation + 20  >= aboutPosition){
                about.classList.add('active');
            }
        })
    })();

    collateralCarousel();
    inflowCarousel();
};

//담보물건
const collateralCarousel = () => {
    const siteMain = findOne('.main');
    const collateral = findOne('.information__collateral', siteMain);
    const detail = findOne('.information-detail', collateral);
    const list = findOne('.information-list', collateral);

    //담보물건 list detail로 복사 붙여넣기
    (()=> {
        const detailCarousel = findOne('.swiper-wrapper', detail);
        const listCarousel = findOne('.swiper-wrapper', list);

        detailCarousel.innerHTML = listCarousel.innerHTML;
    })();

    //담보물건 slide detail
    const detailCarousel = new Swiper(findOne('.swiper', detail), {
        speed: 0,
        // simulateTouch: false,  //넣으면 current값 안바뀜
        allowTouchMove: false,
        slideToClickedSlide: true,
    });

    //담보물건 slide list
    const listCarousel = new Swiper(findOne('.swiper', list), {
        loop: true,
        slidesPerView: 'auto',
        speed: 500,
        // simulateTouch: false,  //넣으면 current값 안바뀜
        allowTouchMove: false,
        slideToClickedSlide: true,
        navigation: {
            prevEl: findOne('.information__paging-prev', collateral),
            nextEl: findOne('.information__paging-next', collateral),
        },
        pagination: {
            el: ".main .information__collateral .information__pagination",
            type: "fraction",
        },

        on: {
            slideChange(swiper) {
                detailCarousel.slideToLoop(swiper.realIndex);
                // console.log(swiper.realIndex);
            },

            // init: function () {
            //     if (this.slides.length > 1) {
            //         this.el.classList.add('disabled');
            //     }
            // }
        },

        modules: [Autoplay,Navigation,Pagination],
    });


    //slide list클릭시 해당 list로 detail변경
    const carouselItemLinks = find('.information-list__item', list);

    carouselItemLinks.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            const itemParent = item.parentNode;
            const itemParentDate = itemParent.getAttribute('data-swiper-slide-index');

            detailCarousel.slideToLoop(itemParentDate);
            // listCarousel.slideToLoop(itemParentDate, 0);

        });
    });
}

//유입물건
const inflowCarousel = () => {
    const siteMain = findOne('.main');
    const inflow = findOne('.information__inflow', siteMain);
    const detail = findOne('.information-detail', inflow);
    const list = findOne('.information-list', inflow);

    //유입물건 list detail로 복사 붙여넣기
    (()=> {
        const detailCarousel = findOne('.swiper-wrapper', detail);
        const listCarousel = findOne('.swiper-wrapper', list);

        detailCarousel.innerHTML = listCarousel.innerHTML;
    })();

    //유입물건 slide detail
    const detailCarousel = new Swiper(findOne('.swiper', detail), {
        speed: 0,
        // simulateTouch: false,  //넣으면 current값 안바뀜
        allowTouchMove: false,
        slideToClickedSlide: true,
    });

    //유입물건 slide list
    const listCarousel = new Swiper(findOne('.swiper', list), {
        loop: true,
        slidesPerView: 'auto',
        speed: 500,
        // simulateTouch: false,
        allowTouchMove: false,
        slideToClickedSlide: true,
        navigation: {
            prevEl: findOne('.information__paging-prev', inflow),
            nextEl: findOne('.information__paging-next', inflow),
        },
        pagination: {
            el: ".main .information__inflow .information__pagination",
            type: "fraction",
        },
        on: {
            slideChange(swiper) {
                detailCarousel.slideToLoop(swiper.realIndex);
                // console.log(swiper.realIndex);
            }
        },
        modules: [Autoplay,Navigation,Pagination],
    });


    //slide list클릭시 해당 list로 detail변경
    const carouselItemLinks = find('.information-list__item', list);

    carouselItemLinks.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            const itemParent = item.parentNode;
            const itemParentDate = itemParent.getAttribute('data-swiper-slide-index');

            detailCarousel.slideToLoop(itemParentDate);
            // listCarousel.slideToLoop(itemParentDate, 0);
        });
    });
}

export {
    main,
    collateralCarousel,
    inflowCarousel,
};