// 全局变量
let currentPhotoIndex = 0;
let photos = [];
let isPlaying = false;
let photoInterval;
let photoSwiper = null; // Swiper实例
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
    '你是最美的 🌹',
    '爱你到永远 💝',
    '我的小公主 👑',
    '甜蜜的回忆 🍯',
    '幸福的时光 ✨'
];

// 动态背景类
class DynamicBackground {
    constructor() {
        this.canvas = document.querySelector('.background-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.discs = [];
        this.lines = [];
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.setSize();
        this.setDiscs();
        this.setLines();
        this.setParticles();
        this.bindEvents();
        this.animate();
    }
    
    setSize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.rect = { width: rect.width, height: rect.height };
    }
    
    setDiscs() {
        this.discs = [];
        
        this.startDisc = {
            x: this.rect.width * 0.5,
            y: this.rect.height * 0.45,
            w: this.rect.width * 0.75,
            h: this.rect.height * 0.7
        };
        
        this.endDisc = {
            x: this.rect.width * 0.5,
            y: this.rect.height * 0.95,
            w: 0,
            h: 0
        };
        
        const totalDiscs = 100;
        
        for (let i = 0; i < totalDiscs; i++) {
            const p = i / totalDiscs;
            const disc = this.tweenDisc({ p });
            this.discs.push(disc);
        }
    }
    
    setLines() {
        this.lines = [];
        const totalLines = 50;
        const linesAngle = (Math.PI * 2) / totalLines;
        
        for (let i = 0; i < totalLines; i++) {
            this.lines.push([]);
        }
        
        this.discs.forEach((disc) => {
            for (let i = 0; i < totalLines; i++) {
                const angle = i * linesAngle;
                const p = {
                    x: disc.x + Math.cos(angle) * disc.w,
                    y: disc.y + Math.sin(angle) * disc.h
                };
                this.lines[i].push(p);
            }
        });
    }
    
    setParticles() {
        this.particles = [];
        const totalParticles = 50;
        
        for (let i = 0; i < totalParticles; i++) {
            this.particles.push({
                x: Math.random() * this.rect.width,
                y: this.rect.height + Math.random() * 100,
                vy: 0.5 + Math.random(),
                size: 1 + Math.random() * 2,
                opacity: Math.random()
            });
        }
    }
    
    tweenDisc(disc) {
        const easeInExpo = (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        
        disc.x = this.startDisc.x + (this.endDisc.x - this.startDisc.x) * disc.p;
        disc.y = this.startDisc.y + (this.endDisc.y - this.startDisc.y) * easeInExpo(disc.p);
        disc.w = this.startDisc.w + (this.endDisc.w - this.startDisc.w) * disc.p;
        disc.h = this.startDisc.h + (this.endDisc.h - this.startDisc.h) * disc.p;
        
        return disc;
    }
    
    drawDiscs() {
        this.ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
        this.ctx.lineWidth = 1;
        
        this.discs.forEach((disc, i) => {
            if (i % 5 !== 0) return;
            
            this.ctx.beginPath();
            this.ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }
    
    drawLines() {
        this.ctx.strokeStyle = 'rgba(255, 107, 107, 0.2)';
        this.ctx.lineWidth = 1;
        
        this.lines.forEach((line) => {
            this.ctx.beginPath();
            line.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.moveTo(point.x, point.y);
                } else {
                    this.ctx.lineTo(point.x, point.y);
                }
            });
            this.ctx.stroke();
        });
    }
    
