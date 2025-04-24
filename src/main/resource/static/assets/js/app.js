/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/DropdownSelect.js":
/*!******************************!*\
  !*** ./js/DropdownSelect.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DropdownSelect = class {
  constructor(target) {
    this.select = typeof target === 'string' ? document.querySelector(`${target}`) : target;
    this.selectActive = 'dropdown--active';
    this.result = document.querySelector('.dropdown__result');
    this.control = this.select.querySelector('.dropdown__control');
    this.controlHeight = this.control.clientHeight;
    this.title = this.select.querySelector('.dropdown__title');
    this.container = this.select.querySelector('.dropdown__container');
    this.list = this.select.querySelector('.dropdown__list');
    this.items = Array.from(this.select.querySelectorAll('.dropdown__item'));
    this.buttons = Array.from(this.select.querySelectorAll('.dropdown__button'));
    this.name = '.dropdown__name';
    this.duration = (this.items.length * 0.2).toFixed(1);
    this.init();
    this.onEvents();
  }
  init() {
    this.container.style.transitionDuration = `${this.duration}s`;
  }
  toggle() {
    const isToggle = this.select.classList.contains(`${this.selectActive}`);
    const isClassListMethod = isToggle ? 'remove' : 'add';
    this.select.classList[isClassListMethod](`${this.selectActive}`);
    this.container.style.height = `${isToggle ? this.controlHeight : this.control.clientHeight + this.list.clientHeight}px`;
  }
  close() {
    this.select.classList.remove(`${this.selectActive}`);
    this.container.style.height = `${this.controlHeight}px`;
  }
  onEvents() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.title.textContent = button.querySelector(`${this.name}`).textContent;
        this.result.value = button.value;
      });
    });
    document.addEventListener('click', event => {
      if (!!event.target.closest('.dropdown')) {
        this.toggle();
        return;
      }
      this.close();
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DropdownSelect);

/***/ }),

/***/ "./js/Modal.js":
/*!*********************!*\
  !*** ./js/Modal.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./js/helper.js");

const CLASS_NAME_BODY_OPEN = 'modal-open';
const CLASS_NAME_OPEN = 'modal--open';
const CLASS_NAME_FADE = 'modal--fade';
const Modal = class {
  constructor() {
    this.body = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('body');
    this.modals = [];
    this.onEvent();
  }
  open(target) {
    if (!this.modals.length) {
      this.body.classList.add(CLASS_NAME_BODY_OPEN);
    }
    this.modals.push(target);
    target.classList.add(CLASS_NAME_OPEN);
    setTimeout(() => target.classList.add(CLASS_NAME_FADE), 0);
    return this;
  }
  close(targetModal) {
    let index = this.modals.length - 1;
    if (targetModal) {
      index = this.modals.indexOf(targetModal);
      if (index === -1) {
        index = 0;
      }
    }
    const target = this.modals.splice(index, 1)[0];
    if (!target) return;
    target.classList.remove(CLASS_NAME_FADE, CLASS_NAME_OPEN);
    if (!this.modals.length) {
      this.body.classList.remove(CLASS_NAME_BODY_OPEN);
    }
  }
  onClose(event) {
    const close = event.target.closest('.modal__close');
    if (close) {
      if (close.tagName === 'A') event.preventDefault();
      this.close();
    }
  }
  onEvent() {
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.body, 'click', this.onClose.bind(this), false);
  }
  get scrollWidth() {
    return Math.abs(window.innerWidth - document.documentElement.clientWidth);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./js/Tab.js":
/*!*******************!*\
  !*** ./js/Tab.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./js/helper.js");

const Tab = class {
  constructor(element, callback) {
    this.element = element;
    this.items = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.tab__item', this.element);
    this.menus = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.tab__menu', this.element);
    this.panels = this.menus.map(menu => {
      const panelId = menu.getAttribute('aria-controls');
      const panel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)(`#${panelId}`);
      return panel;
    });
    this.current = 0;
    this.panelTimer = null;
    this.callback = callback;
    this.initEvents();
  }
  toggleTab() {
    this.menus.forEach((menu, index) => {
      if (this.current === index) {
        menu.classList.add('tab__menu--active');
        menu.setAttribute('aria-selected', true);
      } else {
        menu.classList.remove('tab__menu--active');
        menu.setAttribute('aria-selected', false);
      }
    });
    this.items.forEach((item, index) => {
      if (this.current === index) {
        item.classList.add('tab__item--active');
      } else {
        item.classList.remove('tab__item--active');
      }
    });
  }
  togglePanel() {
    this.panels.forEach((panel, index) => {
      if (this.current === index) {
        panel.classList.add('tab__panel--in');
        this.panelTimer && clearTimeout(this.panelTimer);
        this.panelTimer = setTimeout(() => panel.classList.add('tab__panel--active'), 13);
        const aosElements = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.aos-init', panel);
        if (aosElements.length) {
          aosElements.forEach(element => {
            element.classList.remove('aos-animate');
            setTimeout(() => {
              element.classList.add('aos-animate');
            }, 0);
          });
        }
      } else {
        panel.classList.remove('tab__panel--in', 'tab__panel--active');
      }
    });
  }
  toggle() {
    this.toggleTab();
    this.togglePanel();
  }
  initEvents() {
    this.menus.forEach((menu, index) => {
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(menu, 'click', event => {
        event.preventDefault();
        this.current = index;
        this.toggle();
        this.callback && this.callback();
      });
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Tab);

/***/ }),

/***/ "./js/helper.js":
/*!**********************!*\
  !*** ./js/helper.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "delegate": function() { return /* binding */ delegate; },
/* harmony export */   "find": function() { return /* binding */ find; },
/* harmony export */   "findOne": function() { return /* binding */ findOne; },
/* harmony export */   "getOffset": function() { return /* binding */ getOffset; },
/* harmony export */   "off": function() { return /* binding */ off; },
/* harmony export */   "on": function() { return /* binding */ on; }
/* harmony export */ });
const findOne = function (selector) {
  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return context.querySelector(selector);
};
const find = function (selector) {
  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return [...context.querySelectorAll(selector)];
};
const on = function (target, type, callback) {
  let capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!target || !target.addEventListener) return;
  target.addEventListener(type, callback, capture);
};
const off = (target, type, callback) => target.removeEventListener(type, callback);
const delegate = (target, selector, type, handler, capture) => {
  const dispatchEvent = event => {
    const targetElement = event.target;
    const potentialElements = targetElement.closest(selector);
    if (potentialElements) {
      handler.call(potentialElements, event);
    }
  };
  on(target, type, dispatchEvent, !!capture);
};
const getOffset = element => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
};
const debounce = function (func) {
  let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  let inDebounce;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    inDebounce && clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), wait);
  };
};

/***/ }),

/***/ "./js/pc/app.js":
/*!**********************!*\
  !*** ./js/pc/app.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hwaly_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hwaly-app */ "./node_modules/hwaly-app/src/App.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./js/pc/common.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ "./js/pc/main.js");
/* harmony import */ var _intro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intro */ "./js/pc/intro.js");
/* harmony import */ var _holding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./holding */ "./js/pc/holding.js");
/* harmony import */ var _business__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./business */ "./js/pc/business.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news */ "./js/pc/news.js");
/* harmony import */ var _recruit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recruit */ "./js/pc/recruit.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./window */ "./js/pc/window.js");









const app = new hwaly_app__WEBPACK_IMPORTED_MODULE_0__["default"]();

//함수추가
app.add({
  siteMenu: _common__WEBPACK_IMPORTED_MODULE_1__.siteMenu,
  siteHeaderInformation: _common__WEBPACK_IMPORTED_MODULE_1__.siteHeaderInformation,
  siteTop: _common__WEBPACK_IMPORTED_MODULE_1__.siteTop,
  bankCarousel: _common__WEBPACK_IMPORTED_MODULE_1__.bankCarousel,
  processing: _common__WEBPACK_IMPORTED_MODULE_1__.processing,
  scrollMotion: _common__WEBPACK_IMPORTED_MODULE_1__.scrollMotion,
  main: _main__WEBPACK_IMPORTED_MODULE_2__.main,
  windowPopup: _window__WEBPACK_IMPORTED_MODULE_8__["default"],
  introCeo: _intro__WEBPACK_IMPORTED_MODULE_3__.introCeo,
  introEthicalManagement: _intro__WEBPACK_IMPORTED_MODULE_3__.introEthicalManagement,
  business: _business__WEBPACK_IMPORTED_MODULE_5__.business,
  holdingCollateralList: _holding__WEBPACK_IMPORTED_MODULE_4__.holdingCollateralList,
  holdingInflowList: _holding__WEBPACK_IMPORTED_MODULE_4__.holdingInflowList,
  holdingCollateralView: _holding__WEBPACK_IMPORTED_MODULE_4__.holdingCollateralView,
  holdingInflowView: _holding__WEBPACK_IMPORTED_MODULE_4__.holdingInflowView,
  holdingCrInvestment: _holding__WEBPACK_IMPORTED_MODULE_4__.holdingCrInvestment,
  newsNoticeList: _news__WEBPACK_IMPORTED_MODULE_6__.newsNoticeList,
  newsNoticeView: _news__WEBPACK_IMPORTED_MODULE_6__.newsNoticeView,
  newsCompanyNewsList: _news__WEBPACK_IMPORTED_MODULE_6__.newsCompanyNewsList,
  newsCompanyNewsView: _news__WEBPACK_IMPORTED_MODULE_6__.newsCompanyNewsView,
  newsIndustryNewsList: _news__WEBPACK_IMPORTED_MODULE_6__.newsIndustryNewsList,
  newsIndustryNewsView: _news__WEBPACK_IMPORTED_MODULE_6__.newsIndustryNewsView,
  recruitList: _recruit__WEBPACK_IMPORTED_MODULE_7__.recruitList,
  recruitView: _recruit__WEBPACK_IMPORTED_MODULE_7__.recruitView
});

//전페이지에서 활성화할거
app.auto('siteTop', 'siteHeaderInformation', 'siteMenu', 'bankCarousel', 'processing', 'scrollMotion');
app.readyAndRun();

/***/ }),

/***/ "./js/pc/business.js":
/*!***************************!*\
  !*** ./js/pc/business.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "business": function() { return /* binding */ business; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tab */ "./js/Tab.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modal */ "./js/Modal.js");



const business = () => {
  const business = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.business');

  //tab
  (() => {
    const params = new URLSearchParams(location.search);
    const tab = new _Tab__WEBPACK_IMPORTED_MODULE_1__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tab', business));
    if (!!params.get('tab')) {
      console.log(params.get('tab'));
      tab.menus[params.get('tab') * 1 - 1].click();
    } else {
      tab.menus[0].click();
    }
  })();
};


/***/ }),

/***/ "./js/pc/common.js":
/*!*************************!*\
  !*** ./js/pc/common.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bankCarousel": function() { return /* binding */ bankCarousel; },
/* harmony export */   "locationMenu": function() { return /* binding */ locationMenu; },
/* harmony export */   "processing": function() { return /* binding */ processing; },
/* harmony export */   "scrollMotion": function() { return /* binding */ scrollMotion; },
/* harmony export */   "siteHeaderInformation": function() { return /* binding */ siteHeaderInformation; },
/* harmony export */   "siteMenu": function() { return /* binding */ siteMenu; },
/* harmony export */   "siteTop": function() { return /* binding */ siteTop; },
/* harmony export */   "snsLink": function() { return /* binding */ snsLink; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modal */ "./js/Modal.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");




const makeMenu = target => {
  const menu = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header__menu');
  target.innerHTML = menu.innerHTML;
};
const siteMenu = () => {
  if (!!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu')) {
    const body = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('body');
    const siteMenu = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu');
    const footerSitemap = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-footer__sitemap-link');
    const content = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu__content', siteMenu);
    const siteMenuButton = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu__button');
    const siteMenuContainer = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu__container');
    const siteMenuCloseButton = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.all-menu__close-button');
    siteMenuButton.addEventListener('click', event => {
      event.preventDefault();
      siteMenuContainer.classList.add('active');
      // body.classList.add('active');
    });

    footerSitemap.addEventListener('click', event => {
      event.preventDefault();
      siteMenuContainer.classList.add('active');
    });
    siteMenuCloseButton.addEventListener('click', event => {
      event.preventDefault();
      siteMenuContainer.classList.remove('active');
      // body.classList.remove('active');
    });

    makeMenu(content);
  }
};
const siteHeaderInformation = () => {
  if (!!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information')) {
    //추천자산정보 click event
    (() => {
      const informationButton = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-button');
      const informationContent = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header-information');
      const informationClose = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header-information__close');
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(informationButton, 'click', event => {
        event.preventDefault();
        informationContent.classList.add('active');
        informationButton.classList.add('active');
      });
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(informationClose, 'click', event => {
        event.preventDefault();
        informationContent.classList.remove('active');
        informationButton.classList.remove('active');
      });
    })();

    //메인 보유자산정보 복사 붙여넣기
    (() => {
      const headerInformation = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header-information');
      const listCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-list .swiper-wrapper', headerInformation);
      const detailCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-detail .swiper-wrapper', headerInformation);
      detailCarousel.innerHTML = listCarousel.innerHTML;
    })();

    //slide list클릭시 해당 list로 detail변경
    (() => {
      const headerInformation = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header-information');
      const detail = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-detail', headerInformation);
      const list = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-list', headerInformation);
      const detailCarousel = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', detail), {
        loop: true,
        effect: 'fade',
        EffectFade: true,
        slidesPerView: 'auto',
        speed: 0,
        simulateTouch: false,
        pagination: {
          el: ".site-header-information .swiper__pagination",
          type: "progressbar"
        },
        modules: [swiper__WEBPACK_IMPORTED_MODULE_3__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_3__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_3__.EffectFade]
      });
      const listCarousel = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', list), {
        loop: true,
        slidesPerView: 'auto',
        speed: 500,
        slideToClickedSlide: true,
        pagination: {
          el: ".site-header-information .information__pagination",
          type: "fraction"
        },
        navigation: {
          prevEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-prev', headerInformation),
          nextEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-next', headerInformation)
        },
        on: {
          slideChange(swiper) {
            detailCarousel.slideToLoop(swiper.realIndex);
          }
        },
        modules: [swiper__WEBPACK_IMPORTED_MODULE_3__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_3__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_3__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_3__.EffectFade]
      });
      const carouselItemLinks = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.information-list__item', list);
      carouselItemLinks.forEach(item => {
        item.addEventListener('click', event => {
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
  const pageMenu = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.page-menu');
  const pageLinks = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('a', pageMenu);
  pageLinks.forEach(link => {
    if (link.href === currentPage) {
      link.closest('li').classList.add('active');
    }
  });
};
const bankCarousel = () => {
  if (!!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('footer')) {
    const footer = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('footer');
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', footer), {
      loop: 'true',
      slidesPerView: 8,
      // touchRatio: 0,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_3__.Autoplay]
    });
  }
};
const siteTop = () => {
  if (!!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-top')) {
    const siteTop = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-top');
    const button = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-top__button', siteTop);
    const buttonActive = 'site-top__button--active';
    const buttonPause = 'site-top__button--pause';
    const footer = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-footer');
    const blinkButton = () => {
      if ((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('body').getBoundingClientRect().top) {
        button.classList.add(buttonActive);
      } else {
        button.classList.remove(buttonActive);
      }
    };
    const checkPlay = () => {
      if (!!(parseInt(footer.getBoundingClientRect().top - window.innerHeight + button.clientHeight) <= 0)) {
        button.classList.add(buttonPause);
      } else {
        button.classList.remove(buttonPause);
      }
    };
    const pageTop = event => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    blinkButton();
    checkPlay();
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(window, 'scroll', () => {
      blinkButton();
      checkPlay();
    });
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(button, 'click', event => {
      pageTop(event);
    });
  }
};
const processing = () => {
  if (!!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-footer')) {
    const footer = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-footer');
    const modal = new _Modal__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const personalLink = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.personal-information-link', footer);
    const imagelLink = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.image-information-link', footer);
    //const processing = findOne('.modal--processing');
    const personalModal = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.modal-personal-information');
    const imagelModal = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.modal-image-information');
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(personalLink, 'click', event => {
      event.preventDefault(event);
      modal.open(personalModal);
    });
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(imagelLink, 'click', event => {
      event.preventDefault(event);
      modal.open(imagelModal);
    });
  }
};
const scrollMotion = () => {
  window.AOS = (aos__WEBPACK_IMPORTED_MODULE_1___default());
  aos__WEBPACK_IMPORTED_MODULE_1___default().init({
    once: true
  });
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(window, 'load', () => aos__WEBPACK_IMPORTED_MODULE_1___default().refresh());
};
const snsLink = () => {
  const btnFacebook = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.btn-facebook');
  const btnTwitter = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.btn-twitter');
  const shareUrl = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('[property="og:url"]').getAttribute('content');
  const shareTitle = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('[property="og:title"]').getAttribute('content');
  const shareDescription = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('[property="og:description"]').getAttribute('content');
  const shareImage = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('[property="og:image"]').getAttribute('content');

  //페이스북
  function shareFacebook() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl), "_blank", "width=600,height=400");
  }

  //트위터
  function shareTwitter() {
    const encodeText = encodeURIComponent(shareTitle + ' ' + shareDescription);
    const encodeUrl = encodeURIComponent(shareUrl);
    window.open("https://twitter.com/intent/tweet?text=" + encodeText + "&url=" + encodeUrl, 'width=600, height=400, scrollbars=yes');
  }
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(btnFacebook, 'click', event => {
    event.preventDefault();
    shareFacebook();
  });
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(btnTwitter, 'click', event => {
    event.preventDefault();
    shareTwitter();
  });

  //주소복사
  (() => {
    function copyText(nowUrl) {
      // clipboard API 사용
      if (navigator.clipboard !== undefined) {
        navigator.clipboard.writeText(nowUrl).then(() => {
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
    }
    ;
    const copyUrl = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.btn-copy-url');
    let nowUrl = window.location.href;
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(copyUrl, 'click', event => {
      event.preventDefault();
      copyText(nowUrl);
    });
  })();
};


/***/ }),

/***/ "./js/pc/holding.js":
/*!**************************!*\
  !*** ./js/pc/holding.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "holdingCollateralList": function() { return /* binding */ holdingCollateralList; },
/* harmony export */   "holdingCollateralView": function() { return /* binding */ holdingCollateralView; },
/* harmony export */   "holdingCrInvestment": function() { return /* binding */ holdingCrInvestment; },
/* harmony export */   "holdingInflowList": function() { return /* binding */ holdingInflowList; },
/* harmony export */   "holdingInflowView": function() { return /* binding */ holdingInflowView; },
/* harmony export */   "holdingPrint": function() { return /* binding */ holdingPrint; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./js/pc/common.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modal */ "./js/Modal.js");





const fetchSidoGugun = () => axios__WEBPACK_IMPORTED_MODULE_4__["default"].get('/common/v1/address').then(_ref => {
  let {
    data: {
      data
    }
  } = _ref;
  return data;
});
const HoldingSearch = class {
  constructor() {
    this.element = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search');
    if (!this.element) return;
    this.headerHeight = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header').clientHeight;
    this.form = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__form', this.element);
    this.formInputs = [...(0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('input:not([type="hidden"]), select', this.form), ...(0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('[name$="appraisal_total_amt"]', this.form)];
    this.formDetail = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__fieldset--detail', this.form);
    this.initLocaion();
    this.initEvents();
  }
  async initLocaion() {
    this.fieldLocation = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__field--location', this.element);
    this.locationSidoGugun = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-search__input', this.element);
    this.locationSido = this.locationSidoGugun[0];
    this.locationSidoName = this.locationSido.name;
    this.locationSido.removeAttribute('name');
    this.locationGugun = this.locationSidoGugun[1];
    this.locationGugunName = this.locationGugun.name;
    this.locationGugun.removeAttribute('name');
    this.locationGugunOriginOption = this.locationGugun.innerHTML;
    this.locationAddTrigger = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__button--add-location', this.fieldLocation);
    this.locationList = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__location', this.fieldLocation);
    this.locationAddList = new Set();
    const locationItems = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-search__location-item', this.locationList);
    const locationItem = locationItems.shift();
    locationItem.remove();
    locationItem.removeAttribute('hidden');
    this.locationItemTemplate = locationItem.outerHTML;
    locationItems.forEach(location => this.locationAddList.add((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__location-name', location).textContent));
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
    this.locationSidoOptions = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('option', this.locationSido);
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
    this.locationGugunOptions = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('option', this.locationGugun);
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
    const item = this.locationItemTemplate.replace('**name**', hasGugun ? this.locationGugunName : this.locationSidoName).replace('**value**', hasGugun ? gugunCode : sidoCode).replace('**location**', location);
    this.locationList.insertAdjacentHTML('beforeend', item);
    this.locationAddList.add(location);
  }
  removeLocation(event, locationAddList) {
    const target = event.target.closest('.holding-search__location-item');
    if (target) {
      const location = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__location-name', target).innerText.trim();
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
        top: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getOffset)(this.element).top - this.headerHeight,
        behavior: 'smooth'
      });
    }
  }
  initEvents() {
    (() => {
      const appraisalPriceInputs = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-search__field--appraisal-price [type="tel"]');
      const inputs = this.formInputs.filter(input => input.type === 'tel' && !appraisalPriceInputs.includes(input));
      inputs.forEach(input => (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(input, 'input', () => {
        input.value = input.value.replace(/\D/g, '');
      }));
    })();
    (() => {
      const appraisalPriceInputs = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-search__field--appraisal-price input');
      const [start, end, startInput, endInput] = appraisalPriceInputs;
      const inputPrice = (inputUnit, input) => {
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(inputUnit, 'input', () => {
          const value = inputUnit.value.replace(/\D/g, '');
          input.value = value;
          inputUnit.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });
      };
      inputPrice(startInput, start);
      inputPrice(endInput, end);
    })();
    (() => {
      const resetTrigger = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__button--reset', this.element);
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(resetTrigger, 'click', this.resetForm.bind(this));
    })();
    (() => {
      const detailTrigger = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-search__button--detail', this.element);
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(detailTrigger, 'click', this.toggleDetail.bind(this));
    })();
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.locationSido, 'change', this.changeSido.bind(this));
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.locationAddTrigger, 'click', this.addLocation.bind(this));
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.delegate)(this.locationList, '.holding-search__location-delete', 'click', event => this.removeLocation(event, this.locationAddList));
  }
};
const setHoldingDetailsHeight = () => {
  const details = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-view__details');
  if (!details) return;
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(window, 'message', event => {
    const message = event.data;
    if (message && message.scrollHeight) {
      details.style.cssText = `overflow: hidden; height: ${message.scrollHeight}px`;
    }
  });
};
const holdingPrint = () => {
  //프린트
  const holdingView = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-view');
  const print = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.btn-page-print', holdingView);
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(print, 'click', event => {
    event.preventDefault();
    window.open(print.href, 'assetsPrint', "left=30,top=30,width=740,height=500");
  });
};

//담보물건 리스트 페이지
const holdingCollateralList = () => {
  new HoldingSearch();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.locationMenu)();
};

//유입물건 리스트 페이지
const holdingInflowList = () => {
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.locationMenu)();
};

//담보물건 view 페이지
const holdingCollateralView = () => {
  const holdingView = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-view');

  //carousel
  (() => {
    const holdingViewCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', holdingView);
    const items = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.swiper-slide', holdingView);
    if (items.length < 2) {
      holdingViewCarousel.classList.add('active');
      return;
    }
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', holdingView), {
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
          (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper__paging', holdingView).hidden = false;
        }
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_2__.Controller]
    });
    const carouselProgressbar = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', holdingView), {
      // loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: ".swiper__pagination",
        type: "progressbar"
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_2__.Controller]
    });
    carousel.controller.control = carouselProgressbar;
  })();

  //도움받기
  (() => {
    const button = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.page-view__btn-help', holdingView);
    const modal = new _Modal__WEBPACK_IMPORTED_MODULE_3__["default"]();
    const holdingModal = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-view-modal');
    class ReportForm {
      constructor(target) {
        this.target = target;
        this.element = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)(target);
        this.form = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('form', this.element);
        this.privacy = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.privacy-agree', this.element);
        this.name = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.name', this.element);
        this.emailFirst = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-first', this.element);
        this.emailLast = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-last', this.element);
        this.emailSelect = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-select', this.element);
        this.emailFull = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-first', this.element).closest('td').querySelector('input[type="hidden"]');
        this.telRow = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tel-row', this.element);
        this.tel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.tel', this.element);
        this.tel1 = this.tel[0];
        this.tel2 = this.tel[1];
        this.tel3 = this.tel[2];
        this.telFull = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tel-full', this.element);
        this.title = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-title-input', this.element);
        this.contents = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-contents-textarea', this.element);
        this.keyword = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-keyword-input', this.element);
        this.keywordAgree = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.keyword-agree', this.element);
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
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.emailSelect, 'change', () => {
          this.emailLast.value = this.emailSelect.value.trim();
        });
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.form, 'submit', event => {
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
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.snsLink)();
};

//유입물건 view 페이지
const holdingInflowView = () => {
  setHoldingDetailsHeight();
  holdingPrint();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.snsLink)();
};

//cr투자회사
const holdingCrInvestment = () => {
  const investment = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.holding-cr-investment');
  const modal = new _Modal__WEBPACK_IMPORTED_MODULE_3__["default"]();
  const triggers = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.holding-cr-investment__link', investment);
  const getId = trigger => trigger.getAttribute('href');
  const contents = triggers.reduce((contents, trigger) => {
    const id = getId(trigger);
    const content = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)(id);
    contents[id] = content;
    return contents;
  }, {});
  triggers.forEach(trigger => {
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(trigger, 'click', event => {
      event.preventDefault();
      const id = getId(trigger);
      const content = contents[id];
      modal.open(content);
    });
  });
};


/***/ }),

/***/ "./js/pc/intro.js":
/*!************************!*\
  !*** ./js/pc/intro.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "introCeo": function() { return /* binding */ introCeo; },
/* harmony export */   "introEthicalManagement": function() { return /* binding */ introEthicalManagement; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tab */ "./js/Tab.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");




//CEO 인사말
const introCeo = () => {
  const intro = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.intro');

  //tab
  (() => {
    const tab = new _Tab__WEBPACK_IMPORTED_MODULE_1__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tab', intro));
    tab.menus[0].click();
  })();

  // swiper
  const introCeo = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.intro-ceo');
  // const carousel = findOne('.swiper', introCeo);
  const menus = ['<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'CR시장역할\'})">CR(기업구조조정) 시장의<br>플랫폼 조성과 촉진 역할</a>', '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'NPL리더\'})">시장 친화적인<br>NPL시장의 Leader</a>', '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'경영환경확립\'})">독립적이고<br>건전한 경영환경 확립</a>', '<a href="#" onclick="gtag(\'event\',\'하단탭\', {\'event_category\' : \'CEO인사말\', \'event_label\' : \'탄탄한 전문가 조직\'})">열정적 끈기를 지닌<br>탄탄한 전문가 조직</a>'];

  // const titles = find('p', carousel);
  // const menus = titles.map((title) => title.innerHTML.trim());

  const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.intro-ceo__content-swiper-image', introCeo), {
    // autoHeight: true,
    loop: true,
    autoplay: {
      delay: 20000,
      disableOnInteraction: false
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
                        </div>`;
      }
    },
    modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_2__.EffectFade, swiper__WEBPACK_IMPORTED_MODULE_2__.Controller]
  });
  const carouselText = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.intro-ceo__content-swiper-text', introCeo), {
    loop: true,
    modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Controller],
    simulateTouch: false
  });
  carousel.controller.control = carouselText;
};

//윤리경영
const introEthicalManagement = () => {
  const intro = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.intro');
  class ReportForm {
    constructor(target) {
      this.target = target;
      this.element = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)(target);
      this.form = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('form', this.element);
      this.reply = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.reply', this.element);
      this.file = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.file', this.element);
      this.inputFile = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('input[type="file"]', this.file);
      this.fileList = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('ul', this.file);
      this.privacy = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.privacy-agree', this.element);
      this.name = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.name', this.element);
      this.emailFirst = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-first', this.element);
      this.emailLast = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-last', this.element);
      this.emailSelect = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-select', this.element);
      this.emailFull = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.email-first', this.element).closest('td').querySelector('input[type="hidden"]');
      this.telRow = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tel-row', this.element);
      this.tel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.tel', this.element);
      this.tel1 = this.tel[0];
      this.tel2 = this.tel[1];
      this.tel3 = this.tel[2];
      this.telFull = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tel-full', this.element);
      this.title = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.report-title-input', this.element);
      this.contents = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.report-contents', this.element);
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
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.inputFile, 'change', () => {
        const choiceFile = this.inputFile.files[0];
        if (this.isFileVaild(choiceFile)) {
          this.fileList.innerHTML = `<li><span>${choiceFile.name}</span><button type="button"><span>삭제</span></button></li>`;
        }
      });
      this.reply.forEach((label, index) => {
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(label, 'change', () => {
          this.necessaryStatus = !!index ? true : false;
          this.telRow.classList[index === 0 ? 'add' : 'remove']('hidden');
        });
      });
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.emailSelect, 'change', () => {
        this.emailLast.value = this.emailSelect.value.trim();
      });
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.element, 'click', event => {
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
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(this.form, 'submit', event => {
        event.preventDefault();
      });
    }
  }

  //tab
  (() => {
    const ethicReportForm = new ReportForm('.report--ethic');
    const improperReportForm = new ReportForm('.report--improper');
    const tab = new _Tab__WEBPACK_IMPORTED_MODULE_1__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tab', intro), () => {
      ethicReportForm.reset();
      improperReportForm.reset();
    });
    tab.menus[0].click();
  })();

  //배경이미지 변경
  (() => {
    const tabNav = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.tab__nav', intro);
    const tabItems = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.tab__menu', intro);
    tabItems.forEach((tabItem, index) => {
      (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(tabItem, 'click', () => {
        tabNav.style.backgroundImage = `url(/assets/images/intro/ethical-management/img_ethical_con1_${index + 1}.jpg)`;
      });
    });
  })();

  //main banner 클릭시 윤리경영 해당 탭 이동
  (() => {
    const headerHeight = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.site-header').clientHeight;
    const pageUrl = window.location.href;
    const pageId = pageUrl.split('#').reverse()[0];
    const pageNum = pageId.substr(3, 4);
    if (pageId === 'tab' + pageNum) {
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


/***/ }),

/***/ "./js/pc/main.js":
/*!***********************!*\
  !*** ./js/pc/main.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collateralCarousel": function() { return /* binding */ collateralCarousel; },
/* harmony export */   "inflowCarousel": function() { return /* binding */ inflowCarousel; },
/* harmony export */   "main": function() { return /* binding */ main; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modal */ "./js/Modal.js");
/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Tab */ "./js/Tab.js");





window.Cookies = js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"];
const main = () => {
  //main visual
  (() => {
    const mainIntro = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__intro');
    const carousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', mainIntro);
    const menus = ['01', '02', '03'];
    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(window, 'load', () => new swiper__WEBPACK_IMPORTED_MODULE_2__["default"](carousel, {
      loop: true,
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
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
                        </div>`;
        }
      },
      navigation: {
        prevEl: '.swiper__button-prev',
        nextEl: '.swiper__button-next'
      },
      on: {
        init() {
          if (this.slides.length < 2) {
            this.el.classList.add('disabled');
          }
        }
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation]
    }));
  })();

  //main 사업소개 배너
  (() => {
    const introBanner = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__intro-banner');
    const tabLists = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('dl div', introBanner);
    tabLists.forEach(tabList => {
      tabList.addEventListener('mouseover', () => {
        tabList.classList.add('active');
      });
      tabList.addEventListener('mouseout', () => {
        tabList.classList.remove('active');
      });
    });
  })();

  //main news
  (() => {
    const mainNews = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__news');
    const tabList = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('li', mainNews);
    const tabContents = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.main__news-item');
    const tabLink = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.main__news-more-button');
    let activeContent = '';
    for (let i = 0; i < tabList.length; i++) {
      tabList[i].querySelector('a').addEventListener('click', function (event) {
        event.preventDefault();
        for (let j = 0; j < tabList.length; j++) {
          tabList[j].classList.remove('active');
          tabContents[j].style.display = 'none';
          tabLink[j].style.display = 'none';
        }
        this.parentNode.classList.add('active');
        tabLink[i].style.display = 'block';
        activeContent = this.getAttribute('href');
        document.querySelector(activeContent).style.display = 'grid';
      });
    }
    ;
  })();

  //main modal
  (() => {
    const toggleMainModal = () => {
      const body = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('body');
      const mainModal = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__modal');
      const modalActive = 'modal-open';
      const modalOpen = 'modal--open';
      const modalFade = 'modal--fade';
      const modalItems = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__container', mainModal);
      const todayCloses = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__button-cookie', mainModal);
      const btnCloses = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__button-close', mainModal);
      const modalClose = () => {
        body.classList.remove(modalActive);
        mainModal.classList.remove(modalOpen);
        mainModal.classList.remove(modalFade);
      };

      // 레이어 팝업 4개를 올리고 그중 3개를 오늘하루 열지않기를 했는데
      // 그럼 1개만 떠야하는데. 아무것도 뜨지 않는다.
      modalItems.forEach((item, index) => {
        item.classList.contains(`modal__container--${js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].get(item.classList[1])}`) && item.remove();
      });

      // 푸쉬된게 하나도 없다면 보여주고 푸쉬된게 해당 아이템과 같다면 안보이게
      // 팝업의 갯수와 쿠키 추가된 갯수가 같다면 팝업 자체를 열지 않음 아니라면 팝업 열기
      if (!(0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__container', mainModal).length) {
        modalClose();
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
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(button, 'click', () => {
          const containerSeqClass = button.closest('.modal__container').classList[1];
          if ((0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__container', button.closest('.main__modal')).length === 1) {
            modalClose();
          }
          js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].set(containerSeqClass, containerSeqClass.split('--')[1], {
            expires: todayDate
          });
          modalItems[index].remove();
        });
      });

      // 일반닫기 버튼
      btnCloses.forEach((button, index) => {
        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(button, 'click', () => {
          if ((0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.modal__container', button.closest('.main__modal')).length === 1) {
            modalClose();
          }
          modalItems[index].remove();
        });
      });
    };
    toggleMainModal();
  })();

  //main 공지사항
  (() => {
    const notice = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__notice');
    const items = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.swiper-slide', notice);
    if (items.length < 2) {
      return;
    }
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', notice), {
      loop: true,
      direction: "vertical",
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      navigation: {
        prevEl: '.swiper__button-prev',
        nextEl: '.swiper__button-next'
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation],
      on: {
        init() {
          (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper__paging', notice).hidden = false;
          // findOne('.swiper__paging', notice).removeAttribute('hidden');
        }
      }
    });
  })();

  //main about
  (() => {
    window.addEventListener('scroll', () => {
      const about = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__about');
      const aboutPosition = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__about').getBoundingClientRect().top;
      let scrollLocation = window.scrollY;
      // console.log('aboutPosition = ' + aboutPosition);
      // console.log(scrollLocation);

      if (scrollLocation + 20 >= aboutPosition) {
        about.classList.add('active');
      }
    });
  })();
  collateralCarousel();
  inflowCarousel();
};

//담보물건
const collateralCarousel = () => {
  const siteMain = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main');
  const collateral = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__collateral', siteMain);
  const detail = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-detail', collateral);
  const list = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-list', collateral);

  //담보물건 list detail로 복사 붙여넣기
  (() => {
    const detailCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper-wrapper', detail);
    const listCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper-wrapper', list);
    detailCarousel.innerHTML = listCarousel.innerHTML;
  })();

  //담보물건 slide detail
  const detailCarousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', detail), {
    speed: 0,
    // simulateTouch: false,  //넣으면 current값 안바뀜
    allowTouchMove: false,
    slideToClickedSlide: true
  });

  //담보물건 slide list
  const listCarousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', list), {
    loop: true,
    slidesPerView: 'auto',
    speed: 500,
    // simulateTouch: false,  //넣으면 current값 안바뀜
    allowTouchMove: false,
    slideToClickedSlide: true,
    navigation: {
      prevEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-prev', collateral),
      nextEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-next', collateral)
    },
    pagination: {
      el: ".main .information__collateral .information__pagination",
      type: "fraction"
    },
    on: {
      slideChange(swiper) {
        detailCarousel.slideToLoop(swiper.realIndex);
        // console.log(swiper.realIndex);
      }

      // init: function () {
      //     if (this.slides.length > 1) {
      //         this.el.classList.add('disabled');
      //     }
      // }
    },

    modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination]
  });

  //slide list클릭시 해당 list로 detail변경
  const carouselItemLinks = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.information-list__item', list);
  carouselItemLinks.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      const itemParent = item.parentNode;
      const itemParentDate = itemParent.getAttribute('data-swiper-slide-index');
      detailCarousel.slideToLoop(itemParentDate);
      // listCarousel.slideToLoop(itemParentDate, 0);
    });
  });
};

