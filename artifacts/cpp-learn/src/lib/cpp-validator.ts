/**
 * C++ Code Validator
 * Provides syntax checking and code quality feedback for C++ code
 */

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
  score: number;
}

export interface ValidationError {
  line: number;
  message: string;
  severity: 'error' | 'critical';
  suggestion?: string;
}

export interface ValidationWarning {
  line: number;
  message: string;
  type: 'style' | 'performance' | 'safety';
}

/**
 * Validate C++ code for common syntax errors and issues
 */
export function validateCppCode(code: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  
  const lines = code.split('\n');
  
  // Check for common syntax errors
  checkBrackets(code, errors);
  checkSemicolons(lines, errors, warnings);
  checkIncludeGuards(code, warnings);
  checkMainFunction(code, errors, warnings);
  checkCommonMistakes(lines, errors, warnings, code);
  checkCodeQuality(lines, warnings, suggestions, code);
  checkMemoryManagement(code, errors, warnings);
  checkNamingConventions(lines, warnings);
  
  // Calculate a quality score (0-100)
  const errorPenalty = errors.length * 15;
  const warningPenalty = warnings.length * 5;
  const score = Math.max(0, 100 - errorPenalty - warningPenalty);
  
  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    errors,
    warnings,
    suggestions,
    score
  };
}

function checkBrackets(code: string, errors: ValidationError[]) {
  const bracketPairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  const stack: { char: string; line: number }[] = [];
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Remove strings and comments
    const cleanLine = line.replace(/"(?:[^"\\]|\\.)*"/g, '').replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    for (const char of cleanLine) {
      if (char in bracketPairs) {
        stack.push({ char, line: i + 1 });
      } else if (Object.values(bracketPairs).includes(char)) {
        if (stack.length === 0) {
          errors.push({
            line: i + 1,
            message: `Unexpected closing bracket '${char}'`,
            severity: 'critical',
            suggestion: 'Check if you have an extra closing bracket'
          });
        } else {
          const last = stack.pop()!;
          if (bracketPairs[last.char] !== char) {
            errors.push({
              line: i + 1,
              message: `Mismatched brackets: expected '${bracketPairs[last.char]}', found '${char}'`,
              severity: 'critical',
              suggestion: `Make sure all brackets are properly closed`
            });
          }
        }
      }
    }
  }
  
  // Check for unclosed brackets
  for (const item of stack) {
    errors.push({
      line: item.line,
      message: `Unclosed bracket '${item.char}'`,
      severity: 'critical',
      suggestion: `Add closing '${bracketPairs[item.char]}'`
    });
  }
}

function checkSemicolons(lines: string[], errors: ValidationError[], warnings: ValidationWarning[]) {
  const classPattern = /^\s*class\s+\w+/;
  const functionPattern = /^\s*(?:void|int|double|float|char|bool|string|\w+::\w+)\s+\w+\s*\([^)]*\)\s*$/;
  const controlPatterns = [/^\s*if\s*\(/, /^\s*else\s*$/, /^\s*for\s*\(/, /^\s*while\s*\(/, /^\s*do\s*$/];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, comments, preprocessor directives
    if (!line || line.startsWith('//') || line.startsWith('#') || line.startsWith('/*')) continue;
    
    // Check for missing semicolons after class definitions
    if (line.match(/^\s*class\s+\w+.*\}\s*$/) && !line.endsWith(';')) {
      errors.push({
        line: i + 1,
        message: 'Missing semicolon after class definition',
        severity: 'error',
        suggestion: 'Add semicolon after the closing brace: };'
      });
    }
    
    // Check for semicolons after control structures (common mistake)
    for (const pattern of controlPatterns) {
      if (pattern.test(line) && line.endsWith(';') && !line.includes('{')) {
        warnings.push({
          line: i + 1,
          message: 'Semicolon after control structure may create empty statement',
          type: 'style'
        });
      }
    }
  }
}

