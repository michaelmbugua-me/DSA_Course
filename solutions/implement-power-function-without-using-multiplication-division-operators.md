# Implement power function without using multiplication and division operators

> Source: https://www.techiedelight.com/implement-power-function-without-using-multiplication-division-operators/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two positive integers, implement the power function without using multiplication and division operators.

For example, for given two integers, `x` and `y`, `pow(x, y)` should return `x` raised to the power of `y`, i.e., `xy`.

> 

## Method 1: Using Recursion

We know that `pow(x, y)` can be recursively written as:

pow(x, y) = pow(x, y – 1) * x pow(x, 0) = 1

For example, if `x = 7`, we can get `7y` by adding `7y-1` exactly `7` times to the result. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

int pow(int a, int b)
{
    if (b == 0) {
        return 1;
    }

    int result = 0;
    int power = pow(a, b - 1);

    for (int i = 0; i < a; i++) {
        result += power;
    }

    return result;
}

int main()
{
    cout << pow(7, 3);
    return 0;
}
```

**Output:** 343

##

```java
class Main
{
    public static int pow(int a, int b)
    {
        if (b == 0) {
            return 1;
        }

        int result = 0;
        int power = pow(a, b - 1);

        for (int i = 0; i < a; i++) {
            result += power;
        }

        return result;
    }

    public static void main(String[] args) {
        System.out.print(pow(7, 3));
    }
}
```

##

```python3
def pow(a, b):

    if b == 0:
        return 1

    power = pow(a, b - 1)

    result = 0
    for i in range(a):
        result += power

    return result

if __name__ == '__main__':

    print(pow(7, 3))
```

## Method 2

The idea is if `x = ab`, then `log(x) = b.log(a)`. Since, `x` can be expressed as `x = elog(x)`, by substituting the value of `log(x)` in the equation, we get `**x = e b.log(a)**`.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int pow(int a, int b)
{
    float logx = 0;
    for (int i = 0; i < b; i++) {
        logx += log(a);
    }

    return exp(logx);
}

int main()
{
    cout << pow(2, 10);
    return 0;
}
```

**Output:** 1024

##

```java
class Main
{
    public static int pow(int a, int b)
    {
        float logx = 0;
        for (int i = 0; i < b; i++) {
            logx += Math.log(a);
        }
        return (int)Math.exp(logx);
    }

    public static void main(String[] args) {
        System.out.print(pow(2, 10));
    }
}
```

##

```python3
from math import log, exp

def pow(a, b):

    logx = 0
    for i in range(b):
        logx += log(a)

    return int(exp(logx))

if __name__ == '__main__':

    print(pow(2, 10))
```
