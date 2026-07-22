export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: "multiple_choice" | "true_false" | "fill_blank" | "predict_output";
  question: string;
  options?: string[] | null;
  correctAnswer: string;
  explanation: string;
  codeSnippet?: string | null;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  "what-is-cpp": [
    {
      id: "wic-1",
      lessonId: "what-is-cpp",
      type: "multiple_choice",
      question: "What does 'compiled' mean in the context of C++?",
      options: [
        "The code is executed line-by-line as it runs",
        "The entire program is translated to machine code before running",
        "The code is compressed to save disk space",
        "Variables are automatically typed at runtime",
      ],
      correctAnswer: "The entire program is translated to machine code before running",
      explanation: "C++ is compiled — the compiler translates your entire source code into machine code (binary) before the program ever runs. This is why C++ is so fast.",
    },
    {
      id: "wic-2",
      lessonId: "what-is-cpp",
      type: "true_false",
      question: "In C++, a variable's type can change after it is declared (e.g., an int can become a string).",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "C++ is statically typed. Once you declare a variable as int, it remains an int forever. This catches type errors at compile time rather than runtime.",
    },
    {
      id: "wic-3",
      lessonId: "what-is-cpp",
      type: "multiple_choice",
      question: "Which feature allows C++ to work directly with memory addresses?",
      options: ["Templates", "Namespaces", "Pointers and references", "The STL"],
      correctAnswer: "Pointers and references",
      explanation: "Pointers and references allow C++ code to work directly with memory addresses, enabling low-level programming essential for operating systems and embedded systems.",
    },
    {
      id: "wic-4",
      lessonId: "what-is-cpp",
      type: "multiple_choice",
      question: "What is the STL in C++?",
      options: [
        "Standard Terminal Library",
        "Static Typing Language",
        "Standard Template Library — ready-made containers and algorithms",
        "System Type Linker",
      ],
      correctAnswer: "Standard Template Library — ready-made containers and algorithms",
      explanation: "The Standard Template Library (STL) provides ready-made containers like vector and map, and algorithms like sort and find, so you don't reinvent basic data structures.",
    },
    {
      id: "wic-5",
      lessonId: "what-is-cpp",
      type: "true_false",
      question: "C++ supports only one programming paradigm: Object-Oriented Programming.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "C++ is multi-paradigm. It supports procedural, object-oriented, AND generic (templates) programming. You choose whatever style fits the problem.",
    },
  ],

  "how-cpp-works": [
    {
      id: "hcw-1",
      lessonId: "how-cpp-works",
      type: "multiple_choice",
      question: "In the C++ build pipeline, what does the preprocessor handle?",
      options: [
        "Type checking and syntax errors",
        "Linking libraries into the executable",
        "#include and #define directives",
        "Running the final program",
      ],
      correctAnswer: "#include and #define directives",
      explanation: "The preprocessor handles lines starting with #, such as copying #include <iostream> contents into your file and expanding #define macros.",
    },
    {
      id: "hcw-2",
      lessonId: "how-cpp-works",
      type: "multiple_choice",
      question: "What does the linker do in the C++ build pipeline?",
      options: [
        "Checks syntax and types in your code",
        "Expands #include and #define macros",
        "Combines object files and libraries into the final executable",
        "Runs the compiled program",
      ],
      correctAnswer: "Combines object files and libraries into the final executable",
      explanation: "The linker's job is to stitch all object files together with any needed libraries (like the standard library) into one final executable.",
    },
    {
      id: "hcw-3",
      lessonId: "how-cpp-works",
      type: "predict_output",
      question: "What command compiles a file named 'hello.cpp' into an executable named 'hello' using the C++17 standard?",
      codeSnippet: "# Command to compile",
      options: [
        "g++ hello.cpp",
        "g++ -std=c++17 hello.cpp -o hello",
        "compile hello.cpp --standard=17",
        "cpp hello.cpp -output hello",
      ],
      correctAnswer: "g++ -std=c++17 hello.cpp -o hello",
      explanation: "g++ is the compiler, -std=c++17 specifies the C++ standard, hello.cpp is the source file, and -o hello names the output executable.",
    },
    {
      id: "hcw-4",
      lessonId: "how-cpp-works",
      type: "true_false",
      question: "Each .cpp file produces its own object file (.o) during compilation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The compiler creates one object file per .cpp source file. The linker then combines all object files into the final executable.",
    },
  ],

  "data-types": [
    {
      id: "dt-1",
      lessonId: "data-types",
      type: "multiple_choice",
      question: "Which type should you default to for decimal (floating-point) numbers in C++?",
      options: ["float", "double", "long", "decimal"],
      correctAnswer: "double",
      explanation: "double (8 bytes, 15 significant digits) is the default choice for decimal math. float (4 bytes, 7 significant digits) has less precision and is only preferred when memory is very tight.",
    },
    {
      id: "dt-2",
      lessonId: "data-types",
      type: "predict_output",
      question: "What is the output of this code?",
      codeSnippet: `#include <iostream>
using namespace std;
int main() {
    bool flag = true;
    cout << flag << endl;
    return 0;
}`,
      options: ["true", "1", "TRUE", "false"],
      correctAnswer: "1",
      explanation: "In C++, bool values print as 1 (true) or 0 (false) by default. To print 'true'/'false', use cout << boolalpha << flag.",
    },
    {
      id: "dt-3",
      lessonId: "data-types",
      type: "multiple_choice",
      question: "Why should you prefer vector<int> over int array[] in most situations?",
      options: [
        "Vectors are faster than arrays",
        "Vectors are resizable and manage their own memory safely",
        "Arrays don't work in modern C++",
        "Vectors don't need #include",
      ],
      correctAnswer: "Vectors are resizable and manage their own memory safely",
      explanation: "vector is resizable (you can push_back() to add elements), automatically manages memory, and provides bounds-checking. Raw arrays have fixed size and no bounds checking.",
    },
    {
      id: "dt-4",
      lessonId: "data-types",
      type: "fill_blank",
      question: "A char variable in C++ uses ___ byte(s) of memory and stores a single ___.",
      options: ["1 byte, character", "2 bytes, string", "4 bytes, number", "8 bytes, character"],
      correctAnswer: "1 byte, character",
      explanation: "char uses exactly 1 byte (8 bits) and stores a single character, represented internally as its ASCII code. For example, 'A' stores the value 65.",
    },
  ],

  "operators": [
    {
      id: "op-1",
      lessonId: "operators",
      type: "predict_output",
      question: "What is the output of this code?",
      codeSnippet: `#include <iostream>
using namespace std;
int main() {
    cout << 7 / 2 << endl;
    cout << 7.0 / 2 << endl;
    return 0;
}`,
      options: ["3.5 and 3.5", "3 and 3.5", "4 and 3.5", "3 and 4"],
      correctAnswer: "3 and 3.5",
      explanation: "7 / 2 is integer division — result is 3 (decimal truncated). 7.0 / 2 promotes to double — result is 3.5. Always ensure at least one operand is a double for decimal division.",
    },
    {
      id: "op-2",
      lessonId: "operators",
      type: "multiple_choice",
      question: "What does the % operator compute?",
      options: [
        "Percentage of the first number",
        "The remainder after division",
        "The quotient of two numbers",
        "Bitwise XOR",
      ],
      correctAnswer: "The remainder after division",
      explanation: "The modulus operator % returns the remainder after dividing. For example, 17 % 5 = 2, because 17 = 3×5 + 2. Very useful for checking if a number is even/odd (n % 2 == 0 means even).",
    },
    {
      id: "op-3",
      lessonId: "operators",
      type: "true_false",
      question: "The expression if (x = 5) assigns 5 to x AND uses it as a condition — this is a common bug, not a comparison.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "= is assignment, == is comparison. if (x = 5) assigns 5 to x (which is non-zero, so always true). The correct comparison is if (x == 5). Many compilers warn about this.",
    },
    {
      id: "op-4",
      lessonId: "operators",
      type: "predict_output",
      question: "What value does x have after these statements?",
      codeSnippet: `int x = 10;
x += 5;
x *= 2;
x -= 3;`,
      options: ["27", "22", "17", "30"],
      correctAnswer: "27",
      explanation: "Step 1: x = 10 + 5 = 15. Step 2: x = 15 × 2 = 30. Step 3: x = 30 - 3 = 27.",
    },
  ],

  "loops": [
    {
      id: "lp-1",
      lessonId: "loops",
      type: "predict_output",
      question: "How many times does this loop print 'hello'?",
      codeSnippet: `for (int i = 0; i < 5; i++) {
    cout << "hello" << endl;
}`,
      options: ["4", "5", "6", "0"],
      correctAnswer: "5",
      explanation: "i starts at 0 and runs while i < 5. So i = 0, 1, 2, 3, 4 — that's 5 iterations. The condition i < 5 is false when i = 5, so the loop stops.",
    },
    {
      id: "lp-2",
      lessonId: "loops",
      type: "multiple_choice",
      question: "Which loop type guarantees the body runs at least once?",
      options: ["for loop", "while loop", "do-while loop", "foreach loop"],
      correctAnswer: "do-while loop",
      explanation: "The do-while loop executes the body FIRST and checks the condition AFTER. Even if the condition is initially false, the body runs at least once.",
    },
    {
      id: "lp-3",
      lessonId: "loops",
      type: "multiple_choice",
      question: "What does the break statement do inside a loop?",
      options: [
        "Pauses the loop for one iteration",
        "Skips to the next iteration",
        "Exits the loop immediately",
        "Resets the loop counter to 0",
      ],
      correctAnswer: "Exits the loop immediately",
      explanation: "break exits the loop immediately, regardless of the loop condition. Execution continues with the code AFTER the loop's closing brace.",
    },
    {
      id: "lp-4",
      lessonId: "loops",
      type: "predict_output",
      question: "What does this code print?",
      codeSnippet: `for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}`,
      options: ["1 2 3 4 5", "1 2 4 5", "1 2 3 4", "3"],
      correctAnswer: "1 2 4 5",
      explanation: "continue skips the rest of the current iteration. When i == 3, the cout is skipped and the loop goes to i = 4. So 3 is never printed.",
    },
    {
      id: "lp-5",
      lessonId: "loops",
      type: "true_false",
      question: "A while loop with the condition 'while (true)' will run forever unless broken out of with break or return.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "while (true) is an infinite loop by design. It only exits if a break, return, or throw statement is reached inside the loop body. This pattern is used intentionally for game loops and servers.",
    },
  ],

  "functions": [
    {
      id: "fn-1",
      lessonId: "functions",
      type: "predict_output",
      question: "What is the output of this code?",
      codeSnippet: `void addOne(int x) {
    x = x + 1;
}

int main() {
    int num = 5;
    addOne(num);
    cout << num << endl;
    return 0;
}`,
      options: ["5", "6", "Error", "0"],
      correctAnswer: "5",
      explanation: "addOne receives a COPY of num (pass by value). The copy is changed to 6, but the original num stays 5. To change num, use int& (pass by reference).",
    },
    {
      id: "fn-2",
      lessonId: "functions",
      type: "multiple_choice",
      question: "What does the & symbol mean in 'void swap(int& a, int& b)'?",
      options: [
        "Bitwise AND between a and b",
        "The function returns a reference",
        "a and b are passed by reference — changes affect the originals",
        "a and b are pointers",
      ],
      correctAnswer: "a and b are passed by reference — changes affect the originals",
      explanation: "int& means 'reference to int'. Passing by reference means the function works with the original variables, not copies. Changes inside the function affect the caller's variables.",
    },
    {
      id: "fn-3",
      lessonId: "functions",
      type: "multiple_choice",
      question: "What return type should a function have if it does not return any value?",
      options: ["int", "null", "void", "empty"],
      correctAnswer: "void",
      explanation: "void means 'no return value'. A void function does not need a return statement (though you can use return; with no value to exit early).",
    },
    {
      id: "fn-4",
      lessonId: "functions",
      type: "true_false",
      question: "In C++, you can have two functions with the same name but different parameter types (function overloading).",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Function overloading allows multiple functions with the same name as long as their parameter types differ. The compiler selects the right version based on the argument types.",
    },
  ],

  "pointers-memory": [
    {
      id: "pm-1",
      lessonId: "pointers-memory",
      type: "predict_output",
      question: "What does *p print?",
      codeSnippet: `int x = 42;
int* p = &x;
cout << *p << endl;`,
      options: ["Address of x", "42", "Address of p", "0"],
      correctAnswer: "42",
      explanation: "*p dereferences the pointer — it accesses the value stored at the address p points to. Since p points to x, and x = 42, *p is 42.",
    },
    {
      id: "pm-2",
      lessonId: "pointers-memory",
      type: "multiple_choice",
      question: "What is a memory leak in C++?",
      options: [
        "RAM physically leaking from the computer",
        "A variable that leaks its value to other variables",
        "Heap memory allocated with new that is never freed with delete",
        "A variable going out of scope",
      ],
      correctAnswer: "Heap memory allocated with new that is never freed with delete",
      explanation: "A memory leak occurs when you allocate memory on the heap with new but never release it with delete. The memory remains allocated but inaccessible, growing over time until the program crashes.",
    },
    {
      id: "pm-3",
      lessonId: "pointers-memory",
      type: "multiple_choice",
      question: "Which delete statement correctly frees an array allocated with 'int* arr = new int[10]'?",
      options: ["delete arr;", "delete[] arr;", "free(arr);", "arr.destroy();"],
      correctAnswer: "delete[] arr;",
      explanation: "Arrays allocated with new[] must be freed with delete[] (with square brackets). Using delete (without []) on an array is undefined behavior — typically a crash or memory corruption.",
    },
    {
      id: "pm-4",
      lessonId: "pointers-memory",
      type: "true_false",
      question: "Stack memory is automatically freed when a function returns; heap memory must be manually freed.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Local variables (on the stack) are automatically freed when their enclosing function returns. Heap memory (from new) persists until you explicitly call delete.",
    },
    {
      id: "pm-5",
      lessonId: "pointers-memory",
      type: "multiple_choice",
      question: "What should you do with a pointer immediately after calling delete on it?",
      options: [
        "Leave it pointing to the freed memory",
        "Set it to nullptr",
        "Assign it a new address immediately",
        "Declare a new pointer variable",
      ],
      correctAnswer: "Set it to nullptr",
      explanation: "After delete, the pointer becomes a 'dangling pointer' pointing to freed memory. Setting it to nullptr prevents accidental use and makes null checks possible.",
    },
  ],

  "oop": [
    {
      id: "oop-1",
      lessonId: "oop",
      type: "multiple_choice",
      question: "What is the difference between a class and an object in C++?",
      options: [
        "Classes contain data; objects contain functions",
        "A class is the blueprint; an object is a specific instance created from it",
        "Objects can only have one attribute; classes can have many",
        "They are identical in C++",
      ],
      correctAnswer: "A class is the blueprint; an object is a specific instance created from it",
      explanation: "A class defines the structure (like a blueprint or template). An object is a concrete instance created from that class. You can create many objects from one class.",
    },
    {
      id: "oop-2",
      lessonId: "oop",
      type: "true_false",
      question: "private members of a class can be accessed directly by code outside the class.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "private members are only accessible from within the class itself. Code outside the class must use public methods (getters/setters) to interact with private data. This is encapsulation.",
    },
    {
      id: "oop-3",
      lessonId: "oop",
      type: "multiple_choice",
      question: "What keyword is used to mark a function that can be overridden in a derived class?",
      options: ["override", "virtual", "abstract", "dynamic"],
      correctAnswer: "virtual",
      explanation: "The virtual keyword in the base class marks a function that derived classes can override. Without virtual, calling the function through a base pointer always calls the base version.",
    },
    {
      id: "oop-4",
      lessonId: "oop",
      type: "multiple_choice",
      question: "What is a constructor in C++?",
      options: [
        "A function that destroys an object",
        "A special function with the same name as the class that runs when an object is created",
        "A function that builds the class definition",
        "A function that copies one object to another",
      ],
      correctAnswer: "A special function with the same name as the class that runs when an object is created",
      explanation: "A constructor has the same name as the class, no return type, and runs automatically when an object is created. It initializes the object's attributes.",
    },
    {
      id: "oop-5",
      lessonId: "oop",
      type: "multiple_choice",
      question: "What OOP principle does 'hiding data with private and exposing it through public methods' represent?",
      options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
      correctAnswer: "Encapsulation",
      explanation: "Encapsulation means bundling data and methods together and restricting direct access to the data. Private data + public methods is the classic encapsulation pattern.",
    },
  ],

  "cpp-syntax": [
    {
      id: "syn-1",
      lessonId: "cpp-syntax",
      type: "multiple_choice",
      question: "What does 'using namespace std;' do in a C++ program?",
      options: [
        "Creates a new namespace called std",
        "Allows you to write cout instead of std::cout",
        "Imports all C++ standard library functions",
        "Makes all variables global",
      ],
      correctAnswer: "Allows you to write cout instead of std::cout",
      explanation: "std is the namespace where cout, cin, string, and many other standard tools live. 'using namespace std;' lets you skip the std:: prefix.",
    },
    {
      id: "syn-2",
      lessonId: "cpp-syntax",
      type: "true_false",
      question: "In C++, indentation (how code is indented) determines which block a statement belongs to.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "In C++, curly braces {} define code blocks, NOT indentation. Python uses indentation for blocks, but C++ uses {}. Indentation in C++ is only for human readability.",
    },
    {
      id: "syn-3",
      lessonId: "cpp-syntax",
      type: "multiple_choice",
      question: "Every C++ statement must end with which symbol?",
      options: [":", ".", ";", "->"],
      correctAnswer: ";",
      explanation: "Every C++ statement ends with a semicolon ;. This tells the compiler where one statement ends and the next begins. Forgetting a semicolon is the #1 beginner compile error.",
    },
  ],

  "input-output": [
    {
      id: "io-1",
      lessonId: "input-output",
      type: "multiple_choice",
      question: "What is the problem with using 'cin >> name' when you want to read 'John Smith' (two words)?",
      options: [
        "cin cannot read strings",
        "cin stops reading at the first space, only capturing 'John'",
        "cin requires quotes around the input",
        "You need cin >> first >> last instead",
      ],
      correctAnswer: "cin stops reading at the first space, only capturing 'John'",
      explanation: "cin >> stops at whitespace. To read a full line including spaces, use getline(cin, name). This is a very common bug for beginners.",
    },
    {
      id: "io-2",
      lessonId: "input-output",
      type: "predict_output",
      question: "What is the output of this code?",
      codeSnippet: `string name = "Alice";
int age = 25;
cout << "Hello, " << name << "! You are " << age << " years old." << endl;`,
      options: [
        "Hello, Alice! You are 25 years old.",
        "Hello, name! You are age years old.",
        "Hello, Alice!YouAre25YearsOld.",
        "Compilation error",
      ],
      correctAnswer: "Hello, Alice! You are 25 years old.",
      explanation: "cout chains multiple values with <<. Variables are replaced by their values. The endl adds a newline at the end.",
    },
    {
      id: "io-3",
      lessonId: "input-output",
      type: "multiple_choice",
      question: "What is the difference between endl and '\\n'?",
      options: [
        "endl adds two newlines; \\n adds one",
        "endl flushes the buffer AND adds a newline; \\n only adds a newline",
        "\\n works only in strings; endl works anywhere",
        "They are identical in all ways",
      ],
      correctAnswer: "endl flushes the buffer AND adds a newline; \\n only adds a newline",
      explanation: "endl adds a newline character AND flushes the output buffer to disk/screen immediately. \\n only adds a newline character and is faster (no flush). Prefer \\n in performance-sensitive code.",
    },
  ],

  "extra-concepts": [
    {
      id: "ec-1",
      lessonId: "extra-concepts",
      type: "multiple_choice",
      question: "What happens if you try to change a const variable after it's declared?",
      options: [
        "The program crashes at runtime",
        "The compiler rejects the code with an error",
        "The value changes silently",
        "You get a warning but the code still runs",
      ],
      correctAnswer: "The compiler rejects the code with an error",
      explanation: "const violations are caught at compile time, not runtime. The compiler refuses to compile code that attempts to modify a const variable.",
    },
    {
      id: "ec-2",
      lessonId: "extra-concepts",
      type: "multiple_choice",
      question: "What is the key difference between struct and class in C++?",
      options: [
        "struct cannot have member functions; class can",
        "struct members are public by default; class members are private by default",
        "struct supports inheritance; class does not",
        "class is faster than struct",
      ],
      correctAnswer: "struct members are public by default; class members are private by default",
      explanation: "The only technical difference is default access: struct = public, class = private. By convention, structs are used for simple data bundles without complex methods.",
    },
    {
      id: "ec-3",
      lessonId: "extra-concepts",
      type: "multiple_choice",
      question: "According to C++ naming conventions, how should a class name be written?",
      options: ["camelCase", "PascalCase", "snake_case", "ALL_CAPS"],
      correctAnswer: "PascalCase",
      explanation: "C++ conventions: variables/functions = camelCase (myVariable), Classes = PascalCase (BankAccount), Constants = ALL_CAPS (MAX_SIZE). Following conventions makes code readable to other C++ developers.",
    },
  ],

  "cpp-roadmap": [
    {
      id: "rm-1",
      lessonId: "cpp-roadmap",
      type: "multiple_choice",
      question: "According to the C++ learning roadmap, what should you learn BEFORE pointers?",
      options: [
        "OOP and classes",
        "Templates and STL",
        "Variables, data types, operators, and functions",
        "Dynamic memory allocation",
      ],
      correctAnswer: "Variables, data types, operators, and functions",
      explanation: "Pointers only make sense once you understand variables and memory. The roadmap goes: Basics → Types → Control Flow → Functions → Memory (pointers) → OOP.",
    },
  ],

  "cpp-applications": [
    {
      id: "app-1",
      lessonId: "cpp-applications",
      type: "multiple_choice",
      question: "Why is C++ preferred for game engines like Unreal Engine?",
      options: [
        "C++ has the best graphics library built-in",
        "Games need to render frames many times per second, requiring maximum speed",
        "C++ is the easiest language to learn for game development",
        "C++ has built-in game engine support",
      ],
      correctAnswer: "Games need to render frames many times per second, requiring maximum speed",
      explanation: "Modern games target 60-120+ frames per second. C++'s compiled nature with no interpreter overhead gives the raw speed needed to render complex 3D scenes in milliseconds.",
    },
  ],

  "installing-cpp": [
    {
      id: "inst-1",
      lessonId: "installing-cpp",
      type: "multiple_choice",
      question: "On macOS, what command installs the Clang C++ compiler?",
      options: ["brew install g++", "xcode-select --install", "apt-get install g++", "install clang++"],
      correctAnswer: "xcode-select --install",
      explanation: "On macOS, 'xcode-select --install' installs Apple's Command Line Tools, which includes the Clang compiler (clang++). This is all most developers need.",
    },
  ],

  "advantages": [
    {
      id: "adv-1",
      lessonId: "advantages",
      type: "true_false",
      question: "C++ programs typically run 10-100x faster than equivalent Python programs for compute-intensive tasks.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "C++ compiles to native machine code with no interpreter overhead. Python runs through an interpreter. This difference results in C++ being 10-100x faster for CPU-bound tasks.",
    },
    {
      id: "adv-2",
      lessonId: "advantages",
      type: "multiple_choice",
      question: "What is a disadvantage of C++ compared to Python?",
      options: [
        "C++ is much slower at runtime",
        "C++ doesn't support object-oriented programming",
        "C++ has a steeper learning curve due to manual memory management and static typing",
        "C++ cannot be used for large projects",
      ],
      correctAnswer: "C++ has a steeper learning curve due to manual memory management and static typing",
      explanation: "The main trade-offs: C++ requires managing memory manually (no garbage collector), requires type declarations everywhere, and takes longer to compile. The payoff is raw speed and control.",
    },
  ],

  "dependencies-building": [
    {
      id: "dep-1",
      lessonId: "dependencies-building",
      type: "multiple_choice",
      question: "What does a .h header file contain in a C++ project?",
      options: [
        "The implementation (how functions work)",
        "The declarations (what functions/classes look like — the interface)",
        "The compiled machine code",
        "The project's dependencies list",
      ],
      correctAnswer: "The declarations (what functions/classes look like — the interface)",
      explanation: "Header files (.h) contain declarations — they tell other files what exists (function signatures, class definitions) without the implementation details. The .cpp file contains the actual implementation.",
    },
    {
      id: "dep-2",
      lessonId: "dependencies-building",
      type: "multiple_choice",
      question: "What is CMake used for in C++ development?",
      options: [
        "A code editor for C++",
        "A build system that manages multi-file projects and generates build commands",
        "A package manager like pip for Python",
        "A C++ compiler",
      ],
      correctAnswer: "A build system that manages multi-file projects and generates build commands",
      explanation: "CMake describes your project (files, dependencies, settings) in a CMakeLists.txt file and generates the correct build commands for any platform (Windows, macOS, Linux).",
    },
  ],
};

export function getQuizForLesson(lessonId: string): QuizQuestion[] {
  return quizzes[lessonId] ?? [];
}
