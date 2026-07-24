/**
 * Multi-Language Term Definitions
 * Language-specific term definitions with instant popover content
 */

import type { LanguageId } from '@/config/languages';

export interface TermDefinition {
  term: string;
  slug: string;
  category: string;
  shortDefinition: string;
  example?: string;
  relatedTerms?: string[];
}

// C++ Term Definitions
const cppTerms: Record<string, TermDefinition> = {
  'pointer': {
    term: 'Pointer',
    slug: 'pointer',
    category: 'Memory',
    shortDefinition: 'A variable that stores a memory address. Use * to declare and & to get address.',
    example: 'int x = 42;\nint* ptr = &x; // ptr points to x\ncout << *ptr;  // prints 42',
    relatedTerms: ['reference', 'address', 'dereference']
  },
  'class': {
    term: 'Class',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'A blueprint for creating objects. Can contain data (members) and functions (methods).',
    example: 'class Dog {\nprivate:\n  string name;\npublic:\n  void bark() { cout << "Woof!"; }\n};',
    relatedTerms: ['object', 'constructor', 'encapsulation']
  },
  'vector': {
    term: 'vector',
    slug: 'vector',
    category: 'STL',
    shortDefinition: 'A dynamic array that grows automatically. Part of the Standard Template Library.',
    example: 'vector<int> nums = {1, 2, 3};\nnums.push_back(4);  // now {1,2,3,4}',
    relatedTerms: ['array', 'stl', 'container']
  },
  'function': {
    term: 'Function',
    slug: 'function',
    category: 'Functions',
    shortDefinition: 'Reusable block of code with name, parameters, and return type.',
    example: 'int add(int a, int b) {\n  return a + b;\n}',
    relatedTerms: ['return', 'parameter', 'call']
  },
  'loop': {
    term: 'Loop',
    slug: 'loop',
    category: 'Control Flow',
    shortDefinition: 'Repeats code multiple times. Types: for, while, do-while.',
    example: 'for (int i = 0; i < 5; i++) {\n  cout << i << " ";\n}',
    relatedTerms: ['for', 'while', 'iteration']
  },
};

// Python Term Definitions
const pythonTerms: Record<string, TermDefinition> = {
  'variable': {
    term: 'Variable',
    slug: 'variable',
    category: 'Basics',
    shortDefinition: 'A named location in memory that stores a value. No type declaration needed in Python.',
    example: 'name = "Alice"\nage = 25\nheight = 5.7',
    relatedTerms: ['data type', 'assignment', 'scope']
  },
  'function': {
    term: 'Function',
    slug: 'function',
    category: 'Functions',
    shortDefinition: 'A reusable block of code defined with def keyword.',
    example: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))',
    relatedTerms: ['def', 'return', 'parameter']
  },
  'list': {
    term: 'List',
    slug: 'list',
    category: 'Data Structures',
    shortDefinition: 'An ordered, mutable collection of items enclosed in square brackets.',
    example: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nprint(fruits[0])  # apple',
    relatedTerms: ['tuple', 'dictionary', 'set']
  },
  'dictionary': {
    term: 'Dictionary',
    slug: 'dictionary',
    category: 'Data Structures',
    shortDefinition: 'An unordered collection of key-value pairs enclosed in curly braces.',
    example: 'person = {"name": "Alice", "age": 25}\nprint(person["name"])  # Alice',
    relatedTerms: ['list', 'key', 'value']
  },
  'class': {
    term: 'Class',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'A blueprint for creating objects with attributes and methods.',
    example: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print("Woof!")',
    relatedTerms: ['object', 'method', 'self', '__init__']
  },
  'for': {
    term: 'for',
    slug: 'for-loop',
    category: 'Control Flow',
    shortDefinition: 'Loop that iterates over a sequence (list, tuple, string, range, etc.).',
    example: 'for i in range(5):\n    print(i)  # prints 0, 1, 2, 3, 4',
    relatedTerms: ['while', 'loop', 'range']
  },
  'if': {
    term: 'if',
    slug: 'if-statement',
    category: 'Control Flow',
    shortDefinition: 'Conditional statement that executes code if condition is True.',
    example: 'if age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
    relatedTerms: ['elif', 'else', 'condition']
  },
  'def': {
    term: 'def',
    slug: 'def',
    category: 'Keywords',
    shortDefinition: 'Keyword used to define a function in Python.',
    example: 'def calculate_area(width, height):\n    return width * height',
    relatedTerms: ['function', 'return', 'parameter']
  },
  'import': {
    term: 'import',
    slug: 'import',
    category: 'Modules',
    shortDefinition: 'Keyword to include external modules or packages in your program.',
    example: 'import math\nprint(math.pi)  # 3.14159...',
    relatedTerms: ['module', 'package', 'from']
  },
  'self': {
    term: 'self',
    slug: 'self',
    category: 'OOP',
    shortDefinition: 'Reference to the current instance of a class. Used to access instance variables.',
    example: 'class Person:\n    def __init__(self, name):\n        self.name = name',
    relatedTerms: ['class', 'method', '__init__']
  },
};

