<template>
  	<div>
		<notifications group="foo" position="bottom right"/>
		<app-sidebar v-show="isAuth"/>
		<div class="c-wrapper">
			<app-header v-if="isAuth" />
			<transition name="slide-fade">
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

	export default {
		computed: {
			...mapState(['token']),
			...mapGetters(['isAuth'])
		},
		components: {
			'app-sidebar': Sidebar,
			'app-footer' : Footer,
			'app-header' : Header
		}
	}
</script>
<style lang="scss">
	@import "./assets/scss/app.scss";
</style>