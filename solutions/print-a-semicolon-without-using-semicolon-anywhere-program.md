# Print a semicolon without using a semicolon anywhere in the program

> Source: https://www.techiedelight.com/print-a-semicolon-without-using-semicolon-anywhere-program/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program to print a semicolon without using a semicolon anywhere in the program.

Note this is not a practical problem, but rather a fun and challenging exercise. It can help us to learn more about the syntax and features of C/C++ programming language, and test our creativity and problem-solving skills. We should always use semicolons where appropriate in real-world applications.

## 1\. Using `printf()` or `putchar()` function

We can use the ASCII value of the semicolon to print a semicolon, without using a semicolon in the program. The idea is to call the `printf()` function inside an `if` conditional expression with an empty body to avoid using a semicolon. When the conditional expression is evaluated, it will print a semicolon on the console.

```
#include <stdio.h>

// 59 is an ASCII value of the semicolon
#define SEMICOLON 59

int main(void)
{
    if (printf("%c", SEMICOLON)) {}
}
```

The `printf()` function prints the character with the ASCII value `59`, which is the semicolon. We can also use the `putchar()` function instead of the `printf()` function, as shown below:

```
#include <stdio.h>

// 59 is an ASCII value of the semicolon
#define SEMICOLON 59

int main(void)
{
    if (putchar(SEMICOLON)) {}
}
```

We can also use a while-loop if the conditional statements are not allowed in the program.

```
#include <stdio.h>

// 59 is an ASCII value of the semicolon
#define SEMICOLON 59

int main() {
    while (!printf("%c", SEMICOLON)) {}
}
```

## 2\. Using `std::cout`

In C++, we can easily replace `printf()` function with `std::cout`. The idea is to use the `static_cast<char>(59)` to convert the integer `59` to a character, which is the semicolon. For example, the following C++ code prints a semicolon without using a semicolon anywhere in the program:

```
#include <iostream>

// 59 is an ASCII value of the semicolon
#define SEMICOLON 59

int main() {
    if (std::cout << static_cast<char>(SEMICOLON)) {}
}
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
