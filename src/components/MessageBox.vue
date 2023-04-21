<template>
    <div class="row" :class="alignClass">
        <div class="col-12 mx-0 px-0" :class="textAlignClass">
            <div v-if="role === 'assistant'" class="avatar assistant-avatar">A</div>
            <span class="mx-2">{{ role }}</span>
            <div v-if="role === 'user'" class="avatar user-avatar">U</div>
        </div>
        <div class="col-9 msg" :class="roleClass" v-html="msgWithMarkdown"></div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(code, {
        language: lang,
    }).value;
  }
});

// 讀入parent傳進來的參數
const props = defineProps(['role', 'content'])
const role = computed(() => props?.role)
const msg = computed(() => props?.content ?? '')
const msgWithMarkdown = computed(() => marked(msg.value))


const alignClass = computed(() => {
    return role.value === 'assistant' ? 'justify-content-start' : 'justify-content-end'
})
const textAlignClass = computed(() => {
    return role.value === 'assistant' ? 'text-start' : 'text-end'
})
const roleClass = computed(() => {
    return role.value === 'assistant' ? 'assistant-msg' : 'user-msg'
})


// 設定pre tag的language屬性
const formatPreTags = () => {
    const preTags = document.getElementsByTagName("pre");
    [...preTags].forEach(preTag => {
        const codeTag = preTag.getElementsByTagName("code")[0];
        const className = codeTag.className;
        if (preTag.getAttribute('language') !== null) {
            return
        } else {
            preTag.setAttribute('language', className.replaceAll('language-', ''))
        }
    })
}

// 當元件載入時執行
onMounted(() => {
    formatPreTags()
})
</script>

<style src='highlight.js/styles/xcode.css'>
    /* global styles */
</style> 

<style scoped lang="scss">
.msg {
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    margin: 0.5rem 0;

    :deep table {
        $border-color: #b8c2d2;
        border-collapse: separate;
        border-spacing: 0;
        margin-bottom: 1rem;

        tr {
            td, th{
                padding: 15px;
                // border: 1px solid #334754;
            }
        }
        thead {
            tr {
                background-color: #54585d;
                color: #ffffff;
                font-weight: bold;

                th {
                    border-top: 1px solid $border-color;
                    border-left: 1px solid $border-color;
                    border-bottom: 1px solid $border-color;

                    &:last-child {
                        border-right: 1px solid $border-color;
                    }
                }
                
                &:first-child {
                    th:first-child{
                        border-radius: 0.75rem 0 0 0;
                    }

                    th:last-child{
                        border-radius: 0 0.75rem 0 0;
                    }
                }
            }
        }
        tbody {
            tr {
                background-color: #f1f6fd;
                &:nth-child(odd) {
                    background-color: #f1f6fd;
                }

                td {
                    border-left: 1px solid $border-color;
                    border-bottom: 1px solid $border-color;

                    &:last-child {
                        border-right: 1px solid $border-color;
                    }
                }
                
                &:last-child {
                    td:first-child{
                        border-radius: 0 0 0 0.75rem;
                    }

                    td:last-child{
                        border-radius: 0 0 0.75rem 0;
                    }
                }
            }
        }
    }

    :deep code {
        background-color: #f1f6fd;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    :deep pre {
        border-radius: 0.75rem;
        background-color: #f1f6fd;
        padding: 0.75rem 1rem 1rem 1rem;
        margin-bottom: 1rem;

        code {
            padding: 0;
        }

        &::before {
            content: attr(language);
            display: block;
            position: relative;
            width: calc(100% + 2rem);
            padding: 0.25rem 1rem;
            top: -0.75rem;
            left: -1rem;
            border-radius: 0.75rem 0.75rem 0 0;
            background-color: #313f5366;
            color: #FFF;
        }
    }

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
