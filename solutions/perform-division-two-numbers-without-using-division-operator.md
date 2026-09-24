# Perform division of two numbers without using division operator

> Source: https://www.techiedelight.com/perform-division-two-numbers-without-using-division-operator/

Write a program to perform a division of two numbers without using the division operator (‘/’).

## Approach #1: Division using Repeated Subtraction

We know that divisions can be solved by repeatedly subtracting the divisor from the dividend until it becomes less than the divisor. The total number of times the repeated subtraction is carried out is equal to the quotient.

This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// Function to perform division `x/y` of two numbers `x` and `y` without
// using the division operator in the code
int divide(int x, int y)
{
    // handle divisibility by 0
    if (y == 0)
    {
        printf("Error!! Divisible by 0");
        exit(-1);
    }

    // store sign of the result
    int sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    // convert both dividend and divisor to positive
    x = abs(x), y = abs(y);

    // initialize quotient by 0
    int quotient = 0;

    // loop till dividend `x` becomes less than divisor `y`
    while (x >= y)
    {
        x = x - y;      // perform a reduction on the dividend
        quotient++;     // increase quotient by 1
    }

    printf("The remainder is %d\n", x);

    return sign * quotient;
}

int main(void)
{
    int dividend = 22;
    int divisor = -7;

    printf("The quotient is %d\n", divide(dividend, divisor));

    return 0;
}
```

**Output:** The remainder is 1 The quotient is -3

##

```java
class Main
{
    // Function to perform division `x/y` of two numbers `x` and `y` without
    // using the division operator in the code
    public static int divide(int x, int y)
    {
        // handle divisibility by 0
        if (y == 0)
        {
            System.out.printf("Error!! Divisible by 0");
            System.exit(-1);
        }

        // store sign of the result
        int sign = 1;
        if (x * y < 0) {
            sign = -1;
        }

        // convert both dividend and divisor to positive
        x = Math.abs(x);
        y = Math.abs(y);

        // initialize quotient by 0
        int quotient = 0;

        // loop till dividend `x` becomes less than divisor `y`
        while (x >= y)
        {
            x = x - y;      // perform a reduction on the dividend
            quotient++;     // increase quotient by 1
        }

        System.out.println("The remainder is " + x);
        return sign * quotient;
    }

    public static void main(String[] args)
    {
        int dividend = 22;
        int divisor = -7;

        System.out.println("The quotient is " + divide(dividend, divisor));
    }
}
```

##

```python3
# Function to perform division `x/y` of two numbers `x` and `y` without
# using the division operator in the code
def divide(x, y):

    # handle divisibility by 0
    if y == 0:
        print('Error!! Divisible by 0')
        exit(-1)

    # store sign of the result
    sign = 1
    if x * y < 0:
        sign = -1

    # convert both dividend and divisor to positive
    x = abs(x)
    y = abs(y)

    # initialize quotient by 0
    quotient = 0

    # loop till dividend `x` becomes less than divisor `y`
    while x >= y:
        x = x - y                   # perform a reduction on the dividend
        quotient = quotient + 1     # increase quotient by 1

    print('Remainder is', x)
    return sign * quotient

if __name__ == '__main__':

    dividend = 22
    divisor = -7

    print('Quotient is', divide(dividend, divisor))
```

Following is the recursive version of the above program in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Recursive function to perform division `x/y` of two positive numbers
// `x` and `y` without using the division operator in the code
unsigned division(unsigned x, unsigned y)
{
    if (x < y)
    {
        printf("The remainder is %d\n", x);
        return 0;
    }

    return 1 + division(x - y, y);
}

// Wrapper over `division()` function to handle negative dividend or divisor
int divide(int x, int y)
{
    // handle divisibility by 0
    if (y == 0)
    {
        printf("Error!! Divisible by 0");
        exit(-1);
    }

    // store sign of the result
    int sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    return sign * division(abs(x), abs(y));
}

int main(void)
{
    int dividend = 22;
    int divisor = -7;

    printf("The quotient is %d\n", divide(dividend, divisor));

    return 0;
}
```

**Output:** The remainder is 1 The quotient is -3

##

```java
class Main
{
    // Recursive function to perform division `x/y` of two positive numbers
    // `x` and `y` without using the division operator in the code
    public static int division(int x, int y)
    {
        if (x < y)
        {
            System.out.printf("The remainder is %d\n", x);
            return 0;
        }

        return 1 + division(x - y, y);
    }

    // Wrapper over `division()` method to handle negative dividend or divisor
    public static int divide(int x, int y)
    {
        // handle divisibility by 0
        if (y == 0)
        {
            System.out.printf("Error!! Divisible by 0");
            System.exit(-1);
        }

        // store sign of the result
        int sign = 1;
        if (x * y < 0) {
            sign = -1;
        }

        return sign * division(Math.abs(x), Math.abs(y));
    }

    public static void main(String[] args)
    {
        int dividend = 22;
        int divisor = -7;

        System.out.printf("The quotient is %d\n", divide(dividend, divisor));
    }
}
```

##

```python3
# Recursive function to perform division `x/y` of two positive numbers
# `x` and `y` without using the division operator in the code
def division(x, y):

    if x < y:
        print('Remainder is', x)
        return 0
    return 1 + division(x - y, y)

# Wrapper over `division()` function to handle negative dividend or divisor
def divide(x, y):

    # handle divisibility by 0
    if y == 0:
        print('Error!! Divisible by 0')
        exit(-1)

    # store sign of the result
    sign = 1
    if x * y < 0:
        sign = -1

    return sign * division(abs(x), abs(y))

if __name__ == '__main__':

    dividend = 22
    divisor = -7

    print('Quotient is', divide(dividend, divisor))
```

## Approach #2

```c
#include <stdio.h>
#include <stdlib.h>

// Function to perform division `x/y` of two numbers `x` and `y`
// without using the division operator in the code
int divide(int x, int y)
{
    // handle divisibility by 0
    if (y == 0)
    {
        printf("Error!! Divisible by 0");
        exit(-1);
    }

    // store sign of the result
    int sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    // convert both dividend and divisor to positive
    x = abs(x), y = abs(y);

    // initialize denominator by `y`
    int denominator = y;

    // initialize quotient by 1
    int quotient = 1;

    // Double denominator and quotient value until denominator is more than
    // dividend `x`
    while (x > denominator)
    {
        denominator *= 2;
        quotient *= 2;
        // printf("%d %d\n", denominator, quotient);
    }

    // Subtract divisor `y` from the denominator and reduce quotient by 1 until
    // the denominator is less than dividend `x`
    while (denominator > x)
    {
        denominator -= y;
        quotient -= 1;
        // printf("%d %d\n", denominator, quotient);
    }

    printf("The remainder is %d\n", x - denominator);
    return sign * quotient;
}

int main(void)
{
    int dividend = 22;
    int divisor = -7;

    printf("The quotient is %d\n", divide(dividend, divisor));

    return 0;
}
```

**Output:** The remainder is 1 The quotient is -3
