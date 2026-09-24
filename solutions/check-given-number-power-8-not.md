# Check if a number is a power of 8 or not

> Source: https://www.techiedelight.com/check-given-number-power-8-not/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number, check if it is a power of 8 or not.

> 

## Approach 1

A simple solution is to calculate `log8n` for a given number `n`. If it returns an integral value, then we can say that the number is a power of 8.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Returns true if `n` is a power of 8
bool checkPowerOf8(unsigned n)
{
    // find `log8(n)`
    double i = log(n) / log(8);

    // return true if `log8(n)` is an integer
    return i - trunc(i) < 0.000001;
}

int main()
{
    unsigned n = 512 * 64;

    if (checkPowerOf8(n)) {
        cout << n << " is a power of 8";
    }
    else {
        cout << n << " is not a power of 8";
    }

    return 0;
}
```

**Output:** 32768 is a power of 8

##

```java
class Main
{
    // Returns true if `n` is a power of 8
    public static boolean checkPowerOf8(int n)
    {
        // find `log8(n)`
        double i = Math.log(n) / Math.log(8);

        // return true if `log8(n)` is an integer
        return i - Math.floor(i) < 0.000001;
    }

    public static void main(String[] args)
    {
        int n = 512*64;

        if (checkPowerOf8(n)) {
            System.out.println(n + " is a power of 8");
        }
        else {
            System.out.println(n + " is not a power of 8");
        }
    }
}
```

##

```python3
from math import floor, log

# Returns true if `n` is a power of 8
def checkPowerOf8(n):

    # find `log8(n)`
    i = log(n) / log(8)

    # return true if `log8(n)` is an integer
    return i - floor(i) < 0.000001

if __name__ == '__main__':

    n = 512*64

    if checkPowerOf8(n):
        print(n, 'is a power of 8')
    else:
        print(n, 'is not a power of 8')
```

## Approach 2

The given number `n` is the power of 8 if it is the power of 2, and its only set bit is present at `(0, 3, 6, … , 30)` position.

### How to check for power of 2?

The expression `n & (n-1)` will unset the rightmost set bit of a number. If the number is the power of 2, it has only a 1–bit set, and `n & (n-1)` will unset the only set bit. So, we can say that `n & (n-1)` returns 0 if `n` is the power of 2; otherwise, it’s not a power of 2.

We can also the expression `(n & -n) == n` to check if a positive integer is a power of 2 or not. For more details, refer to [this post](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/).

### How to check the position of the set bit?

To check the position of its set bit, we can use `0xB6DB6DB6` as a mask. The mask `0xB6DB6DB6` has 0 in all `(0, 3, 6, … ,30)` position. So if the expression ` !(n & 0xB6DB6DB6)` is true, the position of the set bit in `n` is even.

(0xB6DB6DB6)16 = (10110110110110110110110110110110)2

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// Returns true if `n` is a power of 8
bool checkPowerOf8(unsigned n)
{
    // return true if `n` is a power of 2, and its only
    // set bit is present at (0, 3, 6, … ) position
    return n && !(n & (n - 1)) && !(n & 0xB6DB6DB6);
}

int main()
{
    unsigned n = 512;

    if (checkPowerOf8(n)) {
        cout << n << " is a power of 8";
    }
    else {
        cout << n << " is not a power of 8";
    }

    return 0;
}
```

**Output:** 512 is a power of 8

##

```java
class Main
{
    // Returns true if `n` is a power of 8
    public static boolean checkPowerOf8(int n)
    {
        // return true if `n` is a power of 2, and its only
        // set bit is present at (0, 3, 6, … ) position
        return n != 0 && (n & (n - 1)) == 0 && (n & 0xB6DB6DB6) == 0;
    }

    public static void main(String[] args)
    {
        int n = 512;

        if (checkPowerOf8(n)) {
            System.out.println(n + " is a power of 8");
        }
        else {
            System.out.println(n + " is not a power of 8");
        }
    }
}
```

##

```python3
# Returns true if `n` is a power of 8
def checkPowerOf8(n):

    # return true if `n` is a power of 2, and its only
    # set bit is present at (0, 3, 6, … ) position
    return n and not (n & (n - 1)) and not (n & 0xB6DB6DB6)

if __name__ == '__main__':

    n = 512

    if checkPowerOf8(n):
        print(n, 'is a power of 8')
    else:
        print(n, 'is not a power of 8')
```

**Exercise:** Check if the number is a power of 4 or 16 or not. (Hint – Check the bit pattern)

Use mask `0xAAAAAAAA` to check for [power of 4](https://techiedelight.com/compiler/?run=mWZQZc") Use mask `0xEEEEEEEE` to check for [power of 16](https://techiedelight.com/compiler/?run=kpDlqi")
