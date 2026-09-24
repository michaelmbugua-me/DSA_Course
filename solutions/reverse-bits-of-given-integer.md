# Reverse bits of an integer

> Source: https://www.techiedelight.com/reverse-bits-of-given-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, reverse its bits using binary operators.

For example, `-100` in binary is `11111111111111111111111110011100`. On reversing its bits, we get number `973078527` which is `00111001111111111111111111111111` in binary.

> 

The idea is to initialize the result by 0 (all bits 0) and process the given number starting from its least significant bit. If the current bit is 1, set the corresponding most significant bit in the result and finally move on to the next bit in the input number. Repeat this till all its bits are processed.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// A macro that defines the size of an integer
#define INT_SIZE sizeof(int) * 8

// Function to reverse bits of a given integer
int reverseBits(int n)
{
    int pos = INT_SIZE - 1;     // maintains shift

    // store reversed bits of `n`. Initially, all bits are set to 0
    int reverse = 0;

    // do till all bits are processed
    while (pos >= 0 && n)
    {
        // if the current bit is 1, then set the corresponding bit in the result
        if (n & 1) {
            reverse = reverse | (1 << pos);
        }

        n >>= 1;                // drop current bit (divide by 2)
        pos--;                  // decrement shift by 1
    }

    return reverse;
}

int main()
{
    int n = -100;

    cout << n << " in binary is " << bitset<32>(n) << endl;
    cout << "On reversing bits " << bitset<32>(reverseBits(n));

    return 0;
}
```

**Output:** -100 in binary is 11111111111111111111111110011100 On reversing bits 00111001111111111111111111111111

##

```java
class Main
{
    // Function to reverse bits of a given integer
    public static int reverseBits(int n)
    {
        int pos = Integer.SIZE - 1;     // maintains shift

        // store reversed bits of `n`. Initially, all bits are set to 0
        int reverse = 0;

        // do till all bits are processed
        while (pos >= 0 && n != 0)
        {
            // if the current bit is 1, then set the corresponding bit in the result
            if ((n & 1) != 0) {
                reverse = reverse | (1 << pos);
            }

            n >>= 1;                    // drop current bit (divide by 2)
            pos--;                      // decrement shift by 1
        }

        return reverse;
    }

    public static String toBinaryString(int n)
    {
        return String.format("%32s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    public static void main(String[] args)
    {
        int n = -100;

        System.out.println(n + " in binary is " + toBinaryString(n));
        System.out.println("On reversing bits " + toBinaryString(reverseBits(n)));
    }
}
```

##

```python3
# Function to reverse bits of a given integer
def reverseBits(n):

    pos = SIZE - 1      # maintains shift

    # store reversed bits of `n`. Initially, all bits are set to 0
    reverse = 0

    # do till all bits are processed
    while pos >= 0 and n:

        # if the current bit is 1, then set the corresponding bit in the result
        if n & 1:
            reverse = reverse | (1 << pos)

        n >>= 1         # drop current bit (divide by 2)
        pos = pos - 1   # decrement shift by 1

    return reverse

if __name__ == '__main__':

    n = -100
    SIZE = 32            # Assume 32-bit integer

    print(f'{n} in binary is {bin(n)}')
    print('On reversing bits', bin(reverseBits(n)))
```

The above solution will process all bits in an integer till its last set bit. The code can be optimized to consider only set bits in an integer (which will be relatively less). The idea is to find the position of the rightmost set bit in the number and set the corresponding bit in the result, and finally, unset the rightmost set bit. Repeat this till all set bits are processed.

Please refer to [this post](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/) to find the position of the rightmost set bit and unset it. The algorithm can be implemented as follows in C++ and Java:

```cpp
#include <iostream>
#include <bitset>
#include <cmath>
using namespace std;

// A macro that defines the size of an integer
#define INT_SIZE sizeof(int) * 8

// Function to reverse bits of a given integer
int reverseBits(int n)
{
    // store reversed bits of `n`. Initially, all bits are set to 0
    int reverse = 0;

    // do till all set bits are processed
    while (n)
    {
        // find the position of the rightmost set bit
        int pos = log2(n & -n) + 1;

        // set the corresponding bit in the result (set the leftmost bit at `pos`)
        reverse = reverse | (1 << (INT_SIZE - pos));

        // unset the rightmost set bit of a number
        n = n & (n - 1);
    }

    return reverse;
}

int main()
{
    int n = -100;

    cout << n << " in binary is " << bitset<32>(n) << endl;
    cout << "On reversing bits " << bitset<32>(reverseBits(n));

    return 0;
}
```

**Output:** -100 in binary is 11111111111111111111111110011100 On reversing bits 00111001111111111111111111111111

##

```java
class Main
{
    public static String toBinaryString(int n)
    {
        return String.format("%32s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    public static double log(int x, int base) {
        return (Math.log(x) / Math.log(base));
    }

    // Function to reverse bits of a given integer
    public static int reverseBits(int n)
    {
        // store reversed bits of `n`. Initially, all bits are set to 0
        int reverse = 0;

        // do till all set bits are processed
        while (n != 0)
        {
            // find the position of the rightmost set bit
            double pos = log(n & -n, 2) + 1;

            // set the corresponding bit in the result
            // (set the leftmost bit at `pos`)
            reverse = reverse | (1 << (Integer.SIZE - (int)pos));

            // unset the rightmost set bit of a number
            n = n & (n - 1);
        }

        return reverse;
    }

    public static void main(String[] args)
    {
        int n = -100;

        System.out.println(n + " in binary is " + toBinaryString(n));
        System.out.println("On reversing bits " + toBinaryString(reverseBits(n)));
    }
}
```

**Read More:**

> [Reverse bits of an integer using a lookup table](https://techiedelight.com/reverse-bits-integer-using-lookup-table/)
