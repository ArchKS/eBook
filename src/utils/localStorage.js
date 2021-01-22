/* localStorage.js 浏览器存储相关内容
 * Date: 2020/12/23
 */

import Storage from 'web-storage-cache'
const localStorage = new Storage()

export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}

export function getLocalStorage(key) {
    return localStorage.get(key);
}

export function removeLocalStorage(key) {
    return localStorage.delete(key);
}

export function clearLocalStorage() {
    return localStorage.clear()
}


export function setBookObject(filename, key, value) {
    let book = getLocalStorage(`${filename}-info`);
    if (!book) book = {}
    book[key] = value;
    setLocalStorage(`${filename}-info`, book)
}

export function getBookObject(filename, key) {
    let book = getLocalStorage(`${filename}-info`);
    if (book) {
        return book[key]
    } else {
        return null
    }
}

/* 字体 */
export function getFontFamily(filename) {
    return getBookObject(filename, 'fontFamily');
}

export function saveFontFamily(filename, font) {
    return setBookObject(filename, 'fontFamily', font)
}

/* 字号 */
export function getFontSize(filename) {
    return getBookObject(filename, 'fontSize');
}

export function saveFontSize(filename, size) {
    return setBookObject(filename, 'fontSize', size)
}


/* 获取本地语言 */
export function getLocale() {
    return getLocalStorage('locale')
}

export function saveLocale(locale) {
    return setLocalStorage('locale', locale)
}


/* 主题 */
export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
    setBookObject(fileName, 'theme', theme)
}

/* 阅读进度 */
export function getLocation(fileName) {
    return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
    setBookObject(fileName, 'location', location)
}


/* 阅读时间 */
export function getReadTime(fileName) {
    return getBookObject(fileName, 'time')
}

export function saveReadTime(fileName, theme) {
    setBookObject(fileName, 'time', theme)
}

/* 章节 */
export function getSection(fileName){
    return getBookObject(fileName,'section')
}

export function saveSection(fileName,section){
    setBookObject(fileName,'section',section)
}

/* 书签 */
export function getBookmark(fileName){
    return getBookObject(fileName,'bookmark')
}
export function saveBookmark(fileName,bookmark){
    setBookObject(fileName,'bookmark',bookmark)
}


/* 阅读百分比 */
export function getReadProgress(fileName) {
    console.log(fileName);
    return getBookObject(fileName, 'progress')
}

export function saveReadProgress(fileName, theme) {
    setBookObject(fileName, 'progress', theme)
}


/* 书架书籍列表 */
export function getBookShelfList() {
    return getLocalStorage('bookshelf') || [];
}

export function saveBookShelfList(vuexShelfListBooks) {
    // 和vuex保持同步
    setLocalStorage('bookshelf', vuexShelfListBooks)
}

/* 首次提示 */
export function getReminder() {
    return getLocalStorage('reminder') ;
}

export function saveReminder(reminder) {
    // 和vuex保持同步
    setLocalStorage('reminder', reminder)
}

