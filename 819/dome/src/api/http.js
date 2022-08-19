import http from './api'

const getMy = () => {
    let data = http.get('/user/feature')
    return data
}
export {
    getMy
}