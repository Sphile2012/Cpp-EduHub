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
};