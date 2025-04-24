import {findOne, find, on} from '../helper';
import AOS from 'aos';
import Modal from "../Modal";
import Swiper, {Autoplay, EffectFade, Pagination, Navigation} from "swiper";

const makeMenu = (target) => {
    const menu = findOne('.site-header__menu');

    target.innerHTML = menu.innerHTML;
};

const siteMenu = () => {
    if (!!findOne('.all-menu')) {
        const body = findOne('body');
        const siteMenu = findOne('.all-menu');
        const footerSitemap = findOne('.site-footer__sitemap-link');
        const content = findOne('.all-menu__content', siteMenu);
        const siteMenuButton = findOne('.all-menu__button');
        const siteMenuContainer = findOne('.all-menu__container');
        const siteMenuCloseButton = findOne('.all-menu__close-button');

        siteMenuButton.addEventListener('click', (event) => {
            event.preventDefault();
            siteMenuContainer.classList.add('active');
            // body.classList.add('active');
        });

        footerSitemap.addEventListener('click', (event) => {
            event.preventDefault();
            siteMenuContainer.classList.add('active');
        });

        siteMenuCloseButton.addEventListener('click', (event) => {
            event.preventDefault();
            siteMenuContainer.classList.remove('active');
            // body.classList.remove('active');
        });

        makeMenu(content);
    }
};

const siteHeaderInformation = () => {
    if (!!findOne('.information')) {
        //추천자산정보 click event
        (() => {
            const informationButton = findOne('.information-button');
            const informationContent = findOne('.site-header-information');
            const informationClose = findOne('.site-header-information__close');

            on(informationButton, 'click', (event) => {
                event.preventDefault();

                informationContent.classList.add('active');
                informationButton.classList.add('active');
            });

            on(informationClose, 'click', (event) => {
                event.preventDefault();

                informationContent.classList.remove('active');
                informationButton.classList.remove('active');

            });
        })();

        //메인 보유자산정보 복사 붙여넣기
        (() => {
            const headerInformation = findOne('.site-header-information');
            const listCarousel = findOne('.information-list .swiper-wrapper', headerInformation);
            const detailCarousel = findOne('.information-detail .swiper-wrapper', headerInformation);

            detailCarousel.innerHTML = listCarousel.innerHTML;
        })();


        //slide list클릭시 해당 list로 detail변경
        (() => {
            const headerInformation = findOne('.site-header-information');
            const detail = findOne('.information-detail', headerInformation);
            const list = findOne('.information-list', headerInformation);

            const detailCarousel = new Swiper(findOne('.swiper', detail), {
                loop: true,
                effect: 'fade',
                EffectFade: true,
                slidesPerView: 'auto',
                speed: 0,
                simulateTouch: false,
                pagination: {
                    el: ".site-header-information .swiper__pagination",
                    type: "progressbar",
                },
                modules: [Pagination, Navigation, EffectFade],
            });

            const listCarousel = new Swiper(findOne('.swiper', list), {
                loop: true,
                slidesPerView: 'auto',
                speed: 500,
                slideToClickedSlide: true,
                pagination: {
                    el: ".site-header-information .information__pagination",
                    type: "fraction",
                },
                navigation: {
                    prevEl: findOne('.information__paging-prev', headerInformation),
                    nextEl: findOne('.information__paging-next', headerInformation),
                },
                on: {
                    slideChange(swiper) {
                        detailCarousel.slideToLoop(swiper.realIndex);
                    },
                },
                modules: [Autoplay, Pagination, Navigation, EffectFade],
            });

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
        })();
    }
};

const locationMenu = () => {
    const currentPage = location.href.split('?')[0];
    const pageMenu = findOne('.page-menu');
    const pageLinks = find('a', pageMenu);

    pageLinks.forEach(link => {
        if (link.href === currentPage) {
            link.closest('li').classList.add('active');
        }
    });
};

const bankCarousel = () => {
    if (!!findOne('footer')) {
        const footer = findOne('footer');

        const carousel = new Swiper(findOne('.swiper', footer), {
            loop: 'true',
            slidesPerView: 8,
            // touchRatio: 0,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },

            modules: [Autoplay],
        });
    }
};

