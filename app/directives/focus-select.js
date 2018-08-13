export default {
    bind(el) {
        el.addEventListener('focus', onFocus);
    },

    unbind(el) {
        el.removeEventListener('focus', onFocus);
    }
};

function onFocus() {
    return this.select();
}