    drawParticles() {
        this.particles.forEach((particle) => {
            this.ctx.fillStyle = `rgba(255, 107, 107, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.rect(particle.x, particle.y, particle.size, particle.size);
            this.ctx.fill();
        });
    }
    
    updateDiscs() {
        this.discs.forEach((disc) => {
            disc.p = (disc.p + 0.001) % 1;
            this.tweenDisc(disc);
        });
    }
    
    updateParticles() {
        this.particles.forEach((particle) => {
            particle.y -= particle.vy;
            if (particle.y < -10) {
                particle.y = this.rect.height + 10;
                particle.x = Math.random() * this.rect.width;
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateDiscs();
        this.updateParticles();
        
        this.drawDiscs();
        this.drawLines();
        this.drawParticles();
        
        // 重新计算线条位置
        this.setLines();
        
        requestAnimationFrame(() => this.animate());
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.setSize();
            this.setDiscs();
            this.setLines();
            this.setParticles();
        });
    }
}

// 初始化动态背景
let dynamicBackground;

// 页面初始化
$(document).ready(function () {
    // 初始化动态背景
    dynamicBackground = new DynamicBackground();
    
    // 加载照片列表
    loadPhotos();

    // 添加点击特效
    addClickEffects();

    // 初始化留言板
    initMessageBoard();

    // 使用事件委托添加音乐启动覆盖层点击事件
    $(document).on('click', '#musicStartOverlay', function () {
        console.log('覆盖层被点击');
        startMusicAndHideOverlay();
    });
});

// 启动音乐并隐藏覆盖层
function startMusicAndHideOverlay() {
    console.log('点击了音乐启动覆盖层');

    const bgMusic = document.getElementById('bgMusic');

    // 先隐藏覆盖层
    $('#musicStartOverlay').fadeOut(500);

    bgMusic.volume = 0.3;
    bgMusic.muted = false;

    bgMusic.play().then(() => {
        console.log('音乐播放成功');
    }).catch(e => {
        console.log('音乐播放失败:', e);
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
            console.log('loadActualPhotos 函数未找到，使用默认照片');
            photos = [
                { src: 'images/default.jpg', date: '默认照片', description: '请添加照片数据' }
            ];
            $('#totalPhotos').text(photos.length);
        }
    } catch (error) {
        console.error('加载照片失败:', error);
        photos = [
            { src: 'images/default.jpg', date: '默认照片', description: '加载失败' }
        ];
        $('#totalPhotos').text(photos.length);
    }
}

// 初始化Swiper轮播
function initPhotoSwiper() {
    // 先销毁已存在的Swiper实例
    if (photoSwiper) {
        photoSwiper.destroy(true, true);
    }

    // 生成Swiper slides
    const swiperWrapper = document.getElementById('photoSwiperWrapper');
    swiperWrapper.innerHTML = '';

    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${getWebpCandidate(photo.src)}" alt="${photo.description}" onerror="this.src='${photo.src}'">`;
        swiperWrapper.appendChild(slide);
    });

    // 初始化Swiper
    photoSwiper = new Swiper('.photo-swiper', {
        slidesPerView: window.innerWidth <= 768 ? 1 : 3, // 手机端显示1张，桌面端显示3张
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 1,
            }
        },
        on: {
            slideChange: function () {
                const realIndex = this.realIndex;
                currentPhotoIndex = realIndex;
                updatePhotoInfo(realIndex);
                updateProgress(realIndex);
            }
        }
    });

    // 初始化显示第一张照片信息
    if (photos.length > 0) {
        updatePhotoInfo(0);
        updateProgress(0);
    }
}

// 更新照片信息
function updatePhotoInfo(index) {
    if (index >= 0 && index < photos.length) {
        const photo = photos[index];
        $('#photoDate').text(photo.date);
        $('#photoDescription').text(photo.description);
        $('#currentIndex').text(index + 1);
    }
}

// 更新进度条
function updateProgress(index) {
    const progress = ((index + 1) / photos.length) * 100;
    $('#photoProgress').css('width', progress + '%');
}
//     switchPage('photoPage');

//     // 停止生日快乐歌曲
//     const bgMusic = document.getElementById('bgMusic');
//     bgMusic.pause();

//     currentPhotoIndex = 0;
//     currentMusicIndex = 0;
//     showPhoto(currentPhotoIndex);
//     startAutoPlay();
// }

// 开始照片展示
function startPhotoShow() {
    switchPage('photoPage');

    // 停止生日快乐歌曲
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();

    // 初始化Swiper轮播
    setTimeout(() => {
        initPhotoSwiper();
        startAutoPlay();
    }, 100);
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
            if (photoImg.attr('data-tried-fallback') === '1') return;
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

    // 播放对应的音乐
    playPhotoMusic();

    // 启动Swiper自动播放
    if (photoSwiper && photoSwiper.autoplay) {
        photoSwiper.autoplay.start();
    }
}

