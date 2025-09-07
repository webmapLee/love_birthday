// 全局变量
let currentPhotoIndex = 0;
let photos = [];
let isPlaying = false;
let photoInterval;
let musicList = [
    'musics/01-Take Me To Your Heart.mp3',
    'musics/02-最美的期待.mp3',
    'musics/03-香水百合.mp3',
    'musics/04-活在此刻.mp3'
];
let currentMusicIndex = 0;
let isMusicEnabled = true;

// 爱意弹幕文字
const loveMessages = [
    '我爱你彩丽 💕',
    '你是我的全世界 🌍',
    '永远爱你 💖',
    '我的宝贝 👸',
    '想你了 💭',
    '你最美丽 ✨',
    '我们的爱情 💑',
    '生日快乐 🎂',
    '幸福永远 🍀',
    '甜蜜蜜 🍯'
];

// 页面初始化
$(document).ready(function () {
    // 加载照片列表
    loadPhotos();

    // 添加点击特效
    addClickEffects();

    // 初始化留言板
    initMessageBoard();

    // 添加音乐启动覆盖层点击事件
    $('#musicStartOverlay').on('click', function () {
        startMusicAndHideOverlay();
    });
});

// 启动音乐并隐藏覆盖层
function startMusicAndHideOverlay() {
    const bgMusic = document.getElementById('bgMusic');

    bgMusic.volume = 0.3;
    bgMusic.muted = false;
    bgMusic.play().then(() => {
        $('#musicStartOverlay').fadeOut(500);
        console.log('音乐播放成功');
    }).catch(e => {
        console.log('音乐播放失败:', e);
        $('#musicStartOverlay').fadeOut(500);
    });
}

// 播放生日背景音乐
function playBirthdayMusic() {
    if (!isMusicEnabled) return;

    const bgMusic = document.getElementById('bgMusic');
    const photoMusic = document.getElementById('photoMusic');

    // 停止相册音乐
    photoMusic.pause();
    photoMusic.currentTime = 0;

    bgMusic.volume = 0.3;

    // 音频已经自动播放但是静音，只需要取消静音
    bgMusic.muted = false;
}

// 音乐开关控制
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const photoMusic = document.getElementById('photoMusic');
    const toggleBtn = $('#musicToggle');

    isMusicEnabled = !isMusicEnabled;

    if (isMusicEnabled) {
        // 开启音乐
        toggleBtn.removeClass('muted').html('<i class="fas fa-volume-up"></i>');
        if ($('#mainPage').hasClass('active')) {
            bgMusic.play().catch(e => console.log('音乐播放失败:', e));
        } else if ($('#photoPage').hasClass('active') && isPlaying) {
            photoMusic.play().catch(e => console.log('音乐播放失败:', e));
        }
    } else {
        // 关闭音乐
        toggleBtn.addClass('muted').html('<i class="fas fa-volume-mute"></i>');
        bgMusic.pause();
        photoMusic.pause();
    }
}

// 加载照片列表
async function loadPhotos() {
    try {
        // 使用实际照片数据
        if (typeof loadActualPhotos === 'function') {
            loadActualPhotos();
        } else {
            // 备用照片数据
            photos = [
                {
                    src: 'images/pictures/2022/IMG20220508181824.jpg',
                    date: '2022年 - 温馨时光',
                    description: '平凡的日子里，你的笑容最珍贵 😊'
                },
                {
                    src: 'images/pictures/2023/1682849222435.jpeg',
                    date: '2023年 - 成长足迹',
                    description: '看着你和孩子一起成长，我很幸福 🌱'
                },
                {
                    src: 'images/pictures/2024/1709734635000_1727067322117_41.jpeg',
                    date: '2024年 - 坚强的你',
                    description: '一个人带娃的你，是我心中的超人 💪'
                },
                {
                    src: 'images/pictures/2025/mmexport1738832801588.jpg',
                    date: '2025年 - 最新回忆',
                    description: '新的一年，我们的爱情依然甜蜜 🍯'
                }
            ];
            $('#totalPhotos').text(photos.length);
        }
    } catch (error) {
        console.log('加载照片失败:', error);
    }
}

// 开始照片展示
function startPhotoShow() {
    switchPage('photoPage');

    // 停止生日快乐歌曲
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();

    currentPhotoIndex = 0;
    currentMusicIndex = 0;
    showPhoto(currentPhotoIndex);
    startAutoPlay();
}

