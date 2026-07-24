/**
 * uPhumeh - Java Learning Content
 * Comprehensive Java curriculum from beginner to intermediate
 */

import type { LessonData, GlossaryTermData, QuizQuestion } from './types';

export const javaLessons: LessonData[] = [
  {
    id: 'what-is-java',
    title: 'What is Java?',
    description: 'Introduction to Java programming language and its ecosystem.',
    order: 1,
    difficulty: 'beginner',
    estimatedMinutes: 15,
    content: `# What is Java?

Java is a powerful, object-oriented programming language developed by Sun Microsystems (now Oracle) in 1995. It's known for its "write once, run anywhere" philosophy.

## Why Java?

- **Platform Independent**: Runs on any device with a JVM (Java Virtual Machine)
- **Object-Oriented**: Everything is an object, promoting clean code design
- **Robust**: Strong type checking and exception handling
- **Enterprise-Ready**: Used by major companies worldwide
- **Large Ecosystem**: Vast libraries and frameworks available

## What Can You Build?

- Enterprise applications (Spring, Java EE)
- Android mobile apps
- Web applications
- Desktop applications
- Big data processing (Hadoop, Spark)
- Cloud services and microservices`,
    codeExamples: [
      {
        id: 'java-hello',
        title: 'Hello World in Java',
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        explanation: 'Every Java program starts with a class. The main method is the entry point.',
        language: 'java',
        output: 'Hello, World!',
      },
    ],
    quizQuestions: [],
    prerequisites: [],
    learningObjectives: [
      'Understand what Java is and its history',
      'Know the main uses of Java',
      'Write your first Java program',
    ],
    topics: ['java', 'basics', 'history'],
    keyPoints: ['Java is platform-independent', 'Everything is a class'],
  },
  {
    id: 'java-variables',
    title: 'Variables and Data Types',
    description: 'Learn about Java\'s type system and how to declare variables.',
    order: 2,
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `# Variables and Data Types

Java is a strongly-typed language, meaning every variable must have a declared type.

## Primitive Types

- **byte**: 8-bit integer (-128 to 127)
- **short**: 16-bit integer (-32,768 to 32,767)
- **int**: 32-bit integer (most common for whole numbers)
- **long**: 64-bit integer (add L suffix: 123L)
- **float**: 32-bit decimal (add f suffix: 3.14f)
- **double**: 64-bit decimal (most common for decimals)
- **char**: Single character ('A')
- **boolean**: true or false

## Reference Types

- **String**: Text ("Hello")
- **Arrays**: Collection of same type
- **Objects**: Instances of classes

## Variable Declaration
\`\`\`java
// Type name = value;
int age = 25;
double price = 19.99;
String name = "Alice";
boolean isActive = true;
\`\`\``,
    codeExamples: [
      {
        id: 'java-vars',
        title: 'Working with Variables',
        code: `public class Variables {
    public static void main(String[] args) {
        // Primitive types
        int age = 25;
        double height = 5.9;
        char grade = 'A';
        boolean isStudent = true;
        
        // Reference types
        String name = "Alice";
        
        // Output
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height);
        System.out.println("Grade: " + grade);
        System.out.println("Student: " + isStudent);
    }
}`,
        explanation: 'Java requires explicit type declarations for all variables.',
        language: 'java',
      },
    ],
    quizQuestions: [],
    prerequisites: ['what-is-java'],
    learningObjectives: [
      'Declare variables with appropriate types',
      'Understand primitive vs reference types',
      'Use type conversions',
    ],
    topics: ['variables', 'data types', 'typing'],
    keyPoints: ['Java is strongly typed', 'Primitives vs references'],
  },
  {
    id: 'java-operators',
    title: 'Operators and Expressions',
    description: 'Learn to perform operations on data using Java operators.',
    order: 3,
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `# Operators and Expressions

## Arithmetic Operators
- \`+\` Addition
- \`-\` Subtraction
- \`*\` Multiplication
- \`/\` Division
- \`%\` Modulus (remainder)
- \`++\` Increment
- \`--\` Decrement

## Comparison Operators
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

## Logical Operators
- \`&&\` AND (both must be true)
- \`||\` OR (at least one must be true)
- \`!\` NOT (reverses boolean)

## Assignment Operators
- \`=\` Assign
- \`+=\` Add and assign (x += 5 means x = x + 5)
- \`-=\`, \`*=\`, \`/=\`, \`%=\` Similar shortcuts`,
    codeExamples: [
      {
        id: 'java-ops',
        title: 'Using Operators',
        code: `public class Operators {
    public static void main(String[] args) {
        // Arithmetic
        int a = 10, b = 3;
        System.out.println("Sum: " + (a + b));      // 13
        System.out.println("Diff: " + (a - b));     // 7
        System.out.println("Product: " + (a * b));  // 30
        System.out.println("Quotient: " + (a / b)); // 3
        System.out.println("Remainder: " + (a % b));// 1
        
        // Comparison
        System.out.println(a > b);   // true
        System.out.println(a == 10); // true
        
        // Logical
        boolean x = true, y = false;
        System.out.println(x && y);  // false
        System.out.println(x || y);  // true
        System.out.println(!x);      // false
    }
}`,
        explanation: 'Java operators work similarly to mathematical operators.',
        language: 'java',
      },
    ],
    quizQuestions: [],
    prerequisites: ['java-variables'],
    learningObjectives: [
      'Use arithmetic operators',
      'Use comparison operators',
      'Use logical operators',
    ],
    topics: ['operators', 'expressions', 'logic'],
    keyPoints: ['Operators perform calculations', 'Use && and || for logic'],
  },
];

export const javaGlossary: GlossaryTermData[] = [
  {
    term: 'class',
    slug: 'class',
    shortDefinition: 'A blueprint for creating objects with fields and methods.',
    category: 'OOP',
    definition: 'A class is a template that defines the structure and behavior of objects. Everything in Java is contained within a class.',
    whyItExists: 'Classes promote code organization, reuse, and encapsulation of data and behavior.',
    syntax: `public class Dog {
    private String name;
    
    public void bark() {
        System.out.println("Woof!");
    }
}`,
    analogy: 'A class is like a blueprint for a house - it defines what the house will look like, but it\'s not the house itself.',
    codeExample: `public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("I'm " + name);
    }
}`,
    commonMistakes: [
      'Forgetting to make fields private',
      'Not providing constructors',
      'Class name not matching filename',
    ],
    bestPractices: [
      'Use meaningful class names (nouns)',
      'Keep classes focused on one responsibility',
      'Make fields private and provide getters/setters',
    ],
    relatedTerms: ['object', 'constructor', 'method'],
  },
];

export const javaQuizzes: Record<string, QuizQuestion[]> = {
  'what-is-java': [
    {
      id: 'java-q1-1',
      lessonId: 'what-is-java',
      type: 'multiple_choice',
      question: 'What does "write once, run anywhere" mean in Java?',
      options: [
        'Java code runs on any device with a JVM',
        'Java is the fastest language',
        'Java only runs on Windows',
        'Java code never needs testing'
      ],
      correctAnswer: 'Java code runs on any device with a JVM',
      explanation: 'Java bytecode can run on any platform with a Java Virtual Machine.',
      difficulty: 'beginner',
    },
  ],
};
