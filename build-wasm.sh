#!/bin/bash
set -e

echo "Building WASM module..."

# Install Rust if not already installed
if ! command -v rustc &> /dev/null; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
fi

# Install wasm-pack if not already installed
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
fi

# Add wasm32 target if not already added
rustup target add wasm32-unknown-unknown

# Build WASM module
cd rust-wasm
chmod +x build.sh
./build.sh
cd ..

echo "WASM module built successfully!"