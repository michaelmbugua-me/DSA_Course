# Bit Hacks – Part 2 (Playing with k’th bit)

> Source: https://www.techiedelight.com/bit-hacks-part-2-playing-kth-bit/

[Binary](https://www.techiedelight.com/Category/Binary/)

This post will discuss a few related problems that operate on the k’th bit of a number.

The following problems are covered in this post:

  * Turn off k’th bit in a number.
  * Turn on k’th bit in a number.
  * Check if k’th bit is set for a number.
  * Toggle the k’th bit.

## Problem 1. Turn off k’th bit in a number

> 

The idea is to use bitwise `<<`, `&`, and `~` operators. Using the expression `~ (1 << (k - 1))`, we get a number with all its bits set, except the `k'th` bit. If we do a bitwise AND of this expression with `n`, i.e., `n & ~(1 << (k - 1))`, we get a number which has all bits the same as `n` except the `k'th` bit which will be set to 0.

For example, consider `n = 20` and `k = 3`.

00010100 & (n = 20) 11111011 ~ (1 << (3-1)) ~~~~~~~~ 00010000

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to turn off k'th bit in `n`
int turnOffKthBit(int n, int k) {
    return n & ~(1 << (k - 1));
}

int main()
{
    int n = 20;
    int k = 3;

    cout << n << " in binary is " << bitset<8>(n) << endl;
    cout << "Turning k'th bit off\n";
    n = turnOffKthBit(n, k);
    cout << n << " in binary is " << bitset<8>(n) << endl;

    return 0;
}
```

**Output:** 20 in binary is 00010100 Turning k’th bit off 16 in binary is 00010000

##

```java
class Main
{
    // Function to turn off k'th bit in `n`
    public static int turnOffKthBit(int n, int k) {
        return n & ~(1 << (k - 1));
    }

    public static void main(String[] args)
    {
        int n = 20;
        int k = 3;

        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
        System.out.println("Turning k'th bit off…");
        n = turnOffKthBit(n, k);
        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
    }
}
```

##

```python3
# Function to turn off k'th bit in `n`
def turnOffKthBit(n, k):
    return n & ~(1 << (k - 1))

if __name__ == '__main__':

    n = 20
    k = 3

    print(f'{n} in binary is {bin(n)}')
    print('Turning k\'th bit off…')
    n = turnOffKthBit(n, k)
    print(f'{n} in binary is {bin(n)}')
```

## Problem 2. Turn on k’th bit in a number

> 

The idea is to use bitwise `<<` and `|` operators. Using the expression `1 << (k - 1)`, we get a number with all bits 0, except the `k'th` bit. If we do bitwise `OR` of this expression with `n`, i.e., `n | (1 << (k - 1))`, we get a number which has all bits the same as `n` except the `k'th` bit which will be set to 1.

For example, consider `n = 20` and `k = 4`.

00010100 | (n = 20) 00001000 (1 << (4 – 1)) ~~~~~~~~ 00011100

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to turn on k'th bit in `n`
int turnOnKthBit(int n, int k) {
    return n | (1 << (k - 1));
}

int main()
{
    int n = 20;
    int k = 4;

    cout << n << " in binary is " << bitset<8>(n) << endl;
    cout << "Turning k'th bit on\n";
    n = turnOnKthBit(n, k);
    cout << n << " in binary is " << bitset<8>(n) << endl;

    return 0;
}
```

**Output:** 20 in binary is 00010100 Turning k’th bit on 28 in binary is 00011100

##

```java
class Main
{
    // Function to turn on k'th bit in `n`
    public static int turnOnKthBit(int n, int k) {
        return n | (1 << (k - 1));
    }

    public static void main(String[] args)
    {
        int n = 20;
        int k = 4;

        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
        System.out.println("Turning k'th bit on…");
        n = turnOnKthBit(n, k);
        System.out.println(n + " in binary is " + Integer.toBinaryString(n));
    }
}
```

##

```python3
# Function to turn on k'th bit in `n`
def turnOnKthBit(n, k):
    return n | (1 << (k - 1))

if __name__ == '__main__':

    n = 20
    k = 4

    print(f'{n} in binary is {bin(n)}')
    print('Turning k\'th bit on…')
    n = turnOnKthBit(n, k)
    print(f'{n} in binary is {bin(n)}')
```

## Problem 3. Check if k’th bit is set for a number

> 

The idea is to use bitwise `<<` and `&` operators. Using the expression `1 << (k - 1)`, we get a number with all bits 0, except the `k'th` bit. If we do bitwise `AND` of this expression with `n`, i.e., `n & (1 << (k - 1))`, any non-zero value indicates that its `k'th` bit is set.

For example, consider `n = 20` and `k = 3`.

00010100 & (n = 20) 00000100 (1 << (3-1)) ~~~~~~~~ 00000100 non-zero value

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to check if k'th bit is set for `n` or not
bool isKthBitSet(int n, int k) {
    return (n & (1 << (k - 1))) != 0;
}

int main()
{
    int n = 20;
    int k = 3;

    cout << n << " in binary is " << bitset<8>(n) << endl;

    if (isKthBitSet(n, k)) {
        cout << "k'th bit is set";
    }
    else {
        cout << "k'th bit is not set";
    }

    return 0;
}
```

**Output:** 20 in binary is 00010100 k’th bit is set
