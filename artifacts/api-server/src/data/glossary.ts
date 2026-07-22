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
