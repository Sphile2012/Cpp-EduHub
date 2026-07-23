/**
 * C++ Term Definitions Database
 * Quick-access definitions for interactive tooltips
 */

export interface TermDefinition {
  id: string;
  name: string;
  category: 'keyword' | 'concept' | 'stl' | 'operator' | 'type';
  shortDefinition: string;
  example: string;
  glossarySlug: string;
  relatedTerms: string[];
}

export const termDefinitions: Record<string, TermDefinition> = {
  // Basic Types
  "int": {
    id: "int",
    name: "int",
    category: "type",
    shortDefinition: "Integer type for whole numbers (typically -2 billion to +2 billion).",
    example: "int age = 25;\nint score = -10;",
    glossarySlug: "data-types",
    relatedTerms: ["double", "char", "bool", "variable"]
  },
  
  "double": {
    id: "double",
    name: "double",
    category: "type",
    shortDefinition: "Floating-point type for decimal numbers with ~15 digits of precision.",
    example: "double pi = 3.14159;\ndouble price = 19.99;",
    glossarySlug: "data-types",
    relatedTerms: ["float", "int", "variable"]
  },
  
  "char": {
    id: "char",
    name: "char",
    category: "type",
    shortDefinition: "Character type that stores a single character (1 byte).",
    example: "char grade = 'A';\nchar symbol = '@';",
    glossarySlug: "data-types",
    relatedTerms: ["string", "int", "ascii"]
  },
  
  "bool": {
    id: "bool",
    name: "bool",
    category: "type",
    shortDefinition: "Boolean type that stores true or false.",
    example: "bool isValid = true;\nbool hasError = false;",
    glossarySlug: "data-types",
    relatedTerms: ["if", "while", "operator"]
  },
  
  "string": {
    id: "string",
    name: "string",
    category: "stl",
    shortDefinition: "STL type for sequences of characters (text). Requires #include <string>.",
    example: "#include <string>\nstring name = \"Alice\";\nstring msg = \"Hello!\";",
    glossarySlug: "strings",
    relatedTerms: ["char", "vector", "stl"]
  },

  // STL Containers
  "vector": {
    id: "vector",
    name: "vector",
    category: "stl",
    shortDefinition: "Dynamic array from STL that automatically resizes. Requires #include <vector>.",
    example: "#include <vector>\nvector<int> nums = {1, 2, 3};\nnums.push_back(4);",
    glossarySlug: "vector",
    relatedTerms: ["array", "stl", "push_back", "iterator"]
  },
  
  "array": {
    id: "array",
    name: "array",
    category: "concept",
    shortDefinition: "Fixed-size collection of elements of the same type.",
    example: "int numbers[5] = {1, 2, 3, 4, 5};\nnumbers[0] = 10;",
    glossarySlug: "arrays",
    relatedTerms: ["vector", "int", "index"]
  },
  
  "map": {
    id: "map",
    name: "map",
    category: "stl",
    shortDefinition: "Associative container that stores key-value pairs in sorted order.",
    example: "#include <map>\nmap<string, int> ages;\nages[\"Alice\"] = 25;",
    glossarySlug: "map",
    relatedTerms: ["unordered_map", "pair", "stl"]
  },
  
  "set": {
    id: "set",
    name: "set",
    category: "stl",
    shortDefinition: "Container that stores unique elements in sorted order.",
    example: "#include <set>\nset<int> numbers = {3, 1, 4, 1};\n// Stores: {1, 3, 4}",
    glossarySlug: "set",
    relatedTerms: ["unordered_set", "vector", "stl"]
  },

  // Pointers & Memory
  "pointer": {
    id: "pointer",
    name: "pointer",
    category: "concept",
    shortDefinition: "Variable that stores the memory address of another variable.",
    example: "int x = 42;\nint* ptr = &x;\ncout << *ptr; // 42",
    glossarySlug: "pointers",
    relatedTerms: ["reference", "address", "dereference", "new", "delete"]
  },
  
  "reference": {
    id: "reference",
    name: "reference",
    category: "concept",
    shortDefinition: "Alias for an existing variable. Changes affect the original.",
    example: "int x = 10;\nint& ref = x;\nref = 20; // x is now 20",
    glossarySlug: "references",
    relatedTerms: ["pointer", "pass-by-reference", "function"]
  },
  
  "new": {
    id: "new",
    name: "new",
    category: "keyword",
    shortDefinition: "Allocates memory on the heap. Must be freed with delete.",
    example: "int* ptr = new int(42);\ndelete ptr;",
    glossarySlug: "dynamic-memory",
    relatedTerms: ["delete", "pointer", "heap", "malloc"]
  },
  
  "delete": {
    id: "delete",
    name: "delete",
    category: "keyword",
    shortDefinition: "Frees memory allocated with new. Use delete[] for arrays.",
    example: "int* p = new int(5);\ndelete p;\nint* arr = new int[10];\ndelete[] arr;",
    glossarySlug: "dynamic-memory",
    relatedTerms: ["new", "pointer", "memory-leak"]
  },
  
  "nullptr": {
    id: "nullptr",
    name: "nullptr",
    category: "keyword",
    shortDefinition: "Null pointer constant introduced in C++11. Safer than NULL.",
    example: "int* ptr = nullptr;\nif (ptr == nullptr) {\n    // pointer is null\n}",
    glossarySlug: "pointers",
    relatedTerms: ["pointer", "null", "reference"]
  },

  // OOP Concepts
  "class": {
    id: "class",
    name: "class",
    category: "keyword",
    shortDefinition: "Blueprint for creating objects with data (attributes) and functions (methods).",
    example: "class Dog {\npublic:\n    string name;\n    void bark() { cout << \"Woof!\"; }\n};",
    glossarySlug: "classes",
    relatedTerms: ["object", "struct", "constructor", "public", "private"]
  },
  
  "object": {
    id: "object",
    name: "object",
    category: "concept",
    shortDefinition: "Instance of a class with its own data.",
    example: "class Car { };\nCar myCar; // myCar is an object\nCar* ptr = new Car(); // pointer to object",
    glossarySlug: "objects",
    relatedTerms: ["class", "instance", "constructor"]
  },
  
  "constructor": {
    id: "constructor",
    name: "constructor",
    category: "concept",
    shortDefinition: "Special method that runs when an object is created. Same name as class.",
    example: "class Point {\npublic:\n    Point(int x, int y) {\n        this->x = x;\n    }\n};",
    glossarySlug: "constructors",
    relatedTerms: ["destructor", "class", "this"]
  },
  
  "destructor": {
    id: "destructor",
    name: "destructor",
    category: "concept",
    shortDefinition: "Special method that runs when object is destroyed. Name starts with ~.",
    example: "class Resource {\npublic:\n    ~Resource() {\n        // cleanup\n    }\n};",
    glossarySlug: "destructors",
    relatedTerms: ["constructor", "raii", "delete"]
  },
  
  "inheritance": {
    id: "inheritance",
    name: "inheritance",
    category: "concept",
    shortDefinition: "Mechanism where a class derives properties from a parent class.",
    example: "class Animal { };\nclass Dog : public Animal {\n    // Dog inherits from Animal\n};",
    glossarySlug: "inheritance",
    relatedTerms: ["polymorphism", "derived", "base", "virtual"]
  },
  
  "polymorphism": {
    id: "polymorphism",
    name: "polymorphism",
    category: "concept",
    shortDefinition: "Ability to use a derived class through a base class pointer/reference.",
    example: "class Base {\n    virtual void print() { }\n};\nclass Derived : public Base {\n    void print() override { }\n};",
    glossarySlug: "polymorphism",
    relatedTerms: ["virtual", "override", "inheritance"]
  },
  
  "virtual": {
    id: "virtual",
    name: "virtual",
    category: "keyword",
    shortDefinition: "Marks a function as overridable in derived classes (enables polymorphism).",
    example: "class Base {\n    virtual void show() { }\n};\nclass Derived : public Base {\n    void show() override { }\n};",
    glossarySlug: "virtual-functions",
    relatedTerms: ["override", "polymorphism", "inheritance"]
  },
  
  "override": {
    id: "override",
    name: "override",
    category: "keyword",
    shortDefinition: "Explicitly marks that a function overrides a virtual function from base class.",
    example: "class Base {\n    virtual void f() { }\n};\nclass Derived : public Base {\n    void f() override { }\n};",
    glossarySlug: "override",
    relatedTerms: ["virtual", "polymorphism"]
  },
  
  "public": {
    id: "public",
    name: "public",
    category: "keyword",
    shortDefinition: "Access modifier allowing members to be accessed from anywhere.",
    example: "class MyClass {\npublic:\n    int x; // accessible everywhere\nprivate:\n    int y; // only inside class\n};",
    glossarySlug: "access-modifiers",
    relatedTerms: ["private", "protected", "class"]
  },
  
  "private": {
    id: "private",
    name: "private",
    category: "keyword",
    shortDefinition: "Access modifier restricting members to only within the class.",
    example: "class Account {\nprivate:\n    double balance; // hidden\npublic:\n    void deposit(double amt) { }\n};",
    glossarySlug: "access-modifiers",
    relatedTerms: ["public", "protected", "encapsulation"]
  },
  
  "protected": {
    id: "protected",
    name: "protected",
    category: "keyword",
    shortDefinition: "Access modifier allowing access within class and derived classes.",
    example: "class Base {\nprotected:\n    int x; // visible to derived\n};\nclass Derived : public Base { };",
    glossarySlug: "access-modifiers",
    relatedTerms: ["public", "private", "inheritance"]
  },

  // Control Flow
  "if": {
    id: "if",
    name: "if",
    category: "keyword",
    shortDefinition: "Conditional statement that executes code only if condition is true.",
    example: "if (x > 10) {\n    cout << \"x is greater than 10\";\n}",
    glossarySlug: "conditionals",
    relatedTerms: ["else", "else-if", "bool", "switch"]
  },
  
  "else": {
    id: "else",
    name: "else",
    category: "keyword",
    shortDefinition: "Executes code when the if condition is false.",
    example: "if (x > 0) {\n    cout << \"positive\";\n} else {\n    cout << \"negative or zero\";\n}",
    glossarySlug: "conditionals",
    relatedTerms: ["if", "else-if"]
  },
  
  "for": {
    id: "for",
    name: "for",
    category: "keyword",
    shortDefinition: "Loop that repeats code a specific number of times.",
    example: "for (int i = 0; i < 5; i++) {\n    cout << i << endl;\n}",
    glossarySlug: "loops",
    relatedTerms: ["while", "do-while", "break", "continue"]
  },
  
  "while": {
    id: "while",
    name: "while",
    category: "keyword",
    shortDefinition: "Loop that continues while condition is true. Checks condition before running.",
    example: "int i = 0;\nwhile (i < 5) {\n    cout << i++;\n}",
    glossarySlug: "loops",
    relatedTerms: ["for", "do-while", "break"]
  },
  
  "do": {
    id: "do",
    name: "do-while",
    category: "keyword",
    shortDefinition: "Loop that runs at least once, then checks condition. Format: do { } while(cond);",
    example: "int i = 0;\ndo {\n    cout << i++;\n} while (i < 5);",
    glossarySlug: "loops",
    relatedTerms: ["while", "for", "break"]
  },
  
  "switch": {
    id: "switch",
    name: "switch",
    category: "keyword",
    shortDefinition: "Multi-way branch based on value. More readable than many if-else.",
    example: "switch (grade) {\n    case 'A': cout << \"Excellent\"; break;\n    case 'B': cout << \"Good\"; break;\n    default: cout << \"Try harder\";\n}",
    glossarySlug: "switch",
    relatedTerms: ["case", "break", "default", "if"]
  },
  
  "break": {
    id: "break",
    name: "break",
    category: "keyword",
    shortDefinition: "Exits the current loop or switch statement immediately.",
    example: "for (int i = 0; i < 10; i++) {\n    if (i == 5) break;\n    cout << i;\n}",
    glossarySlug: "break",
    relatedTerms: ["continue", "for", "while", "switch"]
  },
  
  "continue": {
    id: "continue",
    name: "continue",
    category: "keyword",
    shortDefinition: "Skips the rest of current loop iteration and jumps to next iteration.",
    example: "for (int i = 0; i < 5; i++) {\n    if (i == 2) continue;\n    cout << i; // prints 0134\n}",
    glossarySlug: "continue",
    relatedTerms: ["break", "for", "while"]
  },
  
  "return": {
    id: "return",
    name: "return",
    category: "keyword",
    shortDefinition: "Exits a function and optionally returns a value to the caller.",
    example: "int add(int a, int b) {\n    return a + b;\n}",
    glossarySlug: "functions",
    relatedTerms: ["function", "void", "type"]
  },

  // Functions
  "function": {
    id: "function",
    name: "function",
    category: "concept",
    shortDefinition: "Reusable block of code with a name, parameters, and return type.",
    example: "int square(int x) {\n    return x * x;\n}\nint result = square(5);",
    glossarySlug: "functions",
    relatedTerms: ["return", "parameter", "void"]
  },
  
  "void": {
    id: "void",
    name: "void",
    category: "keyword",
    shortDefinition: "Return type meaning 'no return value'. Function doesn't return anything.",
    example: "void greet(string name) {\n    cout << \"Hello, \" << name;\n}",
    glossarySlug: "functions",
    relatedTerms: ["function", "return", "int"]
  },

  // Advanced
  "template": {
    id: "template",
    name: "template",
    category: "keyword",
    shortDefinition: "Generic programming feature allowing functions/classes to work with any type.",
    example: "template<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}",
    glossarySlug: "templates",
    relatedTerms: ["typename", "generic", "stl"]
  },
  
  "namespace": {
    id: "namespace",
    name: "namespace",
    category: "keyword",
    shortDefinition: "Groups code to prevent name conflicts. std is the standard namespace.",
    example: "namespace MyLib {\n    int add(int a, int b) { return a+b; }\n}\nMyLib::add(1, 2);",
    glossarySlug: "namespaces",
    relatedTerms: ["using", "std", "scope"]
  },
  
  "const": {
    id: "const",
    name: "const",
    category: "keyword",
    shortDefinition: "Makes a variable read-only. Its value cannot be changed after initialization.",
    example: "const int MAX_SIZE = 100;\n// MAX_SIZE = 200; // ERROR!",
    glossarySlug: "const",
    relatedTerms: ["constexpr", "variable"]
  },
  
  "auto": {
    id: "auto",
    name: "auto",
    category: "keyword",
    shortDefinition: "Tells compiler to deduce the variable's type from its initializer (C++11).",
    example: "auto x = 5; // int\nauto pi = 3.14; // double\nauto name = \"Alice\"; // const char*",
    glossarySlug: "auto",
    relatedTerms: ["decltype", "type"]
  },

  // STL Concepts
  "stl": {
    id: "stl",
    name: "STL",
    category: "concept",
    shortDefinition: "Standard Template Library - collection of ready-made containers and algorithms.",
    example: "#include <vector>\n#include <algorithm>\nvector<int> v = {3,1,2};\nsort(v.begin(), v.end());",
    glossarySlug: "stl",
    relatedTerms: ["vector", "map", "algorithm", "iterator"]
  },
  
  "iterator": {
    id: "iterator",
    name: "iterator",
    category: "concept",
    shortDefinition: "Object that points to elements in a container, like a smart pointer.",
    example: "vector<int> v = {1,2,3};\nfor (auto it = v.begin(); it != v.end(); ++it) {\n    cout << *it;\n}",
    glossarySlug: "iterators",
    relatedTerms: ["vector", "pointer", "stl"]
  },
  
  "algorithm": {
    id: "algorithm",
    name: "algorithm",
    category: "stl",
    shortDefinition: "STL header with functions like sort, find, reverse. Requires #include <algorithm>.",
    example: "#include <algorithm>\nvector<int> v = {3,1,2};\nsort(v.begin(), v.end());",
    glossarySlug: "algorithms",
    relatedTerms: ["stl", "iterator", "vector"]
  },

  // Operators
  "operator": {
    id: "operator",
    name: "operator",
    category: "concept",
    shortDefinition: "Symbol that performs operations on values (+, -, *, /, %, ==, !=, etc.).",
    example: "int sum = 5 + 3;\nbool equal = (x == y);\nint mod = 10 % 3;",
    glossarySlug: "operators",
    relatedTerms: ["expression", "precedence"]
  },

  // Memory
  "stack": {
    id: "stack",
    name: "stack",
    category: "concept",
    shortDefinition: "Fast memory for local variables. Automatically managed, limited size.",
    example: "void func() {\n    int x = 5; // on stack\n} // x destroyed automatically",
    glossarySlug: "memory",
    relatedTerms: ["heap", "local", "scope"]
  },
  
  "heap": {
    id: "heap",
    name: "heap",
    category: "concept",
    shortDefinition: "Large memory pool for dynamic allocation with new. Must be freed with delete.",
    example: "int* ptr = new int(42); // on heap\ndelete ptr; // must free manually",
    glossarySlug: "memory",
    relatedTerms: ["stack", "new", "delete", "dynamic"]
  },
  
  "memory-leak": {
    id: "memory-leak",
    name: "memory leak",
    category: "concept",
    shortDefinition: "Bug where allocated memory is never freed, wasting memory over time.",
    example: "void leak() {\n    int* p = new int(5);\n    // forgot delete p!\n} // memory lost!",
    glossarySlug: "memory-leaks",
    relatedTerms: ["new", "delete", "heap", "smart-pointer"]
  },

  // Smart Pointers
  "unique_ptr": {
    id: "unique_ptr",
    name: "unique_ptr",
    category: "stl",
    shortDefinition: "Smart pointer that owns and auto-deletes an object. Cannot be copied.",
    example: "#include <memory>\nunique_ptr<int> p = make_unique<int>(42);\n// auto-deleted when p goes out of scope",
    glossarySlug: "smart-pointers",
    relatedTerms: ["shared_ptr", "pointer", "raii"]
  },
  
  "shared_ptr": {
    id: "shared_ptr",
    name: "shared_ptr",
    category: "stl",
    shortDefinition: "Smart pointer with reference counting. Deletes object when last copy is destroyed.",
    example: "#include <memory>\nshared_ptr<int> p1 = make_shared<int>(42);\nshared_ptr<int> p2 = p1; // shared ownership",
    glossarySlug: "smart-pointers",
    relatedTerms: ["unique_ptr", "weak_ptr", "pointer"]
  }
};

/**
 * Get a term definition by name (case-insensitive)
 */
export function getTermDefinition(term: string): TermDefinition | undefined {
  const normalized = term.toLowerCase().replace(/_/g, '-');
  return termDefinitions[normalized] || termDefinitions[term];
}

/**
 * Get all term names for auto-linking
 */
export function getAllTermNames(): string[] {
  return Object.keys(termDefinitions);
}

/**
 * Check if a word is a known C++ term
 */
export function isCppTerm(word: string): boolean {
  const normalized = word.toLowerCase().replace(/_/g, '-');
  return normalized in termDefinitions || word in termDefinitions;
}
