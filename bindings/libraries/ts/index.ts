import init, { greet as rustGreet } from '../rust_wasm/rust_wasm.js';
import Module from '../cpp_wasm/cpp_wasm.js';

async function run() {
    await init(); // Inicializa o WASM
    console.log(rustGreet('Rust'));
}

run();

Module().then((cppModule) => {
    console.log(cppModule.greet('C++'));
});