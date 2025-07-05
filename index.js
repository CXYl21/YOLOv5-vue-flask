import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/apps/Login.vue";
import Imagedetect from "@/components/apps/Imagedetect.vue";
import Videodetect from "@/components/apps/Videodetect.vue";
import CameraDetect from "@/components/apps/CameraDetect.vue"
import Modelset from "@/components/apps/Modelset.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/Imagedetect', name: 'Imagedetect', component: Imagedetect},
        {path: '/Videodetect', name: 'Videodetect', component: Videodetect},
        {path: '/CameraDetect', name: 'CameraDetect', component: CameraDetect},
        {path: '/Modelset', name: 'Modelset', component: Modelset},
        {path: '/', name: 'login', component: Login},
    ]
})
