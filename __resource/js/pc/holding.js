import {findOne, find, on, delegate, getOffset} from '../helper';
import {locationMenu, snsLink} from './common'
import Swiper, {Autoplay, Controller, Pagination} from "swiper";
import axios from 'axios';
import Modal from "../Modal";

const fetchSidoGugun = () => axios.get('/common/v1/address').then(({data: {data}}) => data);
const HoldingSearch = class {
    constructor() {
        this.element = findOne('.holding-search');

        if (!this.element) return;

        this.headerHeight = findOne('.site-header').clientHeight;

        this.form = findOne('.holding-search__form', this.element);
        this.formInputs = [
            ...find('input:not([type="hidden"]), select', this.form),
            ...find('[name$="appraisal_total_amt"]', this.form)
        ];
        this.formDetail = findOne('.holding-search__fieldset--detail', this.form);

        this.initLocaion();
        this.initEvents();
    }

    async initLocaion() {
        this.fieldLocation = findOne('.holding-search__field--location', this.element);
        this.locationSidoGugun = find('.holding-search__input', this.element);

        this.locationSido = this.locationSidoGugun[0];
        this.locationSidoName = this.locationSido.name;
        this.locationSido.removeAttribute('name');

        this.locationGugun = this.locationSidoGugun[1];
        this.locationGugunName = this.locationGugun.name;
        this.locationGugun.removeAttribute('name');
        this.locationGugunOriginOption = this.locationGugun.innerHTML;

        this.locationAddTrigger = findOne('.holding-search__button--add-location', this.fieldLocation);

        this.locationList = findOne('.holding-search__location', this.fieldLocation);
        this.locationAddList = new Set();
        const locationItems = find('.holding-search__location-item', this.locationList);
        const locationItem = locationItems.shift();
        locationItem.remove();
        locationItem.removeAttribute('hidden');
        this.locationItemTemplate = locationItem.outerHTML;

        locationItems.forEach(location => this.locationAddList.add(findOne('.holding-search__location-name', location).textContent));

        const data = await fetchSidoGugun();

        this.locationData = data.reduce((data, item) => {
            data[item.code_name] = item.gugun;
            return data;
        }, {});

        this.createSido(data);
    }

    createSido(sidoGugunData) {
        this.locationSido.insertAdjacentHTML('beforeend', sidoGugunData.map(item => `<option value="${item.code}">${item.code_name}</option>`).join(''));
        this.findSidoOptions();
        this.findGugunOptions();
    }

    findSidoOptions() {
        this.locationSidoOptions = find('option', this.locationSido);
    }

    changeSido() {
        const selectedIndex = this.locationSido.selectedIndex;
        const code = this.locationSidoOptions[selectedIndex].value;
        const location = this.locationSidoOptions[selectedIndex].innerText.trim();
        const data = code && location ? this.locationData[location] : [];
        this.createGugun(data);
    }

    createGugun(gugunData) {
        let options = this.locationGugunOriginOption + gugunData.map(item => `<option value="${item.code}">${item.code_name}</option>`).join('');

        this.locationGugun.innerHTML = options;
        this.findGugunOptions();
    }

    findGugunOptions() {
        this.locationGugunOptions = find('option', this.locationGugun);
    }

    clearGugun(data) {
        this.locationGugun.innerHTML = this.locationGugunOriginOption;
        this.findGugunOptions();
    }

    resetForm() {
        this.toggleDetail('remove');
        this.clearGugun();
        this.clearLocation();

        this.formInputs.forEach(input => {
            const nodeName = input.nodeName.toLowerCase();

            if (nodeName === 'select') {
                input.selectedIndex = 0;
            } else {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            }
        });
    }

    addLocation() {
        if (this.locationAddList.size >= 5) {
            alert('최대 5개까지 선택 가능합니다.');
            return;
        }

        const sidoCode = this.locationSido.value;

        if (!sidoCode) return;

        const sidoName = this.locationSidoOptions[this.locationSido.selectedIndex].innerText;

        const gugunCode = this.locationGugun.value;
        const gugunName = this.locationGugunOptions[this.locationGugun.selectedIndex].innerText;
        const hasGugun = !!(gugunName && gugunCode);

        const location = hasGugun ? `${sidoName} ${gugunName}` : sidoName;

        if (this.locationAddList.has(location)) {
            alert('해당 소재지가 있습니다.');
            return;
        }

        const item = this.locationItemTemplate
            .replace('**name**', hasGugun ? this.locationGugunName : this.locationSidoName)
            .replace('**value**', hasGugun ? gugunCode : sidoCode)
            .replace('**location**', location);

        this.locationList.insertAdjacentHTML('beforeend', item);

        this.locationAddList.add(location);
    }

    removeLocation(event, locationAddList) {
        const target = event.target.closest('.holding-search__location-item');

        if (target) {
            const location = findOne('.holding-search__location-name', target).innerText.trim();

            target.remove();
            locationAddList.delete(location);
        }
    }

    clearLocation() {
        this.locationList.innerHTML = '';
        this.locationAddList.clear();
    }

    toggleDetail(action) {
        const activeClass = 'holding-search__fieldset--open';

        if (action && ['add', 'remove'].includes(action)) {
            this.formDetail.classList[action](activeClass);
        } else {
            this.formDetail.classList.toggle(activeClass);
        }

        if (!this.formDetail.classList.contains(activeClass)) {
            window.scroll({
                top: getOffset(this.element).top - this.headerHeight,
                behavior: 'smooth'
            });
        }
    }

    initEvents() {
        (() => {
            const appraisalPriceInputs = find('.holding-search__field--appraisal-price [type="tel"]');
            const inputs = this.formInputs.filter(input => input.type === 'tel' && !appraisalPriceInputs.includes(input));
            inputs.forEach(input => on(input, 'input', () => {
                input.value = input.value.replace(/\D/g, '');
            }));
        })();

        (() => {
            const appraisalPriceInputs = find('.holding-search__field--appraisal-price input');
            const [start, end, startInput, endInput] = appraisalPriceInputs;
            const inputPrice = (inputUnit, input) => {
                on(inputUnit, 'input', () => {
                    const value = inputUnit.value.replace(/\D/g, '');
                    input.value = value;
                    inputUnit.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                });
            };
            inputPrice(startInput, start);
            inputPrice(endInput, end);
        })();

        (() => {
            const resetTrigger = findOne('.holding-search__button--reset', this.element);

            on(resetTrigger, 'click', this.resetForm.bind(this));
        })();

        (() => {
            const detailTrigger = findOne('.holding-search__button--detail', this.element);

            on(detailTrigger, 'click', this.toggleDetail.bind(this));
        })();

        on(this.locationSido, 'change', this.changeSido.bind(this));
        on(this.locationAddTrigger, 'click', this.addLocation.bind(this));
        delegate(this.locationList, '.holding-search__location-delete', 'click', (event) => this.removeLocation(event, this.locationAddList));
    }
};

