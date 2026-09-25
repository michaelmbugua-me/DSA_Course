# Print a semicolon without using a semicolon anywhere in the program

> Source: https://www.techiedelight.com/print-a-semicolon-without-using-semicolon-anywhere-program/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program to print a semicolon without using a semicolon anywhere in the program.

Note this is not a practical problem, but rather a fun and challenging exercise. It can help us to learn more about the syntax and features of TypeScript, and test our creativity and problem-solving skills. We should always use semicolons where appropriate in real-world applications.

## 1\. Using `console.log()` or `process.stdout.write()`

We can use the ASCII value of the semicolon to print a semicolon, without using a semicolon in the program. The idea is to call the `console.log()` function inside an `if` conditional expression with an empty body to avoid using a semicolon. When the conditional expression is evaluated, it will print a semicolon on the console.

```ts
// 59 is an ASCII value of the semicolon
const SEMICOLON = 59;

if (console.log(String.fromCharCode(SEMICOLON))) {}
```

The `console.log()` function prints the character with the ASCII value `59`, which is the semicolon. We can also use the `process.stdout.write()` function instead of the `console.log()` function, as shown below:

```ts
// 59 is an ASCII value of the semicolon
const SEMICOLON = 59;

if (process.stdout.write(String.fromCharCode(SEMICOLON))) {}
```

We can also use a while-loop if the conditional statements are not allowed in the program.

```ts
// 59 is an ASCII value of the semicolon
const SEMICOLON = 59;

while (!console.log(String.fromCharCode(SEMICOLON))) {}
```

## 2\. Using `process.stdout.write()` with `String.fromCharCode()`

We can easily replace `console.log()` function with `process.stdout.write()` combined with `String.fromCharCode()`. The idea is to use `String.fromCharCode(59)` to convert the integer `59` to a character, which is the semicolon. For example, the following TypeScript code prints a semicolon without using a semicolon anywhere in the program:

```ts
// 59 is an ASCII value of the semicolon
const SEMICOLON = 59;

if (process.stdout.write(String.fromCharCode(SEMICOLON))) {}
```

Also See:

> [Print all numbers between 1 to N without using a semicolon](https://www.techiedelight.com/print-numbers-1-n-without-using-semicolon/ "Print all numbers between 1 to N without using a semicolon")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 50

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
