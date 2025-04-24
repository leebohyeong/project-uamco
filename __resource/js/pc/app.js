import App from 'hwaly-app';

import {siteMenu, siteHeaderInformation, siteTop, bankCarousel, processing, scrollMotion} from './common';
import {main} from './main';
import {introCeo, introEthicalManagement} from './intro';
import {holdingCollateralList, holdingInflowList, holdingCollateralView, holdingInflowView, holdingCrInvestment} from './holding';
import {business} from './business';
import {newsNoticeList, newsNoticeView, newsCompanyNewsList, newsCompanyNewsView, newsIndustryNewsList, newsIndustryNewsView} from './news';
import {recruitList, recruitView} from './recruit';
import windowPopup from './window';

const app = new App();

//함수추가
app.add({
    siteMenu,
    siteHeaderInformation,
    siteTop,
    bankCarousel,
    processing,
    scrollMotion,

    main,

    windowPopup,

    introCeo,
    introEthicalManagement,

    business,

    holdingCollateralList,
    holdingInflowList,
    holdingCollateralView,
    holdingInflowView,
    holdingCrInvestment,

    newsNoticeList,
    newsNoticeView,
    newsCompanyNewsList,
    newsCompanyNewsView,
    newsIndustryNewsList,
    newsIndustryNewsView,

    recruitList,
    recruitView,

});


//전페이지에서 활성화할거
app.auto(
    'siteTop',
    'siteHeaderInformation',
    'siteMenu',
    'bankCarousel',
    'processing',
    'scrollMotion',
);

app.readyAndRun();