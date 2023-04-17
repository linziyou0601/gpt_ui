<template>
    <div ref="thisModalRef" class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 p-3">
                <div class="modal-header align-items-center border-0 mt-2 px-4">
                    <h4 class="col mb-0 text-light-green text-center" v-text="title"></h4>
                </div>
                <div class="modal-body p-0 align-items-center justify-content-center text-center">
                    <div class="px-3 px-md-5 mx-3 mx-md-5 pb-4">
                        <button id="btn-close" class="btn text-white mx-1" data-bs-dismiss="modal" aria-label="Close">取消</button>
                        <button class="btn bg-danger text-white mx-1" @click="confirm">確定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'

// 讀入parent傳進來的參數
const props = defineProps(['title', 'confirmFunc'])
const title = computed(() => props?.title)

const confirm = () => {
    props?.confirmFunc()
    toggleConfirmDialogModal()
}

// 定義參數
const thisModalRef = ref()
// 定義modal可被呼叫的方法，並Expose給父元素
let thisModal
onMounted(() => {
    thisModal = new Modal(thisModalRef.value, {})
})
const toggleConfirmDialogModal = () => {
    thisModal.toggle()
}
defineExpose({ toggleConfirmDialogModal })
</script>

<style scoped lang="scss">
#btn-close {
    background-color: #b6b6b6;
}
</style>
