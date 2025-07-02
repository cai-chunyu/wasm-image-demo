# WASM Image Processing Demo

This is a Next.js application that demonstrates WebAssembly (WASM) for image processing using Rust and the Photon image processing library.

## Features

- Upload images and apply various filters
- Real-time image processing using WASM for performance
- Filters include: Grayscale, Blur, Edge Detection
- Built with Next.js, TypeScript, and Rust

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Library code and WASM loader
├── rust-wasm/          # Rust WASM module
│   ├── src/
│   ├── Cargo.toml
│   └── build.sh        # WASM build script
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── vercel.json         # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Rust and Cargo
- wasm-pack

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cai-chunyu/wasm-image-demo.git
cd wasm-image-demo
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Build the WASM module:
```bash
cd rust-wasm
chmod +x build.sh
./build.sh
cd ..
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

The WASM module is automatically built during the deployment process. For local production builds:

```bash
# Build WASM module
cd rust-wasm && ./build.sh && cd ..

# Build Next.js app
npm run build
```

## WASM Module

The Rust WASM module is located in `rust-wasm/` and provides image processing functions:

- `apply_grayscale()` - Convert image to grayscale
- `apply_blur()` - Apply blur effect
- `apply_edge_detection()` - Detect edges in the image

The module uses the [Photon](https://silvia-odwyer.github.io/photon/) image processing library for high-performance operations.

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes:

- Automatic Rust and wasm-pack installation
- WASM module building before Next.js build
- Proper CORS headers for WASM files

Push to your connected GitHub repository to trigger automatic deployment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WebAssembly Documentation](https://webassembly.org/)
- [Photon Image Processing](https://silvia-odwyer.github.io/photon/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)