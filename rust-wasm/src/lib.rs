use wasm_bindgen::prelude::*;
use photon_rs::{PhotonImage, monochrome, conv};

#[wasm_bindgen]
pub fn apply_grayscale(raw_pixels: Vec<u8>, width: u32, height: u32) -> Vec<u8> {
    let mut photon_image = PhotonImage::new(raw_pixels, width, height);
    
    monochrome::grayscale(&mut photon_image);
    
    photon_image.get_raw_pixels()
}

#[wasm_bindgen]
pub fn apply_blur(raw_pixels: Vec<u8>, width: u32, height: u32) -> Vec<u8> {
    let mut photon_image = PhotonImage::new(raw_pixels, width, height);
    
    conv::gaussian_blur(&mut photon_image, 5);
    
    photon_image.get_raw_pixels()
}

#[wasm_bindgen]
pub fn apply_edge_detection(raw_pixels: Vec<u8>, width: u32, height: u32) -> Vec<u8> {
    let mut photon_image = PhotonImage::new(raw_pixels, width, height);
    
    conv::edge_detection(&mut photon_image);
    
    photon_image.get_raw_pixels()
}
