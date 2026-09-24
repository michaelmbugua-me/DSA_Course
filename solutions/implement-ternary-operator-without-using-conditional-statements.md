# Implement ternary operator without using conditional expressions

> Source: https://www.techiedelight.com/implement-ternary-operator-without-using-conditional-statements/

This post will implement a ternary-like operator in C without using conditional expressions like ternary operator, if–else expression, or switch-case statements.

The solution should implement the condition `x ? a : b`.

If `x = 1`, `a` is returned; if `x = 0`, `b` should be returned.

## 1\. Develop custom expression

The idea is to use the expression `x × a + !x × b` or `x × a + (1 - x) × b`.

### How this works?

Let’s consider the first expression `x × a + !x × b`:

  * For `x = 1`, the expression reduces to `(1 × a) + (!1 × b) = a`.
  * For `x = 0`, the expression reduces to `(0 × a) + (!0 × b) = b`.

The following C program demonstrates it:

```
#include <stdio.h>

// Function to return the result of the expression (x ? a : b)
int ternary(int x, int a, int b) {
    return x * a + !x * b;
}

// Implement a ternary operator without using conditional expressions
int main(void)
{
    int a = 10, b = 20;

    printf ("%d\n", ternary(0, a, b));
    printf ("%d\n", ternary(1, a, b));

    return 0;
}
```

**Output:** 20 10

## 2\. Using Array

Another plausible way is to construct an array of size 2 in such a manner that index 0 of the array holds the value of `b` and index 1 holds the value of `a`, as shown below:

`int arr[] = { b, a };`

Then we can return the value present at index 0 or 1 depending upon the value of `x`.

  * For `x = 1`, the expression `arr[x]` reduces to `arr[1] = a`.
  * For `x = 0`, the expression `arr[x]` reduces to `arr[0] = b`.

This is demonstrated below in C. Please note that this approach doesn’t use any operators in C, such as arithmetic, relational, logical, conditional, etc.

```
#include <stdio.h>

// Function to return the result of the expression (x ? a : b)
int ternary(int x, int a, int b)
{
    int arr[] = { b, a };

    return arr[x];
}

// Implement a ternary operator without using conditional expressions
int main(void)
{
    int a = 10, b = 20;

    printf ("%d\n", ternary(0, a, b));
    printf ("%d\n", ternary(1, a, b));

    return 0;
}
```

**Output:** 20 10

## 3\. Using Short Circuiting

Another approach is to use [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in boolean expressions. For `AND` operations in C such as `x && y`, `y` is evaluated only if `x` is true. Similarly, for `OR` operation like `x || y`, `y` is only evaluated if `x` is false. We can apply this logic to solve this problem. Consider the following code snippet:

`x && ((result = a) || !a) || (result = b)`

Initially, we check whether `x` is 1 or 0. If `x = 1`, the result is set to `a` and `result = b` subexpression won’t get executed. If `x = 0`, the `(result = a) || !a` subexpression won’t be executed and the result is set to `b`. Please note that `!a` is added to handle the case when `a = 0`.

This approach is demonstrated below in C:

```
#include <stdio.h>

// Function to return the result of the expression `x ? a : b`
int ternary(int x, int a, int b)
{
    int result;
    x && ((result = a) || !a) || (result = b);

    return result;
}

// Implement a ternary operator without using conditional expressions
int main(void)
{
    int a = 10, b = 20;

    printf ("%d\n", ternary(0, a, b));
    printf ("%d\n", ternary(1, a, b));

    return 0;
}
```

**Output:** 20 10

Also See:

> [Find minimum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-minimum-number-without-using-conditional-statement-ternary-operator/ "Find minimum number without using conditional statement or ternary operator")

> [Find maximum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-maximum-number-without-using-conditional-statement-ternary-operator/ "Find maximum number without using conditional statement or ternary operator")

> [Check if a number is even or odd without using any conditional statement](https://www.techiedelight.com/find-number-even-odd-without-using-conditional-statement/ "Check if a number is even or odd without using any conditional statement")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.06/5. Vote count: 62

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
