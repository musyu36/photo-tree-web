import Vue from "vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import "./element-variables.scss";

//Vue.useでプロジェクト全体でElementUIを使用する
Vue.use(ElementUI, { locale });
