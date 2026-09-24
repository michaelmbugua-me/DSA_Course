# Round up to the next highest power of 2

> Source: https://www.techiedelight.com/round-next-highest-power-2/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number `n`, find the next highest power of 2. If `n` itself is a power of 2, return `n`.

For example,

**Input:** n = 20 **Output:** 32 **Input:** n = 16 **Output:** 16

> 

## Approach 1

The idea is to unset the rightmost bit of `n` until only one bit is left, which will be the last set bit of the given number. To handle the case when `n` is the power of 2, initially decrement `n` by 1. Note that this operation will not impact output as we are only concerned about the last set bit of `n`.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute power of two greater than or equal to `n`
unsigned findNextPowerOf2(unsigned n)
{
    // decrement `n` (to handle the case when `n` itself
    // is a power of 2)
    n = n - 1;

    // do till only one bit is left
    while (n & n - 1) {
        n = n & n - 1;        // unset rightmost bit
    }

    // `n` is now a power of two (less than `n`)

    // return next power of 2
    return n << 1;
}

int main()
{
    unsigned n = 127;

    cout << "The next power of 2 is " << findNextPowerOf2(n);

    return 0;
}
```

**Output:** The next power of 2 is 128

##

```java
class Main
{
    // Compute power of two greater than or equal to `n`
    public static int findNextPowerOf2(int n)
    {
        // decrement `n` (to handle cases when `n` itself
        // is a power of 2)
        n = n - 1;

        // do till only one bit is left
        while ((n & n - 1) != 0) {
            n = n & n - 1;        // unset rightmost bit
        }

        // `n` is now a power of two (less than `n`)

        // return next power of 2
        return n << 1;
    }

    public static void main(String[] args)
    {
        int n = 127;

        System.out.println("The next power of 2 is " + findNextPowerOf2(n));
    }
}
```

##

```python3
# Compute power of two greater than or equal to `n`
def findNextPowerOf2(n):

    # decrement `n` (to handle cases when `n` itself
    # is a power of 2)
    n = n - 1

    # do till only one bit is left
    while n & n - 1:
        n = n & n - 1       # unset rightmost bit

    # `n` is now a power of two (less than `n`)

    # return next power of 2
    return n << 1

if __name__ == '__main__':

    n = 127
    print('The next power of 2 is', findNextPowerOf2(n))
```

## Approach 2

The idea is to decrement `n` by 1 (to handle the case when `n` itself is the power of 2) and run a loop by initializing the _result_ by 2. We double the _result_ value at each iteration of the loop and divide `n` in half and continue the loop till `n` becomes 0.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute power of two greater than or equal to `n`
unsigned findNextPowerOf2(unsigned n)
{
    // decrement `n` (to handle the case when `n` itself
    // is a power of 2)
    n = n - 1;

    // initialize result by 2
    int k = 2;

    // double `k` and divide `n` in half till it becomes 0
    while (n >>= 1) {
        k = k << 1;    // double `k`
    }

    return k;
}

/*
unsigned findNextPowerOf2(unsigned n)
{
    int k = 1;
    while (k < n) {
        k = k << 1;
    }
    return k;
}
*/

int main()
{
    unsigned n = 127;

    cout << "The next power of 2 is " << findNextPowerOf2(n);

    return 0;
}
```

**Output:** The next power of 2 is 128

##

```java
class Main
{
    // Compute power of two greater than or equal to `n`
    public static int findNextPowerOf2(int n)
    {
        // decrement `n` (to handle cases when `n` itself
        // is a power of 2)
        n = n - 1;

        // initialize result by 2
        int k = 2;

        // double `k` and divide `n` in half till it becomes 0
        while ((n >>= 1) != 0) {
            k = k << 1;    // double `k`
        }

        return k;
    }

    /*public static int findNextPowerOf2(int n)
    {
        int k = 1;
        while (k < n) {
            k = k << 1;
        }
        return k;
    }*/

    public static void main(String[] args)
    {
        int n = 127;
        System.out.println("The next power of 2 is " + findNextPowerOf2(n));
    }
}
```

##

```python3
# Compute power of two greater than or equal to `n`
def findNextPowerOf2(n):

    k = 1
    while k < n:
        k = k << 1

    return k

if __name__ == '__main__':

    n = 127
    print('The next power of 2 is', findNextPowerOf2(n))
```

## Approach 3

The idea is to calculate position `p` of the last set bit of `n` and return a number with its `p+1` bit set. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute power of two greater than or equal to `n`
unsigned findNextPowerOf2(unsigned n)
{
    // decrement `n` (to handle the case when `n` itself
    // is a power of 2)
    n = n - 1;

    // calculate the position of the last set bit of `n`
    int lg = log2(n);

    // next power of two will have a bit set at position `lg+1`.
    return 1U << lg + 1;
}

int main()
{
    unsigned n = 20;

    cout << "The next power of 2 is " << findNextPowerOf2(n);

    return 0;
}
```

**Output:** The next power of 2 is 32
