const tapscriptModule = require('./tapscript/pkg/tapscript');

const { Tapscript, parse_script } = tapscriptModule;

async function run() {
  // Initialize the WebAssembly module
  await tapscriptModule;

  const tapscript = new Tapscript();

  try {
    // Parse the Tapscript code
    const parsedScript = parse_script(tapscriptCode);

    // Interpret the parsed Tapscript
    const result = tapscript.interpret(parsedScript);

    console.log('Tapscript result:', result);
  } catch (error) {
    console.error('Error interpreting Tapscript:', error);
  }
}

run();
