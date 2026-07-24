/**
 * uPhumeh - Python Learning Content
 * Translated and adapted from C++ content for Python programming
 */

import type { LessonData, GlossaryTermData, QuizData, QuizQuestion } from './types';

export const pythonLessons: LessonData[] = [
  {
    id: 'what-is-python',
    title: 'What is Python?',
    description: 'Introduction to Python programming language and its applications.',
    order: 1,
    difficulty: 'beginner',
    estimatedMinutes: 15,
    content: `# What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python has become one of the most popular programming languages in the world.

## Why Python?

- **Easy to Learn**: Python's syntax is clean and readable, similar to English
- **Versatile**: Used in web development, data science, AI, automation, and more
- **Large Community**: Extensive libraries and strong community support
- **Cross-Platform**: Runs on Windows, Mac, Linux, and more

## What Can You Build?

- Web applications (Django, Flask)
- Data analysis and visualization
- Machine learning and AI models
- Automation scripts
- Games and more!`,
    codeExamples: [
      {
        id: 'py-hello',
        title: 'Hello World in Python',
        code: 'print("Hello, World!")',
        explanation: 'The print() function outputs text to the console.',
        language: 'python',
        output: 'Hello, World!',
      },
    ],
    quizQuestions: [],
    prerequisites: [],
    learningObjectives: [
      'Understand what Python is and its history',
      'Know the main uses of Python',
      'Write your first Python program',
    ],
    topics: ['python', 'basics', 'history'],
    keyPoints: ['Python is beginner-friendly', 'It is used across many domains'],
  },
  {
    id: 'python-variables',
    title: 'Variables and Data Types',
    description: 'Learn how to store and work with different types of data in Python.',
    order: 2,
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `# Variables and Data Types

In Python, variables are created when you assign a value to them. Unlike some languages, you don't need to declare the type — Python figures it out automatically!

## Common Data Types

- **int**: Whole numbers (e.g., 42, -10, 0)
- **float**: Decimal numbers (e.g., 3.14, -0.5)
- **str**: Text strings (e.g., "Hello", 'Python')
- **bool**: True or False values
- **list**: Ordered collection (e.g., [1, 2, 3])
- **dict**: Key-value pairs (e.g., {"name": "Alice", "age": 25})

## Type Checking

Use type() to check the type of a variable:
\`\`\`python
x = 42
print(type(x))  # <class 'int'>
\`\`\``,
    codeExamples: [
      {
        id: 'py-vars',
        title: 'Creating Variables',
        code: `# Different data types
name = "Alice"      # string
age = 25            # integer
height = 5.7        # float
is_student = True   # boolean
hobbies = ["reading", "coding"]  # list

print(name, age)
print("Height:", height)
print("Hobbies:", hobbies)`,
        explanation: 'Python automatically determines the type based on the value assigned.',
        language: 'python',
        output: 'Alice 25\nHeight: 5.7\nHobbies: [\'reading\', \'coding\']',
      },
    ],
    quizQuestions: [],
    prerequisites: ['what-is-python'],
    learningObjectives: [
      'Create variables in Python',
      'Understand different data types',
      'Use type() to check variable types',
    ],
    topics: ['variables', 'data types', 'typing'],
    keyPoints: ['Variables store values', 'Python infers types automatically'],
  },
  {
    id: 'python-operators',
    title: 'Operators and Expressions',
    description: 'Learn how to perform operations on data using Python operators.',
    order: 3,
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `# Operators and Expressions

Operators are symbols that perform operations on values and variables.

## Arithmetic Operators
- \`+\` Addition
- \`-\` Subtraction
- \`*\` Multiplication
- \`/\` Division (returns float)
- \`//\` Floor Division (returns integer)
- \`%\` Modulus (remainder)
- \`**\` Exponentiation

## Comparison Operators
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

## Logical Operators
- \`and\` Returns True if both conditions are true
- \`or\` Returns True if at least one condition is true
- \`not\` Reverses the boolean result`,
    codeExamples: [
      {
        id: 'py-ops',
        title: 'Using Operators',
        code: `# Arithmetic
a = 10
b = 3
print(a + b)   # 13
print(a / b)   # 3.333...
print(a // b)  # 3 (floor division)
print(a % b)   # 1 (remainder)
print(a ** 2)  # 100 (10 squared)

# Comparison
print(10 > 5)   # True
print(10 == 10) # True
print(10 != 5)  # True

# Logical
x = True
y = False
print(x and y)  # False
print(x or y)   # True
print(not x)    # False`,
        explanation: 'Python operators work similarly to mathematical operators.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-variables'],
    learningObjectives: [
      'Use arithmetic operators',
      'Use comparison operators',
      'Use logical operators',
    ],
    topics: ['operators', 'expressions', 'logic'],
    keyPoints: ['Operators perform calculations', 'Comparisons return booleans'],
  },
  {
    id: 'python-conditionals',
    title: 'Conditional Statements',
    description: 'Learn how to make decisions in your Python code using if, elif, and else.',
    order: 4,
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `# Conditional Statements

Conditionals allow your program to make decisions based on conditions.

## if Statement
\`\`\`python
if condition:
    # code runs if condition is True
\`\`\`

## if-else Statement
\`\`\`python
if condition:
    # code runs if condition is True
else:
    # code runs if condition is False
\`\`\`

## if-elif-else Statement
\`\`\`python
if condition1:
    # runs if condition1 is True
elif condition2:
    # runs if condition2 is True
else:
    # runs if all conditions are False
\`\`\`

**Important**: Python uses indentation (spaces/tabs) to define code blocks!`,
    codeExamples: [
      {
        id: 'py-if',
        title: 'Using Conditionals',
        code: `age = 18

if age < 13:
    print("You are a child")
elif age < 18:
    print("You are a teenager")
elif age < 65:
    print("You are an adult")
else:
    print("You are a senior")

# Output: You are an adult

# Nested conditionals
score = 85
if score >= 50:
    if score >= 80:
        print("Grade: A")
    else:
        print("Grade: B")
else:
    print("Grade: F")`,
        explanation: 'Conditionals check conditions in order and execute the first matching block.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-operators'],
    learningObjectives: [
      'Write if statements',
      'Write if-else statements',
      'Write if-elif-else statements',
    ],
    topics: ['conditionals', 'decision making', 'control flow'],
    keyPoints: ['Conditionals choose between paths', 'Indentation defines blocks'],
  },
  {
    id: 'python-loops',
    title: 'Loops and Iteration',
    description: 'Learn how to repeat code using for and while loops.',
    order: 5,
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `# Loops and Iteration

Loops allow you to execute a block of code multiple times.

## for Loop
Used for iterating over a sequence (list, tuple, string, range, etc.)

\`\`\`python
for item in sequence:
    # code runs for each item
\`\`\`

## while Loop
Runs as long as a condition is True

\`\`\`python
while condition:
    # code runs while condition is True
\`\`\`

## Loop Control
- \`break\`: Exit the loop immediately
- \`continue\`: Skip to the next iteration
- \`range()\`: Generate a sequence of numbers`,
    codeExamples: [
      {
        id: 'py-loops',
        title: 'Using Loops',
        code: `# for loop with range
for i in range(5):
    print(i)  # prints 0, 1, 2, 3, 4

# for loop with list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# while loop
count = 0
while count < 3:
    print(count)
    count += 1  # important: update counter!

# break and continue
for i in range(10):
    if i == 3:
        continue  # skip 3
    if i == 7:
        break     # stop at 7
    print(i)  # prints 0, 1, 2, 4, 5, 6`,
        explanation: 'Loops are essential for processing collections and repeating tasks.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-conditionals'],
    learningObjectives: [
      'Write for loops',
      'Write while loops',
      'Use break and continue',
    ],
    topics: ['loops', 'iteration', 'repetition'],
    keyPoints: ['Loops repeat code', 'Break and continue control execution'],
  },
  {
    id: 'python-functions',
    title: 'Functions',
    description: 'Learn how to create reusable blocks of code with functions.',
    order: 6,
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `# Functions

Functions are reusable blocks of code that perform a specific task.

## Defining a Function
\`\`\`python
def function_name(parameters):
    \"\"\"docstring (optional)\"\"\"
    # function body
    return value  # optional
\`\`\`

## Calling a Function
\`\`\`python
result = function_name(arguments)
\`\`\`

## Key Concepts
- **Parameters**: Variables in the function definition
- **Arguments**: Actual values passed when calling
- **Return**: Sends a value back to the caller
- **Default parameters**: Parameters with default values`,
    codeExamples: [
      {
        id: 'py-funcs',
        title: 'Creating Functions',
        code: `# Simple function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Function with default parameter
def power(base, exp=2):
    return base ** exp

print(power(3))     # 9 (3^2)
print(power(3, 3))  # 27 (3^3)

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

minimum, maximum, average = get_stats([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Avg: {average}")`,
        explanation: 'Functions make code organized, reusable, and easier to test.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-loops'],
    learningObjectives: [
      'Define and call functions',
      'Use parameters and return values',
      'Use default parameters',
    ],
    topics: ['functions', 'reuse', 'abstraction'],
    keyPoints: ['Functions group reusable logic', 'Parameters make functions flexible'],
  },
  {
    id: 'python-lists',
    title: 'Lists and Collections',
    description: 'Master Python\'s versatile list data structure and common operations.',
    order: 7,
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `# Lists and Collections

Lists are Python's most versatile data structure for storing collections of items.

## Creating Lists
\`\`\`python
# Empty list
numbers = []

# List with items
fruits = ["apple", "banana", "cherry"]

# Mixed types (legal in Python!)
mixed = [1, "hello", 3.14, True]
\`\`\`

## Accessing Items
\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Indexing (0-based)
print(fruits[0])    # apple
print(fruits[1])    # banana
print(fruits[-1])   # cherry (last item)
print(fruits[-2])   # banana (second from end)

# Slicing
print(fruits[0:2])  # ['apple', 'banana']
print(fruits[1:])   # ['banana', 'cherry']
print(fruits[:2])   # ['apple', 'banana']
\`\`\`

## Modifying Lists
\`\`\`python
fruits.append("orange")      # Add to end
fruits.insert(1, "mango")    # Insert at index
fruits.remove("banana")      # Remove by value
popped = fruits.pop()        # Remove and return last
fruits[0] = "pear"           # Change by index
\`\`\`

## List Methods
- \`len(list)\`: Get length
- \`list.sort()\`: Sort in place
- \`list.reverse()\`: Reverse in place
- \`list.count(item)\`: Count occurrences
- \`list.index(item)\`: Find index`,
    codeExamples: [
      {
        id: 'py-lists',
        title: 'Working with Lists',
        code: `# Creating and modifying lists
shopping = ["eggs", "milk", "bread"]
print(f"Items: {len(shopping)}")  # 3

# Adding items
shopping.append("cheese")
shopping.insert(0, "butter")
print(shopping)  # ['butter', 'eggs', 'milk', 'bread', 'cheese']

# Removing items
shopping.remove("milk")
last_item = shopping.pop()
print(f"Removed: {last_item}")  # cheese
print(shopping)  # ['butter', 'eggs', 'bread']

# List operations
numbers = [3, 1, 4, 1, 5, 9, 2]
print(f"Sum: {sum(numbers)}")      # 25
print(f"Max: {max(numbers)}")      # 9
print(f"Sorted: {sorted(numbers)}")  # [1, 1, 2, 3, 4, 5, 9]`,
        explanation: 'Lists are mutable and support a rich set of operations.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-loops'],
    learningObjectives: [
      'Create and modify lists',
      'Access items by index and slice',
      'Use common list methods',
    ],
    topics: ['lists', 'collections', 'data structures'],
    keyPoints: ['Lists are mutable and ordered', 'Rich set of built-in methods'],
  },
  {
    id: 'python-dictionaries',
    title: 'Dictionaries',
    description: 'Learn to work with key-value pairs using Python dictionaries.',
    order: 8,
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `# Dictionaries

Dictionaries store data as key-value pairs, allowing fast lookup by key.

## Creating Dictionaries
\`\`\`python
# Empty dictionary
person = {}

# With data
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Using dict()
person = dict(name="Alice", age=25)
\`\`\`

## Accessing Values
\`\`\`python
print(person["name"])      # Alice
print(person.get("age"))   # 25
print(person.get("email", "N/A"))  # N/A (default)
\`\`\`

## Modifying Dictionaries
\`\`\`python
# Add or update
person["email"] = "alice@example.com"
person["age"] = 26

# Remove
del person["city"]
removed = person.pop("age")

# Check existence
if "name" in person:
    print("Name exists")
\`\`\`

## Iterating
\`\`\`python
# Keys
for key in person:
    print(key)

# Values
for value in person.values():
    print(value)

# Both
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\``,
    codeExamples: [
      {
        id: 'py-dicts',
        title: 'Dictionary Operations',
        code: `# Student records
student = {
    "name": "Bob",
    "age": 20,
    "grades": [85, 90, 78],
    "active": True
}

# Access and modify
print(student["name"])  # Bob
student["email"] = "bob@school.edu"
student["grades"].append(92)

# Safe access
phone = student.get("phone", "No phone")
print(phone)  # No phone

# Iterate
print("\\nStudent Info:")
for key, value in student.items():
    print(f"{key}: {value}")

# Dictionary methods
print(f"\\nKeys: {list(student.keys())}")
print(f"Values: {list(student.values())}")`,
        explanation: 'Dictionaries provide O(1) average lookup time by key.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-lists'],
    learningObjectives: [
      'Create and modify dictionaries',
      'Access values safely',
      'Iterate over keys and values',
    ],
    topics: ['dictionaries', 'data structures', 'hash tables'],
    keyPoints: ['Fast key-based lookup', 'Keys must be immutable'],
  },
  {
    id: 'python-strings',
    title: 'String Manipulation',
    description: 'Master string operations, formatting, and methods.',
    order: 9,
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `# String Manipulation

Strings are immutable sequences of characters with powerful methods.

## String Methods
\`\`\`python
text = "Hello World"

# Case
text.upper()          # "HELLO WORLD"
text.lower()          # "hello world"
text.title()          # "Hello World"

# Search
text.startswith("H")  # True
text.endswith("d")    # True
text.find("World")    # 6 (index)

# Modify
text.replace("World", "Python")  # "Hello Python"
text.strip()          # Remove whitespace
text.split()          # Split into list
\`\`\`

## String Formatting
\`\`\`python
name = "Alice"
age = 25

# f-strings (preferred)
message = f"My name is {name} and I'm {age}"

# format()
message = "My name is {} and I'm {}".format(name, age)

# %
message = "My name is %s and I'm %d" % (name, age)
\`\`\`

## Multiline Strings
\`\`\`python
text = """This is
a multiline
string"""
\`\`\``,
    codeExamples: [
      {
        id: 'py-strings',
        title: 'String Operations',
        code: `# String methods
text = "  Python Programming  "
print(f"Original: '{text}'")
print(f"Stripped: '{text.strip()}'")
print(f"Upper: '{text.upper()}'")

# String formatting
name = "Alice"
score = 95.7
print(f"{name} scored {score:.1f}%")  # Alice scored 95.7%

# String operations
sentence = "Python is awesome"
words = sentence.split()
print(words)  # ['Python', 'is', 'awesome']
print("-".join(words))  # Python-is-awesome

# Substring check
if "Python" in sentence:
    print("Found Python!")`,
        explanation: 'Strings are immutable - methods return new strings.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-variables'],
    learningObjectives: [
      'Use string methods',
      'Format strings with f-strings',
      'Split and join strings',
    ],
    topics: ['strings', 'text', 'formatting'],
    keyPoints: ['Strings are immutable', 'F-strings are the modern way'],
  },
  {
    id: 'python-file-io',
    title: 'File Input/Output',
    description: 'Learn to read from and write to files in Python.',
    order: 10,
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `# File Input/Output

Python makes file operations simple with built-in functions.

## Reading Files
\`\`\`python
# Read entire file
with open('data.txt', 'r') as file:
    content = file.read()
    print(content)

# Read lines
with open('data.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Read into list
with open('data.txt', 'r') as file:
    lines = file.readlines()
\`\`\`

## Writing Files
\`\`\`python
# Write (overwrites)
with open('output.txt', 'w') as file:
    file.write("Hello\\n")
    file.write("World\\n")

# Append
with open('output.txt', 'a') as file:
    file.write("New line\\n")
\`\`\`

## File Modes
- \`'r'\`: Read (default)
- \`'w'\`: Write (overwrites)
- \`'a'\`: Append
- \`'r+'\`: Read and write
- \`'b'\`: Binary mode`,
    codeExamples: [
      {
        id: 'py-files',
        title: 'File Operations',
        code: `# Writing to a file
data = ["Alice,25", "Bob,30", "Charlie,35"]

with open('people.txt', 'w') as file:
    for line in data:
        file.write(line + '\\n')

print("File written successfully")

# Reading from a file
with open('people.txt', 'r') as file:
    print("\\nFile contents:")
    for line in file:
        name, age = line.strip().split(',')
        print(f"Name: {name}, Age: {age}")

# Exception handling
try:
    with open('missing.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")`,
        explanation: 'The with statement automatically closes files.',
        language: 'python',
      },
    ],
    quizQuestions: [],
    prerequisites: ['python-strings'],
    learningObjectives: [
      'Read from files',
      'Write to files',
      'Use with statement for safe file handling',
    ],
    topics: ['file io', 'files', 'reading', 'writing'],
    keyPoints: ['Use with for automatic cleanup', 'Handle FileNotFoundError'],
  },
];

export const pythonGlossary: GlossaryTermData[] = [
  {
    term: 'variable',
    slug: 'variable',
    shortDefinition: 'A named location in memory that stores a value.',
    category: 'Basics',
    definition: 'A variable is a named container that stores a value in your Python program. Unlike some languages, Python variables don\'t need explicit type declarations — the type is inferred from the assigned value.',
    whyItExists: 'Variables allow you to store, retrieve, and manipulate data throughout your program. They make code more readable and maintainable.',
    syntax: `name = "Alice"
age = 25
height = 5.7
is_student = True`,
    analogy: 'A variable is like a labeled box where you can store something and find it later by its label (name).',
    codeExample: `# Creating variables
message = "Hello, World!"
count = 42
pi = 3.14159

# Using variables
print(message)  # Hello, World!
print(count * 2)  # 84`,
    commonMistakes: [
      'Using a variable before assigning it (NameError)',
      'Using Python keywords as variable names (e.g., class, if, for)',
      'Forgetting that Python is case-sensitive (myVar ≠ myvar)',
    ],
    bestPractices: [
      'Use descriptive, meaningful names (user_age not ua)',
      'Follow snake_case naming convention (my_variable not myVariable)',
      'Initialize variables before using them',
    ],
    relatedTerms: ['data type', 'assignment', 'scope'],
  },
  {
    term: 'function',
    slug: 'function',
    shortDefinition: 'A reusable block of code that performs a specific task.',
    category: 'Basics',
    definition: 'A function is a named section of code that performs a specific task and can be called multiple times. Functions promote code reuse, organization, and modularity.',
    whyItExists: 'Functions allow you to break complex problems into smaller, manageable pieces. Instead of repeating code, you define it once and call it whenever needed.',
    syntax: `def function_name(parameters):
    \"\"\"Optional docstring\"\"\"
    # function body
    return result`,
    analogy: 'A function is like a recipe — you define it once and can use it whenever you need to make that dish.',
    codeExample: `def calculate_area(width, height):
    \"\"\"Calculate the area of a rectangle.\"\"\"
    return width * height

# Call the function
area = calculate_area(5, 3)
print(area)  # 15`,
    commonMistakes: [
      'Forgetting the colon (:) after the function definition',
      'Incorrect indentation in the function body',
      'Forgetting to return a value when needed',
    ],
    bestPractices: [
      'Keep functions small and focused on a single task',
      'Use descriptive function names (calculate_total not calc)',
      'Add docstrings to explain what the function does',
    ],
    relatedTerms: ['parameter', 'return', 'scope', 'recursion'],
  },
  {
    term: 'list',
    slug: 'list',
    shortDefinition: 'An ordered, mutable collection of items.',
    category: 'Data Structures',
    definition: 'A list is a versatile data structure that stores an ordered collection of items. Lists are mutable (can be changed) and can contain items of different types.',
    whyItExists: 'Lists allow you to store multiple values in a single variable, making it easy to work with collections of data.',
    syntax: `my_list = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []`,
    analogy: 'A list is like a shopping list — you can add items, remove items, and the order matters.',
    codeExample: `fruits = ["apple", "banana", "cherry"]

# Access items
print(fruits[0])     # apple
print(fruits[-1])    # cherry (last item)

# Modify
fruits.append("orange")
fruits[1] = "blueberry"

# Slice
print(fruits[1:3])   # ['blueberry', 'cherry']

# Length
print(len(fruits))   # 4`,
    commonMistakes: [
      'Accessing an index that doesn\'t exist (IndexError)',
      'Confusing list methods: append() vs extend() vs insert()',
      'Forgetting that lists are mutable (changes affect the original)',
    ],
    bestPractices: [
      'Use list comprehensions for creating lists from other lists',
      'Use enumerate() when you need both index and value',
      'Consider using tuples for immutable sequences',
    ],
    relatedTerms: ['tuple', 'dictionary', 'set', 'list comprehension'],
  },
  {
    term: 'dictionary',
    slug: 'dictionary',
    shortDefinition: 'An unordered collection of key-value pairs.',
    category: 'Data Structures',
    definition: 'A dictionary (dict) stores data as key-value pairs. Keys must be unique and immutable (strings, numbers, tuples), while values can be any type.',
    whyItExists: 'Dictionaries allow you to look up values by meaningful keys instead of numeric indices, making data more organized and accessible.',
    syntax: `person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Access
print(person["name"])  # Alice
print(person.get("age"))  # 25`,
    analogy: 'A dictionary is like a real dictionary — you look up a word (key) to find its definition (value).',
    codeExample: `student = {
    "name": "Bob",
    "grades": [85, 90, 78],
    "active": True
}

# Add/Update
student["email"] = "bob@example.com"
student["grades"].append(92)

# Iterate
for key, value in student.items():
    print(f"{key}: {value}")

# Check existence
if "name" in student:
    print("Name exists")`,
    commonMistakes: [
      'Using a non-existent key without checking (KeyError)',
      'Using mutable types as dictionary keys',
      'Confusing .get() with direct access (get returns None if key missing)',
    ],
    bestPractices: [
      'Use .get() for safe access when key might not exist',
      'Use .items() when iterating over both keys and values',
      'Consider using defaultdict for automatic default values',
    ],
    relatedTerms: ['list', 'key', 'value', 'hash table'],
  },
  {
    term: 'tuple',
    slug: 'tuple',
    shortDefinition: 'An immutable ordered collection of items.',
    category: 'Data Structures',
    definition: 'A tuple is like a list but cannot be changed after creation. Tuples are faster than lists and can be used as dictionary keys.',
    whyItExists: 'Tuples provide immutable sequences, useful for data that shouldn\'t change and for returning multiple values from functions.',
    syntax: `# Creating tuples
point = (10, 20)
colors = ("red", "green", "blue")
single = (42,)  # Note the comma`,
    analogy: 'A tuple is like a sealed package - once created, you can look at what\'s inside but can\'t change it.',
    codeExample: `# Tuples
coordinates = (10, 20, 30)
print(coordinates[0])  # 10

# Unpacking
x, y, z = coordinates

# Multiple return values
def get_stats():
    return 42, 100, 71  # Returns tuple

min_val, max_val, avg = get_stats()`,
    commonMistakes: [
      'Forgetting comma for single-item tuple: (42,) not (42)',
      'Trying to modify a tuple (TypeError)',
      'Confusing tuples with lists',
    ],
    bestPractices: [
      'Use tuples for immutable data',
      'Use tuples to return multiple values from functions',
      'Use tuples as dictionary keys when you need composite keys',
    ],
    relatedTerms: ['list', 'immutable', 'unpacking'],
  },
  {
    term: 'module',
    slug: 'module',
    shortDefinition: 'A file containing Python code that can be imported.',
    category: 'Modules',
    definition: 'A module is a file containing Python definitions and statements. The file name is the module name with the .py extension.',
    whyItExists: 'Modules organize code into reusable files, making programs more maintainable and allowing code reuse across projects.',
    syntax: `# Import entire module
import math

# Import specific items
from math import pi, sqrt

# Import with alias
import numpy as np`,
    analogy: 'A module is like a toolbox - you can grab specific tools (functions) you need or carry the whole box.',
    codeExample: `# Using built-in modules
import math
import random

print(math.pi)  # 3.14159...
print(math.sqrt(16))  # 4.0

# Generate random number
num = random.randint(1, 10)

# Import your own modules
# from my_functions import calculate_area`,
    commonMistakes: [
      'Circular imports (two modules importing each other)',
      'Name conflicts when using from module import *',
      'Not understanding module search path',
    ],
    bestPractices: [
      'Use explicit imports (from math import sqrt)',
      'Avoid wildcard imports (from module import *)',
      'Organize related functions into modules',
    ],
    relatedTerms: ['package', 'import', 'library'],
  },
  {
    term: 'exception',
    slug: 'exception',
    shortDefinition: 'An error that occurs during program execution.',
    category: 'Error Handling',
    definition: 'An exception is an event that disrupts the normal flow of a program. Python uses try/except blocks to handle exceptions gracefully.',
    whyItExists: 'Exceptions allow programs to handle errors gracefully instead of crashing, improving user experience and program reliability.',
    syntax: `try:
    # Code that might raise exception
    risky_operation()
except ExceptionType:
    # Handle the error
    print("Error occurred")
finally:
    # Always runs
    cleanup()`,
    analogy: 'Exceptions are like catching a falling object - instead of letting it break, you catch it and decide what to do.',
    codeExample: `# Exception handling
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Execution complete")`,
    commonMistakes: [
      'Catching Exception instead of specific exceptions',
      'Empty except blocks that hide errors',
      'Not cleaning up resources in error cases',
    ],
    bestPractices: [
      'Catch specific exceptions',
      'Use finally for cleanup code',
      'Raise informative error messages',
    ],
    relatedTerms: ['try', 'except', 'finally', 'raise'],
  },
  {
    term: 'comprehension',
    slug: 'comprehension',
    shortDefinition: 'Concise syntax for creating lists, dicts, or sets from iterables.',
    category: 'Advanced',
    definition: 'List comprehensions provide a compact way to create lists by applying an expression to each item in an iterable.',
    whyItExists: 'Comprehensions make code more readable and often faster than equivalent for-loop constructions.',
    syntax: `# List comprehension
[expression for item in iterable if condition]

# Dict comprehension
{key: value for item in iterable}

# Set comprehension
{expression for item in iterable}`,
    analogy: 'A comprehension is like a production line - you process each item and collect the results.',
    codeExample: `# List comprehension
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Dict comprehension
square_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Nested
matrix = [[i+j for j in range(3)] for i in range(3)]`,
    commonMistakes: [
      'Making comprehensions too complex and hard to read',
      'Using comprehensions when a regular loop is clearer',
      'Forgetting that comprehensions create new lists',
    ],
    bestPractices: [
      'Keep comprehensions simple and readable',
      'Use regular loops for complex logic',
      'Use generator expressions for large datasets',
    ],
    relatedTerms: ['list', 'generator', 'map', 'filter'],
  },
];

export const pythonQuizzes: Record<string, QuizQuestion[]> = {
  'what-is-python': [
    {
      id: 'py-q1-1',
      lessonId: 'what-is-python',
      type: 'multiple_choice',
      question: 'Who created Python?',
      options: ['Guido van Rossum', 'James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup'],
      correctAnswer: 'Guido van Rossum',
      explanation: 'Python was created by Guido van Rossum and first released in 1991.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q1-2',
      lessonId: 'what-is-python',
      type: 'true_false',
      question: 'Python is a compiled language.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Python is an interpreted language, meaning code is executed line by line.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q1-3',
      lessonId: 'what-is-python',
      type: 'multiple_choice',
      question: 'Which function is used to output text in Python?',
      options: ['console.log()', 'System.out.println()', 'print()', 'echo'],
      correctAnswer: 'print()',
      explanation: 'The print() function outputs text to the console in Python.',
      difficulty: 'beginner',
    },
  ],
  'python-variables': [
    {
      id: 'py-q2-1',
      lessonId: 'python-variables',
      type: 'multiple_choice',
      question: 'How do you check the type of a variable in Python?',
      options: ['typeof()', 'type()', 'check_type()', 'get_type()'],
      correctAnswer: 'type()',
      explanation: 'The type() function returns the type of an object in Python.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q2-2',
      lessonId: 'python-variables',
      type: 'multiple_choice',
      question: 'Which of the following is NOT a valid Python data type?',
      options: ['int', 'float', 'string', 'character'],
      correctAnswer: 'character',
      explanation: 'Python does not have a separate character type. Single characters are strings of length 1.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q2-3',
      lessonId: 'python-variables',
      type: 'true_false',
      question: 'You must declare the type of a variable before using it in Python.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Python is dynamically typed — you don\'t need to declare variable types explicitly.',
      difficulty: 'beginner',
    },
  ],
  'python-operators': [
    {
      id: 'py-q3-1',
      lessonId: 'python-operators',
      type: 'multiple_choice',
      question: 'What is the result of 10 // 3 in Python?',
      options: ['3.333', '3', '4', '3.0'],
      correctAnswer: '3',
      explanation: 'The // operator performs floor division, returning the integer quotient.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q3-2',
      lessonId: 'python-operators',
      type: 'multiple_choice',
      question: 'What is the result of 2 ** 3 in Python?',
      options: ['5', '6', '8', '9'],
      correctAnswer: '8',
      explanation: 'The ** operator is exponentiation: 2 to the power of 3 equals 8.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q3-3',
      lessonId: 'python-operators',
      type: 'true_false',
      question: 'The "and" operator returns True only if both conditions are True.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'The "and" logical operator returns True only when both operands are True.',
      difficulty: 'beginner',
    },
  ],
  'python-conditionals': [
    {
      id: 'py-q4-1',
      lessonId: 'python-conditionals',
      type: 'multiple_choice',
      question: 'Which keyword is used for "else if" in Python?',
      options: ['else if', 'elseif', 'elif', 'otherwise'],
      correctAnswer: 'elif',
      explanation: 'Python uses "elif" (short for else if) for additional conditions.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q4-2',
      lessonId: 'python-conditionals',
      type: 'true_false',
      question: 'Python uses curly braces {} to define code blocks in if statements.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Python uses indentation (spaces/tabs) to define code blocks, not curly braces.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q4-3',
      lessonId: 'python-conditionals',
      type: 'multiple_choice',
      question: 'What will this code output? if 5 > 3: print("Yes") else: print("No")',
      options: ['Yes', 'No', 'Error', 'Nothing'],
      correctAnswer: 'Yes',
      explanation: 'Since 5 > 3 is True, the if block executes and prints "Yes".',
      difficulty: 'beginner',
    },
  ],
  'python-loops': [
    {
      id: 'py-q5-1',
      lessonId: 'python-loops',
      type: 'multiple_choice',
      question: 'What does range(5) produce?',
      options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 2, 3, 4]'],
      correctAnswer: '[0, 1, 2, 3, 4]',
      explanation: 'range(5) generates numbers from 0 to 4 (5 numbers, starting at 0).',
      difficulty: 'beginner',
    },
    {
      id: 'py-q5-2',
      lessonId: 'python-loops',
      type: 'multiple_choice',
      question: 'Which statement is used to exit a loop immediately?',
      options: ['stop', 'exit', 'break', 'return'],
      correctAnswer: 'break',
      explanation: 'The break statement immediately exits the loop.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q5-3',
      lessonId: 'python-loops',
      type: 'true_false',
      question: 'A while loop will always execute at least once.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'A while loop checks the condition before executing, so if the condition is initially False, the loop body never runs.',
      difficulty: 'beginner',
    },
  ],
  'python-functions': [
    {
      id: 'py-q6-1',
      lessonId: 'python-functions',
      type: 'multiple_choice',
      question: 'What keyword is used to define a function in Python?',
      options: ['function', 'func', 'def', 'define'],
      correctAnswer: 'def',
      explanation: 'The def keyword is used to define functions in Python.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q6-2',
      lessonId: 'python-functions',
      type: 'multiple_choice',
      question: 'What does a function return if no return statement is specified?',
      options: ['0', 'undefined', 'None', 'null'],
      correctAnswer: 'None',
      explanation: 'Functions without an explicit return statement return None in Python.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q6-3',
      lessonId: 'python-functions',
      type: 'true_false',
      question: 'A function can return multiple values in Python.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Python functions can return multiple values as a tuple: return a, b, c',
      difficulty: 'beginner',
    },
  ],
  'python-lists': [
    {
      id: 'py-q7-1',
      lessonId: 'python-lists',
      type: 'multiple_choice',
      question: 'How do you access the last item in a Python list?',
      options: ['list[end]', 'list[-1]', 'list[last]', 'list.last()'],
      correctAnswer: 'list[-1]',
      explanation: 'Negative indexing starts from the end: -1 is last, -2 is second-to-last, etc.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q7-2',
      lessonId: 'python-lists',
      type: 'multiple_choice',
      question: 'Which method adds an item to the end of a list?',
      options: ['list.add()', 'list.append()', 'list.push()', 'list.insert()'],
      correctAnswer: 'list.append()',
      explanation: 'append() adds an item to the end of a list.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q7-3',
      lessonId: 'python-lists',
      type: 'true_false',
      question: 'Lists in Python are mutable.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Lists can be modified after creation - they are mutable.',
      difficulty: 'beginner',
    },
  ],
  'python-dictionaries': [
    {
      id: 'py-q8-1',
      lessonId: 'python-dictionaries',
      type: 'multiple_choice',
      question: 'Which method safely gets a value from a dictionary without raising an error?',
      options: ['dict[]', 'dict.get()', 'dict.fetch()', 'dict.find()'],
      correctAnswer: 'dict.get()',
      explanation: 'dict.get(key, default) returns a default value if the key doesn\'t exist.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q8-2',
      lessonId: 'python-dictionaries',
      type: 'true_false',
      question: 'Dictionary keys must be unique.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Each key in a dictionary must be unique; duplicate keys will overwrite previous values.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q8-3',
      lessonId: 'python-dictionaries',
      type: 'multiple_choice',
      question: 'How do you iterate over both keys and values in a dictionary?',
      options: ['for k, v in dict:', 'for k, v in dict.items():', 'for k, v in dict.both():', 'for k, v in dict.pairs():'],
      correctAnswer: 'for k, v in dict.items():',
      explanation: 'dict.items() returns key-value pairs as tuples.',
      difficulty: 'beginner',
    },
  ],
  'python-strings': [
    {
      id: 'py-q9-1',
      lessonId: 'python-strings',
      type: 'multiple_choice',
      question: 'Which is the modern way to format strings in Python?',
      options: ['% formatting', 'str.format()', 'f-strings', 'concat()'],
      correctAnswer: 'f-strings',
      explanation: 'F-strings (f"...") are the modern, preferred way to format strings in Python 3.6+.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q9-2',
      lessonId: 'python-strings',
      type: 'true_false',
      question: 'Strings in Python are mutable.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Strings are immutable - string methods return new strings.',
      difficulty: 'beginner',
    },
    {
      id: 'py-q9-3',
      lessonId: 'python-strings',
      type: 'multiple_choice',
      question: 'What does "Hello World".split() return?',
      options: ['"Hello", "World"', '["Hello", "World"]', '("Hello", "World")', '"HelloWorld"'],
      correctAnswer: '["Hello", "World"]',
      explanation: 'split() returns a list of words separated by whitespace.',
      difficulty: 'beginner',
    },
  ],
  'python-file-io': [
    {
      id: 'py-q10-1',
      lessonId: 'python-file-io',
      type: 'multiple_choice',
      question: 'What does the "with" statement do when working with files?',
      options: ['Opens faster', 'Automatically closes the file', 'Compresses the file', 'Encrypts the file'],
      correctAnswer: 'Automatically closes the file',
      explanation: 'The with statement ensures files are properly closed even if an error occurs.',
      difficulty: 'intermediate',
    },
    {
      id: 'py-q10-2',
      lessonId: 'python-file-io',
      type: 'multiple_choice',
      question: 'Which mode opens a file for appending?',
      options: ['"r"', '"w"', '"a"', '"x"'],
      correctAnswer: '"a"',
      explanation: '"a" mode opens a file for appending; new data is added to the end.',
      difficulty: 'intermediate',
    },
    {
      id: 'py-q10-3',
      lessonId: 'python-file-io',
      type: 'true_false',
      question: 'Opening a file in "w" mode will overwrite existing content.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '"w" mode truncates the file, deleting existing content.',
      difficulty: 'intermediate',
    },
  ],
};