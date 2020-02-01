import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
//定义标识符
const i18n = new VueI18n({
    locale: 'en-US',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('../common/lang/cn'),   // 中文语言包
        'en-US': require('../common/lang/en')    // 英文语言包
    }
});
export {i18n}

