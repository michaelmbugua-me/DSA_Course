# Efficiently implement power function – Iterative and Recursive

> Source: https://www.techiedelight.com/power-function-implementation-recursive-iterative/

Given two integers, `x` and `n`, where `n` is non-negative, efficiently compute the power function `pow(x, n)`.

For example,

pow(-2, 10) = 1024 pow(-3, 4) = 81 pow(5, 0) = 1 pow(-2, 3) = -8

> 

## 1\. Naive Iterative Solution

A simple solution to calculate `pow(x, n)` would multiply `x` exactly `n` times. We can do that by using a simple for loop. This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Naive iterative solution to calculate `pow(x, n)`
long power(int x, unsigned n)
{
    // initialize result by 1
    long pow = 1L;

    // multiply `x` exactly `n` times
    for (int i = 0; i < n; i++) {
        pow = pow * x;
    }

    return pow;
}

int main(void)
{
    int x = -2;
    unsigned n = 10;

    printf("pow(%d, %d) = %d", x, n, power(x, n));

    return 0;
}
```

**Output:** pow(-2, 10) = 1024

##

```java
class Main
{
    // Naive iterative solution to calculate `pow(x, n)`
    public static long power(int x, int n)
    {
        // initialize result by 1
        long pow = 1L;

        // multiply `x` exactly `n` times
        for (int i = 0; i < n; i++) {
            pow = pow * x;
        }

        return pow;
    }

    public static void main(String[] args)
    {
        int x = -2;
        int n = 10;

        System.out.println("pow(" + x + ", " + n + ") = " + power(x, n));
    }
}
```

##

```python3
# Naive iterative solution to calculate `pow(x, n)`
def power(x, n):

    # initialize result by 1
    pow = 1

    # multiply `x` exactly `n` times
    for i in range(n):
        pow = pow * x

    return pow

if __name__ == '__main__':

    x = -2
    n = 10

    print(f'pow({x}, {n}) =', power(x, n))
```

The time complexity of the above solution is O(n).

## 2\. Using [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/)

We can recursively define the problem as:

power(x, n) = power(x, n / 2) × power(x, n / 2); // otherwise, `n` is even power(x, n) = x × power(x, n / 2) × power(x, n / 2); // if `n` is odd

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Naive recursive solution to calculate `pow(x, n)`
// using divide-and-conquer
long power(int x, unsigned n)
{
    // base condition
    if (n == 0) {
        return 1L;
    }

    if (n & 1) { // if `n` is odd
        return x * power(x, n / 2) * power(x, n / 2);
    }

    // otherwise, `n` is even
    return power(x, n / 2) * power(x, n / 2);
}

int main(void)
{
    int x = -2;
    unsigned n = 10;

    printf("pow(%d, %d) = %d", x, n, power(x, n));

    return 0;
}
```

**Output:** pow(-2, 10) = 1024

##

```java
class Main
{
    // Naive recursive solution to calculate `pow(x, n)`
    // using divide-and-conquer
    public static long power(int x, int n)
    {
        // base condition
        if (n == 0) {
            return 1L;
        }

        if ((n & 1) == 1) { // if `n` is odd
            return x * power(x, n / 2) * power(x, n / 2);
        }

        // otherwise, `n` is even
        return power(x, n / 2) * power(x, n / 2);
    }

    public static void main(String[] args)
    {
        int x = -2;
        int n = 10;

        System.out.println("pow(" + x + ", " + n + ") = " + power(x, n));
    }
}
```

##

```python3
# Naive recursive solution to calculate `pow(x, n)`
# using divide-and-conquer
def power(x, n):

    # base condition
    if n == 0:
        return 1

    if n & 1:    # if `n` is odd
        return x * power(x, n // 2) * power(x, (n // 2))

    # otherwise, `n` is even
    return power(x, n // 2) * power(x, (n // 2))

if __name__ == '__main__':

    x = -2
    n = 10

    print(f'pow({x}, {n}) =', power(x, n))
```

The time complexity of the above solution is O(n).

## 3\. Optimized Divide and Conquer Solution

The problem with the above solution is that the same subproblem is computed twice for each recursive call. We can optimize the above function by computing the solution of the subproblem once only.

The implementation can be seen below in C, Java, and Python:

```c
#include <stdio.h>

// Optimized recursive solution to calculate `pow(x, n)`
// using divide-and-conquer
long power(int x, unsigned n)
{
    // base condition
    if (n == 0) {
        return 1L;
    }

    // calculate subproblem recursively
    int pow = power(x, n / 2);

    if (n & 1) { // if `y` is odd
        return x * pow * pow;
    }

    // otherwise, `y` is even
    return pow * pow;
}

int main(void)
{
    int x = -2;
    unsigned n = 10;

    printf("pow(%d, %d) = %d", x, n, power(x, n));

    return 0;
}
```

**Output:** pow(-2, 10) = 1024
