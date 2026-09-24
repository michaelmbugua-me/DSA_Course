# Bit Hacks – Part 1 (Basic)

> Source: https://www.techiedelight.com/bit-hacks-part-1-basic/

[Binary](https://www.techiedelight.com/Category/Binary/)

With this post, we will start a series of amazing bit manipulation hacks that every programmer should know. In this post, we will see how to

  * Check if an integer is even or odd.
  * Detect if two integers have opposite signs or not.
  * Add 1 to an integer.
  * Swap two numbers without using any third variable.

## Problem 1. Check if an integer is even or odd

This is probably one of the simplest and most commonly used bit hacks. The expression `n & 1` returns value 1 or 0 depending upon whether `n` is odd or even.

00010100 & (n = 20) 00000001 (1) ~~~~~~~~ 00000000 00010101 & (n = 21) 00000001 (1) ~~~~~~~~ 00000001

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n = 5;

    if (n & 1) {
        cout << n << " is odd";
    }
    else {
        cout << n << " is even";
    }

    return 0;
}
```

**Output:** 5 is odd

##

```java
class Main
{
    public static void main(String[] args)
    {
        int n = 5;

        if ((n & 1) != 0) {
            System.out.println(n + " is odd");
        }
        else {
            System.out.println(n + " is even");
        }
    }
}
```

##

```python3
if __name__ == '__main__':

    n = 5

    if (n & 1) != 0:
        print(f'{n} is odd')
    else:
        print(f'{n} is even')
```

## Problem 2. Detect if two integers have opposite signs or not

The expression output `x ^ y` is negative if `x` and `y` have opposite signs. We know that for a positive number, the leftmost bit is 0, and for a negative number, it is 1. Now for similar sign integers, the XOR operator will set the leftmost bit of output as 0, and for opposite sign integers, it will set the leftmost bit as 1.

00…000100 ^ (x = 4) 00…001000 (y = 8) ~~~~~~~~~ 00…001100 positive number 00…000100 ^ (x = 4) 11…111000 (y = -8) ~~~~~~~~~ 11…111100 negative number

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

int main()
{
    int x = 4;
    int y = -8;

    cout << x << " in binary is " << bitset<32>(x) << endl;
    cout << y << " in binary is " << bitset<32>(y) << endl;

    // true if `x` and `y` have opposite signs
    bool isOpposite = ((x ^ y) < 0);

    if (isOpposite) {
        cout << x << " and " << y << " have opposite signs";
    }
    else {
        cout << x << " and " << y << " don't have opposite signs";
    }

    return 0;
}
```

**Output:** 4 in binary is 00000000000000000000000000000100 -8 in binary is 11111111111111111111111111111000 4 and -8 have opposite signs

##

```java
class Main
{
    public static String toBinaryString(int n)
    {
        return String.format("%32s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    public static void main(String[] args)
    {
        int x = 4;
        int y = -8;

        System.out.println(x + " in binary is " + toBinaryString(x));
        System.out.println(y + " in binary is " + toBinaryString(y));

        // true if `x` and `y` have opposite signs
        boolean isOpposite = ((x ^ y) < 0);

        if (isOpposite) {
            System.out.println(x + " and " + y + " have opposite signs");
        }
        else {
            System.out.println(x + " and " + y + " don't have opposite signs");
        }
    }
}
```

##

```python3
if __name__ == '__main__':

    x = 4
    y = -8

    print(f'{x} in binary is {bin(x)}')
    print(f'{y} in binary is {bin(y)}')

    # true if `x` and `y` have opposite signs
    isOpposite = ((x ^ y) < 0)

    if isOpposite:
        print(f'{x} and {y} have opposite signs')
    else:
        print(f'{x} and {y} don\'t have opposite signs')
```

## Problem 3. Add 1 to an integer

The expression `-~x` will add 1 to an integer `x`. We know that to get negative of a number, invert its bits and add 1 to it (Remember negative numbers are stored in 2’s complement form), i.e.,

-x = ~x + 1; -~x = x + 1 (by replacing x by ~x)

The implementation can be seen below in C++ and Java:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int x = 4;
    cout << x << " + " << 1 << " is " << -~x << endl;

    x = -5;
    cout << x << " + " << 1 << " is " << -~x << endl;

    x = 0;
    cout << x << " + " << 1 << " is " << -~x << endl;

    return 0;
}
```

**Output:** 4 + 1 is 5 -5 + 1 is -4 0 + 1 is 1
