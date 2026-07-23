// Auto-generated file - do not edit manually
// Generated from API server data files
// This file re-exports glossary, lesson, and quiz data for static builds

export interface GlossaryTermData {
  term: string;
  slug: string;
  shortDefinition: string;
  category: string;
  definition: string;
  whyItExists: string;
  syntax: string;
  analogy: string;
  codeExample: string;
  commonMistakes: string[];
  bestPractices: string[];
  relatedTerms: string[];
}

export const glossaryTerms: GlossaryTermData[] = [
  {
    term: "class",
    slug: "class",
    shortDefinition: "A blueprint for creating objects that bundles data and behavior together.",
    category: "OOP",
    definition: "A class is a user-defined type that encapsulates data (attributes) and functions (methods) into a single unit. It serves as a blueprint from which objects (instances) are created.",
    whyItExists: "Classes allow you to model real-world entities in code, grouping related data and behavior together. Without classes, you'd have unorganized global variables and functions scattered everywhere.",
    syntax: `class Dog {
public:
    string name;
    int age;
    void bark() {
        cout << name << " says: Woof!" << endl;
    }
};`,
    analogy: "A class is like an architectural blueprint for a house. The blueprint (class) defines what every house (object) built from it will look like — rooms, doors, windows. But the blueprint itself is not a house; you build actual houses from it.",
    codeExample: `class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area()      { return width * height; }
    double perimeter() { return 2 * (width + height); }
};

Rectangle r(5.0, 3.0);
cout << r.area();       // 15
cout << r.perimeter();  // 16`,
    commonMistakes: [
      "Forgetting the semicolon ; after the closing brace }",
      "Trying to access private members from outside the class",
      "Forgetting to define the constructor when you need to initialize attributes",
      "Using = in a class definition instead of {}",
    ],
    bestPractices: [
      "Keep data members private; expose them through public methods",
      "Give the class a single, clear responsibility",
      "Always define a destructor if you allocate heap memory",
      "Use PascalCase naming for classes (BankAccount, not bankAccount)",
    ],
    relatedTerms: ["object", "constructor", "destructor", "inheritance", "encapsulation"],
  },
  {
    term: "pointer",
    slug: "pointer",
    shortDefinition: "A variable that stores the memory address of another variable.",
    category: "Memory",
    definition: "A pointer is a variable that holds the memory address (location) of another variable rather than a direct value. It allows indirect access and modification of data through the address.",
    whyItExists: "Pointers enable dynamic memory allocation, passing large objects efficiently to functions, implementing data structures like linked lists and trees, and interfacing with hardware at the system level.",
    syntax: `int x = 42;
int* ptr = &x;   // ptr holds x's address
cout << *ptr;    // dereference: access value at address → 42
*ptr = 100;      // modify original variable through pointer`,
    analogy: "A pointer is like a sticky note with an address written on it. The sticky note (pointer) doesn't hold the house (value) itself — it just tells you WHERE to find it. Following the address to visit the house is 'dereferencing'.",
    codeExample: `void doubleValue(int* ptr) {
    *ptr = *ptr * 2;   // modify original through pointer
}

int main() {
    int num = 5;
    doubleValue(&num);   // pass address of num
    cout << num;         // 10 — original was modified!
}`,
    commonMistakes: [
      "Dereferencing a null or uninitialized pointer (causes crash)",
      "Using delete on stack memory (only use delete on heap memory)",
      "Forgetting to call delete, causing memory leaks",
      "Using a pointer after the memory it points to has been freed (dangling pointer)",
    ],
    bestPractices: [
      "Initialize pointers immediately — either to an address or nullptr",
      "Set pointers to nullptr after delete to prevent dangling pointers",
      "Prefer smart pointers (unique_ptr, shared_ptr) in modern C++",
      "Prefer references over pointers when you don't need reassignment or null",
    ],
    relatedTerms: ["reference", "new", "delete", "nullptr", "memory leak", "stack", "heap"],
  },
  {
    term: "reference",
    slug: "reference",
    shortDefinition: "An alias (alternative name) for an existing variable — no copying, always valid.",
    category: "Memory",
    definition: "A reference is a safer, simpler alternative to a pointer. It creates an alias for an existing variable. Unlike pointers, references cannot be null, cannot be reassigned to refer to a different variable, and don't need dereferencing syntax.",
    whyItExists: "References allow passing large objects to functions without copying them (efficiency) and allow functions to modify the caller's variables, while being safer and simpler than pointers.",
    syntax: `int x = 42;
int& ref = x;   // ref is another name for x
ref = 100;      // this changes x too!
cout << x;      // 100`,
    analogy: "A reference is like a nickname. If your name is 'Alexander' and your friends call you 'Alex', both names refer to the same person. Changing something about Alex changes Alexander too — they're the same person.",
    codeExample: `void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 10, y = 20;
swap(x, y);
cout << x << " " << y;  // 20 10 — originals swapped!`,
    commonMistakes: [
      "Trying to create a reference without initializing it (must bind on declaration)",
      "Confusing & in a declaration (creates reference) vs & in an expression (gets address)",
      "Returning a reference to a local variable (undefined behavior after function returns)",
    ],
    bestPractices: [
      "Use const references (const Type&) for large read-only parameters",
      "Prefer references over pointers when null is not a valid state",
      "Use pass-by-reference for large objects to avoid expensive copies",
    ],
    relatedTerms: ["pointer", "pass by reference", "pass by value"],
  },
  {
    term: "constructor",
    slug: "constructor",
    shortDefinition: "A special function that runs automatically when an object is created.",
    category: "OOP",
    definition: "A constructor is a special member function of a class that is called automatically whenever an object of that class is created. It has the same name as the class and no return type. Its purpose is to initialize the object's attributes.",
    whyItExists: "Without constructors, you'd have to manually initialize every attribute after creating each object — error-prone and repetitive. Constructors guarantee objects start in a valid, well-defined state.",
    syntax: `class Dog {
public:
    string name;
    int age;
    
    Dog(string n, int a) {  // constructor
        name = n;
        age = a;
    }
};

Dog myDog("Rex", 3);   // constructor called automatically`,
    analogy: "A constructor is like a factory setup process. When a car factory creates a new car, it automatically runs through a setup checklist: install engine, add wheels, paint the body. You don't manually do each step — the factory process (constructor) handles it.",
    codeExample: `class BankAccount {
private:
    string owner;
    double balance;
public:
    // Constructor with default value
    BankAccount(string name, double initial = 0.0)
        : owner(name), balance(initial) {}
    
    void showInfo() {
        cout << owner << ": $" << balance << endl;
    }
};

BankAccount acc1("Alice", 500.0);
BankAccount acc2("Bob");   // uses default balance = 0.0
acc1.showInfo();  // Alice: $500
acc2.showInfo();  // Bob: $0`,
    commonMistakes: [
      "Giving the constructor a return type (it should have none)",
      "Misspelling the constructor name (must exactly match the class name)",
      "Not initializing all attributes in the constructor",
    ],
    bestPractices: [
      "Use member initializer lists (: name(n), age(a)) for efficiency",
      "Provide default values for parameters when sensible",
      "Always initialize all member variables in the constructor",
    ],
    relatedTerms: ["destructor", "class", "object", "member initializer list"],
  },
  {
    term: "destructor",
    slug: "destructor",
    shortDefinition: "A special function that runs automatically when an object is destroyed, used to clean up resources.",
    category: "OOP",
    definition: "A destructor is a special member function called automatically when an object goes out of scope or is deleted. It performs cleanup — typically freeing heap memory or releasing other resources (file handles, network connections).",
    whyItExists: "Without destructors, objects that own heap memory or resources would leak them when destroyed. Destructors ensure proper cleanup happens automatically, preventing memory leaks.",
    syntax: `class MyClass {
public:
    ~MyClass() {  // ~ prefix identifies destructor
        // cleanup code here
    }
};`,
    analogy: "A destructor is like the cleaning crew after an event. When the event (object's life) ends, the cleaning crew (destructor) automatically comes in to tidy up — returning tables, disposing of trash (freeing resources).",
    codeExample: `class DynamicArray {
private:
    int* data;
    int size;
public:
    DynamicArray(int n) : size(n) {
        data = new int[n];   // allocate on heap
        cout << "Array created." << endl;
    }
    
    ~DynamicArray() {        // destructor
        delete[] data;       // free heap memory
        cout << "Array destroyed." << endl;
    }
};

int main() {
    DynamicArray arr(10);    // constructor called
    // ... use arr ...
}                            // destructor called automatically here!`,
    commonMistakes: [
      "Forgetting the ~ prefix",
      "Not declaring the destructor virtual in a base class",
      "Calling delete on the same memory twice (double-free)",
    ],
    bestPractices: [
      "Always declare the destructor virtual in base classes meant for inheritance",
      "If you define a destructor, also define a copy constructor and assignment operator (Rule of Three)",
      "In modern C++, use smart pointers to avoid manual destructors",
    ],
    relatedTerms: ["constructor", "class", "memory leak", "delete", "virtual"],
  },
  {
    term: "vector",
    slug: "vector",
    shortDefinition: "A resizable dynamic array from the C++ Standard Template Library.",
    category: "STL",
    definition: "std::vector is the most commonly used container in C++. It's a dynamically-sized array that automatically grows when you add elements. Unlike raw arrays, vectors manage their own memory and provide bounds-safe operations.",
    whyItExists: "Raw arrays in C++ have fixed size determined at compile time. Real programs often need collections whose size is only known at runtime. Vector provides a safe, flexible, resizable sequence with the same O(1) access as arrays.",
    syntax: `#include <vector>
using namespace std;

vector<int> numbers;         // empty vector
vector<int> primes = {2, 3, 5, 7, 11};
numbers.push_back(10);      // add element
numbers.pop_back();         // remove last element
cout << primes[0];          // access by index: 2
cout << primes.size();      // number of elements: 5`,
    analogy: "A vector is like a magical stretchy bag. A regular bag (array) has a fixed size — you can't put more items than it holds. The magic bag (vector) automatically gets bigger when you add more items.",
    codeExample: `#include <iostream>
#include <vector>
#include <algorithm>  // for sort
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78, 95, 88};
    
    // Add more scores
    scores.push_back(91);
    
    // Sort them
    sort(scores.begin(), scores.end());
    
    // Iterate
    for (int s : scores) {
        cout << s << " ";
    }
    
    cout << endl;
    cout << "Count: " << scores.size() << endl;
    cout << "Max: "   << scores.back() << endl;
    
    return 0;
}`,
    commonMistakes: [
      "Accessing out-of-bounds index (use at() instead of [] for bounds checking)",
      "Forgetting #include <vector>",
      "Modifying a vector while iterating over it (use index-based loop if modifying)",
    ],
    bestPractices: [
      "Prefer vector over raw arrays almost always",
      "Use reserve() if you know the final size — avoids repeated reallocations",
      "Use range-based for loops for clean iteration: for (auto& x : vec)",
      "Use at() for bounds-checked access during development",
    ],
    relatedTerms: ["array", "STL", "template", "iterator"],
  },
  {
    term: "inheritance",
    slug: "inheritance",
    shortDefinition: "A mechanism where a class acquires properties and methods of another class.",
    category: "OOP",
    definition: "Inheritance allows a class (derived/child) to inherit all public and protected attributes and methods from another class (base/parent). The derived class can add new members and override existing ones.",
    whyItExists: "Inheritance enables code reuse. Instead of rewriting common behavior for every new class, you define it once in a base class and inherit it. 'Is-a' relationships (Dog is-an Animal) are modeled with inheritance.",
    syntax: `class Animal {          // base class
public:
    string name;
    void breathe() { cout << "Breathing..." << endl; }
};

class Dog : public Animal {   // Dog inherits from Animal
public:
    void bark() { cout << "Woof!" << endl; }
};

Dog d;
d.breathe();   // inherited from Animal
d.bark();      // Dog's own method`,
    analogy: "Inheritance is like a family. Children inherit traits from their parents (eye color, height tendencies) but also have their own unique characteristics. A Dog inherits basic Animal behaviors (breathing, moving) but adds its own (barking).",
    codeExample: `class Shape {
public:
    string color;
    Shape(string c) : color(c) {}
    virtual double area() { return 0; }
    void showColor() { cout << "Color: " << color << endl; }
};

class Circle : public Shape {
    double radius;
public:
    Circle(string c, double r) : Shape(c), radius(r) {}
    double area() override { return 3.14159 * radius * radius; }
};

class Square : public Shape {
    double side;
public:
    Square(string c, double s) : Shape(c), side(s) {}
    double area() override { return side * side; }
};`,
    commonMistakes: [
      "Forgetting to call the base class constructor in the derived constructor",
      "Not using virtual for methods you want to override (leads to wrong function call)",
      "Creating deep inheritance chains (prefer composition over deep inheritance)",
    ],
    bestPractices: [
      "Always declare the base class destructor as virtual",
      "Use override keyword in derived classes to catch typos",
      "Prefer composition ('has-a') over inheritance ('is-a') when unsure",
      "Keep inheritance hierarchies shallow (1-2 levels usually enough)",
    ],
    relatedTerms: ["class", "polymorphism", "virtual", "encapsulation", "object"],
  },
  {
    term: "polymorphism",
    slug: "polymorphism",
    shortDefinition: "The ability of objects of different types to be treated through a common interface, with each behaving appropriately.",
    category: "OOP",
    definition: "Polymorphism means 'many forms'. In C++, it allows a base class pointer or reference to point to derived class objects and call the appropriate overridden method at runtime through virtual functions.",
    whyItExists: "Polymorphism enables writing generic code that works with objects of different types without knowing their exact type. You can write a function that processes any Animal without caring if it's a Dog, Cat, or Bird.",
    syntax: `// Base pointer to derived object
Animal* a = new Dog("Rex");
a->makeSound();  // calls Dog's version (if makeSound is virtual)

// Works with references too
Animal& ref = myDog;
ref.makeSound();  // calls Dog's version`,
    analogy: "Polymorphism is like a universal remote control. The remote (base interface) has buttons for 'power', 'volume', 'channel'. Whether you aim it at a TV, sound system, or DVD player (derived objects), pressing 'volume up' does the right thing for each device.",
    codeExample: `class Animal {
public:
    string name;
    Animal(string n) : name(n) {}
    virtual void speak() {
        cout << name << " makes a sound." << endl;
    }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() override { cout << name << ": Woof!" << endl; }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    void speak() override { cout << name << ": Meow!" << endl; }
};

// Polymorphism in action:
vector<Animal*> animals = {
    new Dog("Rex"), new Cat("Whiskers"), new Dog("Max")
};

for (Animal* a : animals) {
    a->speak();   // calls the RIGHT speak() for each object
}`,
    commonMistakes: [
      "Forgetting the virtual keyword (static dispatch instead of dynamic dispatch)",
      "Not using override keyword in derived classes",
      "Slicing: assigning derived object to base object (not pointer/reference) loses derived data",
    ],
    bestPractices: [
      "Mark functions virtual in the base class if they might be overridden",
      "Always use override in derived classes",
      "Use virtual ~Base() to prevent undefined behavior when deleting through base pointer",
    ],
    relatedTerms: ["virtual", "inheritance", "override", "encapsulation", "class"],
  },
  {
    term: "encapsulation",
    slug: "encapsulation",
    shortDefinition: "Bundling data and methods together and hiding internal details behind a public interface.",
    category: "OOP",
    definition: "Encapsulation is the OOP principle of hiding an object's internal state and requiring all interaction to go through well-defined public methods. In C++, this means making data members private and providing public getters/setters.",
    whyItExists: "Without encapsulation, any code anywhere can modify your object's data, potentially putting it in an invalid state. Encapsulation prevents misuse, enables validation, and lets you change the internal implementation without breaking other code.",
    syntax: `class Temperature {
private:
    double celsius;   // hidden from outside
public:
    void setCelsius(double c) {
        if (c >= -273.15) celsius = c;  // validate!
    }
    double getCelsius() { return celsius; }
    double getFahrenheit() { return celsius * 9/5 + 32; }
};`,
    analogy: "Encapsulation is like an ATM machine. You interact with it through defined buttons (public interface: deposit, withdraw, balance). The machine's internal mechanics — how it verifies your card, counts cash — are hidden from you (private). You can't reach in and grab money directly.",
    codeExample: `class Circle {
private:
    double radius;       // hidden

public:
    Circle(double r) {
        setRadius(r);    // use setter for validation
    }
    
    void setRadius(double r) {
        if (r < 0) {
            cout << "Error: negative radius!" << endl;
            radius = 0;
        } else {
            radius = r;
        }
    }
    
    double getRadius() { return radius; }
    double area()      { return 3.14159 * radius * radius; }
    double circumference() { return 2 * 3.14159 * radius; }
};`,
    commonMistakes: [
      "Making all members public 'for convenience' (defeats encapsulation)",
      "Writing getters AND setters for everything (consider whether a setter is truly needed)",
      "Returning references to private data (allows bypass of encapsulation)",
    ],
    bestPractices: [
      "Default to private — only make public what needs to be",
      "Add validation in setters to ensure valid state",
      "Return by value from getters when possible to avoid exposing internal state",
    ],
    relatedTerms: ["class", "inheritance", "polymorphism", "abstraction", "getter", "setter"],
  },
  {
    term: "template",
    slug: "template",
    shortDefinition: "A mechanism to write generic code that works with multiple types without duplication.",
    category: "Generic Programming",
    definition: "Templates allow writing functions and classes that work with any data type. Instead of writing separate functions for int, double, string, etc., you write one template and the compiler generates the correct version for each type.",
    whyItExists: "Without templates, you'd need to duplicate function/class code for every type you want to support. Templates enable the STL — vector<T>, map<K,V>, sort() all use templates.",
    syntax: `template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

cout << maximum(3, 7);       // works with int
cout << maximum(3.14, 2.71); // works with double
cout << maximum('A', 'Z');   // works with char`,
    analogy: "A template is like a cookie cutter. The cutter (template) defines the shape. You can use it with any dough (type) — chocolate, vanilla, gingerbread. The cutter works the same way; only the material differs.",
    codeExample: `#include <iostream>
using namespace std;

template <typename T>
T clamp(T value, T low, T high) {
    if (value < low)  return low;
    if (value > high) return high;
    return value;
}

int main() {
    cout << clamp(5, 1, 10);     // 5   (within range)
    cout << clamp(-3, 0, 100);   // 0   (below min)
    cout << clamp(200, 0, 100);  // 100 (above max)
    cout << clamp(3.14, 0.0, 1.0); // 1.0
}`,
    commonMistakes: [
      "Using template functions with types that don't support the required operations",
      "Putting template definitions in .cpp files (they must be in headers)",
    ],
    bestPractices: [
      "Put template function and class definitions in header files",
      "Use concepts (C++20) to constrain template types when possible",
      "Prefer STL containers and algorithms over writing custom templates",
    ],
    relatedTerms: ["vector", "STL", "generic programming"],
  },
  {
    term: "array",
    slug: "array",
    shortDefinition: "A fixed-size sequence of elements of the same type stored contiguously in memory.",
    category: "Data Structures",
    definition: "An array is a fixed-size collection of elements of the same type. Elements are stored contiguously in memory, enabling O(1) random access by index. The size must be known at compile time for stack arrays.",
    whyItExists: "Arrays are the most fundamental data structure. They provide the cheapest possible storage for a sequence of values — no overhead, direct memory access. They are the foundation of all higher-level data structures.",
    syntax: `int scores[5] = {90, 85, 92, 78, 95};
cout << scores[0];   // first element: 90
cout << scores[4];   // last element: 95
// scores[5] would be out of bounds!

// 2D array
int matrix[3][3] = {{1,2,3},{4,5,6},{7,8,9}};`,
    analogy: "An array is like a parking lot with numbered spaces. Each space (index) can hold one car (element). You access space 5 directly without checking spaces 1-4. But the lot has a fixed number of spaces — you can't add more later.",
    codeExample: `#include <iostream>
using namespace std;

int main() {
    const int SIZE = 5;
    int arr[SIZE] = {3, 1, 4, 1, 5};
    
    // Find maximum
    int max = arr[0];
    for (int i = 1; i < SIZE; i++) {
        if (arr[i] > max) max = arr[i];
    }
    
    cout << "Max: " << max << endl;
    
    // sizeof trick for array length
    int len = sizeof(arr) / sizeof(arr[0]);
    cout << "Length: " << len << endl;
    
    return 0;
}`,
    commonMistakes: [
      "Accessing out-of-bounds index (behavior is undefined, often a crash)",
      "Confusing array size with the last valid index (array of size 5: indices 0-4)",
      "Trying to change the size of a stack array at runtime (impossible)",
    ],
    bestPractices: [
      "Prefer std::vector over raw arrays for most cases",
      "Use std::array<T, N> for fixed-size arrays with STL compatibility",
      "Never use magic numbers for array sizes — use const or constexpr",
    ],
    relatedTerms: ["vector", "pointer", "index"],
  },
  {
    term: "recursion",
    slug: "recursion",
    shortDefinition: "A function that calls itself to solve a smaller version of the same problem.",
    category: "Programming Concepts",
    definition: "Recursion is a programming technique where a function solves a problem by calling itself with a simpler input. Every recursive function needs a base case (when to stop) and a recursive case (how to reduce the problem).",
    whyItExists: "Some problems are naturally recursive — file system traversal, tree operations, divide-and-conquer algorithms. Recursion expresses these solutions more clearly than loops.",
    syntax: `int factorial(int n) {
    if (n <= 1) return 1;          // base case: stop here
    return n * factorial(n - 1);  // recursive case
}`,
    analogy: "Recursion is like Russian nesting dolls (Matryoshka). To find the smallest doll, you open the outer doll and look inside. If there's another doll, open it and look inside... repeat until you find the smallest one (base case). Then you report back through each layer.",
    codeExample: `#include <iostream>
using namespace std;

// Fibonacci sequence using recursion
int fibonacci(int n) {
    if (n <= 0) return 0;   // base case
    if (n == 1) return 1;   // base case
    return fibonacci(n-1) + fibonacci(n-2);  // recursive case
}

// Sum of digits
int sumDigits(int n) {
    if (n < 10) return n;           // base case: single digit
    return n % 10 + sumDigits(n / 10); // last digit + rest
}

int main() {
    for (int i = 0; i <= 8; i++)
        cout << fibonacci(i) << " ";
    cout << endl;  // 0 1 1 2 3 5 8 13 21
    
    cout << sumDigits(12345);  // 1+2+3+4+5 = 15
    return 0;
}`,
    commonMistakes: [
      "Forgetting the base case (leads to infinite recursion and stack overflow)",
      "Base case is never reached because recursive step doesn't reduce toward it",
      "Using recursion where a simple loop is clearer and more efficient",
    ],
    bestPractices: [
      "Always define the base case first",
      "Ensure each recursive call moves toward the base case",
      "Consider iterative solutions for performance-critical code",
      "For deeply recursive problems, consider dynamic programming",
    ],
    relatedTerms: ["function", "stack", "base case", "factorial"],
  },
  {
    term: "namespace",
    slug: "namespace",
    shortDefinition: "A named scope that prevents name conflicts between different libraries or code modules.",
    category: "Language Feature",
    definition: "A namespace groups related identifiers (functions, classes, variables) under a named scope. It prevents naming conflicts when combining code from different libraries that might use the same names.",
    whyItExists: "Large projects and libraries often have functions with common names (like print or sort). Namespaces prevent these names from clashing. The C++ standard library uses the std namespace.",
    syntax: `std::cout << "Hello";   // explicit namespace
using namespace std;    // bring all std names into scope
cout << "Hello";        // now works without std::

// Define your own
namespace Math {
    double PI = 3.14159;
    double square(double x) { return x * x; }
}
cout << Math::PI;
cout << Math::square(5);`,
    analogy: "Namespaces are like cities with streets. Two cities can both have a 'Main Street' without conflict — you specify 'Main Street, New York' vs 'Main Street, London'. Similarly, two libraries can both have a print() function as long as you specify which namespace.",
    codeExample: `#include <iostream>
using namespace std;

namespace Geometry {
    const double PI = 3.14159265358979;
    
    double circleArea(double r)   { return PI * r * r; }
    double circlePerim(double r)  { return 2 * PI * r; }
}

namespace Statistics {
    double average(double a, double b) { return (a + b) / 2.0; }
}

int main() {
    cout << Geometry::circleArea(5.0) << endl;
    cout << Statistics::average(80.0, 90.0) << endl;
    return 0;
}`,
    commonMistakes: [
      "using namespace std; in header files (pollutes the global namespace for all files that include it)",
      "Expecting using namespace to work across files",
    ],
    bestPractices: [
      "Avoid 'using namespace std;' in header files",
      "Prefer using declarations (using std::cout) over using namespace for specific names",
      "Organize your own code into namespaces for larger projects",
    ],
    relatedTerms: ["STL", "scope"],
  },
  {
    term: "abstraction",
    slug: "abstraction",
    shortDefinition: "Hiding complex implementation details and showing only the essential interface to the user.",
    category: "OOP",
    definition: "Abstraction means exposing only the relevant features of an object and hiding the complex implementation. In C++, abstract classes (with pure virtual functions) define interfaces that derived classes must implement.",
    whyItExists: "Abstraction reduces complexity. Users of a class don't need to understand HOW it works — just WHAT it does. This makes code easier to use and maintain.",
    syntax: `class Shape {  // abstract class
public:
    virtual double area() = 0;     // pure virtual
    virtual void draw() = 0;
};`,
    analogy: "Abstraction is like driving a car. You interact with the steering wheel, pedals, and gear shift (the interface) without knowing how the engine, transmission, or brakes work internally. The complex mechanics are hidden — you just use the simple interface.",
    codeExample: `class Database {  // abstract interface
public:
    virtual void connect() = 0;
    virtual void query(string sql) = 0;
    virtual ~Database() {}
};

class MySQL : public Database {
public:
    void connect() override { cout << "MySQL connected" << endl; }
    void query(string sql) override { /* MySQL-specific */ }
};

class PostgreSQL : public Database {
public:
    void connect() override { cout << "PostgreSQL connected" << endl; }
    void query(string sql) override { /* PostgreSQL-specific */ }
};`,
    commonMistakes: [
      "Trying to create objects of abstract classes directly (compile error)",
      "Not implementing all pure virtual functions in derived class",
      "Forgetting virtual destructor in abstract base classes",
    ],
    bestPractices: [
      "Use abstract classes to define interfaces/contracts",
      "Always add virtual destructor to abstract base classes",
      "Keep interfaces minimal — easier to implement and maintain",
    ],
    relatedTerms: ["virtual", "pure virtual", "interface", "polymorphism"],
  },
  {
    term: "compiler",
    slug: "compiler",
    shortDefinition: "A program that translates C++ source code into machine code that the CPU can execute.",
    category: "Build Process",
    definition: "A compiler reads your C++ source files, checks syntax and types, optimizes the code, and generates machine instructions (binary) that run directly on the CPU. Common C++ compilers: GCC (g++), Clang (clang++), MSVC.",
    whyItExists: "CPUs only understand machine code (binary instructions). The compiler bridges the gap between human-readable C++ and CPU-executable instructions, making C++ extremely fast.",
    syntax: `// Command line compilation
g++ myprogram.cpp -o myprogram
./myprogram

// With optimization
g++ -O3 myprogram.cpp -o myprogram

// With C++ standard
g++ -std=c++17 myprogram.cpp -o myprogram`,
    analogy: "A compiler is like a translator at the UN. You speak English (C++), and the translator converts it to another language (machine code) that someone else understands (the CPU).",
    codeExample: `// Source: hello.cpp
#include <iostream>
int main() {
    std::cout << "Hello!" << std::endl;
    return 0;
}

// Compile:
// g++ hello.cpp -o hello

// Run:
// ./hello (Linux/Mac)
// hello.exe (Windows)`,
    commonMistakes: [
      "Forgetting to recompile after changing code",
      "Not specifying the C++ standard version",
      "Mixing code compiled with different compilers",
    ],
    bestPractices: [
      "Use -std=c++17 or newer for modern features",
      "Enable warnings: -Wall -Wextra",
      "Use -O2 or -O3 for release builds (optimization)",
    ],
    relatedTerms: ["preprocessor", "linker", "object file", "executable"],
  },
  {
    term: "linker",
    slug: "linker",
    shortDefinition: "A tool that combines object files and libraries into a final executable program.",
    category: "Build Process",
    definition: "After compilation creates object files (.o, .obj), the linker stitches them together with library code to create one executable. It resolves function calls and variable references across different files.",
    whyItExists: "Large programs are split across multiple files. The linker combines them all, ensuring all function calls find their definitions and creating a single runnable program.",
    syntax: `// Compile multiple files
g++ -c file1.cpp    // creates file1.o
g++ -c file2.cpp    // creates file2.o

// Link them together
g++ file1.o file2.o -o program

// Or all at once
g++ file1.cpp file2.cpp -o program`,
    analogy: "The linker is like assembling a jigsaw puzzle. Each object file is a section with edge pieces that connect to other sections. The linker finds matching edges and combines everything into the complete picture (executable).",
    codeExample: `// math.cpp
int add(int a, int b) {
    return a + b;
}

// main.cpp
int add(int, int);  // declaration

int main() {
    int result = add(5, 3);  // linker connects this to math.cpp
    return 0;
}

// Compile and link:
// g++ main.cpp math.cpp -o program`,
    commonMistakes: [
      "Undefined reference errors (function declared but not defined)",
      "Multiple definition errors (same function defined twice)",
      "Forgetting to link required libraries (-lm for math)",
    ],
    bestPractices: [
      "Use header files for declarations, source files for definitions",
      "Use include guards to prevent multiple inclusions",
      "Link libraries last in the command: g++ main.cpp -lmylib",
    ],
    relatedTerms: ["compiler", "object file", "library", "header file"],
  },
  {
    term: "header file",
    slug: "header-file",
    shortDefinition: "A file (.h or .hpp) containing declarations that can be shared across multiple source files.",
    category: "Code Organization",
    definition: "Header files contain function declarations, class definitions, and constants that multiple .cpp files need to access. They're included using #include and enable code reuse and organization.",
    whyItExists: "Without headers, every .cpp file would need to redeclare functions from other files. Headers let you declare once and include everywhere, keeping code DRY (Don't Repeat Yourself).",
    syntax: `// math.h
#ifndef MATH_H
#define MATH_H

int add(int a, int b);
int multiply(int a, int b);

#endif

// main.cpp
#include "math.h"
int main() {
    int x = add(3, 4);
}`,
    analogy: "A header file is like a restaurant menu. The menu (header) lists what's available, but the actual cooking (implementation) happens in the kitchen (source file). Many customers (source files) can read the same menu.",
    codeExample: `// calculator.h
#pragma once  // modern include guard

class Calculator {
public:
    double add(double a, double b);
    double subtract(double a, double b);
};

// calculator.cpp
#include "calculator.h"

double Calculator::add(double a, double b) {
    return a + b;
}

double Calculator::subtract(double a, double b) {
    return a - b;
}

// main.cpp
#include "calculator.h"

int main() {
    Calculator calc;
    cout << calc.add(5, 3);
}`,
    commonMistakes: [
      "Forgetting include guards (causes multiple definition errors)",
      "Putting function implementations in headers (increases compile time)",
      "Using angle brackets instead of quotes for local headers",
    ],
    bestPractices: [
      "Use #pragma once or include guards in every header",
      "Declare in .h, define in .cpp (except templates)",
      "Minimize what you include — reduces dependencies",
    ],
    relatedTerms: ["preprocessor", "#include", "declaration", "definition"],
  },
  {
    term: "const",
    slug: "const",
    shortDefinition: "A keyword that makes a variable read-only, preventing accidental modification.",
    category: "Keywords",
    definition: "const promises the compiler that a variable's value won't change after initialization. Attempting to modify it causes a compile error. This catches bugs early and enables compiler optimizations.",
    whyItExists: "const prevents accidental changes to values that should never change (like PI, or configuration settings), making code safer and intent clearer. It's also used for function parameters to promise no modification.",
    syntax: `const double PI = 3.14159;
// PI = 3.14;  // ERROR: can't modify const

const int MAX_USERS = 100;

void printName(const string& name) {
    cout << name;  // can read
    // name = "Bob";  // ERROR: can't modify
}`,
    analogy: "const is like a museum exhibit with a 'Do Not Touch' sign. You can look at it (read the value), but you can't change it. If you try, security stops you (compile error).",
    codeExample: `#include <iostream>
using namespace std;

class Circle {
    double radius;
public:
    Circle(double r) : radius(r) {}
    
    // const member function: promises not to modify the object
    double getRadius() const {
        return radius;
    }
    
    double area() const {
        return 3.14159 * radius * radius;
    }
};

int main() {
    const Circle c(5.0);
    cout << c.area();     // OK: area() is const
    // c.setRadius(10);   // ERROR if setRadius isn't const
}`,
    commonMistakes: [
      "Not initializing const variables (must initialize when declared)",
      "Returning const by value (unnecessary, prevents move semantics)",
      "Forgetting const on member functions that don't modify object",
    ],
    bestPractices: [
      "Use const wherever possible — makes code safer",
      "Pass large objects as const& to avoid copying",
      "Mark member functions const if they don't modify the object",
      "Use constexpr for compile-time constants (C++11+)",
    ],
    relatedTerms: ["constexpr", "reference", "pointer"],
  },
  {
    term: "static",
    slug: "static",
    shortDefinition: "A keyword with multiple meanings: limits scope, extends lifetime, or shares data across all instances.",
    category: "Keywords",
    definition: "static has different meanings in different contexts: (1) local variables persist between function calls, (2) global variables/functions are file-scoped, (3) class members are shared by all objects of that class.",
    whyItExists: "static provides control over variable lifetime and scope. Static class members let all instances share data (like a counter of how many objects exist).",
    syntax: `// Static local variable
void counter() {
    static int count = 0;  // initialized once, persists
    count++;
    cout << count << endl;
}

// Static class member
class Player {
public:
    static int totalPlayers;  // shared by all Players
};
int Player::totalPlayers = 0;`,
    analogy: "A static class member is like a classroom whiteboard showing 'Total Students: 25'. Every student (object) can see the same board. It's not personal to one student — it's shared by the whole class.",
    codeExample: `#include <iostream>
using namespace std;

class BankAccount {
    string owner;
    double balance;
    static int totalAccounts;  // shared counter

public:
    BankAccount(string name, double bal) 
        : owner(name), balance(bal) {
        totalAccounts++;
    }
    
    ~BankAccount() {
        totalAccounts--;
    }
    
    static int getTotalAccounts() {
        return totalAccounts;
    }
};

// Must define static members outside class
int BankAccount::totalAccounts = 0;

int main() {
    BankAccount a1("Alice", 1000);
    BankAccount a2("Bob", 2000);
    
    cout << "Total accounts: " << BankAccount::getTotalAccounts();
    // Output: 2
}`,
    commonMistakes: [
      "Forgetting to define static class members outside the class",
      "Trying to access non-static members from static functions",
      "Confusing static in C++ with static in Java (different meanings)",
    ],
    bestPractices: [
      "Use static for counters shared across all instances",
      "Use static helper functions that don't need object state",
      "Initialize static members in one .cpp file to avoid linker errors",
    ],
    relatedTerms: ["class", "global", "scope"],
  },
  {
    term: "virtual",
    slug: "virtual",
    shortDefinition: "A keyword that enables runtime polymorphism by allowing derived classes to override base class methods.",
    category: "OOP",
    definition: "virtual tells the compiler to use dynamic dispatch — at runtime, call the most derived version of the function based on the actual object type, not the pointer/reference type.",
    whyItExists: "Without virtual, calling a function through a base pointer always calls the base version, even if the object is actually a derived type. virtual enables true polymorphism.",
    syntax: `class Animal {
public:
    virtual void speak() {
        cout << "Some sound" << endl;
    }
    virtual ~Animal() {}  // virtual destructor
};

class Dog : public Animal {
public:
    void speak() override {  // overrides Animal::speak
        cout << "Woof!" << endl;
    }
};

Animal* a = new Dog();
a->speak();  // "Woof!" (because speak is virtual)`,
    analogy: "virtual is like looking at someone's actual ID instead of assuming based on their clothes. Without virtual, you assume (static binding). With virtual, you check their actual type at runtime (dynamic binding).",
    codeExample: `#include <iostream>
#include <vector>
using namespace std;

class Shape {
public:
    virtual double area() = 0;  // pure virtual
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override {
        return 3.14159 * radius * radius;
    }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() override {
        return side * side;
    }
};

int main() {
    vector<Shape*> shapes = {
        new Circle(5),
        new Square(4),
        new Circle(3)
    };
    
    for (Shape* s : shapes) {
        cout << s->area() << endl;  // calls correct version!
    }
}`,
    commonMistakes: [
      "Forgetting virtual and getting wrong function called",
      "Not making base class destructor virtual (causes memory leaks)",
      "Overriding without the override keyword (typos not caught)",
    ],
    bestPractices: [
      "Always mark base class destructor virtual if class has virtual functions",
      "Use override keyword in derived classes",
      "Mark functions virtual in base if you want polymorphic behavior",
    ],
    relatedTerms: ["polymorphism", "override", "inheritance", "pure virtual"],
  },
  {
    term: "new",
    slug: "new",
    shortDefinition: "An operator that dynamically allocates memory on the heap and returns a pointer to it.",
    category: "Memory",
    definition: "new allocates memory at runtime from the heap (free store). Unlike stack variables that are automatically cleaned up, heap memory persists until you explicitly delete it.",
    whyItExists: "Stack memory is limited and automatically managed (LIFO). For large data, unknown sizes, or data that must outlive a function, you need heap allocation with new.",
    syntax: `int* p = new int(42);        // single int
int* arr = new int[100];     // array of 100 ints

delete p;         // free single object
delete[] arr;     // free array

// Object allocation
Dog* d = new Dog("Rex");
delete d;`,
    analogy: "new is like renting storage space. The landlord (operating system) gives you the key (pointer) to your unit. You're responsible for returning the key (delete) when done, or you keep paying rent forever (memory leak).",
    codeExample: `#include <iostream>
using namespace std;

class DynamicArray {
    int* data;
    int size;
    
public:
    DynamicArray(int n) : size(n) {
        data = new int[n];  // allocate on heap
        cout << "Array created" << endl;
    }
    
    ~DynamicArray() {
        delete[] data;  // free heap memory
        cout << "Array destroyed" << endl;
    }
    
    int& operator[](int i) {
        return data[i];
    }
};

int main() {
    DynamicArray arr(5);
    arr[0] = 10;
    arr[1] = 20;
    cout << arr[0] << endl;
}  // destructor called here, memory freed`,
    commonMistakes: [
      "Forgetting to delete (memory leak)",
      "Using delete instead of delete[] for arrays",
      "Deleting the same memory twice (double-free, causes crash)",
      "Using memory after delete (dangling pointer)",
    ],
    bestPractices: [
      "Prefer smart pointers (unique_ptr, shared_ptr) over raw new/delete",
      "Follow Rule of Three: if you have new, define destructor, copy constructor, assignment operator",
      "Use vector instead of new int[] for dynamic arrays",
    ],
    relatedTerms: ["delete", "heap", "pointer", "memory leak", "smart pointer"],
  },
  {
    term: "delete",
    slug: "delete",
    shortDefinition: "An operator that frees memory previously allocated with new, preventing memory leaks.",
    category: "Memory",
    definition: "delete returns heap memory to the operating system. Failing to delete causes memory leaks — memory stays allocated even though your program no longer uses it.",
    whyItExists: "C++ gives you manual memory control for performance. The cost is responsibility: you must free what you allocate. delete is how you do that.",
    syntax: `int* p = new int(42);
delete p;  // free memory
p = nullptr;  // good practice: prevent dangling pointer

int* arr = new int[10];
delete[] arr;  // use delete[] for arrays!`,
    analogy: "delete is like returning a library book. If you forget, the library (operating system) can't lend it to anyone else. Eventually, the library runs out of books (memory).",
    codeExample: `#include <iostream>
using namespace std;

void memoryLeak() {
    int* leak = new int[1000];
    // forgot delete[] leak;  // MEMORY LEAK!
}

void correctUsage() {
    int* data = new int[1000];
    // ... use data ...
    delete[] data;  // ✓ properly freed
}

int main() {
    for (int i = 0; i < 1000; i++) {
        memoryLeak();  // leaks more memory each iteration
    }
    // Program uses way more memory than needed!
}`,
    commonMistakes: [
      "Forgetting delete (most common mistake)",
      "Using delete on stack memory (undefined behavior)",
      "delete instead of delete[] for arrays",
      "Using pointer after delete (dangling pointer)",
    ],
    bestPractices: [
      "Set pointers to nullptr after delete",
      "Use RAII: tie allocation/deallocation to object lifetime",
      "Prefer smart pointers that delete automatically",
      "Use tools like Valgrind to detect memory leaks",
    ],
    relatedTerms: ["new", "memory leak", "dangling pointer", "smart pointer", "RAII"],
  },
  {
    term: "nullptr",
    slug: "nullptr",
    shortDefinition: "A keyword representing a null pointer — a pointer that doesn't point to anything.",
    category: "Keywords",
    definition: "nullptr (C++11) is the modern way to represent a null pointer. It's type-safe, unlike the old NULL macro or using 0. A pointer set to nullptr doesn't point to valid memory.",
    whyItExists: "nullptr prevents ambiguous function calls and makes intent clearer. It's a proper pointer literal, unlike NULL which was just #define NULL 0.",
    syntax: `int* ptr = nullptr;  // pointer to nothing

if (ptr == nullptr) {
    cout << "Pointer is null" << endl;
}

// Safe dereferencing
if (ptr != nullptr) {
    cout << *ptr;  // only dereference if not null
}`,
    analogy: "nullptr is like an empty mailbox address field. The field exists, but it doesn't point to an actual mailbox. Trying to deliver mail there (dereference) would fail.",
    codeExample: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

int findLength(Node* head) {
    if (head == nullptr) return 0;  // empty list
    
    int count = 0;
    Node* current = head;
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    return count;
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    
    cout << "Length: " << findLength(head);  // 3
    cout << "Empty: " << findLength(nullptr);  // 0
}`,
    commonMistakes: [
      "Dereferencing nullptr (causes crash)",
      "Using NULL instead of nullptr in modern C++",
      "Not checking for nullptr before dereferencing",
    ],
    bestPractices: [
      "Always initialize pointers to nullptr if not pointing to valid memory",
      "Check ptr != nullptr before dereferencing",
      "Use nullptr, not NULL or 0, in C++11 and later",
    ],
    relatedTerms: ["pointer", "null", "dereference"],
  },
  {
    term: "STL",
    slug: "stl",
    shortDefinition: "Standard Template Library — a collection of generic containers, algorithms, and iterators.",
    category: "Library",
    definition: "The STL provides ready-made data structures (vector, map, set) and algorithms (sort, find, accumulate) that work with any type. It's the most-used part of the C++ standard library.",
    whyItExists: "Without STL, you'd reimplement common data structures for every project. STL provides tested, optimized implementations so you can focus on your actual problem.",
    syntax: `#include <vector>
#include <algorithm>

vector<int> nums = {3, 1, 4, 1, 5};
sort(nums.begin(), nums.end());

#include <map>
map<string, int> ages;
ages["Alice"] = 25;`,
    analogy: "STL is like a well-stocked toolbox. Instead of making your own hammer and screwdriver (data structures) for every project, you grab them from the toolbox and get to work.",
    codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78, 95, 88};
    
    // Sort
    sort(scores.begin(), scores.end());
    
    // Find
    auto it = find(scores.begin(), scores.end(), 92);
    if (it != scores.end()) {
        cout << "Found at position: " << (it - scores.begin()) << endl;
    }
    
    // Sum
    int total = accumulate(scores.begin(), scores.end(), 0);
    cout << "Average: " << total / scores.size() << endl;
    
    // Count
    int above90 = count_if(scores.begin(), scores.end(),
                           [](int s) { return s >= 90; });
    cout << "Scores >= 90: " << above90 << endl;
}`,
    commonMistakes: [
      "Forgetting to #include the right headers",
      "Not understanding iterators (begin(), end())",
      "Modifying containers while iterating over them",
    ],
    bestPractices: [
      "Learn the common containers: vector, map, set, unordered_map",
      "Learn key algorithms: sort, find, count, accumulate",
      "Use range-based for loops when you don't need indices",
    ],
    relatedTerms: ["vector", "map", "algorithm", "iterator", "template"],
  },
  {
    term: "heap",
    slug: "heap",
    shortDefinition: "A region of memory for dynamic allocation that persists until explicitly freed.",
    category: "Memory",
    definition: "The heap (or free store) is a pool of memory used for dynamic allocation via new. Unlike stack memory which is automatically managed, heap memory persists until you explicitly call delete.",
    whyItExists: "Stack memory is limited (~1-8 MB) and automatically cleaned when functions return. For large data or data that must outlive a function, you need heap memory.",
    syntax: `int* p = new int(42);     // allocated on heap
delete p;                 // must manually free

int arr[1000];            // stack (automatic)
int* big = new int[1000000];  // heap (manual control)
delete[] big;`,
    analogy: "Heap is like a storage facility. You rent a unit (allocate), store your stuff, and keep it as long as you pay (until delete). Stack is like your kitchen counter — limited space, and you clear it after cooking (function returns).",
    codeExample: `#include <iostream>
using namespace std;

void stackExample() {
    int x = 10;  // stack
    // x destroyed when function returns
}

void heapExample() {
    int* p = new int(20);  // heap
    // p still exists after function returns!
    // ... but you MUST delete it somewhere
    delete p;
}

int main() {
    stackExample();
    heapExample();
    
    // Heap for large data
    int* bigArray = new int[1000000];  // too big for stack!
    delete[] bigArray;
}`,
    commonMistakes: [
      "Allocating large arrays on stack (causes stack overflow)",
      "Forgetting to delete heap memory (memory leak)",
      "Accessing heap memory after delete (dangling pointer)",
    ],
    bestPractices: [
      "Use heap for large data or data that outlives a function",
      "Prefer smart pointers to manage heap memory automatically",
      "Use stack when possible — faster and automatic cleanup",
    ],
    relatedTerms: ["stack", "new", "delete", "memory leak", "pointer"],
  },
  {
    term: "stack",
    slug: "stack",
    shortDefinition: "A region of memory that stores local variables and function call information, automatically managed LIFO.",
    category: "Memory",
    definition: "The stack is a fast, automatically-managed memory region for local variables and function calls. It grows and shrinks as functions are called and return (Last In, First Out).",
    whyItExists: "The stack provides extremely fast allocation/deallocation for function-local data. No need to manually manage memory — variables are automatically created and destroyed.",
    syntax: `void myFunction() {
    int x = 10;        // on stack
    double y = 3.14;   // on stack
    char arr[100];     // on stack
    // All automatically destroyed when function returns
}`,
    analogy: "Stack is like a stack of cafeteria trays. You add trays on top (function calls) and remove from the top (returns). The last tray added is the first removed (LIFO). Space is limited and automatically managed.",
    codeExample: `#include <iostream>
using namespace std;

void level3() {
    int c = 3;
    cout << "Level 3: " << c << endl;
}  // c destroyed

void level2() {
    int b = 2;
    cout << "Level 2: " << b << endl;
    level3();
}  // b destroyed

void level1() {
    int a = 1;
    cout << "Level 1: " << a << endl;
    level2();
}  // a destroyed

int main() {
    level1();
    // Stack grows: main -> level1 -> level2 -> level3
    // Stack shrinks: level3 -> level2 -> level1 -> main
}`,
    commonMistakes: [
      "Allocating too much on stack (stack overflow)",
      "Returning pointer/reference to local variable (dangling pointer)",
      "Recursion too deep (exhausts stack space)",
    ],
    bestPractices: [
      "Use stack for small, function-local variables",
      "Use heap for large data or data that outlives functions",
      "Typical stack size: 1-8 MB (OS dependent)",
    ],
    relatedTerms: ["heap", "memory", "local variable", "function call"],
  },
  {
    term: "memory leak",
    slug: "memory-leak",
    shortDefinition: "When dynamically allocated memory is not freed, causing the program to consume more and more memory.",
    category: "Memory",
    definition: "A memory leak occurs when you allocate heap memory with new but never call delete. The memory stays allocated but inaccessible, wasting system resources. Over time, the program uses more and more memory.",
    whyItExists: "This is a bug, not a feature. It happens due to programmer error — forgetting delete, exceptions before delete, or losing the pointer.",
    syntax: `void leak() {
    int* p = new int[1000];
    // forgot: delete[] p;
}  // p goes out of scope, memory is lost!

for (int i = 0; i < 1000; i++) {
    leak();  // leaks 1000 ints per iteration!
}`,
    analogy: "A memory leak is like borrowing books from a library and never returning them. The library (operating system) runs out of books (memory) to lend. Eventually, nobody can borrow anything.",
    codeExample: `#include <iostream>
using namespace std;

// BAD: Memory leak
void leakyFunction() {
    int* data = new int[100];
    // process data...
    // FORGOT delete[] data;  <-- LEAK!
}

// GOOD: No leak
void goodFunction() {
    int* data = new int[100];
    // process data...
    delete[] data;  // ✓ freed
}

// BETTER: Use smart pointers
#include <memory>
void modernFunction() {
    unique_ptr<int[]> data(new int[100]);
    // process data...
    // automatically freed when unique_ptr goes out of scope!
}

// BEST: Use vector
void bestFunction() {
    vector<int> data(100);
    // automatically managed, no manual delete needed!
}`,
    commonMistakes: [
      "Forgetting delete (most common cause)",
      "Exception thrown before delete is reached",
      "Overwriting pointer before deleting (losing access)",
    ],
    bestPractices: [
      "Use RAII: tie allocation to object lifetime",
      "Prefer smart pointers over raw new/delete",
      "Use tools like Valgrind or AddressSanitizer to detect leaks",
      "Use vector/string instead of manual arrays",
    ],
    relatedTerms: ["heap", "new", "delete", "smart pointer", "RAII"],
  },
  {
    term: "dangling pointer",
    slug: "dangling-pointer",
    shortDefinition: "A pointer that references memory that has been freed or is no longer valid.",
    category: "Memory",
    definition: "A dangling pointer points to memory that was deleted, or to a local variable that went out of scope. Dereferencing it causes undefined behavior — often crashes, but sometimes worse (corrupted data).",
    whyItExists: "This is a bug. It happens when you delete memory but continue using the pointer, or when you return a pointer to a local variable.",
    syntax: `int* p = new int(42);
delete p;
cout << *p;  // DANGLING! Undefined behavior

int* getPointer() {
    int x = 10;
    return &x;  // DANGLING! x destroyed after return
}`,
    analogy: "A dangling pointer is like having a key to an apartment you no longer rent. The landlord gave your unit to someone else. If you try to enter (dereference), you're trespassing and things go very wrong.",
    codeExample: `#include <iostream>
using namespace std;

// BAD: Dangling pointer
int* badFunction() {
    int x = 42;
    return &x;  // x destroyed when function returns!
}

// BAD: Use after delete
void alsoBAD() {
    int* p = new int(10);
    delete p;
    cout << *p;  // dangling! undefined behavior
}

// GOOD: Set to nullptr after delete
void safe() {
    int* p = new int(10);
    delete p;
    p = nullptr;  // can't accidentally dereference
    
    if (p != nullptr) {
        cout << *p;  // won't execute
    }
}

// GOOD: Return heap-allocated memory
int* goodFunction() {
    int* p = new int(42);
    return p;  // caller must delete
}`,
    commonMistakes: [
      "Using pointer after delete",
      "Returning address of local variable",
      "Double-free: deleting same memory twice",
    ],
    bestPractices: [
      "Set pointers to nullptr after delete",
      "Never return pointer/reference to local variables",
      "Use smart pointers that prevent dangling pointers",
      "Use AddressSanitizer to detect use-after-free bugs",
    ],
    relatedTerms: ["pointer", "delete", "nullptr", "memory leak", "undefined behavior"],
  },
  {
    term: "unique_ptr",
    slug: "unique-ptr",
    shortDefinition: "A smart pointer that owns memory exclusively and automatically deletes it when out of scope.",
    category: "Smart Pointers",
    definition: "unique_ptr is a modern C++ smart pointer that owns heap-allocated memory. It automatically calls delete when it goes out of scope. Ownership is unique — cannot be copied, only moved.",
    whyItExists: "unique_ptr eliminates manual memory management. No more forgetting delete or memory leaks. It provides automatic, exception-safe cleanup.",
    syntax: `#include <memory>

unique_ptr<int> p(new int(42));
// or better (C++14+):
auto p = make_unique<int>(42);

cout << *p;  // use like regular pointer
// automatically deleted when p goes out of scope!`,
    analogy: "unique_ptr is like having a self-destructing note. When you're done with it (goes out of scope), it automatically shreds itself (deletes memory). Only one person can hold it at a time (unique ownership).",
    codeExample: `#include <iostream>
#include <memory>
using namespace std;

class Dog {
    string name;
public:
    Dog(string n) : name(n) {
        cout << name << " created" << endl;
    }
    ~Dog() {
        cout << name << " destroyed" << endl;
    }
    void bark() { cout << name << ": Woof!" << endl; }
};

int main() {
    {
        unique_ptr<Dog> myDog = make_unique<Dog>("Rex");
        myDog->bark();
        
        // Transfer ownership
        unique_ptr<Dog> otherDog = move(myDog);
        // myDog is now nullptr
        
    }  // otherDog automatically destroyed here
    
    cout << "End of program" << endl;
}`,
    commonMistakes: [
      "Trying to copy unique_ptr (not allowed — use move())",
      "Mixing unique_ptr with raw new/delete",
      "Returning unique_ptr from function incorrectly",
    ],
    bestPractices: [
      "Use make_unique instead of new for exception safety",
      "Prefer unique_ptr over raw pointers for ownership",
      "Use move() to transfer ownership",
      "Return unique_ptr by value to transfer ownership to caller",
    ],
    relatedTerms: ["shared_ptr", "smart pointer", "move semantics", "RAII"],
  },
  {
    term: "shared_ptr",
    slug: "shared-ptr",
    shortDefinition: "A smart pointer that allows multiple pointers to share ownership of the same object with reference counting.",
    category: "Smart Pointers",
    definition: "shared_ptr allows multiple pointers to own the same heap memory. It uses reference counting — the memory is deleted only when the last shared_ptr is destroyed.",
    whyItExists: "Sometimes multiple parts of a program need to access the same object, and it's unclear who should own it. shared_ptr allows shared ownership with automatic cleanup when nobody needs it anymore.",
    syntax: `#include <memory>

shared_ptr<int> p1 = make_shared<int>(42);
shared_ptr<int> p2 = p1;  // both share ownership

cout << p1.use_count();  // 2 (reference count)

p1.reset();  // p1 gives up ownership
// memory still valid, p2 still owns it

p2.reset();  // last owner gone, memory deleted`,
    analogy: "shared_ptr is like a group Airbnb rental. Multiple people have keys (pointers) to the same apartment (memory). The apartment is only cleaned up when the last person checks out (last shared_ptr destroyed).",
    codeExample: `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Resource {
    string name;
public:
    Resource(string n) : name(n) {
        cout << name << " created" << endl;
    }
    ~Resource() {
        cout << name << " destroyed" << endl;
    }
};

int main() {
    shared_ptr<Resource> res1 = make_shared<Resource>("Data");
    cout << "Count: " << res1.use_count() << endl;  // 1
    
    {
        shared_ptr<Resource> res2 = res1;  // shared
        cout << "Count: " << res1.use_count() << endl;  // 2
        
        vector<shared_ptr<Resource>> vec;
        vec.push_back(res1);
        cout << "Count: " << res1.use_count() << endl;  // 3
    }  // res2 and vec destroyed
    
    cout << "Count: " << res1.use_count() << endl;  // 1
}  // res1 destroyed, Resource deleted`,
    commonMistakes: [
      "Creating shared_ptr from same raw pointer twice (double-delete)",
      "Circular references (causes memory leak — use weak_ptr)",
      "Using shared_ptr when unique_ptr would suffice (overhead)",
    ],
    bestPractices: [
      "Use make_shared for efficiency and exception safety",
      "Use weak_ptr to break circular references",
      "Prefer unique_ptr unless you truly need shared ownership",
    ],
    relatedTerms: ["unique_ptr", "weak_ptr", "smart pointer", "reference counting"],
  },
  {
    term: "map",
    slug: "map",
    shortDefinition: "An ordered associative container that stores key-value pairs, implemented as a balanced tree.",
    category: "STL",
    definition: "std::map is a sorted dictionary that maps keys to values. It keeps keys in sorted order and provides O(log n) lookup, insertion, and deletion. Keys must be unique.",
    whyItExists: "Maps let you look up values by meaningful keys instead of numeric indices. Perfect for dictionaries, caches, databases, and any key-value data.",
    syntax: `#include <map>

map<string, int> ages;
ages["Alice"] = 25;
ages["Bob"] = 30;

cout << ages["Alice"];  // 25

if (ages.count("Charlie") > 0) {
    // Charlie exists
}`,
    analogy: "A map is like a phone book. You look up a person's name (key) to find their phone number (value). Names are automatically kept in alphabetical order (sorted).",
    codeExample: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, double> prices;
    prices["apple"] = 1.50;
    prices["banana"] = 0.75;
    prices["orange"] = 2.00;
    
    // Lookup
    cout << "Apple: $" << prices["apple"] << endl;
    
    // Iterate (automatically sorted by key!)
    for (auto& [fruit, price] : prices) {
        cout << fruit << ": $" << price << endl;
    }
    
    // Check existence
    if (prices.find("grape") == prices.end()) {
        cout << "Grape not found" << endl;
    }
    
    // Remove
    prices.erase("banana");
}`,
    commonMistakes: [
      "Using [] for lookup creates key if it doesn't exist (use find() or at())",
      "Forgetting that map is sorted (overhead)",
      "Not checking if key exists before accessing",
    ],
    bestPractices: [
      "Use unordered_map if you don't need sorted keys (faster)",
      "Use find() to check existence without inserting",
      "Use at() for bounds-checked access (throws exception if missing)",
      "Use structured bindings (C++17) for clean iteration",
    ],
    relatedTerms: ["unordered_map", "set", "pair", "STL"],
  },
  {
    term: "set",
    slug: "set",
    shortDefinition: "An ordered container that stores unique elements in sorted order, implemented as a balanced tree.",
    category: "STL",
    definition: "std::set stores unique elements in sorted order. It automatically removes duplicates and keeps elements sorted. Provides O(log n) insertion, deletion, and lookup.",
    whyItExists: "Sets are perfect when you need a collection of unique items in sorted order, or when you need fast membership testing ('does this element exist?').",
    syntax: `#include <set>

set<int> numbers = {3, 1, 4, 1, 5};
// stored as: {1, 3, 4, 5} (sorted, no duplicate 1)

numbers.insert(2);  // {1, 2, 3, 4, 5}

if (numbers.count(3) > 0) {
    cout << "3 is in the set" << endl;
}`,
    analogy: "A set is like a sorted attendance list with no duplicates. If you try to add 'Bob' twice, the second one is ignored. The list stays alphabetically sorted automatically.",
    codeExample: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<string> words = {"cat", "dog", "apple", "banana"};
    
    // Add more (duplicates ignored)
    words.insert("cat");     // ignored
    words.insert("zebra");
    
    // Iterate (automatic sorted order)
    for (const string& w : words) {
        cout << w << " ";
    }
    cout << endl;  // apple banana cat dog zebra
    
    // Fast membership test
    if (words.count("dog") > 0) {
        cout << "Found dog" << endl;
    }
    
    // Remove
    words.erase("cat");
}`,
    commonMistakes: [
      "Expecting set to preserve insertion order (it doesn't — sorted order)",
      "Forgetting that duplicates are automatically removed",
      "Using set when unordered_set would be faster",
    ],
    bestPractices: [
      "Use set when you need sorted unique elements",
      "Use unordered_set for faster O(1) operations without sorting",
      "Use find() instead of count() if you need the iterator",
    ],
    relatedTerms: ["unordered_set", "map", "multiset", "STL"],
  },
  {
    term: "unordered_map",
    slug: "unordered-map",
    shortDefinition: "A hash table that stores key-value pairs with O(1) average lookup, faster than map but unordered.",
    category: "STL",
    definition: "std::unordered_map is a hash table implementation of a dictionary. It provides O(1) average-case lookup, insertion, and deletion, but elements are not sorted.",
    whyItExists: "unordered_map is faster than map (O(1) vs O(log n)) when you don't need keys in sorted order. Perfect for caches, frequency counting, and fast lookups.",
    syntax: `#include <unordered_map>

unordered_map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;

cout << scores["Alice"];  // 95 in O(1) time!`,
    analogy: "unordered_map is like a filing cabinet with labeled drawers. Each label (key) has a specific drawer location (hash). You go directly to the drawer without searching — instant access. But drawers aren't in any particular order.",
    codeExample: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    unordered_map<string, int> wordCount;
    string text[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    
    // Count word frequencies
    for (const string& word : text) {
        wordCount[word]++;
    }
    
    // Display results (unordered!)
    for (auto& [word, count] : wordCount) {
        cout << word << ": " << count << endl;
    }
    
    // Fast lookup
    if (wordCount.find("apple") != wordCount.end()) {
        cout << "Apple appears " << wordCount["apple"] << " times" << endl;
    }
}`,
    commonMistakes: [
      "Expecting elements in any particular order (they're not)",
      "Using unordered_map with types that don't have hash functions",
      "Not handling hash collisions (rare, but possible)",
    ],
    bestPractices: [
      "Use unordered_map instead of map when you don't need sorted keys",
      "Provide custom hash function for custom types",
      "Reserve capacity if you know the size: reserve(n)",
    ],
    relatedTerms: ["map", "hash table", "unordered_set", "STL"],
  },
  {
    term: "auto",
    slug: "auto",
    shortDefinition: "A keyword that automatically deduces the type of a variable from its initializer (C++11).",
    category: "Modern C++",
    definition: "auto tells the compiler to figure out the type automatically based on the initialization value. It reduces verbosity, prevents type mismatches, and makes refactoring easier.",
    whyItExists: "Some C++ types are extremely long (like iterator types). auto makes code cleaner and less error-prone, especially with templates and STL.",
    syntax: `auto x = 42;           // int
auto y = 3.14;         // double
auto name = "Alice";   // const char*
auto s = string("Hi"); // string

vector<int> v = {1,2,3};
auto it = v.begin();   // vector<int>::iterator`,
    analogy: "auto is like saying 'the usual' at your regular coffee shop. The barista knows what you want without you spelling out 'grande-half-caf-soy-latte-extra-foam'. The type is obvious from context.",
    codeExample: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    // Long type avoided
    map<string, vector<int>> data;
    data["scores"] = {85, 90, 92};
    
    // Instead of: map<string, vector<int>>::iterator it = ...
    auto it = data.begin();  // much cleaner!
    
    // Range-based for with auto
    vector<string> names = {"Alice", "Bob", "Charlie"};
    for (const auto& name : names) {
        cout << name << endl;
    }
    
    // Lambda return type deduction
    auto add = [](int a, int b) { return a + b; };
    cout << add(5, 3) << endl;
}`,
    commonMistakes: [
      "Using auto when the type isn't obvious (reduces readability)",
      "auto with braced initializers can be surprising: auto x{1} is initializer_list",
      "Forgetting & or const when needed: auto vs const auto&",
    ],
    bestPractices: [
      "Use auto for iterator types and complex template types",
      "Use auto& or const auto& to avoid unnecessary copies",
      "Use auto with range-based for loops",
      "Don't use auto if it makes the code less clear",
    ],
    relatedTerms: ["decltype", "template", "type inference"],
  },
  {
    term: "lambda",
    slug: "lambda",
    shortDefinition: "An anonymous inline function that can capture variables from its surrounding scope (C++11).",
    category: "Modern C++",
    definition: "A lambda is a unnamed function object defined inline. It can capture variables from the enclosing scope and is perfect for short callbacks and algorithm predicates.",
    whyItExists: "Lambdas eliminate the need to write separate named functions for short operations. They're especially useful with STL algorithms like sort, find_if, and transform.",
    syntax: `// Basic lambda
