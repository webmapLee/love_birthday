#!/usr/bin/env python3
import os
import json

def generate_photos_js():
    base_path = "images/pictures"
    photos = []
    
    # 年份和描述映射
    year_descriptions = {
        "2016": {"date": "2016年 - 相识", "desc": "相识相知的美好时光 💖"},
        "2017": {"date": "2017年 - 新婚", "desc": "新婚燕尔，甜蜜开始 🥰"},
        "2017-结婚": {"date": "2017年 - 婚礼", "desc": "我们的婚礼，最美好的开始 💕"},
        "2017-怀孕": {"date": "2017年 - 怀孕", "desc": "期待小生命的到来 👶"},
        "2018": {"date": "2018年 - 温馨", "desc": "小家庭的温馨日常 🏠"},
        "2019": {"date": "2019年 - 幸福", "desc": "幸福三口之家 👨‍👩‍👧"},
        "2020": {"date": "2020年 - 陪伴", "desc": "一起度过特殊的一年 🤝"},
        "2021": {"date": "2021年 - 成长", "desc": "平凡生活中的小确幸 😊"},
        "2022": {"date": "2022年 - 岁月", "desc": "岁月静好，爱意绵绵 💝"},
        "2023": {"date": "2023年 - 坚持", "desc": "成长路上，相伴同行 🌱"},
        "2024": {"date": "2024年 - 坚强", "desc": "坚强的你，我心中的超人 💪"},
        "2025": {"date": "2025年 - 甜蜜", "desc": "新的一年，爱情依然甜蜜 🍯"},
        "AI写真": {"date": "AI写真 - 美丽", "desc": "AI写真，科技记录美丽 ✨"}
    }
    
    # 遍历目录
    for folder in sorted(os.listdir(base_path)):
        folder_path = os.path.join(base_path, folder)
        if os.path.isdir(folder_path):
            for file in sorted(os.listdir(folder_path)):
                if file.lower().endswith(('.jpg', '.jpeg', '.png', '.heic')):
                    src = f"{base_path}/{folder}/{file}"
                    date_info = year_descriptions.get(folder, {"date": f"{folder}", "desc": "美好的回忆 💕"})
                    
                    photo = {
                        "src": src,
                        "date": date_info["date"],
                        "description": date_info["desc"]
                    }
                    photos.append(photo)
    
    # 生成JavaScript文件内容
    js_content = """// 实际照片数据 - 按时间线排序
const actualPhotos = [
"""
    
    for i, photo in enumerate(photos):
        comma = "," if i < len(photos) - 1 else ""
        js_content += f"    {{ src: '{photo['src']}', date: '{photo['date']}', description: '{photo['description']}' }}{comma}\n"
    
    js_content += """];

// 更新照片加载函数
function loadActualPhotos() {
    photos = actualPhotos;
    $('#totalPhotos').text(photos.length);

    // 预加载前 5 张图片，降低首屏带宽消耗
    const preloadCount = Math.min(5, photos.length);
    for (let i = 0; i < preloadCount; i++) {
        const src = photos[i].src;
        const img = new Image();
        // 与 script.js 的逻辑保持一致，尝试使用 webp 构建产物
        try {
            const webpCandidate = 'build/' + src.replace(/\\.(jpg|jpeg|png|heic)$/i, '.webp');
            img.src = webpCandidate;
        } catch (e) {
            img.src = src;
        }
    }
}"""
    
    # 写入文件
    with open("photos.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"✅ 生成完成！共找到 {len(photos)} 张照片")
    print("📁 已更新 photos.js 文件")

if __name__ == "__main__":
    generate_photos_js()