// 暂停自动播放
function pauseAutoPlay() {
    isPlaying = false;

    // 停止Swiper自动播放
    if (photoSwiper && photoSwiper.autoplay) {
        photoSwiper.autoplay.stop();
    }
}

// 暂停/继续播放
function togglePlayPause() {
    const playIcon = $('.play-icon');
    const pauseIcon = $('.pause-icon');

    if (isPlaying) {
        pauseAutoPlay();
        playIcon.show();
        pauseIcon.hide();
    } else {
        startAutoPlay();
        playIcon.hide();
        pauseIcon.show();
    }
}

// 上一张照片
function previousPhoto() {
    if (photoSwiper) {
        photoSwiper.slidePrev();
    }
}

// 下一张照片
function nextPhoto() {
    if (photoSwiper) {
        photoSwiper.slideNext();
    }
}

// 播放照片音乐
function playPhotoMusic() {
    const photoMusic = document.getElementById('photoMusic');
    const bgMusic = document.getElementById('bgMusic');

    // 停止生日音乐
    bgMusic.pause();
    bgMusic.currentTime = 0;

    // 播放照片音乐
    photoMusic.src = musicList[currentMusicIndex];
    photoMusic.volume = 0.5;

    // 添加音乐结束监听
    photoMusic.onended = function () {
        // 切换到下一首音乐
        currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
        playPhotoMusic();
    };

    photoMusic.play().catch(e => console.log('照片音乐播放失败:', e));
}

// 音乐开关
function togglePhotoMusic() {
    const photoMusic = document.getElementById('photoMusic');
    const musicOn = $('.music-on');
    const musicOff = $('.music-off');

    if (photoMusic.paused) {
        photoMusic.play();
        musicOn.show();
        musicOff.hide();
    } else {
        photoMusic.pause();
        musicOn.hide();
        musicOff.show();
    }
}

// 显示爱心特效
function showLove() {
    // 创建多个爱心特效
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
            createDanmaku(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 200);
    }
}

// 暂停自动播放
function pauseAutoPlay() {
    isPlaying = false;
    clearInterval(photoInterval);
}

// 页面切换
function switchPage(pageId) {
    $('.page').removeClass('active');
    $('#' + pageId).addClass('active');

    // 如果切换到主页面，播放生日音乐
    if (pageId === 'mainPage') {
        playBirthdayMusic();
        // 停止照片播放
        pauseAutoPlay();
    }
}

// 返回主页面
function backToMain() {
    switchPage('mainPage');
}

// 显示照片墙页面
function showPhotoWall() {
    switchPage('photoWallPage');
    
    // 停止生日快乐歌曲
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();
    
    // 初始化照片墙
    setTimeout(() => {
        initPhotoWall();
    }, 100);
}

// 初始化照片墙
function initPhotoWall() {
    const aiPhotos = photos.filter(photo => photo.src.includes('AI写真'));
    
    if (aiPhotos.length === 0) {
        console.log('没有找到AI写真照片');
        return;
    }
    
    const sphere = document.getElementById('photoSphere');
    sphere.innerHTML = '';
    
    // 生成照片墙项目
    aiPhotos.forEach((photo, index) => {
        const x = (index % 5) * 2 - 4; // -4 到 4
        const y = Math.floor(index / 5) * 2 - 2; // -2 到 2
        
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('data-src', photo.src);
        item.setAttribute('data-item', `${x},${y}`);
        item.setAttribute('data-item-size', '2,2');
        item.style.setProperty('--offset-x', x);
        item.style.setProperty('--offset-y', y);
        item.style.setProperty('--item-size-x', 2);
        item.style.setProperty('--item-size-y', 2);
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'item__image';
        
        const img = document.createElement('img');
        img.src = getWebpCandidate(photo.src);
        img.draggable = false;
        img.onerror = function() {
            this.src = photo.src;
        };
        
        imageDiv.appendChild(img);
        item.appendChild(imageDiv);
        sphere.appendChild(item);
    });
    
    // 初始化3D球体交互
    initSphereInteraction();
}

