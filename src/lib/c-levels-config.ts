
import type { CodingLevel } from '@/lib/types';

export const C_LEVELS: CodingLevel[] = [
  {
    title: 'Level 1: Hello, World!',
    description: 'The first step in any programming journey. Complete the code to print "Hello, World!" to the console.',
    concept: {
      title: 'Printing Output',
      explanation: 'In C, the `printf()` function is used to print text to the console. It\'s a fundamental way to see the result of your code. The text you want to print goes inside the parentheses and double quotes.',
      example: 'printf("Any text you want to display");'
    },
    codeTemplate: [
      '#include <stdio.h>',
      '',
      'int main() {',
      '    ',
      null,
      ';',
      '    return 0;',
      '}',
    ],
    options: [
      { id: 'c1-opt1', code: 'printf("Hello, World!")' },
      { id: 'c1-opt2', code: 'cout << "Hello, World!";' },
      { id: 'c1-opt3', code: 'print("Hello, World!");' },
      { id: 'c1-opt4', code: 'System.out.println("Hello, World!");' },
    ],
    solution: ['c1-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 2: Variables',
    description: 'Variables store data. Declare an integer variable named "age" and assign it the value 25.',
    concept: {
        title: 'Variables',
        explanation: 'Variables are containers for storing data values. In C, you must declare the type of the variable (like `int` for integers) before you use it. You can then assign a value to it using the `=` operator.',
        example: 'int myNumber = 42;\nfloat temperature = 21.5;\nchar initial = \'J\';'
    },
    codeTemplate: [
      '#include <stdio.h>',
      '',
      'int main() {',
      '    ',
      null,
      ';',
      '    printf("Age is: %d\\n", age);',
      '    return 0;',
      '}',
    ],
    options: [
      { id: 'c2-opt1', code: 'string age = "25"' },
      { id: 'c2-opt2', code: 'int age = 25' },
      { id: 'c2-opt3', code: 'let age = 25' },
      { id: 'c2-opt4', code: 'var age = 25' },
    ],
    solution: ['c2-opt2'],
    blanks: 1,
  },
  {
    title: 'Level 3: For Loops',
    description: 'Loops repeat actions. Complete the `for` loop to print the numbers 1, 2, and 3.',
    concept: {
      title: 'For Loops',
      explanation: 'A `for` loop is used to repeat a block of code a specific number of times. It has three parts: initialization (runs once at the start), condition (checked before each run), and increment (runs after each run).',
      example: 'for (int i = 0; i < 5; i++) {\n    // This code runs 5 times\n    printf("%d\\n", i);\n}'
    },
    codeTemplate: [
      '#include <stdio.h>',
      '',
      'int main() {',
      '    for (int i = 1; ',
      null,
      '; i++) {',
      '        printf("%d\\n", i);',
      '    }',
      '    return 0;',
      '}',
    ],
    options: [
      { id: 'c3-opt1', code: 'i < 3' },
      { id: 'c3-opt2', code: 'i <= 3' },
      { id: 'c3-opt3', code: 'i > 3' },
      { id: 'c3-opt4', code: 'i < 4' },
    ],
    solution: ['c3-opt2'],
    blanks: 1,
  },
  {
    title: 'Level 4: Conditional Logic',
    description: 'Check if a score is a "passing" grade. A score of 60 or higher is considered passing. Complete the `if` condition.',
    concept: {
        title: 'If-Else Conditionals',
        explanation: '`if-else` statements allow your code to make decisions. The code inside the `if` block runs if a condition is true. Pay close attention to comparison operators like `>` (greater than) and `>=` (greater than or equal to).',
        example: 'int num = 10;\nif (num > 5) {\n    printf("Number is greater than 5");\n} else {\n    printf("Number is 5 or less");\n}'
    },
    codeTemplate: [
      '#include <stdio.h>',
      '',
      'int main() {',
      '    int score = 75;',
      '    if (',
      null,
      ') {',
      '        printf("Pass\\n");',
      '    } else {',
      '        printf("Fail\\n");',
      '    }',
      '    return 0;',
      '}',
    ],
    options: [
      { id: 'c4-opt1', code: 'score > 60' },
      { id: 'c4-opt2', code: 'score >= 60' },
      { id: 'c4-opt3', code: 'score = 60' },
      { id: 'c4-opt4', code: 'score < 60' },
    ],
    solution: ['c4-opt2'],
    blanks: 1,
  },
  {
    title: 'Level 5: Functions',
    description: 'Functions group code into reusable blocks. Call the `greet` function.',
    concept: {
        title: 'Functions',
        explanation: 'Functions are named blocks of code that perform a specific task. You can "call" a function to execute its code. This helps organize your program and avoids repeating code.',
        example: '// Defining the function\nvoid sayHello() {\n    printf("Hello!");\n}\n\n// Calling the function\nsayHello();'
    },
    codeTemplate: [
      '#include <stdio.h>',
      '',
      'void greet() {',
      '    printf("Greetings from a function!\\n");',
      '}',
      '',
      'int main() {',
      '    ',
      null,
      ';',
      '    return 0;',
      '}',
    ],
    options: [
      { id: 'c5-opt1', code: 'run greet()' },
      { id: 'c5-opt2', code: 'greet()' },
      { id: 'c5-opt3', code: 'call greet' },
      { id: 'c5-opt4', code: 'greet' },
    ],
    solution: ['c5-opt2'],
    blanks: 1,
  },
];
