import {findOne, find, on} from '../helper';
import AOS from 'aos';
import Modal from "../Modal";
import Swiper, {Autoplay, Pagination, Navigation, Controller} from "swiper";

const siteMenu = () => {
    if (!!findOne('.site-header')) {
        const body = findOne('body');
        const siteHeader = findOne('.site-header');
        const siteButton = findOne('.site-header__button', siteHeader);
        const siteButtonClose = findOne('.site-header__menu-service-header button', siteHeader);
        const footerSitemap = findOne('.site-footer__sitemap-link');
        const toggleClass = 'site-menu-open';

        (() => {
            //accordion
            const menuLists = find('.site-menu__item');
            const menuItems = find('.site-menu__name');
            const toggleClassActive = 'active';

            const closeMenus = (clickIndex) => {
                menuLists.forEach((menuList, index) => {
                    if (clickIndex !== index) {
                        menuList.classList.remove(toggleClassActive);
                    }
                });
            };

            menuItems.forEach((menuItem, index) => {
                menuItem.addEventListener('click', (event) => {
                    event.preventDefault();

                    const target = menuLists[index];

                    closeMenus(index);
                    target.classList[target.classList.contains(toggleClassActive) ? 'remove' : 'add'](toggleClassActive);
                });
            });
        })();

        const onEvent = () => {
            siteButton.addEventListener('click', (event) => {
                event.preventDefault();

                if(body.classList.contains(toggleClass)) {
                    body.classList.remove(toggleClass);
                } else {
                    body.classList.add(toggleClass);
                }
            });

            footerSitemap.addEventListener('click', (event) => {
                event.preventDefault();

                if(body.classList.contains(toggleClass)) {
                    body.classList.remove(toggleClass);
                } else {
                    body.classList.add(toggleClass);
                }
            });
        };

        const offEvent = () => {
            siteButtonClose.addEventListener('click', (event) => {
                event.preventDefault();

                body.classList.remove(toggleClass);
            });
        }

        onEvent();
        offEvent();
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
            }
            else {
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

const siteHeaderInformation = () => {
    if (!!findOne('.site-header-information')) {
        const siteHeader = findOne('.site-header');
        const informationCarousel = findOne('.information__carousel', siteHeader);

        //추천자산정보 click event
        (() => {
            const button = findOne('.site-header__information-button', siteHeader);
            const information = findOne('.site-header-information', siteHeader);
            const closeButton = findOne('.site-header-information__close', siteHeader);
            const toggleClass = 'active';

            on(button, 'click', () => {
                information.classList.add(toggleClass);
            });

            on(closeButton, 'click', () => {
                information.classList.remove(toggleClass);
            })

        })();

        (() => {
            const pagination = findOne('.information__pagination', informationCarousel);
            const swiperSlidesSize = find('.swiper-slide', informationCarousel).length;


            const carousel = new Swiper(findOne('.swiper', informationCarousel), {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 55,
                pagination: {
                    el: ".information__progressbar",
                    type: "progressbar",
                },

                navigation: {
                    prevEl: findOne('.carousel-paging__prev', informationCarousel),
                    nextEl: findOne('.carousel-paging__next', informationCarousel),
                },

                on: {
                    slideChange(swiper) {
                        pagination.innerHTML = `<span class="swiper-pagination-current">${swiper.realIndex + 1}</span> / <span>${swiperSlidesSize}</span>`
                    }
                },

                modules: [Autoplay, Pagination, Navigation, Controller],
            });

        })();
    }
}

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
            slidesPerView: 'auto',
            spaceBetween: 30,
            // touchRatio: 0,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            modules: [Autoplay],
        });
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
    siteTop,
    siteMenu,
    siteHeaderInformation,
    locationMenu,
    bankCarousel,
    processing,
    scrollMotion,
    snsLink,
}