//유입물건
const inflowCarousel = () => {
  const siteMain = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main');
  const inflow = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__inflow', siteMain);
  const detail = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-detail', inflow);
  const list = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information-list', inflow);

  //유입물건 list detail로 복사 붙여넣기
  (() => {
    const detailCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper-wrapper', detail);
    const listCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper-wrapper', list);
    detailCarousel.innerHTML = listCarousel.innerHTML;
  })();

  //유입물건 slide detail
  const detailCarousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', detail), {
    speed: 0,
    // simulateTouch: false,  //넣으면 current값 안바뀜
    allowTouchMove: false,
    slideToClickedSlide: true
  });

  //유입물건 slide list
  const listCarousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', list), {
    loop: true,
    slidesPerView: 'auto',
    speed: 500,
    // simulateTouch: false,
    allowTouchMove: false,
    slideToClickedSlide: true,
    navigation: {
      prevEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-prev', inflow),
      nextEl: (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.information__paging-next', inflow)
    },
    pagination: {
      el: ".main .information__inflow .information__pagination",
      type: "fraction"
    },
    on: {
      slideChange(swiper) {
        detailCarousel.slideToLoop(swiper.realIndex);
        // console.log(swiper.realIndex);
      }
    },

    modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination]
  });

  //slide list클릭시 해당 list로 detail변경
  const carouselItemLinks = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.find)('.information-list__item', list);
  carouselItemLinks.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      const itemParent = item.parentNode;
      const itemParentDate = itemParent.getAttribute('data-swiper-slide-index');
      detailCarousel.slideToLoop(itemParentDate);
      // listCarousel.slideToLoop(itemParentDate, 0);
    });
  });
};



/***/ }),

/***/ "./js/pc/news.js":
/*!***********************!*\
  !*** ./js/pc/news.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newsCompanyNewsList": function() { return /* binding */ newsCompanyNewsList; },
/* harmony export */   "newsCompanyNewsView": function() { return /* binding */ newsCompanyNewsView; },
/* harmony export */   "newsIndustryNewsList": function() { return /* binding */ newsIndustryNewsList; },
/* harmony export */   "newsIndustryNewsView": function() { return /* binding */ newsIndustryNewsView; },
/* harmony export */   "newsNoticeList": function() { return /* binding */ newsNoticeList; },
/* harmony export */   "newsNoticeView": function() { return /* binding */ newsNoticeView; },
/* harmony export */   "newsPrint": function() { return /* binding */ newsPrint; }
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./js/pc/common.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var _DropdownSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DropdownSelect */ "./js/DropdownSelect.js");




const newsPrint = () => {
  //프린트
  const body = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('body');
  const pageView = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.page-view');
  const print = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.btn-page-print', pageView);
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(print, 'click', event => {
    event.preventDefault();
    body.classList.add('print');
    window.print();
    body.classList.remove('print');
  });
};

//공지사항 리스트
const newsNoticeList = () => {
  (() => {
    const newsCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.news-swiper');
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', newsCarousel), {
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
        nextEl: '.news-swiper__paging--next'
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation]
    });
  })();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.locationMenu)();
  const dropdown = new _DropdownSelect__WEBPACK_IMPORTED_MODULE_3__["default"]('.dropdown');
};

//공지사항 상세
const newsNoticeView = () => {
  newsPrint();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.snsLink)();
};

//당사소식 리스트
const newsCompanyNewsList = () => {
  (() => {
    const newsCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.news-swiper');
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', newsCarousel), {
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
        nextEl: '.news-swiper__paging--next'
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation]
    });
  })();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.locationMenu)();
};

//당사소식 상세
const newsCompanyNewsView = () => {
  newsPrint();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.snsLink)();
};

//업계소식 리스트
const newsIndustryNewsList = () => {
  (() => {
    const newsCarousel = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.news-swiper');
    const carousel = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.swiper', newsCarousel), {
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
        nextEl: '.news-swiper__paging--next'
      },
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation]
    });
  })();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.locationMenu)();
};

//업계소식 상세
const newsIndustryNewsView = () => {
  newsPrint();
  (0,_common__WEBPACK_IMPORTED_MODULE_1__.snsLink)();
};


/***/ }),

/***/ "./js/pc/recruit.js":
/*!**************************!*\
  !*** ./js/pc/recruit.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recruitList": function() { return /* binding */ recruitList; },
/* harmony export */   "recruitView": function() { return /* binding */ recruitView; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./js/pc/common.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autoprefixer */ "./node_modules/autoprefixer/lib/autoprefixer.js");
/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(autoprefixer__WEBPACK_IMPORTED_MODULE_2__);



const recruitList = () => {
  (0,_common__WEBPACK_IMPORTED_MODULE_0__.locationMenu)();
};
const recruitView = () => {
  //프린트
  (() => {
    const body = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.findOne)('body');
    const pageView = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.findOne)('.page-view');
    const print = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.findOne)('.btn-page-print', pageView);
    (0,_helper__WEBPACK_IMPORTED_MODULE_1__.on)(print, 'click', event => {
      event.preventDefault();
      body.classList.add('print');
      window.print();
      body.classList.remove('print');
    });
  })();
  (0,_common__WEBPACK_IMPORTED_MODULE_0__.snsLink)();
};


/***/ }),

/***/ "./js/pc/window.js":
/*!*************************!*\
  !*** ./js/pc/window.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./js/helper.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");


const windowPopup = () => {
  const footer = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.footer');
  const today = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('input', footer);
  const params = new URLSearchParams(location.search);
  const closeButton = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.findOne)('.main__modal-window__close', footer);
  var todayDate = new Date();
  todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
  (0,_helper__WEBPACK_IMPORTED_MODULE_0__.on)(today, 'change', () => {
    js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].set(`modal__container--${params.get('seq')}`, `${params.get('seq')}`, {
      expires: todayDate
    });
    window.close();
  });
  closeButton.addEventListener('click', event => {
    event.preventDefault();
    window.close();
  });
};
/* harmony default export */ __webpack_exports__["default"] = (windowPopup);

/***/ }),

