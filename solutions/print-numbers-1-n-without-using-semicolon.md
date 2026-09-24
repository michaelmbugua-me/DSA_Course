# Print all numbers between 1 to N without using a semicolon

> Source: https://www.techiedelight.com/print-numbers-1-n-without-using-semicolon/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program that takes a positive integer `n` as input and prints all numbers from `1` to `n` in ascending order, without using any semicolons in the code.

For example, if `N` is `5`, the output should be: `1 2 3 4 5`. The program should work for any value of `n`, as long as it is a positive integer.

## 1\. Using while loop

One way is to use the while loop to print all numbers between `1` and `n` without using a semicolon. The while loop can be used to combine multiple statements into one expression, and thus eliminating the need for semicolons. For example, the following code prints all numbers between `1` and `25` without using a semicolon:

```c
#include <stdio.h>

int main(void)
{
    int i = 1, n = 25;
    while (printf("%d\n", i) && i++ < n) {}
}
```

##

```cpp
#include <iostream>

int main()
{
    int i = 1, n = 25;
    while (std::cout << i << "\n" && i++ < n) {}
}
```

Here, `printf("%d\n", i)` and `std::cout << i << "\n"` prints the current value of `i`, followed by a newline character. The `i <= n` checks if the loop should continue or not, and the value of `i` is then incremented by one. The loop ends when `i` becomes greater than `n`. Note we can also use `printf` and `std::cout` inside a if-statement, as follows:

```c
#include <stdio.h>

int main(void)
{
    int i = 0, n = 25;
    while (i++ < n) {
        if (printf("%d\n", i)) {}
    }
}
```

##

```cpp
#include <iostream>

int main()
{
    int i = 0, n = 25;
    while (i++ < n) {
        if (std::cout << i << "\n") {}
    }
}
```

## 2\. Using Recursive `main()` function

Another way is to use recursion to print all numbers between `1` and `n` without using a semicolon. The idea is to call the `main()` function recursively, and with each call, print the next element in the series. We can use a static or a global variable to store information about the previous element.

```c
#include <stdio.h>

int main(void)
{
    static int i = 1, n = 25;
    if (printf("%d\n", i) && i++ < n && main()) {}
}
```
