<template>
    <div v-if="notification" id="notify-toast" class="cursor-pointer" :class="'toast-' + toastType" @click="hideToast">
        <div class="toast-body">{{ msg }}</div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue'

// 讀入parent傳進來的參數
const props = defineProps(['msg', 'toastType', 'notification'])
const msg = computed(() => props?.msg)
const toastType = computed(() => props?.toastType)
const notification = computed(() => props?.notification)

// inject需要用的參數進行使用，需在parent或grand-parent進行provide
const hideToast = inject('hideToast')
</script>

<style scoped lang="scss">
#notify-toast {
    position: fixed;
    bottom: 100px;
    right: 50px;
    width: auto;
    padding: 10px 30px;
    border: none;
    border-radius: 15px;
    transition: all 0.5s;
    @media (max-width: 768px) {
        bottom: 100px;
        right: 30px;
    }
}
.toast-error {
    background-color: #b061835a;
    & .toast-body {
        color: #ac1255;
    }
}
.toast-success {
    background-color: #61c0b55a;
    & .toast-body {
        color: #067d6d;
    }
}
</style>