auto add = [](int a, int b) { return a + b; };
cout << add(3, 4);  // 7

// Capture by value
int x = 10;
auto fn = [x]() { return x * 2; };

// Capture by reference
auto fn2 = [&x]() { x++; };

// Capture all by value
auto fn3 = [=]() { return x + 5; };

// Capture all by reference
auto fn4 = [&]() { x *= 2; };`,
    analogy: "A lambda is like sticky note instructions. Instead of writing a formal procedure document (named function), you jot quick instructions on a sticky note and use it right there. It can even reference things around it (capture).",
    codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Find first even number
    auto it = find_if(numbers.begin(), numbers.end(),
                      [](int n) { return n % 2 == 0; });
    cout << "First even: " << *it << endl;  // 2
    
    // Count numbers > 5
    int threshold = 5;
    int count = count_if(numbers.begin(), numbers.end(),
                         [threshold](int n) { return n > threshold; });
    cout << "Numbers > 5: " << count << endl;  // 5
    
    // Transform: square all numbers
    vector<int> squared;
    transform(numbers.begin(), numbers.end(), back_inserter(squared),
              [](int n) { return n * n; });
    
    for (int n : squared) {
        cout << n << " ";  // 1 4 9 16 25 ...
    }
}`,
    commonMistakes: [
      "Capturing by reference when the variable goes out of scope",
      "Forgetting to specify return type for complex multi-statement lambdas",
      "Using [=] when [&] is needed or vice versa",
    ],
    bestPractices: [
      "Use [=] to capture by value, [&] by reference",
      "Specify individual captures when possible: [x, &y]",
      "Use lambdas with STL algorithms for clean, concise code",
      "Use mutable keyword if lambda needs to modify captured values",
    ],
    relatedTerms: ["function object", "closure", "STL algorithms", "auto"],
  },
  {
    term: "move semantics",
    slug: "move-semantics",
    shortDefinition: "A C++11 feature that transfers resource ownership instead of copying, improving performance.",
    category: "Modern C++",
    definition: "Move semantics allow resources (like heap memory) to be transferred from one object to another instead of copied. This avoids expensive deep copies and is enabled by rvalue references (&&).",
    whyItExists: "Copying large objects (vectors, strings) is expensive. Moving transfers ownership without copying data, making operations like returning vectors from functions much faster.",
    syntax: `vector<int> v1 = {1, 2, 3, 4, 5};
vector<int> v2 = move(v1);  // v1's data moved to v2
// v1 is now empty (moved-from state)

// Move constructor
MyClass obj2 = move(obj1);

// Move assignment
obj3 = move(obj2);`,
    analogy: "Move semantics is like transferring a house deed instead of building an identical house. Copying means constructing a new house brick-by-brick. Moving means signing over the paperwork — much faster!",
    codeExample: `#include <iostream>
#include <vector>
#include <utility>  // for move
using namespace std;

class Buffer {
    int* data;
    size_t size;
public:
    // Constructor
    Buffer(size_t n) : size(n), data(new int[n]) {
        cout << "Allocated " << size << " ints" << endl;
    }
    
    // Destructor
    ~Buffer() {
        delete[] data;
        cout << "Freed buffer" << endl;
    }
    
    // Move constructor
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;  // take ownership
        other.size = 0;
        cout << "Moved buffer" << endl;
    }
    
    // Move assignment
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};

int main() {
    Buffer b1(1000);
    Buffer b2 = move(b1);  // move, not copy!
}`,
    commonMistakes: [
      "Using an object after moving from it (it's in valid but unspecified state)",
      "Not implementing move operations when they'd improve performance",
      "Forgetting noexcept on move operations (affects std::vector)",
    ],
    bestPractices: [
      "Return large objects by value — compiler uses move automatically",
      "Use std::move to enable moving when passing to functions",
      "Implement Rule of Five if you manage resources",
      "Mark move operations noexcept",
    ],
    relatedTerms: ["rvalue reference", "std::move", "unique_ptr", "Rule of Five"],
  },
  {
    term: "exception",
    slug: "exception",
    shortDefinition: "A mechanism to handle errors by throwing and catching error objects at runtime.",
    category: "Error Handling",
    definition: "Exceptions provide a way to transfer control from error detection to error handling. When an error occurs, you throw an exception; code up the call stack can catch it and respond.",
    whyItExists: "Without exceptions, error handling clutters code with if-checks at every step. Exceptions separate error handling from normal logic, and automatically propagate errors up the call stack.",
    syntax: `try {
    if (error) {
        throw runtime_error("Something went wrong");
    }
} catch (const exception& e) {
    cout << "Error: " << e.what() << endl;
}`,
    analogy: "Exceptions are like a fire alarm. When a fire (error) is detected anywhere in the building, the alarm sounds (throw), and everyone knows to evacuate (catch). The alarm propagates through the whole building automatically.",
    codeExample: `#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw invalid_argument("Division by zero!");
    }
    return a / b;
}

int main() {
    try {
        cout << divide(10, 2) << endl;   // 5
        cout << divide(10, 0) << endl;   // throws!
        cout << "This won't print" << endl;
    }
    catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << endl;
    }
    catch (const exception& e) {
        cout << "Other error: " << e.what() << endl;
    }
    
    cout << "Program continues" << endl;
}`,
    commonMistakes: [
      "Throwing exceptions in destructors (causes termination if another exception is active)",
      "Catching by value instead of by reference (slicing)",
      "Not catching exceptions at appropriate level",
      "Using exceptions for normal control flow",
    ],
    bestPractices: [
      "Throw by value, catch by const reference",
      "Use standard exception types when possible",
      "Document which exceptions a function might throw",
      "Use RAII so destructors clean up even when exceptions occur",
    ],
    relatedTerms: ["try", "catch", "throw", "RAII", "error handling"],
  },
  {
    term: "friend",
    slug: "friend",
    shortDefinition: "A keyword that grants a function or class access to another class's private members.",
    category: "OOP",
    definition: "friend allows a non-member function or another class to access private and protected members of a class. It's an exception to encapsulation when two classes need tight coupling.",
    whyItExists: "Some operations (like operator overloading) need access to private data but make more sense as non-member functions. friend enables this without breaking encapsulation everywhere.",
    syntax: `class Box {
    int width;
    friend void printWidth(const Box& b);  // friend function
    friend class BoxPrinter;               // friend class
};

void printWidth(const Box& b) {
    cout << b.width;  // can access private member!
}`,
    analogy: "friend is like giving someone a key to your house. Normally people (non-members) stay outside (can't access private). But you trust certain people (friends) and give them access.",
    codeExample: `#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    
    // Friend function can access private members
    friend int computeArea(const Rectangle& r);
    
    // Friend operator
    friend ostream& operator<<(ostream& os, const Rectangle& r);
};

int computeArea(const Rectangle& r) {
    return r.width * r.height;  // access private width, height
}

ostream& operator<<(ostream& os, const Rectangle& r) {
    os << "Rectangle(" << r.width << "x" << r.height << ")";
    return os;
}

int main() {
    Rectangle r(5, 3);
    cout << r << endl;  // Rectangle(5x3)
    cout << "Area: " << computeArea(r) << endl;  // 15
}`,
    commonMistakes: [
      "Overusing friend (breaks encapsulation)",
      "Declaring friend when a public interface would work",
      "Forgetting that friendship is not inherited or transitive",
    ],
    bestPractices: [
      "Use friend sparingly — prefer public interfaces",
      "Common use: overloading << and >> operators",
      "Common use: tightly coupled classes that share implementation",
    ],
    relatedTerms: ["encapsulation", "operator overloading", "class"],
  },
  {
    term: "operator overloading",
    slug: "operator-overloading",
    shortDefinition: "Defining custom behavior for operators (+, -, *, ==, <<, etc.) when used with user-defined types.",
    category: "OOP",
    definition: "Operator overloading lets you define how operators work with your custom classes. For example, you can define what + means for adding two Complex numbers or what == means for comparing two Date objects.",
    whyItExists: "Operator overloading makes custom types feel like built-in types. You can write vec1 + vec2 instead of vec1.add(vec2), making code more intuitive and readable.",
    syntax: `class Complex {
    double real, imag;
public:
    Complex operator+(const Complex& other) {
        return Complex(real + other.real, imag + other.imag);
    }
    
    bool operator==(const Complex& other) {
        return real == other.real && imag == other.imag;
    }
};`,
    analogy: "Operator overloading is like teaching a calculator new button functions. By default, + adds numbers. You teach it that when you press + with two fractions, it adds fractions (common denominator, etc.).",
    codeExample: `#include <iostream>
using namespace std;

class Fraction {
    int num, den;
public:
    Fraction(int n, int d) : num(n), den(d) {}
    
    Fraction operator+(const Fraction& other) {
        return Fraction(
            num * other.den + other.num * den,
            den * other.den
        );
    }
    
    friend ostream& operator<<(ostream& os, const Fraction& f) {
        os << f.num << "/" << f.den;
        return os;
    }
    
    bool operator<(const Fraction& other) const {
        return num * other.den < other.num * den;
    }
};

int main() {
    Fraction f1(1, 2);  // 1/2
    Fraction f2(1, 3);  // 1/3
    
    Fraction sum = f1 + f2;  // uses operator+
    cout << f1 << " + " << f2 << " = " << sum << endl;
    
    if (f2 < f1) {
        cout << f2 << " is less than " << f1 << endl;
    }
}`,
    commonMistakes: [
      "Overloading operators in non-intuitive ways (confusing)",
      "Forgetting to return *this from assignment operators",
      "Not making comparison operators const",
      "Can't overload: :: . .* ?:",
    ],
    bestPractices: [
      "Make operator behavior intuitive and consistent",
      "Implement operators in logical groups (==, !=) (>, <, >=, <=)",
      "Use friend for binary operators that need left operand conversion",
      "Return by value for arithmetic operators, reference for assignment",
    ],
    relatedTerms: ["friend", "operator", "class", "overload"],
  },
  {
    term: "iterator",
    slug: "iterator",
    shortDefinition: "An object that points to elements in a container and provides a way to traverse them.",
    category: "STL",
    definition: "Iterators are generalized pointers used to access elements in containers. They provide a uniform interface for traversing different data structures (vector, list, map, etc.).",
    whyItExists: "Iterators allow STL algorithms to work with any container without knowing its internal structure. You can use sort(), find(), etc. with any container through iterators.",
    syntax: `vector<int> v = {1, 2, 3, 4, 5};

// Iterator to first element
vector<int>::iterator it = v.begin();

// Access element
cout << *it;  // 1

// Move to next
it++;

// Iterator to past-the-end
auto end = v.end();`,
    analogy: "An iterator is like a bookmark in a book. It marks a specific page (element). You can move the bookmark forward, read the current page (*it), and know when you've reached the end.",
    codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // Using iterators explicitly
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // Find element
    auto found = find(numbers.begin(), numbers.end(), 8);
    if (found != numbers.end()) {
        cout << "Found at position: " << (found - numbers.begin()) << endl;
    }
    
    // Sort using iterators
    sort(numbers.begin(), numbers.end());
    
    // Reverse iterator
    for (auto rit = numbers.rbegin(); rit != numbers.rend(); ++rit) {
        cout << *rit << " ";  // prints in reverse
    }
}`,
    commonMistakes: [
      "Dereferencing end() iterator (undefined behavior)",
      "Iterator invalidation after modifying container",
      "Using iterators from different containers together",
    ],
    bestPractices: [
      "Use auto to avoid long iterator type names",
      "Use range-based for loops when you don't need iterators explicitly",
      "Be aware of iterator invalidation rules for each container",
    ],
    relatedTerms: ["vector", "STL", "algorithm", "pointer"],
  },
  {
    term: "queue",
    slug: "queue",
    shortDefinition: "A FIFO (First In, First Out) container adapter where elements are added at back and removed from front.",
    category: "STL",
    definition: "std::queue is a container adapter that operates in FIFO order. You push elements at the back and pop from the front. It's typically implemented using deque or list.",
    whyItExists: "Queues model waiting lines, task scheduling, breadth-first search, and any scenario where you need to process items in the order they arrived.",
    syntax: `#include <queue>

