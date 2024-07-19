mergeInto(LibraryManager.library, {
    greet: function(namePtr) {
        var name = UTF8ToString(namePtr);
        var greeting = Module.greet(name);
        return allocateUTF8(greeting);
    }
});

export function greet(name) {
    const namePtr = allocateUTF8(name);
    const resultPtr = _greet(namePtr);
    const result = UTF8ToString(resultPtr);
    return result;
}
