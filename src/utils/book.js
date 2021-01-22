import { realPx } from './utils'


// 存放阅读器相关的数据
export const FONT_SIZE_LIST = [
    { fontSize: "14px" },
    { fontSize: "16px" },
    { fontSize: "18px" },
    { fontSize: "20px" },
    { fontSize: "22px" },
]


export const FONT_FAMILY_LIST = [
    { fontFamily: 'Default' },
    { fontFamily: 'Consolas' },
    { fontFamily: 'Days One' },
    { fontFamily: 'Montserrate' },
    { fontFamily: 'Tangerina' },
]


export function themeList() {
    return [
        {
            alias: '默认',
            name: 'Default',
            style: {
                body: {
                    'color': '#4c5059',
                    'background': '#cecece',
                    // 控制ebook上下的空间，用来显示页眉页脚
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '雅致',
            name: 'Gold',
            style: {
                body: {
                    'color': '#5c5b56',
                    'background': '#c6c2b6',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '护眼',
            name: 'Eye',
            style: {
                body: {
                    'color': '#404c42',
                    'background': '#a9c1a9',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '夜晚',
            name: 'Night',
            style: {
                body: {
                    'color': '#cecece',
                    'background': '#000000',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        }
    ]
}



/* 动态添加css */
export function addCss(href){
    const link = document.createElement('link'); // 创建链接
    link.setAttribute('rel','stylesheet')        // 设置为CSS样式表
    link.setAttribute('type','text/css')
    link.setAttribute('href',href)
    document.getElementsByTagName('head')[0].appendChild(link) // 追加到HEAD标签后面
}

export function removeCss(href) {
    const links = document.getElementsByTagName('link')
    for (let i = links.length; i >= 0; i--) {
        const link = links[i]
        if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
            link.parentNode.removeChild(link)
        }
    }
}


export function removeAllCss() {
    let cssList = [
        `${process.env.VUE_APP_RES_URL}/style/theme/theme_default.css`,
        `${process.env.VUE_APP_RES_URL}/style/theme/theme_eye.css`,
        `${process.env.VUE_APP_RES_URL}/style/theme/theme_gold.css`,
        `${process.env.VUE_APP_RES_URL}/style/theme/theme_night.css`
    ]
    cssList.forEach(clink => {
        removeCss(clink)
    })
}


export function flatten(array) {
    return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
  }
  