queue<int> q;
q.push(10);     // add to back
q.push(20);
q.push(30);

cout << q.front();  // 10 (first in)
q.pop();            // remove 10

cout << q.front();  // 20 (next in line)`,
    analogy: "A queue is like a line at a coffee shop. First person in line (front) gets served first. New people join at the back. Fair and orderly (FIFO).",
    codeExample: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> customerLine;
    
    // Customers arrive
    customerLine.push("Alice");
    customerLine.push("Bob");
    customerLine.push("Charlie");
    
    cout << "Serving customers..." << endl;
    
    // Serve in order
    while (!customerLine.empty()) {
        cout << "Serving: " << customerLine.front() << endl;
        customerLine.pop();
    }
    
    // BFS example
    queue<int> bfsQueue;
    bfsQueue.push(1);  // start node
    
    while (!bfsQueue.empty()) {
        int node = bfsQueue.front();
        bfsQueue.pop();
        // process node...
        // add neighbors to queue
    }
}`,
    commonMistakes: [
      "Calling front() or pop() on empty queue (undefined behavior)",
      "Confusing queue (FIFO) with stack (LIFO)",
      "Trying to access elements in middle (queue doesn't allow)",
    ],
    bestPractices: [
      "Always check !empty() before front() or pop()",
      "Use queue for BFS, task scheduling, and buffering",
      "Use priority_queue when you need elements ordered by priority",
    ],
    relatedTerms: ["stack", "deque", "priority_queue", "BFS"],
  },
  {
    term: "stack",
    slug: "stack-container",
    shortDefinition: "A LIFO (Last In, First Out) container adapter where elements are added and removed from the same end.",
    category: "STL",
    definition: "std::stack is a container adapter that operates in LIFO order. You push elements on top and pop from the top. It's typically implemented using deque or vector.",
    whyItExists: "Stacks model function calls, undo operations, expression evaluation, depth-first search, and any scenario where you need to process the most recent item first.",
    syntax: `#include <stack>

