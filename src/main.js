import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/coreui'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import VueHtmlToPaper from 'vue-html-to-paper';

import Permissions from './mixins/Permission.js'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.config.performance = true

if (process.env.VUE_APP_ENV === 'production') {
	Vue.config.devtools = false;
	Vue.config.debug = false;
	Vue.config.silent = true; 
}

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    '/css/free.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

Vue.mixin(Permissions)
Vue.use(CoreuiVue)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

import { mapActions, mapGetters } from 'vuex'
import './registerServiceWorker'

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	computed: {
		...mapGetters(['isAuth'])
	},
	methods: {
		...mapActions('user', ['getUserLogin'])
	},
	created() {
		if (this.isAuth) {
			this.getUserLogin()
		}
	}
})
