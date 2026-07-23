import { useState } from 'react';
import { FlashcardDeck, type Flashcard } from '@/components/flashcards/flashcard-deck';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Layers, Zap } from 'lucide-react';

// Sample flashcard data
const flashcardDecks: Record<string, Flashcard[]> = {
  basics: [
    {
      id: 'var-1',
      front: 'What is a variable in C++?',
      back: 'A variable is a named storage location in memory that holds a value. It has a data type, name, and value. Variables must be declared before use.',
      category: 'Basics',
      difficulty: 'easy',
      example: 'int age = 25;        // Integer variable\nstring name = "John";  // String variable\ndouble price = 99.99;  // Double variable'
    },
    {
      id: 'var-2',
      front: 'What is the "int" data type?',
      back: 'Integer - stores whole numbers (positive or negative) without decimals. Typical range: -2,147,483,648 to 2,147,483,647 (32-bit system).',
      category: 'Data Types',
      difficulty: 'easy',
      example: 'int score = 100;\nint temperature = -5;\nint year = 2026;'
    },
    {
      id: 'var-3',
      front: 'What is the difference between int, float, and double?',
      back: 'int: whole numbers only. float: decimal numbers (6-7 digits precision). double: decimal numbers with more precision (15-16 digits). double uses more memory but is more accurate.',
      category: 'Data Types',
      difficulty: 'easy',
      example: 'int count = 10;         // No decimals\nfloat price = 19.99f;   // ~7 digits\ndouble pi = 3.14159265; // ~15 digits'
    },
    {
      id: 'op-1',
      front: 'What is the modulus operator (%) used for?',
      back: 'Returns the remainder after division. Useful for checking if numbers are even/odd, cycling through ranges, and pattern detection.',
      category: 'Operators',
      difficulty: 'easy',
      example: 'int remainder = 17 % 5;  // remainder = 2\nint isEven = 10 % 2;    // isEven = 0\nint isOdd = 11 % 2;     // isOdd = 1'
    },
    {
      id: 'op-2',
      front: 'What is the difference between ++ (pre-increment) and (post-increment)?',
      back: '++i (pre): increment first, then use value. i++ (post): use value first, then increment. Both add 1 to i, but timing differs in expressions.',
      category: 'Operators',
      difficulty: 'medium',
      example: 'int i = 5;\nint a = ++i;  // a = 6, i = 6 (increment first)\nint b = i++;  // b = 6, i = 7 (use then increment)'
    },
    {
      id: 'io-1',
      front: 'What does "cout" do in C++?',
      back: 'cout (Console Output) sends output to the screen. Part of iostream library. Uses << operator to chain output.',
      category: 'Input/Output',
      difficulty: 'easy',
      example: '#include <iostream>\nusing namespace std;\n\ncout << "Hello World!" << endl;\ncout << "Score: " << 95 << endl;'
    },
    {
      id: 'io-2',
      front: 'What does "cin" do in C++?',
      back: 'cin (Console Input) reads input from the keyboard. Uses >> operator. Stops at whitespace for strings.',
      category: 'Input/Output',
      difficulty: 'easy',
      example: 'int age;\nstring name;\n\ncin >> age;   // Read integer\ncin >> name;  // Read string (stops at space)'
    },
    {
      id: 'str-1',
      front: 'What is the difference between char and string?',
      back: 'char: single character (\'A\', \'5\', \'@\'). Uses single quotes. string: sequence of characters ("Hello"). Uses double quotes. string is more flexible.',
      category: 'Data Types',
      difficulty: 'easy',
      example: 'char grade = \'A\';          // Single character\nstring name = "John Doe";  // Multiple characters'
    }
  ],
  
  pointers: [
    {
      id: 'ptr-1',
      front: 'What is a pointer in C++?',
      back: 'A pointer is a variable that stores the memory address of another variable. Declared using * symbol. Provides direct memory access and enables dynamic memory allocation.',
      category: 'Pointers',
      difficulty: 'medium',
      example: 'int x = 10;\nint* ptr = &x;  // ptr stores address of x\ncout << ptr;    // Prints address\ncout << *ptr;   // Prints value 10'
    },
    {
      id: 'ptr-2',
      front: 'What does the "&" (address-of) operator do?',
      back: 'Returns the memory address of a variable. Used to get the location where a variable is stored in memory.',
      category: 'Pointers',
      difficulty: 'medium',
      example: 'int num = 42;\nint* ptr = &num;  // Get address of num\ncout << &num;     // Prints address like 0x7fff5fbff8ac'
    },
    {
      id: 'ptr-3',
      front: 'What does the "*" (dereference) operator do with pointers?',
      back: 'Accesses the value stored at the memory address the pointer points to. Also used to declare pointer variables.',
      category: 'Pointers',
      difficulty: 'medium',
      example: 'int age = 25;\nint* ptr = &age;  // Declare pointer\ncout << *ptr;     // Dereference: prints 25\n*ptr = 30;        // Change age to 30'
    },
    {
      id: 'ptr-4',
      front: 'What is a null pointer?',
      back: 'A pointer that points to nothing/nowhere. Initialized with nullptr (C++11+) or NULL. Should be checked before dereferencing to prevent crashes.',
      category: 'Pointers',
      difficulty: 'medium',
      example: 'int* ptr = nullptr;  // Null pointer\nif (ptr != nullptr) {\n    cout << *ptr;  // Safe to use\n}'
    },
    {
      id: 'ptr-5',
      front: 'What is the difference between a pointer and a reference?',
      back: 'Pointer: can be null, can be reassigned, uses * and &. Reference: must be initialized, cannot be reassigned, uses &, acts as alias. References are safer but less flexible.',
      category: 'Pointers',
      difficulty: 'hard',
      example: 'int x = 10;\nint* ptr = &x;   // Pointer\nptr = nullptr;   // Can reassign\n\nint& ref = x;    // Reference\n// ref = y;      // Cannot reassign to different variable'
    },
    {
      id: 'arr-1',
      front: 'How are arrays and pointers related?',
      back: 'Array name acts as a pointer to the first element. Can use pointer arithmetic to access array elements. arr[i] is equivalent to *(arr + i).',
      category: 'Pointers',
      difficulty: 'hard',
      example: 'int arr[5] = {10, 20, 30, 40, 50};\nint* ptr = arr;  // arr is pointer to arr[0]\ncout << *ptr;      // 10\ncout << *(ptr+2);  // 30'
    }
  ],
  
  oop: [
    {
      id: 'oop-1',
      front: 'What is a class in C++?',
      back: 'A class is a blueprint for creating objects. It defines properties (data members) and methods (member functions). Supports encapsulation, inheritance, and polymorphism.',
      category: 'OOP',
      difficulty: 'medium',
      example: 'class Car {\npublic:\n    string brand;\n    int year;\n    void drive() {\n        cout << "Driving!";\n    }\n};'
    },
    {
      id: 'oop-2',
      front: 'What is an object in C++?',
      back: 'An object is an instance of a class. It\'s a concrete entity with actual values for the class properties. Multiple objects can be created from one class.',
      category: 'OOP',
      difficulty: 'medium',
      example: 'Car myCar;              // Create object\nmyCar.brand = "Toyota"; // Set property\nmyCar.year = 2026;\nmyCar.drive();          // Call method'
    },
    {
      id: 'oop-3',
      front: 'What is encapsulation?',
      back: 'Bundling data and methods together while restricting direct access using access specifiers (public, private, protected). Protects data integrity and hides implementation details.',
      category: 'OOP',
      difficulty: 'hard',
      example: 'class Account {\nprivate:\n    double balance;  // Hidden\npublic:\n    void deposit(double amt) {\n        if(amt > 0) balance += amt;\n    }\n};'
    },
    {
      id: 'oop-4',
      front: 'What is inheritance in C++?',
      back: 'Allows a class (derived/child) to inherit properties and methods from another class (base/parent). Promotes code reuse and establishes relationships.',
      category: 'OOP',
      difficulty: 'hard',
      example: 'class Animal {\npublic:\n    void eat() { }\n};\n\nclass Dog : public Animal {\npublic:\n    void bark() { }  // Dog has eat() + bark()\n};'
    },
    {
      id: 'oop-5',
      front: 'What is polymorphism?',
      back: 'Ability for objects of different classes to be treated as objects of a common base class. Same interface, different implementations. Achieved through virtual functions and overriding.',
      category: 'OOP',
      difficulty: 'hard',
      example: 'class Shape {\npublic:\n    virtual void draw() = 0;  // Pure virtual\n};\nclass Circle : public Shape {\n    void draw() override { /* Circle drawing */ }\n};'
    },
    {
      id: 'oop-6',
      front: 'What is a constructor?',
      back: 'Special method called automatically when an object is created. Same name as class, no return type. Used to initialize object properties.',
      category: 'OOP',
      difficulty: 'medium',
      example: 'class Person {\npublic:\n    string name;\n    Person(string n) {  // Constructor\n        name = n;\n    }\n};\nPerson p1("John");  // Constructor called'
    },
    {
      id: 'oop-7',
      front: 'What is a destructor?',
      back: 'Special method called when an object is destroyed. Same name as class with ~ prefix. No parameters or return type. Used to free resources (memory, files).',
      category: 'OOP',
      difficulty: 'medium',
      example: 'class File {\npublic:\n    File() { /* Open file */ }\n    ~File() {  // Destructor\n        /* Close file */\n    }\n};'
    }
  ],
  
  stl: [
    {
      id: 'stl-1',
      front: 'What is a vector in C++?',
      back: 'A dynamic array that can grow/shrink automatically. Part of STL. Provides size(), push_back(), pop_back(), and more. More flexible than regular arrays.',
      category: 'STL',
      difficulty: 'medium',
      example: '#include <vector>\nvector<int> nums;    // Empty vector\nnums.push_back(10);  // Add element\nnums.push_back(20);\ncout << nums.size(); // 2'
    },
    {
      id: 'stl-2',
      front: 'What is the difference between array and vector?',
      back: 'Array: fixed size, faster, basic syntax. Vector: dynamic size, more features (push_back, size, insert), slightly slower. Use vectors when size changes.',
      category: 'STL',
      difficulty: 'medium',
      example: 'int arr[5];          // Fixed 5 elements\nvector<int> vec;     // Starts empty\nvec.push_back(1);    // Now size is 1\nvec.push_back(2);    // Now size is 2'
    },
    {
      id: 'stl-3',
      front: 'What is a map in C++?',
      back: 'Stores key-value pairs where each key is unique and sorted. Fast lookup O(log n). Like a dictionary. Part of STL.',
      category: 'STL',
      difficulty: 'hard',
      example: '#include <map>\nmap<string, int> ages;\nages["John"] = 25;   // Add entry\nages["Mary"] = 30;\ncout << ages["John"]; // 25'
    },
    {
      id: 'stl-4',
      front: 'What is a string in C++?',
      back: 'A class from STL that represents text. Provides length(), substr(), find(), append(), and more. More powerful than char arrays.',
      category: 'STL',
      difficulty: 'easy',
      example: '#include <string>\nstring text = "Hello";\ntext += " World";     // Concatenate\ncout << text.length(); // 11\ncout << text.substr(0,5); // "Hello"'
    },
    {
      id: 'stl-5',
      front: 'What is the difference between vector and array?',
      back: 'Vector: dynamic size, STL container, more methods, slower. Array: fixed size, built-in type, faster, less features. Vector is safer and more flexible.',
      category: 'STL',
      difficulty: 'medium',
      example: 'int arr[100];        // Fixed 100 slots, wastes memory\nvector<int> vec;     // Grows as needed\nvec.reserve(100);    // Pre-allocate if needed'
    }
  ]
};