stack<int> s;
s.push(10);     // add to top
s.push(20);
s.push(30);

cout << s.top();  // 30 (last in, on top)
s.pop();          // remove 30

cout << s.top();  // 20 (now on top)`,
    analogy: "A stack is like a stack of plates. You can only add or remove plates from the top. The last plate added is the first one you take (LIFO).",
    codeExample: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    // Undo system
    stack<string> undoStack;
    
    undoStack.push("Typed: Hello");
    undoStack.push("Typed: World");
    undoStack.push("Deleted: World");
    
    cout << "Undo operations:" << endl;
    while (!undoStack.empty()) {
        cout << "Undo: " << undoStack.top() << endl;
        undoStack.pop();
    }
    
    // Balanced parentheses checker
    stack<char> parens;
    string expr = "((2 + 3) * (4 - 1))";
    
    for (char c : expr) {
        if (c == '(') parens.push(c);
        else if (c == ')') {
            if (parens.empty()) {
                cout << "Unbalanced!" << endl;
                break;
            }
            parens.pop();
        }
    }
    
    if (parens.empty()) {
        cout << "Balanced!" << endl;
    }
}`,
    commonMistakes: [
      "Calling top() or pop() on empty stack (undefined behavior)",
      "Confusing stack (LIFO) with queue (FIFO)",
      "Using stack when you need random access (use vector instead)",
    ],
    bestPractices: [
      "Always check !empty() before top() or pop()",
      "Use stack for DFS, expression parsing, and undo systems",
      "Remember: push adds, pop removes, top reads",
    ],
    relatedTerms: ["queue", "deque", "vector", "DFS"],
  },
  {
    term: "algorithm",
    slug: "algorithm",
    shortDefinition: "A step-by-step procedure for solving a problem or completing a task.",
    category: "Computer Science",
    definition: "An algorithm is a precise sequence of instructions that takes input, processes it through defined steps, and produces output. In C++, the <algorithm> header provides many common algorithms.",
    whyItExists: "Algorithms are the essence of programming — they're how we solve problems. The STL provides tested, optimized implementations of common algorithms so you don't reinvent the wheel.",
    syntax: `#include <algorithm>

