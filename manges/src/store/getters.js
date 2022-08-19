const length = (state) => {
    return {
        ready: state.textArr.filter((item) => !item.flag).length,
        unReady: state.textArr.filter((item) => item.flag).length
    }
}
export default {length}