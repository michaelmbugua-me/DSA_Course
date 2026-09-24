# Find minimum number without using conditional statement or ternary operator

> Source: https://www.techiedelight.com/find-minimum-number-without-using-conditional-statement-ternary-operator/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two integers, find the minimum number between them without using any conditional statement (or ternary operator).

## Approach 1

We can use `(a > b) × b + (b > a) × a` expression to find minimum number. This expression works as explained below.

**Case 1:** When a is greater (a > b) × b + (b > a) × a = 1 × b + 0 × a = b **Case 2:** When b is greater (a > b) × b + (b > a) × a = 0 × b + 1 × a = a

The following C program demonstrates it:

```c
#include <stdio.h>

int minimum(int a, int b)
{
    int min = (a > b) * b + (b > a) * a;

    return min;
}

int main()
{
    printf("The minimum number is %d", minimum(-8, 9));

    return 0;
}
```

## Approach 2: Short–circuiting in Boolean expressions

We can take advantage of [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in Boolean expressions. In boolean operations such as `AND`, `y` is evaluated only if `x` is true for `x && y`; `y` is not evaluated if `x` is false because the whole expression would be false, which can be derived without evaluating `y`.

We can apply the above principle to the following code. Initially, `min` is `a`. Now if `min > b` is true, i.e., `b` is less than `a`, the second subexpression `min = b` will be evaluated and `min` will set to `b`; otherwise, if `min > b` is false, the second subexpression will not be evaluated and `min` will remain equal to `a`.

```c
#include <stdio.h>

int minimum(int a, int b)
{
    // initialize `min` with `a`
    int min = a;

    // set `min` to `b` if and only if `min` is more than `b`
    (min > b) && (min = b);

    return min;
}

int main()
{
    printf("The minimum number is %d", minimum(-8, 9));

    return 0;
}
```

## Approach 3: Using repeated subtraction

We can find the minimum of two integers by doing repeated subtraction until any number becomes zero. The total number of times we do removal will be the minimum number.

This approach is demonstrated below in C. This solution won’t work on negative numbers.

```c
#include <stdio.h>

int minimum (int a, int b)
{
    int min = 0;
    while (a && b)
    {
        --a;
        --b;
        ++min;
    }

    return min;
}

int main()
{
    printf("The minimum number is %d", minimum(8, 9));

    return 0;
}
```
