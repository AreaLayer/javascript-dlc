import { greet as rustGreet } from '../rust_wasm/rust_wasm';
import { greet as cppGreet } from '../cpp_wasm';

console.log(rustGreet('Rust'));
console.log(cppGreet('C++'));
