<template>
    <div class="container px-4 mb-5">
        <div v-if="chatMsgs.length > 0" id="caht-area">
            <MessageBox v-for="(chat, index) in chatMsgs" :key="index" :role="chat.role" :content="chat.content" />
            <div class="text-center mt-4">
                <button id="clearHistory" class="btn" @click="confirmModalRef.toggleConfirmDialogModal">Clear</button>
            </div>
        </div>
        <div v-else>
            <HelloMessage />
        </div>
    </div>

    <div id="message-area">
        <div class="row">
            <div class="col">
                <div class="icon-input-warp">
                    <textarea
                        ref="messageInputEl"
                        type="text"
                        class="form-control"
                        placeholder="請輸入訊息"
                        rows="1"
                        v-model="message"
                        @input="adjustHeight"
                        @keydown.enter="onEnter"
                    />
                    <font-awesome-icon class="icon pointer" icon="fa-solid fa-paper-plane" @click="fetchChats" />
                </div>
            </div>
        </div>
    </div>

    <ConfirmModal ref="confirmModalRef" :title="'確認清除歷史資料'" :confirmFunc="clearHistory" />
</template>

<script setup>
import { ref, reactive, computed, onMounted, inject } from 'vue'
import Repository from '@/services/Repository'
import HelloMessage from '@/components/HelloMessage.vue'
import MessageBox from '@/components/MessageBox.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

// -------------------- 變數宣告 --------------------
// inject需要用的參數進行使用，需在parent或grand-parent進行provide
const showToast = inject('showToast')

// Dialog Ref
const messageInputEl = ref()
const confirmModalRef = ref()

// 請求物件
const message = ref('')
const chatMsgs = reactive([])
const placeholderMsgs = computed(() => {
    return [
        {
            role: 'user',
            content: message.value
        },
        {
            role: 'assistant',
            content: 'Loading'
        }
    ]
})
const fetchChats = async () => {
    if (message.value.trim().length === 0) return
    // 載入placeholderMsgs
    chatMsgs.push(...placeholderMsgs.value)
    const reqeust = {
        message: message.value
    }
    message.value = ''
    setTimeout(adjustHeight, 100)

    // 載入chatMsgs
    const axioResp = await Repository.getChat(reqeust)
    const response = axioResp.data
    console.log(response)
    if (response.code === 200) {
        // 清空chatMsgs
        chatMsgs.length = 0
        // 將response.messages的資料塞入chatMsgs
        Object.assign(chatMsgs, response.messages)
    } else {
        chatMsgs.pop()
        chatMsgs.pop()
        chatMsgs.push(...response.messages)
    }
}
const fetchHistory = async () => {
    // 載入chatMsgs
    const axioResp = await Repository.getHistory()
    const response = axioResp.data
    console.log(response)
    if (response.code === 200) {
        // 將response.messages的資料塞入chatMsgs
        Object.assign(chatMsgs, response.messages)
    }
}
const clearHistory = async () => {
    // 載入chatMsgs
    const axioResp = await Repository.clearHistory()
    const response = axioResp.data
    console.log(response)
    if (response.code === 200) {
        showToast('清除完成', 'success')
        chatMsgs.length = 0
        fetchHistory()
    }
}
const onEnter = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault()
        fetchChats()
    }
}

// 定義textarea適應高度
const adjustHeight = () => {
    console.log()
    const el = messageInputEl.value
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 300)}px`
}

// 當元件載入時執行
onMounted(() => {
    fetchHistory()
})
</script>
<style scoped lang="scss">
#caht-area {
    padding: 1rem;
}

/*輸入框內的圖示屬性設定*/
#message-area {
    position: fixed;
    border-radius: 1rem;
    background-color: #ffffff;
    left: 25%;
    bottom: 3rem;
    width: 50%;
    z-index: 999;

    .icon-input-warp {
        position: relative;

        & .icon {
            position: absolute;
            right: 1rem;
            bottom: 0.5rem;
            padding: 0.5rem 1rem 0.5rem 1rem;

            &:hover {
                border-radius: 1rem;
                background: #dfdfdfaa;
            }
        }

        & textarea {
            resize: none;
            border-radius: 1rem;
            border: none;
            padding: 0.75rem 4rem 0.75rem 1rem;
            box-shadow: 0px 3px 25px #999999aa;
        }
    }
}

// 清除歷史紀錄按鈕
#clearHistory {
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