// 显示照片
function showPhoto(index) {
    if (index >= photos.length) {
        index = 0;
        currentPhotoIndex = 0;
    }

    const photo = photos[index];
    const photoImg = $('#currentPhoto');
    const overlay = $('#transitionOverlay');

    // 随机选择转场效果
    const transitions = ['fog-transition', 'starlight-transition', 'windmill-transition', 'heart-transition'];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];

    // 添加淡出效果
    photoImg.addClass('photo-fade-out');

    // 延迟后更换图片并添加转场效果
    setTimeout(() => {
        // 优先尝试构建后的 webp 资源，失败则回退到原图
        const webpCandidate = getWebpCandidate(photo.src);
        photoImg.off('error');
        photoImg.removeAttr('data-tried-fallback');
        photoImg.on('error', function () {
            if (photoImg.attr('data-tried-fallback') === '1') return; // 已经回退过
            photoImg.attr('data-tried-fallback', '1');
            photoImg.attr('src', photo.src);
        });
        photoImg.attr('src', webpCandidate);

        $('#photoDate').text(photo.date);
        $('#photoDescription').text(photo.description);
        $('#currentIndex').text(index + 1);

        // 添加转场遮罩
        overlay.removeClass().addClass('transition-overlay ' + randomTransition);

        // 移除淡出，添加淡入
        photoImg.removeClass('photo-fade-out').addClass('photo-fade-in');

        // 清除转场效果
        setTimeout(() => {
            overlay.removeClass();
            overlay.addClass('transition-overlay');
        }, 2000);

    }, 400);

    // 更新进度条
    const progress = ((index + 1) / photos.length) * 100;
    $('#photoProgress').css('width', progress + '%');
}

// 开始自动播放
function startAutoPlay() {
    if (isPlaying) return;

    isPlaying = true;
    $('#playPauseBtn i').removeClass('fa-play').addClass('fa-pause');

    // 播放对应的音乐
    playPhotoMusic();

    // 计算每张照片的显示时间（根据音乐时长和照片数量）
    const photoDisplayTime = 8000; // 8秒每张照片

    photoInterval = setInterval(() => {
        currentPhotoIndex++;
        if (currentPhotoIndex >= photos.length) {
            currentPhotoIndex = 0;
            // 移除音乐切换逻辑，让音乐完全由onended事件控制
        }
        showPhoto(currentPhotoIndex);
    }, photoDisplayTime);
}

// 播放照片音乐
function playPhotoMusic() {
    const photoMusic = document.getElementById('photoMusic');
    const bgMusic = document.getElementById('bgMusic');

    // 停止生日音乐
    bgMusic.pause();
    bgMusic.currentTime = 0;

    // 选择最优音频资源并设置回退
    const original = musicList[currentMusicIndex];
    const candidates = getOptimizedMusicCandidates(original);

    let idx = 0;
    function tryPlayNext() {
        if (idx >= candidates.length) {
            console.log('所有音频候选播放失败，放弃本首。');
            return;
        }
        photoMusic.src = candidates[idx++];
        photoMusic.play().catch(e => {
            console.log('播放失败，尝试下一个候选:', e);
            // 小延时避免连续错误导致阻塞
            setTimeout(tryPlayNext, 50);
        });
    }

    // 只在第一次设置音乐结束监听器，避免重复设置
    if (!photoMusic.hasAttribute('data-listener-set')) {
        photoMusic.setAttribute('data-listener-set', 'true');
        photoMusic.onended = function () {
            // 切换到下一首音乐
            currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
            console.log('音乐播放结束，切换到第', currentMusicIndex + 1, '首音乐');
            playPhotoMusic();
        };
        // 出错时尝试下一个候选源
        photoMusic.onerror = function () {
            tryPlayNext();
        };
    }

    photoMusic.volume = 0.5;
    tryPlayNext();
}

// 暂停/继续播放
function togglePlayPause() {
    if (isPlaying) {
        pauseAutoPlay();
    } else {
        startAutoPlay();
    }
}

// 暂停自动播放
function pauseAutoPlay() {
    isPlaying = false;
    clearInterval(photoInterval);
    $('#playPauseBtn i').removeClass('fa-pause').addClass('fa-play');

    const photoMusic = document.getElementById('photoMusic');
    photoMusic.pause();
}

// 页面切换
function switchPage(pageId) {
    $('.page').removeClass('active');
    $('#' + pageId).addClass('active');

    // 如果切换到主页面，恢复背景音乐
    if (pageId === 'mainPage') {
        pauseAutoPlay();
        const bgMusic = document.getElementById('bgMusic');
        const photoMusic = document.getElementById('photoMusic');

        // 停止相册音乐
        photoMusic.pause();
        photoMusic.currentTime = 0;

        // 播放生日音乐
        bgMusic.play().catch(e => console.log('背景音乐播放失败:', e));
    }
}

// 返回主页面
function backToMain() {
    switchPage('mainPage');
}

// 显示留言板
function showMessageBoard() {
    switchPage('messagePage');
}

// 添加点击特效
function addClickEffects() {
    $(document).on('click', function (e) {
        // 烟花效果
        createFirework(e.pageX, e.pageY);

        // 随机添加流星雨
        if (Math.random() < 0.3) {
            createMeteor();
        }

        // 爱意弹幕
        if (Math.random() < 0.5) {
            createDanmaku(e.pageX, e.pageY);
        }
    });
}

