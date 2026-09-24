# Check if a number is even or odd without using any conditional statement

> Source: https://www.techiedelight.com/find-number-even-odd-without-using-conditional-statement/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given a number, determine if it is even or odd without using any conditional statement (if–else) or ternary operator.

## Method 1: Using string array

The idea is to use the modulo operator or LSB to determine if a number is even or odd. Instead of using a conditional statement to output odd/even, we can use a string array index as demonstrated below in C/C++:

```
#include <iostream>
using namespace std;

int main()
{
    int n = 6;
    string arr[] = {"even", "odd"};

    // using modulo operator
    cout << arr[n % 2];

    return 0;
}
```

OR

```
#include <iostream>
using namespace std;

int main()
{
    int n = 6;
    string arr[] = {"even", "odd"};

    // checking LSB of number for even/odd
    cout << arr[n & 1];

    return 0;
}
```

OR

```
#include <stdio.h>

int main()
{
    int n = 8;
    char* arr[] = {"odd", "even"};

    // repeated subtraction
    while (n-- && --n > 0) {}

    // if `n` is 0, the number is even
    // if `n` is -1, the number is odd
    printf("%s", arr[n + 1]);

    return 0;
}
```

## Method 2: Using short-circuiting in boolean expressions

We can take advantage of [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in boolean expressions. We know that in boolean `AND` operation such as `x && y`, `y` is evaluated only if `x` is true. If `x` is false, then `y` is not evaluated because the whole expression would become false, which can be deduced without even evaluating `y`. Similarly, for boolean OR operation such as `x || y`, `y` is evaluated only if `x` is false. If `x` is true, then `y` is not evaluated. This is called short-circuiting in boolean expressions.

We can apply this logic to solve a given problem. Consider the following code snippet:

`((n & 1) && printf("odd")) || printf("even");`

Initially, check if `n` is odd or even. If `n` is odd, the first subexpression of `AND` becomes true, and its second subexpression `printf("odd")` gets evaluated. Otherwise, if `n` is even, the first subexpression of `OR` will become false, and its second subexpression `printf("even")` gets evaluated.

This approach is demonstrated below in C:

```
#include <stdio.h>

int main()
{
    int n = 6;
    ((n & 1) && printf("odd")) || printf("even");

    return 0;
}
```

OR

```
#include <stdio.h>

int main()
{
    int n = 6;
    ((n % 2) && printf("odd")) || printf("even");

    return 0;
}
```

OR

```
#include <stdio.h>

int main()
{
    int n = 9;

    while (n-- && --n > 0) {}

    ((n == 0) && printf("even")) || printf("odd");

    return 0;
}
```

Don’t forget to share with us if you find any more interesting methods to solve this problem.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.67/5. Vote count: 55

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
