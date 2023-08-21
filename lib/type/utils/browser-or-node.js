// Common code that can be used in both environments
function commonFunction() {
    return "This is common code.";
}

// Code specific to the Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    // This block will be executed in Node.js
    const fs = require('fs');

    module.exports = {
        commonFunction,
        // Node.js-specific functions can be added here
    };
} else {
    // This block will be executed in the browser
    window.commonFunction = commonFunction;
    // Browser-specific functions can be added here
}
