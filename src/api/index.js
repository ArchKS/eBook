import axios from 'axios'
import { setLocalForage } from "@/utils/localForage";


// 书城首页
export function home() {
  return axios({
    method: 'GET',
    url: `${process.env.VUE_APP_BASE_API}/book/home`
  })
}

// 详情页
export function detail(fileName) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_API}/book/detail`,
    params: {
      fileName: fileName
    }
  })
}


// 下载电子书
export function download(book, onSuccess, onProgress, onError) {
  return axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    // 下载进度事件
    onDownloadProgress: progressEvent => {
      if(onProgress) onProgress(progressEvent);
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
    // 下载成功，存入indexDB
    const blob = new Blob([res.data])
    setLocalForage(book.fileName, blob, () => onSuccess(book),err => onError(err))
    if (onSuccess) onSuccess(res);
  }).catch(err => {
    if (onError) onError(err);
  })
}
