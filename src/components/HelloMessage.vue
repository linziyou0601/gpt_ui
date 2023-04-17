<template>
    <div id="helloMessage" class="row justify-content-center align-items-center">
        <div class="col-12 text-center my-5">
            <h2 class="my-3 fw-bold">GPT UI</h2>
            <div class="container">
                <div class="row my-3 gx-3 gy-3 justify-content-center">
                    <div v-for="(tip, index) in tips" :key="index" class="col-3">
                        <div class="card border-0 p-3 tip">
                            <div class="card-body">
                                <div class="tip-icon"><font-awesome-icon :icon="tip.icon" /></div>
                                <h5 class="m-2 tip-title">{{ tip.title }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const tips = reactive([
    {
        icon: ['fas', 'fa-robot'],
        title: 'Chatbot'
    },
    {
        icon: ['fas', 'fa-robot'],
        title: 'Chatbot'
    },
    {
        icon: ['fas', 'fa-robot'],
        title: 'Chatbot'
    }
])
</script>

<style scoped lang="scss">
#helloMessage {
    height: calc(100vh - 300px);
}

.tip {
    background-color: #efefef;
}

.tip-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333333;
}

.tip-icon {
    font-size: 40px;
    color: #333333;
}
</style>