// 初始化3D球体交互
function initSphereInteraction() {
    const MAX_POLAR_ROT_DEG = 30;
    const PAN_SENSITIVITY = 18;
    const TRANSITION_DUR_MS = 300;
    
    const DOM = {
        sphere: document.querySelector('#photoSphere'),
        main: document.querySelector('.photo-wall-main'),
        items: document.querySelectorAll('.item__image'),
        frame: document.querySelector('.frame'),
        viewer: document.querySelector('.viewer'),
        scrim: document.querySelector('.scrim'),
    };
    
    const state = {
        rotation: { x: 0, y: 0 },
        startRotation: { x: 0, y: 0 },
        isDragging: false
    };
    
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    
    const applyTransform = () => {
        DOM.sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${state.rotation.x}deg) rotateY(${state.rotation.y}deg)`;
    };
    
    // 鼠标/触摸事件处理
    let isPointerDown = false;
    let startX = 0, startY = 0;
    
    const handlePointerDown = (e) => {
        isPointerDown = true;
        state.isDragging = false;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        state.startRotation.x = state.rotation.x;
        state.startRotation.y = state.rotation.y;
    };
    
    const handlePointerMove = (e) => {
        if (!isPointerDown) return;
        
        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            state.isDragging = true;
        }
        
        const proposedX = state.startRotation.x - deltaY / PAN_SENSITIVITY;
        state.rotation.x = clamp(proposedX, -MAX_POLAR_ROT_DEG, MAX_POLAR_ROT_DEG);
        state.rotation.y = state.startRotation.y + deltaX / PAN_SENSITIVITY;
        
        applyTransform();
    };
    
    const handlePointerUp = () => {
        isPointerDown = false;
        setTimeout(() => {
            state.isDragging = false;
        }, 100);
    };
    
    // 绑定事件
    DOM.main.addEventListener('mousedown', handlePointerDown);
    DOM.main.addEventListener('mousemove', handlePointerMove);
    DOM.main.addEventListener('mouseup', handlePointerUp);
    DOM.main.addEventListener('touchstart', handlePointerDown);
    DOM.main.addEventListener('touchmove', handlePointerMove);
    DOM.main.addEventListener('touchend', handlePointerUp);
    
    // 点击放大功能
    DOM.items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (state.isDragging) return;
            
            const img = item.querySelector('img');
            const enlargedDiv = document.createElement('div');
            enlargedDiv.className = 'enlarge';
            enlargedDiv.innerHTML = `<img src="${img.src}" alt="AI写真">`;
            
            DOM.viewer.appendChild(enlargedDiv);
            document.body.setAttribute('data-enlarging', 'true');
            
            // 点击遮罩关闭
            DOM.scrim.addEventListener('click', () => {
                document.body.setAttribute('data-enlarging', 'false');
                setTimeout(() => {
                    enlargedDiv.remove();
                }, TRANSITION_DUR_MS);
            }, { once: true });
        });
    });
}
function showMessageBoard() {
    switchPage('messagePage');
}

// 添加点击特效
function addClickEffects() {
    $(document).on('click', function (e) {
        // 烟花效果
        createFirework(e.pageX, e.pageY);

        // 随机弹幕
        if (Math.random() < 0.3) { // 30% 概率显示弹幕
            createDanmaku(e.pageX, e.pageY);
        }

        // 流星雨效果
        if (Math.random() < 0.1) { // 10% 概率显示流星
            createMeteor();
        }
    });
}

// 创建烟花效果
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 12; i++) {
        const particle = $('<div class="firework-particle"></div>');
        particle.css({
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: '4px',
            height: '4px',
            backgroundColor: color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999
        });

        $('body').append(particle);

        const angle = (i * 30) * Math.PI / 180;
        const distance = 50 + Math.random() * 50;

        particle.animate({
            left: x + Math.cos(angle) * distance,
            top: y + Math.sin(angle) * distance,
            opacity: 0
        }, 800, function () {
            particle.remove();
        });
    }
}

// 创建流星雨效果
function createMeteor() {
    const meteor = $('<div class="meteor"></div>');
    const startX = Math.random() * window.innerWidth;
    const startY = -50;

    meteor.css({
        position: 'fixed',
        left: startX + 'px',
        top: startY + 'px',
        width: '2px',
        height: '20px',
        background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1000
    });

    $('body').append(meteor);

    meteor.animate({
        left: startX + 200,
        top: window.innerHeight + 50
    }, 2000, function () {
        meteor.remove();
    });
}

// 创建爱意弹幕
function createDanmaku(x, y) {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const danmaku = $('<div class="danmaku"></div>');

    danmaku.css({
        position: 'fixed',
        left: x + 'px',
        top: y + 'px',
        color: '#ff6b9d',
        fontSize: '18px',
        fontWeight: 'bold',
        pointerEvents: 'none',
        zIndex: 9999,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    }).text(message);

    $('body').append(danmaku);

    danmaku.animate({
        top: y - 100,
        opacity: 0
    }, 2000, function () {
        danmaku.remove();
    });
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

    // 保存留言
    saveMessage(messageText);

    // 清空输入框
    $('#messageInput').val('');

    // 重新加载留言
    loadMessages();

    // 显示发送成功提示
    const toast = $('<div class="toast">留言发送成功！💕</div>');
    $('body').append(toast);
    setTimeout(() => toast.fadeOut(() => toast.remove()), 2000);
}

// 发送礼物
function sendGift() {
    const gifts = ['🎁', '💐', '🌹', '💍', '🍰', '🎂', '🍫', '💝'];
    const gift = gifts[Math.floor(Math.random() * gifts.length)];

    // 创建礼物动画
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const giftElement = $('<div class="gift-animation">' + gift + '</div>');
            giftElement.css({
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                top: window.innerHeight + 'px',
                fontSize: '30px',
                pointerEvents: 'none',
                zIndex: 9999
            });

            $('body').append(giftElement);

            giftElement.animate({
                top: -50,
                opacity: 0
            }, 3000, function () {
                giftElement.remove();
            });
        }, i * 200);
    }
}

// 发送表情
function sendEmoji() {
    const emojis = ['😘', '💕', '💖', '💗', '💓', '💝', '😍', '🥰', '😚', '💋'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    // 创建表情雨效果
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emojiElement = $('<div class="emoji-rain">' + emoji + '</div>');
            emojiElement.css({
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                top: -30 + 'px',
                fontSize: '25px',
                pointerEvents: 'none',
                zIndex: 9999
            });

            $('body').append(emojiElement);

            emojiElement.animate({
                top: window.innerHeight + 30,
                opacity: 0.3
            }, 4000, function () {
                emojiElement.remove();
            });
        }, i * 100);
    }
}

// 保存留言到本地存储
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    messages.unshift({
        text: message,
        time: new Date().toLocaleString()
    });
    localStorage.setItem('loveMessages', JSON.stringify(messages.slice(0, 50))); // 只保留最新50条
}

// 加载留言
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    const messageList = $('#messageList');
    messageList.empty();

    messages.forEach(msg => {
        const messageItem = $(`
            <div class="message-item">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `);
        messageList.append(messageItem);
    });
}

// 添加一些浪漫的背景动画
function addBackgroundAnimations() {
    setInterval(() => {
        // 随机添加飘落的心形
        if (Math.random() < 0.3) {
            createFloatingHeart();
        }
    }, 2000);
}

// 创建飘落的心形
function createFloatingHeart() {
    const heart = $('<div style="position: fixed; font-size: 20px; color: rgba(255, 182, 193, 0.7); pointer-events: none; z-index: 1;">💕</div>');
    const startX = Math.random() * window.innerWidth;
    const startY = -30;

    heart.css({
        left: startX + 'px',
        top: startY + 'px'
    });

    $('body').append(heart);

    heart.animate({
        top: window.innerHeight + 30,
        left: startX + (Math.random() - 0.5) * 100
    }, 8000, function () {
        heart.remove();
    });
}

// 启动背景动画
$(document).ready(function () {
    addBackgroundAnimations();
});

// 获取WebP候选路径
function getWebpCandidate(src) {
    try {
        return 'build/' + src.replace(/\.(jpg|jpeg|png|heic)$/i, '.webp');
    } catch (e) {
        return src;
    }
}
