declare module '@/lib/wasm/rust_wasm' {
  export function apply_grayscale(pixels: Uint8Array, width: number, height: number): Uint8Array;
  export function apply_blur(pixels: Uint8Array, width: number, height: number): Uint8Array;
  export function apply_edge_detection(pixels: Uint8Array, width: number, height: number): Uint8Array;
}