// Java Term Definitions
const javaTerms: Record<string, TermDefinition> = {
  'class': {
    term: 'Class',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'A blueprint for creating objects. Java programs are built around classes.',
    example: 'public class Dog {\n    private String name;\n    public void bark() {\n        System.out.println("Woof!");\n    }\n}',
    relatedTerms: ['object', 'constructor', 'method']
  },
  'method': {
    term: 'Method',
    slug: 'method',
    category: 'Functions',
    shortDefinition: 'A function defined inside a class. Performs actions on objects.',
    example: 'public int add(int a, int b) {\n    return a + b;\n}',
    relatedTerms: ['function', 'class', 'return']
  },
  'variable': {
    term: 'Variable',
    slug: 'variable',
    category: 'Basics',
    shortDefinition: 'A named storage location with a declared type.',
    example: 'int age = 25;\nString name = "Alice";\ndouble price = 19.99;',
    relatedTerms: ['type', 'declaration', 'assignment']
  },
  'array': {
    term: 'Array',
    slug: 'array',
    category: 'Data Structures',
    shortDefinition: 'Fixed-size collection of elements of the same type.',
    example: 'int[] numbers = {1, 2, 3, 4, 5};\nString[] names = new String[10];',
    relatedTerms: ['ArrayList', 'collection', 'index']
  },
  'interface': {
    term: 'Interface',
    slug: 'interface',
    category: 'OOP',
    shortDefinition: 'A contract that classes can implement. Contains method signatures without implementation.',
    example: 'public interface Animal {\n    void makeSound();\n    void move();\n}',
    relatedTerms: ['implements', 'abstract', 'class']
  },
  'public': {
    term: 'public',
    slug: 'public',
    category: 'Access Modifiers',
    shortDefinition: 'Access modifier that makes members accessible from anywhere.',
    example: 'public class MyClass {\n    public int value;\n    public void display() { }\n}',
    relatedTerms: ['private', 'protected', 'access-control']
  },
  'static': {
    term: 'static',
    slug: 'static',
    category: 'Keywords',
    shortDefinition: 'Belongs to the class rather than instances. Shared by all objects.',
    example: 'public static int count = 0;\npublic static void main(String[] args) { }',
    relatedTerms: ['class', 'method', 'final']
  },
};

// JavaScript Term Definitions
const javascriptTerms: Record<string, TermDefinition> = {
  'variable': {
    term: 'Variable',
    slug: 'variable',
    category: 'Basics',
    shortDefinition: 'Storage location declared with let, const, or var.',
    example: 'let name = "Alice";\nconst age = 25;\nvar old = "avoid this";',
    relatedTerms: ['let', 'const', 'var']
  },
  'function': {
    term: 'Function',
    slug: 'function',
    category: 'Functions',
    shortDefinition: 'Reusable block of code. Can be declared with function keyword or arrow syntax.',
    example: 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconst greet2 = (name) => `Hello, ${name}!`;',
    relatedTerms: ['arrow function', 'return', 'callback']
  },
  'arrow function': {
    term: 'Arrow Function',
    slug: 'arrow-function',
    category: 'Functions',
    shortDefinition: 'Concise function syntax using =>. Lexically binds this.',
    example: 'const add = (a, b) => a + b;\nconst square = x => x * x;',
    relatedTerms: ['function', 'this', 'callback']
  },
  'array': {
    term: 'Array',
    slug: 'array',
    category: 'Data Structures',
    shortDefinition: 'Ordered collection of values. Can hold any types.',
    example: 'const fruits = ["apple", "banana", "cherry"];\nfruits.push("orange");\nconsole.log(fruits[0]);',
    relatedTerms: ['object', 'map', 'filter']
  },
  'object': {
    term: 'Object',
    slug: 'object',
    category: 'Data Structures',
    shortDefinition: 'Collection of key-value pairs enclosed in curly braces.',
    example: 'const person = {\n    name: "Alice",\n    age: 25,\n    greet() { console.log("Hi!"); }\n};',
    relatedTerms: ['class', 'property', 'method']
  },
  'const': {
    term: 'const',
    slug: 'const',
    category: 'Keywords',
    shortDefinition: 'Declares a constant variable that cannot be reassigned.',
    example: 'const PI = 3.14159;\nconst name = "Alice";\n// name = "Bob"; // Error!',
    relatedTerms: ['let', 'var', 'immutable']
  },
  'let': {
    term: 'let',
    slug: 'let',
    category: 'Keywords',
    shortDefinition: 'Declares a block-scoped variable that can be reassigned.',
    example: 'let count = 0;\ncount = 1;  // OK\nlet name = "Alice";',
    relatedTerms: ['const', 'var', 'scope']
  },
  'promise': {
    term: 'Promise',
    slug: 'promise',
    category: 'Async',
    shortDefinition: 'Object representing eventual completion or failure of an async operation.',
    example: 'const promise = new Promise((resolve, reject) => {\n    setTimeout(() => resolve("Done!"), 1000);\n});',
    relatedTerms: ['async', 'await', 'then']
  },
  'async': {
    term: 'async',
    slug: 'async',
    category: 'Async',
    shortDefinition: 'Keyword that makes a function return a Promise.',
    example: 'async function fetchData() {\n    const data = await fetch(url);\n    return data.json();\n}',
    relatedTerms: ['await', 'promise', 'then']
  },
};

