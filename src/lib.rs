use wasm_bindgen::prelude::*;
use wasm_bindgen::web_sys::console;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("DLC, {}!", name)
}

#[wasm_bindgen]
pub fn log(msg: &str) {
    console::log_1(&msg.into());
}
