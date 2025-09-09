
import type { CodingLevel } from '@/lib/types';

export const PYTHON_LEVELS: CodingLevel[] = [
  {
    title: 'Level 1: Hello, World!',
    description: 'The first step in any programming journey. Complete the code to print "Hello, World!" to the console.',
    concept: {
      title: 'Printing Output',
      explanation: 'In Python, the `print()` function is used to display text or variables in the console. It\'s the most common way to see your code\'s output. The content to be printed goes inside the parentheses.',
      example: 'print("Any text you want to display")'
    },
    codeTemplate: [
      null,
    ],
    options: [
      { id: 'py1-opt1', code: 'print("Hello, World!")' },
      { id: 'py1-opt2', code: 'printf("Hello, World!")' },
      { id: 'py1-opt3', code: 'console.log("Hello, World!")' },
      { id: 'py1-opt4', code: 'cout << "Hello, World!"' },
    ],
    solution: ['py1-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 2: Variables',
    description: 'Variables store data. Create a variable named "message" and assign it the value "Python is fun".',
    concept: {
        title: 'Variables',
        explanation: 'Variables are used to store information that can be used and changed in a program. In Python, you create a variable by giving it a name and assigning it a value using the `=` sign.',
        example: 'my_number = 42\ntemperature = 21.5\nuser_name = "Alice"'
    },
    codeTemplate: [
      null,
      'print(message)',
    ],
    options: [
      { id: 'py2-opt1', code: 'let message = "Python is fun"' },
      { id: 'py2-opt2', code: 'message = "Python is fun"' },
      { id: 'py2-opt3', code: 'string message = "Python is fun"' },
      { id: 'py2-opt4', code: 'var message = "Python is fun"' },
    ],
    solution: ['py2-opt2'],
    blanks: 1,
  },
  {
    title: 'Level 3: For Loops',
    description: 'Loops repeat actions. Complete the `for` loop to print the numbers 2, 4, and 6.',
    concept: {
        title: 'For Loops with Range',
        explanation: 'A `for` loop iterates over a sequence. The `range()` function is powerful; `range(start, stop, step)` generates numbers from a start value, up to a stop value, incrementing by a step value.',
        example: '# This will print 0, 1, 2, 3, 4\nfor i in range(5):\n    print(i)'
    },
    codeTemplate: [
      null,
      '    print(i)',
    ],
    options: [
      { id: 'py3-opt1', code: 'for i in range(2, 7, 2):' },
      { id: 'py3-opt2', code: 'for i in range(2, 6, 2):' },
      { id: 'py3-opt3', code: 'for i in range(2, 8, 2):' },
      { id: 'py3-opt4', code: 'for i in range(6):' },
    ],
    solution: ['py3-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 4: Conditional Logic',
    description: 'Check if a number is even or odd. The modulo operator `%` gives the remainder of a division.',
    concept: {
        title: 'If-Else and Modulo',
        explanation: '`if-else` statements make decisions. The modulo operator (`%`) is perfect for checking for evenness. `number % 2 == 0` is true if `number` is even, because there is no remainder when dividing by 2.',
        example: 'num = 10\nif num > 5:\n    print("Number is greater than 5")\nelse:\n    print("Number is 5 or less")'
    },
    codeTemplate: [
      'num = 7',
      'if ',
      null,
      ':',
      '    print("Even")',
      'else:',
      '    print("Odd")',
    ],
    options: [
      { id: 'py4-opt1', code: 'num % 2 == 1' },
      { id: 'py4-opt2', code: 'num % 2 != 0' },
      { id: 'py4-opt3', code: 'num % 2 == 0' },
      { id: 'py4-opt4', code: 'num / 2 == 0' },
    ],
    solution: ['py4-opt3'],
    blanks: 1,
  },
  {
    title: 'Level 5: Functions',
    description: 'Functions group code into reusable blocks. Call the `greet` function.',
    concept: {
        title: 'Functions',
        explanation: 'Functions are defined using the `def` keyword. They bundle up code that you can run simply by "calling" the function name. This makes code reusable and organized.',
        example: '# Defining the function\ndef say_hello():\n    print("Hello!")\n\n# Calling the function\nsay_hello()'
    },
    codeTemplate: [
      'def greet():',
      '    print("Greetings from a function!")',
      '',
      null,
    ],
    options: [
      { id: 'py5-opt1', code: 'run greet()' },
      { id: 'py5-opt2', code: 'greet()' },
      { id: 'py5-opt3', code: 'call greet' },
      { id: 'py5-opt4', code: 'greet' },
    ],
    solution: ['py5-opt2'],
    blanks: 1,
  },
];
