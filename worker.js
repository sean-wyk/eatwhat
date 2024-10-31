// worker.js

// 存储食物列表
let foods = [];

// 监听来自主线程的消息
onmessage = function(e) {
    const { type, data } = e.data;

    switch(type) {
        case 'loadFoods':
            // 接收并存储食物列表
            foods = data;
            // 通知主线程食物列表已加载，发送食物数量作为反馈
            postMessage({ type: 'foodsLoaded', data: foods.length });
            break;

        case 'getRandomFood':
            // 返回随机食物
            if (foods.length > 0) {
                const randomIndex = Math.floor(Math.random() * foods.length);
                const randomFood = foods[randomIndex];
                postMessage({ type: 'randomFood', data: randomFood });
            } else {
                postMessage({ type: 'randomFood', data: '食物列表为空' });
            }
            break;

        default:
            // 处理未知类型的消息
            console.warn(`未知的消息类型: ${type}`);
    }
};