const siteTop = () => {
    if (!!findOne('.site-top')) {
        const siteTop = findOne('.site-top');
        const button = findOne('.site-top__button', siteTop);
        const buttonActive = 'site-top__button--active';
        const buttonPause = 'site-top__button--pause';
        const footer = findOne('.site-footer');

        const blinkButton = () => {
            if (findOne('body').getBoundingClientRect().top) {
                button.classList.add(buttonActive);
            } else {
                button.classList.remove(buttonActive);
            }
        }

        const checkPlay = () => {
            if (!!(parseInt((footer.getBoundingClientRect().top - window.innerHeight) + button.clientHeight) <= 0)) {
                button.classList.add(buttonPause);
            } else {
                button.classList.remove(buttonPause);
            }
        }

        const pageTop = (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        blinkButton();
        checkPlay();

        on(window, 'scroll', () => {
            blinkButton();
            checkPlay();
        });

        on(button, 'click', (event) => {
            pageTop(event);
        })
    }
};

const processing = () => {
    if (!!findOne('.site-footer')) {
        const footer = findOne('.site-footer');
        const modal = new Modal();
        const personalLink = findOne('.personal-information-link', footer);
        const imagelLink = findOne('.image-information-link', footer);
        //const processing = findOne('.modal--processing');
        const personalModal = findOne('.modal-personal-information');
        const imagelModal = findOne('.modal-image-information');

        on(personalLink, 'click', (event) => {
            event.preventDefault(event);

            modal.open(personalModal);
        });

        on(imagelLink, 'click', (event) => {
            event.preventDefault(event);

            modal.open(imagelModal);
        });
    }
};

const scrollMotion = () => {
    window.AOS = AOS;

    AOS.init({
        once: true,
    });
    on(window, 'load', () => AOS.refresh());
};

const snsLink = () => {
    const btnFacebook = findOne('.btn-facebook');
    const btnTwitter = findOne('.btn-twitter');
    const shareUrl = findOne('[property="og:url"]').getAttribute('content');
    const shareTitle = findOne('[property="og:title"]').getAttribute('content');
    const shareDescription = findOne('[property="og:description"]').getAttribute('content');
    const shareImage = findOne('[property="og:image"]').getAttribute('content');

    //페이스북
    function shareFacebook() {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl), "_blank", "width=600,height=400");
    }

    //트위터
    function shareTwitter() {
        const encodeText = encodeURIComponent(shareTitle + ' ' + shareDescription);
        const encodeUrl = encodeURIComponent(shareUrl)
        window.open("https://twitter.com/intent/tweet?text=" + encodeText + "&url=" + encodeUrl, 'width=600, height=400, scrollbars=yes');
    }

    on(btnFacebook, 'click', (event) => {
        event.preventDefault();
        shareFacebook();
    });

    on(btnTwitter, 'click', (event) => {
        event.preventDefault();
        shareTwitter();
    });

    //주소복사
    (() => {
        function copyText(nowUrl) {
            // clipboard API 사용
            if (navigator.clipboard !== undefined) {
                navigator.clipboard
                    .writeText(nowUrl)
                    .then(() => {
                        alert('URL이 복사되었습니다.');
                    });
            } else {
                // execCommand 사용
                const textArea = document.createElement('textarea');
                textArea.value = nowUrl;
                document.body.appendChild(textArea);
                textArea.select();
                textArea.setSelectionRange(0, 99999);
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('복사 실패', err);
                }
                textArea.setSelectionRange(0, 0);
                document.body.removeChild(textArea);
                alert('URL이 복사되었습니다.');
            }
        };

        const copyUrl = findOne('.btn-copy-url');
        let nowUrl = window.location.href;


        on(copyUrl, 'click', (event) => {
            event.preventDefault();

            copyText(nowUrl);
        });

    })();

};

export {
    siteMenu,
    siteHeaderInformation,
    locationMenu,
    bankCarousel,
    siteTop,
    processing,
    scrollMotion,
    snsLink,
};