// Sort
sort(v.begin(), v.end());

// Find
auto it = find(v.begin(), v.end(), value);

// Count
int n = count(v.begin(), v.end(), value);

// Transform
transform(v1.begin(), v1.end(), v2.begin(), func);`,
    analogy: "An algorithm is like a recipe. It's step-by-step instructions: (1) preheat oven, (2) mix ingredients, (3) bake for 20 minutes. Following the recipe (algorithm) produces cake (output).",
    codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3, 7};
    
    // Sort in ascending order
    sort(numbers.begin(), numbers.end());
    
    // Binary search (requires sorted data)
    if (binary_search(numbers.begin(), numbers.end(), 7)) {
        cout << "Found 7" << endl;
    }
    
    // Find maximum
    auto maxIt = max_element(numbers.begin(), numbers.end());
    cout << "Max: " << *maxIt << endl;
    
    // Count elements > 5
    int count = count_if(numbers.begin(), numbers.end(),
                         [](int n) { return n > 5; });
    cout << "Count > 5: " << count << endl;
    
    // Sum all elements
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Sum: " << sum << endl;
    
    // Reverse
    reverse(numbers.begin(), numbers.end());
}`,
    commonMistakes: [
      "Using binary_search on unsorted data",
      "Not understanding algorithm complexity (O(n), O(log n), etc.)",
      "Modifying container while algorithm is running on it",
    ],
    bestPractices: [
      "Learn STL algorithms before writing your own",
      "Understand time complexity of algorithms you use",
      "Combine algorithms: sort then binary_search for fast lookup",
      "Use lambdas for custom predicates",
    ],
    relatedTerms: ["STL", "sort", "search", "complexity", "iterator"],
  },
  {
    term: "struct",
    slug: "struct",
    shortDefinition: "A user-defined type that groups related data together, similar to class but with public default access.",
    category: "Data Types",
    definition: "A struct is like a class but with public members by default. It's used to group related data into a single unit. In C++, struct and class are almost identical — the only difference is default access.",
    whyItExists: "Structs provide a way to create simple data structures without the ceremony of classes. Perfect for Plain Old Data (POD) types that don't need encapsulation.",
    syntax: `struct Point {
    int x;      // public by default
    int y;
};

Point p;
p.x = 10;
p.y = 20;

struct Person {
    string name;
    int age;
    string email;
};`,
    analogy: "A struct is like a form with named fields. An employee form has fields for name, age, salary. You fill in the fields, and the form keeps them together as one unit.",
    codeExample: `#include <iostream>
#include <vector>
using namespace std;

struct Student {
    string name;
    int id;
    double gpa;
    
    void print() {  // structs can have methods too!
        cout << name << " (ID: " << id << ", GPA: " << gpa << ")" << endl;
    }
};

struct Rectangle {
    double width;
    double height;
    
    double area() const { return width * height; }
    double perimeter() const { return 2 * (width + height); }
};

int main() {
    Student s1 = {"Alice", 12345, 3.8};
    s1.print();
    
    vector<Student> students = {
        {"Bob", 12346, 3.5},
        {"Charlie", 12347, 3.9}
    };
    
    Rectangle r = {5.0, 3.0};
    cout << "Area: " << r.area() << endl;
}`,
    commonMistakes: [
      "Thinking struct and class are fundamentally different (they're not)",
      "Using struct when encapsulation is needed (use class)",
      "Forgetting the semicolon after struct definition",
    ],
    bestPractices: [
      "Use struct for simple data containers (POD types)",
      "Use class when you need encapsulation and invariants",
      "Convention: struct for data, class for objects with behavior",
    ],
    relatedTerms: ["class", "POD", "data structure"],
  },
  {
    term: "thread",
    slug: "thread",
    shortDefinition: "A lightweight process that allows concurrent execution of code within a program.",
    category: "Concurrency",
    definition: "A thread is an independent path of execution within a program. Multiple threads can run simultaneously, sharing the same memory space. C++11 introduced std::thread for multithreading.",
    whyItExists: "Threads enable parallelism — performing multiple tasks at once to utilize multiple CPU cores and improve performance. Common uses: background tasks, server handling multiple clients, parallel computation.",
    syntax: `#include <thread>

void myFunction() {
    // code runs in separate thread
}

int main() {
    thread t1(myFunction);  // start thread
    t1.join();              // wait for completion
}`,
    analogy: "Threads are like workers in a kitchen. Multiple cooks (threads) work simultaneously on different tasks (chopping, cooking, plating) in the same kitchen (shared memory). They work in parallel to get dinner ready faster.",
    codeExample: `#include <iostream>
#include <thread>
#include <vector>
using namespace std;

void printNumbers(int id, int count) {
    for (int i = 0; i < count; i++) {
        cout << "Thread " << id << ": " << i << endl;
    }
}

void computeSum(vector<int>& data, int& result) {
    result = 0;
    for (int n : data) {
        result += n;
    }
}

int main() {
    // Create threads
    thread t1(printNumbers, 1, 5);
    thread t2(printNumbers, 2, 5);
    
    // Wait for both to complete
    t1.join();
    t2.join();
    
    // Thread with shared data
    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    thread t3(computeSum, ref(numbers), ref(sum));
    t3.join();
    
    cout << "Sum: " << sum << endl;
}`,
    commonMistakes: [
      "Forgetting to join() or detach() threads (program terminates)",
      "Race conditions when multiple threads access shared data",
      "Deadlocks when threads wait for each other",
      "Not using mutexes to protect shared data",
    ],
    bestPractices: [
      "Use mutex to protect shared data from race conditions",
      "Use lock_guard or unique_lock for automatic mutex management",
      "Minimize shared state between threads",
      "Always join() or detach() before thread object is destroyed",
    ],
    relatedTerms: ["mutex", "race condition", "concurrency", "parallel"],
  },
  {
    term: "mutex",
    slug: "mutex",
    shortDefinition: "A synchronization primitive that ensures only one thread can access shared data at a time (mutual exclusion).",
    category: "Concurrency",
    definition: "A mutex (mutual exclusion) is a lock that prevents multiple threads from simultaneously accessing shared data. One thread locks the mutex, uses the shared data, then unlocks it so others can access it.",
    whyItExists: "Without mutexes, multiple threads accessing shared data simultaneously cause race conditions — unpredictable, buggy behavior. Mutexes ensure thread-safe access to shared resources.",
    syntax: `#include <mutex>

mutex mtx;

void criticalSection() {
    mtx.lock();
    // only one thread at a time here
    // access shared data safely
    mtx.unlock();
}

// Better: use lock_guard for automatic unlock
void betterCriticalSection() {
    lock_guard<mutex> lock(mtx);
    // access shared data
}  // automatically unlocks`,
    analogy: "A mutex is like a bathroom key. Only one person can use the bathroom (shared resource) at a time. You take the key (lock), use the bathroom, and return the key (unlock) so the next person can go.",
    codeExample: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

int counter = 0;
mutex counterMutex;

void incrementCounter(int iterations) {
    for (int i = 0; i < iterations; i++) {
        lock_guard<mutex> lock(counterMutex);  // lock
        counter++;
        // automatically unlocks when lock goes out of scope
    }
}

int main() {
    // Create 10 threads, each incrementing 1000 times
    vector<thread> threads;
    for (int i = 0; i < 10; i++) {
        threads.push_back(thread(incrementCounter, 1000));
    }
    
    // Wait for all threads
    for (auto& t : threads) {
        t.join();
    }
    
    cout << "Counter: " << counter << endl;  // 10000 (correct!)
    // Without mutex, would get random value < 10000
}`,
    commonMistakes: [
      "Forgetting to unlock mutex (deadlock)",
      "Locking mutexes in different order (deadlock)",
      "Not using RAII (lock_guard) for automatic unlock",
      "Holding locks too long (poor performance)",
    ],
    bestPractices: [
      "Always use lock_guard or unique_lock (RAII)",
      "Keep critical sections short",
      "Lock mutexes in consistent order to avoid deadlock",
      "Consider lock-free data structures when possible",
    ],
    relatedTerms: ["thread", "race condition", "deadlock", "lock_guard"],
  },
  {
    term: "file stream",
    slug: "file-stream",
    shortDefinition: "Objects used to read from and write to files, providing formatted I/O operations.",
    category: "File I/O",
    definition: "File streams (ifstream, ofstream, fstream) allow reading from and writing to files. They work like cin/cout but for files. Automatically handle opening, closing, and buffering.",
    whyItExists: "Programs need to persist data beyond runtime — save user data, configuration, logs. File streams provide a simple, safe interface for file operations.",
    syntax: `#include <fstream>

// Write to file
ofstream outFile("data.txt");
outFile << "Hello, file!" << endl;
outFile.close();

// Read from file
ifstream inFile("data.txt");
string line;
getline(inFile, line);
inFile.close();`,
    analogy: "File streams are like mail slots. ofstream is like sliding letters out (writing). ifstream is like pulling letters in (reading). The stream handles the mechanics — you just send/receive messages.",
    codeExample: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Write to file
    ofstream outFile("students.txt");
    if (outFile.is_open()) {
        outFile << "Alice,95" << endl;
        outFile << "Bob,87" << endl;
        outFile << "Charlie,92" << endl;
        outFile.close();
        cout << "File written successfully" << endl;
    }
    
    // Read from file
    ifstream inFile("students.txt");
    if (inFile.is_open()) {
        string line;
        cout << "Reading file:" << endl;
        while (getline(inFile, line)) {
            cout << line << endl;
        }
        inFile.close();
    } else {
        cout << "Unable to open file" << endl;
    }
    
    // Append to file
    ofstream appendFile("students.txt", ios::app);
    appendFile << "David,88" << endl;
    appendFile.close();
}`,
    commonMistakes: [
      "Not checking if file opened successfully",
      "Forgetting to close files (happens automatically but explicit is better)",
      "Using wrong mode (ios::in, ios::out, ios::app)",
      "Not handling file errors gracefully",
    ],
    bestPractices: [
      "Always check is_open() after opening files",
      "Use RAII — file closes automatically when object goes out of scope",
      "Use getline() for reading lines, >> for formatted input",
      "Handle file errors with exceptions or error flags",
    ],
    relatedTerms: ["ifstream", "ofstream", "fstream", "I/O"],
  },
  {
    term: "enum",
    slug: "enum",
    shortDefinition: "A user-defined type that consists of named integer constants, making code more readable.",
    category: "Data Types",
    definition: "An enumeration (enum) defines a set of named constants. Instead of using magic numbers, you give meaningful names. C++11 introduced enum class for type-safe enumerations.",
    whyItExists: "Magic numbers make code unclear. Is 0 'Sunday' or 'Monday'? enum gives meaningful names: Day::Sunday. enum class prevents accidental conversions and name conflicts.",
    syntax: `// C-style enum
enum Color { RED, GREEN, BLUE };
Color c = RED;

// C++11 enum class (preferred)
enum class Status { Active, Inactive, Pending };
Status s = Status::Active;

// Explicit values
enum ErrorCode { Success = 0, NotFound = 404, ServerError = 500 };`,
    analogy: "An enum is like named constants on a coffee machine. Instead of buttons labeled 1, 2, 3 (meaningless), they're labeled Espresso, Latte, Cappuccino (clear). Everyone knows what they're ordering.",
    codeExample: `#include <iostream>
using namespace std;

enum class Day {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
};

enum class TrafficLight {
    Red, Yellow, Green
};

string getDayName(Day d) {
    switch (d) {
        case Day::Monday: return "Monday";
        case Day::Tuesday: return "Tuesday";
        case Day::Wednesday: return "Wednesday";
        case Day::Thursday: return "Thursday";
        case Day::Friday: return "Friday";
        case Day::Saturday: return "Saturday";
        case Day::Sunday: return "Sunday";
    }
    return "Unknown";
}

int main() {
    Day today = Day::Wednesday;
    cout << "Today is " << getDayName(today) << endl;
    
    TrafficLight light = TrafficLight::Green;
    if (light == TrafficLight::Green) {
        cout << "Go!" << endl;
    }
    
    // Type safety: can't compare different enum types
    // if (today == light) { }  // ERROR!
}`,
    commonMistakes: [
      "Using C-style enum instead of enum class (less type-safe)",
      "Forgetting enum class requires scope: Status::Active not Active",
      "Not handling all enum values in switch (compiler warning)",
    ],
    bestPractices: [
      "Prefer enum class over plain enum for type safety",
      "Use enum class to prevent name conflicts",
      "Explicitly set values when the numeric value matters",
      "Handle all enum cases in switch statements",
    ],
    relatedTerms: ["enum class", "constants", "type safety"],
  },
  {
    term: "typedef",
    slug: "typedef",
    shortDefinition: "A keyword that creates an alias (alternative name) for an existing type, improving code readability.",
    category: "Type System",
    definition: "typedef lets you create a new name for an existing type. It doesn't create a new type — just an alias. C++11 introduced using, which is preferred and more flexible.",
    whyItExists: "Some type names are long and cumbersome (vector<pair<string, int>>). typedef gives them short, meaningful names. It also makes code easier to refactor — change the typedef once instead of everywhere.",
    syntax: `// Old style
typedef unsigned int uint;
typedef vector<int> IntVector;

// Modern C++11 style (preferred)
using uint = unsigned int;
using IntVector = vector<int>;
using IntPair = pair<int, int>;`,
    analogy: "typedef is like a nickname. Your friend's full name is 'Alexander Jonathan Smith III' but everyone calls him 'AJ'. AJ is easier to say, but it's the same person.",
    codeExample: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

// Type aliases for clarity
using StudentID = int;
using Grade = double;
using GradeMap = map<StudentID, Grade>;

// Function pointer typedef
typedef int (*MathFunc)(int, int);
// or modern:
using MathFunc2 = int (*)(int, int);

int add(int a, int b) { return a + b; }

int main() {
    GradeMap grades;
    grades[12345] = 3.8;
    grades[12346] = 3.5;
    
    for (auto& [id, grade] : grades) {
        cout << "Student " << id << ": " << grade << endl;
    }
    
    MathFunc operation = add;
    cout << operation(5, 3) << endl;  // 8
}`,
    commonMistakes: [
      "Using typedef instead of using (using is clearer)",
      "Creating confusing aliases that hide the underlying type",
      "Overusing typedef for simple types",
    ],
    bestPractices: [
      "Prefer using over typedef in modern C++",
      "Use aliases to simplify complex template types",
      "Give aliases meaningful names that clarify intent",
      "Don't alias fundamental types unless there's a good reason",
    ],
    relatedTerms: ["using", "alias", "type"],
  },
];

export function getGlossaryList() {
  return glossaryTerms.map(t => ({
    term: t.term,
    slug: t.slug,
    shortDefinition: t.shortDefinition,
    category: t.category,
  }));
}

export function getGlossaryTerm(slug: string): GlossaryTermData | undefined {
  return glossaryTerms.find(t => t.slug === slug);
}


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

  "data-types": [
    {
      id: "dt-1",
      lessonId: "data-types",
      type: "multiple_choice",
      question: "Which data type would you use to store the value 3.14159?",
      options: ["int", "double", "char", "bool"],
      correctAnswer: "double",
      explanation: "double is used for decimal numbers (floating-point). int stores whole numbers only, char stores single characters, and bool stores true/false.",
    },
    {
      id: "dt-2",
      lessonId: "data-types",
      type: "true_false",
      question: "A char variable in C++ can store a full word or sentence.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "char stores only a SINGLE character. For words/sentences, use string (from the standard library).",
    },
    {
      id: "dt-3",
      lessonId: "data-types",
      type: "predict_output",
      question: "What will this code output?",
      codeSnippet: `bool isTrue = true;
std::cout << isTrue;`,
      options: ["true", "1", "TRUE", "false"],
      correctAnswer: "1",
      explanation: "In C++, bool values print as 1 (true) or 0 (false) by default. To print 'true'/'false', use std::cout << std::boolalpha << isTrue.",
    },
    {
      id: "dt-4",
      lessonId: "data-types",
      type: "multiple_choice",
      question: "What is the correct way to declare a constant integer?",
      options: ["int const x = 10;", "const int x = 10;", "final int x = 10;", "readonly int x = 10;"],
      correctAnswer: "const int x = 10;",
      explanation: "Use 'const' before the type to make a variable read-only. 'const int x = 10;' is the standard syntax in C++.",
    },
    {
      id: "dt-5",
      lessonId: "data-types",
      type: "predict_output",
      question: "What is the output?",
      codeSnippet: `int x = 5;
int y = 2;
cout << x / y;`,
      options: ["2.5", "2", "3", "Error"],
      correctAnswer: "2",
      explanation: "Integer division discards the remainder. 5 / 2 = 2 (not 2.5). For decimal results, use double: double x = 5.0; double y = 2.0;",
    },
  ],

  "operators": [
    {
      id: "op-1",
      lessonId: "operators",
      type: "multiple_choice",
      question: "What does the modulo operator % do?",
      options: [
        "Divides two numbers",
        "Returns the remainder after division",
        "Calculates percentage",
        "Multiplies two numbers",
      ],
      correctAnswer: "Returns the remainder after division",
      explanation: "The % operator returns the remainder. Example: 7 % 3 = 1 (because 7 ÷ 3 = 2 remainder 1).",
    },
    {
      id: "op-2",
      lessonId: "operators",
      type: "predict_output",
      question: "What will x be after this code runs?",
      codeSnippet: `int x = 10;
x += 5;`,
      options: ["10", "5", "15", "Error"],
      correctAnswer: "15",
      explanation: "x += 5 is shorthand for x = x + 5. So x becomes 10 + 5 = 15.",
    },
    {
      id: "op-3",
      lessonId: "operators",
      type: "multiple_choice",
      question: "What is the difference between == and =?",
      options: [
        "They are the same",
        "== compares equality, = assigns a value",
        "= compares equality, == assigns a value",
        "Both assign values",
      ],
      correctAnswer: "== compares equality, = assigns a value",
      explanation: "= is assignment (x = 5 sets x to 5). == is comparison (x == 5 checks if x equals 5, returns true/false).",
    },
  ],

  "loops": [
    {
      id: "loop-1",
      lessonId: "loops",
      type: "predict_output",
      question: "How many times will this loop print 'Hello'?",
      codeSnippet: `for (int i = 0; i < 5; i++) {
    cout << "Hello" << endl;
}`,
      options: ["4", "5", "6", "Infinite"],
      correctAnswer: "5",
      explanation: "The loop runs while i < 5. Starting at 0: 0, 1, 2, 3, 4 → 5 times total.",
    },
    {
      id: "loop-2",
      lessonId: "loops",
      type: "multiple_choice",
      question: "What does the 'break' statement do in a loop?",
      options: [
        "Skips the current iteration and continues with the next",
        "Exits the loop immediately",
        "Pauses the loop temporarily",
        "Restarts the loop from the beginning",
      ],
      correctAnswer: "Exits the loop immediately",
      explanation: "break exits the loop completely. continue skips the current iteration and moves to the next one.",
    },
    {
      id: "loop-3",
      lessonId: "loops",
      type: "true_false",
      question: "A while loop checks its condition before running the loop body.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "while checks the condition first. If false initially, the loop never runs. do-while checks after, so it always runs at least once.",
    },
  ],

  "functions": [
    {
      id: "func-1",
      lessonId: "functions",
      type: "multiple_choice",
      question: "What does a function's return type specify?",
      options: [
        "The number of parameters it takes",
        "The type of value it returns",
        "How long it takes to execute",
        "Whether it can be called",
      ],
      correctAnswer: "The type of value it returns",
      explanation: "The return type (int, double, void, etc.) tells you what type of value the function returns. void means it returns nothing.",
    },
    {
      id: "func-2",
      lessonId: "functions",
      type: "predict_output",
      question: "What will this code output?",
      codeSnippet: `int multiply(int a, int b) {
    return a * b;
}

int main() {
    cout << multiply(3, 4);
    return 0;
}`,
      options: ["7", "12", "34", "Error"],
      correctAnswer: "12",
      explanation: "The function multiply(3, 4) returns 3 * 4 = 12, which is then printed.",
    },
    {
      id: "func-3",
      lessonId: "functions",
      type: "true_false",
      question: "A function must always return a value.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Functions with return type void do not return a value. They just perform actions.",
    },
  ],

  "input-output": [
    {
      id: "io-1",
      lessonId: "input-output",
      type: "multiple_choice",
      question: "Which operator is used to read input from the user?",
      options: ["cout <<", "cin >>", "scanf", "input()"],
      correctAnswer: "cin >>",
      explanation: "cin >> reads input from the user. cout << outputs to the console.",
    },
    {
      id: "io-2",
      lessonId: "input-output",
      type: "true_false",
      question: "cin >> stops reading input when it encounters a space.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "cin >> reads until whitespace (space, tab, newline). To read a full line with spaces, use getline().",
    },
    {
      id: "io-3",
      lessonId: "input-output",
      type: "multiple_choice",
      question: "What does endl do?",
      options: [
        "Ends the program",
        "Inserts a newline and flushes the output buffer",
        "Pauses for user input",
        "Clears the screen",
      ],
      correctAnswer: "Inserts a newline and flushes the output buffer",
      explanation: "endl adds a newline (\\n) and flushes the buffer, ensuring output appears immediately. You can also use '\\n' for just a newline without flushing.",
    },
  ],

  "pointers-memory": [
    {
      id: "pm-1",
      lessonId: "pointers-memory",
      type: "multiple_choice",
      question: "What does the & operator do?",
      options: [
        "Dereferences a pointer",
        "Gets the address of a variable",
        "Allocates memory on the heap",
        "Compares two values",
      ],
      correctAnswer: "Gets the address of a variable",
      explanation: "& is the address-of operator. int* ptr = &x; stores the memory address of x in ptr.",
    },
    {
      id: "pm-2",
      lessonId: "pointers-memory",
      type: "multiple_choice",
      question: "What does the * operator do with pointers?",
      options: [
        "Multiplies two numbers",
        "Dereferences a pointer to access the value it points to",
        "Gets the address of a variable",
        "Deletes a pointer",
      ],
      correctAnswer: "Dereferences a pointer to access the value it points to",
      explanation: "* dereferences a pointer. int* ptr = &x; *ptr accesses the value stored at the address ptr points to.",
    },
    {
      id: "pm-3",
      lessonId: "pointers-memory",
      type: "true_false",
      question: "Memory allocated with 'new' must be manually freed with 'delete'.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Unlike stack memory which is automatically freed, heap memory allocated with 'new' must be manually freed with 'delete' to avoid memory leaks.",
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


// Re-export for convenience
export const GLOSSARY_TERMS = getGlossaryList();
export const LESSONS = lessons;
export const QUIZZES = quizzes;

export function getLessons() {
  return lessons;
}

export function getGlossary() {
  return getGlossaryList();
}

export function getLesson(id: string) {
  return lessons.find(lesson => lesson.id === id);
}
