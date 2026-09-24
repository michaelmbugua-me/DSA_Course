# Round up to the previous power of 2

> Source: https://www.techiedelight.com/round-previous-power-2/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number `n`, find the previous power of 2. If `n` itself is a power of 2, return `n`.

For example,

**Input:** n = 20 **Output:** 16 **Input:** n = 16 **Output:** 16

> 

## Approach 1

The idea is to unset the rightmost bit of `n` until only one bit is left, which will be the last set bit of the given number and a previous power of 2. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute a power of two less than or equal to `n`
unsigned findPreviousPowerOf2(unsigned n)
{
    // do till only one bit is left
    while (n & n - 1) {
        n = n & n - 1;        // unset rightmost bit
    }

    // `n` is now a power of two (less than or equal to `n`)
    return n;
}

int main()
{
    unsigned n = 127;

    cout << "The previous power of 2 is " << findPreviousPowerOf2(n);

    return 0;
}
```

**Output:** The previous power of 2 is 64

##

```java
class Main
{
    // Compute a power of two less than or equal to `n`
    public static int findPreviousPowerOf2(int n)
    {
        // do till only one bit is left
        while ((n & n - 1) != 0) {
            n = n & n - 1;        // unset rightmost bit
        }

        // `n` is now a power of two (less than or equal to `n`)
        return n;
    }

    public static void main(String[] args)
    {
        int n = 128;

        System.out.println("The previous power of 2 is " + findPreviousPowerOf2(n));
    }
}
```

##

```python3
# Compute a power of two less than or equal to `n`
def findPreviousPowerOf2(n):

    # do till only one bit is left
    while (n & n - 1):
        n = n & n - 1       # unset rightmost bit

    # `n` is now a power of two (less than or equal to `n`)
    return n

if __name__ == '__main__':

    n = 128
    print('The previous power of 2 is', findPreviousPowerOf2(n))
```

## Approach 2

The idea is to run a loop by initializing the _result_ by 1. We double the _result_ value at each iteration of the loop and divide `n` in half and continue the loop till `n` becomes 0.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute a power of two less than or equal to `n`
unsigned findPreviousPowerOf2(unsigned n)
{
    // initialize result by 1
    int k = 1;

    // double `k` and divide `n` in half till it becomes 0
    while (n >>= 1) {
        k = k << 1;    // double `k`
    }

    return k;
}

int main()
{
    unsigned n = 127;

    cout << "The previous power of 2 is " << findPreviousPowerOf2(n);

    return 0;
}
```

**Output:** The previous power of 2 is 64

##

```java
class Main
{
    // Compute a power of two less than or equal to `n`
    public static int findPreviousPowerOf2(int n)
    {
        // initialize result by 1
        int k = 1;

        // double `k` and divide `n` in half till it becomes 0
        while ((n >>= 1) != 0) {
            k = k << 1;    // double `k`
        }

        return k;
    }

    public static void main(String[] args)
    {
        int n = 127;

        System.out.println("The previous power of 2 is " + findPreviousPowerOf2(n));
    }
}
```

##

```python3
# Compute a power of two less than or equal to `n`
def findPreviousPowerOf2(n):

    # initialize result by 1
    k = 1

    # `k` and divide `n` in half till it becomes 0
    while n:
        k = k << 1          # k
        n >>= 1

    return k >> 1

if __name__ == '__main__':

    n = 127
    print('The previous power of 2 is', findPreviousPowerOf2(n))
```

## Approach 3

The idea is to calculate the position `p` of the last set bit of `n` and return a number with its `p'th` bit set. In other words, drop all set bits from `n` except its last set bit.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Compute a power of two less than or equal to `n`
unsigned findPreviousPowerOf2(unsigned n)
{
    // drop all set bits from `n` except its last set bit
    return 1U << (int)log2(n);
}

int main()
{
    unsigned n = 20;

    cout << "The previous power of 2 is " << findPreviousPowerOf2(n);

    return 0;
}
```

**Output:** The previous power of 2 is 16
