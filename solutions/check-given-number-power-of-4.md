# Check if a number is a power of 4 or not

> Source: https://www.techiedelight.com/check-given-number-power-of-4/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number, check if it is a power of four or not.

> 

## Approach 1

A simple solution is to calculate `log4n` for a given number `n`. If it returns an integral value, then we can say that the number is a power of four.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Returns true if `n` is a power of four
bool checkPowerOf4(unsigned n)
{
    // find `log4(n)`
    double i = log(n) / log(4);

    // return true if `log4(n)` is an integer
    return i == trunc(i);
}

int main()
{
    unsigned n = 256;

    if (checkPowerOf4(n)) {
        cout << n << " is a power of 4";
    }
    else {
        cout << n << " is not a power of 4";
    }

    return 0;
}
```

**Output:** 256 is a power of 4

##

```java
class Main
{
    // Returns true if `n` is a power of four
    public static boolean checkPowerOf4(int n)
    {
        // find `log4(n)`
        double i = Math.log(n) / Math.log(4);

        // return true if `log4(n)` is an integer
        return i == Math.floor(i);
    }

    public static void main(String[] args)
    {
        int n = 256;

        if (checkPowerOf4(n)) {
            System.out.println(n + " is a power of 4");
        }
        else {
            System.out.println(n + " is not a power of 4");
        }
    }
}
```

##

```python3
from math import log, floor

# Returns true if `n` is a power of four
def checkPowerOf4(n):

    # find `log4(n)`
    i = log(n) / log(4)

    # return true if `log4(n)` is an integer
    return i == floor(i)

if __name__ == '__main__':

    n = 256

    if checkPowerOf4(n):
        print(n, 'is a power of 4')
    else:
        print(n, 'is not a power of 4')
```

## Approach 2

The given number `n` is a power of 4 if it is a power of 2 and its only set bit is present at even position `(0, 2, 4, …)`.

### How to check for power of 2?

The expression `n & (n-1)` will unset the rightmost set bit of a number. If the number is a power of 2, it has only a 1–bit set, and `n & (n-1)` will unset the only set bit. So, we can say that `n & (n-1)` returns 0 if `n` is a power of 2; otherwise, it’s not a power of 2.

We can also the expression `(n & -n) == n` to check if a positive integer is a power of 2 or not. For more details, refer to [this post](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/).

### How to check position of the set bit?

To check the position of its set bit, we can use `0xAAAAAAAA` as a mask. The mask `0xAAAAAAAA` has 1 in all its odd position. So if the expression ` !(n & 0xAAAAAAAA) ` is true, the position of the set bit in `n` is even.

(0xAAAAAAAA)16 = (10101010101010101010101010101010)2

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

// Returns true if `n` is a power of four
bool checkPowerOf4(unsigned n)
{
    // return true if `n` is a power of 2, and its only
    // set bit is present at even position
    return n && !(n & (n - 1)) && !(n & 0xAAAAAAAA);
}

int main()
{
    unsigned n = 256;

    if (checkPowerOf4(n)) {
        cout << n << " is a power of 4";
    }
    else {
        cout << n << " is not a power of 4";
    }

    return 0;
}
```

**Output:** 256 is a power of 4

##

```java
class Main
{
    // Returns true if `n` is a power of four
    public static boolean checkPowerOf4(int n)
    {
        // return true if `n` is a power of 2, and its only
        // set bit is present at even position
        return n != 0 && (n & (n - 1)) == 0 && (n & 0xAAAAAAAA) == 0;
    }

    public static void main(String[] args)
    {
        int n = 256;

        if (checkPowerOf4(n)) {
            System.out.println(n + " is a power of 4");
        }
        else {
            System.out.println(n + " is not a power of 4");
        }
    }
}
```

##

```python3
# Returns true if `n` is a power of four
def checkPowerOf4(n):

    # return true if `n` is a power of 2, and its only
    # set bit is present at even position
    return n and not (n & (n - 1)) and not (n & 0xAAAAAAAA)

if __name__ == '__main__':

    n = 256

    if checkPowerOf4(n):
        print(n, 'is a power of 4')
    else:
        print(n, 'is not a power of 4')
```

## Approach 3

The given number `n` is a power of 4 if it is a power of 2 and its remainder is 1 when it is divided by 3. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Returns true if `n` is a power of four
bool checkPowerOf4(unsigned n)
{
    // return true if `n` is a power of 2, and
    // the remainder is 1 when divided by 3
    return !(n & (n - 1))&& (n % 3 == 1);
}

int main()
{
    unsigned n = 256;

    if (checkPowerOf4(n)) {
        cout << n << " is a power of 4";
    }
    else {
        cout << n << " is not a power of 4";
    }

    return 0;
}
```

**Output:** 256 is a power of 4
