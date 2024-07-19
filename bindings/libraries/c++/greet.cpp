#include <string>

extern "C" {
    const char* greet(const char* name) {
        std::string greeting = "Hello, " + std::string(name) + "!";
        return greeting.c_str();
    }
}
