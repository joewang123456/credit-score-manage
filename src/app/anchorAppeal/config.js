import appealSuccessIcon from './images/appeal-success.png';
import appealFailIcon from './images/appeal-fail.png';
import appealingIcon from './images/appeal-ing.png';


const getCookie = (key) => {
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    var arr = document.cookie.match(reg);
    if (!arr) {
        return null;
    }
    return arr[2];
}

//图片上传服务器地址
const isTest = window.location.origin.indexOf("test") > -1;
export const cookie = isTest ? encodeURIComponent(getCookie('4&_token')) : encodeURIComponent(getCookie('1&_token'));
export const UPLOAD_SERVER = isTest ? 'http://upload.test.ximalaya.com' : 'http://upload.ximalaya.com';

export const uploadImageServer = UPLOAD_SERVER + '/dtres/picture/upload?token=' + cookie;
//喜马拉雅平台规范链接地址
export const xmlyRuleDocUrl = "http://www.ximalaya.com/center/announce/show?id=47";
//专辑，声音，主播样式配置
export const typeMap = {
    1: { label: '主播', style: 'iconAnchor' },
    2: { label: '专辑', style: 'iconAlbum' },
    3: { label: '声音', style: 'iconArtical' }
}

//0不可申诉，1可申诉但是未申诉，2申诉中，3申诉成功，4申诉失败
export const notCanAppeal = 0;
export const canAppeal = 1;
export const inAppeal = 2;
export const appealSuccess = 3;
export const appealFail = 4;
//申诉样式配置
export const appealIconMap = {
    2: appealingIcon, //申诉中
    3: appealSuccessIcon, //申诉成功
    4: appealFailIcon, //申诉失败
}

//处罚措施
export const publishMap = {
    'underCarriage': '下架',
    'gossip': '禁言',
    'banAccount': '封号'
}