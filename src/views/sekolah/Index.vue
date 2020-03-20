<template>
    <div class="c-body" v-if="!$role('school')">
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
        name: 'IndexSekolah',
        created() {
            if(this.$role('school')){
                this.$router.push('/')
            }
        }
    }
</script>