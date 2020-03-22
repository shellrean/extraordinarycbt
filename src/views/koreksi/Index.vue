<template>
    <div class="c-body" v-if="$can('skoring')">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
                <router-view></router-view>
            </div>
          </div>
        </main>
    </div>
</template>
<script>
	export default {
		name: 'KoreksiIndex'
	}
</script>