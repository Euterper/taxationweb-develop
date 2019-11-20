// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'

import '@/assets/css/reset.css' // 全局初始化样式
import 'vant/lib/index.css';
import "lib-flexible"
import axios from "axios";

import Cookies from "js-cookie";

// 接口过滤器
import interceptors from "./service/interceptors"
interceptors(axios);
/* ======================================= */
Vue.prototype.stopProp = function(e) {
    e.preventDefault()
    e.stopPropagation()
}
import {
    NavBar,
    Icon,
    Search,
    TreeSelect,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    Sidebar,
    SidebarItem,
    Lazyload,
    Divider,
    CountDown,
    Tag,
    SubmitBar,
    Button,
    Cell,
    CellGroup,
    SwipeCell,
    Checkbox,
    CheckboxGroup,
    Toast,
    Picker,
    Popup,
    DatetimePicker,
    Overlay,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Dialog,
    Field,
    Loading
} from "vant";

Vue.use(NavBar)
    .use(Row)
    .use(Col)
    .use(Icon)
    .use(Search)
    .use(TreeSelect)
    .use(Swipe)
    .use(SwipeItem)
    .use(Tab)
    .use(Tabs)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Lazyload)
    .use(Divider)
    .use(CountDown)
    .use(Tag)
    .use(SubmitBar)
    .use(Button)
    .use(Cell)
    .use(CellGroup)
    .use(SwipeCell)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Toast)
    .use(Picker)
    .use(Popup)
    .use(DatetimePicker)
    .use(Overlay)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Dialog)
    .use(Field)
    .use(Loading);

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})