function checkIncludeGuards(code: string, warnings: ValidationWarning[]) {
  // Check if code looks like a header file
  if (code.includes('.h') || code.includes('#ifndef') || code.includes('#define')) {
    if (!code.includes('#ifndef') || !code.includes('#define') || !code.includes('#endif')) {
      warnings.push({
        line: 1,
        message: 'Header file missing include guards',
        type: 'style'
      });
    }
  }
}

function checkMainFunction(code: string, errors: ValidationError[], warnings: ValidationWarning[]) {
  // Check if this looks like a complete program
  if (code.includes('int main') || code.includes('int main(')) {
    // Check return type
    if (code.match(/int\s+main\s*\([^)]*\)\s*{/) && !code.includes('return 0') && !code.includes('return 0;')) {
      warnings.push({
        line: 1,
        message: 'main() function should return 0 at the end',
        type: 'style'
      });
    }
    
    // Check for correct signature
    if (!code.match(/int\s+main\s*\(/)) {
      errors.push({
        line: 1,
        message: 'Invalid main() function signature',
        severity: 'critical',
        suggestion: 'Use: int main() or int main(int argc, char* argv[])'
      });
    }
  }
}

function checkCommonMistakes(lines: string[], errors: ValidationError[], warnings: ValidationWarning[], code: string) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for using namespace std in headers
    if (line.includes('using namespace std;') && (i === 0 || lines[i-1]?.includes('#include'))) {
      warnings.push({
        line: i + 1,
        message: 'Consider avoiding "using namespace std;" in header files',
        type: 'style'
      });
    }
    
    // Check for single = in condition (should be ==)
    if (line.match(/if\s*\([^)]*=[^=]/) && !line.includes('==')) {
      errors.push({
        line: i + 1,
        message: 'Possible assignment in condition (use == for comparison)',
        severity: 'error',
        suggestion: 'Use == for comparison, = for assignment'
      });
    }
    
    // Check for uninitialized variables
    if (line.match(/int\s+\w+\s*;/) && !line.includes('=') && !line.includes('const')) {
      warnings.push({
        line: i + 1,
        message: 'Variable declared but not initialized',
        type: 'safety'
      });
    }
    
    // Check for delete without nullptr assignment
    if (line.includes('delete ') && !line.includes('delete[]') && !line.includes('= nullptr') && !line.includes('= NULL')) {
      const nextLines = lines.slice(i + 1, i + 3).join('\n');
      if (!nextLines.includes('= nullptr') && !nextLines.includes('= NULL')) {
        warnings.push({
          line: i + 1,
          message: 'Consider setting pointer to nullptr after delete',
          type: 'safety'
        });
      }
    }
    
    // Check for array new/delete mismatch
    if (line.includes('new ') && line.includes('[') && !line.includes('new[]')) {
      const varName = line.match(/new\s+(\w+)\s*\[/)?.[1];
      if (varName && !code.includes(`delete[] ${varName}`)) {
        warnings.push({
          line: i + 1,
          message: 'Array allocated with new[] should be deleted with delete[]',
          type: 'safety'
        });
      }
    }
  }
}

function checkCodeQuality(lines: string[], warnings: ValidationWarning[], suggestions: string[], code: string) {
  let hasIO = false;
  let hasVector = false;
  let hasSmartPointers = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for raw pointers when smart pointers could be used
    if (line.match(/new\s+\w+/) && !line.includes('std::make_unique') && !line.includes('std::make_shared')) {
      warnings.push({
        line: i + 1,
        message: 'Consider using smart pointers (unique_ptr, shared_ptr) instead of raw new',
        type: 'safety'
      });
    }
    
    // Check for C-style casts
    if (line.match(/\(\w+\s*\*\)/) || line.match(/\(\w+\s*&\)/)) {
      warnings.push({
        line: i + 1,
        message: 'Consider using C++ style casts (static_cast, dynamic_cast, etc.)',
        type: 'style'
      });
    }
    
    // Check for magic numbers
    if (line.match(/\b\d{2,}\b/) && !line.includes('const') && !line.includes('#define')) {
      suggestions.push(`Line ${i + 1}: Consider using named constants for magic numbers`);
    }
    
    if (line.includes('#include <iostream>')) hasIO = true;
    if (line.includes('#include <vector>')) hasVector = true;
    if (line.includes('unique_ptr') || line.includes('shared_ptr')) hasSmartPointers = true;
  }
  
  // Add general suggestions
  if (hasIO && !hasVector) {
    suggestions.push('Consider using std::vector instead of raw arrays for dynamic collections');
  }
  
  if (!hasSmartPointers && code.includes('new ')) {
    suggestions.push('Use smart pointers (std::unique_ptr, std::shared_ptr) for automatic memory management');
  }
}

