<template>
    <div class="c-body" v-if="$can('reporting')">
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
        name: 'IndexAnalys',
    }
</script>