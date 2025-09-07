// 实际照片数据 - 按时间线排序
const actualPhotos = [
    {
        src: 'images/pictures/2016/1462082772810_1694939934612_38.jpeg',
        date: '2016年 - 相识',
        description: '相识相知的美好时光 💖'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_4108.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/80寸炫彩水晶挂轴.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/10x10韩尚经典 (4).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/纯爱照片墙六组和白色 (6).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3931.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_4044.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3823.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3610.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3943.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3759.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3639.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3607.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_4030.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/10x10韩尚经典 (3).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/纯爱照片墙六组和白色 (2).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3815.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_4001.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3780.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3970.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/10x10韩尚经典 (1).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/纯爱照片墙六组和白色 (3).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3967.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3741.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3733.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/纯爱照片墙六组和白色 (4).jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3872.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_3870.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-结婚/DSC_4111.jpg',
        date: '2017年 - 婚礼',
        description: '我们的婚礼，最美好的开始 💕'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_0006.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9976.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9960.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9961.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9927.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9918.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9924.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9930.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9935.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9978.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9987.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9984.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9985.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9952.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2017-怀孕/IMG_9943.jpg',
        date: '2017年 - 怀孕',
        description: '期待小生命的到来 👶'
    },
    {
        src: 'images/pictures/2018/IMG_20170617_203031.jpg',
        date: '2017年 - 新婚',
        description: '新婚燕尔，甜蜜开始 🥰'
    },
    {
        src: 'images/pictures/2017/1493610933353_1694939934612_43.jpeg',
        date: '2017年 - 新婚',
        description: '新婚燕尔，甜蜜开始 🥰'
    },
    {
        src: 'images/pictures/2017/1493471038105_1694939934612_92.jpeg',
        date: '2017年 - 新婚',
        description: '新婚燕尔，甜蜜开始 🥰'
    },
    {
        src: 'images/pictures/2017/1493355998761_1694939934612_35.jpeg',
        date: '2017年 - 新婚',
        description: '新婚燕尔，甜蜜开始 🥰'
    },
    {
        src: 'images/pictures/2018/1546266444201_1694939934612_13.jpeg',
        date: '2018年 - 温馨',
        description: '小家庭的温馨日常 🏠'
    },
    {
        src: 'images/pictures/2019/1558169648192_1694939934612_29.jpeg',
        date: '2019年 - 幸福',
        description: '幸福三口之家 👨‍👩‍👧'
    },
    {
        src: 'images/pictures/2019/1549348964668_1694939934612_65.jpeg',
        date: '2019年 - 幸福',
        description: '幸福三口之家 👨‍👩‍👧'
    },
    {
        src: 'images/pictures/2019/20250520-212000.png',
        date: '2019年 - 幸福',
        description: '幸福三口之家 👨‍👩‍👧'
    },
    {
        src: 'images/pictures/2020/1600926473000_1716213734552_37.jpeg',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/1577808019004.jpeg',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/1601826394000.jpeg',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/1584115945784.jpeg',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/1595159084468.jpeg',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/20250520-212301.png',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/20250520-212235.png',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/20250520-212208.png',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/20250520-212322.png',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2020/20250520-212651.png',
        date: '2020年 - 陪伴',
        description: '一起度过特殊的一年 🤝'
    },
    {
        src: 'images/pictures/2021/3500b9537b481ef0d962078629bea533.JPG.jpeg',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2021/1631871056760.jpeg',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2021/1628926932235.jpeg',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2021/1631950808947.jpeg',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2021/1622887468440_1716214085727_51.jpeg',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2021/20250520-212735.png',
        date: '2021年 - 成长',
        description: '平凡生活中的小确幸 😊'
    },
    {
        src: 'images/pictures/2022/IMG20220508181824.jpg',
        date: '2022年 - 岁月',
        description: '岁月静好，爱意绵绵 💝'
    },
    {
        src: 'images/pictures/2022/IMG20220503174018.jpg',
        date: '2022年 - 岁月',
        description: '岁月静好，爱意绵绵 💝'
    },
    {
        src: 'images/pictures/2022/1663079386360.jpeg',
        date: '2022年 - 岁月',
        description: '岁月静好，爱意绵绵 💝'
    },
    {
        src: 'images/pictures/2023/1682849222435.jpeg',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/3cafaadb74082a62f07587dd9743a2c7.JPG.jpeg',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/1674991515405.jpeg',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/1674978066761.jpeg',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/1693126677566.jpeg',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-212909.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-212952.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-213257.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-220533.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-213229.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2023/20250520-213200.png',
        date: '2023年 - 坚持',
        description: '成长路上，相伴同行 🌱'
    },
    {
        src: 'images/pictures/2024/1709734635000_1727067322117_41.jpeg',
        date: '2024年 - 坚强',
        description: '坚强的你，我心中的超人 💪'
    },
    {
        src: 'images/pictures/2024/1708082488000.jpeg',
        date: '2024年 - 坚强',
        description: '坚强的你，我心中的超人 💪'
    },
    {
        src: 'images/pictures/2024/20250520-220741.png',
        date: '2024年 - 坚强',
        description: '坚强的你，我心中的超人 💪'
    },
    {
        src: 'images/pictures/2025/7e371fabccc38ad3d2181aa6e3b3b4f.jpg',
        date: '2025年 - 甜蜜',
        description: '新的一年，爱情依然甜蜜 🍯'
    },
    {
        src: 'images/pictures/2025/mmexport1738832801588.jpg',
        date: '2025年 - 甜蜜',
        description: '新的一年，爱情依然甜蜜 🍯'
    },
    {
        src: 'images/pictures/2025/mmexport1738832796586.jpg',
        date: '2025年 - 甜蜜',
        description: '新的一年，爱情依然甜蜜 🍯'
    },
    {
        src: 'images/pictures/2025/c4b9c096eda7a17613215fb6135a934.jpg',
        date: '2025年 - 甜蜜',
        description: '新的一年，爱情依然甜蜜 🍯'
    },
    {
        src: 'images/pictures/AI写真/1716301380_207846732741221.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716216784_914459184903131.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301137_570347069489224.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/17200822352483.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301130_60373574740573.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716230468_286652934611669.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301581_1088427577198840.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301315_407411144205614.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301090_42783905692904.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301142_842280137043811.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301196_95584356652198.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301383_604916980503085.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301405_291196546477098.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301536_618434473610600.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1716301219_772589093637473.jpg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1723609409356.jpeg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1725509918275.jpeg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1719494969449.jpeg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
    {
        src: 'images/pictures/AI写真/1719494974000.jpeg',
        date: 'AI写真 - 美丽',
        description: 'AI写真，科技记录美丽 ✨'
    },
];

// 更新照片加载函数
function loadActualPhotos() {
    photos = actualPhotos;
    $('#totalPhotos').text(photos.length);

    // 预加载图片
    photos.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
    });
}