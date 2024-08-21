use wasm_bindgen::prelude::*;
use wasm_bindgen::web_sys::console;
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
