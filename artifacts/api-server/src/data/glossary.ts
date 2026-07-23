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
      "Using <> instead of "" for local headers",
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
  }
];
    virtual double perimeter() = 0; // pure virtual
    // Cannot create a Shape object directly!
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() override { return 3.14159 * r * r; }
    double perimeter() override { return 2 * 3.14159 * r; }
};`,
    analogy: "Abstraction is like driving a car. You use the steering wheel, accelerator, and brakes (the interface). You don't need to understand the combustion engine, transmission gears, or brake hydraulics (hidden implementation). The complexity is abstracted away.",
    codeExample: `class DatabaseConnection {
public:
    virtual void connect(string host, int port) = 0;
    virtual void disconnect() = 0;
    virtual bool query(string sql) = 0;
    virtual ~DatabaseConnection() {}
};

class MySQLConnection : public DatabaseConnection {
public:
    void connect(string host, int port) override {
        // actual MySQL connection code
    }
    void disconnect() override { /* ... */ }
    bool query(string sql) override { /* ... */ return true; }
};`,
    commonMistakes: [
      "Trying to instantiate an abstract class directly",
      "Forgetting to implement all pure virtual functions in derived class",
      "Not declaring virtual destructor in abstract base class",
    ],
    bestPractices: [
      "Use abstract classes to define contracts/interfaces",
      "Always declare the destructor virtual in abstract base classes",
      "Keep the interface minimal — only expose what users need",
    ],
    relatedTerms: ["class", "inheritance", "polymorphism", "encapsulation", "virtual"],
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
