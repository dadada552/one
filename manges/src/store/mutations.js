// 批量删除
const dels = (state, arr) => {
    state.userArr = state.userArr.filter(item => arr.includes(item) == false)
};
// 删除
const del = (state, i) => {
    state.userArr.splice(i, 1)
}
// 过滤省市区
const changeCity = (state, obj) => {
    state.userArr = obj.arr.filter(item => item.address.includes(obj.val))
    state.cityArr = obj.arr.filter(item => item.address.includes(obj.val))
}

// 已读未读切换
const toggleReady = (state, obj) => {
    const item = state.textArr.find(item => item == obj)
    item.flag = !item.flag
}
// 进入回收站
const goDel = (state, obj) => { 
    const i = state.textArr.findIndex(item => item == obj)
    state.textArr.splice(i, 1)
}
// 还原
const remake= (state,obj) => {
    obj.flag = false
    state.textArr.push(obj)
}
// 全部标记已读
const allReady = (state) => {
    state.textArr.forEach(item => item.flag = true);
}
// 全部删除
const allDel = (state) => {
    state.textArr = state.textArr.filter(item => !item.flag)
}
export default { dels, del, changeCity, toggleReady, goDel, remake, allReady, allDel }