# Print “Hello World” with empty main function

> Source: https://www.techiedelight.com/print-hello-world-empty-main-function/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program to print “Hello World” with an empty main function, i.e., without writing anything inside the `main()` function.

The main function is the entry point of any C or C++ program, where the execution begins and ends. The main function has the following syntax:

```
int main (void) {
    // statements
    return 0;
}
```

The main function usually contains some statements that perform the logic of the program. In this post, we will explore some of the possible ways to print “Hello World” with an empty main function. This may seem impossible or absurd, but there are actually some clever tricks to achieve this goal in C/C++:

## 1\. Using Constructor

One of the possible ways to print “Hello World” with an empty main function is to use constructor. A constructor is a special member function of a class that is invoked when an object of that class is created.

We can use a constructor to print “Hello World” to the `std::cout` or `printf()` function, and create an object of that class before the main function. This way, the constructor will be executed before the main function, and print “Hello World” to the standard output. For example, we can write the following code in C++:

```
#include <iostream>

class test
{
public:
    test() {
        std::cout << "Hello World";
    }
} obj;

int main() {}
```

Please note that we can also use `std::cout` or `printf()` inside constructor of a struct and create its object outside `main()` function, as shown below:

```
#include <iostream>

struct test
{
    test() {
        std::cout << "Hello World";
    }
} obj;

int main() {}
```

## 2\. Using Global Variables

Another possible way to print “Hello World” with an empty main function is to use global variables and the `printf()` function. We can use a global variable to store the return value of the `printf()` function that prints Hello World, and declare it before the main function. This way, the `printf()` function will be executed before the main function, and print “Hello World” to the standard output. For example, we can write the following code in C:

```
#include <iostream>

// global variable that stores the return value of printf()
int n = printf("Hello World");

int main() {}
```

In C++, we can initialize the global variable with return type of function that prints “Hello World” using `std::cout`.

```
#include <iostream>

int fun()
{
    std::cout << "Hello World";
    return 1;
}

int x = fun();

int main() {}
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 57

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
