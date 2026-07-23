/**
 * C++ Term Definitions - Instant popover content
 * No API calls needed - all data embedded for instant display
 */

export interface TermDefinition {
  term: string;
  slug: string;
  category: string;
  shortDefinition: string;
  example?: string;
  relatedTerms?: string[];
}

export const termDefinitions: Record<string, TermDefinition> = {
  // Memory Management
  'pointer': {
    term: 'Pointer',
    slug: 'pointer',
    category: 'Memory',
    shortDefinition: 'A variable that stores a memory address. Use * to declare and & to get address.',
    example: 'int x = 42;\nint* ptr = &x; // ptr points to x\ncout << *ptr;  // prints 42',
    relatedTerms: ['reference', 'address', 'dereference']
  },
  'pointers': {
    term: 'Pointers',
    slug: 'pointer',
    category: 'Memory',
    shortDefinition: 'Variables that store memory addresses. Essential for dynamic memory and data structures.',
    example: 'int* ptr = new int(5);\ndelete ptr;',
    relatedTerms: ['reference', 'memory', 'new', 'delete']
  },
  'reference': {
    term: 'Reference',
    slug: 'reference',
    category: 'Memory',
    shortDefinition: 'An alias for another variable. Declared with & and must be initialized.',
    example: 'int x = 10;\nint& ref = x;  // ref is alias for x\nref = 20;      // x is now 20',
    relatedTerms: ['pointer', 'alias', 'pass-by-reference']
  },
  'nullptr': {
    term: 'nullptr',
    slug: 'nullptr',
    category: 'Memory',
    shortDefinition: 'A null pointer constant (C++11). Safer than NULL or 0.',
    example: 'int* ptr = nullptr;\nif (ptr == nullptr) { /* safe */ }',
    relatedTerms: ['pointer', 'null']
  },
  'new': {
    term: 'new',
    slug: 'new',
    category: 'Memory',
    shortDefinition: 'Allocates memory on the heap. Must be freed with delete.',
    example: 'int* p = new int(5);\nint* arr = new int[10];\ndelete p;\ndelete[] arr;',
    relatedTerms: ['delete', 'heap', 'memory-leak']
  },
  'delete': {
    term: 'delete',
    slug: 'delete',
    category: 'Memory',
    shortDefinition: 'Frees memory allocated with new. Use delete[] for arrays.',
    example: 'int* p = new int(5);\ndelete p;  // free memory',
    relatedTerms: ['new', 'memory-leak', 'heap']
  },
  
  // OOP
  'class': {
    term: 'Class',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'A blueprint for creating objects. Can contain data (members) and functions (methods).',
    example: 'class Dog {\nprivate:\n  string name;\npublic:\n  void bark() { cout << "Woof!"; }\n};',
    relatedTerms: ['object', 'constructor', 'encapsulation']
  },
  'classes': {
    term: 'Classes',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'Blueprints for creating objects with data and behavior.',
    relatedTerms: ['object', 'oop', 'struct']
  },
  'object': {
    term: 'Object',
    slug: 'object',
    category: 'OOP',
    shortDefinition: 'An instance of a class. Contains actual data and can call methods.',
    example: 'Dog myDog;  // myDog is an object of class Dog\nmyDog.bark();',
    relatedTerms: ['class', 'instance', 'constructor']
  },
  'constructor': {
    term: 'Constructor',
    slug: 'constructor',
    category: 'OOP',
    shortDefinition: 'A special function that runs when an object is created. Initializes members.',
    example: 'class Point {\npublic:\n  Point(int x, int y) : x(x), y(y) {}\nprivate:\n  int x, y;\n};',
    relatedTerms: ['destructor', 'initialization', 'class']
  },
  'destructor': {
    term: 'Destructor',
    slug: 'destructor',
    category: 'OOP',
    shortDefinition: 'A special function (~ClassName) that runs when object is destroyed. Cleans up resources.',
    example: 'class File {\npublic:\n  ~File() { close(); }  // cleanup\n};',
    relatedTerms: ['constructor', 'raii', 'cleanup']
  },
  'inheritance': {
    term: 'Inheritance',
    slug: 'inheritance',
    category: 'OOP',
    shortDefinition: 'Creating a new class from an existing class. Child class inherits parent members.',
    example: 'class Animal { };\nclass Dog : public Animal { };  // Dog inherits from Animal',
    relatedTerms: ['polymorphism', 'base-class', 'derived-class']
  },
  'polymorphism': {
    term: 'Polymorphism',
    slug: 'polymorphism',
    category: 'OOP',
    shortDefinition: 'Ability of objects to take multiple forms. Implemented via virtual functions.',
    example: 'virtual void speak() { }  // can be overridden',
    relatedTerms: ['virtual', 'override', 'inheritance']
  },
  'encapsulation': {
    term: 'Encapsulation',
    slug: 'encapsulation',
    category: 'OOP',
    shortDefinition: 'Hiding internal details using private/protected. Access via public methods.',
    example: 'class BankAccount {\nprivate:\n  double balance;  // hidden\npublic:\n  void deposit(double amt) { balance += amt; }\n};',
    relatedTerms: ['private', 'public', 'data-hiding']
  },
  'virtual': {
    term: 'virtual',
    slug: 'virtual',
    category: 'OOP',
    shortDefinition: 'Keyword that allows a function to be overridden in derived classes.',
    example: 'virtual void speak() { cout << "..."; }',
    relatedTerms: ['override', 'polymorphism', 'inheritance']
  },
  'override': {
    term: 'override',
    slug: 'override',
    category: 'OOP',
    shortDefinition: 'Keyword (C++11) that explicitly marks a function as overriding a virtual function.',
    example: 'void speak() override { cout << "Woof!"; }',
    relatedTerms: ['virtual', 'polymorphism']
  },
  
  // STL
  'vector': {
    term: 'vector',
    slug: 'vector',
    category: 'STL',
    shortDefinition: 'A dynamic array that grows automatically. Part of the Standard Template Library.',
    example: 'vector<int> nums = {1, 2, 3};\nnums.push_back(4);  // now {1,2,3,4}',
    relatedTerms: ['array', 'stl', 'container']
  },
  'vectors': {
    term: 'vectors',
    slug: 'vector',
    category: 'STL',
    shortDefinition: 'Dynamic arrays from STL. Use push_back() to add, size() for length.',
    relatedTerms: ['array', 'stl', 'container']
  },
  'array': {
    term: 'array',
    slug: 'array',
    category: 'Data Structures',
    shortDefinition: 'Fixed-size collection of elements of same type. Access via index [0, 1, 2...].',
    example: 'int arr[5] = {1, 2, 3, 4, 5};\ncout << arr[0];  // prints 1',
    relatedTerms: ['vector', 'index', 'subscript']
  },
  'map': {
    term: 'map',
    slug: 'map',
    category: 'STL',
    shortDefinition: 'Stores key-value pairs. Keys are unique and sorted.',
    example: 'map<string, int> ages;\nages["Alice"] = 25;',
    relatedTerms: ['unordered_map', 'pair', 'stl']
  },
  'set': {
    term: 'set',
    slug: 'set',
    category: 'STL',
    shortDefinition: 'Collection of unique elements, automatically sorted.',
    example: 'set<int> numbers = {5, 2, 8, 2};\n// contains: 2, 5, 8',
    relatedTerms: ['multiset', 'unordered_set', 'stl']
  },
  'string': {
    term: 'string',
    slug: 'string',
    category: 'STL',
    shortDefinition: 'Class for text manipulation. Part of STL. Use #include <string>.',
    example: 'string name = "Alice";\nname += " Smith";  // concatenate',
    relatedTerms: ['char', 'text', 'stl']
  },
  
  // Control Flow
  'loop': {
    term: 'Loop',
    slug: 'loop',
    category: 'Control Flow',
    shortDefinition: 'Repeats code multiple times. Types: for, while, do-while.',
    example: 'for (int i = 0; i < 5; i++) {\n  cout << i << " ";\n}',
    relatedTerms: ['for', 'while', 'iteration']
  },
  'for': {
    term: 'for',
    slug: 'for-loop',
    category: 'Control Flow',
    shortDefinition: 'Loop with initialization, condition, and increment in one line.',
    example: 'for (int i = 0; i < 10; i++) { /* code */ }',
    relatedTerms: ['while', 'loop', 'iteration']
  },
  'while': {
    term: 'while',
    slug: 'while-loop',
    category: 'Control Flow',
    shortDefinition: 'Loop that continues while condition is true. Checks condition before each iteration.',
    example: 'while (x < 10) {\n  x++;\n}',
    relatedTerms: ['for', 'do-while', 'loop']
  },
  'if': {
    term: 'if',
    slug: 'if-statement',
    category: 'Control Flow',
    shortDefinition: 'Executes code only if condition is true.',
    example: 'if (x > 0) {\n  cout << "Positive";\n}',
    relatedTerms: ['else', 'else-if', 'condition']
  },
  'switch': {
    term: 'switch',
    slug: 'switch-statement',
    category: 'Control Flow',
    shortDefinition: 'Multi-way branch based on value. More efficient than multiple if-else.',
    example: 'switch (day) {\n  case 1: cout << "Mon"; break;\n  case 2: cout << "Tue"; break;\n}',
    relatedTerms: ['case', 'break', 'if-else']
  },
  
  // Functions
  'function': {
    term: 'Function',
    slug: 'function',
    category: 'Functions',
    shortDefinition: 'Reusable block of code with name, parameters, and return type.',
    example: 'int add(int a, int b) {\n  return a + b;\n}',
    relatedTerms: ['return', 'parameter', 'call']
  },
  'return': {
    term: 'return',
    slug: 'return',
    category: 'Functions',
    shortDefinition: 'Exits function and sends value back to caller.',
    example: 'int square(int x) {\n  return x * x;\n}',
    relatedTerms: ['function', 'void', 'value']
  },
  'void': {
    term: 'void',
    slug: 'void',
    category: 'Functions',
    shortDefinition: 'Means "no value". Used for functions that don\'t return anything.',
    example: 'void printHello() {\n  cout << "Hello";\n  // no return\n}',
    relatedTerms: ['return', 'function']
  },
  
  // Data Types
  'int': {
    term: 'int',
    slug: 'int',
    category: 'Data Types',
    shortDefinition: 'Integer type. Stores whole numbers (usually 4 bytes, range ±2 billion).',
    example: 'int age = 25;\nint negative = -10;',
    relatedTerms: ['long', 'short', 'unsigned']
  },
  'double': {
    term: 'double',
    slug: 'double',
    category: 'Data Types',
    shortDefinition: 'Floating-point type (8 bytes). For decimal numbers with ~15 digits precision.',
    example: 'double pi = 3.14159;\ndouble price = 19.99;',
    relatedTerms: ['float', 'decimal', 'precision']
  },
  'char': {
    term: 'char',
    slug: 'char',
    category: 'Data Types',
    shortDefinition: 'Character type (1 byte). Stores single character like \'A\' or \'5\'.',
    example: 'char letter = \'A\';\nchar digit = \'5\';',
    relatedTerms: ['string', 'ascii', 'character']
  },
  'bool': {
    term: 'bool',
    slug: 'bool',
    category: 'Data Types',
    shortDefinition: 'Boolean type. Only two values: true or false.',
    example: 'bool isValid = true;\nif (isValid) { /* ... */ }',
    relatedTerms: ['true', 'false', 'logical']
  },
  'struct': {
    term: 'struct',
    slug: 'struct',
    category: 'Data Types',
    shortDefinition: 'Groups related variables together. Like a class but members are public by default.',
    example: 'struct Point {\n  int x, y;\n};\nPoint p = {10, 20};',
    relatedTerms: ['class', 'data-structure']
  },
  
  // Keywords
  'const': {
    term: 'const',
    slug: 'const',
    category: 'Keywords',
    shortDefinition: 'Makes a variable read-only. Cannot be modified after initialization.',
    example: 'const int MAX = 100;\n// MAX = 200;  // ERROR!',
    relatedTerms: ['constexpr', 'immutable', 'constant']
  },
  'static': {
    term: 'static',
    slug: 'static',
    category: 'Keywords',
    shortDefinition: 'Variable/function belongs to class, not objects. Shared by all instances.',
    example: 'class Counter {\n  static int count;\n};',
    relatedTerms: ['global', 'scope']
  },
  'namespace': {
    term: 'namespace',
    slug: 'namespace',
    category: 'Keywords',
    shortDefinition: 'Groups related code to avoid name conflicts. std:: is a namespace.',
    example: 'namespace MyApp {\n  int value = 42;\n}\nMyApp::value;',
    relatedTerms: ['std', 'using', 'scope']
  },
  'template': {
    term: 'template',
    slug: 'template',
    category: 'Templates',
    shortDefinition: 'Allows writing generic code that works with any type.',
    example: 'template<typename T>\nT max(T a, T b) {\n  return (a > b) ? a : b;\n}',
    relatedTerms: ['generic', 'typename', 'stl']
  },
  
  // Operators
  'operator': {
    term: 'Operator',
    slug: 'operator',
    category: 'Operators',
    shortDefinition: 'Symbol that performs operation on operands. E.g., +, -, *, /, %, ==, <, &&.',
    example: 'int sum = 5 + 3;  // + is operator\nbool equal = (x == y);',
    relatedTerms: ['arithmetic', 'comparison', 'logical']
  },
  
  // Variables
  'variable': {
    term: 'Variable',
    slug: 'variable',
    category: 'Basics',
    shortDefinition: 'Named storage location with a type. Can be changed (unless const).',
    example: 'int age = 25;  // age is variable\nage = 26;      // can change',
    relatedTerms: ['type', 'declaration', 'assignment']
  },
  
  // Misc
  'std': {
    term: 'std',
    slug: 'std',
    category: 'STL',
    shortDefinition: 'Standard namespace. Contains cout, cin, vector, string, and all STL.',
    example: 'std::cout << "Hello";\nusing namespace std;  // then just: cout',
    relatedTerms: ['namespace', 'stl', 'using']
  },
  'cout': {
    term: 'cout',
    slug: 'cout',
    category: 'I/O',
    shortDefinition: 'Console output. Use << to send data to screen.',
    example: 'cout << "Hello" << endl;\ncout << age << " years";',
    relatedTerms: ['cin', 'iostream', 'output']
  },
  'cin': {
    term: 'cin',
    slug: 'cin',
    category: 'I/O',
    shortDefinition: 'Console input. Use >> to read user input.',
    example: 'int age;\ncin >> age;  // user types number',
    relatedTerms: ['cout', 'iostream', 'input']
  },
  'endl': {
    term: 'endl',
    slug: 'endl',
    category: 'I/O',
    shortDefinition: 'End line. Adds newline and flushes output buffer.',
    example: 'cout << "Hello" << endl;  // moves to next line',
    relatedTerms: ['cout', 'newline', '\\n']
  },
};

// Helper to get term definition (case-insensitive)
export function getTermDefinition(term: string): TermDefinition | undefined {
  const normalized = term.toLowerCase().trim();
  return termDefinitions[normalized];
}

// Get all terms for a category
export function getTermsByCategory(category: string): TermDefinition[] {
  return Object.values(termDefinitions).filter(t => t.category === category);
}

// Search terms
export function searchTerms(query: string): TermDefinition[] {
  const q = query.toLowerCase();
  return Object.values(termDefinitions).filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.shortDefinition.toLowerCase().includes(q)
  );
}
