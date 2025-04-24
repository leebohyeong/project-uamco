import App from 'hwaly-app';
import {siteMenu, siteHeaderInformation, siteTop, bankCarousel, processing, scrollMotion} from './common';
import {main} from './main';
import {introUamco, introCeo, introEthicalManagement} from './intro';
import {business} from './business';
import {holdingCollateralList, holdingInflowList, holdingCollateralView, holdingInflowView, holdingCrInvestment} from './holding';
import {newsNoticeList, newsNoticeView, newsNewsOurCompanyList, newsNewsOurCompanyView, newsIndustryNewsList, newsIndustryNewsView} from './news';
import {recruitTalent, recruitWelfare,recruitList, recruitView} from './recruit';
import windowPopup from './window';


const app = new App();

//함수추가
app.add({
    siteMenu,
    siteTop,
    siteHeaderInformation,
    processing,
    scrollMotion,

    bankCarousel,

    main,

    windowPopup,

    introUamco,
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
    newsNewsOurCompanyList,
    newsNewsOurCompanyView,
    newsIndustryNewsList,
    newsIndustryNewsView,

    recruitTalent,
    recruitWelfare,
    recruitList,
    recruitView,
});


//전페이지에서 활성화할거
app.auto(
    'siteMenu',
    'siteTop',
    'siteHeaderInformation',
    'bankCarousel',
    'processing',
    'scrollMotion',
);

app.readyAndRun();