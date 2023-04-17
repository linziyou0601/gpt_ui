<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    <img alt="Vue logo" src="@/assets/logo.svg" width="40" height="32" />
                    <span class="fs-4 mx-3 fw-bold">GPT UI</span>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="container-fluid collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item px-2">
                            <RouterLink :class="{ 'nav-link': true, 'px-3': true, active: isRouteActive('/') }" to="/">Home</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div class="container py-5">
            <RouterView />
        </div>
    </main>

    <Toast :msg="msg" :toastType="toastType" :notification="notification" />
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, provide, computed } from 'vue'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const path = computed(() => route.path)
const isRouteActive = (routePath) => {
    return path.value === routePath
}

const msg = ref('')
const toastType = ref('error')
const notification = ref(false)
const showToast = (val, type = 'error') => {
    msg.value = val
    toastType.value = type
    notification.value = true
    setTimeout(hideToast, 3000)
}
const hideToast = () => {
    msg.value = ''
    toastType.value = 'error'
    notification.value = false
}
// provide參數給child component使用（vue3才有，避免children太多需層層傳遞）
provide('showToast', showToast)
provide('hideToast', hideToast)
</script>

<style scoped>
.navbar-nav .nav-link.active {
    color: #ffffff !important;
    background-color: var(--bs-blue) !important;
    border-radius: 0.5rem;
}
</style>
