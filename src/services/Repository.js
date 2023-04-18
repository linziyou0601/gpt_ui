import clientAPI from './_AxiosConfig'

// ==================== 設定檔 ====================
//const baseURL = 'http://127.0.0.1:5001'
const baseURL = 'https://api-gpt.linziyou.info'

// ==================== API CALL ====================
// ----- 聊天API -----
const getChat = (request) => {
    return clientAPI(baseURL).post('/gpt/get_chat', {
        channel: 'gpt_ui',
        message: request.message
    })
}
const getChatMock = (request) => {
    const data = {
        code: 200,
        messages: [
            {
                role: 'user',
                content: request.message
            },
            {
                role: 'assistant',
                content: 'Hi, How can I help?\nThis is a mock response.'
            }
        ]
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data }), 100)
    })
}

// ----- 歷史紀錄API -----
const getHistory = () => {
    return clientAPI(baseURL).post('/gpt/get_history', {
        channel: 'gpt_ui'
    })
}
const getHistoryMock = () => {
    const data = {
        code: 200,
        message: []
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data }), 100)
    })
}
const clearHistory = () => {
    return clientAPI(baseURL).post('/gpt/clear_history', {
        channel: 'gpt_ui'
    })
}
const clearHistoryMock = () => {
    const data = {
        code: 200,
        message: 'ok'
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data }), 100)
    })
}

// ==================== 輸出 ====================
export default {
    getChat,
    getChatMock,
    getHistory,
    getHistoryMock,
    clearHistory,
    clearHistoryMock
}