// TypeScript Term Definitions  
const typescriptTerms: Record<string, TermDefinition> = {
  'type': {
    term: 'Type',
    slug: 'type',
    category: 'Type System',
    shortDefinition: 'Defines the shape of data. TypeScript\'s main feature.',
    example: 'type User = {\n    name: string;\n    age: number;\n};\n\nconst user: User = { name: "Alice", age: 25 };',
    relatedTerms: ['interface', 'annotation', 'inference']
  },
  'interface': {
    term: 'Interface',
    slug: 'interface',
    category: 'Type System',
    shortDefinition: 'Defines the structure of an object. Similar to type but extendable.',
    example: 'interface Person {\n    name: string;\n    age: number;\n    greet(): void;\n}',
    relatedTerms: ['type', 'class', 'extends']
  },
  'class': {
    term: 'Class',
    slug: 'class',
    category: 'OOP',
    shortDefinition: 'Blueprint for creating objects with typed properties and methods.',
    example: 'class Dog {\n    constructor(public name: string) {}\n    bark(): void {\n        console.log("Woof!");\n    }\n}',
    relatedTerms: ['interface', 'constructor', 'method']
  },
  'generic': {
    term: 'Generic',
    slug: 'generic',
    category: 'Type System',
    shortDefinition: 'Type parameter that allows writing flexible, reusable code.',
    example: 'function identity<T>(arg: T): T {\n    return arg;\n}\n\nidentity<number>(42);',
    relatedTerms: ['type', 'template', 'constraint']
  },
  'enum': {
    term: 'Enum',
    slug: 'enum',
    category: 'Type System',
    shortDefinition: 'A way to define named constants for a set of related values.',
    example: 'enum Color {\n    Red,\n    Green,\n    Blue\n}\n\nconst c: Color = Color.Red;',
    relatedTerms: ['const', 'type', 'union']
  },
  'union': {
    term: 'Union Type',
    slug: 'union',
    category: 'Type System',
    shortDefinition: 'A type that can be one of several types, separated by |.',
    example: 'type Result = string | number;\nlet value: Result = "hello";\nvalue = 42;  // also valid',
    relatedTerms: ['intersection', 'type', 'or']
  },
  'any': {
    term: 'any',
    slug: 'any',
    category: 'Type System',
    shortDefinition: 'Opt-out of type checking. Use sparingly.',
    example: 'let value: any = 42;\nvalue = "hello";  // no error\nvalue.foo();  // no error',
    relatedTerms: ['unknown', 'never', 'type-safety']
  },
  'const': {
    term: 'const',
    slug: 'const',
    category: 'Keywords',
    shortDefinition: 'Declares a constant variable with type inference.',
    example: 'const name: string = "Alice";\nconst age = 25;  // inferred as number',
    relatedTerms: ['let', 'var', 'type']
  },
};

// Language-specific term collections
const termsByLanguage: Record<LanguageId, Record<string, TermDefinition>> = {
  cpp: cppTerms,
  python: pythonTerms,
  java: javaTerms,
  javascript: javascriptTerms,
  typescript: typescriptTerms,
};

/**
 * Get term definition for a specific language
 */
export function getTermDefinition(term: string, language: LanguageId): TermDefinition | undefined {
  const normalized = term.toLowerCase().trim();
  const terms = termsByLanguage[language] || termsByLanguage.cpp;
  return terms[normalized];
}

/**
 * Get all terms for a language
 */
export function getTermsForLanguage(language: LanguageId): Record<string, TermDefinition> {
  return termsByLanguage[language] || termsByLanguage.cpp;
}

/**
 * Get terms by category for a language
 */
export function getTermsByCategory(category: string, language: LanguageId): TermDefinition[] {
  const terms = getTermsForLanguage(language);
  return Object.values(terms).filter(t => t.category === category);
}

/**
 * Search terms for a language
 */
export function searchTerms(query: string, language: LanguageId): TermDefinition[] {
  const q = query.toLowerCase();
  const terms = getTermsForLanguage(language);
  return Object.values(terms).filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.shortDefinition.toLowerCase().includes(q)
  );
}
