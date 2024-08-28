## Bindings 

### **1. Setting Up the Environment**

1. **Install Rust and WASM Tools**
   - Install Rust from [rustup](https://rustup.rs/).
   - Install `wasm-pack`:
     ```sh
     cargo install wasm-pack
     ```

2. **Install Node.js and npm**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

3. **Install C++ Build Tools**
   - On Windows: Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
   - On macOS: Install Xcode Command Line Tools:
     ```sh
     xcode-select --install
     ```
   - On Linux: Install build-essential:
     ```sh
     sudo apt-get install build-essential
     ```

### **2. Creating the Rust Project with WASM Binding**

1. **Create a New Rust Project**
   ```sh
   cargo new --lib rust_dlc
   cd rust_dlc
   ```

2. **Add Dependencies in `Cargo.toml`**
   ```toml
   [package]
   name = "dllc"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   wasm-bindgen = "0.2"
   javascript-dlc = "0.1.0"

   [lib]
   crate-type = ["cdylib"]

   [package.metadata.wasm-bindgen]
   "target" = "wasm32-unknown-unknown"
   ```

3. **Write Rust Code in `src/lib.rs`**
   ```rust
   use wasm_bindgen::prelude::*;
   use dlc::DLC;

   #[wasm_bindgen]
   pub fn create_dlc() -> String {
       let dlc = DLC::new();
       dlc.to_string()
   }
   ```

4. **Build the Rust Code with WASM**
   ```sh
   wasm-pack build --target web
   ```

### **3. Setting Up TypeScript Project**

1. **Create a New TypeScript Project**
   ```sh
   mkdir ts_dlc_project
   cd ts_dlc_project
   npm init -y
   npm install typescript --save-dev
   npm install @types/node --save-dev
   ```

2. **Install the WASM Package**
   ```sh
   npm install ../rust_dlc/pkg
   ```

3. **Create a TypeScript File (e.g., `index.ts`)**
   ```typescript
   import init, { create_dlc } from "../rust_dlc/pkg/rust_dlc";

   async function run() {
       await init();
       const dlc = create_dlc();
       console.log("DLC created:", dlc);
   }

   run();
   ```

4. **Compile TypeScript**
   - Add a `tsconfig.json`:
     ```json
     {
       "compilerOptions": {
         "target": "es6",
         "module": "commonjs",
         "outDir": "./dist"
       },
       "include": ["src/**/*"]
     }
     ```
   - Compile the TypeScript code:
     ```sh
     npx tsc
     ```

### **4. Setting Up C++ Project**

1. **Create a New C++ Project**
   - Create a directory for your C++ project and add files as needed.

2. **Add Bindings Using Emscripten**
   - Install [Emscripten](https://emscripten.org/docs/getting_started/downloads.html).
   - Write C++ code and compile to WASM:
     ```cpp
     // example.cpp
     #include <emscripten/emscripten.h>
     #include <string>

     extern "C" {
         const char* EMSCRIPTEN_KEEPALIVE create_dlc() {
             return "DLC created in C++";
         }
     }
     ```

   - Compile to WASM:
     ```sh
     emcc example.cpp -o example.js -s WASM=1
     ```

3. **Integrate C++ WASM with TypeScript**
   - Include the generated `.js` and `.wasm` files in your TypeScript project.

   ```typescript
   declare const Module: any;

   Module.onRuntimeInitialized = () => {
       console.log(Module._create_dlc());
   };
   ```

### **5. Testing and Running the Project**

1. **Serve the Project**
   - Install a simple server:
     ```sh
     npm install http-server --save-dev
     ```
   - Serve your project:
     ```sh
     npx http-server ./dist
     ```

2. **Open the Browser**
   - Navigate to `http://localhost:8080` to see your output.

### **Conclusion**

You now have a setup that integrates Rust with WASM, TypeScript, and C++. You can extend this basic framework to include more complex DLC logic, test it, and deploy it as needed.

