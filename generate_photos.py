#!/usr/bin/env python3
import os
import glob
from datetime import datetime

def get_photo_description(filepath):
    """根据文件路径生成描述"""
    if "结婚" in filepath:
        return "我们的婚礼，最美好的开始 💕"
    elif "怀孕" in filepath:
        return "期待小生命的到来 👶"
    elif "AI写真" in filepath:
        return "AI写真，科技记录美丽 ✨"
    elif "2016" in filepath:
        return "相识相知的美好时光 💖"
    elif "2017" in filepath:
        return "新婚燕尔，甜蜜开始 🥰"
    elif "2018" in filepath:
        return "小家庭的温馨日常 🏠"
    elif "2019" in filepath:
        return "幸福三口之家 👨‍👩‍👧"
    elif "2020" in filepath:
        return "一起度过特殊的一年 🤝"
    elif "2021" in filepath:
        return "平凡生活中的小确幸 😊"
    elif "2022" in filepath:
        return "岁月静好，爱意绵绵 💝"
    elif "2023" in filepath:
        return "成长路上，相伴同行 🌱"
    elif "2024" in filepath:
        return "坚强的你，我心中的超人 💪"
    elif "2025" in filepath:
        return "新的一年，爱情依然甜蜜 🍯"
    else:
        return "珍贵的回忆时光 💫"

def generate_photos_config():
    """生成照片配置"""
    base_path = "./images/pictures"
    
    # 获取所有图片文件
    patterns = ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.JPG"]
    all_photos = []
    
    for pattern in patterns:
        files = glob.glob(os.path.join(base_path, pattern), recursive=True)
        all_photos.extend(files)
    
    # 按年份和文件夹排序
    photo_data = []
    for filepath in all_photos:
        try:
            # 提取年份用于排序
            year = 9999  # 默认值
            if "2016" in filepath:
                year = 2016
            elif "2017" in filepath:
                if "结婚" in filepath:
                    year = 2017.1  # 结婚在前
                elif "怀孕" in filepath:
                    year = 2017.2  # 怀孕在后
                else:
                    year = 2017.3
            elif "2018" in filepath:
                year = 2018
            elif "2019" in filepath:
                year = 2019
            elif "2020" in filepath:
                year = 2020
            elif "2021" in filepath:
                year = 2021
            elif "2022" in filepath:
                year = 2022
            elif "2023" in filepath:
                year = 2023
            elif "2024" in filepath:
                year = 2024
            elif "2025" in filepath:
                year = 2025
            elif "AI写真" in filepath:
                year = 2026  # AI写真放在最后
            
            # 转换为相对路径
            rel_path = filepath.replace("./", "")
            
            # 提取年份用于日期显示
            if "2016" in filepath:
                date_str = "2016年 - 相识"
            elif "2017" in filepath and "结婚" in filepath:
                date_str = "2017年 - 婚礼"
            elif "2017" in filepath and "怀孕" in filepath:
                date_str = "2017年 - 怀孕"
            elif "2017" in filepath:
                date_str = "2017年 - 新婚"
            elif "2018" in filepath:
                date_str = "2018年 - 温馨"
            elif "2019" in filepath:
                date_str = "2019年 - 幸福"
            elif "2020" in filepath:
                date_str = "2020年 - 陪伴"
            elif "2021" in filepath:
                date_str = "2021年 - 成长"
            elif "2022" in filepath:
                date_str = "2022年 - 岁月"
            elif "2023" in filepath:
                date_str = "2023年 - 坚持"
            elif "2024" in filepath:
                date_str = "2024年 - 坚强"
            elif "2025" in filepath:
                date_str = "2025年 - 甜蜜"
            elif "AI写真" in filepath:
                date_str = "AI写真 - 美丽"
            else:
                date_str = "美好回忆"
            
            photo_data.append({
                'year': year,
                'path': rel_path,
                'date': date_str,
                'description': get_photo_description(filepath)
            })
        except Exception as e:
            print(f"处理文件 {filepath} 时出错: {e}")
    
    # 按年份排序（从小到大）
    photo_data.sort(key=lambda x: x['year'])
    
    # 生成JavaScript配置
    js_content = """// 实际照片数据 - 按时间线排序
const actualPhotos = [
"""
    
    for photo in photo_data:
        js_content += f"""    {{
        src: '{photo['path']}',
        date: '{photo['date']}',
        description: '{photo['description']}'
    }},
"""
    
    js_content += """];

// 更新照片加载函数
function loadActualPhotos() {
    photos = actualPhotos;
    $('#totalPhotos').text(photos.length);
    
    // 预加载图片
    photos.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
    });
}"""
    
    return js_content

if __name__ == "__main__":
    config = generate_photos_config()
    
    # 写入文件
    with open("photos.js", "w", encoding="utf-8") as f:
        f.write(config)
    
    print(f"✅ 已生成 photos.js 配置文件")
    print(f"📸 共包含 {config.count('src:')} 张照片")
