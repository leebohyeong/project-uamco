import {findOne, find, on} from '../helper';
import Tab from "../Tab";
import Swiper, {Autoplay, Controller, EffectFade, Navigation, Pagination} from "swiper";

// 회사소개
const introUamco = () => {

    (() => {
        const introBussiness = findOne('.intro-uamco__bussiness');
        const menus = ['01','02','03','04','05','06','07','08','09'];

        const carousel = new Swiper(findOne('.swiper', introBussiness), {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,

            pagination: {
                el: '.pagination-fraction',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return '0' + number;
                },
                formatFractionTotal: function (number) {
                    return '0' + number;
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
                }
            },

            modules: [Autoplay, Pagination, Controller],
        });

        const carouselProgressbar = new Swiper(findOne('.swiper', introBussiness), {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },

            modules: [Pagination, Controller],
        });

        carousel.controller.control = carouselProgressbar;
    })();

}

//CEO 인사말
const introCeo = () => {
    const intro = findOne('.intro');

    //tab
    (() => {
        const tab = new Tab(findOne('.tab', intro));
        tab.menus[0].click();
    })();

    // swiper
    const introCeo = findOne('.intro-ceo');
    const menus = [
        'CR(기업구조조정) 시장의<br>플랫폼 조성과 촉진 역할',
        '시장 친화적인<br>NPL시장의 Leader',
        '독립적이고<br>건전한 경영환경 확립',
        '열정적 끈기를 지닌<br>탄탄한 전문가 조직'
    ];

    window.onload = () => {
        const carousel = new Swiper(findOne('.intro-ceo__content-swiper-image', introCeo), {
            loop: true,
            autoHeight : true,
            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            modules: [Autoplay, Navigation, Pagination, EffectFade, Controller],
        });

        const carouselText = new Swiper(findOne('.intro-ceo__content-swiper-text', introCeo), {
            loop: true,
            autoHeight : true,
            touchRatio: 0,
            modules: [Controller],
        });

        carousel.controller.control = carouselText;
    }
}

