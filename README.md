# Rust WASM 图像处理 Demo

这是一个简单的演示项目，展示了如何使用 Rust 编写的 WebAssembly 模块在 Next.js 应用中进行图像处理。

## 功能

- 拖拽上传图片
- 三种图像滤镜：
  - 灰度转换
  - 模糊效果
  - 边缘检测
- 左右滑块对比原图和处理后的图片

## 项目结构

```
wasm-image-demo/
├── rust-wasm/          # Rust WASM 模块
│   ├── src/lib.rs      # 图像处理函数
│   └── Cargo.toml
└── web/                # Next.js 前端
    ├── app/page.tsx    # 主页面
    └── components/     # React 组件
```

## 运行步骤

### 1. 构建 WASM 模块

```bash
cd rust-wasm
./build.sh
```

### 2. 运行 Next.js 应用

```bash
cd web
npm install
npm run dev
```

### 3. 访问应用

打开浏览器访问 http://localhost:3000

## 技术栈

- Rust + wasm-bindgen + photon-rs
- Next.js + TypeScript + Tailwind CSS
- WebAssembly

## 使用说明

1. 拖拽或点击上传一张图片
2. 选择一个滤镜效果
3. 使用滑块对比原图和处理后的效果
4. 可以上传新图片重新开始