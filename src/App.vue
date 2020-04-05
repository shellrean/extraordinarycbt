<template>
  	<div>
  		<loading :active.sync="loadPage" 
        :is-full-page="true" :loader="'bars'" :color="'#1f1498'"></loading>

		<notifications group="foo" position="bottom right"/>
		<app-sidebar v-show="isAuth"/>
		<div class="c-wrapper">
			<app-header v-if="isAuth" />
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
			<app-footer v-if="isAuth" />
		</div >
	</div>
</template>
<script>
	import { mapState, mapGetters } from 'vuex'
	import Sidebar from './components/Sidebar.vue'
	import Header from './components/Header.vue'
	import Footer from './components/Footer.vue'

	import Loading from 'vue-loading-overlay';
	import 'vue-loading-overlay/dist/vue-loading.css';

	export default {
		computed: {
			...mapState(['token', 'loadPage']),
			...mapGetters(['isAuth']),
		},
		components: {
			'app-sidebar': Sidebar,
			'app-footer' : Footer,
			'app-header' : Header,
			Loading
		}
	}
</script>
<style lang="scss">
	@import "./assets/scss/app.scss";
</style>