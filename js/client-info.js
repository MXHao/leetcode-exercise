// 浏览器版本
export function getBrowserInfo() {
    var strStart = 0;
    var strStop = 0;
    var temp = '';
    var broInfo = '';
    console.log(window.navigator);
    var userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
    //FireFox
    if (userAgent.indexOf('Firefox') != -1) {
        strStart = userAgent.indexOf('Firefox');
        temp = userAgent.substring(strStart);
        broInfo = temp.replace('/', '版本号')
    }
    //Edge
    if (userAgent.indexOf('Edge') != -1) {
        strStart = userAgent.indexOf('Edge');
        temp = userAgent.substring(strStart);
        broInfo = temp.replace('/', '版本号');
    }
    //IE浏览器
    if (userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
        strStart = userAgent.indexOf('rv');
        strStop = userAgent.indexOf(')');
        temp = userAgent.substring(strStart, strStop);
        broInfo = temp.replace('rv', 'IE').replace(':', '版本号');
    }
    //Chrome浏览器
    if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0 && userAgent.indexOf('Chrome') != -1) {
        strStart = userAgent.indexOf('Chrome');
        strStop = userAgent.indexOf(' Safari');
        temp = userAgent.substring(strStart, strStop);
        broInfo = temp.replace('/', '版本号');
    }
    return broInfo;
}
// 获取系统版本
export function getOS() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";
}
// 浏览器缩放比例
export function getScaling(){
    var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    return ratio.toFixed(2);
}
// 屏幕分辨率
export function getScreenDist(){
    if (getBrowserInfo().indexOf('IE') === -1) {
        return screen.width + '*' + screen.height; 
    }else{
        //IE单独处理
        const scale = getScaling();
        return Math.round(screen.width*scale) + '*' + Math.round(screen.height*scale);
    }
}
// 网络连通性测试
export function testUrl() {
    var url;
    var img;
    var iframe;
    document.getElementById('row_confirm').addEventListener('click', function () {
        url = document.getElementsByClassName('row_input')[0].value;
        if (!url) {
            alert('请输入url');
            return;
        }
        $.ajax({
            type: 'get',
            cache: false,
            url: url,
            dataType: "jsonp", //跨域采用jsonp方式 
            processData: false,
            timeout:10000, 
            complete: function (data) {
                if (data.status==200) {
                    alert('网络联通！')
                } else {
                    alert('该网络不连通！'+data.status)
                }

            }
        });
    })
}

