import type { CodingLevel } from '@/lib/types';

export const PYTHON_LEVELS: CodingLevel[] = [
  {
    title: 'Level 1: Hello, World!',
    description: 'The first step in any programming journey. Complete the code to print "Hello, World!" to the console.',
    concept: {
      title: 'Printing Output',
      explanation: 'In Python, the `print()` function is used to display text or variables in the console. It\'s the most common way to see your code\'s output. The content to be printed goes inside the parentheses.',
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
    description: 'Loops repeat actions. Complete the `for` loop to print numbers from 0 to 4.',
    concept: {
        title: 'For Loops',
        explanation: 'A `for` loop in Python is used for iterating over a sequence (like a list, tuple, or range). The `range(5)` function generates numbers from 0 up to (but not including) 5.',
    },
    codeTemplate: [
      null,
      '    print(i)',
    ],
    options: [
      { id: 'py3-opt1', code: 'for i in range(5):' },
      { id: 'py3-opt2', code: 'for (i = 0; i < 5; i++):' },
      { id: 'py3-opt3', code: 'loop i from 0 to 4:' },
      { id: 'py3-opt4', code: 'for i in 5:' },
    ],
    solution: ['py3-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 4: Conditional Statements',
    description: 'Use an `if-else` statement to check if a number is positive.',
    concept: {
        title: 'If-Else Conditionals',
        explanation: '`if-else` statements allow your code to run different blocks of code based on a condition. If the condition after `if` is true, its block runs. Otherwise, the block after `else` runs. Indentation is very important!',
    },
    codeTemplate: [
      'num = 10',
      null,
      '    print("Positive")',
      null,
      '    print("Not Positive")',
    ],
    options: [
      { id: 'py4-opt1', code: 'if num > 0:' },
      { id: 'py4-opt2', code: 'else:' },
      { id: 'py4-opt3', code: 'if (num > 0)' },
      { id: 'py4-opt4', code: 'otherwise:' },
    ],
    solution: ['py4-opt1', 'py4-opt2'],
    blanks: 2,
  },
  {
    title: 'Level 5: Functions',
    description: 'Functions group code into reusable blocks. Call the `greet` function.',
    concept: {
        title: 'Functions',
        explanation: 'Functions are defined using the `def` keyword. They bundle up code that you can run simply by "calling" the function name. This makes code reusable and organized.',
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
  {
    title: 'Level 6: Function with Parameters',
    description: 'Pass data to functions using parameters. Call `say_hello` with your name.',
    concept: {
        title: 'Function Parameters',
        explanation: 'You can pass data into a function through parameters (also called arguments). These are variables listed inside the parentheses in the function definition. When you call the function, you provide values for these parameters.',
    },
    codeTemplate: [
        'def say_hello(name):',
        '    print(f"Hello, {name}!")',
        '',
        null,
    ],
    options: [
        { id: 'py6-opt1', code: 'say_hello("Alex")' },
        { id: 'py6-opt2', code: 'say_hello(Alex)' },
        { id: 'py6-opt3', code: 'call say_hello("Alex")' },
        { id: 'py6-opt4', code: 'say_hello "Alex"' },
    ],
    solution: ['py6-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 7: Return Values',
    description: 'Functions can return a value. Complete the function to return the sum of two numbers.',
    concept: {
        title: 'Return Values',
        explanation: 'Functions can send a result back to the code that called them using the `return` statement. You can then store this result in a variable for later use.',
    },
    codeTemplate: [
        'def add(a, b):',
        '    ',
        null,
        '',
        'result = add(5, 3)',
        'print(f"Result: {result}")',
    ],
    options: [
        { id: 'py7-opt1', code: 'return a + b' },
        { id: 'py7-opt2', code: 'print(a + b)' },
        { id: 'py7-opt3', code: 'a + b' },
        { id: 'py7-opt4', code: 'yield a + b' },
    ],
    solution: ['py7-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 8: While Loops',
    description: 'A `while` loop continues as long as a condition is true. Print numbers from 1 to 3.',
    concept: {
        title: 'While Loops',
        explanation: 'A `while` loop executes a set of statements as long as a condition is true. It\'s important to make sure the condition will eventually become false, otherwise the loop will run forever!',
    },
    codeTemplate: [
        'i = 1',
        null,
        '    print(i)',
        '    ',
        null,
    ],
    options: [
        { id: 'py8-opt1', code: 'while i <= 3:' },
        { id: 'py8-opt2', code: 'i += 1' },
        { id: 'py8-opt3', code: 'while i < 3:' },
        { id: 'py8-opt4', code: 'i++' },
    ],
    solution: ['py8-opt1', 'py8-opt2'],
    blanks: 2,
  },
  {
    title: 'Level 9: Lists',
    description: 'Lists (arrays) store multiple values. Access and print the second fruit from the list.',
    concept: {
        title: 'Lists',
        explanation: 'A list in Python is an ordered collection of items, which can be of different types. You access list items by referring to their index number, starting from 0 for the first item.',
    },
    codeTemplate: [
        'fruits = ["Apple", "Banana", "Cherry"]',
        'print(',
        null,
        ')',
    ],
    options: [
        { id: 'py9-opt1', code: 'fruits[1]' },
        { id: 'py9-opt2', code: 'fruits[2]' },
        { id: 'py9-opt3', code: 'fruits.get(1)' },
        { id: 'py9-opt4', code: 'fruits.1' },
    ],
    solution: ['py9-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 10: Dictionaries',
    description: 'Dictionaries store key-value pairs. Print the value associated with the "city" key.',
    concept: {
        title: 'Dictionaries',
        explanation: 'Dictionaries store data in key-value pairs. You can access the value by referring to its key name inside square brackets. They are unordered, mutable, and do not allow duplicate keys.',
    },
    codeTemplate: [
        'person = {',
        '    "name": "John",',
        '    "city": "New York"',
        '}',
        'print(',
        null,
        ')',
    ],
    options: [
        { id: 'py10-opt1', code: 'person["city"]' },
        { id: 'py10-opt2', code: 'person.city' },
        { id: 'py10-opt3', code: 'person[1]' },
        { id: 'py10-opt4', code: 'person.get("city")' },
    ],
    solution: ['py10-opt1'],
    blanks: 1,
  },
];
