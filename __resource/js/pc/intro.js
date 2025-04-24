import {findOne, find, on} from '../helper';
import Tab from "../Tab";
import Swiper, {Autoplay, Controller, EffectFade, Pagination} from "swiper";

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
    // const carousel = findOne('.swiper', introCeo);
    const menus = [
        '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'CR시장역할\'})">CR(기업구조조정) 시장의<br>플랫폼 조성과 촉진 역할</a>',
        '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'NPL리더\'})">시장 친화적인<br>NPL시장의 Leader</a>',
        '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'경영환경확립\'})">독립적이고<br>건전한 경영환경 확립</a>',
        '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'탄탄한 전문가 조직\'})">열정적 끈기를 지닌<br>탄탄한 전문가 조직</a>'
    ];

    // const titles = find('p', carousel);
    // const menus = titles.map((title) => title.innerHTML.trim());

    const carousel = new Swiper(findOne('.intro-ceo__content-swiper-image', introCeo), {
            // autoHeight: true,
            loop: true,

            autoplay: {
                delay: 20000,
                disableOnInteraction: false,
            },

            pagination: {
                el: '.swiper__menu',
                clickable: true,
                type: 'bullets',
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

            modules: [Autoplay, Pagination, EffectFade, Controller],
        }
    );

    const carouselText = new Swiper(findOne('.intro-ceo__content-swiper-text', introCeo), {
        loop: true,
        modules: [Controller],
        simulateTouch: false,
    });

    carousel.controller.control = carouselText;


}

//윤리경영
const introEthicalManagement = () => {
    const intro = findOne('.intro');

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
                    this.necessaryStatus = !!index ? true : false;
                    this.telRow.classList[index === 0 ?  'add' : 'remove']('hidden');
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

    //tab
    (() => {
        const ethicReportForm = new ReportForm('.report--ethic');
        const improperReportForm = new ReportForm('.report--improper');

        const tab = new Tab(findOne('.tab', intro), () => {
            ethicReportForm.reset();
            improperReportForm.reset();
        });
        tab.menus[0].click();
    })();

    //배경이미지 변경
    (()=> {
        const tabNav = findOne('.tab__nav', intro);
        const tabItems = find('.tab__menu', intro);

        tabItems.forEach((tabItem, index) => {
            on(tabItem, 'click', ()=>{
                tabNav.style.backgroundImage = `url(/assets/images/intro/ethical-management/img_ethical_con1_${index + 1}.jpg)`
            });
        })
    })();

    //main banner 클릭시 윤리경영 해당 탭 이동
    (()=> {
        const headerHeight = findOne('.site-header').clientHeight;
        const pageUrl = window.location.href;
        const pageId = pageUrl.split('#').reverse()[0];
        const pageNum =  pageId.substr(3,4);

        if(pageId === 'tab' + pageNum) {
            window.scrollTo({
                top: intro.getBoundingClientRect().top - headerHeight,
                behavior: 'smooth'
            });

            document.querySelector('.tab__menu').classList.remove('tab__menu--active');
            document.querySelector('.tab__menu' + pageNum).classList.add('tab__menu--active');
            document.querySelector('.tab__panel').classList.remove('tab__panel--active');
            document.querySelector('.tab__panel').classList.remove('tab__panel--in');
            document.querySelector('.tab__panel' + pageNum).classList.add('tab__panel--active');
            document.querySelector('.tab__panel' + pageNum).classList.add('tab__panel--in');
        }
    })();
};


export {
    introCeo,
    introEthicalManagement,
}