const setHoldingDetailsHeight = () => {
    const details = findOne('.holding-view__details');

    if (!details) return;

    on(window, 'message', (event) => {
        const message = event.data;

        if (message && message.scrollHeight) {
            details.style.cssText = `overflow: hidden; height: ${message.scrollHeight}px`;
        }
    });
};

const holdingPrint = () => {
    //프린트
    const holdingView = findOne('.holding-view');
    const print = findOne('.btn-page-print', holdingView);

    on(print, 'click', (event) => {
        event.preventDefault();

        window.open(print.href, 'assetsPrint', "left=30,top=30,width=740,height=500")
    });
}

//담보물건 리스트 페이지
const holdingCollateralList = () => {
    new HoldingSearch();

    locationMenu();
};

//유입물건 리스트 페이지
const holdingInflowList = () => {
    locationMenu();
};

//담보물건 view 페이지
const holdingCollateralView = () => {
    const holdingView = findOne('.holding-view');

    //carousel
    (() => {
        const holdingViewCarousel = findOne('.swiper', holdingView);
        const items = find('.swiper-slide', holdingView);

        if(items.length < 2) {
            holdingViewCarousel.classList.add('active');
            return;
        }

        const carousel = new Swiper(findOne('.swiper', holdingView), {
            // loop: true,
            // speed: 500,
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            slidesPerView: 'auto',
            centeredSlides: true,

            pagination: {
                el: '.swiper__fraction',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return '0' + number;
                },
                formatFractionTotal: function (number) {
                    return '0' + number;
                }
            },

            on: {
                init() {
                    findOne('.swiper__paging', holdingView).hidden = false;
                }
            },

            modules: [Autoplay, Pagination, Controller],
        });

        const carouselProgressbar = new Swiper(findOne('.swiper', holdingView), {
            // loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            pagination: {
                el: ".swiper__pagination",
                type: "progressbar",
            },

            modules: [Pagination, Controller],
        });

        carousel.controller.control = carouselProgressbar;
    })();

    //도움받기
    (() => {
        const button = findOne('.page-view__btn-help', holdingView);
        const modal = new Modal();
        const holdingModal = findOne('.holding-view-modal');

        class ReportForm {
            constructor(target) {
                this.target = target;
                this.element = findOne(target);
                this.form = findOne('form', this.element);
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
                this.title = findOne('.holding-title-input', this.element);
                this.contents = findOne('.holding-contents-textarea', this.element);
                this.keyword = find('.holding-keyword-input', this.element);
                this.keywordAgree = findOne('.keyword-agree', this.element);
                this.onEvents();
            }

            reset() {
                this.form.reset();
                this.telRow.classList.add('hidden');
            }

            isValid() {
                if (!this.name.value.trim().length) {
                    alert('이름을 입력하세요.');
                    this.name.focus();

                    return false;
                }

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
                    alert('개인정보수집 및 이용동의에 동의해 주세요.');

                    return false;
                }

                if (this.keyword[0].value !== "" || this.keyword[1].value !== "" || this.keyword[2].value !== "") {

                    if (!this.keywordAgree.checked) {
                        alert('관심 키워드 메일수신동의에 동의해 주세요.');

                        return false;
                    }

                }

                return true;
            }

            onEvents() {

                on(this.emailSelect, 'change', () => {
                    this.emailLast.value = this.emailSelect.value.trim();
                });

                on(this.form, 'submit', (event) => {
                    event.preventDefault();

                    if (this.isValid()) {

                        this.emailFull.value = `${this.emailFirst.value.trim()}@${this.emailLast.value.trim()}`;

                        this.telFull.value = `${this.tel1.value.trim()}-${this.tel2.value.trim()}-${this.tel3.value.trim()}`;

                        this.form.submit();
                    }
                });
            }

        }

        const holdingForm = new ReportForm('.holding-view-modal');

        button.addEventListener('click', () => {
            holdingForm.reset();

            modal.open(holdingModal);
        });


    })();

    setHoldingDetailsHeight();
    holdingPrint();
    snsLink();
};

//유입물건 view 페이지
const holdingInflowView = () => {
    setHoldingDetailsHeight();
    holdingPrint();
    snsLink();
};

//cr투자회사
const holdingCrInvestment = () => {
    const investment = findOne('.holding-cr-investment');
    const modal = new Modal();
    const triggers = find('.holding-cr-investment__link', investment);
    const getId = trigger => trigger.getAttribute('href');
    const contents = triggers.reduce((contents, trigger) => {
        const id = getId(trigger);
        const content = findOne(id);

        contents[id] = content;

        return contents;
    }, {});

    triggers.forEach((trigger) => {
        on(trigger, 'click', (event) => {
            event.preventDefault();

            const id = getId(trigger);
            const content = contents[id];

            modal.open(content);
        });
    });
}

export {
    holdingPrint,
    holdingCollateralList,
    holdingInflowList,
    holdingCollateralView,
    holdingInflowView,
    holdingCrInvestment
};