/***/ "./scss/pc/app.scss":
/*!**************************!*\
  !*** ./scss/pc/app.scss ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "?3465":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?5580":
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?03fb":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?6197":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?b8cb":
/*!*******************************!*\
  !*** source-map-js (ignored) ***!
  \*******************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?c717":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (function() {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./js/pc/app.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./scss/pc/app.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLGNBQWMsR0FBRyxNQUFNO0VBQ3pCQyxXQUFXLENBQUNDLE1BQU0sRUFBRTtJQUNoQixJQUFJLENBQUNDLE1BQU0sR0FBRyxPQUFPRCxNQUFNLEtBQUssUUFBUSxHQUFHRSxRQUFRLENBQUNDLGFBQWEsQ0FBRSxHQUFFSCxNQUFPLEVBQUMsQ0FBQyxHQUFHQSxNQUFNO0lBQ3ZGLElBQUksQ0FBQ0ksWUFBWSxHQUFHLGtCQUFrQjtJQUN0QyxJQUFJLENBQUNDLE1BQU0sR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7SUFDekQsSUFBSSxDQUFDRyxPQUFPLEdBQUcsSUFBSSxDQUFDTCxNQUFNLENBQUNFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztJQUM5RCxJQUFJLENBQUNJLGFBQWEsR0FBRyxJQUFJLENBQUNELE9BQU8sQ0FBQ0UsWUFBWTtJQUM5QyxJQUFJLENBQUNDLEtBQUssR0FBRyxJQUFJLENBQUNSLE1BQU0sQ0FBQ0UsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQzFELElBQUksQ0FBQ08sU0FBUyxHQUFHLElBQUksQ0FBQ1QsTUFBTSxDQUFDRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDbEUsSUFBSSxDQUFDUSxJQUFJLEdBQUcsSUFBSSxDQUFDVixNQUFNLENBQUNFLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxJQUFJLENBQUNTLEtBQUssR0FBR0MsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDYixNQUFNLENBQUNjLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDeEUsSUFBSSxDQUFDQyxPQUFPLEdBQUdILEtBQUssQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ2IsTUFBTSxDQUFDYyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQ0UsSUFBSSxHQUFHLGlCQUFpQjtJQUM3QixJQUFJLENBQUNDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQ04sS0FBSyxDQUFDTyxNQUFNLEdBQUcsR0FBRyxFQUFFQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQ0MsSUFBSSxFQUFFO0lBQ1gsSUFBSSxDQUFDQyxRQUFRLEVBQUU7RUFDbkI7RUFFQUQsSUFBSSxHQUFHO0lBQ0gsSUFBSSxDQUFDWCxTQUFTLENBQUNhLEtBQUssQ0FBQ0Msa0JBQWtCLEdBQUksR0FBRSxJQUFJLENBQUNOLFFBQVMsR0FBRTtFQUNqRTtFQUVBTyxNQUFNLEdBQUc7SUFDTCxNQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDekIsTUFBTSxDQUFDMEIsU0FBUyxDQUFDQyxRQUFRLENBQUUsR0FBRSxJQUFJLENBQUN4QixZQUFhLEVBQUMsQ0FBQztJQUN2RSxNQUFNeUIsaUJBQWlCLEdBQUdILFFBQVEsR0FBRyxRQUFRLEdBQUcsS0FBSztJQUVyRCxJQUFJLENBQUN6QixNQUFNLENBQUMwQixTQUFTLENBQUNFLGlCQUFpQixDQUFDLENBQUUsR0FBRSxJQUFJLENBQUN6QixZQUFhLEVBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUNNLFNBQVMsQ0FBQ2EsS0FBSyxDQUFDTyxNQUFNLEdBQUksR0FBRUosUUFBUSxHQUFHLElBQUksQ0FBQ25CLGFBQWEsR0FBRyxJQUFJLENBQUNELE9BQU8sQ0FBQ0UsWUFBWSxHQUFHLElBQUksQ0FBQ0csSUFBSSxDQUFDSCxZQUFhLElBQUc7RUFDM0g7RUFFQXVCLEtBQUssR0FBRztJQUNKLElBQUksQ0FBQzlCLE1BQU0sQ0FBQzBCLFNBQVMsQ0FBQ0ssTUFBTSxDQUFFLEdBQUUsSUFBSSxDQUFDNUIsWUFBYSxFQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDTSxTQUFTLENBQUNhLEtBQUssQ0FBQ08sTUFBTSxHQUFJLEdBQUUsSUFBSSxDQUFDdkIsYUFBYyxJQUFHO0VBQzNEO0VBRUFlLFFBQVEsR0FBRztJQUNQLElBQUksQ0FBQ04sT0FBTyxDQUFDaUIsT0FBTyxDQUFDQyxNQUFNLElBQUk7TUFDM0JBLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDbkMsSUFBSSxDQUFDMUIsS0FBSyxDQUFDMkIsV0FBVyxHQUFHRixNQUFNLENBQUMvQixhQUFhLENBQUUsR0FBRSxJQUFJLENBQUNjLElBQUssRUFBQyxDQUFDLENBQUNtQixXQUFXO1FBQ3pFLElBQUksQ0FBQy9CLE1BQU0sQ0FBQ2dDLEtBQUssR0FBR0gsTUFBTSxDQUFDRyxLQUFLO01BQ3BDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztJQUVGbkMsUUFBUSxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHRyxLQUFLLElBQUs7TUFDMUMsSUFBSSxDQUFDLENBQUNBLEtBQUssQ0FBQ3RDLE1BQU0sQ0FBQ3VDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNyQyxJQUFJLENBQUNkLE1BQU0sRUFBRTtRQUViO01BQ0o7TUFFQSxJQUFJLENBQUNNLEtBQUssRUFBRTtJQUNoQixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUM7QUFFRCwrREFBZWpDLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUN4RFE7QUFFckMsTUFBTTRDLG9CQUFvQixHQUFHLFlBQVk7QUFDekMsTUFBTUMsZUFBZSxHQUFHLGFBQWE7QUFDckMsTUFBTUMsZUFBZSxHQUFHLGFBQWE7QUFFckMsTUFBTUMsS0FBSyxHQUFHLE1BQU07RUFDaEI5QyxXQUFXLEdBQUc7SUFDVixJQUFJLENBQUMrQyxJQUFJLEdBQUdOLGdEQUFPLENBQUMsTUFBTSxDQUFDO0lBRTNCLElBQUksQ0FBQ08sTUFBTSxHQUFHLEVBQUU7SUFDaEIsSUFBSSxDQUFDQyxPQUFPLEVBQUU7RUFDbEI7RUFFQUMsSUFBSSxDQUFDakQsTUFBTSxFQUFFO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQytDLE1BQU0sQ0FBQzVCLE1BQU0sRUFBRTtNQUNyQixJQUFJLENBQUMyQixJQUFJLENBQUNuQixTQUFTLENBQUN1QixHQUFHLENBQUNSLG9CQUFvQixDQUFDO0lBQ2pEO0lBRUEsSUFBSSxDQUFDSyxNQUFNLENBQUNJLElBQUksQ0FBQ25ELE1BQU0sQ0FBQztJQUN4QkEsTUFBTSxDQUFDMkIsU0FBUyxDQUFDdUIsR0FBRyxDQUFDUCxlQUFlLENBQUM7SUFDckNTLFVBQVUsQ0FBQyxNQUFNcEQsTUFBTSxDQUFDMkIsU0FBUyxDQUFDdUIsR0FBRyxDQUFDTixlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFMUQsT0FBTyxJQUFJO0VBQ2Y7RUFFQWIsS0FBSyxDQUFDc0IsV0FBVyxFQUFFO0lBQ2YsSUFBSUMsS0FBSyxHQUFHLElBQUksQ0FBQ1AsTUFBTSxDQUFDNUIsTUFBTSxHQUFHLENBQUM7SUFFbEMsSUFBSWtDLFdBQVcsRUFBRTtNQUNiQyxLQUFLLEdBQUcsSUFBSSxDQUFDUCxNQUFNLENBQUNRLE9BQU8sQ0FBQ0YsV0FBVyxDQUFDO01BRXhDLElBQUlDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkQSxLQUFLLEdBQUcsQ0FBQztNQUNiO0lBQ0o7SUFFQSxNQUFNdEQsTUFBTSxHQUFHLElBQUksQ0FBQytDLE1BQU0sQ0FBQ1MsTUFBTSxDQUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlDLElBQUksQ0FBQ3RELE1BQU0sRUFBRTtJQUViQSxNQUFNLENBQUMyQixTQUFTLENBQUNLLE1BQU0sQ0FBQ1ksZUFBZSxFQUFFRCxlQUFlLENBQUM7SUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQ0ksTUFBTSxDQUFDNUIsTUFBTSxFQUFFO01BQ3JCLElBQUksQ0FBQzJCLElBQUksQ0FBQ25CLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDVSxvQkFBb0IsQ0FBQztJQUNwRDtFQUNKO0VBRUFlLE9BQU8sQ0FBQ25CLEtBQUssRUFBRTtJQUNYLE1BQU1QLEtBQUssR0FBR08sS0FBSyxDQUFDdEMsTUFBTSxDQUFDdUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUVuRCxJQUFJUixLQUFLLEVBQUU7TUFDUCxJQUFJQSxLQUFLLENBQUMyQixPQUFPLEtBQUssR0FBRyxFQUFFcEIsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO01BRWpELElBQUksQ0FBQzVCLEtBQUssRUFBRTtJQUNoQjtFQUNKO0VBRUFpQixPQUFPLEdBQUc7SUFDTlAsMkNBQUUsQ0FBQyxJQUFJLENBQUNLLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDVyxPQUFPLENBQUNHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUM7RUFDMUQ7RUFFQSxJQUFJQyxXQUFXLEdBQUc7SUFDZCxPQUFPQyxJQUFJLENBQUNDLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDQyxVQUFVLEdBQUcvRCxRQUFRLENBQUNnRSxlQUFlLENBQUNDLFdBQVcsQ0FBQztFQUM3RTtBQUNKLENBQUM7QUFFRCwrREFBZXRCLEtBQUs7Ozs7Ozs7Ozs7Ozs7QUNuRXVCO0FBRTNDLE1BQU13QixHQUFHLEdBQUcsTUFBTTtFQUNkdEUsV0FBVyxDQUFDdUUsT0FBTyxFQUFFQyxRQUFRLEVBQUU7SUFDM0IsSUFBSSxDQUFDRCxPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDMUQsS0FBSyxHQUFHd0QsNkNBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDRSxPQUFPLENBQUM7SUFDN0MsSUFBSSxDQUFDRSxLQUFLLEdBQUdKLDZDQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQ0UsT0FBTyxDQUFDO0lBQzdDLElBQUksQ0FBQ0csTUFBTSxHQUFHLElBQUksQ0FBQ0QsS0FBSyxDQUFDRSxHQUFHLENBQUNDLElBQUksSUFBSTtNQUNqQyxNQUFNQyxPQUFPLEdBQUdELElBQUksQ0FBQ0UsWUFBWSxDQUFDLGVBQWUsQ0FBQztNQUNsRCxNQUFNQyxLQUFLLEdBQUd0QyxnREFBTyxDQUFFLElBQUdvQyxPQUFRLEVBQUMsQ0FBQztNQUVwQyxPQUFPRSxLQUFLO0lBQ2hCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0MsT0FBTyxHQUFHLENBQUM7SUFDaEIsSUFBSSxDQUFDQyxVQUFVLEdBQUcsSUFBSTtJQUV0QixJQUFJLENBQUNULFFBQVEsR0FBR0EsUUFBUTtJQUV4QixJQUFJLENBQUNVLFVBQVUsRUFBRTtFQUNyQjtFQUVBQyxTQUFTLEdBQUc7SUFDUixJQUFJLENBQUNWLEtBQUssQ0FBQ3ZDLE9BQU8sQ0FBQyxDQUFDMEMsSUFBSSxFQUFFckIsS0FBSyxLQUFLO01BQ2hDLElBQUksSUFBSSxDQUFDeUIsT0FBTyxLQUFLekIsS0FBSyxFQUFFO1FBQ3hCcUIsSUFBSSxDQUFDaEQsU0FBUyxDQUFDdUIsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZDeUIsSUFBSSxDQUFDUSxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztNQUM1QyxDQUFDLE1BQU07UUFDSFIsSUFBSSxDQUFDaEQsU0FBUyxDQUFDSyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDMUMyQyxJQUFJLENBQUNRLFlBQVksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO01BQzdDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDdkUsS0FBSyxDQUFDcUIsT0FBTyxDQUFDLENBQUNtRCxJQUFJLEVBQUU5QixLQUFLLEtBQUs7TUFDaEMsSUFBSSxJQUFJLENBQUN5QixPQUFPLEtBQUt6QixLQUFLLEVBQUU7UUFDeEI4QixJQUFJLENBQUN6RCxTQUFTLENBQUN1QixHQUFHLENBQUMsbUJBQW1CLENBQUM7TUFDM0MsQ0FBQyxNQUFNO1FBQ0hrQyxJQUFJLENBQUN6RCxTQUFTLENBQUNLLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztNQUM5QztJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUFxRCxXQUFXLEdBQUc7SUFDVixJQUFJLENBQUNaLE1BQU0sQ0FBQ3hDLE9BQU8sQ0FBQyxDQUFDNkMsS0FBSyxFQUFFeEIsS0FBSyxLQUFLO01BQ2xDLElBQUksSUFBSSxDQUFDeUIsT0FBTyxLQUFLekIsS0FBSyxFQUFFO1FBQ3hCd0IsS0FBSyxDQUFDbkQsU0FBUyxDQUFDdUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1FBQ3JDLElBQUksQ0FBQzhCLFVBQVUsSUFBSU0sWUFBWSxDQUFDLElBQUksQ0FBQ04sVUFBVSxDQUFDO1FBQ2hELElBQUksQ0FBQ0EsVUFBVSxHQUFHNUIsVUFBVSxDQUFDLE1BQU0wQixLQUFLLENBQUNuRCxTQUFTLENBQUN1QixHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFLENBQUM7UUFFakYsTUFBTXFDLFdBQVcsR0FBR25CLDZDQUFJLENBQUMsV0FBVyxFQUFFVSxLQUFLLENBQUM7UUFDNUMsSUFBSVMsV0FBVyxDQUFDcEUsTUFBTSxFQUFFO1VBQ3BCb0UsV0FBVyxDQUFDdEQsT0FBTyxDQUFDcUMsT0FBTyxJQUFJO1lBQzNCQSxPQUFPLENBQUMzQyxTQUFTLENBQUNLLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFFdkNvQixVQUFVLENBQUMsTUFBTTtjQUNia0IsT0FBTyxDQUFDM0MsU0FBUyxDQUFDdUIsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUN4QyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1VBQ1QsQ0FBQyxDQUFDO1FBQ047TUFDSixDQUFDLE1BQU07UUFDSDRCLEtBQUssQ0FBQ25ELFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDO01BQ2xFO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQVAsTUFBTSxHQUFHO0lBQ0wsSUFBSSxDQUFDeUQsU0FBUyxFQUFFO0lBQ2hCLElBQUksQ0FBQ0csV0FBVyxFQUFFO0VBQ3RCO0VBRUFKLFVBQVUsR0FBRztJQUNULElBQUksQ0FBQ1QsS0FBSyxDQUFDdkMsT0FBTyxDQUFDLENBQUMwQyxJQUFJLEVBQUVyQixLQUFLLEtBQUs7TUFDaENiLDJDQUFFLENBQUNrQyxJQUFJLEVBQUUsT0FBTyxFQUFHckMsS0FBSyxJQUFLO1FBQ3pCQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7UUFFdEIsSUFBSSxDQUFDb0IsT0FBTyxHQUFHekIsS0FBSztRQUNwQixJQUFJLENBQUM3QixNQUFNLEVBQUU7UUFFYixJQUFJLENBQUM4QyxRQUFRLElBQUksSUFBSSxDQUFDQSxRQUFRLEVBQUU7TUFDcEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDO0FBRUQsK0RBQWVGLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGWCxNQUFNN0IsT0FBTyxHQUFHLFVBQUNnRCxRQUFRO0VBQUEsSUFBRUMsT0FBTyx1RUFBR3ZGLFFBQVE7RUFBQSxPQUFLdUYsT0FBTyxDQUFDdEYsYUFBYSxDQUFDcUYsUUFBUSxDQUFDO0FBQUE7QUFDakYsTUFBTXBCLElBQUksR0FBRyxVQUFDb0IsUUFBUTtFQUFBLElBQUVDLE9BQU8sdUVBQUd2RixRQUFRO0VBQUEsT0FBSyxDQUFDLEdBQUd1RixPQUFPLENBQUMxRSxnQkFBZ0IsQ0FBQ3lFLFFBQVEsQ0FBQyxDQUFDO0FBQUE7QUFFdEYsTUFBTS9DLEVBQUUsR0FBRyxVQUFDekMsTUFBTSxFQUFFMEYsSUFBSSxFQUFFbkIsUUFBUSxFQUFzQjtFQUFBLElBQXBCb0IsT0FBTyx1RUFBRyxLQUFLO0VBQ3RELElBQUksQ0FBQzNGLE1BQU0sSUFBSSxDQUFDQSxNQUFNLENBQUNtQyxnQkFBZ0IsRUFBRTtFQUV6Q25DLE1BQU0sQ0FBQ21DLGdCQUFnQixDQUFDdUQsSUFBSSxFQUFFbkIsUUFBUSxFQUFFb0IsT0FBTyxDQUFDO0FBQ3BELENBQUM7QUFDTSxNQUFNQyxHQUFHLEdBQUcsQ0FBQzVGLE1BQU0sRUFBRTBGLElBQUksRUFBRW5CLFFBQVEsS0FBS3ZFLE1BQU0sQ0FBQzZGLG1CQUFtQixDQUFDSCxJQUFJLEVBQUVuQixRQUFRLENBQUM7QUFDbEYsTUFBTXVCLFFBQVEsR0FBRyxDQUFDOUYsTUFBTSxFQUFFd0YsUUFBUSxFQUFFRSxJQUFJLEVBQUVLLE9BQU8sRUFBRUosT0FBTyxLQUFLO0VBQ2xFLE1BQU1LLGFBQWEsR0FBSTFELEtBQUssSUFBSztJQUM3QixNQUFNMkQsYUFBYSxHQUFHM0QsS0FBSyxDQUFDdEMsTUFBTTtJQUNsQyxNQUFNa0csaUJBQWlCLEdBQUdELGFBQWEsQ0FBQzFELE9BQU8sQ0FBQ2lELFFBQVEsQ0FBQztJQUV6RCxJQUFJVSxpQkFBaUIsRUFBRTtNQUNuQkgsT0FBTyxDQUFDSSxJQUFJLENBQUNELGlCQUFpQixFQUFFNUQsS0FBSyxDQUFDO0lBQzFDO0VBQ0osQ0FBQztFQUVERyxFQUFFLENBQUN6QyxNQUFNLEVBQUUwRixJQUFJLEVBQUVNLGFBQWEsRUFBRSxDQUFDLENBQUNMLE9BQU8sQ0FBQztBQUM5QyxDQUFDO0FBRU0sTUFBTVMsU0FBUyxHQUFJOUIsT0FBTyxJQUFLO0VBQ2xDLE1BQU0rQixJQUFJLEdBQUcvQixPQUFPLENBQUNnQyxxQkFBcUIsRUFBRTtFQUU1QyxPQUFPO0lBQ0hDLEdBQUcsRUFBRUYsSUFBSSxDQUFDRSxHQUFHLEdBQUd2QyxNQUFNLENBQUN3QyxPQUFPO0lBQzlCQyxJQUFJLEVBQUVKLElBQUksQ0FBQ0ksSUFBSSxHQUFHekMsTUFBTSxDQUFDMEM7RUFDN0IsQ0FBQztBQUNMLENBQUM7QUFFTSxNQUFNQyxRQUFRLEdBQUcsVUFBQ0MsSUFBSSxFQUFpQjtFQUFBLElBQWZDLElBQUksdUVBQUcsR0FBRztFQUNyQyxJQUFJQyxVQUFVO0VBRWQsT0FBTyxZQUFhO0lBQUEsa0NBQVRDLElBQUk7TUFBSkEsSUFBSTtJQUFBO0lBQ1hELFVBQVUsSUFBSXhCLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQztJQUN0Q0EsVUFBVSxHQUFHMUQsVUFBVSxDQUFDLE1BQU13RCxJQUFJLENBQUMsR0FBR0csSUFBSSxDQUFDLEVBQUVGLElBQUksQ0FBQztFQUN0RCxDQUFDO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEMyQjtBQUU4RTtBQUM5RTtBQUM2QjtBQUN5RTtBQUM5RjtBQUN3RztBQUN6RjtBQUNoQjtBQUVuQyxNQUFNNEIsR0FBRyxHQUFHLElBQUl6QixpREFBRyxFQUFFOztBQUVyQjtBQUNBeUIsR0FBRyxDQUFDdkYsR0FBRyxDQUFDO0VBQ0orRCxRQUFRO0VBQ1JDLHFCQUFxQjtFQUNyQkMsT0FBTztFQUNQQyxZQUFZO0VBQ1pDLFVBQVU7RUFDVkMsWUFBWTtFQUVaQyxJQUFJO0VBRUppQixXQUFXO0VBRVhoQixRQUFRO0VBQ1JDLHNCQUFzQjtFQUV0Qk0sUUFBUTtFQUVSTCxxQkFBcUI7RUFDckJDLGlCQUFpQjtFQUNqQkMscUJBQXFCO0VBQ3JCQyxpQkFBaUI7RUFDakJDLG1CQUFtQjtFQUVuQkUsY0FBYztFQUNkQyxjQUFjO0VBQ2RDLG1CQUFtQjtFQUNuQkMsbUJBQW1CO0VBQ25CQyxvQkFBb0I7RUFDcEJDLG9CQUFvQjtFQUVwQkMsV0FBVztFQUNYQyxXQUFXQSxtREFBQUE7QUFFZixDQUFDLENBQUM7O0FBR0Y7QUFDQUUsR0FBRyxDQUFDQyxJQUFJLENBQ0osU0FBUyxFQUNULHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDWixjQUFjLENBQ2pCO0FBRURELEdBQUcsQ0FBQ0UsV0FBVyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RDJCO0FBQ25CO0FBQ0k7QUFFN0IsTUFBTVosUUFBUSxHQUFHLE1BQU07RUFDbkIsTUFBTUEsUUFBUSxHQUFFdkYsZ0RBQU8sQ0FBQyxXQUFXLENBQUM7O0VBRXBDO0VBQ0EsQ0FBQyxNQUFNO0lBQ0gsTUFBTW9HLE1BQU0sR0FBRyxJQUFJQyxlQUFlLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0lBQ25ELE1BQU1DLEdBQUcsR0FBRyxJQUFJM0UsNENBQUcsQ0FBQzdCLGdEQUFPLENBQUMsTUFBTSxFQUFFdUYsUUFBUSxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLENBQUNhLE1BQU0sQ0FBQ0ssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ3JCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ1AsTUFBTSxDQUFDSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDOUJELEdBQUcsQ0FBQ3hFLEtBQUssQ0FBRW9FLE1BQU0sQ0FBQ0ssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQ0csS0FBSyxFQUFFO0lBQ2xELENBQUMsTUFBTTtNQUNISixHQUFHLENBQUN4RSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM0RSxLQUFLLEVBQUU7SUFDeEI7RUFDSixDQUFDLEdBQUc7QUFHUixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckIyQztBQUN0QjtBQUNPO0FBQytDO0FBRTVFLE1BQU1PLFFBQVEsR0FBSTNKLE1BQU0sSUFBSztFQUN6QixNQUFNMkUsSUFBSSxHQUFHbkMsZ0RBQU8sQ0FBQyxvQkFBb0IsQ0FBQztFQUUxQ3hDLE1BQU0sQ0FBQzRKLFNBQVMsR0FBR2pGLElBQUksQ0FBQ2lGLFNBQVM7QUFDckMsQ0FBQztBQUVELE1BQU0zQyxRQUFRLEdBQUcsTUFBTTtFQUNuQixJQUFJLENBQUMsQ0FBQ3pFLGdEQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDeEIsTUFBTU0sSUFBSSxHQUFHTixnREFBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QixNQUFNeUUsUUFBUSxHQUFHekUsZ0RBQU8sQ0FBQyxXQUFXLENBQUM7SUFDckMsTUFBTXFILGFBQWEsR0FBR3JILGdEQUFPLENBQUMsNEJBQTRCLENBQUM7SUFDM0QsTUFBTXNILE9BQU8sR0FBR3RILGdEQUFPLENBQUMsb0JBQW9CLEVBQUV5RSxRQUFRLENBQUM7SUFDdkQsTUFBTThDLGNBQWMsR0FBR3ZILGdEQUFPLENBQUMsbUJBQW1CLENBQUM7SUFDbkQsTUFBTXdILGlCQUFpQixHQUFHeEgsZ0RBQU8sQ0FBQyxzQkFBc0IsQ0FBQztJQUN6RCxNQUFNeUgsbUJBQW1CLEdBQUd6SCxnREFBTyxDQUFDLHlCQUF5QixDQUFDO0lBRTlEdUgsY0FBYyxDQUFDNUgsZ0JBQWdCLENBQUMsT0FBTyxFQUFHRyxLQUFLLElBQUs7TUFDaERBLEtBQUssQ0FBQ3FCLGNBQWMsRUFBRTtNQUN0QnFHLGlCQUFpQixDQUFDckksU0FBUyxDQUFDdUIsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUN6QztJQUNKLENBQUMsQ0FBQzs7SUFFRjJHLGFBQWEsQ0FBQzFILGdCQUFnQixDQUFDLE9BQU8sRUFBR0csS0FBSyxJQUFLO01BQy9DQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFDdEJxRyxpQkFBaUIsQ0FBQ3JJLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYrRyxtQkFBbUIsQ0FBQzlILGdCQUFnQixDQUFDLE9BQU8sRUFBR0csS0FBSyxJQUFLO01BQ3JEQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFDdEJxRyxpQkFBaUIsQ0FBQ3JJLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUM1QztJQUNKLENBQUMsQ0FBQzs7SUFFRjJILFFBQVEsQ0FBQ0csT0FBTyxDQUFDO0VBQ3JCO0FBQ0osQ0FBQztBQUVELE1BQU01QyxxQkFBcUIsR0FBRyxNQUFNO0VBQ2hDLElBQUksQ0FBQyxDQUFDMUUsZ0RBQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtJQUMzQjtJQUNBLENBQUMsTUFBTTtNQUNILE1BQU0wSCxpQkFBaUIsR0FBRzFILGdEQUFPLENBQUMscUJBQXFCLENBQUM7TUFDeEQsTUFBTTJILGtCQUFrQixHQUFHM0gsZ0RBQU8sQ0FBQywwQkFBMEIsQ0FBQztNQUM5RCxNQUFNNEgsZ0JBQWdCLEdBQUc1SCxnREFBTyxDQUFDLGlDQUFpQyxDQUFDO01BRW5FQywyQ0FBRSxDQUFDeUgsaUJBQWlCLEVBQUUsT0FBTyxFQUFHNUgsS0FBSyxJQUFLO1FBQ3RDQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7UUFFdEJ3RyxrQkFBa0IsQ0FBQ3hJLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDMUNnSCxpQkFBaUIsQ0FBQ3ZJLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDN0MsQ0FBQyxDQUFDO01BRUZULDJDQUFFLENBQUMySCxnQkFBZ0IsRUFBRSxPQUFPLEVBQUc5SCxLQUFLLElBQUs7UUFDckNBLEtBQUssQ0FBQ3FCLGNBQWMsRUFBRTtRQUV0QndHLGtCQUFrQixDQUFDeEksU0FBUyxDQUFDSyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzdDa0ksaUJBQWlCLENBQUN2SSxTQUFTLENBQUNLLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFFaEQsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxHQUFHOztJQUVKO0lBQ0EsQ0FBQyxNQUFNO01BQ0gsTUFBTXFJLGlCQUFpQixHQUFHN0gsZ0RBQU8sQ0FBQywwQkFBMEIsQ0FBQztNQUM3RCxNQUFNOEgsWUFBWSxHQUFHOUgsZ0RBQU8sQ0FBQyxtQ0FBbUMsRUFBRTZILGlCQUFpQixDQUFDO01BQ3BGLE1BQU1FLGNBQWMsR0FBRy9ILGdEQUFPLENBQUMscUNBQXFDLEVBQUU2SCxpQkFBaUIsQ0FBQztNQUV4RkUsY0FBYyxDQUFDWCxTQUFTLEdBQUdVLFlBQVksQ0FBQ1YsU0FBUztJQUNyRCxDQUFDLEdBQUc7O0lBR0o7SUFDQSxDQUFDLE1BQU07TUFDSCxNQUFNUyxpQkFBaUIsR0FBRzdILGdEQUFPLENBQUMsMEJBQTBCLENBQUM7TUFDN0QsTUFBTWdJLE1BQU0sR0FBR2hJLGdEQUFPLENBQUMscUJBQXFCLEVBQUU2SCxpQkFBaUIsQ0FBQztNQUNoRSxNQUFNMUosSUFBSSxHQUFHNkIsZ0RBQU8sQ0FBQyxtQkFBbUIsRUFBRTZILGlCQUFpQixDQUFDO01BRTVELE1BQU1FLGNBQWMsR0FBRyxJQUFJakIsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFZ0ksTUFBTSxDQUFDLEVBQUU7UUFDMURDLElBQUksRUFBRSxJQUFJO1FBQ1ZDLE1BQU0sRUFBRSxNQUFNO1FBQ2RsQixVQUFVLEVBQUUsSUFBSTtRQUNoQm1CLGFBQWEsRUFBRSxNQUFNO1FBQ3JCQyxLQUFLLEVBQUUsQ0FBQztRQUNSQyxhQUFhLEVBQUUsS0FBSztRQUNwQkMsVUFBVSxFQUFFO1VBQ1JDLEVBQUUsRUFBRSw4Q0FBOEM7VUFDbERyRixJQUFJLEVBQUU7UUFDVixDQUFDO1FBQ0RzRixPQUFPLEVBQUUsQ0FBQ3ZCLDhDQUFVLEVBQUVDLDhDQUFVLEVBQUVGLDhDQUFVO01BQ2hELENBQUMsQ0FBQztNQUVGLE1BQU1jLFlBQVksR0FBRyxJQUFJaEIsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFN0IsSUFBSSxDQUFDLEVBQUU7UUFDdEQ4SixJQUFJLEVBQUUsSUFBSTtRQUNWRSxhQUFhLEVBQUUsTUFBTTtRQUNyQkMsS0FBSyxFQUFFLEdBQUc7UUFDVkssbUJBQW1CLEVBQUUsSUFBSTtRQUN6QkgsVUFBVSxFQUFFO1VBQ1JDLEVBQUUsRUFBRSxtREFBbUQ7VUFDdkRyRixJQUFJLEVBQUU7UUFDVixDQUFDO1FBQ0R3RixVQUFVLEVBQUU7VUFDUkMsTUFBTSxFQUFFM0ksZ0RBQU8sQ0FBQywyQkFBMkIsRUFBRTZILGlCQUFpQixDQUFDO1VBQy9EZSxNQUFNLEVBQUU1SSxnREFBTyxDQUFDLDJCQUEyQixFQUFFNkgsaUJBQWlCO1FBQ2xFLENBQUM7UUFDRDVILEVBQUUsRUFBRTtVQUNBNEksV0FBVyxDQUFDQyxNQUFNLEVBQUU7WUFDaEJmLGNBQWMsQ0FBQ2dCLFdBQVcsQ0FBQ0QsTUFBTSxDQUFDRSxTQUFTLENBQUM7VUFDaEQ7UUFDSixDQUFDO1FBQ0RSLE9BQU8sRUFBRSxDQUFDekIsNENBQVEsRUFBRUUsOENBQVUsRUFBRUMsOENBQVUsRUFBRUYsOENBQVU7TUFDMUQsQ0FBQyxDQUFDO01BRUYsTUFBTWlDLGlCQUFpQixHQUFHckgsNkNBQUksQ0FBQyx5QkFBeUIsRUFBRXpELElBQUksQ0FBQztNQUUvRDhLLGlCQUFpQixDQUFDeEosT0FBTyxDQUFDbUQsSUFBSSxJQUFJO1FBQzlCQSxJQUFJLENBQUNqRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdHLEtBQUssSUFBSztVQUN0Q0EsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO1VBRXRCLE1BQU0rSCxVQUFVLEdBQUd0RyxJQUFJLENBQUN1RyxVQUFVO1VBQ2xDLE1BQU1DLGNBQWMsR0FBR0YsVUFBVSxDQUFDN0csWUFBWSxDQUFDLHlCQUF5QixDQUFDO1VBRXpFMEYsY0FBYyxDQUFDZ0IsV0FBVyxDQUFDSyxjQUFjLENBQUM7VUFDMUM7UUFDSixDQUFDLENBQUM7TUFDTixDQUFDLENBQUM7SUFDTixDQUFDLEdBQUc7RUFDUjtBQUNKLENBQUM7O0FBRUQsTUFBTUMsWUFBWSxHQUFHLE1BQU07RUFDdkIsTUFBTUMsV0FBVyxHQUFHaEQsUUFBUSxDQUFDaUQsSUFBSSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9DLE1BQU1DLFFBQVEsR0FBR3pKLGdEQUFPLENBQUMsWUFBWSxDQUFDO0VBQ3RDLE1BQU0wSixTQUFTLEdBQUc5SCw2Q0FBSSxDQUFDLEdBQUcsRUFBRTZILFFBQVEsQ0FBQztFQUVyQ0MsU0FBUyxDQUFDakssT0FBTyxDQUFDa0ssSUFBSSxJQUFJO0lBQ3RCLElBQUlBLElBQUksQ0FBQ0osSUFBSSxLQUFLRCxXQUFXLEVBQUU7TUFDM0JLLElBQUksQ0FBQzVKLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQ1osU0FBUyxDQUFDdUIsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUM5QztFQUNKLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNa0UsWUFBWSxHQUFHLE1BQU07RUFDdkIsSUFBSSxDQUFDLENBQUM1RSxnREFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3JCLE1BQU00SixNQUFNLEdBQUc1SixnREFBTyxDQUFDLFFBQVEsQ0FBQztJQUVoQyxNQUFNNkosUUFBUSxHQUFHLElBQUkvQyw4Q0FBTSxDQUFDOUcsZ0RBQU8sQ0FBQyxTQUFTLEVBQUU0SixNQUFNLENBQUMsRUFBRTtNQUNwRDNCLElBQUksRUFBRSxNQUFNO01BQ1pFLGFBQWEsRUFBRSxDQUFDO01BQ2hCO01BQ0EyQixRQUFRLEVBQUU7UUFDTkMsS0FBSyxFQUFFLElBQUk7UUFDWEMsb0JBQW9CLEVBQUU7TUFDMUIsQ0FBQztNQUVEeEIsT0FBTyxFQUFFLENBQUN6Qiw0Q0FBUTtJQUN0QixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUM7QUFFRCxNQUFNcEMsT0FBTyxHQUFHLE1BQU07RUFDbEIsSUFBSSxDQUFDLENBQUMzRSxnREFBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0lBQ3hCLE1BQU0yRSxPQUFPLEdBQUczRSxnREFBTyxDQUFDLFdBQVcsQ0FBQztJQUNwQyxNQUFNTixNQUFNLEdBQUdNLGdEQUFPLENBQUMsbUJBQW1CLEVBQUUyRSxPQUFPLENBQUM7SUFDcEQsTUFBTXNGLFlBQVksR0FBRywwQkFBMEI7SUFDL0MsTUFBTUMsV0FBVyxHQUFHLHlCQUF5QjtJQUM3QyxNQUFNTixNQUFNLEdBQUc1SixnREFBTyxDQUFDLGNBQWMsQ0FBQztJQUV0QyxNQUFNbUssV0FBVyxHQUFHLE1BQU07TUFDdEIsSUFBSW5LLGdEQUFPLENBQUMsTUFBTSxDQUFDLENBQUM4RCxxQkFBcUIsRUFBRSxDQUFDQyxHQUFHLEVBQUU7UUFDN0NyRSxNQUFNLENBQUNQLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQ3VKLFlBQVksQ0FBQztNQUN0QyxDQUFDLE1BQU07UUFDSHZLLE1BQU0sQ0FBQ1AsU0FBUyxDQUFDSyxNQUFNLENBQUN5SyxZQUFZLENBQUM7TUFDekM7SUFDSixDQUFDO0lBRUQsTUFBTUcsU0FBUyxHQUFHLE1BQU07TUFDcEIsSUFBSSxDQUFDLEVBQUVDLFFBQVEsQ0FBRVQsTUFBTSxDQUFDOUYscUJBQXFCLEVBQUUsQ0FBQ0MsR0FBRyxHQUFHdkMsTUFBTSxDQUFDOEksV0FBVyxHQUFJNUssTUFBTSxDQUFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDcEcwQixNQUFNLENBQUNQLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQ3dKLFdBQVcsQ0FBQztNQUNyQyxDQUFDLE1BQU07UUFDSHhLLE1BQU0sQ0FBQ1AsU0FBUyxDQUFDSyxNQUFNLENBQUMwSyxXQUFXLENBQUM7TUFDeEM7SUFDSixDQUFDO0lBRUQsTUFBTUssT0FBTyxHQUFJekssS0FBSyxJQUFLO01BQ3ZCQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFFdEJLLE1BQU0sQ0FBQ2dKLFFBQVEsQ0FBQztRQUNaekcsR0FBRyxFQUFFLENBQUM7UUFDTjBHLFFBQVEsRUFBRTtNQUNkLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRE4sV0FBVyxFQUFFO0lBQ2JDLFNBQVMsRUFBRTtJQUVYbkssMkNBQUUsQ0FBQ3VCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTTtNQUN2QjJJLFdBQVcsRUFBRTtNQUNiQyxTQUFTLEVBQUU7SUFDZixDQUFDLENBQUM7SUFFRm5LLDJDQUFFLENBQUNQLE1BQU0sRUFBRSxPQUFPLEVBQUdJLEtBQUssSUFBSztNQUMzQnlLLE9BQU8sQ0FBQ3pLLEtBQUssQ0FBQztJQUNsQixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUM7QUFFRCxNQUFNK0UsVUFBVSxHQUFHLE1BQU07RUFDckIsSUFBSSxDQUFDLENBQUM3RSxnREFBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0lBQzNCLE1BQU00SixNQUFNLEdBQUc1SixnREFBTyxDQUFDLGNBQWMsQ0FBQztJQUN0QyxNQUFNMEssS0FBSyxHQUFHLElBQUlySyw4Q0FBSyxFQUFFO0lBQ3pCLE1BQU1zSyxZQUFZLEdBQUczSyxnREFBTyxDQUFDLDRCQUE0QixFQUFFNEosTUFBTSxDQUFDO0lBQ2xFLE1BQU1nQixVQUFVLEdBQUc1SyxnREFBTyxDQUFDLHlCQUF5QixFQUFFNEosTUFBTSxDQUFDO0lBQzdEO0lBQ0EsTUFBTWlCLGFBQWEsR0FBRzdLLGdEQUFPLENBQUMsNkJBQTZCLENBQUM7SUFDNUQsTUFBTThLLFdBQVcsR0FBRzlLLGdEQUFPLENBQUMsMEJBQTBCLENBQUM7SUFFdkRDLDJDQUFFLENBQUMwSyxZQUFZLEVBQUUsT0FBTyxFQUFHN0ssS0FBSyxJQUFLO01BQ2pDQSxLQUFLLENBQUNxQixjQUFjLENBQUNyQixLQUFLLENBQUM7TUFFM0I0SyxLQUFLLENBQUNqSyxJQUFJLENBQUNvSyxhQUFhLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUY1SywyQ0FBRSxDQUFDMkssVUFBVSxFQUFFLE9BQU8sRUFBRzlLLEtBQUssSUFBSztNQUMvQkEsS0FBSyxDQUFDcUIsY0FBYyxDQUFDckIsS0FBSyxDQUFDO01BRTNCNEssS0FBSyxDQUFDakssSUFBSSxDQUFDcUssV0FBVyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUVELE1BQU1oRyxZQUFZLEdBQUcsTUFBTTtFQUN2QnRELE1BQU0sQ0FBQ3FGLEdBQUcsR0FBR0EsNENBQUc7RUFFaEJBLCtDQUFRLENBQUM7SUFDTGtFLElBQUksRUFBRTtFQUNWLENBQUMsQ0FBQztFQUNGOUssMkNBQUUsQ0FBQ3VCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTXFGLGtEQUFXLEVBQUUsQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTW9FLE9BQU8sR0FBRyxNQUFNO0VBQ2xCLE1BQU1DLFdBQVcsR0FBR2xMLGdEQUFPLENBQUMsZUFBZSxDQUFDO0VBQzVDLE1BQU1tTCxVQUFVLEdBQUduTCxnREFBTyxDQUFDLGNBQWMsQ0FBQztFQUMxQyxNQUFNb0wsUUFBUSxHQUFHcEwsZ0RBQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDcUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztFQUN2RSxNQUFNZ0osVUFBVSxHQUFHckwsZ0RBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDcUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztFQUMzRSxNQUFNaUosZ0JBQWdCLEdBQUd0TCxnREFBTyxDQUFDLDZCQUE2QixDQUFDLENBQUNxQyxZQUFZLENBQUMsU0FBUyxDQUFDO0VBQ3ZGLE1BQU1rSixVQUFVLEdBQUd2TCxnREFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUNxQyxZQUFZLENBQUMsU0FBUyxDQUFDOztFQUUzRTtFQUNBLFNBQVNtSixhQUFhLEdBQUc7SUFDckJoSyxNQUFNLENBQUNmLElBQUksQ0FBQywrQ0FBK0MsR0FBR2dMLGtCQUFrQixDQUFDTCxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLENBQUM7RUFDakk7O0VBRUE7RUFDQSxTQUFTTSxZQUFZLEdBQUc7SUFDcEIsTUFBTUMsVUFBVSxHQUFHRixrQkFBa0IsQ0FBQ0osVUFBVSxHQUFHLEdBQUcsR0FBR0MsZ0JBQWdCLENBQUM7SUFDMUUsTUFBTU0sU0FBUyxHQUFHSCxrQkFBa0IsQ0FBQ0wsUUFBUSxDQUFDO0lBQzlDNUosTUFBTSxDQUFDZixJQUFJLENBQUMsd0NBQXdDLEdBQUdrTCxVQUFVLEdBQUcsT0FBTyxHQUFHQyxTQUFTLEVBQUUsdUNBQXVDLENBQUM7RUFDckk7RUFFQTNMLDJDQUFFLENBQUNpTCxXQUFXLEVBQUUsT0FBTyxFQUFHcEwsS0FBSyxJQUFLO0lBQ2hDQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7SUFDdEJxSyxhQUFhLEVBQUU7RUFDbkIsQ0FBQyxDQUFDO0VBRUZ2TCwyQ0FBRSxDQUFDa0wsVUFBVSxFQUFFLE9BQU8sRUFBR3JMLEtBQUssSUFBSztJQUMvQkEsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO0lBQ3RCdUssWUFBWSxFQUFFO0VBQ2xCLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsTUFBTTtJQUNILFNBQVNHLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO01BQ3RCO01BQ0EsSUFBSUMsU0FBUyxDQUFDQyxTQUFTLEtBQUtDLFNBQVMsRUFBRTtRQUNuQ0YsU0FBUyxDQUFDQyxTQUFTLENBQ2RFLFNBQVMsQ0FBQ0osTUFBTSxDQUFDLENBQ2pCSyxJQUFJLENBQUMsTUFBTTtVQUNSQyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQzFCLENBQUMsQ0FBQztNQUNWLENBQUMsTUFBTTtRQUNIO1FBQ0EsTUFBTUMsUUFBUSxHQUFHM08sUUFBUSxDQUFDNE8sYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNuREQsUUFBUSxDQUFDeE0sS0FBSyxHQUFHaU0sTUFBTTtRQUN2QnBPLFFBQVEsQ0FBQzRDLElBQUksQ0FBQ2lNLFdBQVcsQ0FBQ0YsUUFBUSxDQUFDO1FBQ25DQSxRQUFRLENBQUM1TyxNQUFNLEVBQUU7UUFDakI0TyxRQUFRLENBQUNHLGlCQUFpQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDcEMsSUFBSTtVQUNBOU8sUUFBUSxDQUFDK08sV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxDQUFDLENBQUMsT0FBT0MsR0FBRyxFQUFFO1VBQ1ZoRyxPQUFPLENBQUNpRyxLQUFLLENBQUMsT0FBTyxFQUFFRCxHQUFHLENBQUM7UUFDL0I7UUFDQUwsUUFBUSxDQUFDRyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDOU8sUUFBUSxDQUFDNEMsSUFBSSxDQUFDc00sV0FBVyxDQUFDUCxRQUFRLENBQUM7UUFDbkNELEtBQUssQ0FBQyxlQUFlLENBQUM7TUFDMUI7SUFDSjtJQUFDO0lBRUQsTUFBTVMsT0FBTyxHQUFHN00sZ0RBQU8sQ0FBQyxlQUFlLENBQUM7SUFDeEMsSUFBSThMLE1BQU0sR0FBR3RLLE1BQU0sQ0FBQzhFLFFBQVEsQ0FBQ2lELElBQUk7SUFHakN0SiwyQ0FBRSxDQUFDNE0sT0FBTyxFQUFFLE9BQU8sRUFBRy9NLEtBQUssSUFBSztNQUM1QkEsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO01BRXRCMEssUUFBUSxDQUFDQyxNQUFNLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0VBRU4sQ0FBQyxHQUFHO0FBRVIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxVGdFO0FBQ25CO0FBQ2tCO0FBQ3RDO0FBQ0c7QUFFN0IsTUFBTWtCLGNBQWMsR0FBRyxNQUFNRCxpREFBUyxDQUFDLG9CQUFvQixDQUFDLENBQUNaLElBQUksQ0FBQztFQUFBLElBQUM7SUFBQ2MsSUFBSSxFQUFFO01BQUNBO0lBQUk7RUFBQyxDQUFDO0VBQUEsT0FBS0EsSUFBSTtBQUFBLEVBQUM7QUFDM0YsTUFBTUMsYUFBYSxHQUFHLE1BQU07RUFDeEIzUCxXQUFXLEdBQUc7SUFDVixJQUFJLENBQUN1RSxPQUFPLEdBQUc5QixnREFBTyxDQUFDLGlCQUFpQixDQUFDO0lBRXpDLElBQUksQ0FBQyxJQUFJLENBQUM4QixPQUFPLEVBQUU7SUFFbkIsSUFBSSxDQUFDcUwsWUFBWSxHQUFHbk4sZ0RBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQ2hDLFlBQVk7SUFFeEQsSUFBSSxDQUFDb1AsSUFBSSxHQUFHcE4sZ0RBQU8sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7SUFDMUQsSUFBSSxDQUFDdUwsVUFBVSxHQUFHLENBQ2QsR0FBR3pMLDZDQUFJLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDd0wsSUFBSSxDQUFDLEVBQ3hELEdBQUd4TCw2Q0FBSSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQ3dMLElBQUksQ0FBQyxDQUN0RDtJQUNELElBQUksQ0FBQ0UsVUFBVSxHQUFHdE4sZ0RBQU8sQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUNvTixJQUFJLENBQUM7SUFFekUsSUFBSSxDQUFDRyxXQUFXLEVBQUU7SUFDbEIsSUFBSSxDQUFDOUssVUFBVSxFQUFFO0VBQ3JCO0VBRUEsTUFBTThLLFdBQVcsR0FBRztJQUNoQixJQUFJLENBQUNDLGFBQWEsR0FBR3hOLGdEQUFPLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO0lBQzlFLElBQUksQ0FBQzJMLGlCQUFpQixHQUFHN0wsNkNBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUNFLE9BQU8sQ0FBQztJQUVyRSxJQUFJLENBQUM0TCxZQUFZLEdBQUcsSUFBSSxDQUFDRCxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUNELFlBQVksQ0FBQ2pQLElBQUk7SUFDOUMsSUFBSSxDQUFDaVAsWUFBWSxDQUFDRSxlQUFlLENBQUMsTUFBTSxDQUFDO0lBRXpDLElBQUksQ0FBQ0MsYUFBYSxHQUFHLElBQUksQ0FBQ0osaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQ0ssaUJBQWlCLEdBQUcsSUFBSSxDQUFDRCxhQUFhLENBQUNwUCxJQUFJO0lBQ2hELElBQUksQ0FBQ29QLGFBQWEsQ0FBQ0QsZUFBZSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFJLENBQUNHLHlCQUF5QixHQUFHLElBQUksQ0FBQ0YsYUFBYSxDQUFDekcsU0FBUztJQUU3RCxJQUFJLENBQUM0RyxrQkFBa0IsR0FBR2hPLGdEQUFPLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDd04sYUFBYSxDQUFDO0lBRTlGLElBQUksQ0FBQ1MsWUFBWSxHQUFHak8sZ0RBQU8sQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUN3TixhQUFhLENBQUM7SUFDNUUsSUFBSSxDQUFDVSxlQUFlLEdBQUcsSUFBSUMsR0FBRyxFQUFFO0lBQ2hDLE1BQU1DLGFBQWEsR0FBR3hNLDZDQUFJLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDcU0sWUFBWSxDQUFDO0lBQy9FLE1BQU1JLFlBQVksR0FBR0QsYUFBYSxDQUFDRSxLQUFLLEVBQUU7SUFDMUNELFlBQVksQ0FBQzdPLE1BQU0sRUFBRTtJQUNyQjZPLFlBQVksQ0FBQ1QsZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUN0QyxJQUFJLENBQUNXLG9CQUFvQixHQUFHRixZQUFZLENBQUNHLFNBQVM7SUFFbERKLGFBQWEsQ0FBQzNPLE9BQU8sQ0FBQzZHLFFBQVEsSUFBSSxJQUFJLENBQUM0SCxlQUFlLENBQUN4TixHQUFHLENBQUNWLGdEQUFPLENBQUMsZ0NBQWdDLEVBQUVzRyxRQUFRLENBQUMsQ0FBQzFHLFdBQVcsQ0FBQyxDQUFDO0lBRTVILE1BQU1xTixJQUFJLEdBQUcsTUFBTUQsY0FBYyxFQUFFO0lBRW5DLElBQUksQ0FBQ3lCLFlBQVksR0FBR3hCLElBQUksQ0FBQ3lCLE1BQU0sQ0FBQyxDQUFDekIsSUFBSSxFQUFFckssSUFBSSxLQUFLO01BQzVDcUssSUFBSSxDQUFDckssSUFBSSxDQUFDK0wsU0FBUyxDQUFDLEdBQUcvTCxJQUFJLENBQUNnTSxLQUFLO01BQ2pDLE9BQU8zQixJQUFJO0lBQ2YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRU4sSUFBSSxDQUFDNEIsVUFBVSxDQUFDNUIsSUFBSSxDQUFDO0VBQ3pCO0VBRUE0QixVQUFVLENBQUNDLGFBQWEsRUFBRTtJQUN0QixJQUFJLENBQUNwQixZQUFZLENBQUNxQixrQkFBa0IsQ0FBQyxXQUFXLEVBQUVELGFBQWEsQ0FBQzVNLEdBQUcsQ0FBQ1UsSUFBSSxJQUFLLGtCQUFpQkEsSUFBSSxDQUFDb00sSUFBSyxLQUFJcE0sSUFBSSxDQUFDK0wsU0FBVSxXQUFVLENBQUMsQ0FBQ00sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hKLElBQUksQ0FBQ0MsZUFBZSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0MsZ0JBQWdCLEVBQUU7RUFDM0I7RUFFQUQsZUFBZSxHQUFHO0lBQ2QsSUFBSSxDQUFDRSxtQkFBbUIsR0FBR3hOLDZDQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzhMLFlBQVksQ0FBQztFQUNoRTtFQUVBMkIsVUFBVSxHQUFHO0lBQ1QsTUFBTUMsYUFBYSxHQUFHLElBQUksQ0FBQzVCLFlBQVksQ0FBQzRCLGFBQWE7SUFDckQsTUFBTU4sSUFBSSxHQUFHLElBQUksQ0FBQ0ksbUJBQW1CLENBQUNFLGFBQWEsQ0FBQyxDQUFDelAsS0FBSztJQUMxRCxNQUFNeUcsUUFBUSxHQUFHLElBQUksQ0FBQzhJLG1CQUFtQixDQUFDRSxhQUFhLENBQUMsQ0FBQ0MsU0FBUyxDQUFDQyxJQUFJLEVBQUU7SUFDekUsTUFBTXZDLElBQUksR0FBRytCLElBQUksSUFBSTFJLFFBQVEsR0FBRyxJQUFJLENBQUNtSSxZQUFZLENBQUNuSSxRQUFRLENBQUMsR0FBRyxFQUFFO0lBQ2hFLElBQUksQ0FBQ21KLFdBQVcsQ0FBQ3hDLElBQUksQ0FBQztFQUMxQjtFQUVBd0MsV0FBVyxDQUFDQyxTQUFTLEVBQUU7SUFDbkIsSUFBSUMsT0FBTyxHQUFHLElBQUksQ0FBQzVCLHlCQUF5QixHQUFHMkIsU0FBUyxDQUFDeE4sR0FBRyxDQUFDVSxJQUFJLElBQUssa0JBQWlCQSxJQUFJLENBQUNvTSxJQUFLLEtBQUlwTSxJQUFJLENBQUMrTCxTQUFVLFdBQVUsQ0FBQyxDQUFDTSxJQUFJLENBQUMsRUFBRSxDQUFDO0lBRXhJLElBQUksQ0FBQ3BCLGFBQWEsQ0FBQ3pHLFNBQVMsR0FBR3VJLE9BQU87SUFDdEMsSUFBSSxDQUFDUixnQkFBZ0IsRUFBRTtFQUMzQjtFQUVBQSxnQkFBZ0IsR0FBRztJQUNmLElBQUksQ0FBQ1Msb0JBQW9CLEdBQUdoTyw2Q0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNpTSxhQUFhLENBQUM7RUFDbEU7RUFFQWdDLFVBQVUsQ0FBQzVDLElBQUksRUFBRTtJQUNiLElBQUksQ0FBQ1ksYUFBYSxDQUFDekcsU0FBUyxHQUFHLElBQUksQ0FBQzJHLHlCQUF5QjtJQUM3RCxJQUFJLENBQUNvQixnQkFBZ0IsRUFBRTtFQUMzQjtFQUVBVyxTQUFTLEdBQUc7SUFDUixJQUFJLENBQUNDLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDM0IsSUFBSSxDQUFDRixVQUFVLEVBQUU7SUFDakIsSUFBSSxDQUFDRyxhQUFhLEVBQUU7SUFFcEIsSUFBSSxDQUFDM0MsVUFBVSxDQUFDNU4sT0FBTyxDQUFDd1EsS0FBSyxJQUFJO01BQzdCLE1BQU1DLFFBQVEsR0FBR0QsS0FBSyxDQUFDQyxRQUFRLENBQUNDLFdBQVcsRUFBRTtNQUU3QyxJQUFJRCxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ3ZCRCxLQUFLLENBQUNYLGFBQWEsR0FBRyxDQUFDO01BQzNCLENBQUMsTUFBTTtRQUNILElBQUlXLEtBQUssQ0FBQy9NLElBQUksS0FBSyxVQUFVLEVBQUU7VUFDM0IrTSxLQUFLLENBQUNHLE9BQU8sR0FBRyxLQUFLO1FBQ3pCLENBQUMsTUFBTTtVQUNISCxLQUFLLENBQUNwUSxLQUFLLEdBQUcsRUFBRTtRQUNwQjtNQUNKO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQXdRLFdBQVcsR0FBRztJQUNWLElBQUksSUFBSSxDQUFDbkMsZUFBZSxDQUFDb0MsSUFBSSxJQUFJLENBQUMsRUFBRTtNQUNoQ2xFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztNQUMxQjtJQUNKO0lBRUEsTUFBTW1FLFFBQVEsR0FBRyxJQUFJLENBQUM3QyxZQUFZLENBQUM3TixLQUFLO0lBRXhDLElBQUksQ0FBQzBRLFFBQVEsRUFBRTtJQUVmLE1BQU1DLFFBQVEsR0FBRyxJQUFJLENBQUNwQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMxQixZQUFZLENBQUM0QixhQUFhLENBQUMsQ0FBQ0MsU0FBUztJQUVwRixNQUFNa0IsU0FBUyxHQUFHLElBQUksQ0FBQzVDLGFBQWEsQ0FBQ2hPLEtBQUs7SUFDMUMsTUFBTTZRLFNBQVMsR0FBRyxJQUFJLENBQUNkLG9CQUFvQixDQUFDLElBQUksQ0FBQy9CLGFBQWEsQ0FBQ3lCLGFBQWEsQ0FBQyxDQUFDQyxTQUFTO0lBQ3ZGLE1BQU1vQixRQUFRLEdBQUcsQ0FBQyxFQUFFRCxTQUFTLElBQUlELFNBQVMsQ0FBQztJQUUzQyxNQUFNbkssUUFBUSxHQUFHcUssUUFBUSxHQUFJLEdBQUVILFFBQVMsSUFBR0UsU0FBVSxFQUFDLEdBQUdGLFFBQVE7SUFFakUsSUFBSSxJQUFJLENBQUN0QyxlQUFlLENBQUMwQyxHQUFHLENBQUN0SyxRQUFRLENBQUMsRUFBRTtNQUNwQzhGLEtBQUssQ0FBQyxlQUFlLENBQUM7TUFDdEI7SUFDSjtJQUVBLE1BQU14SixJQUFJLEdBQUcsSUFBSSxDQUFDMkwsb0JBQW9CLENBQ2pDc0MsT0FBTyxDQUFDLFVBQVUsRUFBRUYsUUFBUSxHQUFHLElBQUksQ0FBQzdDLGlCQUFpQixHQUFHLElBQUksQ0FBQ0gsZ0JBQWdCLENBQUMsQ0FDOUVrRCxPQUFPLENBQUMsV0FBVyxFQUFFRixRQUFRLEdBQUdGLFNBQVMsR0FBR0YsUUFBUSxDQUFDLENBQ3JETSxPQUFPLENBQUMsY0FBYyxFQUFFdkssUUFBUSxDQUFDO0lBRXRDLElBQUksQ0FBQzJILFlBQVksQ0FBQ2Msa0JBQWtCLENBQUMsV0FBVyxFQUFFbk0sSUFBSSxDQUFDO0lBRXZELElBQUksQ0FBQ3NMLGVBQWUsQ0FBQ3hOLEdBQUcsQ0FBQzRGLFFBQVEsQ0FBQztFQUN0QztFQUVBd0ssY0FBYyxDQUFDaFIsS0FBSyxFQUFFb08sZUFBZSxFQUFFO0lBQ25DLE1BQU0xUSxNQUFNLEdBQUdzQyxLQUFLLENBQUN0QyxNQUFNLENBQUN1QyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7SUFFckUsSUFBSXZDLE1BQU0sRUFBRTtNQUNSLE1BQU04SSxRQUFRLEdBQUd0RyxnREFBTyxDQUFDLGdDQUFnQyxFQUFFeEMsTUFBTSxDQUFDLENBQUMrUixTQUFTLENBQUNDLElBQUksRUFBRTtNQUVuRmhTLE1BQU0sQ0FBQ2dDLE1BQU0sRUFBRTtNQUNmME8sZUFBZSxDQUFDNkMsTUFBTSxDQUFDekssUUFBUSxDQUFDO0lBQ3BDO0VBQ0o7RUFFQTBKLGFBQWEsR0FBRztJQUNaLElBQUksQ0FBQy9CLFlBQVksQ0FBQzdHLFNBQVMsR0FBRyxFQUFFO0lBQ2hDLElBQUksQ0FBQzhHLGVBQWUsQ0FBQzhDLEtBQUssRUFBRTtFQUNoQztFQUVBakIsWUFBWSxDQUFDa0IsTUFBTSxFQUFFO0lBQ2pCLE1BQU1DLFdBQVcsR0FBRyxnQ0FBZ0M7SUFFcEQsSUFBSUQsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDRSxRQUFRLENBQUNGLE1BQU0sQ0FBQyxFQUFFO01BQzlDLElBQUksQ0FBQzNELFVBQVUsQ0FBQ25PLFNBQVMsQ0FBQzhSLE1BQU0sQ0FBQyxDQUFDQyxXQUFXLENBQUM7SUFDbEQsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDNUQsVUFBVSxDQUFDbk8sU0FBUyxDQUFDRixNQUFNLENBQUNpUyxXQUFXLENBQUM7SUFDakQ7SUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDNUQsVUFBVSxDQUFDbk8sU0FBUyxDQUFDQyxRQUFRLENBQUM4UixXQUFXLENBQUMsRUFBRTtNQUNsRDFQLE1BQU0sQ0FBQzRQLE1BQU0sQ0FBQztRQUNWck4sR0FBRyxFQUFFSCxrREFBUyxDQUFDLElBQUksQ0FBQzlCLE9BQU8sQ0FBQyxDQUFDaUMsR0FBRyxHQUFHLElBQUksQ0FBQ29KLFlBQVk7UUFDcEQxQyxRQUFRLEVBQUU7TUFDZCxDQUFDLENBQUM7SUFDTjtFQUNKO0VBRUFoSSxVQUFVLEdBQUc7SUFDVCxDQUFDLE1BQU07TUFDSCxNQUFNNE8sb0JBQW9CLEdBQUd6UCw2Q0FBSSxDQUFDLHNEQUFzRCxDQUFDO01BQ3pGLE1BQU0wUCxNQUFNLEdBQUcsSUFBSSxDQUFDakUsVUFBVSxDQUFDa0UsTUFBTSxDQUFDdEIsS0FBSyxJQUFJQSxLQUFLLENBQUMvTSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUNtTyxvQkFBb0IsQ0FBQ0YsUUFBUSxDQUFDbEIsS0FBSyxDQUFDLENBQUM7TUFDN0dxQixNQUFNLENBQUM3UixPQUFPLENBQUN3USxLQUFLLElBQUloUSwyQ0FBRSxDQUFDZ1EsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNO1FBQzdDQSxLQUFLLENBQUNwUSxLQUFLLEdBQUdvUSxLQUFLLENBQUNwUSxLQUFLLENBQUNnUixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztNQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsR0FBRztJQUVKLENBQUMsTUFBTTtNQUNILE1BQU1RLG9CQUFvQixHQUFHelAsNkNBQUksQ0FBQywrQ0FBK0MsQ0FBQztNQUNsRixNQUFNLENBQUM0UCxLQUFLLEVBQUVDLEdBQUcsRUFBRUMsVUFBVSxFQUFFQyxRQUFRLENBQUMsR0FBR04sb0JBQW9CO01BQy9ELE1BQU1PLFVBQVUsR0FBRyxDQUFDQyxTQUFTLEVBQUU1QixLQUFLLEtBQUs7UUFDckNoUSwyQ0FBRSxDQUFDNFIsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNO1VBQ3pCLE1BQU1oUyxLQUFLLEdBQUdnUyxTQUFTLENBQUNoUyxLQUFLLENBQUNnUixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztVQUNoRFosS0FBSyxDQUFDcFEsS0FBSyxHQUFHQSxLQUFLO1VBQ25CZ1MsU0FBUyxDQUFDaFMsS0FBSyxHQUFHQSxLQUFLLENBQUNnUixPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDO1FBQ2pFLENBQUMsQ0FBQztNQUNOLENBQUM7TUFDRGUsVUFBVSxDQUFDRixVQUFVLEVBQUVGLEtBQUssQ0FBQztNQUM3QkksVUFBVSxDQUFDRCxRQUFRLEVBQUVGLEdBQUcsQ0FBQztJQUM3QixDQUFDLEdBQUc7SUFFSixDQUFDLE1BQU07TUFDSCxNQUFNSyxZQUFZLEdBQUc5UixnREFBTyxDQUFDLGdDQUFnQyxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztNQUU1RTdCLDJDQUFFLENBQUM2UixZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQ2hDLFNBQVMsQ0FBQzFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDLEdBQUc7SUFFSixDQUFDLE1BQU07TUFDSCxNQUFNMlEsYUFBYSxHQUFHL1IsZ0RBQU8sQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7TUFFOUU3QiwyQ0FBRSxDQUFDOFIsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUNoQyxZQUFZLENBQUMzTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxHQUFHO0lBRUpuQiwyQ0FBRSxDQUFDLElBQUksQ0FBQ3lOLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDMkIsVUFBVSxDQUFDak8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNEbkIsMkNBQUUsQ0FBQyxJQUFJLENBQUMrTixrQkFBa0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDcUMsV0FBVyxDQUFDalAsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFa0MsaURBQVEsQ0FBQyxJQUFJLENBQUMySyxZQUFZLEVBQUUsa0NBQWtDLEVBQUUsT0FBTyxFQUFHbk8sS0FBSyxJQUFLLElBQUksQ0FBQ2dSLGNBQWMsQ0FBQ2hSLEtBQUssRUFBRSxJQUFJLENBQUNvTyxlQUFlLENBQUMsQ0FBQztFQUN6STtBQUNKLENBQUM7QUFFRCxNQUFNOEQsdUJBQXVCLEdBQUcsTUFBTTtFQUNsQyxNQUFNQyxPQUFPLEdBQUdqUyxnREFBTyxDQUFDLHdCQUF3QixDQUFDO0VBRWpELElBQUksQ0FBQ2lTLE9BQU8sRUFBRTtFQUVkaFMsMkNBQUUsQ0FBQ3VCLE1BQU0sRUFBRSxTQUFTLEVBQUcxQixLQUFLLElBQUs7SUFDN0IsTUFBTW9TLE9BQU8sR0FBR3BTLEtBQUssQ0FBQ21OLElBQUk7SUFFMUIsSUFBSWlGLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxZQUFZLEVBQUU7TUFDakNGLE9BQU8sQ0FBQ2xULEtBQUssQ0FBQ3FULE9BQU8sR0FBSSw2QkFBNEJGLE9BQU8sQ0FBQ0MsWUFBYSxJQUFHO0lBQ2pGO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU1FLFlBQVksR0FBRyxNQUFNO0VBQ3ZCO0VBQ0EsTUFBTUMsV0FBVyxHQUFHdFMsZ0RBQU8sQ0FBQyxlQUFlLENBQUM7RUFDNUMsTUFBTXVTLEtBQUssR0FBR3ZTLGdEQUFPLENBQUMsaUJBQWlCLEVBQUVzUyxXQUFXLENBQUM7RUFFckRyUywyQ0FBRSxDQUFDc1MsS0FBSyxFQUFFLE9BQU8sRUFBR3pTLEtBQUssSUFBSztJQUMxQkEsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO0lBRXRCSyxNQUFNLENBQUNmLElBQUksQ0FBQzhSLEtBQUssQ0FBQ2hKLElBQUksRUFBRSxhQUFhLEVBQUUscUNBQXFDLENBQUM7RUFDakYsQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLE1BQU1yRSxxQkFBcUIsR0FBRyxNQUFNO0VBQ2hDLElBQUlnSSxhQUFhLEVBQUU7RUFFbkI3RCxxREFBWSxFQUFFO0FBQ2xCLENBQUM7O0FBRUQ7QUFDQSxNQUFNbEUsaUJBQWlCLEdBQUcsTUFBTTtFQUM1QmtFLHFEQUFZLEVBQUU7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBLE1BQU1qRSxxQkFBcUIsR0FBRyxNQUFNO0VBQ2hDLE1BQU1rTixXQUFXLEdBQUd0UyxnREFBTyxDQUFDLGVBQWUsQ0FBQzs7RUFFNUM7RUFDQSxDQUFDLE1BQU07SUFDSCxNQUFNd1MsbUJBQW1CLEdBQUd4UyxnREFBTyxDQUFDLFNBQVMsRUFBRXNTLFdBQVcsQ0FBQztJQUMzRCxNQUFNbFUsS0FBSyxHQUFHd0QsNkNBQUksQ0FBQyxlQUFlLEVBQUUwUSxXQUFXLENBQUM7SUFFaEQsSUFBR2xVLEtBQUssQ0FBQ08sTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNqQjZULG1CQUFtQixDQUFDclQsU0FBUyxDQUFDdUIsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUMzQztJQUNKO0lBRUEsTUFBTW1KLFFBQVEsR0FBRyxJQUFJL0MsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFc1MsV0FBVyxDQUFDLEVBQUU7TUFDekQ7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0FuSyxhQUFhLEVBQUUsTUFBTTtNQUNyQnNLLGNBQWMsRUFBRSxJQUFJO01BRXBCbkssVUFBVSxFQUFFO1FBQ1JDLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkJyRixJQUFJLEVBQUUsVUFBVTtRQUNoQndQLHFCQUFxQixFQUFFLFVBQVVDLE1BQU0sRUFBRTtVQUNyQyxPQUFPLEdBQUcsR0FBR0EsTUFBTTtRQUN2QixDQUFDO1FBQ0RDLG1CQUFtQixFQUFFLFVBQVVELE1BQU0sRUFBRTtVQUNuQyxPQUFPLEdBQUcsR0FBR0EsTUFBTTtRQUN2QjtNQUNKLENBQUM7TUFFRDFTLEVBQUUsRUFBRTtRQUNBcEIsSUFBSSxHQUFHO1VBQ0htQixnREFBTyxDQUFDLGlCQUFpQixFQUFFc1MsV0FBVyxDQUFDLENBQUNPLE1BQU0sR0FBRyxLQUFLO1FBQzFEO01BQ0osQ0FBQztNQUVEckssT0FBTyxFQUFFLENBQUN6Qiw0Q0FBUSxFQUFFRSw4Q0FBVSxFQUFFNkYsOENBQVU7SUFDOUMsQ0FBQyxDQUFDO0lBRUYsTUFBTWdHLG1CQUFtQixHQUFHLElBQUloTSw4Q0FBTSxDQUFDOUcsZ0RBQU8sQ0FBQyxTQUFTLEVBQUVzUyxXQUFXLENBQUMsRUFBRTtNQUNwRTtNQUNBbkssYUFBYSxFQUFFLE1BQU07TUFDckJzSyxjQUFjLEVBQUUsSUFBSTtNQUNwQm5LLFVBQVUsRUFBRTtRQUNSQyxFQUFFLEVBQUUscUJBQXFCO1FBQ3pCckYsSUFBSSxFQUFFO01BQ1YsQ0FBQztNQUVEc0YsT0FBTyxFQUFFLENBQUN2Qiw4Q0FBVSxFQUFFNkYsOENBQVU7SUFDcEMsQ0FBQyxDQUFDO0lBRUZqRCxRQUFRLENBQUNrSixVQUFVLENBQUNqVixPQUFPLEdBQUdnVixtQkFBbUI7RUFDckQsQ0FBQyxHQUFHOztFQUVKO0VBQ0EsQ0FBQyxNQUFNO0lBQ0gsTUFBTXBULE1BQU0sR0FBR00sZ0RBQU8sQ0FBQyxzQkFBc0IsRUFBRXNTLFdBQVcsQ0FBQztJQUMzRCxNQUFNNUgsS0FBSyxHQUFHLElBQUlySyw4Q0FBSyxFQUFFO0lBQ3pCLE1BQU0yUyxZQUFZLEdBQUdoVCxnREFBTyxDQUFDLHFCQUFxQixDQUFDO0lBRW5ELE1BQU1pVCxVQUFVLENBQUM7TUFDYjFWLFdBQVcsQ0FBQ0MsTUFBTSxFQUFFO1FBQ2hCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO1FBQ3BCLElBQUksQ0FBQ3NFLE9BQU8sR0FBRzlCLGdEQUFPLENBQUN4QyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDNFAsSUFBSSxHQUFHcE4sZ0RBQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO1FBQ3pDLElBQUksQ0FBQ29SLE9BQU8sR0FBR3RSLDZDQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDRSxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDckQsSUFBSSxHQUFHdUIsZ0RBQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO1FBQzFDLElBQUksQ0FBQ3FSLFVBQVUsR0FBR25ULGdEQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztRQUN2RCxJQUFJLENBQUNzUixTQUFTLEdBQUdwVCxnREFBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7UUFDckQsSUFBSSxDQUFDdVIsV0FBVyxHQUFHclQsZ0RBQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO1FBQ3pELElBQUksQ0FBQ3dSLFNBQVMsR0FBR3RULGdEQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQyxDQUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDcEMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO1FBQzFHLElBQUksQ0FBQzRWLE1BQU0sR0FBR3ZULGdEQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMwUixHQUFHLEdBQUc1Uiw2Q0FBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUNFLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMyUixJQUFJLEdBQUcsSUFBSSxDQUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQ0UsSUFBSSxHQUFHLElBQUksQ0FBQ0YsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUNHLElBQUksR0FBRyxJQUFJLENBQUNILEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDSSxPQUFPLEdBQUc1VCxnREFBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7UUFDakQsSUFBSSxDQUFDN0QsS0FBSyxHQUFHK0IsZ0RBQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7UUFDMUQsSUFBSSxDQUFDK1IsUUFBUSxHQUFHN1QsZ0RBQU8sQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7UUFDbkUsSUFBSSxDQUFDZ1MsT0FBTyxHQUFHbFMsNkNBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUNFLE9BQU8sQ0FBQztRQUMzRCxJQUFJLENBQUNpUyxZQUFZLEdBQUcvVCxnREFBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztRQUMzRCxJQUFJLENBQUNoRCxRQUFRLEVBQUU7TUFDbkI7TUFFQWtWLEtBQUssR0FBRztRQUNKLElBQUksQ0FBQzVHLElBQUksQ0FBQzRHLEtBQUssRUFBRTtRQUNqQixJQUFJLENBQUNULE1BQU0sQ0FBQ3BVLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDdkM7TUFFQXVULE9BQU8sR0FBRztRQUNOLElBQUksQ0FBQyxJQUFJLENBQUN4VixJQUFJLENBQUNvQixLQUFLLENBQUMyUCxJQUFJLEVBQUUsQ0FBQzdRLE1BQU0sRUFBRTtVQUNoQ3lOLEtBQUssQ0FBQyxZQUFZLENBQUM7VUFDbkIsSUFBSSxDQUFDM04sSUFBSSxDQUFDeVYsS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxhQUFhLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNWLElBQUksQ0FBQzVULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDN0NwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3FILElBQUksQ0FBQ1MsS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxTQUFTLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNULElBQUksQ0FBQzdULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDekNwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3NILElBQUksQ0FBQ1EsS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxTQUFTLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNSLElBQUksQ0FBQzlULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDekNwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3VILElBQUksQ0FBQ08sS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxJQUFJLENBQUNmLFVBQVUsQ0FBQ3RULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDN1EsTUFBTSxFQUFFO1VBQ3RDeU4sS0FBSyxDQUFDLGdCQUFnQixDQUFDO1VBQ3ZCLElBQUksQ0FBQytHLFVBQVUsQ0FBQ2UsS0FBSyxFQUFFO1VBRXZCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ2YsU0FBUyxDQUFDdlQsS0FBSyxDQUFDMlAsSUFBSSxFQUFFLENBQUMsRUFBRTtVQUN0RXBELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztVQUMzQixJQUFJLENBQUNnSCxTQUFTLENBQUNjLEtBQUssRUFBRTtVQUV0QixPQUFPLEtBQUs7UUFDaEI7UUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDalcsS0FBSyxDQUFDNEIsS0FBSyxDQUFDMlAsSUFBSSxFQUFFLEVBQUU7VUFDMUJwRCxLQUFLLENBQUMsWUFBWSxDQUFDO1VBQ25CLElBQUksQ0FBQ25PLEtBQUssQ0FBQ2lXLEtBQUssRUFBRTtVQUVsQixPQUFPLEtBQUs7UUFDaEI7UUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDTCxRQUFRLENBQUNoVSxLQUFLLENBQUMyUCxJQUFJLEVBQUUsRUFBRTtVQUM3QnBELEtBQUssQ0FBQyxZQUFZLENBQUM7VUFDbkIsSUFBSSxDQUFDeUgsUUFBUSxDQUFDSyxLQUFLLEVBQUU7VUFFckIsT0FBTyxLQUFLO1FBQ2hCO1FBRUEsSUFBSSxDQUFDLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzlDLE9BQU8sRUFBRTtVQUMxQmhFLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQztVQUVoQyxPQUFPLEtBQUs7UUFDaEI7UUFFQSxJQUFJLElBQUksQ0FBQzBILE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ2pVLEtBQUssS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDaVUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDalUsS0FBSyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUNpVSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNqVSxLQUFLLEtBQUssRUFBRSxFQUFFO1VBRTlGLElBQUksQ0FBQyxJQUFJLENBQUNrVSxZQUFZLENBQUMzRCxPQUFPLEVBQUU7WUFDNUJoRSxLQUFLLENBQUMseUJBQXlCLENBQUM7WUFFaEMsT0FBTyxLQUFLO1VBQ2hCO1FBRUo7UUFFQSxPQUFPLElBQUk7TUFDZjtNQUVBdE4sUUFBUSxHQUFHO1FBRVBtQiwyQ0FBRSxDQUFDLElBQUksQ0FBQ29ULFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTTtVQUNqQyxJQUFJLENBQUNELFNBQVMsQ0FBQ3ZULEtBQUssR0FBRyxJQUFJLENBQUN3VCxXQUFXLENBQUN4VCxLQUFLLENBQUMyUCxJQUFJLEVBQUU7UUFDeEQsQ0FBQyxDQUFDO1FBRUZ2UCwyQ0FBRSxDQUFDLElBQUksQ0FBQ21OLElBQUksRUFBRSxRQUFRLEVBQUd0TixLQUFLLElBQUs7VUFDL0JBLEtBQUssQ0FBQ3FCLGNBQWMsRUFBRTtVQUV0QixJQUFJLElBQUksQ0FBQzhTLE9BQU8sRUFBRSxFQUFFO1lBRWhCLElBQUksQ0FBQ1gsU0FBUyxDQUFDelQsS0FBSyxHQUFJLEdBQUUsSUFBSSxDQUFDc1QsVUFBVSxDQUFDdFQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLElBQUcsSUFBSSxDQUFDNEQsU0FBUyxDQUFDdlQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLEVBQUM7WUFFdkYsSUFBSSxDQUFDb0UsT0FBTyxDQUFDL1QsS0FBSyxHQUFJLEdBQUUsSUFBSSxDQUFDNFQsSUFBSSxDQUFDNVQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLElBQUcsSUFBSSxDQUFDa0UsSUFBSSxDQUFDN1QsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLElBQUcsSUFBSSxDQUFDbUUsSUFBSSxDQUFDOVQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLEVBQUM7WUFFcEcsSUFBSSxDQUFDcEMsSUFBSSxDQUFDZ0gsTUFBTSxFQUFFO1VBQ3RCO1FBQ0osQ0FBQyxDQUFDO01BQ047SUFFSjtJQUVBLE1BQU1DLFdBQVcsR0FBRyxJQUFJcEIsVUFBVSxDQUFDLHFCQUFxQixDQUFDO0lBRXpEdlQsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUNuQzBVLFdBQVcsQ0FBQ0wsS0FBSyxFQUFFO01BRW5CdEosS0FBSyxDQUFDakssSUFBSSxDQUFDdVMsWUFBWSxDQUFDO0lBQzVCLENBQUMsQ0FBQztFQUdOLENBQUMsR0FBRztFQUVKaEIsdUJBQXVCLEVBQUU7RUFDekJLLFlBQVksRUFBRTtFQUNkcEgsZ0RBQU8sRUFBRTtBQUNiLENBQUM7O0FBRUQ7QUFDQSxNQUFNNUYsaUJBQWlCLEdBQUcsTUFBTTtFQUM1QjJNLHVCQUF1QixFQUFFO0VBQ3pCSyxZQUFZLEVBQUU7RUFDZHBILGdEQUFPLEVBQUU7QUFDYixDQUFDOztBQUVEO0FBQ0EsTUFBTTNGLG1CQUFtQixHQUFHLE1BQU07RUFDOUIsTUFBTWdQLFVBQVUsR0FBR3RVLGdEQUFPLENBQUMsd0JBQXdCLENBQUM7RUFDcEQsTUFBTTBLLEtBQUssR0FBRyxJQUFJckssOENBQUssRUFBRTtFQUN6QixNQUFNa1UsUUFBUSxHQUFHM1MsNkNBQUksQ0FBQyw4QkFBOEIsRUFBRTBTLFVBQVUsQ0FBQztFQUNqRSxNQUFNRSxLQUFLLEdBQUdDLE9BQU8sSUFBSUEsT0FBTyxDQUFDcFMsWUFBWSxDQUFDLE1BQU0sQ0FBQztFQUNyRCxNQUFNd1IsUUFBUSxHQUFHVSxRQUFRLENBQUM3RixNQUFNLENBQUMsQ0FBQ21GLFFBQVEsRUFBRVksT0FBTyxLQUFLO0lBQ3BELE1BQU1DLEVBQUUsR0FBR0YsS0FBSyxDQUFDQyxPQUFPLENBQUM7SUFDekIsTUFBTW5OLE9BQU8sR0FBR3RILGdEQUFPLENBQUMwVSxFQUFFLENBQUM7SUFFM0JiLFFBQVEsQ0FBQ2EsRUFBRSxDQUFDLEdBQUdwTixPQUFPO0lBRXRCLE9BQU91TSxRQUFRO0VBQ25CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUVOVSxRQUFRLENBQUM5VSxPQUFPLENBQUVnVixPQUFPLElBQUs7SUFDMUJ4VSwyQ0FBRSxDQUFDd1UsT0FBTyxFQUFFLE9BQU8sRUFBRzNVLEtBQUssSUFBSztNQUM1QkEsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO01BRXRCLE1BQU11VCxFQUFFLEdBQUdGLEtBQUssQ0FBQ0MsT0FBTyxDQUFDO01BQ3pCLE1BQU1uTixPQUFPLEdBQUd1TSxRQUFRLENBQUNhLEVBQUUsQ0FBQztNQUU1QmhLLEtBQUssQ0FBQ2pLLElBQUksQ0FBQzZHLE9BQU8sQ0FBQztJQUN2QixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFDTixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BmMkM7QUFDbkI7QUFDbUQ7O0FBRTVFO0FBQ0EsTUFBTXRDLFFBQVEsR0FBRyxNQUFNO0VBQ25CLE1BQU0yUCxLQUFLLEdBQUczVSxnREFBTyxDQUFDLFFBQVEsQ0FBQzs7RUFFL0I7RUFDQSxDQUFDLE1BQU07SUFDSCxNQUFNd0csR0FBRyxHQUFHLElBQUkzRSw0Q0FBRyxDQUFDN0IsZ0RBQU8sQ0FBQyxNQUFNLEVBQUUyVSxLQUFLLENBQUMsQ0FBQztJQUMzQ25PLEdBQUcsQ0FBQ3hFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzRFLEtBQUssRUFBRTtFQUN4QixDQUFDLEdBQUc7O0VBRUo7RUFDQSxNQUFNNUIsUUFBUSxHQUFHaEYsZ0RBQU8sQ0FBQyxZQUFZLENBQUM7RUFDdEM7RUFDQSxNQUFNZ0MsS0FBSyxHQUFHLENBQ1Ysb0pBQW9KLEVBQ3BKLDRJQUE0SSxFQUM1SSx5SUFBeUksRUFDekksaUpBQWlKLENBQ3BKOztFQUVEO0VBQ0E7O0VBRUEsTUFBTTZILFFBQVEsR0FBRyxJQUFJL0MsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsa0NBQWtDLEVBQUVnRixRQUFRLENBQUMsRUFBRTtJQUMzRTtJQUNBaUQsSUFBSSxFQUFFLElBQUk7SUFFVjZCLFFBQVEsRUFBRTtNQUNOQyxLQUFLLEVBQUUsS0FBSztNQUNaQyxvQkFBb0IsRUFBRTtJQUMxQixDQUFDO0lBRUQxQixVQUFVLEVBQUU7TUFDUkMsRUFBRSxFQUFFLGVBQWU7TUFDbkJxTSxTQUFTLEVBQUUsSUFBSTtNQUNmMVIsSUFBSSxFQUFFLFNBQVM7TUFDZjJSLFlBQVksQ0FBQy9ULEtBQUssRUFBRWdVLFNBQVMsRUFBRTtRQUMzQixPQUFRO0FBQzVCLHdEQUF3REEsU0FBVTtBQUNsRTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI5UyxLQUFLLENBQUNsQixLQUFLLENBQUU7QUFDM0MsK0JBQStCO01BQ2Y7SUFDSixDQUFDO0lBRUQwSCxPQUFPLEVBQUUsQ0FBQ3pCLDRDQUFRLEVBQUVFLDhDQUFVLEVBQUVELDhDQUFVLEVBQUU4Riw4Q0FBVTtFQUMxRCxDQUFDLENBQ0o7RUFFRCxNQUFNaUksWUFBWSxHQUFHLElBQUlqTyw4Q0FBTSxDQUFDOUcsZ0RBQU8sQ0FBQyxpQ0FBaUMsRUFBRWdGLFFBQVEsQ0FBQyxFQUFFO0lBQ2xGaUQsSUFBSSxFQUFFLElBQUk7SUFDVk8sT0FBTyxFQUFFLENBQUNzRSw4Q0FBVSxDQUFDO0lBQ3JCekUsYUFBYSxFQUFFO0VBQ25CLENBQUMsQ0FBQztFQUVGd0IsUUFBUSxDQUFDa0osVUFBVSxDQUFDalYsT0FBTyxHQUFHaVgsWUFBWTtBQUc5QyxDQUFDOztBQUVEO0FBQ0EsTUFBTTlQLHNCQUFzQixHQUFHLE1BQU07RUFDakMsTUFBTTBQLEtBQUssR0FBRzNVLGdEQUFPLENBQUMsUUFBUSxDQUFDO0VBRS9CLE1BQU1pVCxVQUFVLENBQUM7SUFDYjFWLFdBQVcsQ0FBQ0MsTUFBTSxFQUFFO01BQ2hCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO01BQ3BCLElBQUksQ0FBQ3NFLE9BQU8sR0FBRzlCLGdEQUFPLENBQUN4QyxNQUFNLENBQUM7TUFDOUIsSUFBSSxDQUFDNFAsSUFBSSxHQUFHcE4sZ0RBQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO01BQ3pDLElBQUksQ0FBQ2tULEtBQUssR0FBR3BULDZDQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ0UsT0FBTyxDQUFDO01BQ3pDLElBQUksQ0FBQ21ULElBQUksR0FBR2pWLGdEQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztNQUMxQyxJQUFJLENBQUNvVCxTQUFTLEdBQUdsVixnREFBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQ2lWLElBQUksQ0FBQztNQUN6RCxJQUFJLENBQUNFLFFBQVEsR0FBR25WLGdEQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ2lWLElBQUksQ0FBQztNQUN4QyxJQUFJLENBQUMvQixPQUFPLEdBQUd0Uiw2Q0FBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQ0UsT0FBTyxDQUFDO01BQ25ELElBQUksQ0FBQ3JELElBQUksR0FBR3VCLGdEQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztNQUMxQyxJQUFJLENBQUNxUixVQUFVLEdBQUduVCxnREFBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7TUFDdkQsSUFBSSxDQUFDc1IsU0FBUyxHQUFHcFQsZ0RBQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO01BQ3JELElBQUksQ0FBQ3VSLFdBQVcsR0FBR3JULGdEQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQzhCLE9BQU8sQ0FBQztNQUN6RCxJQUFJLENBQUN3UixTQUFTLEdBQUd0VCxnREFBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUMsQ0FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQ3BDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztNQUMxRyxJQUFJLENBQUM0VixNQUFNLEdBQUd2VCxnREFBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM4QixPQUFPLENBQUM7TUFDL0MsSUFBSSxDQUFDMFIsR0FBRyxHQUFHNVIsNkNBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDRSxPQUFPLENBQUM7TUFDckMsSUFBSSxDQUFDMlIsSUFBSSxHQUFHLElBQUksQ0FBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN2QixJQUFJLENBQUNFLElBQUksR0FBRyxJQUFJLENBQUNGLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDdkIsSUFBSSxDQUFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQ3ZCLElBQUksQ0FBQ0ksT0FBTyxHQUFHNVQsZ0RBQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO01BQ2pELElBQUksQ0FBQzdELEtBQUssR0FBRytCLGdEQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO01BQ3pELElBQUksQ0FBQytSLFFBQVEsR0FBRzdULGdEQUFPLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDOEIsT0FBTyxDQUFDO01BRXpELElBQUksQ0FBQ3NULGVBQWUsR0FBRyxLQUFLO01BQzVCLElBQUksQ0FBQzlFLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUk7TUFFNUIsSUFBSSxDQUFDeFIsUUFBUSxFQUFFO0lBQ25CO0lBRUFrVixLQUFLLEdBQUc7TUFDSixJQUFJLENBQUM1RyxJQUFJLENBQUM0RyxLQUFLLEVBQUU7TUFDakIsSUFBSSxDQUFDVCxNQUFNLENBQUNwVSxTQUFTLENBQUN1QixHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3ZDO0lBRUEyVSxXQUFXLENBQUNKLElBQUksRUFBRTtNQUNkLElBQUlBLElBQUksQ0FBQzNFLElBQUksSUFBSSxJQUFJLENBQUNBLElBQUksRUFBRTtRQUN4QmxFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUU1QixPQUFPLEtBQUs7TUFDaEI7TUFFQSxJQUFJLENBQUMsZ0RBQWdELENBQUMrSCxJQUFJLENBQUNjLElBQUksQ0FBQ3hXLElBQUksQ0FBQyxFQUFFO1FBQ25FMk4sS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBRXZCLE9BQU8sS0FBSztNQUNoQjtNQUVBLE9BQU8sSUFBSTtJQUNmO0lBRUFrSixVQUFVLEdBQUc7TUFDVCxJQUFJLENBQUNKLFNBQVMsQ0FBQ3JWLEtBQUssR0FBRyxFQUFFO01BQ3pCLElBQUksQ0FBQ3NWLFFBQVEsQ0FBQy9OLFNBQVMsR0FBRyxFQUFFO0lBQ2hDO0lBRUE2TSxPQUFPLEdBQUc7TUFDTixJQUFJLENBQUMsSUFBSSxDQUFDeFYsSUFBSSxDQUFDb0IsS0FBSyxDQUFDMlAsSUFBSSxFQUFFLENBQUM3USxNQUFNLEVBQUU7UUFDaEN5TixLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ25CLElBQUksQ0FBQzNOLElBQUksQ0FBQ3lWLEtBQUssRUFBRTtRQUVqQixPQUFPLEtBQUs7TUFDaEI7TUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDZixVQUFVLENBQUN0VCxLQUFLLENBQUMyUCxJQUFJLEVBQUUsQ0FBQzdRLE1BQU0sRUFBRTtRQUN0Q3lOLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixJQUFJLENBQUMrRyxVQUFVLENBQUNlLEtBQUssRUFBRTtRQUV2QixPQUFPLEtBQUs7TUFDaEI7TUFFQSxJQUFJLENBQUMsaUNBQWlDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNmLFNBQVMsQ0FBQ3ZULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDdEVwRCxLQUFLLENBQUMsb0JBQW9CLENBQUM7UUFDM0IsSUFBSSxDQUFDZ0gsU0FBUyxDQUFDYyxLQUFLLEVBQUU7UUFFdEIsT0FBTyxLQUFLO01BQ2hCO01BRUEsSUFBSSxJQUFJLENBQUNrQixlQUFlLEVBQUU7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUNWLElBQUksQ0FBQzVULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDN0NwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3FILElBQUksQ0FBQ1MsS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxTQUFTLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNULElBQUksQ0FBQzdULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDekNwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3NILElBQUksQ0FBQ1EsS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtRQUVBLElBQUksQ0FBQyxTQUFTLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNSLElBQUksQ0FBQzlULEtBQUssQ0FBQzJQLElBQUksRUFBRSxDQUFDLEVBQUU7VUFDekNwRCxLQUFLLENBQUMsYUFBYSxDQUFDO1VBQ3BCLElBQUksQ0FBQ3VILElBQUksQ0FBQ08sS0FBSyxFQUFFO1VBRWpCLE9BQU8sS0FBSztRQUNoQjtNQUNKO01BRUEsSUFBSSxDQUFDLElBQUksQ0FBQ2pXLEtBQUssQ0FBQzRCLEtBQUssQ0FBQzJQLElBQUksRUFBRSxFQUFFO1FBQzFCcEQsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNuQixJQUFJLENBQUNuTyxLQUFLLENBQUNpVyxLQUFLLEVBQUU7UUFFbEIsT0FBTyxLQUFLO01BQ2hCO01BRUEsSUFBSSxDQUFDLElBQUksQ0FBQ0wsUUFBUSxDQUFDaFUsS0FBSyxDQUFDMlAsSUFBSSxFQUFFLEVBQUU7UUFDN0JwRCxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ25CLElBQUksQ0FBQ3lILFFBQVEsQ0FBQ0ssS0FBSyxFQUFFO1FBRXJCLE9BQU8sS0FBSztNQUNoQjtNQUVBLElBQUksQ0FBQyxJQUFJLENBQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM5QyxPQUFPLEVBQUU7UUFDMUJoRSxLQUFLLENBQUMsOEJBQThCLENBQUM7UUFFckMsT0FBTyxLQUFLO01BQ2hCO01BRUEsT0FBTyxJQUFJO0lBQ2Y7SUFFQXROLFFBQVEsR0FBRztNQUNQbUIsMkNBQUUsQ0FBQyxJQUFJLENBQUNpVixTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU07UUFDL0IsTUFBTUssVUFBVSxHQUFHLElBQUksQ0FBQ0wsU0FBUyxDQUFDTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksSUFBSSxDQUFDSCxXQUFXLENBQUNFLFVBQVUsQ0FBQyxFQUFFO1VBQzlCLElBQUksQ0FBQ0osUUFBUSxDQUFDL04sU0FBUyxHQUFJLGFBQVltTyxVQUFVLENBQUM5VyxJQUFLLDREQUEyRDtRQUN0SDtNQUNKLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ3VXLEtBQUssQ0FBQ3ZWLE9BQU8sQ0FBQyxDQUFDZ1csS0FBSyxFQUFFM1UsS0FBSyxLQUFLO1FBQ2pDYiwyQ0FBRSxDQUFDd1YsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNO1VBQ3RCLElBQUksQ0FBQ0wsZUFBZSxHQUFHLENBQUMsQ0FBQ3RVLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSztVQUM3QyxJQUFJLENBQUN5UyxNQUFNLENBQUNwVSxTQUFTLENBQUMyQixLQUFLLEtBQUssQ0FBQyxHQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDcEUsQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO01BRUZiLDJDQUFFLENBQUMsSUFBSSxDQUFDb1QsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNO1FBQ2pDLElBQUksQ0FBQ0QsU0FBUyxDQUFDdlQsS0FBSyxHQUFHLElBQUksQ0FBQ3dULFdBQVcsQ0FBQ3hULEtBQUssQ0FBQzJQLElBQUksRUFBRTtNQUN4RCxDQUFDLENBQUM7TUFFRnZQLDJDQUFFLENBQUMsSUFBSSxDQUFDNkIsT0FBTyxFQUFFLE9BQU8sRUFBR2hDLEtBQUssSUFBSztRQUNqQyxJQUFJLENBQUMsQ0FBQ0EsS0FBSyxDQUFDdEMsTUFBTSxDQUFDdUMsT0FBTyxDQUFFLGlCQUFnQixDQUFDLEVBQUU7VUFDM0MsSUFBSSxDQUFDdVYsVUFBVSxFQUFFO1FBQ3JCO1FBRUEsSUFBSSxDQUFDLENBQUN4VixLQUFLLENBQUN0QyxNQUFNLENBQUN1QyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRTtVQUNqRCxJQUFJLElBQUksQ0FBQ2tVLE9BQU8sRUFBRSxFQUFFO1lBQ2hCLElBQUl5QixPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Y0FDdEIsSUFBSSxDQUFDcEMsU0FBUyxDQUFDelQsS0FBSyxHQUFJLEdBQUUsSUFBSSxDQUFDc1QsVUFBVSxDQUFDdFQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLElBQUcsSUFBSSxDQUFDNEQsU0FBUyxDQUFDdlQsS0FBSyxDQUFDMlAsSUFBSSxFQUFHLEVBQUM7Y0FFdkYsSUFBSSxJQUFJLENBQUM0RixlQUFlLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQ3hCLE9BQU8sQ0FBQy9ULEtBQUssR0FBSSxHQUFFLElBQUksQ0FBQzRULElBQUksQ0FBQzVULEtBQUssQ0FBQzJQLElBQUksRUFBRyxJQUFHLElBQUksQ0FBQ2tFLElBQUksQ0FBQzdULEtBQUssQ0FBQzJQLElBQUksRUFBRyxJQUFHLElBQUksQ0FBQ21FLElBQUksQ0FBQzlULEtBQUssQ0FBQzJQLElBQUksRUFBRyxFQUFDO2NBQ3hHO2NBRUEsSUFBSSxDQUFDcEMsSUFBSSxDQUFDZ0gsTUFBTSxFQUFFO1lBQ3RCO1VBQ0o7UUFDSjtNQUNKLENBQUMsQ0FBQztNQUVGblUsMkNBQUUsQ0FBQyxJQUFJLENBQUNtTixJQUFJLEVBQUUsUUFBUSxFQUFHdE4sS0FBSyxJQUFLO1FBQy9CQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFDMUIsQ0FBQyxDQUFDO0lBQ047RUFFSjs7RUFFQTtFQUNBLENBQUMsTUFBTTtJQUNILE1BQU13VSxlQUFlLEdBQUcsSUFBSTFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4RCxNQUFNMkMsa0JBQWtCLEdBQUcsSUFBSTNDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztJQUU5RCxNQUFNek0sR0FBRyxHQUFHLElBQUkzRSw0Q0FBRyxDQUFDN0IsZ0RBQU8sQ0FBQyxNQUFNLEVBQUUyVSxLQUFLLENBQUMsRUFBRSxNQUFNO01BQzlDZ0IsZUFBZSxDQUFDM0IsS0FBSyxFQUFFO01BQ3ZCNEIsa0JBQWtCLENBQUM1QixLQUFLLEVBQUU7SUFDOUIsQ0FBQyxDQUFDO0lBQ0Z4TixHQUFHLENBQUN4RSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM0RSxLQUFLLEVBQUU7RUFDeEIsQ0FBQyxHQUFHOztFQUVKO0VBQ0EsQ0FBQyxNQUFLO0lBQ0YsTUFBTWlQLE1BQU0sR0FBRzdWLGdEQUFPLENBQUMsV0FBVyxFQUFFMlUsS0FBSyxDQUFDO0lBQzFDLE1BQU1tQixRQUFRLEdBQUdsVSw2Q0FBSSxDQUFDLFlBQVksRUFBRStTLEtBQUssQ0FBQztJQUUxQ21CLFFBQVEsQ0FBQ3JXLE9BQU8sQ0FBQyxDQUFDc1csT0FBTyxFQUFFalYsS0FBSyxLQUFLO01BQ2pDYiwyQ0FBRSxDQUFDOFYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFJO1FBQ3JCRixNQUFNLENBQUM5VyxLQUFLLENBQUNpWCxlQUFlLEdBQUksZ0VBQStEbFYsS0FBSyxHQUFHLENBQUUsT0FBTTtNQUNuSCxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLEdBQUc7O0VBRUo7RUFDQSxDQUFDLE1BQUs7SUFDRixNQUFNcU0sWUFBWSxHQUFHbk4sZ0RBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQ2hDLFlBQVk7SUFDekQsTUFBTWlZLE9BQU8sR0FBR3pVLE1BQU0sQ0FBQzhFLFFBQVEsQ0FBQ2lELElBQUk7SUFDcEMsTUFBTTJNLE1BQU0sR0FBR0QsT0FBTyxDQUFDek0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDMk0sT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE1BQU1DLE9BQU8sR0FBSUYsTUFBTSxDQUFDRyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUVuQyxJQUFHSCxNQUFNLEtBQUssS0FBSyxHQUFHRSxPQUFPLEVBQUU7TUFDM0I1VSxNQUFNLENBQUNnSixRQUFRLENBQUM7UUFDWnpHLEdBQUcsRUFBRTRRLEtBQUssQ0FBQzdRLHFCQUFxQixFQUFFLENBQUNDLEdBQUcsR0FBR29KLFlBQVk7UUFDckQxQyxRQUFRLEVBQUU7TUFDZCxDQUFDLENBQUM7TUFFRi9NLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDd0IsU0FBUyxDQUFDSyxNQUFNLENBQUMsbUJBQW1CLENBQUM7TUFDMUU5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLEdBQUd5WSxPQUFPLENBQUMsQ0FBQ2pYLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztNQUNqRmhELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDd0IsU0FBUyxDQUFDSyxNQUFNLENBQUMsb0JBQW9CLENBQUM7TUFDNUU5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQ3dCLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLGdCQUFnQixDQUFDO01BQ3hFOUIsUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxHQUFHeVksT0FBTyxDQUFDLENBQUNqWCxTQUFTLENBQUN1QixHQUFHLENBQUMsb0JBQW9CLENBQUM7TUFDbkZoRCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLEdBQUd5WSxPQUFPLENBQUMsQ0FBQ2pYLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuRjtFQUNKLENBQUMsR0FBRztBQUNSLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVIyQztBQUNaO0FBQ3VEO0FBQzFEO0FBQ0o7QUFFekJjLE1BQU0sQ0FBQzhVLE9BQU8sR0FBR0EsaURBQU87QUFFeEIsTUFBTXZSLElBQUksR0FBRyxNQUFNO0VBQ2Y7RUFDQSxDQUFDLE1BQU07SUFDSCxNQUFNeVIsU0FBUyxHQUFHeFcsZ0RBQU8sQ0FBQyxjQUFjLENBQUM7SUFDekMsTUFBTTZKLFFBQVEsR0FBRzdKLGdEQUFPLENBQUMsU0FBUyxFQUFFd1csU0FBUyxDQUFDO0lBQzlDLE1BQU14VSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQztJQUU5Qi9CLDJDQUFFLENBQUN1QixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSXNGLDhDQUFNLENBQUMrQyxRQUFRLEVBQUU7TUFDMUM1QixJQUFJLEVBQUUsSUFBSTtNQUNWRSxhQUFhLEVBQUUsQ0FBQztNQUNoQjJCLFFBQVEsRUFBRTtRQUNOQyxLQUFLLEVBQUUsSUFBSTtRQUNYQyxvQkFBb0IsRUFBRTtNQUMxQixDQUFDO01BRUQxQixVQUFVLEVBQUU7UUFDUkMsRUFBRSxFQUFFLGVBQWU7UUFDbkJxTSxTQUFTLEVBQUUsSUFBSTtRQUNmMVIsSUFBSSxFQUFHLFNBQVM7UUFDaEIyUixZQUFZLENBQUMvVCxLQUFLLEVBQUVnVSxTQUFTLEVBQUU7VUFDM0IsT0FBUTtBQUM1Qix3REFBd0RBLFNBQVU7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsOEJBQThCOVMsS0FBSyxDQUFDbEIsS0FBSyxDQUFFO0FBQzNDLCtCQUErQjtRQUNmO01BQ0osQ0FBQztNQUVENEgsVUFBVSxFQUFFO1FBQ1JDLE1BQU0sRUFBRSxzQkFBc0I7UUFDOUJDLE1BQU0sRUFBRTtNQUNaLENBQUM7TUFFRDNJLEVBQUUsRUFBRTtRQUNBcEIsSUFBSSxHQUFHO1VBQ0gsSUFBSSxJQUFJLENBQUM0WCxNQUFNLENBQUM5WCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQzRKLEVBQUUsQ0FBQ3BKLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxVQUFVLENBQUM7VUFDckM7UUFDSjtNQUNKLENBQUM7TUFDRDhILE9BQU8sRUFBRSxDQUFDekIsNENBQVEsRUFBQ0UsOENBQVUsRUFBQ0MsOENBQVU7SUFDNUMsQ0FBQyxDQUFDLENBQUM7RUFDUCxDQUFDLEdBQUc7O0VBRUo7RUFDQSxDQUFDLE1BQU07SUFDSCxNQUFNd1AsV0FBVyxHQUFHMVcsZ0RBQU8sQ0FBQyxxQkFBcUIsQ0FBQztJQUNsRCxNQUFNMlcsUUFBUSxHQUFHL1UsNkNBQUksQ0FBQyxRQUFRLEVBQUU4VSxXQUFXLENBQUM7SUFFNUNDLFFBQVEsQ0FBQ2xYLE9BQU8sQ0FBQ21YLE9BQU8sSUFBSTtNQUN4QkEsT0FBTyxDQUFDalgsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU07UUFDeENpWCxPQUFPLENBQUN6WCxTQUFTLENBQUN1QixHQUFHLENBQUMsUUFBUSxDQUFDO01BQ25DLENBQUMsQ0FBQztNQUNGa1csT0FBTyxDQUFDalgsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU07UUFDdkNpWCxPQUFPLENBQUN6WCxTQUFTLENBQUNLLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDdEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBRU4sQ0FBQyxHQUFHOztFQUVKO0VBQ0EsQ0FBQyxNQUFNO0lBQ0gsTUFBTXFYLFFBQVEsR0FBRzdXLGdEQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLE1BQU00VyxPQUFPLEdBQUdoViw2Q0FBSSxDQUFDLElBQUksRUFBRWlWLFFBQVEsQ0FBQztJQUNwQyxNQUFNQyxXQUFXLEdBQUdsViw2Q0FBSSxDQUFDLGtCQUFrQixDQUFDO0lBQzVDLE1BQU1tVixPQUFPLEdBQUduViw2Q0FBSSxDQUFDLHlCQUF5QixDQUFDO0lBRS9DLElBQUlvVixhQUFhLEdBQUcsRUFBRTtJQUV0QixLQUFJLElBQUlDLENBQUMsR0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBQ0wsT0FBTyxDQUFDalksTUFBTSxFQUFFc1ksQ0FBQyxFQUFFLEVBQUU7TUFDaENMLE9BQU8sQ0FBQ0ssQ0FBQyxDQUFDLENBQUN0WixhQUFhLENBQUMsR0FBRyxDQUFDLENBQUNnQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBU0csS0FBSyxFQUFDO1FBQ25FQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7UUFFdEIsS0FBSSxJQUFJK1YsQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDTixPQUFPLENBQUNqWSxNQUFNLEVBQUV1WSxDQUFDLEVBQUUsRUFBRTtVQUNoQ04sT0FBTyxDQUFDTSxDQUFDLENBQUMsQ0FBQy9YLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNyQ3NYLFdBQVcsQ0FBQ0ksQ0FBQyxDQUFDLENBQUNuWSxLQUFLLENBQUNvWSxPQUFPLEdBQUcsTUFBTTtVQUNyQ0osT0FBTyxDQUFDRyxDQUFDLENBQUMsQ0FBQ25ZLEtBQUssQ0FBQ29ZLE9BQU8sR0FBRyxNQUFNO1FBQ3JDO1FBRUEsSUFBSSxDQUFDaE8sVUFBVSxDQUFDaEssU0FBUyxDQUFDdUIsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN2Q3FXLE9BQU8sQ0FBQ0UsQ0FBQyxDQUFDLENBQUNsWSxLQUFLLENBQUNvWSxPQUFPLEdBQUcsT0FBTztRQUVsQ0gsYUFBYSxHQUFHLElBQUksQ0FBQzNVLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDekMzRSxRQUFRLENBQUNDLGFBQWEsQ0FBQ3FaLGFBQWEsQ0FBQyxDQUFDalksS0FBSyxDQUFDb1ksT0FBTyxHQUFHLE1BQU07TUFHaEUsQ0FBQyxDQUFDO0lBQ047SUFBQztFQUVMLENBQUMsR0FBRzs7RUFFSjtFQUNBLENBQUMsTUFBTTtJQUNILE1BQU1DLGVBQWUsR0FBRyxNQUFNO01BQzFCLE1BQU05VyxJQUFJLEdBQUdOLGdEQUFPLENBQUMsTUFBTSxDQUFDO01BQzVCLE1BQU1xWCxTQUFTLEdBQUdyWCxnREFBTyxDQUFDLGNBQWMsQ0FBQztNQUN6QyxNQUFNc1gsV0FBVyxHQUFHLFlBQVk7TUFDaEMsTUFBTUMsU0FBUyxHQUFHLGFBQWE7TUFDL0IsTUFBTUMsU0FBUyxHQUFHLGFBQWE7TUFDL0IsTUFBTUMsVUFBVSxHQUFHN1YsNkNBQUksQ0FBQyxtQkFBbUIsRUFBRXlWLFNBQVMsQ0FBQztNQUN2RCxNQUFNSyxXQUFXLEdBQUc5Viw2Q0FBSSxDQUFDLHVCQUF1QixFQUFFeVYsU0FBUyxDQUFDO01BQzVELE1BQU1NLFNBQVMsR0FBRy9WLDZDQUFJLENBQUMsc0JBQXNCLEVBQUV5VixTQUFTLENBQUM7TUFFekQsTUFBTU8sVUFBVSxHQUFHLE1BQU07UUFDckJ0WCxJQUFJLENBQUNuQixTQUFTLENBQUNLLE1BQU0sQ0FBQzhYLFdBQVcsQ0FBQztRQUNsQ0QsU0FBUyxDQUFDbFksU0FBUyxDQUFDSyxNQUFNLENBQUMrWCxTQUFTLENBQUM7UUFDckNGLFNBQVMsQ0FBQ2xZLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDZ1ksU0FBUyxDQUFDO01BQ3pDLENBQUM7O01BRUQ7TUFDQTtNQUNBQyxVQUFVLENBQUNoWSxPQUFPLENBQUMsQ0FBQ21ELElBQUksRUFBRTlCLEtBQUssS0FBSztRQUNoQzhCLElBQUksQ0FBQ3pELFNBQVMsQ0FBQ0MsUUFBUSxDQUFFLHFCQUFvQmtYLHFEQUFXLENBQUMxVCxJQUFJLENBQUN6RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFBQyxDQUFDLElBQUl5RCxJQUFJLENBQUNwRCxNQUFNLEVBQUU7TUFDbkcsQ0FBQyxDQUFDOztNQUdGO01BQ0E7TUFDQSxJQUFJLENBQUNvQyw2Q0FBSSxDQUFDLG1CQUFtQixFQUFFeVYsU0FBUyxDQUFDLENBQUMxWSxNQUFNLEVBQUU7UUFDOUNpWixVQUFVLEVBQUU7TUFDaEIsQ0FBQyxNQUFNO1FBQ0h0WCxJQUFJLENBQUNuQixTQUFTLENBQUN1QixHQUFHLENBQUM0VyxXQUFXLENBQUM7UUFFL0JELFNBQVMsQ0FBQ2xZLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQzZXLFNBQVMsQ0FBQztRQUNsQ0YsU0FBUyxDQUFDbFksU0FBUyxDQUFDdUIsR0FBRyxDQUFDOFcsU0FBUyxDQUFDO01BQ3RDOztNQUVBO01BQ0FFLFdBQVcsQ0FBQ2pZLE9BQU8sQ0FBQyxDQUFDQyxNQUFNLEVBQUVvQixLQUFLLEtBQUs7UUFDbkMsSUFBSStXLFNBQVMsR0FBRyxJQUFJQyxJQUFJLEVBQUU7UUFDMUJELFNBQVMsR0FBRyxJQUFJQyxJQUFJLENBQUN6TixRQUFRLENBQUN3TixTQUFTLENBQUNFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEZyUixPQUFPLENBQUNDLEdBQUcsQ0FBQ2tSLFNBQVMsQ0FBQztRQUV0QjVYLDJDQUFFLENBQUNQLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTTtVQUN0QixNQUFNc1ksaUJBQWlCLEdBQUd0WSxNQUFNLENBQUNLLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDWixTQUFTLENBQUMsQ0FBQyxDQUFDO1VBQzFFLElBQUd5Qyw2Q0FBSSxDQUFDLG1CQUFtQixFQUFFbEMsTUFBTSxDQUFDSyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQ3BCLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkVpWixVQUFVLEVBQUU7VUFDaEI7VUFFQXRCLHFEQUFXLENBQUMwQixpQkFBaUIsRUFBRUEsaUJBQWlCLENBQUN4TyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFBQzBPLE9BQU8sRUFBRUw7VUFBUyxDQUFDLENBQUM7VUFDdEZKLFVBQVUsQ0FBQzNXLEtBQUssQ0FBQyxDQUFDdEIsTUFBTSxFQUFFO1FBQzlCLENBQUMsQ0FBQztNQUNOLENBQUMsQ0FBQzs7TUFFRjtNQUNBbVksU0FBUyxDQUFDbFksT0FBTyxDQUFDLENBQUNDLE1BQU0sRUFBRW9CLEtBQUssS0FBSztRQUNqQ2IsMkNBQUUsQ0FBQ1AsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNO1VBQ3RCLElBQUdrQyw2Q0FBSSxDQUFDLG1CQUFtQixFQUFFbEMsTUFBTSxDQUFDSyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQ3BCLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkVpWixVQUFVLEVBQUU7VUFDaEI7VUFFQUgsVUFBVSxDQUFDM1csS0FBSyxDQUFDLENBQUN0QixNQUFNLEVBQUU7UUFDOUIsQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVENFgsZUFBZSxFQUFFO0VBQ3JCLENBQUMsR0FBRzs7RUFFSjtFQUNBLENBQUMsTUFBTTtJQUNILE1BQU1lLE1BQU0sR0FBR25ZLGdEQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3ZDLE1BQU01QixLQUFLLEdBQUd3RCw2Q0FBSSxDQUFDLGVBQWUsRUFBRXVXLE1BQU0sQ0FBQztJQUUzQyxJQUFHL1osS0FBSyxDQUFDTyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2pCO0lBQ0o7SUFFQSxNQUFNa0wsUUFBUSxHQUFHLElBQUkvQyw4Q0FBTSxDQUFDOUcsZ0RBQU8sQ0FBQyxTQUFTLEVBQUVtWSxNQUFNLENBQUMsRUFBQztNQUNuRGxRLElBQUksRUFBRSxJQUFJO01BQ1ZtUSxTQUFTLEVBQUUsVUFBVTtNQUNyQnRPLFFBQVEsRUFBRTtRQUNOQyxLQUFLLEVBQUUsSUFBSTtRQUNYQyxvQkFBb0IsRUFBRTtNQUMxQixDQUFDO01BQ0R0QixVQUFVLEVBQUU7UUFDUkMsTUFBTSxFQUFFLHNCQUFzQjtRQUM5QkMsTUFBTSxFQUFFO01BQ1osQ0FBQztNQUNESixPQUFPLEVBQUUsQ0FBQ3pCLDRDQUFRLEVBQUNHLDhDQUFVLENBQUM7TUFFOUJqSCxFQUFFLEVBQUU7UUFDQXBCLElBQUksR0FBRztVQUNIbUIsZ0RBQU8sQ0FBQyxpQkFBaUIsRUFBRW1ZLE1BQU0sQ0FBQyxDQUFDdEYsTUFBTSxHQUFHLEtBQUs7VUFDakQ7UUFDSjtNQUNKO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQyxHQUFHOztFQUVKO0VBQ0EsQ0FBQyxNQUFNO0lBQ0hyUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTTtNQUNwQyxNQUFNMFksS0FBSyxHQUFHclksZ0RBQU8sQ0FBQyxjQUFjLENBQUM7TUFDckMsTUFBTXNZLGFBQWEsR0FBR3RZLGdEQUFPLENBQUMsY0FBYyxDQUFDLENBQUM4RCxxQkFBcUIsRUFBRSxDQUFDQyxHQUFHO01BQ3pFLElBQUl3VSxjQUFjLEdBQUcvVyxNQUFNLENBQUN3QyxPQUFPO01BQ25DO01BQ0E7O01BRUEsSUFBR3VVLGNBQWMsR0FBRyxFQUFFLElBQUtELGFBQWEsRUFBQztRQUNyQ0QsS0FBSyxDQUFDbFosU0FBUyxDQUFDdUIsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUNqQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsR0FBRztFQUVKOFgsa0JBQWtCLEVBQUU7RUFDcEJDLGNBQWMsRUFBRTtBQUNwQixDQUFDOztBQUVEO0FBQ0EsTUFBTUQsa0JBQWtCLEdBQUcsTUFBTTtFQUM3QixNQUFNRSxRQUFRLEdBQUcxWSxnREFBTyxDQUFDLE9BQU8sQ0FBQztFQUNqQyxNQUFNMlksVUFBVSxHQUFHM1ksZ0RBQU8sQ0FBQywwQkFBMEIsRUFBRTBZLFFBQVEsQ0FBQztFQUNoRSxNQUFNMVEsTUFBTSxHQUFHaEksZ0RBQU8sQ0FBQyxxQkFBcUIsRUFBRTJZLFVBQVUsQ0FBQztFQUN6RCxNQUFNeGEsSUFBSSxHQUFHNkIsZ0RBQU8sQ0FBQyxtQkFBbUIsRUFBRTJZLFVBQVUsQ0FBQzs7RUFFckQ7RUFDQSxDQUFDLE1BQUs7SUFDRixNQUFNNVEsY0FBYyxHQUFHL0gsZ0RBQU8sQ0FBQyxpQkFBaUIsRUFBRWdJLE1BQU0sQ0FBQztJQUN6RCxNQUFNRixZQUFZLEdBQUc5SCxnREFBTyxDQUFDLGlCQUFpQixFQUFFN0IsSUFBSSxDQUFDO0lBRXJENEosY0FBYyxDQUFDWCxTQUFTLEdBQUdVLFlBQVksQ0FBQ1YsU0FBUztFQUNyRCxDQUFDLEdBQUc7O0VBRUo7RUFDQSxNQUFNVyxjQUFjLEdBQUcsSUFBSWpCLDhDQUFNLENBQUM5RyxnREFBTyxDQUFDLFNBQVMsRUFBRWdJLE1BQU0sQ0FBQyxFQUFFO0lBQzFESSxLQUFLLEVBQUUsQ0FBQztJQUNSO0lBQ0F3USxjQUFjLEVBQUUsS0FBSztJQUNyQm5RLG1CQUFtQixFQUFFO0VBQ3pCLENBQUMsQ0FBQzs7RUFFRjtFQUNBLE1BQU1YLFlBQVksR0FBRyxJQUFJaEIsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFN0IsSUFBSSxDQUFDLEVBQUU7SUFDdEQ4SixJQUFJLEVBQUUsSUFBSTtJQUNWRSxhQUFhLEVBQUUsTUFBTTtJQUNyQkMsS0FBSyxFQUFFLEdBQUc7SUFDVjtJQUNBd1EsY0FBYyxFQUFFLEtBQUs7SUFDckJuUSxtQkFBbUIsRUFBRSxJQUFJO0lBQ3pCQyxVQUFVLEVBQUU7TUFDUkMsTUFBTSxFQUFFM0ksZ0RBQU8sQ0FBQywyQkFBMkIsRUFBRTJZLFVBQVUsQ0FBQztNQUN4RC9QLE1BQU0sRUFBRTVJLGdEQUFPLENBQUMsMkJBQTJCLEVBQUUyWSxVQUFVO0lBQzNELENBQUM7SUFDRHJRLFVBQVUsRUFBRTtNQUNSQyxFQUFFLEVBQUUseURBQXlEO01BQzdEckYsSUFBSSxFQUFFO0lBQ1YsQ0FBQztJQUVEakQsRUFBRSxFQUFFO01BQ0E0SSxXQUFXLENBQUNDLE1BQU0sRUFBRTtRQUNoQmYsY0FBYyxDQUFDZ0IsV0FBVyxDQUFDRCxNQUFNLENBQUNFLFNBQVMsQ0FBQztRQUM1QztNQUNKOztNQUVBO01BQ0E7TUFDQTtNQUNBO01BQ0E7SUFDSixDQUFDOztJQUVEUixPQUFPLEVBQUUsQ0FBQ3pCLDRDQUFRLEVBQUNHLDhDQUFVLEVBQUNELDhDQUFVO0VBQzVDLENBQUMsQ0FBQzs7RUFHRjtFQUNBLE1BQU1nQyxpQkFBaUIsR0FBR3JILDZDQUFJLENBQUMseUJBQXlCLEVBQUV6RCxJQUFJLENBQUM7RUFFL0Q4SyxpQkFBaUIsQ0FBQ3hKLE9BQU8sQ0FBQ21ELElBQUksSUFBSTtJQUM5QkEsSUFBSSxDQUFDakQsZ0JBQWdCLENBQUMsT0FBTyxFQUFHRyxLQUFLLElBQUs7TUFDdENBLEtBQUssQ0FBQ3FCLGNBQWMsRUFBRTtNQUV0QixNQUFNK0gsVUFBVSxHQUFHdEcsSUFBSSxDQUFDdUcsVUFBVTtNQUNsQyxNQUFNQyxjQUFjLEdBQUdGLFVBQVUsQ0FBQzdHLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQztNQUV6RTBGLGNBQWMsQ0FBQ2dCLFdBQVcsQ0FBQ0ssY0FBYyxDQUFDO01BQzFDO0lBRUosQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLE1BQU1xUCxjQUFjLEdBQUcsTUFBTTtFQUN6QixNQUFNQyxRQUFRLEdBQUcxWSxnREFBTyxDQUFDLE9BQU8sQ0FBQztFQUNqQyxNQUFNNlksTUFBTSxHQUFHN1ksZ0RBQU8sQ0FBQyxzQkFBc0IsRUFBRTBZLFFBQVEsQ0FBQztFQUN4RCxNQUFNMVEsTUFBTSxHQUFHaEksZ0RBQU8sQ0FBQyxxQkFBcUIsRUFBRTZZLE1BQU0sQ0FBQztFQUNyRCxNQUFNMWEsSUFBSSxHQUFHNkIsZ0RBQU8sQ0FBQyxtQkFBbUIsRUFBRTZZLE1BQU0sQ0FBQzs7RUFFakQ7RUFDQSxDQUFDLE1BQUs7SUFDRixNQUFNOVEsY0FBYyxHQUFHL0gsZ0RBQU8sQ0FBQyxpQkFBaUIsRUFBRWdJLE1BQU0sQ0FBQztJQUN6RCxNQUFNRixZQUFZLEdBQUc5SCxnREFBTyxDQUFDLGlCQUFpQixFQUFFN0IsSUFBSSxDQUFDO0lBRXJENEosY0FBYyxDQUFDWCxTQUFTLEdBQUdVLFlBQVksQ0FBQ1YsU0FBUztFQUNyRCxDQUFDLEdBQUc7O0VBRUo7RUFDQSxNQUFNVyxjQUFjLEdBQUcsSUFBSWpCLDhDQUFNLENBQUM5RyxnREFBTyxDQUFDLFNBQVMsRUFBRWdJLE1BQU0sQ0FBQyxFQUFFO0lBQzFESSxLQUFLLEVBQUUsQ0FBQztJQUNSO0lBQ0F3USxjQUFjLEVBQUUsS0FBSztJQUNyQm5RLG1CQUFtQixFQUFFO0VBQ3pCLENBQUMsQ0FBQzs7RUFFRjtFQUNBLE1BQU1YLFlBQVksR0FBRyxJQUFJaEIsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFN0IsSUFBSSxDQUFDLEVBQUU7SUFDdEQ4SixJQUFJLEVBQUUsSUFBSTtJQUNWRSxhQUFhLEVBQUUsTUFBTTtJQUNyQkMsS0FBSyxFQUFFLEdBQUc7SUFDVjtJQUNBd1EsY0FBYyxFQUFFLEtBQUs7SUFDckJuUSxtQkFBbUIsRUFBRSxJQUFJO0lBQ3pCQyxVQUFVLEVBQUU7TUFDUkMsTUFBTSxFQUFFM0ksZ0RBQU8sQ0FBQywyQkFBMkIsRUFBRTZZLE1BQU0sQ0FBQztNQUNwRGpRLE1BQU0sRUFBRTVJLGdEQUFPLENBQUMsMkJBQTJCLEVBQUU2WSxNQUFNO0lBQ3ZELENBQUM7SUFDRHZRLFVBQVUsRUFBRTtNQUNSQyxFQUFFLEVBQUUscURBQXFEO01BQ3pEckYsSUFBSSxFQUFFO0lBQ1YsQ0FBQztJQUNEakQsRUFBRSxFQUFFO01BQ0E0SSxXQUFXLENBQUNDLE1BQU0sRUFBRTtRQUNoQmYsY0FBYyxDQUFDZ0IsV0FBVyxDQUFDRCxNQUFNLENBQUNFLFNBQVMsQ0FBQztRQUM1QztNQUNKO0lBQ0osQ0FBQzs7SUFDRFIsT0FBTyxFQUFFLENBQUN6Qiw0Q0FBUSxFQUFDRyw4Q0FBVSxFQUFDRCw4Q0FBVTtFQUM1QyxDQUFDLENBQUM7O0VBR0Y7RUFDQSxNQUFNZ0MsaUJBQWlCLEdBQUdySCw2Q0FBSSxDQUFDLHlCQUF5QixFQUFFekQsSUFBSSxDQUFDO0VBRS9EOEssaUJBQWlCLENBQUN4SixPQUFPLENBQUNtRCxJQUFJLElBQUk7SUFDOUJBLElBQUksQ0FBQ2pELGdCQUFnQixDQUFDLE9BQU8sRUFBR0csS0FBSyxJQUFLO01BQ3RDQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFFdEIsTUFBTStILFVBQVUsR0FBR3RHLElBQUksQ0FBQ3VHLFVBQVU7TUFDbEMsTUFBTUMsY0FBYyxHQUFHRixVQUFVLENBQUM3RyxZQUFZLENBQUMseUJBQXlCLENBQUM7TUFFekUwRixjQUFjLENBQUNnQixXQUFXLENBQUNLLGNBQWMsQ0FBQztNQUMxQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BXMkM7QUFDRztBQUNLO0FBQ0w7QUFFL0MsTUFBTTBQLFNBQVMsR0FBRyxNQUFNO0VBQ3BCO0VBQ0EsTUFBTXhZLElBQUksR0FBSU4sZ0RBQU8sQ0FBQyxNQUFNLENBQUM7RUFDN0IsTUFBTStZLFFBQVEsR0FBRy9ZLGdEQUFPLENBQUMsWUFBWSxDQUFDO0VBQ3RDLE1BQU11UyxLQUFLLEdBQUd2UyxnREFBTyxDQUFDLGlCQUFpQixFQUFFK1ksUUFBUSxDQUFDO0VBRWxEOVksMkNBQUUsQ0FBQ3NTLEtBQUssRUFBRSxPQUFPLEVBQUd6UyxLQUFLLElBQUs7SUFDMUJBLEtBQUssQ0FBQ3FCLGNBQWMsRUFBRTtJQUV0QmIsSUFBSSxDQUFDbkIsU0FBUyxDQUFDdUIsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUMzQmMsTUFBTSxDQUFDK1EsS0FBSyxFQUFFO0lBQ2RqUyxJQUFJLENBQUNuQixTQUFTLENBQUNLLE1BQU0sQ0FBQyxPQUFPLENBQUM7RUFDbEMsQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLE1BQU1nRyxjQUFjLEdBQUcsTUFBTTtFQUN6QixDQUFDLE1BQUs7SUFDRixNQUFNd1QsWUFBWSxHQUFHaFosZ0RBQU8sQ0FBQyxjQUFjLENBQUM7SUFDNUMsTUFBTTZKLFFBQVEsR0FBRyxJQUFJL0MsOENBQU0sQ0FBQzlHLGdEQUFPLENBQUMsU0FBUyxFQUFFZ1osWUFBWSxDQUFDLEVBQUU7TUFDMUQvUSxJQUFJLEVBQUUsSUFBSTtNQUNWRyxLQUFLLEVBQUUsR0FBRztNQUNWO01BQ0E7TUFDQTtNQUNBO01BQ0FxSyxjQUFjLEVBQUUsSUFBSTtNQUNwQnRLLGFBQWEsRUFBRSxNQUFNO01BRXJCTyxVQUFVLEVBQUU7UUFDUkMsTUFBTSxFQUFFLDRCQUE0QjtRQUNwQ0MsTUFBTSxFQUFFO01BQ1osQ0FBQztNQUVESixPQUFPLEVBQUUsQ0FBQ3pCLDRDQUFRLEVBQUNHLDhDQUFVO0lBQ2pDLENBQUMsQ0FBQztFQUNOLENBQUMsR0FBRztFQUdKbUMscURBQVksRUFBRTtFQUNkLE1BQU00UCxRQUFRLEdBQUUsSUFBSTNiLHVEQUFjLENBQUMsV0FBVyxDQUFDO0FBQ25ELENBQUM7O0FBRUQ7QUFDQSxNQUFNbUksY0FBYyxHQUFHLE1BQU07RUFDekJxVCxTQUFTLEVBQUU7RUFDWDdOLGdEQUFPLEVBQUU7QUFDYixDQUFDOztBQUVEO0FBQ0EsTUFBTXZGLG1CQUFtQixHQUFHLE1BQU07RUFDOUIsQ0FBQyxNQUFLO0lBQ0YsTUFBTXNULFlBQVksR0FBR2haLGdEQUFPLENBQUMsY0FBYyxDQUFDO0lBQzVDLE1BQU02SixRQUFRLEdBQUcsSUFBSS9DLDhDQUFNLENBQUM5RyxnREFBTyxDQUFDLFNBQVMsRUFBRWdaLFlBQVksQ0FBQyxFQUFFO01BQzFEL1EsSUFBSSxFQUFFLElBQUk7TUFDVkcsS0FBSyxFQUFFLEdBQUc7TUFDVjtNQUNBO01BQ0E7TUFDQTtNQUNBcUssY0FBYyxFQUFFLElBQUk7TUFDcEJ0SyxhQUFhLEVBQUUsTUFBTTtNQUVyQk8sVUFBVSxFQUFFO1FBQ1JDLE1BQU0sRUFBRSw0QkFBNEI7UUFDcENDLE1BQU0sRUFBRTtNQUNaLENBQUM7TUFFREosT0FBTyxFQUFFLENBQUN6Qiw0Q0FBUSxFQUFDRyw4Q0FBVTtJQUNqQyxDQUFDLENBQUM7RUFDTixDQUFDLEdBQUc7RUFFSm1DLHFEQUFZLEVBQUU7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBLE1BQU0xRCxtQkFBbUIsR0FBRyxNQUFNO0VBQzlCbVQsU0FBUyxFQUFFO0VBQ1g3TixnREFBTyxFQUFFO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBLE1BQU1yRixvQkFBb0IsR0FBRyxNQUFNO0VBQy9CLENBQUMsTUFBSztJQUNGLE1BQU1vVCxZQUFZLEdBQUdoWixnREFBTyxDQUFDLGNBQWMsQ0FBQztJQUM1QyxNQUFNNkosUUFBUSxHQUFHLElBQUkvQyw4Q0FBTSxDQUFDOUcsZ0RBQU8sQ0FBQyxTQUFTLEVBQUVnWixZQUFZLENBQUMsRUFBRTtNQUMxRC9RLElBQUksRUFBRSxJQUFJO01BQ1ZHLEtBQUssRUFBRSxHQUFHO01BQ1Y7TUFDQTtNQUNBO01BQ0E7TUFDQXFLLGNBQWMsRUFBRSxJQUFJO01BQ3BCdEssYUFBYSxFQUFFLE1BQU07TUFFckJPLFVBQVUsRUFBRTtRQUNSQyxNQUFNLEVBQUUsNEJBQTRCO1FBQ3BDQyxNQUFNLEVBQUU7TUFDWixDQUFDO01BRURKLE9BQU8sRUFBRSxDQUFDekIsNENBQVEsRUFBQ0csOENBQVU7SUFDakMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxHQUFHO0VBRUptQyxxREFBWSxFQUFFO0FBQ2xCLENBQUM7O0FBRUQ7QUFDQSxNQUFNeEQsb0JBQW9CLEdBQUcsTUFBTTtFQUMvQmlULFNBQVMsRUFBRTtFQUNYN04sZ0RBQU8sRUFBRTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BIOEM7QUFDVDtBQUNKO0FBRWxDLE1BQU1uRixXQUFXLEdBQUcsTUFBTTtFQUN0QnVELHFEQUFZLEVBQUU7QUFDbEIsQ0FBQztBQUVELE1BQU10RCxXQUFXLEdBQUcsTUFBTTtFQUN0QjtFQUNBLENBQUMsTUFBTTtJQUNILE1BQU16RixJQUFJLEdBQUlOLGdEQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLE1BQU0rWSxRQUFRLEdBQUcvWSxnREFBTyxDQUFDLFlBQVksQ0FBQztJQUN0QyxNQUFNdVMsS0FBSyxHQUFHdlMsZ0RBQU8sQ0FBQyxpQkFBaUIsRUFBRStZLFFBQVEsQ0FBQztJQUVsRDlZLDJDQUFFLENBQUNzUyxLQUFLLEVBQUUsT0FBTyxFQUFHelMsS0FBSyxJQUFLO01BQzFCQSxLQUFLLENBQUNxQixjQUFjLEVBQUU7TUFDdEJiLElBQUksQ0FBQ25CLFNBQVMsQ0FBQ3VCLEdBQUcsQ0FBQyxPQUFPLENBQUM7TUFDM0JjLE1BQU0sQ0FBQytRLEtBQUssRUFBRTtNQUNkalMsSUFBSSxDQUFDbkIsU0FBUyxDQUFDSyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztFQUNOLENBQUMsR0FBRztFQUVKeUwsZ0RBQU8sRUFBRTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3hCMkM7QUFDWjtBQUVoQyxNQUFNakYsV0FBVyxHQUFHLE1BQU07RUFDdEIsTUFBTTRELE1BQU0sR0FBRzVKLGdEQUFPLENBQUMsU0FBUyxDQUFDO0VBQ2pDLE1BQU1rWixLQUFLLEdBQUdsWixnREFBTyxDQUFDLE9BQU8sRUFBRTRKLE1BQU0sQ0FBQztFQUN0QyxNQUFNeEQsTUFBTSxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDbkQsTUFBTTRTLFdBQVcsR0FBR25aLGdEQUFPLENBQUMsNEJBQTRCLEVBQUU0SixNQUFNLENBQUM7RUFFakUsSUFBSWlPLFNBQVMsR0FBRyxJQUFJQyxJQUFJLEVBQUU7RUFDMUJELFNBQVMsR0FBRyxJQUFJQyxJQUFJLENBQUN6TixRQUFRLENBQUN3TixTQUFTLENBQUNFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7RUFFcEY5WCwyQ0FBRSxDQUFDaVosS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3RCNUMscURBQVcsQ0FBRSxxQkFBb0JsUSxNQUFNLENBQUNLLEdBQUcsQ0FBQyxLQUFLLENBQUUsRUFBQyxFQUFHLEdBQUVMLE1BQU0sQ0FBQ0ssR0FBRyxDQUFDLEtBQUssQ0FBRSxFQUFDLEVBQUU7TUFBQ3lSLE9BQU8sRUFBRUw7SUFBUyxDQUFDLENBQUM7SUFDbkdyVyxNQUFNLENBQUNqQyxLQUFLLEVBQUU7RUFDbEIsQ0FBQyxDQUFDO0VBRUY0WixXQUFXLENBQUN4WixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdHLEtBQUssSUFBSztJQUM3Q0EsS0FBSyxDQUFDcUIsY0FBYyxFQUFFO0lBRXRCSyxNQUFNLENBQUNqQyxLQUFLLEVBQUU7RUFDbEIsQ0FBQyxDQUFDO0FBSU4sQ0FBQztBQUVELCtEQUFleUcsV0FBVzs7Ozs7Ozs7Ozs7O0FDM0IxQjs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0E7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkMsb0hBQW9ILGlEQUFpRDtXQUNySztXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDN0JBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsK0NBQStDO1VBQzFHLHFGQUFxRixtREFBbUQ7VUFDeEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9Ecm9wZG93blNlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9Nb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9UYWIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL2pzL3BjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYy9idXNpbmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGMvaG9sZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYy9pbnRyby5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYy9tYWluLmpzIiwid2VicGFjazovLy8uL2pzL3BjL25ld3MuanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGMvcmVjcnVpdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYy93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9wYy9hcHAuc2Nzcz9mMzMyIiwid2VicGFjazovLy9pZ25vcmVkfEQ6XFxwcm9qZWN0XFwyMDIyXFx1YW1jb1xcX19yZXNvdXJjZVxcbm9kZV9tb2R1bGVzXFxicm93c2Vyc2xpc3R8cGF0aCIsIndlYnBhY2s6Ly8vaWdub3JlZHxEOlxccHJvamVjdFxcMjAyMlxcdWFtY29cXF9fcmVzb3VyY2VcXG5vZGVfbW9kdWxlc1xccG9zdGNzc1xcbGlifC4vdGVybWluYWwtaGlnaGxpZ2h0Iiwid2VicGFjazovLy9pZ25vcmVkfEQ6XFxwcm9qZWN0XFwyMDIyXFx1YW1jb1xcX19yZXNvdXJjZVxcbm9kZV9tb2R1bGVzXFxwb3N0Y3NzXFxsaWJ8ZnMiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8RDpcXHByb2plY3RcXDIwMjJcXHVhbWNvXFxfX3Jlc291cmNlXFxub2RlX21vZHVsZXNcXHBvc3Rjc3NcXGxpYnxwYXRoIiwid2VicGFjazovLy9pZ25vcmVkfEQ6XFxwcm9qZWN0XFwyMDIyXFx1YW1jb1xcX19yZXNvdXJjZVxcbm9kZV9tb2R1bGVzXFxwb3N0Y3NzXFxsaWJ8c291cmNlLW1hcC1qcyIsIndlYnBhY2s6Ly8vaWdub3JlZHxEOlxccHJvamVjdFxcMjAyMlxcdWFtY29cXF9fcmVzb3VyY2VcXG5vZGVfbW9kdWxlc1xccG9zdGNzc1xcbGlifHVybCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEcm9wZG93blNlbGVjdCA9IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3RhcmdldH1gKSA6IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbGVjdEFjdGl2ZSA9ICdkcm9wZG93bi0tYWN0aXZlJztcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bl9fcmVzdWx0Jyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gdGhpcy5zZWxlY3QucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duX19jb250cm9sJyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sSGVpZ2h0ID0gdGhpcy5jb250cm9sLmNsaWVudEhlaWdodDtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5zZWxlY3QucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duX190aXRsZScpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5zZWxlY3QucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duX19jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd25fX2xpc3QnKTtcclxuICAgICAgICB0aGlzLml0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd25fX2l0ZW0nKSk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd25fX2J1dHRvbicpKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnLmRyb3Bkb3duX19uYW1lJztcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gKHRoaXMuaXRlbXMubGVuZ3RoICogMC4yKS50b0ZpeGVkKDEpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHt0aGlzLmR1cmF0aW9ufXNgO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICBjb25zdCBpc1RvZ2dsZSA9IHRoaXMuc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyhgJHt0aGlzLnNlbGVjdEFjdGl2ZX1gKTtcclxuICAgICAgICBjb25zdCBpc0NsYXNzTGlzdE1ldGhvZCA9IGlzVG9nZ2xlID8gJ3JlbW92ZScgOiAnYWRkJztcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuY2xhc3NMaXN0W2lzQ2xhc3NMaXN0TWV0aG9kXShgJHt0aGlzLnNlbGVjdEFjdGl2ZX1gKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBgJHtpc1RvZ2dsZSA/IHRoaXMuY29udHJvbEhlaWdodCA6IHRoaXMuY29udHJvbC5jbGllbnRIZWlnaHQgKyB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuc2VsZWN0QWN0aXZlfWApO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuY29udHJvbEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKGAke3RoaXMubmFtZX1gKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0LnZhbHVlID0gYnV0dG9uLnZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93blNlbGVjdDsiLCJpbXBvcnQge2ZpbmRPbmUsIG9ufSBmcm9tICcuL2hlbHBlcic7XHJcblxyXG5jb25zdCBDTEFTU19OQU1FX0JPRFlfT1BFTiA9ICdtb2RhbC1vcGVuJztcclxuY29uc3QgQ0xBU1NfTkFNRV9PUEVOID0gJ21vZGFsLS1vcGVuJztcclxuY29uc3QgQ0xBU1NfTkFNRV9GQURFID0gJ21vZGFsLS1mYWRlJztcclxuXHJcbmNvbnN0IE1vZGFsID0gY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gZmluZE9uZSgnYm9keScpO1xyXG5cclxuICAgICAgICB0aGlzLm1vZGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25FdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4odGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9CT0RZX09QRU4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb2RhbHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfT1BFTik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUpLCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UodGFyZ2V0TW9kYWwpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1vZGFscy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0TW9kYWwpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm1vZGFscy5pbmRleE9mKHRhcmdldE1vZGFsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5tb2RhbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9GQURFLCBDTEFTU19OQU1FX09QRU4pO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMubW9kYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0JPRFlfT1BFTik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjbG9zZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcubW9kYWxfX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGlmIChjbG9zZSkge1xyXG4gICAgICAgICAgICBpZiAoY2xvc2UudGFnTmFtZSA9PT0gJ0EnKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50KCkge1xyXG4gICAgICAgIG9uKHRoaXMuYm9keSwgJ2NsaWNrJywgdGhpcy5vbkNsb3NlLmJpbmQodGhpcyksIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2Nyb2xsV2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsOyIsImltcG9ydCB7ZmluZE9uZSwgZmluZCwgb259IGZyb20gJy4vaGVscGVyJztcclxuXHJcbmNvbnN0IFRhYiA9IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gZmluZCgnLnRhYl9faXRlbScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5tZW51cyA9IGZpbmQoJy50YWJfX21lbnUnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMucGFuZWxzID0gdGhpcy5tZW51cy5tYXAobWVudSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhbmVsSWQgPSBtZW51LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gICAgICAgICAgICBjb25zdCBwYW5lbCA9IGZpbmRPbmUoYCMke3BhbmVsSWR9YCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGFuZWw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYW5lbFRpbWVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUYWIoKSB7XHJcbiAgICAgICAgdGhpcy5tZW51cy5mb3JFYWNoKChtZW51LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCd0YWJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndGFiX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgndGFiX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFiX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgndGFiX19wYW5lbC0taW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxUaW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5wYW5lbFRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gcGFuZWwuY2xhc3NMaXN0LmFkZCgndGFiX19wYW5lbC0tYWN0aXZlJyksIDEzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhb3NFbGVtZW50cyA9IGZpbmQoJy5hb3MtaW5pdCcsIHBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGlmIChhb3NFbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhb3NFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Fvcy1hbmltYXRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW9zLWFuaW1hdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCd0YWJfX3BhbmVsLS1pbicsICd0YWJfX3BhbmVsLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZVRhYigpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMubWVudXMuZm9yRWFjaCgobWVudSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgb24obWVudSwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWI7IiwiZXhwb3J0IGNvbnN0IGZpbmRPbmUgPSAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkgPT4gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuZXhwb3J0IGNvbnN0IGZpbmQgPSAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkgPT4gWy4uLmNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uID0gKHRhcmdldCwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUgPSBmYWxzZSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5hZGRFdmVudExpc3RlbmVyKSByZXR1cm47XHJcblxyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgb2ZmID0gKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spID0+IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcclxuZXhwb3J0IGNvbnN0IGRlbGVnYXRlID0gKHRhcmdldCwgc2VsZWN0b3IsIHR5cGUsIGhhbmRsZXIsIGNhcHR1cmUpID0+IHtcclxuICAgIGNvbnN0IGRpc3BhdGNoRXZlbnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IHBvdGVudGlhbEVsZW1lbnRzID0gdGFyZ2V0RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgaWYgKHBvdGVudGlhbEVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbChwb3RlbnRpYWxFbGVtZW50cywgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb24odGFyZ2V0LCB0eXBlLCBkaXNwYXRjaEV2ZW50LCAhIWNhcHR1cmUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9mZnNldCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWSxcclxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3cuc2Nyb2xsWFxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IChmdW5jLCB3YWl0ID0gMzAwKSA9PiB7XHJcbiAgICBsZXQgaW5EZWJvdW5jZTtcclxuXHJcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBpbkRlYm91bmNlICYmIGNsZWFyVGltZW91dChpbkRlYm91bmNlKTtcclxuICAgICAgICBpbkRlYm91bmNlID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKC4uLmFyZ3MpLCB3YWl0KTtcclxuICAgIH07XHJcbn07IiwiaW1wb3J0IEFwcCBmcm9tICdod2FseS1hcHAnO1xyXG5cclxuaW1wb3J0IHtzaXRlTWVudSwgc2l0ZUhlYWRlckluZm9ybWF0aW9uLCBzaXRlVG9wLCBiYW5rQ2Fyb3VzZWwsIHByb2Nlc3NpbmcsIHNjcm9sbE1vdGlvbn0gZnJvbSAnLi9jb21tb24nO1xyXG5pbXBvcnQge21haW59IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCB7aW50cm9DZW8sIGludHJvRXRoaWNhbE1hbmFnZW1lbnR9IGZyb20gJy4vaW50cm8nO1xyXG5pbXBvcnQge2hvbGRpbmdDb2xsYXRlcmFsTGlzdCwgaG9sZGluZ0luZmxvd0xpc3QsIGhvbGRpbmdDb2xsYXRlcmFsVmlldywgaG9sZGluZ0luZmxvd1ZpZXcsIGhvbGRpbmdDckludmVzdG1lbnR9IGZyb20gJy4vaG9sZGluZyc7XHJcbmltcG9ydCB7YnVzaW5lc3N9IGZyb20gJy4vYnVzaW5lc3MnO1xyXG5pbXBvcnQge25ld3NOb3RpY2VMaXN0LCBuZXdzTm90aWNlVmlldywgbmV3c0NvbXBhbnlOZXdzTGlzdCwgbmV3c0NvbXBhbnlOZXdzVmlldywgbmV3c0luZHVzdHJ5TmV3c0xpc3QsIG5ld3NJbmR1c3RyeU5ld3NWaWV3fSBmcm9tICcuL25ld3MnO1xyXG5pbXBvcnQge3JlY3J1aXRMaXN0LCByZWNydWl0Vmlld30gZnJvbSAnLi9yZWNydWl0JztcclxuaW1wb3J0IHdpbmRvd1BvcHVwIGZyb20gJy4vd2luZG93JztcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbi8v7ZWo7IiY7LaU6rCAXHJcbmFwcC5hZGQoe1xyXG4gICAgc2l0ZU1lbnUsXHJcbiAgICBzaXRlSGVhZGVySW5mb3JtYXRpb24sXHJcbiAgICBzaXRlVG9wLFxyXG4gICAgYmFua0Nhcm91c2VsLFxyXG4gICAgcHJvY2Vzc2luZyxcclxuICAgIHNjcm9sbE1vdGlvbixcclxuXHJcbiAgICBtYWluLFxyXG5cclxuICAgIHdpbmRvd1BvcHVwLFxyXG5cclxuICAgIGludHJvQ2VvLFxyXG4gICAgaW50cm9FdGhpY2FsTWFuYWdlbWVudCxcclxuXHJcbiAgICBidXNpbmVzcyxcclxuXHJcbiAgICBob2xkaW5nQ29sbGF0ZXJhbExpc3QsXHJcbiAgICBob2xkaW5nSW5mbG93TGlzdCxcclxuICAgIGhvbGRpbmdDb2xsYXRlcmFsVmlldyxcclxuICAgIGhvbGRpbmdJbmZsb3dWaWV3LFxyXG4gICAgaG9sZGluZ0NySW52ZXN0bWVudCxcclxuXHJcbiAgICBuZXdzTm90aWNlTGlzdCxcclxuICAgIG5ld3NOb3RpY2VWaWV3LFxyXG4gICAgbmV3c0NvbXBhbnlOZXdzTGlzdCxcclxuICAgIG5ld3NDb21wYW55TmV3c1ZpZXcsXHJcbiAgICBuZXdzSW5kdXN0cnlOZXdzTGlzdCxcclxuICAgIG5ld3NJbmR1c3RyeU5ld3NWaWV3LFxyXG5cclxuICAgIHJlY3J1aXRMaXN0LFxyXG4gICAgcmVjcnVpdFZpZXcsXHJcblxyXG59KTtcclxuXHJcblxyXG4vL+yghO2OmOydtOyngOyXkOyEnCDtmZzshLHtmZTtlaDqsbBcclxuYXBwLmF1dG8oXHJcbiAgICAnc2l0ZVRvcCcsXHJcbiAgICAnc2l0ZUhlYWRlckluZm9ybWF0aW9uJyxcclxuICAgICdzaXRlTWVudScsXHJcbiAgICAnYmFua0Nhcm91c2VsJyxcclxuICAgICdwcm9jZXNzaW5nJyxcclxuICAgICdzY3JvbGxNb3Rpb24nLFxyXG4pO1xyXG5cclxuYXBwLnJlYWR5QW5kUnVuKCk7IiwiaW1wb3J0IHtmaW5kT25lLCBmaW5kLCBvbn0gZnJvbSAnLi4vaGVscGVyJztcclxuaW1wb3J0IFRhYiBmcm9tICcuLi9UYWInO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSBcIi4uL01vZGFsXCI7XHJcblxyXG5jb25zdCBidXNpbmVzcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJ1c2luZXNzPSBmaW5kT25lKCcuYnVzaW5lc3MnKTtcclxuXHJcbiAgICAvL3RhYlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgICAgY29uc3QgdGFiID0gbmV3IFRhYihmaW5kT25lKCcudGFiJywgYnVzaW5lc3MpKTtcclxuXHJcbiAgICAgICAgaWYgKCEhcGFyYW1zLmdldCgndGFiJykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zLmdldCgndGFiJykpO1xyXG4gICAgICAgICAgICB0YWIubWVudXNbKHBhcmFtcy5nZXQoJ3RhYicpICogMSkgLSAxXS5jbGljaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhYi5tZW51c1swXS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGJ1c2luZXNzXHJcbn0iLCJpbXBvcnQge2ZpbmRPbmUsIGZpbmQsIG9ufSBmcm9tICcuLi9oZWxwZXInO1xyXG5pbXBvcnQgQU9TIGZyb20gJ2Fvcyc7XHJcbmltcG9ydCBNb2RhbCBmcm9tIFwiLi4vTW9kYWxcIjtcclxuaW1wb3J0IFN3aXBlciwge0F1dG9wbGF5LCBFZmZlY3RGYWRlLCBQYWdpbmF0aW9uLCBOYXZpZ2F0aW9ufSBmcm9tIFwic3dpcGVyXCI7XHJcblxyXG5jb25zdCBtYWtlTWVudSA9ICh0YXJnZXQpID0+IHtcclxuICAgIGNvbnN0IG1lbnUgPSBmaW5kT25lKCcuc2l0ZS1oZWFkZXJfX21lbnUnKTtcclxuXHJcbiAgICB0YXJnZXQuaW5uZXJIVE1MID0gbWVudS5pbm5lckhUTUw7XHJcbn07XHJcblxyXG5jb25zdCBzaXRlTWVudSA9ICgpID0+IHtcclxuICAgIGlmICghIWZpbmRPbmUoJy5hbGwtbWVudScpKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGZpbmRPbmUoJ2JvZHknKTtcclxuICAgICAgICBjb25zdCBzaXRlTWVudSA9IGZpbmRPbmUoJy5hbGwtbWVudScpO1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclNpdGVtYXAgPSBmaW5kT25lKCcuc2l0ZS1mb290ZXJfX3NpdGVtYXAtbGluaycpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmaW5kT25lKCcuYWxsLW1lbnVfX2NvbnRlbnQnLCBzaXRlTWVudSk7XHJcbiAgICAgICAgY29uc3Qgc2l0ZU1lbnVCdXR0b24gPSBmaW5kT25lKCcuYWxsLW1lbnVfX2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHNpdGVNZW51Q29udGFpbmVyID0gZmluZE9uZSgnLmFsbC1tZW51X19jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBzaXRlTWVudUNsb3NlQnV0dG9uID0gZmluZE9uZSgnLmFsbC1tZW51X19jbG9zZS1idXR0b24nKTtcclxuXHJcbiAgICAgICAgc2l0ZU1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2l0ZU1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvb3RlclNpdGVtYXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2l0ZU1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNpdGVNZW51Q2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2l0ZU1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1ha2VNZW51KGNvbnRlbnQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2l0ZUhlYWRlckluZm9ybWF0aW9uID0gKCkgPT4ge1xyXG4gICAgaWYgKCEhZmluZE9uZSgnLmluZm9ybWF0aW9uJykpIHtcclxuICAgICAgICAvL+y2lOyynOyekOyCsOygleuztCBjbGljayBldmVudFxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm9ybWF0aW9uQnV0dG9uID0gZmluZE9uZSgnLmluZm9ybWF0aW9uLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvcm1hdGlvbkNvbnRlbnQgPSBmaW5kT25lKCcuc2l0ZS1oZWFkZXItaW5mb3JtYXRpb24nKTtcclxuICAgICAgICAgICAgY29uc3QgaW5mb3JtYXRpb25DbG9zZSA9IGZpbmRPbmUoJy5zaXRlLWhlYWRlci1pbmZvcm1hdGlvbl9fY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgIG9uKGluZm9ybWF0aW9uQnV0dG9uLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5mb3JtYXRpb25Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaW5mb3JtYXRpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb24oaW5mb3JtYXRpb25DbG9zZSwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy/rqZTsnbgg67O07Jyg7J6Q7IKw7KCV67O0IOuzteyCrCDrtpnsl6zrhKPquLBcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJJbmZvcm1hdGlvbiA9IGZpbmRPbmUoJy5zaXRlLWhlYWRlci1pbmZvcm1hdGlvbicpO1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0Q2Fyb3VzZWwgPSBmaW5kT25lKCcuaW5mb3JtYXRpb24tbGlzdCAuc3dpcGVyLXdyYXBwZXInLCBoZWFkZXJJbmZvcm1hdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbENhcm91c2VsID0gZmluZE9uZSgnLmluZm9ybWF0aW9uLWRldGFpbCAuc3dpcGVyLXdyYXBwZXInLCBoZWFkZXJJbmZvcm1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxDYXJvdXNlbC5pbm5lckhUTUwgPSBsaXN0Q2Fyb3VzZWwuaW5uZXJIVE1MO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG5cclxuICAgICAgICAvL3NsaWRlIGxpc3TtgbTrpq3si5wg7ZW064u5IGxpc3TroZwgZGV0YWls67OA6rK9XHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVySW5mb3JtYXRpb24gPSBmaW5kT25lKCcuc2l0ZS1oZWFkZXItaW5mb3JtYXRpb24nKTtcclxuICAgICAgICAgICAgY29uc3QgZGV0YWlsID0gZmluZE9uZSgnLmluZm9ybWF0aW9uLWRldGFpbCcsIGhlYWRlckluZm9ybWF0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGZpbmRPbmUoJy5pbmZvcm1hdGlvbi1saXN0JywgaGVhZGVySW5mb3JtYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGV0YWlsQ2Fyb3VzZWwgPSBuZXcgU3dpcGVyKGZpbmRPbmUoJy5zd2lwZXInLCBkZXRhaWwpLCB7XHJcbiAgICAgICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnZmFkZScsXHJcbiAgICAgICAgICAgICAgICBFZmZlY3RGYWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogXCIuc2l0ZS1oZWFkZXItaW5mb3JtYXRpb24gLnN3aXBlcl9fcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBbUGFnaW5hdGlvbiwgTmF2aWdhdGlvbiwgRWZmZWN0RmFkZV0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlzdENhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgbGlzdCksIHtcclxuICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogXCIuc2l0ZS1oZWFkZXItaW5mb3JtYXRpb24gLmluZm9ybWF0aW9uX19wYWdpbmF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGZpbmRPbmUoJy5pbmZvcm1hdGlvbl9fcGFnaW5nLXByZXYnLCBoZWFkZXJJbmZvcm1hdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiBmaW5kT25lKCcuaW5mb3JtYXRpb25fX3BhZ2luZy1uZXh0JywgaGVhZGVySW5mb3JtYXRpb24pLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2Uoc3dpcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbENhcm91c2VsLnNsaWRlVG9Mb29wKHN3aXBlci5yZWFsSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kdWxlczogW0F1dG9wbGF5LCBQYWdpbmF0aW9uLCBOYXZpZ2F0aW9uLCBFZmZlY3RGYWRlXSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYXJvdXNlbEl0ZW1MaW5rcyA9IGZpbmQoJy5pbmZvcm1hdGlvbi1saXN0X19pdGVtJywgbGlzdCk7XHJcblxyXG4gICAgICAgICAgICBjYXJvdXNlbEl0ZW1MaW5rcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbVBhcmVudERhdGUgPSBpdGVtUGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsQ2Fyb3VzZWwuc2xpZGVUb0xvb3AoaXRlbVBhcmVudERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpc3RDYXJvdXNlbC5zbGlkZVRvTG9vcChpdGVtUGFyZW50RGF0ZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGxvY2F0aW9uTWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gbG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdO1xyXG4gICAgY29uc3QgcGFnZU1lbnUgPSBmaW5kT25lKCcucGFnZS1tZW51Jyk7XHJcbiAgICBjb25zdCBwYWdlTGlua3MgPSBmaW5kKCdhJywgcGFnZU1lbnUpO1xyXG5cclxuICAgIHBhZ2VMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgICAgIGlmIChsaW5rLmhyZWYgPT09IGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xvc2VzdCgnbGknKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJhbmtDYXJvdXNlbCA9ICgpID0+IHtcclxuICAgIGlmICghIWZpbmRPbmUoJ2Zvb3RlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gZmluZE9uZSgnZm9vdGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgZm9vdGVyKSwge1xyXG4gICAgICAgICAgICBsb29wOiAndHJ1ZScsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDgsXHJcbiAgICAgICAgICAgIC8vIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgICAgICBkZWxheTogMzAwMCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG1vZHVsZXM6IFtBdXRvcGxheV0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBzaXRlVG9wID0gKCkgPT4ge1xyXG4gICAgaWYgKCEhZmluZE9uZSgnLnNpdGUtdG9wJykpIHtcclxuICAgICAgICBjb25zdCBzaXRlVG9wID0gZmluZE9uZSgnLnNpdGUtdG9wJyk7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZmluZE9uZSgnLnNpdGUtdG9wX19idXR0b24nLCBzaXRlVG9wKTtcclxuICAgICAgICBjb25zdCBidXR0b25BY3RpdmUgPSAnc2l0ZS10b3BfX2J1dHRvbi0tYWN0aXZlJztcclxuICAgICAgICBjb25zdCBidXR0b25QYXVzZSA9ICdzaXRlLXRvcF9fYnV0dG9uLS1wYXVzZSc7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gZmluZE9uZSgnLnNpdGUtZm9vdGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsaW5rQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmluZE9uZSgnYm9keScpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoYnV0dG9uQWN0aXZlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKGJ1dHRvbkFjdGl2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrUGxheSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhKHBhcnNlSW50KChmb290ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gd2luZG93LmlubmVySGVpZ2h0KSArIGJ1dHRvbi5jbGllbnRIZWlnaHQpIDw9IDApKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChidXR0b25QYXVzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShidXR0b25QYXVzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhZ2VUb3AgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBibGlua0J1dHRvbigpO1xyXG4gICAgICAgIGNoZWNrUGxheSgpO1xyXG5cclxuICAgICAgICBvbih3aW5kb3csICdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJsaW5rQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGNoZWNrUGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvbihidXR0b24sICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBwYWdlVG9wKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgcHJvY2Vzc2luZyA9ICgpID0+IHtcclxuICAgIGlmICghIWZpbmRPbmUoJy5zaXRlLWZvb3RlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gZmluZE9uZSgnLnNpdGUtZm9vdGVyJyk7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKTtcclxuICAgICAgICBjb25zdCBwZXJzb25hbExpbmsgPSBmaW5kT25lKCcucGVyc29uYWwtaW5mb3JtYXRpb24tbGluaycsIGZvb3Rlcik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VsTGluayA9IGZpbmRPbmUoJy5pbWFnZS1pbmZvcm1hdGlvbi1saW5rJywgZm9vdGVyKTtcclxuICAgICAgICAvL2NvbnN0IHByb2Nlc3NpbmcgPSBmaW5kT25lKCcubW9kYWwtLXByb2Nlc3NpbmcnKTtcclxuICAgICAgICBjb25zdCBwZXJzb25hbE1vZGFsID0gZmluZE9uZSgnLm1vZGFsLXBlcnNvbmFsLWluZm9ybWF0aW9uJyk7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VsTW9kYWwgPSBmaW5kT25lKCcubW9kYWwtaW1hZ2UtaW5mb3JtYXRpb24nKTtcclxuXHJcbiAgICAgICAgb24ocGVyc29uYWxMaW5rLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWwub3BlbihwZXJzb25hbE1vZGFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb24oaW1hZ2VsTGluaywgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsLm9wZW4oaW1hZ2VsTW9kYWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2Nyb2xsTW90aW9uID0gKCkgPT4ge1xyXG4gICAgd2luZG93LkFPUyA9IEFPUztcclxuXHJcbiAgICBBT1MuaW5pdCh7XHJcbiAgICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgb24od2luZG93LCAnbG9hZCcsICgpID0+IEFPUy5yZWZyZXNoKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgc25zTGluayA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJ0bkZhY2Vib29rID0gZmluZE9uZSgnLmJ0bi1mYWNlYm9vaycpO1xyXG4gICAgY29uc3QgYnRuVHdpdHRlciA9IGZpbmRPbmUoJy5idG4tdHdpdHRlcicpO1xyXG4gICAgY29uc3Qgc2hhcmVVcmwgPSBmaW5kT25lKCdbcHJvcGVydHk9XCJvZzp1cmxcIl0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcclxuICAgIGNvbnN0IHNoYXJlVGl0bGUgPSBmaW5kT25lKCdbcHJvcGVydHk9XCJvZzp0aXRsZVwiXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xyXG4gICAgY29uc3Qgc2hhcmVEZXNjcmlwdGlvbiA9IGZpbmRPbmUoJ1twcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCJdJykuZ2V0QXR0cmlidXRlKCdjb250ZW50Jyk7XHJcbiAgICBjb25zdCBzaGFyZUltYWdlID0gZmluZE9uZSgnW3Byb3BlcnR5PVwib2c6aW1hZ2VcIl0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcclxuXHJcbiAgICAvL+2OmOydtOyKpOu2gVxyXG4gICAgZnVuY3Rpb24gc2hhcmVGYWNlYm9vaygpIHtcclxuICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVXJsKSwgXCJfYmxhbmtcIiwgXCJ3aWR0aD02MDAsaGVpZ2h0PTQwMFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+2KuOychO2EsFxyXG4gICAgZnVuY3Rpb24gc2hhcmVUd2l0dGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGVuY29kZVRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hhcmVUaXRsZSArICcgJyArIHNoYXJlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGNvbnN0IGVuY29kZVVybCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVVybClcclxuICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9XCIgKyBlbmNvZGVUZXh0ICsgXCImdXJsPVwiICsgZW5jb2RlVXJsLCAnd2lkdGg9NjAwLCBoZWlnaHQ9NDAwLCBzY3JvbGxiYXJzPXllcycpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKGJ0bkZhY2Vib29rLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNoYXJlRmFjZWJvb2soKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9uKGJ0blR3aXR0ZXIsICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2hhcmVUd2l0dGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+yjvOyGjOuzteyCrFxyXG4gICAgKCgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjb3B5VGV4dChub3dVcmwpIHtcclxuICAgICAgICAgICAgLy8gY2xpcGJvYXJkIEFQSSDsgqzsmqlcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgIC53cml0ZVRleHQobm93VXJsKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VSTOydtCDrs7XsgqzrkJjsl4jsirXri4jri6QuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleGVjQ29tbWFuZCDsgqzsmqlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgICAgICAgICAgICAgIHRleHRBcmVhLnZhbHVlID0gbm93VXJsO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIHRleHRBcmVhLnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+uzteyCrCDsi6TtjKgnLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdVUkzsnbQg67O17IKs65CY7JeI7Iq164uI64ukLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgY29weVVybCA9IGZpbmRPbmUoJy5idG4tY29weS11cmwnKTtcclxuICAgICAgICBsZXQgbm93VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG5cclxuICAgICAgICBvbihjb3B5VXJsLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvcHlUZXh0KG5vd1VybCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgc2l0ZU1lbnUsXHJcbiAgICBzaXRlSGVhZGVySW5mb3JtYXRpb24sXHJcbiAgICBsb2NhdGlvbk1lbnUsXHJcbiAgICBiYW5rQ2Fyb3VzZWwsXHJcbiAgICBzaXRlVG9wLFxyXG4gICAgcHJvY2Vzc2luZyxcclxuICAgIHNjcm9sbE1vdGlvbixcclxuICAgIHNuc0xpbmssXHJcbn07IiwiaW1wb3J0IHtmaW5kT25lLCBmaW5kLCBvbiwgZGVsZWdhdGUsIGdldE9mZnNldH0gZnJvbSAnLi4vaGVscGVyJztcclxuaW1wb3J0IHtsb2NhdGlvbk1lbnUsIHNuc0xpbmt9IGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgU3dpcGVyLCB7QXV0b3BsYXksIENvbnRyb2xsZXIsIFBhZ2luYXRpb259IGZyb20gXCJzd2lwZXJcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IE1vZGFsIGZyb20gXCIuLi9Nb2RhbFwiO1xyXG5cclxuY29uc3QgZmV0Y2hTaWRvR3VndW4gPSAoKSA9PiBheGlvcy5nZXQoJy9jb21tb24vdjEvYWRkcmVzcycpLnRoZW4oKHtkYXRhOiB7ZGF0YX19KSA9PiBkYXRhKTtcclxuY29uc3QgSG9sZGluZ1NlYXJjaCA9IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGZpbmRPbmUoJy5ob2xkaW5nLXNlYXJjaCcpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmhlYWRlckhlaWdodCA9IGZpbmRPbmUoJy5zaXRlLWhlYWRlcicpLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtID0gZmluZE9uZSgnLmhvbGRpbmctc2VhcmNoX19mb3JtJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmZvcm1JbnB1dHMgPSBbXHJcbiAgICAgICAgICAgIC4uLmZpbmQoJ2lucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSksIHNlbGVjdCcsIHRoaXMuZm9ybSksXHJcbiAgICAgICAgICAgIC4uLmZpbmQoJ1tuYW1lJD1cImFwcHJhaXNhbF90b3RhbF9hbXRcIl0nLCB0aGlzLmZvcm0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmZvcm1EZXRhaWwgPSBmaW5kT25lKCcuaG9sZGluZy1zZWFyY2hfX2ZpZWxkc2V0LS1kZXRhaWwnLCB0aGlzLmZvcm0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMb2NhaW9uKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdExvY2Fpb24oKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZExvY2F0aW9uID0gZmluZE9uZSgnLmhvbGRpbmctc2VhcmNoX19maWVsZC0tbG9jYXRpb24nLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25TaWRvR3VndW4gPSBmaW5kKCcuaG9sZGluZy1zZWFyY2hfX2lucHV0JywgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvblNpZG8gPSB0aGlzLmxvY2F0aW9uU2lkb0d1Z3VuWzBdO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25TaWRvTmFtZSA9IHRoaXMubG9jYXRpb25TaWRvLm5hbWU7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvblNpZG8ucmVtb3ZlQXR0cmlidXRlKCduYW1lJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb25HdWd1biA9IHRoaXMubG9jYXRpb25TaWRvR3VndW5bMV07XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkd1Z3VuTmFtZSA9IHRoaXMubG9jYXRpb25HdWd1bi5uYW1lO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25HdWd1bi5yZW1vdmVBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uR3VndW5PcmlnaW5PcHRpb24gPSB0aGlzLmxvY2F0aW9uR3VndW4uaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uQWRkVHJpZ2dlciA9IGZpbmRPbmUoJy5ob2xkaW5nLXNlYXJjaF9fYnV0dG9uLS1hZGQtbG9jYXRpb24nLCB0aGlzLmZpZWxkTG9jYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uTGlzdCA9IGZpbmRPbmUoJy5ob2xkaW5nLXNlYXJjaF9fbG9jYXRpb24nLCB0aGlzLmZpZWxkTG9jYXRpb24pO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BZGRMaXN0ID0gbmV3IFNldCgpO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSXRlbXMgPSBmaW5kKCcuaG9sZGluZy1zZWFyY2hfX2xvY2F0aW9uLWl0ZW0nLCB0aGlzLmxvY2F0aW9uTGlzdCk7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25JdGVtID0gbG9jYXRpb25JdGVtcy5zaGlmdCgpO1xyXG4gICAgICAgIGxvY2F0aW9uSXRlbS5yZW1vdmUoKTtcclxuICAgICAgICBsb2NhdGlvbkl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uSXRlbVRlbXBsYXRlID0gbG9jYXRpb25JdGVtLm91dGVySFRNTDtcclxuXHJcbiAgICAgICAgbG9jYXRpb25JdGVtcy5mb3JFYWNoKGxvY2F0aW9uID0+IHRoaXMubG9jYXRpb25BZGRMaXN0LmFkZChmaW5kT25lKCcuaG9sZGluZy1zZWFyY2hfX2xvY2F0aW9uLW5hbWUnLCBsb2NhdGlvbikudGV4dENvbnRlbnQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoU2lkb0d1Z3VuKCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb25EYXRhID0gZGF0YS5yZWR1Y2UoKGRhdGEsIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgZGF0YVtpdGVtLmNvZGVfbmFtZV0gPSBpdGVtLmd1Z3VuO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlU2lkbyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTaWRvKHNpZG9HdWd1bkRhdGEpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uU2lkby5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHNpZG9HdWd1bkRhdGEubWFwKGl0ZW0gPT4gYDxvcHRpb24gdmFsdWU9XCIke2l0ZW0uY29kZX1cIj4ke2l0ZW0uY29kZV9uYW1lfTwvb3B0aW9uPmApLmpvaW4oJycpKTtcclxuICAgICAgICB0aGlzLmZpbmRTaWRvT3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuZmluZEd1Z3VuT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRTaWRvT3B0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uU2lkb09wdGlvbnMgPSBmaW5kKCdvcHRpb24nLCB0aGlzLmxvY2F0aW9uU2lkbyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2lkbygpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5sb2NhdGlvblNpZG8uc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5sb2NhdGlvblNpZG9PcHRpb25zW3NlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5sb2NhdGlvblNpZG9PcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGNvZGUgJiYgbG9jYXRpb24gPyB0aGlzLmxvY2F0aW9uRGF0YVtsb2NhdGlvbl0gOiBbXTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUd1Z3VuKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUd1Z3VuKGd1Z3VuRGF0YSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5sb2NhdGlvbkd1Z3VuT3JpZ2luT3B0aW9uICsgZ3VndW5EYXRhLm1hcChpdGVtID0+IGA8b3B0aW9uIHZhbHVlPVwiJHtpdGVtLmNvZGV9XCI+JHtpdGVtLmNvZGVfbmFtZX08L29wdGlvbj5gKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkd1Z3VuLmlubmVySFRNTCA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5maW5kR3VndW5PcHRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEd1Z3VuT3B0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uR3VndW5PcHRpb25zID0gZmluZCgnb3B0aW9uJywgdGhpcy5sb2NhdGlvbkd1Z3VuKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckd1Z3VuKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uR3VndW4uaW5uZXJIVE1MID0gdGhpcy5sb2NhdGlvbkd1Z3VuT3JpZ2luT3B0aW9uO1xyXG4gICAgICAgIHRoaXMuZmluZEd1Z3VuT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0Rm9ybSgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbCgncmVtb3ZlJyk7XHJcbiAgICAgICAgdGhpcy5jbGVhckd1Z3VuKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckxvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybUlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZU5hbWUgPSBpbnB1dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnc2VsZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZExvY2F0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY2F0aW9uQWRkTGlzdC5zaXplID49IDUpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+y1nOuMgCA16rCc6rmM7KeAIOyEoO2DnSDqsIDriqXtlanri4jri6QuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNpZG9Db2RlID0gdGhpcy5sb2NhdGlvblNpZG8udmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghc2lkb0NvZGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2lkb05hbWUgPSB0aGlzLmxvY2F0aW9uU2lkb09wdGlvbnNbdGhpcy5sb2NhdGlvblNpZG8uc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xyXG5cclxuICAgICAgICBjb25zdCBndWd1bkNvZGUgPSB0aGlzLmxvY2F0aW9uR3VndW4udmFsdWU7XHJcbiAgICAgICAgY29uc3QgZ3VndW5OYW1lID0gdGhpcy5sb2NhdGlvbkd1Z3VuT3B0aW9uc1t0aGlzLmxvY2F0aW9uR3VndW4uc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xyXG4gICAgICAgIGNvbnN0IGhhc0d1Z3VuID0gISEoZ3VndW5OYW1lICYmIGd1Z3VuQ29kZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gaGFzR3VndW4gPyBgJHtzaWRvTmFtZX0gJHtndWd1bk5hbWV9YCA6IHNpZG9OYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sb2NhdGlvbkFkZExpc3QuaGFzKGxvY2F0aW9uKSkge1xyXG4gICAgICAgICAgICBhbGVydCgn7ZW064u5IOyGjOyerOyngOqwgCDsnojsirXri4jri6QuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmxvY2F0aW9uSXRlbVRlbXBsYXRlXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCcqKm5hbWUqKicsIGhhc0d1Z3VuID8gdGhpcy5sb2NhdGlvbkd1Z3VuTmFtZSA6IHRoaXMubG9jYXRpb25TaWRvTmFtZSlcclxuICAgICAgICAgICAgLnJlcGxhY2UoJyoqdmFsdWUqKicsIGhhc0d1Z3VuID8gZ3VndW5Db2RlIDogc2lkb0NvZGUpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCcqKmxvY2F0aW9uKionLCBsb2NhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb25MaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaXRlbSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb25BZGRMaXN0LmFkZChsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTG9jYXRpb24oZXZlbnQsIGxvY2F0aW9uQWRkTGlzdCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuaG9sZGluZy1zZWFyY2hfX2xvY2F0aW9uLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGZpbmRPbmUoJy5ob2xkaW5nLXNlYXJjaF9fbG9jYXRpb24tbmFtZScsIHRhcmdldCkuaW5uZXJUZXh0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgbG9jYXRpb25BZGRMaXN0LmRlbGV0ZShsb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTG9jYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkxpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFkZExpc3QuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVEZXRhaWwoYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlQ2xhc3MgPSAnaG9sZGluZy1zZWFyY2hfX2ZpZWxkc2V0LS1vcGVuJztcclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiAmJiBbJ2FkZCcsICdyZW1vdmUnXS5pbmNsdWRlcyhhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybURldGFpbC5jbGFzc0xpc3RbYWN0aW9uXShhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtRGV0YWlsLmNsYXNzTGlzdC50b2dnbGUoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1EZXRhaWwuY2xhc3NMaXN0LmNvbnRhaW5zKGFjdGl2ZUNsYXNzKSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIHRvcDogZ2V0T2Zmc2V0KHRoaXMuZWxlbWVudCkudG9wIC0gdGhpcy5oZWFkZXJIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRFdmVudHMoKSB7XHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYXBwcmFpc2FsUHJpY2VJbnB1dHMgPSBmaW5kKCcuaG9sZGluZy1zZWFyY2hfX2ZpZWxkLS1hcHByYWlzYWwtcHJpY2UgW3R5cGU9XCJ0ZWxcIl0nKTtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gdGhpcy5mb3JtSW5wdXRzLmZpbHRlcihpbnB1dCA9PiBpbnB1dC50eXBlID09PSAndGVsJyAmJiAhYXBwcmFpc2FsUHJpY2VJbnB1dHMuaW5jbHVkZXMoaW5wdXQpKTtcclxuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gb24oaW5wdXQsICdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFwcHJhaXNhbFByaWNlSW5wdXRzID0gZmluZCgnLmhvbGRpbmctc2VhcmNoX19maWVsZC0tYXBwcmFpc2FsLXByaWNlIGlucHV0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtzdGFydCwgZW5kLCBzdGFydElucHV0LCBlbmRJbnB1dF0gPSBhcHByYWlzYWxQcmljZUlucHV0cztcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRQcmljZSA9IChpbnB1dFVuaXQsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbihpbnB1dFVuaXQsICdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlucHV0VW5pdC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRVbml0LnZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbnB1dFByaWNlKHN0YXJ0SW5wdXQsIHN0YXJ0KTtcclxuICAgICAgICAgICAgaW5wdXRQcmljZShlbmRJbnB1dCwgZW5kKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNldFRyaWdnZXIgPSBmaW5kT25lKCcuaG9sZGluZy1zZWFyY2hfX2J1dHRvbi0tcmVzZXQnLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgb24ocmVzZXRUcmlnZ2VyLCAnY2xpY2snLCB0aGlzLnJlc2V0Rm9ybS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkZXRhaWxUcmlnZ2VyID0gZmluZE9uZSgnLmhvbGRpbmctc2VhcmNoX19idXR0b24tLWRldGFpbCcsIHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBvbihkZXRhaWxUcmlnZ2VyLCAnY2xpY2snLCB0aGlzLnRvZ2dsZURldGFpbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICBvbih0aGlzLmxvY2F0aW9uU2lkbywgJ2NoYW5nZScsIHRoaXMuY2hhbmdlU2lkby5iaW5kKHRoaXMpKTtcclxuICAgICAgICBvbih0aGlzLmxvY2F0aW9uQWRkVHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5hZGRMb2NhdGlvbi5iaW5kKHRoaXMpKTtcclxuICAgICAgICBkZWxlZ2F0ZSh0aGlzLmxvY2F0aW9uTGlzdCwgJy5ob2xkaW5nLXNlYXJjaF9fbG9jYXRpb24tZGVsZXRlJywgJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLnJlbW92ZUxvY2F0aW9uKGV2ZW50LCB0aGlzLmxvY2F0aW9uQWRkTGlzdCkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2V0SG9sZGluZ0RldGFpbHNIZWlnaHQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZmluZE9uZSgnLmhvbGRpbmctdmlld19fZGV0YWlscycpO1xyXG5cclxuICAgIGlmICghZGV0YWlscykgcmV0dXJuO1xyXG5cclxuICAgIG9uKHdpbmRvdywgJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5zY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgZGV0YWlscy5zdHlsZS5jc3NUZXh0ID0gYG92ZXJmbG93OiBoaWRkZW47IGhlaWdodDogJHttZXNzYWdlLnNjcm9sbEhlaWdodH1weGA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBob2xkaW5nUHJpbnQgPSAoKSA9PiB7XHJcbiAgICAvL+2UhOumsO2KuFxyXG4gICAgY29uc3QgaG9sZGluZ1ZpZXcgPSBmaW5kT25lKCcuaG9sZGluZy12aWV3Jyk7XHJcbiAgICBjb25zdCBwcmludCA9IGZpbmRPbmUoJy5idG4tcGFnZS1wcmludCcsIGhvbGRpbmdWaWV3KTtcclxuXHJcbiAgICBvbihwcmludCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9wZW4ocHJpbnQuaHJlZiwgJ2Fzc2V0c1ByaW50JywgXCJsZWZ0PTMwLHRvcD0zMCx3aWR0aD03NDAsaGVpZ2h0PTUwMFwiKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8v64u067O066y86rG0IOumrOyKpO2KuCDtjpjsnbTsp4BcclxuY29uc3QgaG9sZGluZ0NvbGxhdGVyYWxMaXN0ID0gKCkgPT4ge1xyXG4gICAgbmV3IEhvbGRpbmdTZWFyY2goKTtcclxuXHJcbiAgICBsb2NhdGlvbk1lbnUoKTtcclxufTtcclxuXHJcbi8v7Jyg7J6F66y86rG0IOumrOyKpO2KuCDtjpjsnbTsp4BcclxuY29uc3QgaG9sZGluZ0luZmxvd0xpc3QgPSAoKSA9PiB7XHJcbiAgICBsb2NhdGlvbk1lbnUoKTtcclxufTtcclxuXHJcbi8v64u067O066y86rG0IHZpZXcg7Y6Y7J207KeAXHJcbmNvbnN0IGhvbGRpbmdDb2xsYXRlcmFsVmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhvbGRpbmdWaWV3ID0gZmluZE9uZSgnLmhvbGRpbmctdmlldycpO1xyXG5cclxuICAgIC8vY2Fyb3VzZWxcclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaG9sZGluZ1ZpZXdDYXJvdXNlbCA9IGZpbmRPbmUoJy5zd2lwZXInLCBob2xkaW5nVmlldyk7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBmaW5kKCcuc3dpcGVyLXNsaWRlJywgaG9sZGluZ1ZpZXcpO1xyXG5cclxuICAgICAgICBpZihpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIGhvbGRpbmdWaWV3Q2Fyb3VzZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgaG9sZGluZ1ZpZXcpLCB7XHJcbiAgICAgICAgICAgIC8vIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIC8vIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgIC8vICAgICBkZWxheTogNDAwMCxcclxuICAgICAgICAgICAgLy8gICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlcl9fZnJhY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZyYWN0aW9uJyxcclxuICAgICAgICAgICAgICAgIGZvcm1hdEZyYWN0aW9uQ3VycmVudDogZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnMCcgKyBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0RnJhY3Rpb25Ub3RhbDogZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnMCcgKyBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaW5kT25lKCcuc3dpcGVyX19wYWdpbmcnLCBob2xkaW5nVmlldykuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBtb2R1bGVzOiBbQXV0b3BsYXksIFBhZ2luYXRpb24sIENvbnRyb2xsZXJdLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjYXJvdXNlbFByb2dyZXNzYmFyID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgaG9sZGluZ1ZpZXcpLCB7XHJcbiAgICAgICAgICAgIC8vIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBcIi5zd2lwZXJfX3BhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG1vZHVsZXM6IFtQYWdpbmF0aW9uLCBDb250cm9sbGVyXSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2Fyb3VzZWwuY29udHJvbGxlci5jb250cm9sID0gY2Fyb3VzZWxQcm9ncmVzc2JhcjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy/rj4Tsm4DrsJvquLBcclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZmluZE9uZSgnLnBhZ2Utdmlld19fYnRuLWhlbHAnLCBob2xkaW5nVmlldyk7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKTtcclxuICAgICAgICBjb25zdCBob2xkaW5nTW9kYWwgPSBmaW5kT25lKCcuaG9sZGluZy12aWV3LW1vZGFsJyk7XHJcblxyXG4gICAgICAgIGNsYXNzIFJlcG9ydEZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZmluZE9uZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtID0gZmluZE9uZSgnZm9ybScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhY3kgPSBmaW5kKCcucHJpdmFjeS1hZ3JlZScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBmaW5kT25lKCcubmFtZScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsRmlyc3QgPSBmaW5kT25lKCcuZW1haWwtZmlyc3QnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWFpbExhc3QgPSBmaW5kT25lKCcuZW1haWwtbGFzdCcsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsU2VsZWN0ID0gZmluZE9uZSgnLmVtYWlsLXNlbGVjdCcsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsRnVsbCA9IGZpbmRPbmUoJy5lbWFpbC1maXJzdCcsIHRoaXMuZWxlbWVudCkuY2xvc2VzdCgndGQnKS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbFJvdyA9IGZpbmRPbmUoJy50ZWwtcm93JywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGVsID0gZmluZCgnLnRlbCcsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbDEgPSB0aGlzLnRlbFswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGVsMiA9IHRoaXMudGVsWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZWwzID0gdGhpcy50ZWxbMl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbEZ1bGwgPSBmaW5kT25lKCcudGVsLWZ1bGwnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGZpbmRPbmUoJy5ob2xkaW5nLXRpdGxlLWlucHV0JywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudHMgPSBmaW5kT25lKCcuaG9sZGluZy1jb250ZW50cy10ZXh0YXJlYScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBmaW5kKCcuaG9sZGluZy1rZXl3b3JkLWlucHV0JywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5d29yZEFncmVlID0gZmluZE9uZSgnLmtleXdvcmQtYWdyZWUnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZWxSb3cuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlzVmFsaWQoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmFtZS52YWx1ZS50cmltKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+ydtOumhOydhCDsnoXroKXtlZjshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIS9eMDFbMDE2NzldJC8udGVzdCh0aGlzLnRlbDEudmFsdWUudHJpbSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfsl7Drnb3sspjrpbwg7J6F66Cl7ZWY7IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVsMS5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEvXlxcZHs0fSQvLnRlc3QodGhpcy50ZWwyLnZhbHVlLnRyaW0oKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn7Jew65297LKY66W8IOyeheugpe2VmOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbDIuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghL15cXGR7NH0kLy50ZXN0KHRoaXMudGVsMy52YWx1ZS50cmltKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+yXsOudveyymOulvCDsnoXroKXtlZjshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWwzLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZW1haWxGaXJzdC52YWx1ZS50cmltKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+ydtOuplOydvCDso7zshozrpbwg7J6F66Cl7ZWY7IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1haWxGaXJzdC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEvXlthLXpBLVowLTktXStcXC5bYS16QS1aMC05LS5dKyQvLnRlc3QodGhpcy5lbWFpbExhc3QudmFsdWUudHJpbSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfsnbTrqZTsnbzsnYQg7KCV7ZmV7ZWY6rKMIOyeheugpe2VtCDso7zshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWFpbExhc3QuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aXRsZS52YWx1ZS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn7KCc66qp7J2EIOyeheugpe2VmOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGVudHMudmFsdWUudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+uCtOyaqeydhCDsnoXroKXtlZjshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByaXZhY3lbMF0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfqsJzsnbjsoJXrs7TsiJjsp5Eg67CPIOydtOyaqeuPmeydmOyXkCDrj5nsnZjtlbQg7KO87IS47JqULicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5d29yZFswXS52YWx1ZSAhPT0gXCJcIiB8fCB0aGlzLmtleXdvcmRbMV0udmFsdWUgIT09IFwiXCIgfHwgdGhpcy5rZXl3b3JkWzJdLnZhbHVlICE9PSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5rZXl3b3JkQWdyZWUuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgn6rSA7IusIO2CpOybjOuTnCDrqZTsnbzsiJjsi6Drj5nsnZjsl5Ag64+Z7J2Y7ZW0IOyjvOyEuOyalC4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvbkV2ZW50cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLmVtYWlsU2VsZWN0LCAnY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1haWxMYXN0LnZhbHVlID0gdGhpcy5lbWFpbFNlbGVjdC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLmZvcm0sICdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1haWxGdWxsLnZhbHVlID0gYCR7dGhpcy5lbWFpbEZpcnN0LnZhbHVlLnRyaW0oKX1AJHt0aGlzLmVtYWlsTGFzdC52YWx1ZS50cmltKCl9YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVsRnVsbC52YWx1ZSA9IGAke3RoaXMudGVsMS52YWx1ZS50cmltKCl9LSR7dGhpcy50ZWwyLnZhbHVlLnRyaW0oKX0tJHt0aGlzLnRlbDMudmFsdWUudHJpbSgpfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBob2xkaW5nRm9ybSA9IG5ldyBSZXBvcnRGb3JtKCcuaG9sZGluZy12aWV3LW1vZGFsJyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaG9sZGluZ0Zvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsLm9wZW4oaG9sZGluZ01vZGFsKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBzZXRIb2xkaW5nRGV0YWlsc0hlaWdodCgpO1xyXG4gICAgaG9sZGluZ1ByaW50KCk7XHJcbiAgICBzbnNMaW5rKCk7XHJcbn07XHJcblxyXG4vL+ycoOyeheusvOqxtCB2aWV3IO2OmOydtOyngFxyXG5jb25zdCBob2xkaW5nSW5mbG93VmlldyA9ICgpID0+IHtcclxuICAgIHNldEhvbGRpbmdEZXRhaWxzSGVpZ2h0KCk7XHJcbiAgICBob2xkaW5nUHJpbnQoKTtcclxuICAgIHNuc0xpbmsoKTtcclxufTtcclxuXHJcbi8vY3LtiKzsnpDtmozsgqxcclxuY29uc3QgaG9sZGluZ0NySW52ZXN0bWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGludmVzdG1lbnQgPSBmaW5kT25lKCcuaG9sZGluZy1jci1pbnZlc3RtZW50Jyk7XHJcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpO1xyXG4gICAgY29uc3QgdHJpZ2dlcnMgPSBmaW5kKCcuaG9sZGluZy1jci1pbnZlc3RtZW50X19saW5rJywgaW52ZXN0bWVudCk7XHJcbiAgICBjb25zdCBnZXRJZCA9IHRyaWdnZXIgPT4gdHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGNvbnN0IGNvbnRlbnRzID0gdHJpZ2dlcnMucmVkdWNlKChjb250ZW50cywgdHJpZ2dlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZ2V0SWQodHJpZ2dlcik7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbmRPbmUoaWQpO1xyXG5cclxuICAgICAgICBjb250ZW50c1tpZF0gPSBjb250ZW50O1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudHM7XHJcbiAgICB9LCB7fSk7XHJcblxyXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xyXG4gICAgICAgIG9uKHRyaWdnZXIsICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBnZXRJZCh0cmlnZ2VyKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRzW2lkXTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsLm9wZW4oY29udGVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGhvbGRpbmdQcmludCxcclxuICAgIGhvbGRpbmdDb2xsYXRlcmFsTGlzdCxcclxuICAgIGhvbGRpbmdJbmZsb3dMaXN0LFxyXG4gICAgaG9sZGluZ0NvbGxhdGVyYWxWaWV3LFxyXG4gICAgaG9sZGluZ0luZmxvd1ZpZXcsXHJcbiAgICBob2xkaW5nQ3JJbnZlc3RtZW50XHJcbn07IiwiaW1wb3J0IHtmaW5kT25lLCBmaW5kLCBvbn0gZnJvbSAnLi4vaGVscGVyJztcclxuaW1wb3J0IFRhYiBmcm9tIFwiLi4vVGFiXCI7XHJcbmltcG9ydCBTd2lwZXIsIHtBdXRvcGxheSwgQ29udHJvbGxlciwgRWZmZWN0RmFkZSwgUGFnaW5hdGlvbn0gZnJvbSBcInN3aXBlclwiO1xyXG5cclxuLy9DRU8g7J247IKs66eQXHJcbmNvbnN0IGludHJvQ2VvID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaW50cm8gPSBmaW5kT25lKCcuaW50cm8nKTtcclxuXHJcbiAgICAvL3RhYlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgVGFiKGZpbmRPbmUoJy50YWInLCBpbnRybykpO1xyXG4gICAgICAgIHRhYi5tZW51c1swXS5jbGljaygpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBzd2lwZXJcclxuICAgIGNvbnN0IGludHJvQ2VvID0gZmluZE9uZSgnLmludHJvLWNlbycpO1xyXG4gICAgLy8gY29uc3QgY2Fyb3VzZWwgPSBmaW5kT25lKCcuc3dpcGVyJywgaW50cm9DZW8pO1xyXG4gICAgY29uc3QgbWVudXMgPSBbXHJcbiAgICAgICAgJzxhIGhyZWY9XCIjXCIgb25jbGljaz1cImd0YWcoXFwnZXZlbnRcXCcsXFwn7ZWY64uo7YOtXFwnLCB7XFwnZXZlbnRfY2F0ZWdvcnlcXCcgOiBcXCdDRU/snbjsgqzrp5BcXCcsIFxcJ2V2ZW50X2xhYmVsXFwnIDogXFwnQ1Lsi5zsnqXsl63tlaBcXCd9KVwiPkNSKOq4sOyXheq1rOyhsOyhsOyglSkg7Iuc7J6l7J2YPGJyPu2UjOueq+2PvCDsobDshLHqs7wg7LSJ7KeEIOyXre2VoDwvYT4nLFxyXG4gICAgICAgICc8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJndGFnKFxcJ2V2ZW50XFwnLFxcJ+2VmOuLqO2DrVxcJywge1xcJ2V2ZW50X2NhdGVnb3J5XFwnIDogXFwnQ0VP7J247IKs66eQXFwnLCBcXCdldmVudF9sYWJlbFxcJyA6IFxcJ05QTOumrOuNlFxcJ30pXCI+7Iuc7J6lIOy5nO2ZlOyggeyduDxicj5OUEzsi5zsnqXsnZggTGVhZGVyPC9hPicsXHJcbiAgICAgICAgJzxhIGhyZWY9XCIjXCIgb25jbGljaz1cImd0YWcoXFwnZXZlbnRcXCcsXFwn7ZWY64uo7YOtXFwnLCB7XFwnZXZlbnRfY2F0ZWdvcnlcXCcgOiBcXCdDRU/snbjsgqzrp5BcXCcsIFxcJ2V2ZW50X2xhYmVsXFwnIDogXFwn6rK97JiB7ZmY6rK97ZmV66a9XFwnfSlcIj7rj4Xrpr3soIHsnbTqs6A8YnI+6rG07KCE7ZWcIOqyveyYge2ZmOqyvSDtmZXrpr08L2E+JyxcclxuICAgICAgICAnPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZ3RhZyhcXCdldmVudFxcJyxcXCftlZjri6jtg61cXCcsIHtcXCdldmVudF9jYXRlZ29yeVxcJyA6IFxcJ0NFT+yduOyCrOunkFxcJywgXFwnZXZlbnRfbGFiZWxcXCcgOiBcXCftg4Ttg4TtlZwg7KCE66y46rCAIOyhsOyngVxcJ30pXCI+7Je07KCV7KCBIOuBiOq4sOulvCDsp4Dri4w8YnI+7YOE7YOE7ZWcIOyghOusuOqwgCDsobDsp4E8L2E+J1xyXG4gICAgXTtcclxuXHJcbiAgICAvLyBjb25zdCB0aXRsZXMgPSBmaW5kKCdwJywgY2Fyb3VzZWwpO1xyXG4gICAgLy8gY29uc3QgbWVudXMgPSB0aXRsZXMubWFwKCh0aXRsZSkgPT4gdGl0bGUuaW5uZXJIVE1MLnRyaW0oKSk7XHJcblxyXG4gICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgU3dpcGVyKGZpbmRPbmUoJy5pbnRyby1jZW9fX2NvbnRlbnQtc3dpcGVyLWltYWdlJywgaW50cm9DZW8pLCB7XHJcbiAgICAgICAgICAgIC8vIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheToge1xyXG4gICAgICAgICAgICAgICAgZGVsYXk6IDIwMDAwLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyX19tZW51JyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdidWxsZXRzJyxcclxuICAgICAgICAgICAgICAgIHJlbmRlckJ1bGxldChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlcl9fbWVudS1saXN0ICR7Y2xhc3NOYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzc2JhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3NiYXItZmlsbFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bWVudXNbaW5kZXhdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbW9kdWxlczogW0F1dG9wbGF5LCBQYWdpbmF0aW9uLCBFZmZlY3RGYWRlLCBDb250cm9sbGVyXSxcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNhcm91c2VsVGV4dCA9IG5ldyBTd2lwZXIoZmluZE9uZSgnLmludHJvLWNlb19fY29udGVudC1zd2lwZXItdGV4dCcsIGludHJvQ2VvKSwge1xyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgbW9kdWxlczogW0NvbnRyb2xsZXJdLFxyXG4gICAgICAgIHNpbXVsYXRlVG91Y2g6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY2Fyb3VzZWwuY29udHJvbGxlci5jb250cm9sID0gY2Fyb3VzZWxUZXh0O1xyXG5cclxuXHJcbn1cclxuXHJcbi8v7Jyk66as6rK97JiBXHJcbmNvbnN0IGludHJvRXRoaWNhbE1hbmFnZW1lbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBpbnRybyA9IGZpbmRPbmUoJy5pbnRybycpO1xyXG5cclxuICAgIGNsYXNzIFJlcG9ydEZvcm0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZmluZE9uZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBmaW5kT25lKCdmb3JtJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5yZXBseSA9IGZpbmQoJy5yZXBseScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZSA9IGZpbmRPbmUoJy5maWxlJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEZpbGUgPSBmaW5kT25lKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScsIHRoaXMuZmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QgPSBmaW5kT25lKCd1bCcsIHRoaXMuZmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpdmFjeSA9IGZpbmQoJy5wcml2YWN5LWFncmVlJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gZmluZE9uZSgnLm5hbWUnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsRmlyc3QgPSBmaW5kT25lKCcuZW1haWwtZmlyc3QnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsTGFzdCA9IGZpbmRPbmUoJy5lbWFpbC1sYXN0JywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5lbWFpbFNlbGVjdCA9IGZpbmRPbmUoJy5lbWFpbC1zZWxlY3QnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsRnVsbCA9IGZpbmRPbmUoJy5lbWFpbC1maXJzdCcsIHRoaXMuZWxlbWVudCkuY2xvc2VzdCgndGQnKS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgICAgIHRoaXMudGVsUm93ID0gZmluZE9uZSgnLnRlbC1yb3cnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnRlbCA9IGZpbmQoJy50ZWwnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnRlbDEgPSB0aGlzLnRlbFswXTtcclxuICAgICAgICAgICAgdGhpcy50ZWwyID0gdGhpcy50ZWxbMV07XHJcbiAgICAgICAgICAgIHRoaXMudGVsMyA9IHRoaXMudGVsWzJdO1xyXG4gICAgICAgICAgICB0aGlzLnRlbEZ1bGwgPSBmaW5kT25lKCcudGVsLWZ1bGwnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gZmluZE9uZSgnLnJlcG9ydC10aXRsZS1pbnB1dCcsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudHMgPSBmaW5kT25lKCcucmVwb3J0LWNvbnRlbnRzJywgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDEwICogMTAyNCAqIDEwMjQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldCgpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGVsUm93LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNGaWxlVmFpbGQoZmlsZSkge1xyXG4gICAgICAgICAgICBpZiAoZmlsZS5zaXplID49IHRoaXMuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+2MjOydvCDstZzrjIAg7YGs6riw64qUIDEwTUIg7J6F64uI64ukLicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEvLitcXC4ocGRmfHBwdHxwcHR4fHhsc3x4bHN4fGRvY3xkb2N4fGpwZ3xwbmcpJC9pLnRlc3QoZmlsZS5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+2MjOydvCDtmJXsi53snYQg7ZmV7J247ZW07KO87IS47JqULicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGVGaWxlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RmlsZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNWYWxpZCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5hbWUudmFsdWUudHJpbSgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ydtOumhOydhCDsnoXroKXtlZjshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5lbWFpbEZpcnN0LnZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfsnbTrqZTsnbwg7KO87IaM66W8IOyeheugpe2VmOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1haWxGaXJzdC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEvXlthLXpBLVowLTktXStcXC5bYS16QS1aMC05LS5dKyQvLnRlc3QodGhpcy5lbWFpbExhc3QudmFsdWUudHJpbSgpKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ydtOuplOydvOydhCDsoJXtmZXtlZjqsowg7J6F66Cl7ZW0IOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1haWxMYXN0LmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5uZWNlc3NhcnlTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghL14wMVswMTY3OV0kLy50ZXN0KHRoaXMudGVsMS52YWx1ZS50cmltKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+yXsOudveyymOulvCDsnoXroKXtlZjshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWwxLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIS9eXFxkezR9JC8udGVzdCh0aGlzLnRlbDIudmFsdWUudHJpbSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfsl7Drnb3sspjrpbwg7J6F66Cl7ZWY7IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVsMi5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEvXlxcZHs0fSQvLnRlc3QodGhpcy50ZWwzLnZhbHVlLnRyaW0oKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn7Jew65297LKY66W8IOyeheugpe2VmOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbDMuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGl0bGUudmFsdWUudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn7KCc66qp7J2EIOyeheugpe2VmOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250ZW50cy52YWx1ZS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfrgrTsmqnsnYQg7J6F66Cl7ZWY7IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByaXZhY3lbMF0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+qwnOyduOygleuztOulvCDsnITtlZwg7J207Jqp7J6QIOuPmeydmCDsgqztla3sl5Ag64+Z7J2Y7ZW0IOyjvOyEuOyalC4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25FdmVudHMoKSB7XHJcbiAgICAgICAgICAgIG9uKHRoaXMuaW5wdXRGaWxlLCAnY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlRmlsZSA9IHRoaXMuaW5wdXRGaWxlLmZpbGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmlsZVZhaWxkKGNob2ljZUZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5pbm5lckhUTUwgPSBgPGxpPjxzcGFuPiR7Y2hvaWNlRmlsZS5uYW1lfTwvc3Bhbj48YnV0dG9uIHR5cGU9XCJidXR0b25cIj48c3Bhbj7sgq3soJw8L3NwYW4+PC9idXR0b24+PC9saT5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVwbHkuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbihsYWJlbCwgJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeVN0YXR1cyA9ICEhaW5kZXggPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWxSb3cuY2xhc3NMaXN0W2luZGV4ID09PSAwID8gICdhZGQnIDogJ3JlbW92ZSddKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9uKHRoaXMuZW1haWxTZWxlY3QsICdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsTGFzdC52YWx1ZSA9IHRoaXMuZW1haWxTZWxlY3QudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9uKHRoaXMuZWxlbWVudCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFldmVudC50YXJnZXQuY2xvc2VzdChgLmZpbGUgdWwgYnV0dG9uYCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISFldmVudC50YXJnZXQuY2xvc2VzdCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlybSgn7KCc7Lac7ZWY7Iuc6rKg7Iq164uI6rmMPycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtYWlsRnVsbC52YWx1ZSA9IGAke3RoaXMuZW1haWxGaXJzdC52YWx1ZS50cmltKCl9QCR7dGhpcy5lbWFpbExhc3QudmFsdWUudHJpbSgpfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVjZXNzYXJ5U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWxGdWxsLnZhbHVlID0gYCR7dGhpcy50ZWwxLnZhbHVlLnRyaW0oKX0tJHt0aGlzLnRlbDIudmFsdWUudHJpbSgpfS0ke3RoaXMudGVsMy52YWx1ZS50cmltKCl9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb24odGhpcy5mb3JtLCAnc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vdGFiXHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGV0aGljUmVwb3J0Rm9ybSA9IG5ldyBSZXBvcnRGb3JtKCcucmVwb3J0LS1ldGhpYycpO1xyXG4gICAgICAgIGNvbnN0IGltcHJvcGVyUmVwb3J0Rm9ybSA9IG5ldyBSZXBvcnRGb3JtKCcucmVwb3J0LS1pbXByb3BlcicpO1xyXG5cclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgVGFiKGZpbmRPbmUoJy50YWInLCBpbnRybyksICgpID0+IHtcclxuICAgICAgICAgICAgZXRoaWNSZXBvcnRGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGltcHJvcGVyUmVwb3J0Rm9ybS5yZXNldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRhYi5tZW51c1swXS5jbGljaygpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL+uwsOqyveydtOuvuOyngCDrs4Dqsr1cclxuICAgICgoKT0+IHtcclxuICAgICAgICBjb25zdCB0YWJOYXYgPSBmaW5kT25lKCcudGFiX19uYXYnLCBpbnRybyk7XHJcbiAgICAgICAgY29uc3QgdGFiSXRlbXMgPSBmaW5kKCcudGFiX19tZW51JywgaW50cm8pO1xyXG5cclxuICAgICAgICB0YWJJdGVtcy5mb3JFYWNoKCh0YWJJdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBvbih0YWJJdGVtLCAnY2xpY2snLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGFiTmF2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2Fzc2V0cy9pbWFnZXMvaW50cm8vZXRoaWNhbC1tYW5hZ2VtZW50L2ltZ19ldGhpY2FsX2NvbjFfJHtpbmRleCArIDF9LmpwZylgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vbWFpbiBiYW5uZXIg7YG066at7IucIOycpOumrOqyveyYgSDtlbTri7kg7YOtIOydtOuPmVxyXG4gICAgKCgpPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGZpbmRPbmUoJy5zaXRlLWhlYWRlcicpLmNsaWVudEhlaWdodDtcclxuICAgICAgICBjb25zdCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3QgcGFnZUlkID0gcGFnZVVybC5zcGxpdCgnIycpLnJldmVyc2UoKVswXTtcclxuICAgICAgICBjb25zdCBwYWdlTnVtID0gIHBhZ2VJZC5zdWJzdHIoMyw0KTtcclxuXHJcbiAgICAgICAgaWYocGFnZUlkID09PSAndGFiJyArIHBhZ2VOdW0pIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgIHRvcDogaW50cm8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gaGVhZGVySGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYl9fbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ3RhYl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJfX21lbnUnICsgcGFnZU51bSkuY2xhc3NMaXN0LmFkZCgndGFiX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYl9fcGFuZWwnKS5jbGFzc0xpc3QucmVtb3ZlKCd0YWJfX3BhbmVsLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYl9fcGFuZWwnKS5jbGFzc0xpc3QucmVtb3ZlKCd0YWJfX3BhbmVsLS1pbicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiX19wYW5lbCcgKyBwYWdlTnVtKS5jbGFzc0xpc3QuYWRkKCd0YWJfX3BhbmVsLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYl9fcGFuZWwnICsgcGFnZU51bSkuY2xhc3NMaXN0LmFkZCgndGFiX19wYW5lbC0taW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBpbnRyb0NlbyxcclxuICAgIGludHJvRXRoaWNhbE1hbmFnZW1lbnQsXHJcbn0iLCJpbXBvcnQge2ZpbmRPbmUsIGZpbmQsIG9ufSBmcm9tICcuLi9oZWxwZXInO1xyXG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xyXG5pbXBvcnQgU3dpcGVyLCB7QXV0b3BsYXksIEVmZmVjdEZhZGUsIE5hdmlnYXRpb24sIFBhZ2luYXRpb24sIFNjcm9sbGJhcn0gZnJvbSBcInN3aXBlclwiO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSBcIi4uL01vZGFsXCI7XHJcbmltcG9ydCBUYWIgZnJvbSBcIi4uL1RhYlwiO1xyXG5cclxud2luZG93LkNvb2tpZXMgPSBDb29raWVzO1xyXG5cclxuY29uc3QgbWFpbiA9ICgpID0+IHtcclxuICAgIC8vbWFpbiB2aXN1YWxcclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFpbkludHJvID0gZmluZE9uZSgnLm1haW5fX2ludHJvJyk7XHJcbiAgICAgICAgY29uc3QgY2Fyb3VzZWwgPSBmaW5kT25lKCcuc3dpcGVyJywgbWFpbkludHJvKTtcclxuICAgICAgICBjb25zdCBtZW51cyA9IFsnMDEnLCcwMicsJzAzJ107XHJcblxyXG4gICAgICAgIG9uKHdpbmRvdywgJ2xvYWQnLCAoKSA9PiBuZXcgU3dpcGVyKGNhcm91c2VsLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgICAgICBkZWxheTogNDAwMCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlcl9fbWVudScsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogJ2J1bGxldHMnLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyQnVsbGV0KGluZGV4LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpcGVyX19tZW51LWxpc3QgJHtjbGFzc05hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzc2Jhci1maWxsXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHttZW51c1tpbmRleF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc3dpcGVyX19idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyX19idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb2R1bGVzOiBbQXV0b3BsYXksUGFnaW5hdGlvbixOYXZpZ2F0aW9uXSxcclxuICAgICAgICB9KSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vbWFpbiDsgqzsl4XshozqsJwg67Cw64SIXHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGludHJvQmFubmVyID0gZmluZE9uZSgnLm1haW5fX2ludHJvLWJhbm5lcicpO1xyXG4gICAgICAgIGNvbnN0IHRhYkxpc3RzID0gZmluZCgnZGwgZGl2JywgaW50cm9CYW5uZXIpO1xyXG5cclxuICAgICAgICB0YWJMaXN0cy5mb3JFYWNoKHRhYkxpc3QgPT4ge1xyXG4gICAgICAgICAgICB0YWJMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhYkxpc3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRhYkxpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YWJMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL21haW4gbmV3c1xyXG4gICAgKCgpID0+IHtcclxuICAgICAgICBjb25zdCBtYWluTmV3cyA9IGZpbmRPbmUoJy5tYWluX19uZXdzJyk7XHJcbiAgICAgICAgY29uc3QgdGFiTGlzdCA9IGZpbmQoJ2xpJywgbWFpbk5ld3MpO1xyXG4gICAgICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gZmluZCgnLm1haW5fX25ld3MtaXRlbScpO1xyXG4gICAgICAgIGNvbnN0IHRhYkxpbmsgPSBmaW5kKCcubWFpbl9fbmV3cy1tb3JlLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBsZXQgYWN0aXZlQ29udGVudCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0YWJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRhYkxpc3RbaV0ucXVlcnlTZWxlY3RvcignYScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDsgajx0YWJMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiTGlzdFtqXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRzW2pdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiTGlua1tqXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRhYkxpbmtbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0aXZlQ29udGVudCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFjdGl2ZUNvbnRlbnQpLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy9tYWluIG1vZGFsXHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZ2dsZU1haW5Nb2RhbCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGZpbmRPbmUoJ2JvZHknKTtcclxuICAgICAgICAgICAgY29uc3QgbWFpbk1vZGFsID0gZmluZE9uZSgnLm1haW5fX21vZGFsJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQWN0aXZlID0gJ21vZGFsLW9wZW4nO1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbE9wZW4gPSAnbW9kYWwtLW9wZW4nO1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbEZhZGUgPSAnbW9kYWwtLWZhZGUnO1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbEl0ZW1zID0gZmluZCgnLm1vZGFsX19jb250YWluZXInLCBtYWluTW9kYWwpO1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheUNsb3NlcyA9IGZpbmQoJy5tb2RhbF9fYnV0dG9uLWNvb2tpZScsIG1haW5Nb2RhbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bkNsb3NlcyA9IGZpbmQoJy5tb2RhbF9fYnV0dG9uLWNsb3NlJywgbWFpbk1vZGFsKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUobW9kYWxBY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgbWFpbk1vZGFsLmNsYXNzTGlzdC5yZW1vdmUobW9kYWxPcGVuKTtcclxuICAgICAgICAgICAgICAgIG1haW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKG1vZGFsRmFkZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOugiOydtOyWtCDtjJ3sl4UgNOqwnOulvCDsmKzrpqzqs6Ag6re47KSRIDPqsJzrpbwg7Jik64qY7ZWY66OoIOyXtOyngOyViuq4sOulvCDtlojripTrjbBcclxuICAgICAgICAgICAgLy8g6re465+8IDHqsJzrp4wg65ag7JW87ZWY64qU642wLiDslYTrrLTqsoPrj4Qg65yo7KeAIOyViuuKlOuLpC5cclxuICAgICAgICAgICAgbW9kYWxJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoYG1vZGFsX19jb250YWluZXItLSR7Q29va2llcy5nZXQoaXRlbS5jbGFzc0xpc3RbMV0pfWApICYmIGl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIO2RuOyJrOuQnOqyjCDtlZjrgpjrj4Qg7JeG64uk66m0IOuztOyXrOyjvOqzoCDtkbjsiazrkJzqsowg7ZW064u5IOyVhOydtO2FnOqzvCDqsJnri6TrqbQg7JWI67O07J206rKMXHJcbiAgICAgICAgICAgIC8vIO2MneyXheydmCDqsK/siJjsmYAg7L+g7YKkIOy2lOqwgOuQnCDqsK/siJjqsIAg6rCZ64uk66m0IO2MneyXhSDsnpDssrTrpbwg7Je07KeAIOyViuydjCDslYTri4jrnbzrqbQg7Yyd7JeFIOyXtOq4sFxyXG4gICAgICAgICAgICBpZiAoIWZpbmQoJy5tb2RhbF9fY29udGFpbmVyJywgbWFpbk1vZGFsKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ2xvc2UoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKG1vZGFsQWN0aXZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYWluTW9kYWwuY2xhc3NMaXN0LmFkZChtb2RhbE9wZW4pO1xyXG4gICAgICAgICAgICAgICAgbWFpbk1vZGFsLmNsYXNzTGlzdC5hZGQobW9kYWxGYWRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g7Jik64qY7ZWY66OoIOuztOyngCDslYrquLAg67KE7Yq8XHJcbiAgICAgICAgICAgIHRvZGF5Q2xvc2VzLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9kYXlEYXRlID0gbmV3IERhdGUocGFyc2VJbnQodG9kYXlEYXRlLmdldFRpbWUoKSAvIDg2NDAwMDAwKSAqIDg2NDAwMDAwICsgNTQwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9kYXlEYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbihidXR0b24sICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXJTZXFDbGFzcyA9IGJ1dHRvbi5jbG9zZXN0KCcubW9kYWxfX2NvbnRhaW5lcicpLmNsYXNzTGlzdFsxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaW5kKCcubW9kYWxfX2NvbnRhaW5lcicsIGJ1dHRvbi5jbG9zZXN0KCcubWFpbl9fbW9kYWwnKSkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIENvb2tpZXMuc2V0KGNvbnRhaW5lclNlcUNsYXNzLCBjb250YWluZXJTZXFDbGFzcy5zcGxpdCgnLS0nKVsxXSwge2V4cGlyZXM6IHRvZGF5RGF0ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsSXRlbXNbaW5kZXhdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDsnbzrsJjri6vquLAg67KE7Yq8XHJcbiAgICAgICAgICAgIGJ0bkNsb3Nlcy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbihidXR0b24sICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaW5kKCcubW9kYWxfX2NvbnRhaW5lcicsIGJ1dHRvbi5jbG9zZXN0KCcubWFpbl9fbW9kYWwnKSkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsSXRlbXNbaW5kZXhdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlTWFpbk1vZGFsKCk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vbWFpbiDqs7Xsp4Dsgqztla1cclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgbm90aWNlID0gZmluZE9uZSgnLm1haW5fX25vdGljZScpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZmluZCgnLnN3aXBlci1zbGlkZScsIG5vdGljZSk7XHJcblxyXG4gICAgICAgIGlmKGl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgU3dpcGVyKGZpbmRPbmUoJy5zd2lwZXInLCBub3RpY2UpLHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgICAgICBkZWxheTogNDAwMCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlcl9fYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlcl9fYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb2R1bGVzOiBbQXV0b3BsYXksTmF2aWdhdGlvbl0sXHJcblxyXG4gICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaW5kT25lKCcuc3dpcGVyX19wYWdpbmcnLCBub3RpY2UpLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmRPbmUoJy5zd2lwZXJfX3BhZ2luZycsIG5vdGljZSkucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy9tYWluIGFib3V0XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFib3V0ID0gZmluZE9uZSgnLm1haW5fX2Fib3V0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFib3V0UG9zaXRpb24gPSBmaW5kT25lKCcubWFpbl9fYWJvdXQnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxMb2NhdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWJvdXRQb3NpdGlvbiA9ICcgKyBhYm91dFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc2Nyb2xsTG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYoc2Nyb2xsTG9jYXRpb24gKyAyMCAgPj0gYWJvdXRQb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICBhYm91dC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbGxhdGVyYWxDYXJvdXNlbCgpO1xyXG4gICAgaW5mbG93Q2Fyb3VzZWwoKTtcclxufTtcclxuXHJcbi8v64u067O066y86rG0XHJcbmNvbnN0IGNvbGxhdGVyYWxDYXJvdXNlbCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNpdGVNYWluID0gZmluZE9uZSgnLm1haW4nKTtcclxuICAgIGNvbnN0IGNvbGxhdGVyYWwgPSBmaW5kT25lKCcuaW5mb3JtYXRpb25fX2NvbGxhdGVyYWwnLCBzaXRlTWFpbik7XHJcbiAgICBjb25zdCBkZXRhaWwgPSBmaW5kT25lKCcuaW5mb3JtYXRpb24tZGV0YWlsJywgY29sbGF0ZXJhbCk7XHJcbiAgICBjb25zdCBsaXN0ID0gZmluZE9uZSgnLmluZm9ybWF0aW9uLWxpc3QnLCBjb2xsYXRlcmFsKTtcclxuXHJcbiAgICAvL+uLtOuztOusvOqxtCBsaXN0IGRldGFpbOuhnCDrs7Xsgqwg67aZ7Jes64Sj6riwXHJcbiAgICAoKCk9PiB7XHJcbiAgICAgICAgY29uc3QgZGV0YWlsQ2Fyb3VzZWwgPSBmaW5kT25lKCcuc3dpcGVyLXdyYXBwZXInLCBkZXRhaWwpO1xyXG4gICAgICAgIGNvbnN0IGxpc3RDYXJvdXNlbCA9IGZpbmRPbmUoJy5zd2lwZXItd3JhcHBlcicsIGxpc3QpO1xyXG5cclxuICAgICAgICBkZXRhaWxDYXJvdXNlbC5pbm5lckhUTUwgPSBsaXN0Q2Fyb3VzZWwuaW5uZXJIVE1MO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL+uLtOuztOusvOqxtCBzbGlkZSBkZXRhaWxcclxuICAgIGNvbnN0IGRldGFpbENhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgZGV0YWlsKSwge1xyXG4gICAgICAgIHNwZWVkOiAwLFxyXG4gICAgICAgIC8vIHNpbXVsYXRlVG91Y2g6IGZhbHNlLCAgLy/rhKPsnLzrqbQgY3VycmVudOqwkiDslYjrsJTrgJxcclxuICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8v64u067O066y86rG0IHNsaWRlIGxpc3RcclxuICAgIGNvbnN0IGxpc3RDYXJvdXNlbCA9IG5ldyBTd2lwZXIoZmluZE9uZSgnLnN3aXBlcicsIGxpc3QpLCB7XHJcbiAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAvLyBzaW11bGF0ZVRvdWNoOiBmYWxzZSwgIC8v64Sj7Jy866m0IGN1cnJlbnTqsJIg7JWI67CU64CcXHJcbiAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBwcmV2RWw6IGZpbmRPbmUoJy5pbmZvcm1hdGlvbl9fcGFnaW5nLXByZXYnLCBjb2xsYXRlcmFsKSxcclxuICAgICAgICAgICAgbmV4dEVsOiBmaW5kT25lKCcuaW5mb3JtYXRpb25fX3BhZ2luZy1uZXh0JywgY29sbGF0ZXJhbCksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiBcIi5tYWluIC5pbmZvcm1hdGlvbl9fY29sbGF0ZXJhbCAuaW5mb3JtYXRpb25fX3BhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIHNsaWRlQ2hhbmdlKHN3aXBlcikge1xyXG4gICAgICAgICAgICAgICAgZGV0YWlsQ2Fyb3VzZWwuc2xpZGVUb0xvb3Aoc3dpcGVyLnJlYWxJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzd2lwZXIucmVhbEluZGV4KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLnNsaWRlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9kdWxlczogW0F1dG9wbGF5LE5hdmlnYXRpb24sUGFnaW5hdGlvbl0sXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9zbGlkZSBsaXN07YG066at7IucIO2VtOuLuSBsaXN066GcIGRldGFpbOuzgOqyvVxyXG4gICAgY29uc3QgY2Fyb3VzZWxJdGVtTGlua3MgPSBmaW5kKCcuaW5mb3JtYXRpb24tbGlzdF9faXRlbScsIGxpc3QpO1xyXG5cclxuICAgIGNhcm91c2VsSXRlbUxpbmtzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVBhcmVudCA9IGl0ZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbVBhcmVudERhdGUgPSBpdGVtUGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcclxuXHJcbiAgICAgICAgICAgIGRldGFpbENhcm91c2VsLnNsaWRlVG9Mb29wKGl0ZW1QYXJlbnREYXRlKTtcclxuICAgICAgICAgICAgLy8gbGlzdENhcm91c2VsLnNsaWRlVG9Mb29wKGl0ZW1QYXJlbnREYXRlLCAwKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy/snKDsnoXrrLzqsbRcclxuY29uc3QgaW5mbG93Q2Fyb3VzZWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaXRlTWFpbiA9IGZpbmRPbmUoJy5tYWluJyk7XHJcbiAgICBjb25zdCBpbmZsb3cgPSBmaW5kT25lKCcuaW5mb3JtYXRpb25fX2luZmxvdycsIHNpdGVNYWluKTtcclxuICAgIGNvbnN0IGRldGFpbCA9IGZpbmRPbmUoJy5pbmZvcm1hdGlvbi1kZXRhaWwnLCBpbmZsb3cpO1xyXG4gICAgY29uc3QgbGlzdCA9IGZpbmRPbmUoJy5pbmZvcm1hdGlvbi1saXN0JywgaW5mbG93KTtcclxuXHJcbiAgICAvL+ycoOyeheusvOqxtCBsaXN0IGRldGFpbOuhnCDrs7Xsgqwg67aZ7Jes64Sj6riwXHJcbiAgICAoKCk9PiB7XHJcbiAgICAgICAgY29uc3QgZGV0YWlsQ2Fyb3VzZWwgPSBmaW5kT25lKCcuc3dpcGVyLXdyYXBwZXInLCBkZXRhaWwpO1xyXG4gICAgICAgIGNvbnN0IGxpc3RDYXJvdXNlbCA9IGZpbmRPbmUoJy5zd2lwZXItd3JhcHBlcicsIGxpc3QpO1xyXG5cclxuICAgICAgICBkZXRhaWxDYXJvdXNlbC5pbm5lckhUTUwgPSBsaXN0Q2Fyb3VzZWwuaW5uZXJIVE1MO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL+ycoOyeheusvOqxtCBzbGlkZSBkZXRhaWxcclxuICAgIGNvbnN0IGRldGFpbENhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgZGV0YWlsKSwge1xyXG4gICAgICAgIHNwZWVkOiAwLFxyXG4gICAgICAgIC8vIHNpbXVsYXRlVG91Y2g6IGZhbHNlLCAgLy/rhKPsnLzrqbQgY3VycmVudOqwkiDslYjrsJTrgJxcclxuICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8v7Jyg7J6F66y86rG0IHNsaWRlIGxpc3RcclxuICAgIGNvbnN0IGxpc3RDYXJvdXNlbCA9IG5ldyBTd2lwZXIoZmluZE9uZSgnLnN3aXBlcicsIGxpc3QpLCB7XHJcbiAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAvLyBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcclxuICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgIHByZXZFbDogZmluZE9uZSgnLmluZm9ybWF0aW9uX19wYWdpbmctcHJldicsIGluZmxvdyksXHJcbiAgICAgICAgICAgIG5leHRFbDogZmluZE9uZSgnLmluZm9ybWF0aW9uX19wYWdpbmctbmV4dCcsIGluZmxvdyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiBcIi5tYWluIC5pbmZvcm1hdGlvbl9faW5mbG93IC5pbmZvcm1hdGlvbl9fcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImZyYWN0aW9uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBzbGlkZUNoYW5nZShzd2lwZXIpIHtcclxuICAgICAgICAgICAgICAgIGRldGFpbENhcm91c2VsLnNsaWRlVG9Mb29wKHN3aXBlci5yZWFsSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3dpcGVyLnJlYWxJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vZHVsZXM6IFtBdXRvcGxheSxOYXZpZ2F0aW9uLFBhZ2luYXRpb25dLFxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vc2xpZGUgbGlzdO2BtOumreyLnCDtlbTri7kgbGlzdOuhnCBkZXRhaWzrs4Dqsr1cclxuICAgIGNvbnN0IGNhcm91c2VsSXRlbUxpbmtzID0gZmluZCgnLmluZm9ybWF0aW9uLWxpc3RfX2l0ZW0nLCBsaXN0KTtcclxuXHJcbiAgICBjYXJvdXNlbEl0ZW1MaW5rcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1QYXJlbnREYXRlID0gaXRlbVBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxDYXJvdXNlbC5zbGlkZVRvTG9vcChpdGVtUGFyZW50RGF0ZSk7XHJcbiAgICAgICAgICAgIC8vIGxpc3RDYXJvdXNlbC5zbGlkZVRvTG9vcChpdGVtUGFyZW50RGF0ZSwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIG1haW4sXHJcbiAgICBjb2xsYXRlcmFsQ2Fyb3VzZWwsXHJcbiAgICBpbmZsb3dDYXJvdXNlbCxcclxufTsiLCJpbXBvcnQge2ZpbmRPbmUsIGZpbmQsIG9ufSBmcm9tIFwiLi4vaGVscGVyXCI7XHJcbmltcG9ydCB7bG9jYXRpb25NZW51LCBzbnNMaW5rfSBmcm9tIFwiLi9jb21tb25cIjtcclxuaW1wb3J0IFN3aXBlciwge0F1dG9wbGF5LCBOYXZpZ2F0aW9ufSBmcm9tIFwic3dpcGVyXCI7XHJcbmltcG9ydCBEcm9wZG93blNlbGVjdCBmcm9tIFwiLi4vRHJvcGRvd25TZWxlY3RcIjtcclxuXHJcbmNvbnN0IG5ld3NQcmludCA9ICgpID0+IHtcclxuICAgIC8v7ZSE66aw7Yq4XHJcbiAgICBjb25zdCBib2R5ICA9IGZpbmRPbmUoJ2JvZHknKTtcclxuICAgIGNvbnN0IHBhZ2VWaWV3ID0gZmluZE9uZSgnLnBhZ2UtdmlldycpO1xyXG4gICAgY29uc3QgcHJpbnQgPSBmaW5kT25lKCcuYnRuLXBhZ2UtcHJpbnQnLCBwYWdlVmlldyk7XHJcblxyXG4gICAgb24ocHJpbnQsICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncHJpbnQnKTtcclxuICAgICAgICB3aW5kb3cucHJpbnQoKTtcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW50Jyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8v6rO17KeA7IKs7ZWtIOumrOyKpO2KuFxyXG5jb25zdCBuZXdzTm90aWNlTGlzdCA9ICgpID0+IHtcclxuICAgICgoKT0+IHtcclxuICAgICAgICBjb25zdCBuZXdzQ2Fyb3VzZWwgPSBmaW5kT25lKCcubmV3cy1zd2lwZXInKTtcclxuICAgICAgICBjb25zdCBjYXJvdXNlbCA9IG5ldyBTd2lwZXIoZmluZE9uZSgnLnN3aXBlcicsIG5ld3NDYXJvdXNlbCksIHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgLy8gYXV0b3BsYXk6IHtcclxuICAgICAgICAgICAgLy8gICAgIGRlbGF5OiA0MDAwLFxyXG4gICAgICAgICAgICAvLyAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLm5ld3Mtc3dpcGVyX19wYWdpbmctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLm5ld3Mtc3dpcGVyX19wYWdpbmctLW5leHQnLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbW9kdWxlczogW0F1dG9wbGF5LE5hdmlnYXRpb25dLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgbG9jYXRpb25NZW51KCk7XHJcbiAgICBjb25zdCBkcm9wZG93bj0gbmV3IERyb3Bkb3duU2VsZWN0KCcuZHJvcGRvd24nKTtcclxufTtcclxuXHJcbi8v6rO17KeA7IKs7ZWtIOyDgeyEuFxyXG5jb25zdCBuZXdzTm90aWNlVmlldyA9ICgpID0+IHtcclxuICAgIG5ld3NQcmludCgpO1xyXG4gICAgc25zTGluaygpO1xyXG59O1xyXG5cclxuLy/ri7nsgqzshozsi50g66as7Iqk7Yq4XHJcbmNvbnN0IG5ld3NDb21wYW55TmV3c0xpc3QgPSAoKSA9PiB7XHJcbiAgICAoKCk9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3c0Nhcm91c2VsID0gZmluZE9uZSgnLm5ld3Mtc3dpcGVyJyk7XHJcbiAgICAgICAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgU3dpcGVyKGZpbmRPbmUoJy5zd2lwZXInLCBuZXdzQ2Fyb3VzZWwpLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIC8vIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgIC8vICAgICBkZWxheTogNDAwMCxcclxuICAgICAgICAgICAgLy8gICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5uZXdzLXN3aXBlcl9fcGFnaW5nLS1wcmV2JyxcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5uZXdzLXN3aXBlcl9fcGFnaW5nLS1uZXh0JyxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG1vZHVsZXM6IFtBdXRvcGxheSxOYXZpZ2F0aW9uXSxcclxuICAgICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbG9jYXRpb25NZW51KCk7XHJcbn07XHJcblxyXG4vL+uLueyCrOyGjOyLnSDsg4HshLhcclxuY29uc3QgbmV3c0NvbXBhbnlOZXdzVmlldyA9ICgpID0+IHtcclxuICAgIG5ld3NQcmludCgpO1xyXG4gICAgc25zTGluaygpO1xyXG59O1xyXG5cclxuLy/sl4Xqs4Tshozsi50g66as7Iqk7Yq4XHJcbmNvbnN0IG5ld3NJbmR1c3RyeU5ld3NMaXN0ID0gKCkgPT4ge1xyXG4gICAgKCgpPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld3NDYXJvdXNlbCA9IGZpbmRPbmUoJy5uZXdzLXN3aXBlcicpO1xyXG4gICAgICAgIGNvbnN0IGNhcm91c2VsID0gbmV3IFN3aXBlcihmaW5kT25lKCcuc3dpcGVyJywgbmV3c0Nhcm91c2VsKSwge1xyXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICAvLyBhdXRvcGxheToge1xyXG4gICAgICAgICAgICAvLyAgICAgZGVsYXk6IDQwMDAsXHJcbiAgICAgICAgICAgIC8vICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcubmV3cy1zd2lwZXJfX3BhZ2luZy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcubmV3cy1zd2lwZXJfX3BhZ2luZy0tbmV4dCcsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBtb2R1bGVzOiBbQXV0b3BsYXksTmF2aWdhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGxvY2F0aW9uTWVudSgpO1xyXG59O1xyXG5cclxuLy/sl4Xqs4Tshozsi50g7IOB7IS4XHJcbmNvbnN0IG5ld3NJbmR1c3RyeU5ld3NWaWV3ID0gKCkgPT4ge1xyXG4gICAgbmV3c1ByaW50KCk7XHJcbiAgICBzbnNMaW5rKCk7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBuZXdzUHJpbnQsXHJcbiAgICBuZXdzTm90aWNlTGlzdCxcclxuICAgIG5ld3NOb3RpY2VWaWV3LFxyXG4gICAgbmV3c0NvbXBhbnlOZXdzTGlzdCxcclxuICAgIG5ld3NDb21wYW55TmV3c1ZpZXcsXHJcbiAgICBuZXdzSW5kdXN0cnlOZXdzTGlzdCxcclxuICAgIG5ld3NJbmR1c3RyeU5ld3NWaWV3XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHtsb2NhdGlvbk1lbnUsIHNuc0xpbmt9IGZyb20gXCIuL2NvbW1vblwiO1xyXG5pbXBvcnQge2ZpbmRPbmUsIG9ufSBmcm9tIFwiLi4vaGVscGVyXCI7XHJcbmltcG9ydCB7ZGF0YX0gZnJvbSBcImF1dG9wcmVmaXhlclwiO1xyXG5cclxuY29uc3QgcmVjcnVpdExpc3QgPSAoKSA9PiB7XHJcbiAgICBsb2NhdGlvbk1lbnUoKTtcclxufTtcclxuXHJcbmNvbnN0IHJlY3J1aXRWaWV3ID0gKCkgPT4ge1xyXG4gICAgLy/tlITrprDtirhcclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYm9keSAgPSBmaW5kT25lKCdib2R5Jyk7XHJcbiAgICAgICAgY29uc3QgcGFnZVZpZXcgPSBmaW5kT25lKCcucGFnZS12aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgcHJpbnQgPSBmaW5kT25lKCcuYnRuLXBhZ2UtcHJpbnQnLCBwYWdlVmlldyk7XHJcblxyXG4gICAgICAgIG9uKHByaW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdwcmludCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cucHJpbnQoKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwcmludCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBzbnNMaW5rKCk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgcmVjcnVpdExpc3QsXHJcbiAgICByZWNydWl0Vmlld1xyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7ZmluZE9uZSwgZmluZCwgb259IGZyb20gJy4uL2hlbHBlcic7XHJcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XHJcblxyXG5jb25zdCB3aW5kb3dQb3B1cCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZvb3RlciA9IGZpbmRPbmUoJy5mb290ZXInKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gZmluZE9uZSgnaW5wdXQnLCBmb290ZXIpO1xyXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBmaW5kT25lKCcubWFpbl9fbW9kYWwtd2luZG93X19jbG9zZScsIGZvb3Rlcik7XHJcblxyXG4gICAgdmFyIHRvZGF5RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0b2RheURhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh0b2RheURhdGUuZ2V0VGltZSgpIC8gODY0MDAwMDApICogODY0MDAwMDAgKyA1NDAwMDAwMCk7XHJcblxyXG4gICAgb24odG9kYXksICdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgQ29va2llcy5zZXQoYG1vZGFsX19jb250YWluZXItLSR7cGFyYW1zLmdldCgnc2VxJyl9YCwgYCR7cGFyYW1zLmdldCgnc2VxJyl9YCwge2V4cGlyZXM6IHRvZGF5RGF0ZX0pO1xyXG4gICAgICAgIHdpbmRvdy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgIH0pXHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aW5kb3dQb3B1cDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImFwcFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rXCJdID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vanMvcGMvYXBwLmpzXCIpOyB9KVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3Njc3MvcGMvYXBwLnNjc3NcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIkRyb3Bkb3duU2VsZWN0IiwiY29uc3RydWN0b3IiLCJ0YXJnZXQiLCJzZWxlY3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RBY3RpdmUiLCJyZXN1bHQiLCJjb250cm9sIiwiY29udHJvbEhlaWdodCIsImNsaWVudEhlaWdodCIsInRpdGxlIiwiY29udGFpbmVyIiwibGlzdCIsIml0ZW1zIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImJ1dHRvbnMiLCJuYW1lIiwiZHVyYXRpb24iLCJsZW5ndGgiLCJ0b0ZpeGVkIiwiaW5pdCIsIm9uRXZlbnRzIiwic3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJ0b2dnbGUiLCJpc1RvZ2dsZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiaXNDbGFzc0xpc3RNZXRob2QiLCJoZWlnaHQiLCJjbG9zZSIsInJlbW92ZSIsImZvckVhY2giLCJidXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwidGV4dENvbnRlbnQiLCJ2YWx1ZSIsImV2ZW50IiwiY2xvc2VzdCIsImZpbmRPbmUiLCJvbiIsIkNMQVNTX05BTUVfQk9EWV9PUEVOIiwiQ0xBU1NfTkFNRV9PUEVOIiwiQ0xBU1NfTkFNRV9GQURFIiwiTW9kYWwiLCJib2R5IiwibW9kYWxzIiwib25FdmVudCIsIm9wZW4iLCJhZGQiLCJwdXNoIiwic2V0VGltZW91dCIsInRhcmdldE1vZGFsIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwib25DbG9zZSIsInRhZ05hbWUiLCJwcmV2ZW50RGVmYXVsdCIsImJpbmQiLCJzY3JvbGxXaWR0aCIsIk1hdGgiLCJhYnMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJmaW5kIiwiVGFiIiwiZWxlbWVudCIsImNhbGxiYWNrIiwibWVudXMiLCJwYW5lbHMiLCJtYXAiLCJtZW51IiwicGFuZWxJZCIsImdldEF0dHJpYnV0ZSIsInBhbmVsIiwiY3VycmVudCIsInBhbmVsVGltZXIiLCJpbml0RXZlbnRzIiwidG9nZ2xlVGFiIiwic2V0QXR0cmlidXRlIiwiaXRlbSIsInRvZ2dsZVBhbmVsIiwiY2xlYXJUaW1lb3V0IiwiYW9zRWxlbWVudHMiLCJzZWxlY3RvciIsImNvbnRleHQiLCJ0eXBlIiwiY2FwdHVyZSIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZWxlZ2F0ZSIsImhhbmRsZXIiLCJkaXNwYXRjaEV2ZW50IiwidGFyZ2V0RWxlbWVudCIsInBvdGVudGlhbEVsZW1lbnRzIiwiY2FsbCIsImdldE9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJzY3JvbGxZIiwibGVmdCIsInNjcm9sbFgiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0IiwiaW5EZWJvdW5jZSIsImFyZ3MiLCJBcHAiLCJzaXRlTWVudSIsInNpdGVIZWFkZXJJbmZvcm1hdGlvbiIsInNpdGVUb3AiLCJiYW5rQ2Fyb3VzZWwiLCJwcm9jZXNzaW5nIiwic2Nyb2xsTW90aW9uIiwibWFpbiIsImludHJvQ2VvIiwiaW50cm9FdGhpY2FsTWFuYWdlbWVudCIsImhvbGRpbmdDb2xsYXRlcmFsTGlzdCIsImhvbGRpbmdJbmZsb3dMaXN0IiwiaG9sZGluZ0NvbGxhdGVyYWxWaWV3IiwiaG9sZGluZ0luZmxvd1ZpZXciLCJob2xkaW5nQ3JJbnZlc3RtZW50IiwiYnVzaW5lc3MiLCJuZXdzTm90aWNlTGlzdCIsIm5ld3NOb3RpY2VWaWV3IiwibmV3c0NvbXBhbnlOZXdzTGlzdCIsIm5ld3NDb21wYW55TmV3c1ZpZXciLCJuZXdzSW5kdXN0cnlOZXdzTGlzdCIsIm5ld3NJbmR1c3RyeU5ld3NWaWV3IiwicmVjcnVpdExpc3QiLCJyZWNydWl0VmlldyIsIndpbmRvd1BvcHVwIiwiYXBwIiwiYXV0byIsInJlYWR5QW5kUnVuIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwibG9jYXRpb24iLCJzZWFyY2giLCJ0YWIiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiY2xpY2siLCJBT1MiLCJTd2lwZXIiLCJBdXRvcGxheSIsIkVmZmVjdEZhZGUiLCJQYWdpbmF0aW9uIiwiTmF2aWdhdGlvbiIsIm1ha2VNZW51IiwiaW5uZXJIVE1MIiwiZm9vdGVyU2l0ZW1hcCIsImNvbnRlbnQiLCJzaXRlTWVudUJ1dHRvbiIsInNpdGVNZW51Q29udGFpbmVyIiwic2l0ZU1lbnVDbG9zZUJ1dHRvbiIsImluZm9ybWF0aW9uQnV0dG9uIiwiaW5mb3JtYXRpb25Db250ZW50IiwiaW5mb3JtYXRpb25DbG9zZSIsImhlYWRlckluZm9ybWF0aW9uIiwibGlzdENhcm91c2VsIiwiZGV0YWlsQ2Fyb3VzZWwiLCJkZXRhaWwiLCJsb29wIiwiZWZmZWN0Iiwic2xpZGVzUGVyVmlldyIsInNwZWVkIiwic2ltdWxhdGVUb3VjaCIsInBhZ2luYXRpb24iLCJlbCIsIm1vZHVsZXMiLCJzbGlkZVRvQ2xpY2tlZFNsaWRlIiwibmF2aWdhdGlvbiIsInByZXZFbCIsIm5leHRFbCIsInNsaWRlQ2hhbmdlIiwic3dpcGVyIiwic2xpZGVUb0xvb3AiLCJyZWFsSW5kZXgiLCJjYXJvdXNlbEl0ZW1MaW5rcyIsIml0ZW1QYXJlbnQiLCJwYXJlbnROb2RlIiwiaXRlbVBhcmVudERhdGUiLCJsb2NhdGlvbk1lbnUiLCJjdXJyZW50UGFnZSIsImhyZWYiLCJzcGxpdCIsInBhZ2VNZW51IiwicGFnZUxpbmtzIiwibGluayIsImZvb3RlciIsImNhcm91c2VsIiwiYXV0b3BsYXkiLCJkZWxheSIsImRpc2FibGVPbkludGVyYWN0aW9uIiwiYnV0dG9uQWN0aXZlIiwiYnV0dG9uUGF1c2UiLCJibGlua0J1dHRvbiIsImNoZWNrUGxheSIsInBhcnNlSW50IiwiaW5uZXJIZWlnaHQiLCJwYWdlVG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1vZGFsIiwicGVyc29uYWxMaW5rIiwiaW1hZ2VsTGluayIsInBlcnNvbmFsTW9kYWwiLCJpbWFnZWxNb2RhbCIsIm9uY2UiLCJyZWZyZXNoIiwic25zTGluayIsImJ0bkZhY2Vib29rIiwiYnRuVHdpdHRlciIsInNoYXJlVXJsIiwic2hhcmVUaXRsZSIsInNoYXJlRGVzY3JpcHRpb24iLCJzaGFyZUltYWdlIiwic2hhcmVGYWNlYm9vayIsImVuY29kZVVSSUNvbXBvbmVudCIsInNoYXJlVHdpdHRlciIsImVuY29kZVRleHQiLCJlbmNvZGVVcmwiLCJjb3B5VGV4dCIsIm5vd1VybCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsInVuZGVmaW5lZCIsIndyaXRlVGV4dCIsInRoZW4iLCJhbGVydCIsInRleHRBcmVhIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJleGVjQ29tbWFuZCIsImVyciIsImVycm9yIiwicmVtb3ZlQ2hpbGQiLCJjb3B5VXJsIiwiQ29udHJvbGxlciIsImF4aW9zIiwiZmV0Y2hTaWRvR3VndW4iLCJkYXRhIiwiSG9sZGluZ1NlYXJjaCIsImhlYWRlckhlaWdodCIsImZvcm0iLCJmb3JtSW5wdXRzIiwiZm9ybURldGFpbCIsImluaXRMb2NhaW9uIiwiZmllbGRMb2NhdGlvbiIsImxvY2F0aW9uU2lkb0d1Z3VuIiwibG9jYXRpb25TaWRvIiwibG9jYXRpb25TaWRvTmFtZSIsInJlbW92ZUF0dHJpYnV0ZSIsImxvY2F0aW9uR3VndW4iLCJsb2NhdGlvbkd1Z3VuTmFtZSIsImxvY2F0aW9uR3VndW5PcmlnaW5PcHRpb24iLCJsb2NhdGlvbkFkZFRyaWdnZXIiLCJsb2NhdGlvbkxpc3QiLCJsb2NhdGlvbkFkZExpc3QiLCJTZXQiLCJsb2NhdGlvbkl0ZW1zIiwibG9jYXRpb25JdGVtIiwic2hpZnQiLCJsb2NhdGlvbkl0ZW1UZW1wbGF0ZSIsIm91dGVySFRNTCIsImxvY2F0aW9uRGF0YSIsInJlZHVjZSIsImNvZGVfbmFtZSIsImd1Z3VuIiwiY3JlYXRlU2lkbyIsInNpZG9HdWd1bkRhdGEiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjb2RlIiwiam9pbiIsImZpbmRTaWRvT3B0aW9ucyIsImZpbmRHdWd1bk9wdGlvbnMiLCJsb2NhdGlvblNpZG9PcHRpb25zIiwiY2hhbmdlU2lkbyIsInNlbGVjdGVkSW5kZXgiLCJpbm5lclRleHQiLCJ0cmltIiwiY3JlYXRlR3VndW4iLCJndWd1bkRhdGEiLCJvcHRpb25zIiwibG9jYXRpb25HdWd1bk9wdGlvbnMiLCJjbGVhckd1Z3VuIiwicmVzZXRGb3JtIiwidG9nZ2xlRGV0YWlsIiwiY2xlYXJMb2NhdGlvbiIsImlucHV0Iiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrZWQiLCJhZGRMb2NhdGlvbiIsInNpemUiLCJzaWRvQ29kZSIsInNpZG9OYW1lIiwiZ3VndW5Db2RlIiwiZ3VndW5OYW1lIiwiaGFzR3VndW4iLCJoYXMiLCJyZXBsYWNlIiwicmVtb3ZlTG9jYXRpb24iLCJkZWxldGUiLCJjbGVhciIsImFjdGlvbiIsImFjdGl2ZUNsYXNzIiwiaW5jbHVkZXMiLCJzY3JvbGwiLCJhcHByYWlzYWxQcmljZUlucHV0cyIsImlucHV0cyIsImZpbHRlciIsInN0YXJ0IiwiZW5kIiwic3RhcnRJbnB1dCIsImVuZElucHV0IiwiaW5wdXRQcmljZSIsImlucHV0VW5pdCIsInJlc2V0VHJpZ2dlciIsImRldGFpbFRyaWdnZXIiLCJzZXRIb2xkaW5nRGV0YWlsc0hlaWdodCIsImRldGFpbHMiLCJtZXNzYWdlIiwic2Nyb2xsSGVpZ2h0IiwiY3NzVGV4dCIsImhvbGRpbmdQcmludCIsImhvbGRpbmdWaWV3IiwicHJpbnQiLCJob2xkaW5nVmlld0Nhcm91c2VsIiwiY2VudGVyZWRTbGlkZXMiLCJmb3JtYXRGcmFjdGlvbkN1cnJlbnQiLCJudW1iZXIiLCJmb3JtYXRGcmFjdGlvblRvdGFsIiwiaGlkZGVuIiwiY2Fyb3VzZWxQcm9ncmVzc2JhciIsImNvbnRyb2xsZXIiLCJob2xkaW5nTW9kYWwiLCJSZXBvcnRGb3JtIiwicHJpdmFjeSIsImVtYWlsRmlyc3QiLCJlbWFpbExhc3QiLCJlbWFpbFNlbGVjdCIsImVtYWlsRnVsbCIsInRlbFJvdyIsInRlbCIsInRlbDEiLCJ0ZWwyIiwidGVsMyIsInRlbEZ1bGwiLCJjb250ZW50cyIsImtleXdvcmQiLCJrZXl3b3JkQWdyZWUiLCJyZXNldCIsImlzVmFsaWQiLCJmb2N1cyIsInRlc3QiLCJzdWJtaXQiLCJob2xkaW5nRm9ybSIsImludmVzdG1lbnQiLCJ0cmlnZ2VycyIsImdldElkIiwidHJpZ2dlciIsImlkIiwiaW50cm8iLCJjbGlja2FibGUiLCJyZW5kZXJCdWxsZXQiLCJjbGFzc05hbWUiLCJjYXJvdXNlbFRleHQiLCJyZXBseSIsImZpbGUiLCJpbnB1dEZpbGUiLCJmaWxlTGlzdCIsIm5lY2Vzc2FyeVN0YXR1cyIsImlzRmlsZVZhaWxkIiwiZGVsZXRlRmlsZSIsImNob2ljZUZpbGUiLCJmaWxlcyIsImxhYmVsIiwiY29uZmlybSIsImV0aGljUmVwb3J0Rm9ybSIsImltcHJvcGVyUmVwb3J0Rm9ybSIsInRhYk5hdiIsInRhYkl0ZW1zIiwidGFiSXRlbSIsImJhY2tncm91bmRJbWFnZSIsInBhZ2VVcmwiLCJwYWdlSWQiLCJyZXZlcnNlIiwicGFnZU51bSIsInN1YnN0ciIsIkNvb2tpZXMiLCJTY3JvbGxiYXIiLCJtYWluSW50cm8iLCJzbGlkZXMiLCJpbnRyb0Jhbm5lciIsInRhYkxpc3RzIiwidGFiTGlzdCIsIm1haW5OZXdzIiwidGFiQ29udGVudHMiLCJ0YWJMaW5rIiwiYWN0aXZlQ29udGVudCIsImkiLCJqIiwiZGlzcGxheSIsInRvZ2dsZU1haW5Nb2RhbCIsIm1haW5Nb2RhbCIsIm1vZGFsQWN0aXZlIiwibW9kYWxPcGVuIiwibW9kYWxGYWRlIiwibW9kYWxJdGVtcyIsInRvZGF5Q2xvc2VzIiwiYnRuQ2xvc2VzIiwibW9kYWxDbG9zZSIsInRvZGF5RGF0ZSIsIkRhdGUiLCJnZXRUaW1lIiwiY29udGFpbmVyU2VxQ2xhc3MiLCJzZXQiLCJleHBpcmVzIiwibm90aWNlIiwiZGlyZWN0aW9uIiwiYWJvdXQiLCJhYm91dFBvc2l0aW9uIiwic2Nyb2xsTG9jYXRpb24iLCJjb2xsYXRlcmFsQ2Fyb3VzZWwiLCJpbmZsb3dDYXJvdXNlbCIsInNpdGVNYWluIiwiY29sbGF0ZXJhbCIsImFsbG93VG91Y2hNb3ZlIiwiaW5mbG93IiwibmV3c1ByaW50IiwicGFnZVZpZXciLCJuZXdzQ2Fyb3VzZWwiLCJkcm9wZG93biIsInRvZGF5IiwiY2xvc2VCdXR0b24iXSwic291cmNlUm9vdCI6IiJ9