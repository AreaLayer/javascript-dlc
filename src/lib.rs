// Import everything necessary from wasm_bindgen
use wasm_bindgen::prelude::*;

// Import the console logging functionality from the web_sys crate
use web_sys::console;


#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    // Ensure the string is formatted correctly.
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn log(msg: &str) {
    // Safely log the message to the browser's console.
    console::log_1(&msg.into());
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    // Return the sum of the two integers.
    a + b
}
