import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.imooc-admin.lgdsunday.club/api',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: '',
        icode:''
    },
    timeout: 5000
})



http.interceptors.request.use((con) => {
    // let token = localStorage.getItem('token')
    let token = 'Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0'
    con.headers.Authorization = token
    return con
}, (err) => {
    return err
})
http.interceptors.response.use((con) => {
    return con
}, (err) => {
    return err

})
export default http