//윤리경영
const introEthicalManagement = () => {
    const introEthicalManagement = findOne('.intro-ethical-management');

    class ReportForm {
        constructor(target) {
            this.target = target;
            this.element = findOne(target);
            this.form = findOne('form', this.element);
            this.reply = find('.reply', this.element);
            this.file = findOne('.file', this.element);
            this.inputFile = findOne('input[type="file"]', this.file);
            this.fileList = findOne('ul', this.file);
            this.privacy = find('.privacy-agree', this.element);
            this.name = findOne('.name', this.element);
            this.emailFirst = findOne('.email-first', this.element);
            this.emailLast = findOne('.email-last', this.element);
            this.emailSelect = findOne('.email-select', this.element);
            this.emailFull = findOne('.email-first', this.element).closest('td').querySelector('input[type="hidden"]');
            this.telTitle = findOne('.tel-title', this.element);
            this.telRow = findOne('.tel-row', this.element);
            this.tel = find('.tel', this.element);
            this.tel1 = this.tel[0];
            this.tel2 = this.tel[1];
            this.tel3 = this.tel[2];
            this.telFull = findOne('.tel-full', this.element);
            this.title = findOne('.report-title-input', this.element);
            this.contents = findOne('.report-contents', this.element);

            this.necessaryStatus = false;
            this.size = 10 * 1024 * 1024;

            this.onEvents();
        }

        reset() {
            this.form.reset();
            this.telTitle.classList.add('hidden');
            this.telRow.classList.add('hidden');
        }

        isFileVaild(file) {
            if (file.size >= this.size) {
                alert('파일 최대 크기는 10MB 입니다.');

                return false;
            }

            if (!/.+\.(pdf|ppt|pptx|xls|xlsx|doc|docx|jpg|png)$/i.test(file.name)) {
                alert('파일 형식을 확인해주세요.');

                return false;
            }

            return true;
        }

        deleteFile() {
            this.inputFile.value = '';
            this.fileList.innerHTML = '';
        }

        isValid() {
            if (!this.name.value.trim().length) {
                alert('이름을 입력하세요.');
                this.name.focus();

                return false;
            }

            if (this.necessaryStatus) {
                if (!/^01[01679]$/.test(this.tel1.value.trim())) {
                    alert('연락처를 입력하세요.');
                    this.tel1.focus();

                    return false;
                }

                if (!/^\d{4}$/.test(this.tel2.value.trim())) {
                    alert('연락처를 입력하세요.');
                    this.tel2.focus();

                    return false;
                }

                if (!/^\d{4}$/.test(this.tel3.value.trim())) {
                    alert('연락처를 입력하세요.');
                    this.tel3.focus();

                    return false;
                }
            }

            if (!this.emailFirst.value.trim().length) {
                alert('이메일 주소를 입력하세요.');
                this.emailFirst.focus();

                return false;
            }

            if (!/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.emailLast.value.trim())) {
                alert('이메일을 정확하게 입력해 주세요.');
                this.emailLast.focus();

                return false;
            }

            if (!this.title.value.trim()) {
                alert('제목을 입력하세요.');
                this.title.focus();

                return false;
            }

            if (!this.contents.value.trim()) {
                alert('내용을 입력하세요.');
                this.contents.focus();

                return false;
            }

            if (!this.privacy[0].checked) {
                alert('개인정보를 위한 이용자 동의 사항에 동의해 주세요.');

                return false;
            }

            return true;
        }

        onEvents() {
            on(this.inputFile, 'change', () => {
                const choiceFile = this.inputFile.files[0];

                if (this.isFileVaild(choiceFile)) {
                    this.fileList.innerHTML = `<li><span>${choiceFile.name}</span><button type="button"><span>삭제</span></button></li>`;
                }
            });

            this.reply.forEach((label, index) => {
                on(label, 'change', () => {
                    this.necessaryStatus = index;
                    this.telTitle.classList[index === 0 ?  'add' : 'remove']('hidden');
                    this.telRow.classList[index === 0 ?  'add' : 'remove']('hidden');

                    carouselText.update();
                });
            });

            on(this.emailSelect, 'change', () => {
                this.emailLast.value = this.emailSelect.value.trim();
            });

            on(this.element, 'click', (event) => {
                if (!!event.target.closest(`.file ul button`)) {
                    this.deleteFile();
                }

                if (!!event.target.closest('button[type="submit"]')) {
                    if (this.isValid()) {
                        if (confirm('제출하시겠습니까?')) {
                            this.emailFull.value = `${this.emailFirst.value.trim()}@${this.emailLast.value.trim()}`;

                            if (this.necessaryStatus) {
                                this.telFull.value = `${this.tel1.value.trim()}-${this.tel2.value.trim()}-${this.tel3.value.trim()}`;
                            }

                            this.form.submit();
                        }
                    }
                }
            });

            on(this.form, 'submit', (event) => {
                event.preventDefault();
            });
        }
    }

    const ethicReportForm = new ReportForm('.report--ethic');
    const improperReportForm = new ReportForm('.report--improper');


    // swiper
    const carousel = new Swiper(findOne('.intro-ethical-management__content-swiper-image', introEthicalManagement), {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        on: {
            slideChange : function() {
                ethicReportForm.reset();
                improperReportForm.reset();
            },
        },

        modules: [Autoplay, Navigation, Pagination, EffectFade, Controller],
    });

    const carouselText = new Swiper(findOne('.intro-ethical-management__content-swiper-text', introEthicalManagement), {
        loop: true,
        autoHeight : true,
        touchRatio: 0,
        modules: [Controller],
    });

    carousel.controller.control = carouselText;


    //main banner 클릭시 윤리경영 해당 탭 이동
    const introCarousel = findOne('.intro-ethical-management__content-swiper');
    const headerHeight = findOne('.site-header').clientHeight;
    const pageUrl = window.location.href;
    const pageId = pageUrl.split('#').reverse()[0];
    const pageNum =  pageId.substr(3,4);


    if(pageId === 'tab' + pageNum) {
        window.scrollTo({
            top: introCarousel.getBoundingClientRect().top - headerHeight,
            behavior: 'smooth'
        });

        carousel.slideTo(pageNum, 1000, false);
    }
};


export {
    introUamco,
    introCeo,
    introEthicalManagement,
}