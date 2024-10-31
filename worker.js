let foods = [];

// 监听来自主线程的消息
onmessage = function(e) {
    const { type, data } = e.data;
    if (type === 'loadFoods') {
        foods = data;
        postMessage({ type: 'foodsLoaded', data: foods });
    } else if (type === 'getRandomFood') {
        if (foods.length > 0) {
            const randomFood = foods[Math.floor(Math.random() * foods.length)];
            postMessage({ type: 'randomFood', data: randomFood });
        } else {
            postMessage({ type: 'randomFood', data: '食物列表为空' });
        }
    }
};
