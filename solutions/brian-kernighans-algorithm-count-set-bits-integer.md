# Brian Kernighan’s Algorithm to count set bits in an integer

> Source: https://www.techiedelight.com/brian-kernighans-algorithm-count-set-bits-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, count its set bits.

For example,

**Input:** n = -1 (11…1111) **Output:** The total number of set bits in -1 is 32 **Input:** n = 16 (00001000) **Output:** The total number of set bits in 16 is 1

> 

## 1\. Brute-Force Solution

A simple solution is to consider every bit (set or unset) in a number and maintain a counter to keep track of the set bits. This method is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Naive solution to count the total number of set bits in `n`
int countSetBits(int n)
{
    int count = 0;

    for (int i = 0; i < 32; i++)
    {
        count += (n & 1);    // check last bit
        n >>= 1;
    }

    return count;
}

int main()
{
    int n = 16;

    cout << n << " in binary is " << bitset<8>(n) << endl;
    cout << "The total number of set bits in " << n << " is "
         << countSetBits(n) << endl;

    return 0;
}
```

**Output:** 16 in binary is 00010000 The total number of set bits in 16 is 1

##

```java
class Main
{
    // Naive solution to count the total number of set bits in `n`
    public static int countSetBits(int n)
    {
        int count = 0;
        for (int i = 0; i < 32; i++)
        {
            count += (n & 1);    // check last bit
            n >>= 1;
        }

        return count;
    }

    public static void main(String[] args)
    {
        int n = 16;

        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
        System.out.println("The total number of set bits in " + n + " is " +
                    countSetBits(n));
    }
}
```

##

```python3
# Naive solution to count the total number of set bits in `n`
def countSetBits(n):
    count = 0
    for _ in range(32):
        count += (n & 1)    # check last bit
        n >>= 1
    return count

if __name__ == '__main__':

    n = 16
    print(f'The total number of set bits in {str(n)} ({bin(n)}) is {countSetBits(n)}')
```

The above brute-force approach requires one iteration per bit. So on a 32–bit integer, it goes through 32 iterations.

## 2\. Using Brian Kernighan’s algorithm

We can use Brian Kernighan’s algorithm to improve the above naive algorithm’s performance. The idea is to only consider the set bits of an integer by turning off its rightmost set bit (after counting it), so the next iteration of the loop considers the _next_ rightmost bit.

The expression `n & (n-1)` can be used to turn off the rightmost set bit of a number `n`. This works as the expression `n-1` flips all the bits after the rightmost set bit of `n`, including the rightmost set bit itself. Therefore, `n & (n-1)` results in the last bit flipped of `n`.

For example, consider number 52, which is `00110100` in binary, and has a total 3 bits set.

**1st iteration of the loop: n = 52** 00110100 & (n) 00110011 (n-1) ~~~~~~~~ 00110000 **2nd iteration of the loop: n = 48** 00110000 & (n) 00101111 (n-1) ~~~~~~~~ 00100000 **3rd iteration of the loop: n = 32** 00100000 & (n) 00011111 (n-1) ~~~~~~~~ 00000000 (n = 0)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to count the total number of set bits in `n`
int countSetBits(int n)
{
    // `count` stores the total bits set in `n`
    int count = 0;

    while (n)
    {
        n = n & (n - 1);    // clear the least significant bit set
        count++;
    }

    return count;
}

int main()
{
    int n = -1;

    cout << n << " in binary is " << bitset<32>(n) << endl;
    cout << "The total number of set bits in " << n << " is "
         << countSetBits(n) << endl;

    return 0;
}
```

**Output:** -1 in binary is 11111111111111111111111111111111 The total number of set bits in -1 is 32

##

```java
class Main
{
    // Function to count the total number of set bits in `n`
    public static int countSetBits(int n)
    {
        // `count` stores the total bits set in `n`
        int count = 0;

        while (n != 0)
        {
            n = n & (n - 1);    // clear the least significant bit set
            count++;
        }

        return count;
    }

    public static void main(String[] args)
    {
        int n = -1;

        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
        System.out.println("The total number of set bits in " + n + " is " +
            countSetBits(n));
    }
}
```

The Brian Kernighan’s algorithm goes through as many iterations as there are set bits. So if we have a 32–bit word with only the high bit set, it will only go through the loop once.

## 3\. Using GCC built-in function

GCC also provides a built-in function `int **__builtin_popcount** (unsigned int n)` that returns the total number of set bits in `n`. The following C++ program demonstrates it:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n = 16;
    cout << "The total number of set bits in " << n << " is "
         << __builtin_popcount (n) << endl;

    return 0;
}
```

**Output:** The total number of set bits in 16 is 1
