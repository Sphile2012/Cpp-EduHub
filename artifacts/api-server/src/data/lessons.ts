export interface LessonSection {
  heading?: string | null;
  body: string;
  type: "text" | "note" | "warning" | "tip" | "code";
  code?: string | null;
  language?: string | null;
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
  runnable: boolean;
}

export interface LessonData {
  id: string;
  order: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  topics: string[];
  content: LessonSection[];
  codeExamples: CodeExample[];
  keyPoints: string[];
  nextLessonId?: string | null;
  prevLessonId?: string | null;
}

export const lessons: LessonData[] = [
  {
    id: "what-is-cpp",
    order: 1,
    title: "What Is C++? & Its Features",
    description: "Discover what C++ is, why it was created, and the key features that make it one of the most powerful languages in the world.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    topics: ["compiled language", "static typing", "memory management", "OOP", "STL"],
    prevLessonId: null,
    nextLessonId: "how-cpp-works",
    content: [
      {
        type: "text",
        body: "C++ is a compiled, statically-typed, general-purpose language created as an extension of C, adding Object-Oriented Programming on top. \"Compiled\" means your whole program is translated into machine code by a compiler BEFORE it ever runs – the CPU runs your program directly, with nothing standing in between.",
      },
      {
        type: "note",
        heading: "Why does this matter?",
        body: "That direct-to-machine-code translation is exactly why C++ is one of the fastest languages around, and why it's the language of choice whenever raw speed and control over memory really matter – game engines, operating systems, embedded devices.",
      },
      {
        type: "text",
        heading: "Key Features",
        body: "C++ has a rich set of features that make it both powerful and flexible:",
      },
      {
        type: "text",
        heading: "Compiled Language",
        body: "Translated straight to machine code, so it runs extremely fast. Trade-off: you must recompile every time you change the code.",
      },
      {
        type: "text",
        heading: "Statically Typed",
        body: "You must declare a variable's type (int age = 25;) and it can never silently change type. This catches many bugs BEFORE the program even runs.",
      },
      {
        type: "text",
        heading: "Manual Memory Management",
        body: "You control exactly when memory is allocated (new) and freed (delete). Powerful, but you are responsible for cleaning up after yourself.",
      },
      {
        type: "text",
        heading: "Object-Oriented",
        body: "Supports classes, inheritance, polymorphism, so you can model real-world things as objects.",
      },
      {
        type: "text",
        heading: "Multi-Paradigm",
        body: "Procedural, object-oriented AND generic (templates) programming are all supported, so you pick whatever style fits.",
      },
      {
        type: "text",
        heading: "Rich Standard Library (STL)",
        body: "Ready-made containers (vectors, maps) and algorithms (sorting, searching) so you don't reinvent basic data structures.",
      },
      {
        type: "text",
        heading: "Close to Hardware",
        body: "Pointers and references let you work directly with memory addresses, which is essential for systems programming.",
      },
      {
        type: "tip",
        heading: "Static Typing vs Manual Memory",
        body: "Static typing + manual memory management are the two features that make C++ harder to learn than Python, but they are also exactly why C++ gives you far more control and speed. That trade-off (safety-net vs raw control) is the single biggest thing to understand about why C++ gets chosen for performance-critical projects.",
      },
    ],
    codeExamples: [
      {
        title: "Your First C++ Variable Declarations",
        code: `int age = 25;           // integer — whole number
double salary = 55000.50;  // decimal number
char grade = 'A';          // single character
bool isStudent = true;     // true or false
std::string name = "Alice"; // text (needs #include <string>)`,
        explanation: "Every variable must declare its type before use. This is C++'s static typing in action — the compiler knows exactly what each variable is.",
        runnable: false,
      },
    ],
    keyPoints: [
      "C++ is a compiled language — code is converted to machine code before running",
      "Statically typed — all variable types must be declared and cannot change",
      "Manual memory management gives power but requires responsibility",
      "Multi-paradigm: supports procedural, OOP, and generic programming",
      "STL provides ready-made containers and algorithms",
    ],
  },
  {
    id: "how-cpp-works",
    order: 2,
    title: "How C++ Works — The Build Pipeline",
    description: "Understand the compilation pipeline: from source code through preprocessor, compiler, and linker to a running executable.",
    difficulty: "beginner",
    estimatedMinutes: 12,
    topics: ["preprocessor", "compiler", "linker", "object files", "executable"],
    prevLessonId: "what-is-cpp",
    nextLessonId: "cpp-applications",
    content: [
      {
        type: "text",
        body: "Unlike an interpreted language, C++ needs a \"build\" step before it can run. Understanding this pipeline explains why you must compile every time you edit your code.",
      },
      {
        type: "text",
        heading: "Step 1: The Preprocessor",
        body: "Handles lines starting with #, like copy-pasting the contents of #include <iostream> straight into your file. All #define macros are also expanded here.",
      },
      {
        type: "text",
        heading: "Step 2: The Compiler",
        body: "Checks your syntax/types and translates the preprocessed code into an object file of machine instructions. One object file per .cpp file is produced.",
      },
      {
        type: "text",
        heading: "Step 3: The Linker",
        body: "Stitches all your object files together with any libraries you used (like the standard library) into one final executable.",
      },
      {
        type: "text",
        heading: "Step 4: Execution",
        body: "The executable is pure machine code – the CPU runs it directly, with no interpreter or virtual machine in the way.",
      },
      {
        type: "note",
        heading: "Why should you care?",
        body: "This is exactly why a C++ program typically starts up and runs faster than an equivalent Python script – all the \"translation work\" happened once, ahead of time, instead of every single run.",
      },
      {
        type: "code",
        heading: "Compiling from the Terminal",
        body: "Here is how you compile and run a C++ program from the command line:",
        code: `# Compile
g++ myprogram.cpp -o myprogram

# Run on Mac/Linux
./myprogram

# Run on Windows
myprogram.exe

# Compile with a specific C++ standard
g++ -std=c++17 myprogram.cpp -o myprogram`,
        language: "bash",
      },
      {
        type: "tip",
        body: "Always compile with -std=c++17 (or newer) to access modern C++ features like structured bindings, std::optional, and more.",
      },
    ],
    codeExamples: [
      {
        title: "Hello World — Your First Program",
        code: `#include <iostream>    // Step 1: Preprocessor pulls in iostream
using namespace std;   // Use std namespace for convenience

int main() {           // Step 2: Compiler translates this
    cout << "Hello, World!" << endl;
    return 0;          // Step 4: CPU executes this
}`,
        explanation: "This simple program shows all four pipeline steps in action. The #include is preprocessed, main() is compiled, then linked with the standard library, and finally executed.",
        runnable: true,
      },
    ],
    keyPoints: [
      "Source → Preprocessor → Compiler → Object File → Linker → Executable",
      "The preprocessor handles #include and #define directives",
      "The compiler checks syntax and types, producing object files",
      "The linker combines object files and libraries into the final executable",
      "Compiled programs run faster because translation happens once at compile time",
    ],
  },
  {
    id: "cpp-applications",
    order: 3,
    title: "Common Applications of C++",
    description: "Explore where C++ is used in the real world — from game engines to operating systems, browsers to trading systems.",
    difficulty: "beginner",
    estimatedMinutes: 10,
    topics: ["game engines", "operating systems", "embedded systems", "browsers", "trading"],
    prevLessonId: "how-cpp-works",
    nextLessonId: "cpp-roadmap",
    content: [
      {
        type: "text",
        body: "C++ is chosen whenever a program needs to be extremely fast and/or needs tight control over hardware and memory. Let's explore the major domains where C++ dominates.",
      },
      {
        type: "text",
        heading: "Game Engines",
        body: "Unreal Engine (used to build games like Fortnite) is written in C++. Games need to render frames dozens of times per second – no room for a slow interpreter. Every millisecond counts when you're targeting 60+ fps.",
      },
      {
        type: "text",
        heading: "Operating Systems",
        body: "Windows and parts of Linux/macOS are written in C/C++ for direct hardware control. OS kernels need to interact with hardware at the lowest level — something C++ handles elegantly.",
      },
      {
        type: "text",
        heading: "Embedded Systems",
        body: "Microcontrollers (in cars, appliances, IoT devices) have tiny memory and CPU. C++ gives full control with minimal overhead — you can't afford a garbage collector on a microcontroller.",
      },
      {
        type: "text",
        heading: "Web Browsers",
        body: "Chrome, Firefox, and Safari's rendering engines are all written in C++ for speed. Parsing HTML, executing JavaScript, and rendering pixels must happen in milliseconds.",
      },
      {
        type: "text",
        heading: "High-Frequency Trading",
        body: "Financial systems where every microsecond of latency costs money use C++. HFT systems execute thousands of trades per second and cannot afford the overhead of a slower language.",
      },
      {
        type: "text",
        heading: "Device Drivers",
        body: "Talking directly to hardware requires low-level memory access. Drivers for graphics cards, network adapters, and storage devices are written in C or C++.",
      },
      {
        type: "tip",
        body: "If you learn C++, you have a foundation to work on game development, systems programming, embedded systems, and competitive programming — some of the highest-paying and most interesting software roles.",
      },
    ],
    codeExamples: [
      {
        title: "Why Speed Matters — A Simple Benchmark Concept",
        code: `#include <iostream>
#include <chrono>
using namespace std;

int main() {
    auto start = chrono::high_resolution_clock::now();
    
    long long sum = 0;
    for (long long i = 0; i < 1000000000; i++) {
        sum += i;
    }
    
    auto end = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end - start);
    
    cout << "Sum: " << sum << endl;
    cout << "Time: " << duration.count() << " ms" << endl;
    return 0;
}`,
        explanation: "C++ can sum a billion numbers in under a second. The same loop in Python would take 30-50x longer. This performance gap is why C++ is used in time-critical systems.",
        runnable: true,
      },
    ],
    keyPoints: [
      "C++ powers game engines like Unreal Engine (Fortnite, etc.)",
      "Operating system kernels (Windows, Linux) are written in C/C++",
      "Embedded systems on microcontrollers use C++ for minimal overhead",
      "Web browsers like Chrome use C++ for their rendering engines",
      "High-frequency trading systems use C++ to minimize latency",
    ],
  },
  {
    id: "cpp-roadmap",
    order: 4,
    title: "C++ Roadmap for Beginners",
    description: "A step-by-step learning path from installing a compiler to building real projects — in exactly the right order.",
    difficulty: "beginner",
    estimatedMinutes: 8,
    topics: ["learning path", "roadmap", "study plan"],
    prevLessonId: "cpp-applications",
    nextLessonId: "installing-cpp",
    content: [
      {
        type: "text",
        body: "C++ builds concepts on top of each other more than most languages. Learning in the wrong order is the #1 reason beginners find C++ 'scary'. Here's the optimal learning path:",
      },
      {
        type: "text",
        heading: "Stage 1: Setup",
        body: "Install a compiler and IDE. You can't write or run C++ without a compiler. Visual Studio, CLion, or VS Code with GCC are the most popular choices.",
      },
      {
        type: "text",
        heading: "Stage 2: Basics",
        body: "Learn syntax basics: main(), cout/cin, variables. These are the absolute minimum you need to write any C++ program.",
      },
      {
        type: "text",
        heading: "Stage 3: Types & Operators",
        body: "Master data types and operators. Understanding int vs double, and how operators work, prevents common bugs.",
      },
      {
        type: "text",
        heading: "Stage 4: Control Flow",
        body: "Conditionals and loops. These let your program make decisions and repeat actions.",
      },
      {
        type: "text",
        heading: "Stage 5: Functions",
        body: "Functions and input/output. Break code into reusable pieces and interact with the user.",
      },
      {
        type: "text",
        heading: "Stage 6: Memory",
        body: "Arrays, pointers, and references. This is the hardest stage for most beginners — but it's what separates C++ from Python.",
      },
      {
        type: "text",
        heading: "Stage 7: OOP & Beyond",
        body: "Classes (OOP) → STL → a real mini-project. Build something real to solidify everything you've learned.",
      },
      {
        type: "warning",
        heading: "Don't Skip Ahead!",
        body: "Pointers only make sense once you understand variables and memory; classes only make sense once you're comfortable with functions. Skipping ahead to pointers/OOP too early is the #1 reason beginners find C++ scary.",
      },
    ],
    codeExamples: [
      {
        title: "Your First \"Real\" C++ Program",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Stage 2: Variables
    string name;
    int age;
    
    // Stage 5: Input/Output
    cout << "What is your name? ";
    cin >> name;
    
    cout << "How old are you? ";
    cin >> age;
    
    // Stage 4: Control flow
    if (age >= 18) {
        cout << "Welcome, " << name << "! You are an adult." << endl;
    } else {
        cout << "Welcome, " << name << "! You have " << (18 - age) << " years until adulthood." << endl;
    }
    
    return 0;
}`,
        explanation: "This program combines stages 2-5 of the roadmap. Notice how each stage builds on the previous: variables → I/O → control flow.",
        runnable: true,
      },
    ],
    keyPoints: [
      "Learn in order: Setup → Basics → Types → Control Flow → Functions → Memory → OOP",
      "Each stage builds on the previous — don't skip ahead",
      "Pointers require understanding variables and memory first",
      "Classes require being comfortable with functions first",
      "Build a real project after completing Stage 7 to solidify learning",
    ],
  },
  {
    id: "installing-cpp",
    order: 5,
    title: "Installing C++",
    description: "Set up your C++ development environment on Windows, macOS, or Linux — compiler, IDE, and your first compilation.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    topics: ["installation", "compiler", "VS Code", "GCC", "Visual Studio", "IDE"],
    prevLessonId: "cpp-roadmap",
    nextLessonId: "cpp-syntax",
    content: [
      {
        type: "text",
        body: "C++ has no single official installer like Python. You install a compiler (the program that turns your code into an executable) plus an editor/IDE.",
      },
      {
        type: "text",
        heading: "On Windows",
        body: "Option 1 (Recommended): Install Visual Studio Community (free) from visualstudio.microsoft.com and tick the 'Desktop development with C++' workload during setup — this gives you the MSVC compiler, debugger, and editor all in one.",
      },
      {
        type: "text",
        body: "Option 2 (Lighter): Install VS Code + the MinGW-w64 compiler (a Windows build of GCC), then add MinGW's bin folder to your PATH.",
      },
      {
        type: "text",
        heading: "On macOS",
        body: "Open Terminal and run the Xcode Command Line Tools installer. This installs Apple's Clang compiler — that's all most people need. Then install VS Code as your editor.",
      },
      {
        type: "code",
        heading: "macOS Installation",
        body: "Run this in your terminal:",
        code: `xcode-select --install
# Verify:
clang++ --version`,
        language: "bash",
      },
      {
        type: "text",
        heading: "The Three Main Compilers",
        body: "GCC (g++) — most common on Linux; Clang (clang++) — default on macOS; MSVC — Microsoft's, bundled with Visual Studio on Windows. All produce fast, correct code.",
      },
      {
        type: "code",
        heading: "Compiling & Running",
        body: "Once installed, compile and run with:",
        code: `# Compile your file
g++ myprogram.cpp -o myprogram

# Run on Mac/Linux
./myprogram

# Run on Windows
myprogram.exe

# Always specify a modern standard
g++ -std=c++17 myprogram.cpp -o myprogram`,
        language: "bash",
      },
      {
        type: "tip",
        body: "Use this platform (the code playground) to write and run C++ right in your browser — no installation needed while you're learning!",
      },
    ],
    codeExamples: [
      {
        title: "Test Your Installation",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "C++ is installed and working!" << endl;
    cout << "You're ready to start coding." << endl;
    return 0;
}`,
        explanation: "Copy this into your editor, compile, and run it. If you see the output, your installation is working correctly.",
        runnable: true,
      },
    ],
    keyPoints: [
      "On Windows: Visual Studio Community (easiest) or VS Code + MinGW-w64",
      "On macOS: run 'xcode-select --install' to get Clang",
      "Three main compilers: GCC (g++), Clang (clang++), MSVC",
      "Always use -std=c++17 flag for modern C++ features",
      "You can practice C++ right in this browser without installing anything",
    ],
  },
  {
    id: "cpp-syntax",
    order: 6,
    title: "C++ Syntax Basics",
    description: "Master the skeleton of every C++ program: includes, main(), cout, variables, comments, and the rules that hold it all together.",
    difficulty: "beginner",
    estimatedMinutes: 20,
    topics: ["main function", "cout", "variables", "comments", "semicolons", "namespaces"],
    prevLessonId: "installing-cpp",
    nextLessonId: "data-types",
    content: [
      {
        type: "text",
        heading: "The Skeleton of Every C++ Program",
        body: "Every C++ program needs exactly one main() function — that's where the program starts running. #include lines pull in code other people already wrote so you don't have to write everything from scratch.",
      },
      {
        type: "code",
        heading: "The Minimum C++ Program",
        body: "Here is the smallest valid C++ program:",
        code: `#include <iostream>    // gives us access to cin/cout
using namespace std;  // so we can write "cout" instead of "std::cout"

int main() {
    cout << "Hello, World!" << endl;
    return 0;   // tells the OS the program finished OK
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Curly Braces & Semicolons",
        body: "Unlike Python, C++ uses { } to group blocks of code, and every statement ends with a semicolon ;. Indentation is just for humans to read — the compiler doesn't care about it.",
      },
      {
        type: "warning",
        heading: "The #1 Beginner Error",
        body: "Forgetting a semicolon at the end of a statement is the most common compile error for beginners. Every statement needs one. The compiler needs an explicit symbol to know 'this statement has ended'.",
      },
      {
        type: "text",
        heading: "Comments",
        body: "Comments are ignored by the compiler — they're for humans. Use them to explain your code.",
      },
      {
        type: "code",
        heading: "Types of Comments",
        body: "C++ supports two types of comments:",
        code: `// This is a single-line comment

/* This is a
   multi-line comment
   spanning several lines */

int main() {
    int x = 5;   // You can comment at the end of a line too
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Declaring Variables",
        body: "Unlike Python, you MUST state the type when creating a variable. The type tells the compiler how much memory to reserve and what operations are legal.",
      },
      {
        type: "code",
        heading: "Variable Declarations",
        body: "Each variable needs a type, a name, and optionally an initial value:",
        code: `int age = 21;          // whole number
double price = 9.99;   // decimal number
char grade = 'A';      // single character (use single quotes)
bool isStudent = true; // true or false`,
        language: "cpp",
      },
      {
        type: "tip",
        heading: "Naming Rules",
        body: "Variable names in C++ use camelCase (likeThis), can't start with a number, and can't be reserved words like int, class, or return. Class names use PascalCase (LikeThis).",
      },
    ],
    codeExamples: [
      {
        title: "Interactive Hello World",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    
    cout << "Enter your name: ";
    cin >> name;
    
    cout << "Hello, " << name << "!" << endl;
    cout << "Welcome to C++ programming." << endl;
    
    return 0;
}`,
        explanation: "Try changing 'name' to your own name. Notice how << chains multiple things to output in one cout statement.",
        runnable: true,
      },
      {
        title: "Multiple Variable Types",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare variables of different types
    int year = 2024;
    double pi = 3.14159;
    char letter = 'C';
    bool isFun = true;
    string language = "C++";
    
    // Output them all
    cout << "Year: " << year << endl;
    cout << "Pi: " << pi << endl;
    cout << "Letter: " << letter << endl;
    cout << "Is programming fun? " << isFun << endl;
    cout << "Language: " << language << endl;
    
    return 0;
}`,
        explanation: "This example shows all five basic variable types. Notice bool outputs 1 (true) or 0 (false) by default.",
        runnable: true,
      },
    ],
    keyPoints: [
      "Every C++ program needs exactly one main() function",
      "#include pulls in external code (like iostream for cout/cin)",
      "Every statement ends with a semicolon ;",
      "Curly braces {} define code blocks",
      "Variables must declare their type before use",
      "Naming: variables use camelCase, classes use PascalCase, constants use ALL_CAPS",
    ],
  },
  {
    id: "data-types",
    order: 7,
    title: "C++ Data Types",
    description: "Understand every built-in data type in C++, how much memory each uses, and when to choose one over another.",
    difficulty: "beginner",
    estimatedMinutes: 20,
    topics: ["int", "double", "char", "bool", "string", "array", "vector", "void"],
    prevLessonId: "cpp-syntax",
    nextLessonId: "operators",
    content: [
      {
        type: "text",
        body: "Because C++ is statically typed, the type you choose decides exactly how much memory is reserved and what operations are legal. This is stricter than Python's flexible types, but gives you precise control.",
      },
      {
        type: "text",
        heading: "Integer Types",
        body: "int stores whole numbers (-2,147,483,648 to 2,147,483,647) using 4 bytes. Use int for counting, indexing, and whole-number math. Use long long when you need larger numbers.",
      },
      {
        type: "code",
        heading: "Integer Variants",
        body: "C++ offers several integer sizes:",
        code: `short x = 32767;        // 2 bytes: -32,768 to 32,767
int y = 2147483647;     // 4 bytes: ~±2 billion
long z = 2147483647;    // 4 or 8 bytes
long long big = 9223372036854775807LL; // 8 bytes: very large numbers
unsigned int positive = 4294967295; // 4 bytes, only positive`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Floating Point Types",
        body: "float uses 4 bytes (7 decimal digits of precision). double uses 8 bytes (15 decimal digits of precision). Almost always prefer double — it's the default choice for decimal math.",
      },
      {
        type: "text",
        heading: "char — Single Character",
        body: "char stores a single character using 1 byte. Characters are wrapped in single quotes: 'A'. Behind the scenes, char stores the ASCII code of the character.",
      },
      {
        type: "text",
        heading: "bool — True/False",
        body: "bool stores either true or false using 1 byte. Perfect for yes/no decisions, flags, and conditions.",
      },
      {
        type: "text",
        heading: "string — Text",
        body: "std::string stores text of variable length. Requires #include <string>. Use double quotes: \"Hello\".",
      },
      {
        type: "text",
        heading: "array — Fixed-Size Collection",
        body: "An array stores a fixed number of elements of the same type. Size must be known at compile time and cannot change.",
      },
      {
        type: "text",
        heading: "vector — Resizable Collection",
        body: "std::vector is the STL's safer, resizable alternative to arrays. It manages its own memory. Use vector instead of raw arrays whenever possible.",
      },
      {
        type: "tip",
        heading: "Choosing the Right Type",
        body: "Need decimals? Default to double (more precise than float). Need a growable list? Use vector instead of a raw array. Need a single yes/no? Use bool. Need text? Use string.",
      },
    ],
    codeExamples: [
      {
        title: "Exploring Data Types",
        code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // Integer types
    int count = 42;
    long long bigNumber = 9999999999LL;
    
    // Floating point
    float approx = 3.14f;     // 'f' suffix for float literal
    double precise = 3.14159265358979;
    
    // Character and boolean
    char initial = 'J';
    bool isOpen = true;
    
    // String (text)
    string message = "Hello, C++!";
    
    // Array (fixed size)
    int scores[5] = {95, 87, 92, 78, 90};
    
    // Vector (dynamic size)
    vector<int> grades = {90, 85, 92};
    grades.push_back(88);  // add more elements later!
    
    cout << "count: " << count << endl;
    cout << "bigNumber: " << bigNumber << endl;
    cout << "precise pi: " << precise << endl;
    cout << "initial: " << initial << endl;
    cout << "isOpen: " << isOpen << endl;
    cout << "message: " << message << endl;
    cout << "first score: " << scores[0] << endl;
    cout << "grades size: " << grades.size() << endl;
    
    return 0;
}`,
        explanation: "This demonstrates all major types. Notice float needs an 'f' suffix, vector can grow with push_back(), and arrays use zero-based indexing.",
        runnable: true,
      },
      {
        title: "Type Sizes",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Size of char:      " << sizeof(char)      << " byte(s)" << endl;
    cout << "Size of bool:      " << sizeof(bool)      << " byte(s)" << endl;
    cout << "Size of int:       " << sizeof(int)       << " byte(s)" << endl;
    cout << "Size of float:     " << sizeof(float)     << " byte(s)" << endl;
    cout << "Size of double:    " << sizeof(double)    << " byte(s)" << endl;
    cout << "Size of long long: " << sizeof(long long) << " byte(s)" << endl;
    return 0;
}`,
        explanation: "sizeof() tells you how many bytes a type uses. Run this to see the actual sizes on this machine.",
        runnable: true,
      },
    ],
    keyPoints: [
      "int (4 bytes) for whole numbers, long long for very large integers",
      "double (8 bytes) is the default choice for decimal numbers — more precise than float",
      "char stores a single character; string stores text",
      "bool stores true or false",
      "Use vector instead of raw arrays — it's resizable and safer",
      "sizeof() operator tells you how many bytes any type uses",
    ],
  },
  {
    id: "operators",
    order: 8,
    title: "C++ Operators",
    description: "Master arithmetic, comparison, logical, and assignment operators — including the famous integer division gotcha.",
    difficulty: "beginner",
    estimatedMinutes: 18,
    topics: ["arithmetic", "comparison", "logical", "assignment", "modulus", "increment"],
    prevLessonId: "data-types",
    nextLessonId: "loops",
    content: [
      {
        type: "text",
        heading: "Arithmetic Operators",
        body: "The standard math operations: + (add), - (subtract), * (multiply), / (divide), % (modulus/remainder).",
      },
      {
        type: "warning",
        heading: "Integer Division Gotcha!",
        body: "Dividing two ints always gives an int back — 7 / 2 gives 3, not 3.5! The decimal is truncated. Make at least one side a double if you need a decimal result: 7.0 / 2 gives 3.5.",
      },
      {
        type: "text",
        heading: "Increment and Decrement",
        body: "++ adds 1 to a variable (x++ is the same as x = x + 1). -- subtracts 1. These are used constantly in loops.",
      },
      {
        type: "text",
        heading: "Comparison Operators",
        body: "These compare two values and return a bool (true/false). == (equal to), != (not equal), > (greater than), < (less than), >= (greater or equal), <= (less or equal).",
      },
      {
        type: "warning",
        heading: "== vs =",
        body: "= assigns a value. == compares for equality. Writing if (x = 5) instead of if (x == 5) is a common bug that assigns 5 to x instead of comparing.",
      },
      {
        type: "text",
        heading: "Logical Operators",
        body: "&& means AND (both sides must be true), || means OR (at least one side must be true), ! means NOT (flips true to false).",
      },
      {
        type: "text",
        heading: "Assignment Operators",
        body: "Shortcuts: x += 5 means x = x + 5. Similarly x -= 5, x *= 2, x /= 3, x %= 4. These are concise and widely used.",
      },
      {
        type: "tip",
        heading: "Bitwise Operators",
        body: "C++ also has bitwise operators (& | ^ ~ << >>) that work directly on the binary bits of a number. These are used in embedded programming and are not needed for everyday beginner code.",
      },
    ],
    codeExamples: [
      {
        title: "Arithmetic Operators in Action",
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    
    cout << "a + b = " << (a + b) << endl;  // 22
    cout << "a - b = " << (a - b) << endl;  // 12
    cout << "a * b = " << (a * b) << endl;  // 85
    cout << "a / b = " << (a / b) << endl;  // 3 (integer division!)
    cout << "a % b = " << (a % b) << endl;  // 2 (remainder)
    
    // Fix integer division with a cast or decimal literal
    cout << "a / b (double) = " << (double)a / b << endl; // 3.4
    
    // Increment/Decrement
    int x = 10;
    x++;     // x is now 11
    cout << "After x++: " << x << endl;
    x--;     // x is now 10
    cout << "After x--: " << x << endl;
    
    return 0;
}`,
        explanation: "Notice that 17/5 = 3, not 3.4! Integer division truncates toward zero. Casting to double first fixes this.",
        runnable: true,
      },
      {
        title: "Comparison and Logical Operators",
        code: `#include <iostream>
using namespace std;

int main() {
    int age = 20;
    bool hasLicense = true;
    
    // Comparison operators return bool
    cout << "age == 20: " << (age == 20) << endl;   // 1 (true)
    cout << "age != 20: " << (age != 20) << endl;   // 0 (false)
    cout << "age > 18:  " << (age > 18)  << endl;   // 1 (true)
    
    // Logical operators combine conditions
    bool canDrive = (age >= 16) && hasLicense;
    bool isTeenOrChild = (age < 13) || (age >= 13 && age < 20);
    
    cout << "Can drive: " << canDrive << endl;
    cout << "Is teen or child: " << isTeenOrChild << endl;
    cout << "Is NOT an adult: " << !(age >= 18) << endl;
    
    return 0;
}`,
        explanation: "bool values print as 1 (true) or 0 (false). The && and || operators short-circuit — if the first part determines the result, the second part is skipped.",
        runnable: true,
      },
    ],
    keyPoints: [
      "Integer division truncates: 7 / 2 = 3, not 3.5",
      "Use (double)a / b or a / 2.0 to get decimal division",
      "== is comparison, = is assignment — never confuse them",
      "++ increments by 1, -- decrements by 1",
      "&& is AND, || is OR, ! is NOT",
      "x += 5 is shorthand for x = x + 5",
    ],
  },
  {
    id: "loops",
    order: 9,
    title: "Loops in C++",
    description: "Learn for, while, and do-while loops — when to use each, how they work, and how to avoid infinite loops.",
    difficulty: "beginner",
    estimatedMinutes: 22,
    topics: ["for loop", "while loop", "do-while", "break", "continue", "nested loops"],
    prevLessonId: "operators",
    nextLessonId: "functions",
    content: [
      {
        type: "text",
        body: "A loop repeats a block of code. Use one the moment you catch yourself thinking 'I need to do this same thing many times'.",
      },
      {
        type: "text",
        heading: "for Loop — When You Know How Many Times",
        body: "The for loop has three parts: initialization; condition; what happens after each iteration. It's perfect when you know the exact count upfront.",
      },
      {
        type: "code",
        heading: "for Loop Syntax",
        body: "The classic for loop:",
        code: `for (int i = 0; i < 5; i++) {
    cout << i << endl;   // prints 0, 1, 2, 3, 4
}
// Part 1: int i = 0    → start condition
// Part 2: i < 5        → continue as long as this is true
// Part 3: i++          → what happens after each iteration`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "while Loop — When You Don't Know How Many Times",
        body: "The while loop checks its condition BEFORE each iteration. If the condition is false from the start, the loop body never runs.",
      },
      {
        type: "code",
        heading: "while Loop Syntax",
        body: "Use while when the number of iterations depends on user input or runtime data:",
        code: `int count = 0;
while (count < 3) {
    cout << "counting: " << count << endl;
    count++;   // Don't forget this! Omitting it causes an infinite loop.
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "do-while Loop — Runs At Least Once",
        body: "The do-while loop runs the body FIRST, then checks the condition. This guarantees the body executes at least once — perfect for menus and input validation.",
      },
      {
        type: "code",
        heading: "do-while Syntax",
        body: "Perfect for menu-driven programs:",
        code: `int choice;
do {
    cout << "Enter 1 to continue, 0 to stop: ";
    cin >> choice;
} while (choice != 0);`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "break and continue",
        body: "break exits the loop immediately. continue skips the rest of the current iteration and goes to the next one.",
      },
      {
        type: "warning",
        heading: "Infinite Loops",
        body: "If your loop's condition never becomes false, it runs forever. Always ensure the loop variable changes in a way that eventually makes the condition false.",
      },
      {
        type: "tip",
        heading: "Which Loop to Use?",
        body: "Know the exact count or looping over an array → for. Looping until a condition changes → while. Need the body to run at least once (like a menu) → do-while.",
      },
    ],
    codeExamples: [
      {
        title: "Multiplication Table with Nested Loops",
        code: `#include <iostream>
using namespace std;

int main() {
    // Nested for loops
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            cout << i * j << "\t";   // \t is a tab character
        }
        cout << endl;
    }
    return 0;
}`,
        explanation: "The outer loop controls the row, the inner loop controls the column. Each pair (i,j) prints their product. This shows how loops combine for 2D problems.",
        runnable: true,
      },
      {
        title: "Finding Prime Numbers",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Prime numbers from 2 to 50: ";
    
    for (int num = 2; num <= 50; num++) {
        bool isPrime = true;
        
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;   // No need to check further
            }
        }
        
        if (isPrime) {
            cout << num << " ";
        }
    }
    cout << endl;
    return 0;
}`,
        explanation: "This uses break to exit the inner loop early once a factor is found. Notice i * i <= num — we only need to check up to the square root.",
        runnable: true,
      },
      {
        title: "User Input with while Loop",
        code: `#include <iostream>
using namespace std;

int main() {
    int number;
    int sum = 0;
    int count = 0;
    
    cout << "Enter numbers (0 to stop):" << endl;
    
    cin >> number;
    while (number != 0) {
        sum += number;
        count++;
        cin >> number;
    }
    
    if (count > 0) {
        cout << "Sum: " << sum << endl;
        cout << "Average: " << (double)sum / count << endl;
    } else {
        cout << "No numbers entered." << endl;
    }
    
    return 0;
}`,
        explanation: "This demonstrates a real-world while loop: keep reading until the user enters 0. The count tracks how many numbers were entered for the average calculation.",
        runnable: true,
      },
    ],
    keyPoints: [
      "for loop: use when you know the count (init; condition; increment)",
      "while loop: use when count depends on a runtime condition",
      "do-while: body runs at least once before condition is checked",
      "break exits the loop immediately",
      "continue skips to the next iteration",
      "Always ensure the loop variable changes to avoid infinite loops",
    ],
  },
  {
    id: "functions",
    order: 10,
    title: "Functions in C++",
    description: "Write reusable blocks of code with functions — return types, parameters, pass by value vs reference, and why functions matter.",
    difficulty: "beginner",
    estimatedMinutes: 25,
    topics: ["function declaration", "return types", "parameters", "pass by value", "pass by reference", "overloading"],
    prevLessonId: "loops",
    nextLessonId: "input-output",
    content: [
      {
        type: "text",
        body: "A function is a named, reusable block of code. In C++ you must state the type it returns AND the type of every parameter — the compiler checks these everywhere the function is used.",
      },
      {
        type: "text",
        heading: "Function Anatomy",
        body: "A C++ function has: a return type, a name, parameters (with types), and a body. The return type void means the function returns nothing.",
      },
      {
        type: "code",
        heading: "Basic Function Syntax",
        body: "Here is the structure of a C++ function:",
        code: `// return_type function_name(param_type param_name, ...) {
//     body
//     return value;
// }

int add(int a, int b) {   // "int" = return type
    return a + b;
}

void greet(string name) { // "void" = returns nothing
    cout << "Hello, " << name << "!" << endl;
    // no return statement needed
}

int main() {
    int result = add(3, 4);  // calling the function
    cout << result << endl;  // outputs 7
    greet("Alice");          // outputs: Hello, Alice!
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Pass by Value",
        body: "By default, C++ copies the value you pass in. Changes inside the function do NOT affect the original variable. Safe but can be slow for large objects.",
      },
      {
        type: "text",
        heading: "Pass by Reference",
        body: "Adding & before the parameter name passes the REAL variable, not a copy. Changes inside the function DO affect the original. This is faster for large objects and lets you modify the caller's variables.",
      },
      {
        type: "code",
        heading: "Pass by Value vs Reference",
        body: "The difference between these two is crucial:",
        code: `void addOneValue(int x) {
    x = x + 1;       // only changes the local copy
}

void addOneRef(int& x) {  // & makes it a reference
    x = x + 1;       // changes the original variable!
}

int main() {
    int num = 5;
    
    addOneValue(num);
    cout << num << endl;  // still 5 — original unchanged
    
    addOneRef(num);
    cout << num << endl;  // now 6 — original changed!
    
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Function Overloading",
        body: "C++ lets you define multiple functions with the same name but different parameter types. The compiler picks the right one based on what arguments you pass.",
      },
      {
        type: "tip",
        heading: "Why Use Functions?",
        body: "Functions prevent repetition (fix a bug once, not in ten places), break big problems into small testable pieces, make code readable, and enable recursion.",
      },
      {
        type: "text",
        heading: "Function Prototypes",
        body: "If you call a function before defining it, you need a prototype (declaration) at the top. The prototype tells the compiler what to expect without the full body.",
      },
    ],
    codeExamples: [
      {
        title: "Calculator with Functions",
        code: `#include <iostream>
using namespace std;

double add(double a, double b)      { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b)   {
    if (b == 0) {
        cout << "Error: Division by zero!" << endl;
        return 0;
    }
    return a / b;
}

int main() {
    double x = 10.0, y = 3.0;
    
    cout << x << " + " << y << " = " << add(x, y)      << endl;
    cout << x << " - " << y << " = " << subtract(x, y) << endl;
    cout << x << " * " << y << " = " << multiply(x, y) << endl;
    cout << x << " / " << y << " = " << divide(x, y)   << endl;
    
    return 0;
}`,
        explanation: "Breaking the calculator into separate functions makes each operation easy to test and modify independently. Notice the divide function handles the edge case of dividing by zero.",
        runnable: true,
      },
      {
        title: "Recursive Function — Factorial",
        code: `#include <iostream>
using namespace std;

long long factorial(int n) {
    if (n <= 1) return 1;   // base case
    return n * factorial(n - 1); // recursive call
}

int main() {
    for (int i = 0; i <= 10; i++) {
        cout << i << "! = " << factorial(i) << endl;
    }
    return 0;
}`,
        explanation: "A recursive function calls itself. Every recursive function needs a base case (stopping condition) or it will recurse forever. Factorial of n = n × factorial(n-1).",
        runnable: true,
      },
    ],
    keyPoints: [
      "Functions have: return type, name, parameters with types, and body",
      "void return type means the function returns nothing",
      "Pass by value copies the argument — original is unchanged",
      "Pass by reference (int& x) modifies the original variable",
      "Function overloading: same name, different parameter types",
      "Recursive functions must have a base case to avoid infinite recursion",
    ],
  },
  {
    id: "input-output",
    order: 11,
    title: "Input and Output in C++",
    description: "Master cin and cout for reading and writing data — including handling spaces, formatting output, and common pitfalls.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    topics: ["cout", "cin", "endl", "getline", "formatting", "stream operators"],
    prevLessonId: "functions",
    nextLessonId: "pointers-memory",
    content: [
      {
        type: "text",
        body: "cout sends output TO the screen. cin reads input FROM the keyboard. Both live in <iostream> and use the std namespace.",
      },
      {
        type: "text",
        heading: "Output — cout",
        body: "The << symbol is called the insertion operator — think of it as 'insert this into the output stream'. You can chain multiple << operators in one statement.",
      },
      {
        type: "code",
        heading: "cout Examples",
        body: "Various ways to use cout:",
        code: `#include <iostream>
using namespace std;

int main() {
    // Basic output
    cout << "Hello, World!" << endl;
    
    // Output variables
    int score = 95;
    cout << "Score: " << score << endl;
    
    // Chaining multiple items
    string name = "Alice";
    int age = 21;
    cout << name << " is " << age << " years old." << endl;
    
    // endl vs \\n
    cout << "Line 1" << endl;  // endl flushes the buffer too
    cout << "Line 2\\n";       // \\n is faster (no flush)
    
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Input — cin",
        body: "The >> operator reads from the keyboard. Because C++ is statically typed, cin automatically converts the typed text into whatever type your variable already is — you don't need manual int() conversion like in Python.",
      },
      {
        type: "code",
        heading: "cin Examples",
        body: "Reading different types of input:",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    double salary;
    string firstName;
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Enter your salary: ";
    cin >> salary;
    
    cout << "Enter your first name: ";
    cin >> firstName;
    
    cout << firstName << " is " << age << " years old." << endl;
    cout << "Annual salary: $" << salary << endl;
    
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "warning",
        heading: "cin and Spaces",
        body: "Plain cin >> stops reading at the first space. So 'John Smith' would only read 'John'. Use getline(cin, variable) to read a full line including spaces.",
      },
      {
        type: "code",
        heading: "Reading Full Lines with getline",
        body: "When you need spaces in input:",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string fullName;
    string address;
    
    cout << "Enter your full name: ";
    getline(cin, fullName);  // reads the whole line including spaces
    
    cout << "Enter your address: ";
    getline(cin, address);
    
    cout << "Name: " << fullName << endl;
    cout << "Address: " << address << endl;
    
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "tip",
        heading: "Output Formatting",
        body: "Use #include <iomanip> for setw(), setprecision(), fixed, and left/right to format numbers and text in tables.",
      },
    ],
    codeExamples: [
      {
        title: "Formatted Output Table",
        code: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    // Table header
    cout << left << setw(15) << "Product" 
         << right << setw(10) << "Price" 
         << setw(8) << "Qty" << endl;
    cout << string(33, '-') << endl;
    
    // Table rows with fixed decimal places
    cout << fixed << setprecision(2);
    cout << left << setw(15) << "Apple"  << right << setw(10) << 0.99  << setw(8) << 50 << endl;
    cout << left << setw(15) << "Banana" << right << setw(10) << 0.50  << setw(8) << 120 << endl;
    cout << left << setw(15) << "Cherry" << right << setw(10) << 2.99  << setw(8) << 30 << endl;
    
    return 0;
}`,
        explanation: "setw() sets column width, left/right aligns text, fixed+setprecision() controls decimal places. These come from #include <iomanip>.",
        runnable: true,
      },
    ],
    keyPoints: [
      "cout << outputs data; cin >> reads data",
      "<< is the insertion operator (output), >> is the extraction operator (input)",
      "cin >> stops at whitespace — use getline(cin, str) for full lines",
      "endl outputs a newline AND flushes the buffer; \\n is faster",
      "#include <iomanip> for formatted output (setw, setprecision, etc.)",
      "cin automatically converts input to the variable's type",
    ],
  },
  {
    id: "pointers-memory",
    order: 12,
    title: "Pointers, References & Memory",
    description: "Master the concept that makes C++ unique — pointers, references, the heap vs stack, and manual memory management.",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    topics: ["pointers", "references", "new", "delete", "heap", "stack", "memory leaks", "nullptr"],
    prevLessonId: "input-output",
    nextLessonId: "oop",
    content: [
      {
        type: "text",
        body: "This is the concept that makes C++ different from most beginner-friendly languages: you can see and control the actual memory address where a value lives.",
      },
      {
        type: "text",
        heading: "What is a Pointer?",
        body: "A pointer stores the memory address of another variable — not the value itself, but WHERE the value lives in memory. Think of memory as a giant array of numbered slots (addresses). A pointer holds one of those slot numbers.",
      },
      {
        type: "code",
        heading: "Pointer Basics",
        body: "The & operator gets an address, the * operator accesses the value at an address:",
        code: `int age = 21;
int* p = &age;   // p stores the address of age
                 // (e.g., 0x7ffd1234)

cout << age;     // 21 — the value
cout << &age;    // 0x7ffd1234 — the address of age
cout << p;       // 0x7ffd1234 — same address (p holds it)
cout << *p;      // 21 — value AT the address (*p dereferences)

*p = 22;         // changes age THROUGH the pointer!
cout << age;     // 22 — age changed!`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "References — Safer Aliases",
        body: "A reference is a safer, simpler alternative to a pointer. It's just another name for the same variable. You can't reassign a reference or have a null reference.",
      },
      {
        type: "code",
        heading: "References vs Pointers",
        body: "References are simpler — no & or * needed when using them:",
        code: `int age = 21;
int& ref = age;  // ref is just another name for age

ref = 22;        // this changes age!
cout << age;     // 22

// vs. pointer syntax (more verbose):
int* ptr = &age;
*ptr = 23;       // need * to access value
cout << age;     // 23`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Stack vs Heap",
        body: "Stack memory is automatically managed — local variables live here and are freed when the function returns. Heap memory is manually managed with new and delete — it persists until you explicitly free it.",
      },
      {
        type: "code",
        heading: "Dynamic Memory — new and delete",
        body: "Use new to allocate on the heap, delete to free it:",
        code: `// Single value on the heap
int* ptr = new int(42);
cout << *ptr << endl;  // 42
delete ptr;            // MUST free when done!
ptr = nullptr;         // Good practice: set to nullptr after delete

// Array on the heap
int* arr = new int[5];  // allocate 5 ints
arr[0] = 10;
arr[1] = 20;
// ... use it ...
delete[] arr;  // use delete[] for arrays (not just delete)
arr = nullptr;`,
        language: "cpp",
      },
      {
        type: "warning",
        heading: "Memory Leaks & Dangling Pointers",
        body: "Forgetting to delete heap memory causes a memory leak — the memory is never freed. Using a pointer after its memory was freed causes a crash ('dangling pointer'). Always pair every new with a delete.",
      },
      {
        type: "tip",
        heading: "Modern C++: Smart Pointers",
        body: "Modern C++ encourages unique_ptr and shared_ptr ('smart pointers') that automatically call delete when they go out of scope. These eliminate memory leaks without sacrificing performance.",
      },
    ],
    codeExamples: [
      {
        title: "Pointers — Seeing Memory Addresses",
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 100;
    int y = 200;
    
    int* ptr = &x;   // ptr points to x
    
    cout << "x = " << x << endl;
    cout << "Address of x: " << &x << endl;
    cout << "ptr (holds address): " << ptr << endl;
    cout << "*ptr (value at address): " << *ptr << endl;
    
    // Change x through the pointer
    *ptr = 999;
    cout << "After *ptr = 999, x = " << x << endl;
    
    // Redirect pointer to y
    ptr = &y;
    cout << "Now *ptr = " << *ptr << endl;
    
    return 0;
}`,
        explanation: "Run this to see actual memory addresses! The address of x and the value stored in ptr are the same. Changing *ptr changes x directly.",
        runnable: true,
      },
      {
        title: "Dynamic Memory — Student Array",
        code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "How many students? ";
    cin >> n;
    
    // Allocate array of size n on the heap
    // (can't do int scores[n] with variable n!)
    int* scores = new int[n];
    
    for (int i = 0; i < n; i++) {
        cout << "Enter score " << (i + 1) << ": ";
        cin >> scores[i];
    }
    
    // Calculate average
    double sum = 0;
    for (int i = 0; i < n; i++) {
        sum += scores[i];
    }
    
    cout << "Average: " << sum / n << endl;
    
    // MUST free heap memory
    delete[] scores;
    scores = nullptr;
    
    return 0;
}`,
        explanation: "Dynamic allocation lets you create arrays whose size is determined at runtime. Notice delete[] (with brackets) is used for arrays.",
        runnable: true,
      },
    ],
    keyPoints: [
      "A pointer stores a memory address, not a value — use * to access the value",
      "& gets the address of a variable: int* p = &x",
      "* dereferences a pointer (accesses the value it points to): *p = 5",
      "References (int& r = x) are safer aliases — no * needed to use them",
      "Stack: automatic, fast, limited size. Heap: manual, larger, persistent",
      "Every new must be paired with delete; new[] with delete[]",
      "Set pointers to nullptr after deleting to avoid dangling pointer bugs",
    ],
  },
  {
    id: "oop",
    order: 13,
    title: "Classes & Object-Oriented Programming",
    description: "Learn OOP fundamentals — classes, objects, constructors, encapsulation, inheritance, and polymorphism.",
    difficulty: "intermediate",
    estimatedMinutes: 40,
    topics: ["class", "object", "constructor", "destructor", "encapsulation", "inheritance", "polymorphism", "public", "private"],
    prevLessonId: "pointers-memory",
    nextLessonId: "dependencies-building",
    content: [
      {
        type: "text",
        body: "A class is a blueprint for creating objects that bundle together data (attributes) and behaviour (methods) — the core idea behind Object-Oriented Programming.",
      },
      {
        type: "text",
        heading: "Your First Class",
        body: "A class defines WHAT an object looks like and CAN DO. An object is a specific instance created from that blueprint.",
      },
      {
        type: "code",
        heading: "Defining a Class",
        body: "Here is a simple Dog class:",
        code: `class Dog {
public:
    string name;   // attribute (data)
    int age;
    
    void bark() { // method (behaviour)
        cout << name << " says: Woof!" << endl;
    }
};

int main() {
    Dog myDog;          // create an object from the class
    myDog.name = "Rex";
    myDog.age = 3;
    myDog.bark();       // "Rex says: Woof!"
    
    Dog anotherDog;
    anotherDog.name = "Buddy";
    anotherDog.bark();  // "Buddy says: Woof!"
    
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Constructors",
        body: "A constructor runs automatically when an object is created. It initializes the object's attributes. The constructor has the same name as the class and no return type.",
      },
      {
        type: "text",
        heading: "Encapsulation — public vs private",
        body: "Marking data private hides it from outside code, forcing people to go through your methods (getters/setters) to use it safely. This protects data from misuse and is a key OOP principle.",
      },
      {
        type: "code",
        heading: "Encapsulation with Getters/Setters",
        body: "Private data with controlled access:",
        code: `class BankAccount {
private:
    double balance;    // hidden from outside code
    string owner;

public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
    
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    bool withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;  // insufficient funds
    }
    
    double getBalance() { return balance; }
    string getOwner()   { return owner; }
};`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Inheritance",
        body: "A derived class inherits all public/protected members of its base class and can add new ones or override existing ones. This promotes code reuse.",
      },
      {
        type: "code",
        heading: "Inheritance Example",
        body: "Animal base class with Dog and Cat derived classes:",
        code: `class Animal {
public:
    string name;
    Animal(string n) : name(n) {}
    
    virtual void makeSound() {    // virtual = can be overridden
        cout << name << " makes a sound." << endl;
    }
};

class Dog : public Animal {       // Dog inherits Animal
public:
    Dog(string n) : Animal(n) {}  // pass name to base constructor
    
    void makeSound() override {   // override base version
        cout << name << " says: Woof!" << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    
    void makeSound() override {
        cout << name << " says: Meow!" << endl;
    }
};`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Polymorphism",
        body: "Polymorphism means 'many forms'. A pointer to a base class can hold objects of any derived class. When you call a virtual method, the correct derived version runs — even through a base pointer.",
      },
      {
        type: "tip",
        heading: "Why OOP?",
        body: "Classes let you model real-world things (Dog, BankAccount, Player) as one neat package instead of scattering loose variables and functions everywhere. Inheritance enables code reuse. Polymorphism enables flexible, extensible designs.",
      },
    ],
    codeExamples: [
      {
        title: "Complete BankAccount Class",
        code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial = 0.0)
        : owner(name), balance(initial) {}
    
    void deposit(double amount) {
        if (amount <= 0) { cout << "Invalid deposit." << endl; return; }
        balance += amount;
        cout << "Deposited $" << amount << ". Balance: $" << balance << endl;
    }
    
    bool withdraw(double amount) {
        if (amount <= 0) { cout << "Invalid amount." << endl; return false; }
        if (amount > balance) { cout << "Insufficient funds." << endl; return false; }
        balance -= amount;
        cout << "Withdrew $" << amount << ". Balance: $" << balance << endl;
        return true;
    }
    
    void printStatement() {
        cout << "Account: " << owner << " | Balance: $" << balance << endl;
    }
};

int main() {
    BankAccount account("Alice", 1000.0);
    account.printStatement();
    account.deposit(500.0);
    account.withdraw(200.0);
    account.withdraw(2000.0);  // insufficient funds
    account.printStatement();
    return 0;
}`,
        explanation: "Notice how private data (balance) can only be changed through the public methods. This prevents code outside the class from directly setting a negative balance.",
        runnable: true,
      },
      {
        title: "Polymorphism with Animal Classes",
        code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Animal {
public:
    string name;
    Animal(string n) : name(n) {}
    virtual void makeSound() = 0;  // pure virtual = must override
    virtual ~Animal() {}           // virtual destructor for safety
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void makeSound() override { cout << name << ": Woof! Woof!" << endl; }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    void makeSound() override { cout << name << ": Meow~" << endl; }
};

class Bird : public Animal {
public:
    Bird(string n) : Animal(n) {}
    void makeSound() override { cout << name << ": Tweet! Tweet!" << endl; }
};

int main() {
    vector<Animal*> animals;
    animals.push_back(new Dog("Rex"));
    animals.push_back(new Cat("Whiskers"));
    animals.push_back(new Bird("Tweety"));
    animals.push_back(new Dog("Max"));
    
    // Polymorphism: same call, different behavior
    for (Animal* a : animals) {
        a->makeSound();
    }
    
    for (Animal* a : animals) delete a;
    return 0;
}`,
        explanation: "The loop calls makeSound() on a base Animal* pointer, but each object runs its own version. This is polymorphism — same interface, different implementations.",
        runnable: true,
      },
    ],
    keyPoints: [
      "A class is a blueprint; an object is an instance of that blueprint",
      "Constructors initialize an object when it's created",
      "public members are accessible anywhere; private members only within the class",
      "Encapsulation hides data and exposes it only through controlled methods",
      "Inheritance (class Dog : public Animal) reuses and extends existing classes",
      "virtual functions enable polymorphism — the correct override runs through a base pointer",
    ],
  },
  {
    id: "dependencies-building",
    order: 14,
    title: "Dependencies & Building an App",
    description: "Understand header files, static vs dynamic libraries, CMake build systems, and package managers for real C++ projects.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    topics: ["header files", "static library", "dynamic library", "CMake", "vcpkg", "Conan"],
    prevLessonId: "oop",
    nextLessonId: "advantages",
    content: [
      {
        type: "text",
        body: "Bigger C++ projects span multiple files and rely on external libraries. You need a system to organise and build them all together.",
      },
      {
        type: "text",
        heading: "Header Files (.h) vs Source Files (.cpp)",
        body: "A .h header file DECLARES what a function/class looks like (the interface). A .cpp source file DEFINES HOW it actually works (the implementation). Other files just #include the header to use it.",
      },
      {
        type: "code",
        heading: "Header/Source Split",
        body: "Typical header and source file pair:",
        code: `// calculator.h (header — WHAT)
#pragma once   // prevents double-inclusion
class Calculator {
public:
    double add(double a, double b);
    double subtract(double a, double b);
    double divide(double a, double b);
};

// calculator.cpp (source — HOW)
#include "calculator.h"

double Calculator::add(double a, double b)      { return a + b; }
double Calculator::subtract(double a, double b) { return a - b; }
double Calculator::divide(double a, double b)   {
    if (b == 0) return 0;
    return a / b;
}

// main.cpp — USES the calculator
#include "calculator.h"  // only the header, not the cpp!

int main() {
    Calculator calc;
    cout << calc.add(10, 5) << endl;
    return 0;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "Static vs Dynamic Libraries",
        body: "Static libraries (.lib on Windows, .a on Linux) are copied directly into your executable at build time — bigger exe but no extra files needed. Dynamic libraries (.dll on Windows, .so on Linux) are loaded separately when the program runs — smaller exe but the file must be distributed.",
      },
      {
        type: "text",
        heading: "CMake — The Most Common Build System",
        body: "Typing g++ file1.cpp file2.cpp -o app by hand gets painful fast. CMake describes your whole project in a CMakeLists.txt file, then generates the right build commands for any platform.",
      },
      {
        type: "code",
        heading: "A Simple CMakeLists.txt",
        body: "A minimal CMake project:",
        code: `cmake_minimum_required(VERSION 3.16)
project(MyApp)

set(CMAKE_CXX_STANDARD 17)

# Define the executable
add_executable(MyApp
    src/main.cpp
    src/calculator.cpp
)

# Include headers
target_include_directories(MyApp PRIVATE include)`,
        language: "cmake",
      },
      {
        type: "text",
        heading: "Package Managers — vcpkg & Conan",
        body: "vcpkg and Conan are C++'s answer to Python's pip — they download and build external libraries for you instead of hunting for them manually online. vcpkg integrates seamlessly with Visual Studio and CMake.",
      },
      {
        type: "tip",
        body: "For your first C++ projects, keep it simple: single .cpp file with g++. Introduce CMake when you have 3+ source files. Add a package manager when you need external libraries.",
      },
    ],
    codeExamples: [
      {
        title: "Multi-File Project Structure",
        code: `// math_utils.h
#pragma once

// Function declarations (interface)
int factorial(int n);
bool isPrime(int n);
int gcd(int a, int b);`,
        explanation: "The #pragma once directive ensures the header is only included once per compilation unit, preventing duplicate definition errors.",
        runnable: false,
      },
    ],
    keyPoints: [
      ".h files declare (interface), .cpp files define (implementation)",
      "Use #pragma once in headers to prevent double-inclusion",
      "Static libraries (.lib/.a) are copied into the executable at link time",
      "Dynamic libraries (.dll/.so) are loaded at runtime — must be distributed",
      "CMake manages multi-file builds with a CMakeLists.txt file",
      "vcpkg and Conan are package managers for C++ external libraries",
    ],
  },
  {
    id: "advantages",
    order: 15,
    title: "Advantages of C++",
    description: "A balanced look at what makes C++ great — and the trade-offs you should understand before committing to it.",
    difficulty: "beginner",
    estimatedMinutes: 10,
    topics: ["performance", "memory control", "portability", "STL", "trade-offs"],
    prevLessonId: "dependencies-building",
    nextLessonId: "extra-concepts",
    content: [
      {
        type: "text",
        heading: "Why C++ Is Worth Learning",
        body: "C++ offers a unique combination of performance, control, and expressiveness that no other mainstream language matches.",
      },
      {
        type: "text",
        heading: "Extremely Fast",
        body: "Compiled straight to machine code with no interpreter overhead. C++ programs are typically 10-100x faster than equivalent Python programs for compute-intensive tasks.",
      },
      {
        type: "text",
        heading: "Full Control Over Memory",
        body: "Critical for systems with limited resources. You decide exactly when memory is allocated and freed — no garbage collector pauses, no memory overhead.",
      },
      {
        type: "text",
        heading: "Multi-Paradigm",
        body: "Procedural, OOP, and generic (templates) programming are all first-class. You pick whatever style best fits the problem.",
      },
      {
        type: "text",
        heading: "Massive Existing Ecosystem",
        body: "Huge amounts of performance-critical infrastructure software is already written in C++. Gaming, finance, browsers, operating systems — it isn't going anywhere.",
      },
      {
        type: "text",
        heading: "The Trade-offs (Full Picture)",
        body: "No language is perfect. Here's what C++ costs:",
      },
      {
        type: "text",
        heading: "Steeper Learning Curve",
        body: "Pointers, memory management, and manual typing take longer to master than Python's simpler model. Expect to spend more time on setup and debugging initially.",
      },
      {
        type: "text",
        heading: "Slower to Develop In",
        body: "You write more code, and must recompile after every change. The compile-run cycle is slower than Python's instant feedback.",
      },
      {
        type: "text",
        heading: "Memory Bugs",
        body: "Memory leaks and dangling pointers don't exist in memory-managed languages like Python or Java. You must be disciplined about cleanup.",
      },
      {
        type: "tip",
        heading: "Bottom Line",
        body: "C++ trades a gentler learning curve for raw speed and control — which is exactly why it still runs the game engines, operating systems, and trading systems where every millisecond and every byte of memory counts.",
      },
    ],
    codeExamples: [
      {
        title: "Performance Demo — Number Crunching",
        code: `#include <iostream>
#include <chrono>
using namespace std;

int main() {
    const long long LIMIT = 100000000LL;
    
    auto start = chrono::high_resolution_clock::now();
    
    long long sum = 0;
    for (long long i = 1; i <= LIMIT; i++) {
        sum += i;
    }
    
    auto end = chrono::high_resolution_clock::now();
    auto ms = chrono::duration_cast<chrono::milliseconds>(end - start).count();
    
    cout << "Sum of 1 to " << LIMIT << " = " << sum << endl;
    cout << "Time taken: " << ms << " milliseconds" << endl;
    cout << "Expected: " << LIMIT * (LIMIT + 1) / 2 << " (formula check)" << endl;
    
    return 0;
}`,
        explanation: "C++ sums 100 million numbers very quickly. The same code in Python would take 30-50x longer. This performance gap is why C++ dominates in compute-intensive domains.",
        runnable: true,
      },
    ],
    keyPoints: [
      "C++ is typically 10-100x faster than Python for compute-intensive work",
      "Manual memory management = full control, no garbage collector pauses",
      "Multi-paradigm: procedural + OOP + generic programming",
      "Massive ecosystem — games, browsers, OS, finance all depend on C++",
      "Trade-offs: steeper learning curve, slower development cycle, risk of memory bugs",
      "Worth it for: game dev, systems programming, embedded, competitive programming",
    ],
  },
  {
    id: "extra-concepts",
    order: 16,
    title: "Extra Concepts Worth Knowing",
    description: "Round out your C++ knowledge with conditionals, const, structs, compiled vs interpreted comparison, and naming conventions.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    topics: ["if/else", "switch", "const", "struct", "naming conventions", "compiled vs interpreted"],
    prevLessonId: "advantages",
    nextLessonId: null,
    content: [
      {
        type: "text",
        heading: "Conditionals — if / else if / else",
        body: "Conditionals let your program make decisions. C++ uses the same if/else structure as most languages.",
      },
      {
        type: "code",
        heading: "if/else Syntax",
        body: "Branching based on conditions:",
        code: `int age = 18;

if (age < 13) {
    cout << "child" << endl;
} else if (age < 20) {
    cout << "teenager" << endl;
} else {
    cout << "adult" << endl;
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "switch Statement",
        body: "Use switch for multiple specific values. It's cleaner than a long chain of if/else if when testing the same variable against many values.",
      },
      {
        type: "code",
        heading: "switch Syntax",
        body: "Selecting between fixed values:",
        code: `int day = 3;

switch (day) {
    case 1: cout << "Monday";    break;
    case 2: cout << "Tuesday";   break;
    case 3: cout << "Wednesday"; break;
    case 4: cout << "Thursday";  break;
    case 5: cout << "Friday";    break;
    default: cout << "Weekend";  break; // always include default!
}`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "const — Promise Not to Change",
        body: "const makes a variable immutable. Trying to change it later is a compile error. Use it for values that should never change — mathematical constants, fixed settings.",
      },
      {
        type: "code",
        heading: "const Usage",
        body: "Constants prevent accidental changes:",
        code: `const double PI = 3.14159265358979;
const int MAX_STUDENTS = 30;
const string APP_NAME = "My C++ App";

// PI = 3.14;  // ERROR: compile-time error!`,
        language: "cpp",
      },
      {
        type: "text",
        heading: "struct vs class",
        body: "A struct is almost identical to a class — the only difference is that struct members are public by default, while class members are private by default. Structs are used for simple data bundles with no behaviour.",
      },
      {
        type: "text",
        heading: "Naming Conventions",
        body: "C++ has standard naming conventions: variables and functions use camelCase (myVariable, calculateTotal), Classes use PascalCase (BankAccount, StudentRecord), Constants use ALL_CAPS (MAX_SIZE, PI).",
      },
      {
        type: "tip",
        heading: "Where to Go Next",
        body: "Once you're comfortable with everything in this course, dig deeper into: the STL (vectors, maps, algorithms), then inheritance/polymorphism, then smart pointers, then pick ONE mini project (a simple bank account simulator, a tic-tac-toe game, a small library system) and build it start to finish. Keep building!",
      },
    ],
    codeExamples: [
      {
        title: "Grade Calculator with Conditionals",
        code: `#include <iostream>
#include <string>
using namespace std;

string getGrade(int score) {
    if (score >= 90) return "A";
    else if (score >= 80) return "B";
    else if (score >= 70) return "C";
    else if (score >= 60) return "D";
    else return "F";
}

string getFeedback(string grade) {
    switch (grade[0]) {
        case 'A': return "Excellent work!";
        case 'B': return "Good job!";
        case 'C': return "You passed.";
        case 'D': return "Needs improvement.";
        default:  return "Please review the material.";
    }
}

int main() {
    int scores[] = {95, 82, 73, 61, 45};
    int n = sizeof(scores) / sizeof(scores[0]);
    
    for (int i = 0; i < n; i++) {
        string grade = getGrade(scores[i]);
        cout << "Score: " << scores[i] 
             << " | Grade: " << grade 
             << " | " << getFeedback(grade) << endl;
    }
    
    return 0;
}`,
        explanation: "This combines if/else for grading and switch for feedback. Notice sizeof(arr)/sizeof(arr[0]) is the classic way to get an array's length.",
        runnable: true,
      },
    ],
    keyPoints: [
      "if/else if/else for multi-way branching",
      "switch is cleaner than long if/else chains for fixed values",
      "Always include default in switch statements",
      "const makes variables immutable — enforced at compile time",
      "struct = public by default; class = private by default",
      "Naming: camelCase for variables/functions, PascalCase for classes, ALL_CAPS for constants",
    ],
  },
];

export function getLessonById(id: string): LessonData | undefined {
  return lessons.find(l => l.id === id);
}

export function getLessonSummaries() {
  return lessons.map(l => ({
    id: l.id,
    order: l.order,
    title: l.title,
    description: l.description,
    difficulty: l.difficulty,
    estimatedMinutes: l.estimatedMinutes,
    topics: l.topics,
  }));
}
