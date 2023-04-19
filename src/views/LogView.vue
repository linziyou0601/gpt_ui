<template>
    <div class="container-fluid px-0 mx-0 mb-3">
        <!-- 選擇logLevel -->
        <div id="log-leve-options" class="mb-2">
            <div class="pe-2 d-inline" v-for="(logLevelOpt, index) in logLevelOpts" :key="index">
                <input type="checkbox" class="btn-check" :id="logLevelOpt.label" autocomplete="off" :value="logLevelOpt.value" v-model="logLevelOpt.checked">
                <label class="btn btn-outline-secondary rounded-3" :for="logLevelOpt.label">{{ logLevelOpt.label }}</label>
            </div>
        </div>

        <!-- Log區 -->
        <div ref="logArea" class="px-4 mb-3" id="log-area">
            <div id="socket-ip">socket ip: {{ Repository.baseURL }}</div>
            <LogBox v-for="(logData, index) in logDataList" :key="index" :logLevelOpts="logLevelOpts" :level="logData.level" :message="logData.message" />
        </div>
        <div class="text-center mt-3">
            <button id="clearLogDataList" class="btn" @click="confirmModalRef.toggleConfirmDialogModal">Clear</button>
        </div>
    </div>

    <ConfirmModal ref="confirmModalRef" :title="'確認清除畫面上的日誌'" :confirmFunc="() => logDataList.length = 0" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import Repository from '@/services/Repository'
import { io } from 'socket.io-client'
import LogBox from '@/components/LogBox.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

// Dialog Ref
const logArea = ref()
const confirmModalRef = ref()

// 請求物件
const logLevelOpts = reactive([
    { label: 'CRITICAL', value: 'CRITICAL', checked: true },
    { label: 'ERROR', value: 'ERROR', checked: true },
    { label: 'WARNING', value: 'WARNING', checked: true },
    { label: 'INFO', value: 'INFO', checked: true },
    { label: 'DEBUG', value: 'DEBUG', checked: true },
])
const logDataList = reactive(new Array())

// WebSocket
const socket = io(Repository.baseURL)
socket.on('connect', () => {
  console.log('Connected to server')
})
socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
socket.on('log', (data) => {
    logDataList.push(data)
    setTimeout(autoScroll, 100)
})

// 定義logArea自動滾動到最底部
const autoScroll = () => {
    const el = logArea.value
    el.scrollTop = el.scrollHeight;
}
</script>
<style scoped lang="scss">
#log-area {
    background-color: #333333;
    border-radius: .75rem;
    padding: 1rem 4rem 1rem 4rem;
    font-family: monospace;
    height: calc(100vh - 240px);
    overflow-y: scroll;
}

#socket-ip {
    color: #ffffff;
    font-size: 0.8rem;
}

// 清除畫面上的日誌
#clearLogDataList {
    background-color: #ffffff;
    border: 1px solid #dfdfdf;
    border-radius: .75rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    color: #999999;
    &:hover {
        background-color: #dfdfdf;
        color: #666666;
    }
}
</style>