// 创建烟花效果
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 12; i++) {
        const firework = $('<div class="firework"></div>');
        firework.css({
            left: x + 'px',
            top: y + 'px',
            backgroundColor: color,
            transform: `rotate(${i * 30}deg)`
        });

        $('#fireworks-container').append(firework);

        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// 创建流星雨效果
function createMeteor() {
    const meteor = $('<div class="meteor"></div>');
    const startX = Math.random() * window.innerWidth;
    const startY = -50;

    meteor.css({
        left: startX + 'px',
        top: startY + 'px'
    });

    $('#meteor-container').append(meteor);

    setTimeout(() => {
        meteor.remove();
    }, 2000);
}

// 创建爱意弹幕
function createDanmaku(x, y) {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const danmaku = $('<div class="danmaku"></div>');

    danmaku.text(message);
    danmaku.css({
        left: (x - 50) + 'px',
        top: y + 'px'
    });

    $('#danmaku-container').append(danmaku);

    setTimeout(() => {
        danmaku.remove();
    }, 3000);
}

// 初始化留言板
function initMessageBoard() {
    // 加载已有留言
    loadMessages();
}

// 发送留言
function sendMessage() {
    const messageText = $('#messageInput').val().trim();
    if (!messageText) {
        alert('请输入留言内容');
        return;
    }

    const messageItem = $(`
        <div class="message-item">
            <div class="message-content">
                <p>${messageText}</p>
                <small class="text-white-50">${new Date().toLocaleString()}</small>
            </div>
        </div>
    `);

    $('#messagesList').prepend(messageItem);
    $('#messageInput').val('');

    // 保存到本地存储
    saveMessage(messageText);
}

// 发送礼物
function sendGift() {
    const gifts = ['🎁', '💐', '🌹', '💍', '🍰', '🎂', '🍫', '💝'];
    const gift = gifts[Math.floor(Math.random() * gifts.length)];

    const messageItem = $(`
        <div class="message-item">
            <div class="message-content text-center">
                <div style="font-size: 3rem;">${gift}</div>
                <p>送给彩丽的礼物</p>
                <small class="text-white-50">${new Date().toLocaleString()}</small>
            </div>
        </div>
    `);

    $('#messagesList').prepend(messageItem);

    // 特效
    createFirework(window.innerWidth / 2, window.innerHeight / 2);
}

// 发送表情
function sendEmoji() {
    const emojis = ['😘', '💕', '💖', '💗', '💓', '💝', '😍', '🥰', '😚', '💋'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const messageItem = $(`
        <div class="message-item">
            <div class="message-content text-center">
                <div style="font-size: 4rem;">${emoji}</div>
                <small class="text-white-50">${new Date().toLocaleString()}</small>
            </div>
        </div>
    `);

    $('#messagesList').prepend(messageItem);
}

// 保存留言到本地存储
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    messages.unshift({
        text: message,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('loveMessages', JSON.stringify(messages));
}

// 加载留言
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    messages.forEach(msg => {
        const messageItem = $(`
            <div class="message-item">
                <div class="message-content">
                    <p>${msg.text}</p>
                    <small class="text-white-50">${new Date(msg.timestamp).toLocaleString()}</small>
                </div>
            </div>
        `);
        $('#messagesList').append(messageItem);
    });
}

// 添加一些浪漫的背景动画
function addBackgroundAnimations() {
    setInterval(() => {
        // 随机添加飘落的心形
        if (Math.random() < 0.1) {
            createFloatingHeart();
        }
    }, 2000);
}

// 创建飘落的心形
function createFloatingHeart() {
    const heart = $('<div style="position: fixed; font-size: 20px; color: rgba(255, 182, 193, 0.7); pointer-events: none; z-index: 1;">💕</div>');
    const startX = Math.random() * window.innerWidth;

    heart.css({
        left: startX + 'px',
        top: '-30px',
        animation: 'floatDown 8s linear forwards'
    });

    $('body').append(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// 添加CSS动画
$('<style>').text(`
    @keyframes floatDown {
        0% {
            transform: translateY(-30px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 50}px) rotate(360deg);
            opacity: 0;
        }
    }
`).appendTo('head');

// 启动背景动画
$(document).ready(function () {
    addBackgroundAnimations();
});

// 构造图片的 WebP 优先路径（构建产物）
function getWebpCandidate(originalSrc) {
    try {
        // 仅处理 images/pictures 下的资源
        if (!originalSrc || originalSrc.indexOf('images/pictures/') !== 0) return originalSrc;
        const webpPath = 'build/' + originalSrc.replace(/\.(jpg|jpeg|png|heic)$/i, '.webp');
        return webpPath;
    } catch (e) {
        return originalSrc;
    }
}

// 根据浏览器支持与资源可用性选择压缩音频候选
function getOptimizedMusicCandidates(originalPath) {
    const audio = document.createElement('audio');
    const base = originalPath.replace(/\.[^/.]+$/, '');
    const m4a = 'build/' + base + '.m4a';
    const ogg = 'build/' + base + '.ogg';
    const candidates = [];
    // 按浏览器支持与优先级添加
    if (audio.canPlayType('audio/mp4; codecs="mp4a.40.2"')) candidates.push(m4a);
    if (audio.canPlayType('audio/ogg; codecs="vorbis"')) candidates.push(ogg);
    candidates.push(originalPath);
    return candidates;
}
