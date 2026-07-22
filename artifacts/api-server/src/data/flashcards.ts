export interface FlashcardData {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  category: string;
}

export const flashcards: FlashcardData[] = [
  // what-is-cpp
  { id: "f1", lessonId: "what-is-cpp", front: "What does 'compiled' mean in C++?", back: "The entire program is translated to machine code by a compiler BEFORE it runs. The CPU executes the machine code directly — no interpreter needed.", category: "Fundamentals" },
  { id: "f2", lessonId: "what-is-cpp", front: "What is 'static typing' in C++?", back: "Every variable must have a declared type that cannot change. The compiler checks types at compile time, catching type errors before the program runs.", category: "Fundamentals" },
  { id: "f3", lessonId: "what-is-cpp", front: "What does the STL stand for?", back: "Standard Template Library — a collection of ready-made containers (vector, map, set) and algorithms (sort, find, transform) built into C++.", category: "Fundamentals" },
  { id: "f4", lessonId: "what-is-cpp", front: "Name three key features of C++", back: "1. Compiled (fast execution)\n2. Statically typed (compile-time safety)\n3. Manual memory management (full control)\n4. OOP support (classes, inheritance)\n5. STL (containers & algorithms)", category: "Fundamentals" },

  // cpp-syntax
  { id: "f5", lessonId: "cpp-syntax", front: "What is the purpose of main() in C++?", back: "main() is the entry point of every C++ program — where execution begins. Every valid C++ program must have exactly one main() function.", category: "Syntax" },
  { id: "f6", lessonId: "cpp-syntax", front: "What does #include <iostream> do?", back: "It tells the preprocessor to copy the contents of the iostream header file into your program, giving you access to cout, cin, and endl.", category: "Syntax" },
  { id: "f7", lessonId: "cpp-syntax", front: "Why does every C++ statement end with a semicolon?", back: "C++ uses ; to mark the end of a statement. Unlike Python which uses newlines, C++ ignores whitespace — the semicolon tells the compiler where each statement ends.", category: "Syntax" },
  { id: "f8", lessonId: "cpp-syntax", front: "What is the difference between // and /* */comments?", back: "// is a single-line comment (rest of that line is ignored).\n/* */ is a multi-line comment (everything between /* and */ is ignored).", category: "Syntax" },

  // data-types
  { id: "f9", lessonId: "data-types", front: "int vs double — when to use each?", back: "int: for whole numbers (counting, indexing) — 4 bytes.\ndouble: for decimal numbers — 8 bytes, 15 digits of precision.\nDefault to double when you need decimals.", category: "Types" },
  { id: "f10", lessonId: "data-types", front: "What is a bool and what values can it hold?", back: "bool stores true or false (1 byte). Used for yes/no flags and conditions. Prints as 1 (true) or 0 (false) by default in C++.", category: "Types" },
  { id: "f11", lessonId: "data-types", front: "What is the difference between char and string?", back: "char: stores ONE character in single quotes — 'A' (1 byte).\nstring: stores TEXT of any length in double quotes — \"Hello\" (variable size, needs #include <string>).", category: "Types" },
  { id: "f12", lessonId: "data-types", front: "Why prefer vector over array?", back: "vector is resizable (push_back/pop_back), auto-manages memory, provides size() method, and works with STL algorithms. Raw arrays have fixed size, no bounds checking, and are harder to pass to functions.", category: "Types" },
  { id: "f13", lessonId: "data-types", front: "What is the sizeof() operator?", back: "sizeof(type) returns the number of bytes that type uses in memory.\nExamples: sizeof(int) = 4, sizeof(double) = 8, sizeof(char) = 1.", category: "Types" },

  // operators
  { id: "f14", lessonId: "operators", front: "What is the result of 7 / 2 in C++?", back: "3 (integer division — the decimal part is truncated).\nTo get 3.5, make at least one operand a double: 7.0 / 2 or (double)7 / 2.", category: "Operators" },
  { id: "f15", lessonId: "operators", front: "What does the % operator do?", back: "Modulus — returns the remainder after division.\n17 % 5 = 2 (because 17 = 3×5 + 2)\nUseful for: checking even/odd (n%2==0), wrapping around ranges.", category: "Operators" },
  { id: "f16", lessonId: "operators", front: "What is the difference between = and == in C++?", back: "= (single equals) ASSIGNS a value: x = 5 sets x to 5.\n== (double equals) COMPARES: x == 5 checks if x equals 5.\nConfusing them is a very common bug!", category: "Operators" },
  { id: "f17", lessonId: "operators", front: "What do &&, ||, and ! do?", back: "&& (AND): true if BOTH sides are true.\n|| (OR): true if AT LEAST ONE side is true.\n! (NOT): flips true to false and false to true.", category: "Operators" },

  // loops
  { id: "f18", lessonId: "loops", front: "What are the three parts of a for loop?", back: "for (initialization; condition; increment)\n1. Initialization: runs once at start (int i = 0)\n2. Condition: checked before each iteration (i < 5)\n3. Increment: runs after each iteration (i++)", category: "Loops" },
  { id: "f19", lessonId: "loops", front: "for vs while vs do-while — when to use each?", back: "for: when you KNOW the count upfront.\nwhile: when the count depends on a runtime condition.\ndo-while: when you need the body to run AT LEAST ONCE (menus, input validation).", category: "Loops" },
  { id: "f20", lessonId: "loops", front: "What does break do in a loop?", back: "break exits the loop immediately. Execution continues with the first statement AFTER the loop's closing brace }.", category: "Loops" },
  { id: "f21", lessonId: "loops", front: "What does continue do in a loop?", back: "continue skips the rest of the current iteration and jumps to the next one. The loop does NOT exit — it just skips one iteration.", category: "Loops" },

  // functions
  { id: "f22", lessonId: "functions", front: "What is pass by value in C++?", back: "The function receives a COPY of the argument. Changes inside the function do NOT affect the original variable. Default behavior for primitive types.", category: "Functions" },
  { id: "f23", lessonId: "functions", front: "What is pass by reference in C++?", back: "Using int& (ampersand), the function receives the ACTUAL variable, not a copy. Changes inside the function DO affect the original. Syntax: void func(int& x)", category: "Functions" },
  { id: "f24", lessonId: "functions", front: "What does a void return type mean?", back: "void means the function returns NOTHING. No return value is needed (though you can use 'return;' to exit early). Example: void printHello() { cout << \"Hello!\"; }", category: "Functions" },
  { id: "f25", lessonId: "functions", front: "What is function overloading?", back: "Defining multiple functions with the SAME NAME but different parameter types. The compiler picks the right one based on arguments. Example: int add(int, int) and double add(double, double).", category: "Functions" },

  // pointers-memory
  { id: "f26", lessonId: "pointers-memory", front: "What does & do when used with a variable (e.g., &x)?", back: "Gets the memory ADDRESS of x. Used to initialize pointers: int* ptr = &x; (ptr now holds x's address).", category: "Memory" },
  { id: "f27", lessonId: "pointers-memory", front: "What does * do on a pointer (e.g., *ptr)?", back: "Dereferences the pointer — accesses the VALUE stored at the address ptr holds. *ptr = 5 changes the original variable through the pointer.", category: "Memory" },
  { id: "f28", lessonId: "pointers-memory", front: "Stack vs Heap memory — what's the difference?", back: "Stack: auto-managed, fast, limited size. Local variables live here. Freed when function returns.\nHeap: manually managed with new/delete. Larger, persists until freed. Use for dynamic allocation.", category: "Memory" },
  { id: "f29", lessonId: "pointers-memory", front: "What is a memory leak?", back: "When heap memory allocated with new is never freed with delete. The program keeps consuming more memory until it crashes. Solution: always pair new with delete.", category: "Memory" },
  { id: "f30", lessonId: "pointers-memory", front: "What is a dangling pointer?", back: "A pointer that points to memory that has already been freed. Using it causes undefined behavior (crash or corruption). Fix: set pointer to nullptr after delete.", category: "Memory" },

  // oop
  { id: "f31", lessonId: "oop", front: "What is the difference between a class and an object?", back: "Class: a blueprint/template (the Dog class definition).\nObject: a concrete instance created from a class (Dog myDog; creates a Dog object).\nMany objects can be created from one class.", category: "OOP" },
  { id: "f32", lessonId: "oop", front: "What is a constructor?", back: "A special function with the same name as the class and no return type. Called automatically when an object is created. Used to initialize attributes.", category: "OOP" },
  { id: "f33", lessonId: "oop", front: "What is encapsulation?", back: "Hiding data (private) and exposing it only through controlled methods (public). Prevents invalid states and outside misuse. Example: private balance, public deposit()/withdraw().", category: "OOP" },
  { id: "f34", lessonId: "oop", front: "What does virtual keyword do?", back: "Marks a function as overridable in derived classes. Enables runtime polymorphism — calling the function through a base pointer calls the correct derived version.", category: "OOP" },
  { id: "f35", lessonId: "oop", front: "What is polymorphism in C++?", back: "The ability of a base class pointer to call different derived class versions of a virtual function. 'Many forms' — same call, different behavior depending on the actual object type.", category: "OOP" },
  { id: "f36", lessonId: "oop", front: "What is inheritance in C++?", back: "A derived class acquires all public/protected members of a base class. 'class Dog : public Animal' means Dog is an Animal and gets all Animal's public members.", category: "OOP" },

  // glossary-level general cards
  { id: "f37", lessonId: "what-is-cpp", front: "What is the difference between compiled and interpreted languages?", back: "Compiled (C++): translated to machine code ONCE before running — fast execution.\nInterpreted (Python): translated line-by-line as it runs — slower but easier to develop.\nC++ trades development speed for runtime speed.", category: "Fundamentals" },
  { id: "f38", lessonId: "extra-concepts", front: "What does const do in C++?", back: "Declares a variable as immutable — its value cannot change after initialization. Trying to change it is a compile-time error. Use for PI, MAX_SIZE, app constants.", category: "Language Features" },
  { id: "f39", lessonId: "extra-concepts", front: "struct vs class in C++", back: "Both are nearly identical. The only difference: struct members are PUBLIC by default; class members are PRIVATE by default. Use struct for simple data bundles, class for full OOP.", category: "OOP" },
  { id: "f40", lessonId: "extra-concepts", front: "C++ naming conventions", back: "Variables and functions: camelCase (myVariable, calculateSum)\nClasses: PascalCase (BankAccount, StudentRecord)\nConstants: ALL_CAPS (MAX_SIZE, PI)\nFollowing conventions makes code readable.", category: "Language Features" },
];

export function getFlashcards(lessonId?: string | null): FlashcardData[] {
  if (lessonId) return flashcards.filter(f => f.lessonId === lessonId);
  return flashcards;
}