function checkMemoryManagement(code: string, errors: ValidationError[], warnings: ValidationWarning[]) {
  const lines = code.split('\n');
  
  // Track allocations and deallocations
  const allocations: { var: string; line: number; isArray: boolean }[] = [];
  const deallocations: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track new allocations
    const newMatch = line.match(/(\w+)\s*=\s*new\s+(\w+)\s*(\[)?/);
    if (newMatch) {
      allocations.push({
        var: newMatch[1],
        line: i + 1,
        isArray: !!newMatch[3]
      });
    }
    
    // Track delete calls
    if (line.includes('delete[]')) {
      const delMatch = line.match(/delete\[\]\s*(\w+)/);
      if (delMatch) deallocations.push(delMatch[1]);
    } else if (line.includes('delete ')) {
      const delMatch = line.match(/delete\s*(\w+)/);
      if (delMatch) deallocations.push(delMatch[1]);
    }
  }
  
  // Check for memory leaks
  for (const alloc of allocations) {
    if (!deallocations.includes(alloc.var)) {
      warnings.push({
        line: alloc.line,
        message: `Memory allocated for '${alloc.var}' is never freed (potential memory leak)`,
        type: 'safety'
      });
    }
  }
}

function checkNamingConventions(lines: string[], warnings: ValidationWarning[]) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check class naming (should be PascalCase)
    const classMatch = line.match(/class\s+(\w+)/);
    if (classMatch && classMatch[1][0] === classMatch[1][0].toLowerCase()) {
      warnings.push({
        line: i + 1,
        message: `Class name '${classMatch[1]}' should use PascalCase`,
        type: 'style'
      });
    }
    
    // Check variable naming (should be camelCase)
    const varMatch = line.match(/(?:int|double|float|char|bool|string|auto)\s+(\w+)\s*[=;]/);
    if (varMatch && varMatch[1].length > 1 && varMatch[1][0] === varMatch[1][0].toUpperCase()) {
      warnings.push({
        line: i + 1,
        message: `Variable '${varMatch[1]}' should use camelCase`,
        type: 'style'
      });
    }
  }
}

/**
 * Get educational feedback for code issues
 */
export function getEducationalFeedback(result: ValidationResult): string[] {
  const feedback: string[] = [];
  
  if (result.errors.length > 0) {
    feedback.push('🔴 Your code has syntax errors that need to be fixed before it can compile.');
    feedback.push('Focus on fixing the critical errors first, then address the warnings.');
  }
  
  if (result.warnings.length > 0) {
    feedback.push('🟡 Your code has some style or safety concerns that should be addressed.');
    feedback.push('These won\'t prevent compilation but indicate areas for improvement.');
  }
  
  if (result.score >= 90) {
    feedback.push('🟢 Excellent code quality! Your code follows good C++ practices.');
  } else if (result.score >= 70) {
    feedback.push('🟡 Good code structure, but there are some improvements to make.');
  } else if (result.score >= 50) {
    feedback.push('🟠 Your code needs some work. Review the errors and warnings carefully.');
  } else {
    feedback.push('🔴 Your code has significant issues. Start by fixing the critical errors.');
  }
  
  if (result.suggestions.length > 0) {
    feedback.push('💡 Suggestions for improvement:');
    feedback.push(...result.suggestions);
  }
  
  return feedback;
}