<template>
    <div class="row" :class="alignClass">
        <div class="col-12 mx-0 px-0" :class="textAlignClass">
            <div v-if="role === 'assistant'" class="avatar assistant-avatar">A</div>
            <span class="mx-2">{{ role }}</span>
            <div v-if="role === 'user'" class="avatar user-avatar">U</div>
        </div>
        <div class="col-9 msg" :class="roleClass" v-html="msgWithLineBreak"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// 讀入parent傳進來的參數
const props = defineProps(['role', 'content'])
const role = computed(() => props?.role)
const msg = computed(() => props?.content ?? '')
const msgWithLineBreak = computed(() => msg.value.replaceAll(/(?:\r\n|\r|\n|\\r\\n|\\r|\\n)/g, '<br>'))
const alignClass = computed(() => {
    return role.value === 'assistant' ? 'justify-content-start' : 'justify-content-end'
})
const textAlignClass = computed(() => {
    return role.value === 'assistant' ? 'text-start' : 'text-end'
})
const roleClass = computed(() => {
    return role.value === 'assistant' ? 'assistant-msg' : 'user-msg'
})
</script>

<style scoped lang="scss">
.msg {
    padding: 10px 30px;
    margin: 10px 0;

    &.user-msg {
        background-color: #3b82c1;
        border-radius: 15px 0 15px 15px;
        color: #ffffff;
    }

    &.assistant-msg {
        background-color: #d5e8f5;
        border-radius: 0 15px 15px 15px;
        color: #143058;
    }
}
.avatar {
    display: inline-block;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;

    &.user-avatar {
        background-color: #3b82c1;
        color: #ffffff;
    }

    &.assistant-avatar {
        background-color: #d5e8f5;
        color: #143058;
    }
}
</style>