export default function FlashcardsPage() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  if (selectedDeck) {
    return (
      <div className="min-h-screen p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setSelectedDeck(null)}
          >
            ← Back to Decks
          </Button>
          
          <FlashcardDeck 
            cards={flashcardDecks[selectedDeck]} 
            title={selectedDeck.charAt(0).toUpperCase() + selectedDeck.slice(1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-primary" />
            Flashcards
          </h1>
          <p className="text-muted-foreground">
            Master C++ concepts with interactive flashcards
          </p>
        </div>

        {/* Stats Overview */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Object.values(flashcardDecks).flat().length}
              </div>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">4</div>
              <p className="text-sm text-muted-foreground">Decks Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">0</div>
              <p className="text-sm text-muted-foreground">Cards Mastered</p>
            </div>
          </div>
        </Card>

        {/* Deck Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeckCard
            title="C++ Basics"
            description="Variables, data types, operators, and I/O"
            cardCount={flashcardDecks.basics.length}
            difficulty="Beginner"
            icon={Code}
            color="from-blue-500 to-cyan-500"
            onClick={() => setSelectedDeck('basics')}
          />
          
          <DeckCard
            title="Pointers & References"
            description="Memory addresses, pointers, references, and arrays"
            cardCount={flashcardDecks.pointers.length}
            difficulty="Intermediate"
            icon={Zap}
            color="from-purple-500 to-pink-500"
            onClick={() => setSelectedDeck('pointers')}
          />
          
          <DeckCard
            title="Object-Oriented Programming"
            description="Classes, objects, inheritance, polymorphism, and more"
            cardCount={flashcardDecks.oop.length}
            difficulty="Intermediate"
            icon={Layers}
            color="from-green-500 to-emerald-500"
            onClick={() => setSelectedDeck('oop')}
          />
          
          <DeckCard
            title="Standard Template Library"
            description="Vectors, maps, strings, and STL containers"
            cardCount={flashcardDecks.stl.length}
            difficulty="Advanced"
            icon={Brain}
            color="from-orange-500 to-red-500"
            onClick={() => setSelectedDeck('stl')}
          />
        </div>
      </div>
    </div>
  );
}

interface DeckCardProps {
  title: string;
  description: string;
  cardCount: number;
  difficulty: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

function DeckCard({ title, description, cardCount, difficulty, icon: Icon, color, onClick }: DeckCardProps) {
  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline">{cardCount} cards</Badge>
            <Badge variant={
              difficulty === 'Beginner' ? 'secondary' :
              difficulty === 'Intermediate' ? 'default' : 'destructive'
            }>
              {difficulty}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
