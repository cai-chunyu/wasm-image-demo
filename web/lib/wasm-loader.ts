let wasmModule: any = null;

export async function loadWasmModule() {
  if (wasmModule) return wasmModule;
  
  try {
    // @ts-ignore
    const module = await import('./wasm/rust_wasm');
    wasmModule = module;
    return module;
  } catch (error) {
    console.error('Failed to load WASM module:', error);
    throw error;
  }
}

export async function applyGrayscale(pixels: Uint8Array, width: number, height: number): Promise<Uint8Array> {
  const wasm = await loadWasmModule();
  return wasm.apply_grayscale(pixels, width, height);
}

export async function applyBlur(pixels: Uint8Array, width: number, height: number): Promise<Uint8Array> {
  const wasm = await loadWasmModule();
  return wasm.apply_blur(pixels, width, height);
}

export async function applyEdgeDetection(pixels: Uint8Array, width: number, height: number): Promise<Uint8Array> {
  const wasm = await loadWasmModule();
  return wasm.apply_edge_detection(pixels, width, height);
}