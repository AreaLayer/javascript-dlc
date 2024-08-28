// Import everything necessary from wasm_bindgen
use wasm_bindgen::prelude::*;

// Import the console logging functionality from the web_sys crate
use web_sys::console;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("DLC, {}!", name)
}

#[wasm_bindgen]
pub fn log(msg: &str) {
    console::log_1(&msg.into());
}
