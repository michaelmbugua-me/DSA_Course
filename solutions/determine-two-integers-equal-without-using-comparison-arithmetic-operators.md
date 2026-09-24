# Determine if two integers are equal without using comparison and arithmetic operators

> Source: https://www.techiedelight.com/determine-two-integers-equal-without-using-comparison-arithmetic-operators/

This post will discuss how to determine whether two integers are equal without using comparison operators `(==, !=, <, >, <=, >=)` and arithmetic operators `(+, -, *, /, %)`.

## 1\. Using Bitwise XOR Operator

The simplest solution is to use the bitwise XOR operator. We know that for equal numbers, the XOR operator returns 0. We can make use of this fact, demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Determine if two integers are equal without using comparison
// and arithmetic operators
int checkForEquality(int x, int y) {
    return !(x ^ y);
}

int main(void)
{
    int x = 10, y = 10;

    if (checkForEquality(x, y)) {
        printf ("x=%d is equal to y=%d\n", x, y);
    }
    else {
        printf ("x=%d is not equal to y=%d\n", x, y);
    }

    return 0;
}
```

**Output:** x=10 is equal to y=10

##

```java
class Main
{
    // Determine if two integers are equal without using comparison operators
    // and arithmetic operators
    public static boolean checkForEquality(int x, int y) {
        return (x ^ y) == 0;
    }

    public static void main(String[] args)

    {

        int x = 10, y = 10;

        if (checkForEquality(x, y)) {
            System.out.printf("x=%d is equal to y=%d\n", x, y);
        }
        else {
            System.out.printf("x=%d is not equal to y=%d\n", x, y);
        }
    }
}
```

##

```python3
# Determine if two integers are equal without using comparison operators
# and arithmetic operators
def checkForEquality(x, y):
    return (x ^ y) == 0

if __name__ == '__main__':

    x = 10
    y = 10

    if checkForEquality(x, y):
        print(f'x={x} is equal to y={y}')
    else:
        print(f'x={x} is not equal to y={y}')
```

## 2\. Using Array Index + Ternary Operator

We can also take advantage of the fact that a garbage value is assigned to a local array in C by default. The idea is to use the first number as the array index and set the value to 0. Then, check if the array is set for the second number or not.

Following is the C, Java, and Python implementation of the idea. Please note that this solution won’t work on negative numbers, consumes a lot of memory, and might access the array’s invalid indices.

```c
#include <stdio.h>

// Determine if two integers are equal without using comparison
// and arithmetic operators
int checkForEquality(int x, int y)
{
    short arr[x+1];
    arr[x] = 0;

    return (!arr[y]) ? 1 : 0;
}

int main(void)
{
    int x = 10, y = 10;

    if (checkForEquality(x, y)) {
        printf ("x=%d is equal to y=%d\n", x, y);
    }
    else {
        printf ("x=%d is not equal to y=%d\n", x, y);
    }

    return 0;
}
```

**Output:** x=10 is equal to y=10

##

```java
class Main
{
    // Determine if two integers are equal without using comparison operators
    // and arithmetic operators
    public static boolean checkForEquality(int x, int y)
    {
        short[] arr = new short[x+1];
        arr[x] = 0;

        return (arr[y] == 0);
    }

    public static void main(String[] args)
    {
        int x = 10, y = 10;

        if (checkForEquality(x, y)) {
            System.out.printf("x=%d is equal to y=%d\n", x, y);
        }
        else {
            System.out.printf("x=%d is not equal to y=%d\n", x, y);
        }
    }
}
```

## 3\. Using Hashing

Since the previous approach consumes a lot of memory, a more space-efficient version uses a [hash map](https://techiedelight.com/hashing-in-data-structure/). The hash-based implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Determine if two integers are equal without using comparison
// and arithmetic operators
bool checkForEquality(int x, int y)
{
    unordered_map<int, bool> map;
    map[x] = 1;

    return map[y];
}

int main(void)
{
    int x = 0, y = 2;

    if (checkForEquality(x, y)) {
        cout << "x is equal to y";
    }
    else {
        cout << "x is not equal to y";
    }

    return 0;
}
```

**Output:** x is not equal to y
