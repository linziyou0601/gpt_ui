# gpt_ui

## 參數說明

以下說明預設參數設定，請依個人需求修改

### Repository.js

1. 個人GPT API URL

    ```js
    const baseURL = 'https://your.gpt.api.base.url'；
    ```

2. getChat：對話

    Request

    * `channel: string` 用來區別對話紀錄，可省略
    * `message: string` 要送給GPT的訊息

    Response

    * `code: int` 是否成功，200為成功，於`HomeView.vue`會判斷
    * `messages: List<Object>` GPT回傳的訊息，須包含完整對話歷史紀錄才能於頁面顯示完整對話串，`Object`結構如下：
        * `role: string` 角色，GPT的對話角色，可為`assistant`或`role`
        * `content: string` 對話訊息內容

3. getHistory：取得歷史紀錄

    Request

    * `channel: string` 對話紀錄的channel

    Response

    * `code: int` 是否成功，200為成功，於`HomeView.vue`會判斷
    * `messages: List<Object>` 完整對話歷史紀錄，`Object`結構如下：
        * `role: string` 角色，GPT的對話角色，可為`assistant`或`role`
        * `content: string` 對話訊息內容

4. clearHistory：清除歷史紀錄

    Request

    * `channel: string` 對話紀錄的channel

    Response

    * `code: int` 是否成功，200為成功，於`HomeView.vue`會判斷
    * `message: string` 訊息內容

---

## Vue 3 in Vite 說明

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

Compile and Hot-Reload for Development

```sh
npm run dev
```

Compile and Minify for Production

```sh
npm run build
```

Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
