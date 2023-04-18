<template>
    <div v-if="logLevelOpts.includes(level)" class="row">
        <div class="col-12 log" :class="level" v-html="messageWithLineBreak"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// 讀入parent傳進來的參數
const props = defineProps(['logLevelOpts', 'level', 'message'])
const logLevelOpts = computed(() => (props?.logLevelOpts ?? []).filter(opt => opt.checked).map(opt => opt.value))
const level = computed(() => props?.level ?? '')
const message = computed(() => props?.message ?? '')
const messageWithLineBreak = computed(() => message.value.replaceAll(/(?:\r\n|\r|\n|\\r\\n|\\r|\\n)/g, '<br>'))
</script>

<style scoped lang="scss">
.log {
    &.CRITICAL {
        color: rgb(250, 118, 250);
    }
    &.ERROR {
        color: #f55063;
    }
    &.WARNING {
        color: #f0ad29;
    }
    &.INFO {
        color: #3ca5cf;
    }
    &.DEBUG {
        color: #929292;
    }
}
</style>
