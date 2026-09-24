# Multiply two numbers without using a multiplication operator or loops

> Source: https://www.techiedelight.com/multiply-two-numbers-without-using-multiplication-operator-loops/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two integers, multiply them without using the multiplication operator or conditional loops.

## 1\. Using Recursion

The idea is that for given two numbers `a` and `b`, we can get `a×b` by adding an integer `a` exactly `b` times to the result. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

int mul(int a, int b)
{
    // base cases
    if (a == 0 || b == 0) {
        return 0;
    }

    if (b == 1) {
        return a;
    }

    if (a == 1) {
        return b;
    }

    return a + mul(a, b - 1);
}

int multiply(int a, int b)
{
    int m = mul(a, abs(b));
    return (b < 0) ? -m : m;
}

int main()
{
    cout << multiply(3, 4) << " " << multiply(-3, -4) << " "
         << multiply(-3, 4) << " " << multiply(3, -4);

    return 0;
}
```

**Output:** 12 12 -12 -12

##

```java
class Main
{
    public static int mul(int a, int b)
    {
        // base cases
        if (a == 0 || b == 0) {
            return 0;
        }

        if (b == 1) {
            return a;
        }

        if (a == 1) {
            return b;
        }

        return a + mul(a, b - 1);
    }

    public static int multiply(int a, int b)
    {
        int m = mul(a, Math.abs(b));
        return (b < 0) ? -m : m;
    }

    public static void main(String[] args)
    {
        System.out.print(multiply(3, 4) + " " + multiply(-3, -4) + " "
                        + multiply(-3, 4) + " " + multiply(3, -4));
    }
}
```

##

```python3
def mul(a, b):

    # base cases
    if a == 0 or b == 0:
        return 0

    if b == 1:
        return a

    if a == 1:
        return b

    return a + mul(a, b - 1)

def multiply(a, b):
    m = mul(a, abs(b))
    return -m if (b < 0) else m

if __name__ == '__main__':

    print(multiply(3, 4))
    print(multiply(-3, -4))
    print(multiply(-3, 4))
    print(multiply(3, -4))
```

## 2\. Iterative solution using Bitwise operators

If loops are allowed, we can use the following relation:

multiply(a, b) = | multiply(a*2, b/2) if b is even | b + multiply(a*2, b/2) if b is odd

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

int multiply(int a, int b)
{
    // flag to store if the result is positive or negative
    bool isNegative = false;

    // if both numbers are negative, make both numbers
    // positive since the result will be positive anyway
    if (a < 0 && b < 0) {
        a = -a, b = -b;
    }

    // if only `a` is negative, make it positive
    // and mark the result as negative
    if (a < 0) {
        a = -a, isNegative = true;
    }

    // if only `b` is negative, make it positive
    // and mark the result as negative
    if (b < 0) {
        b = -b, isNegative = true;
    }

    // initialize result
    int result = 0;

    // run till `b` becomes 0
    while (b)
    {
        // if `b` is odd, add `b` to the result
        if (b & 1) {
            result += a;
        }

        // multiply `a` by 2
        a = a << 1;

        // divide `b` by 2
        b = b >> 1;
    }

    return (isNegative) ? -result : result;
}

int main()
{
    cout << multiply(3, 4) << " " << multiply(-3, -4) << " "
         << multiply(-3, 4) << " " << multiply(3, -4);

    return 0;
}
```

**Output:** 12 12 -12 -12

##

```java
class Main
{
    public static int multiply(int a, int b)
    {
        // flag to store if the result is positive or negative
        boolean isNegative = false;

        // if both numbers are negative, make both numbers
        // positive since the result will be positive anyway
        if (a < 0 && b < 0)
        {
            a = -a;
            b = -b;
        }

        // if only `a` is negative, make it positive
        // and mark the result as negative
        if (a < 0)
        {
            a = -a;
            isNegative = true;
        }

        // if only `b` is negative, make it positive
        // and mark the result as negative
        if (b < 0)
        {
            b = -b;
            isNegative = true;
        }

        // initialize result by 0
        int result = 0;

        // run till `b` becomes 0
        while (b != 0)
        {
            // if `b` is odd, add `b` to the result
            if ((b & 1) == 1) {
                result += a;
            }

            a = a << 1;            // multiply `a` by 2
            b = b >> 1;            // divide `b` by 2
        }

        return (isNegative) ? -result : result;
    }

    public static void main(String[] args)
    {
        System.out.print(multiply(3, 4) + " " + multiply(-3, -4) + " "
                        + multiply(-3, 4) + " " + multiply(3, -4));
    }
}
```

##

```python3
def multiply(a, b):

    # flag to store if the result is positive or negative
    isNegative = False

    # if both numbers are negative, make both numbers
    # positive since the result will be positive anyway
    if a < 0 and b < 0:
        a = -a
        b = -b

    # if only `a` is negative, make it positive
    # and mark the result as negative
    if a < 0:
        a = -a
        isNegative = True

    # if only `b` is negative, make it positive
    # and mark the result as negative
    if b < 0:
        b = -b
        isNegative = True

    # initialize result by 0
    result = 0

    # run till `b` becomes 0
    while b:
        # if `b` is odd, add `b` to the result
        if b & 1:
            result += a

        a = a << 1              # multiply `a` by 2
        b = b >> 1              # divide `b` by 2

    return -result if isNegative else result

if __name__ == '__main__':

    print(multiply(3, 4))       # 12
    print(multiply(-3, -4))     # 12
    print(multiply(-3, 4))      # -12
    print(multiply(3, -4))      # -12
```

The recursive version of the above solution is left as an exercise to the readers.
