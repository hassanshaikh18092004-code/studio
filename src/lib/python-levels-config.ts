
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
  {
    title: 'Level 6: Function Parameters',
    description: 'Pass data to functions. Call `calculate_area` with a width of 5 and height of 10.',
    concept: {
        title: 'Function Parameters',
        explanation: 'You can pass data into a function through parameters (also called arguments). These are variables listed inside the parentheses in the function definition. When you call the function, you provide values for these parameters.',
        example: '# This function takes one parameter\ndef print_message(message):\n    print(message)\n\n# Call it and pass a string\nprint_message("This is a test!")'
    },
    codeTemplate: [
        'def calculate_area(width, height):',
        '    print(f"Area is: {width * height}")',
        '',
        null,
    ],
    options: [
        { id: 'py6-opt1', code: 'calculate_area(5, 10)' },
        { id: 'py6-opt2', code: 'calculate_area(5)' },
        { id: 'py6-opt3', code: 'calculate_area(width=10, height=5)' },
        { id: 'py6-opt4', code: 'calculate_area(10, 5)' },
    ],
    solution: ['py6-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 7: Return Values',
    description: 'Functions can return a value. Complete the function to return `True` if a person is old enough to vote (age 18 or older), and `False` otherwise.',
    concept: {
        title: 'Return Values with Booleans',
        explanation: 'Functions can return boolean values (`True` or `False`). This is very common for functions that check if a condition is met. The result of a comparison (like `age >= 18`) is already a boolean value, so you can return it directly!',
        example: '# This function returns the sum of two numbers\ndef add(a, b):\n    return a + b\n\n# Store the returned value in a variable\nsum_result = add(5, 3) # sum_result is now 8'
    },
    codeTemplate: [
        'def can_vote(age):',
        '    ',
        null,
        '',
        'is_old_enough = can_vote(20)',
        'print(f"Can vote: {is_old_enough}")',
    ],
    options: [
        { id: 'py7-opt1', code: 'return age >= 18' },
        { id: 'py7-opt2', code: 'return age > 18' },
        { id: 'py7-opt3', code: 'print(age >= 18)' },
        { id: 'py7-opt4', code: 'return True' },
    ],
    solution: ['py7-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 8: While Loops',
    description: 'Stop a `while` loop when a condition is met. Find the sum of numbers from 1 until the sum exceeds 10.',
    concept: {
        title: 'While Loops for Goal-Seeking',
        explanation: 'A `while` loop is perfect for repeating an action until a specific goal is reached. You can use a condition to check if you have reached the goal in each iteration.',
        example: 'count = 0\nwhile count < 3:\n    print("Looping...")\n    count += 1 # It is crucial to change the condition variable'
    },
    codeTemplate: [
        'total = 0',
        'num = 1',
        'while ',
        null,
        ':',
        '    total += num',
        '    num += 1',
        'print(f"Sum is {total}")',
    ],
    options: [
        { id: 'py8-opt1', code: 'total < 10' },
        { id: 'py8-opt2', code: 'total <= 10' },
        { id: 'py8-opt3', code: 'num < 10' },
        { id: 'py8-opt4', code: 'total != 10' },
    ],
    solution: ['py8-opt2'],
    blanks: 1,
  },
  {
    title: 'Level 9: Lists and Loops',
    description: 'Loop through a list to find a specific item. Print "Found it!" if the name "Charlie" is in the list.',
    concept: {
        title: 'Looping Through Lists',
        explanation: 'You can combine a `for` loop with an `if` statement to search for an item in a list. The loop goes through each item one-by-one, and the `if` statement checks if the current item is the one you\'re looking for.',
        example: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)'
    },
    codeTemplate: [
        'names = ["Alice", "Bob", "Charlie", "David"]',
        'for name in names:',
        '    if ',
        null,
        ':',
        '        print("Found it!")',
    ],
    options: [
        { id: 'py9-opt1', code: 'name == "Charlie"' },
        { id: 'py9-opt2', code: 'name is "Charlie"' },
        { id: 'py9-opt3', code: 'name = "Charlie"' },
        { id: 'py9-opt4', code: 'name in names' },
    ],
    solution: ['py9-opt1'],
    blanks: 1,
  },
  {
    title: 'Level 10: Dictionaries',
    description: 'Dictionaries store key-value pairs. Update the "city" of the person to "London".',
    concept: {
        title: 'Updating Dictionaries',
        explanation: 'Dictionaries are mutable, meaning you can change them. To update the value for a specific key, you can access it using square brackets and assign a new value to it.',
        example: 'user = {"name": "Bob", "age": 30}\n\n# Access a value\nprint(user["name"]) # Prints "Bob"\n\n# Update a value\nuser["age"] = 31'
    },
    codeTemplate: [
        'person = {',
        '    "name": "John",',
        '    "city": "New York"',
        '}',
        null,
        'print(person["city"])',
    ],
    options: [
        { id: 'py10-opt1', code: 'person["city"] = "London"' },
        { id: 'py10-opt2', code: 'person.city = "London"' },
        { id: 'py10-opt3', code: 'person.update("city", "London")' },
        { id: 'py10-opt4', code: 'person["city"] == "London"' },
    ],
    solution: ['py10-opt1'],
    blanks: 1,
  },
];
