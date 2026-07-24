/**
 * uPhumeh - Multi-Language Configuration
 * 
 * This file defines all supported programming languages and their configurations.
 * Each language has its own lessons, glossary, quizzes, and compiler settings.
 */

export type LanguageId = 'cpp' | 'python' | 'java' | 'javascript' | 'typescript';

export interface LanguageConfig {
  id: LanguageId;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  fileExtension: string;
  helloWorld: string;
  compiler: {
    command: string;
    runCommand: string;
    supported: boolean;
  };
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number; // 1-100
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
  cpp: {
    id: 'cpp',
    name: 'C++',
    displayName: 'C++',
    description: 'A powerful, high-performance language used in game development, systems programming, and competitive programming.',
    icon: '⚡',
    color: '#00599C',
    gradient: 'from-blue-600 to-blue-800',
    fileExtension: '.cpp',
    helloWorld: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    compiler: {
      command: 'g++ -std=c++17',
      runCommand: './a.out',
      supported: true,
    },
    features: ['Object-Oriented', 'Generic Programming', 'Memory Management', 'STL', 'High Performance'],
    difficulty: 'intermediate',
    popularity: 95,
  },
  python: {
    id: 'python',
    name: 'Python',
    displayName: 'Python',
    description: 'A versatile, beginner-friendly language perfect for web development, data science, AI, and automation.',
    icon: '🐍',
    color: '#3776AB',
    gradient: 'from-blue-500 to-yellow-500',
    fileExtension: '.py',
    helloWorld: `print("Hello, World!")`,
    compiler: {
      command: 'python3',
      runCommand: 'python3',
      supported: true,
    },
    features: ['Easy Syntax', 'Data Science', 'Web Development', 'AI/ML', 'Automation'],
    difficulty: 'beginner',
    popularity: 100,
  },
  java: {
    id: 'java',
    name: 'Java',
    displayName: 'Java',
    description: 'A robust, enterprise-grade language used in Android development, web applications, and large-scale systems.',
    icon: '☕',
    color: '#007396',
    gradient: 'from-orange-500 to-red-500',
    fileExtension: '.java',
    helloWorld: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    compiler: {
      command: 'javac',
      runCommand: 'java',
      supported: true,
    },
    features: ['Object-Oriented', 'Platform Independent', 'Enterprise', 'Android', 'Multithreading'],
    difficulty: 'intermediate',
    popularity: 90,
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    displayName: 'JavaScript',
    description: 'The language of the web, enabling interactive websites, server-side development, and mobile apps.',
    icon: '🟨',
    color: '#F7DF1E',
    gradient: 'from-yellow-400 to-yellow-600',
    fileExtension: '.js',
    helloWorld: `console.log("Hello, World!");`,
    compiler: {
      command: 'node',
      runCommand: 'node',
      supported: true,
    },
    features: ['Web Development', 'Full-Stack', 'Async Programming', 'DOM Manipulation', 'Node.js'],
    difficulty: 'beginner',
    popularity: 98,
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    displayName: 'TypeScript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript, adding static types and better tooling.',
    icon: '🔷',
    color: '#3178C6',
    gradient: 'from-blue-600 to-blue-400',
    fileExtension: '.ts',
    helloWorld: `const greeting: string = "Hello, World!";
console.log(greeting);`,
    compiler: {
      command: 'tsc',
      runCommand: 'node',
      supported: true,
    },
    features: ['Type Safety', 'Modern JavaScript', 'Better IDE Support', 'Scalable', 'Angular/React'],
    difficulty: 'intermediate',
    popularity: 85,
  },
};

export const LANGUAGE_ORDER: LanguageId[] = ['cpp', 'python', 'java', 'javascript', 'typescript'];

export function isLanguageId(value: string): value is LanguageId {
  return LANGUAGE_ORDER.includes(value as LanguageId);
}

export function normalizeLanguageId(value: string | null | undefined): LanguageId | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  const aliases: Record<string, LanguageId> = {
    'c++': 'cpp',
    'c': 'cpp',
    'cpp': 'cpp',
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'jave': 'java',
    'jav': 'java',
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
  };

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  if (isLanguageId(normalized)) {
    return normalized as LanguageId;
  }

  return null;
}

export function getLanguageConfig(id: LanguageId): LanguageConfig {
  return LANGUAGES[id];
}

export function getAllLanguages(): LanguageConfig[] {
  return LANGUAGE_ORDER.map(id => LANGUAGES[id]);
}

export function getLanguageById(id: string): LanguageConfig | undefined {
  const normalized = normalizeLanguageId(id);
  if (normalized) {
    return LANGUAGES[normalized];
  }
  return undefined;
}

// Default language (used when no selection has been made)
export const DEFAULT_LANGUAGE: LanguageId = 'cpp';