# Swap adjacent bits of a number

> Source: https://www.techiedelight.com/swap-adjacent-bits-number/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, swap adjacent bits of it. In other words, swap bits present at even positions with those present in odd positions.

For example,

**Input:** 761622921 (00101101011001010111000110001001) **Output:** 513454662 (00011110100110101011001001000110) **Explanation:** (Every pair of adjacent bits swapped) 00 10 11 01 01 10 01 01 01 11 00 01 10 00 10 01 00 01 11 10 10 01 10 10 10 11 00 10 01 00 01 10

> 

The idea is to separate bits present at even positions with bits present at odd positions using mask `0xAAAAAAAA` and `0x55555555`, respectively.

  * Mask `0xAAAAAAAA` has all its even bits set, and its bitwise `AND` with `n` will separate bits present at even positions in `n`.
  * Similarly, mask `0x55555555` has all its odd bits set, and its bitwise `AND` with `n` will separate bits present at odd positions in `n`.

(0xAAAAAAAA)16 = (1010 1010 1010 1010 1010 1010 1010 1010)2 (0x55555555)16 = (0101 0101 0101 0101 0101 0101 0101 0101)2

After separating even and odd bits, right shift the even bits by 1 position and left shift the odd bits by 1 position. Now that all even bits are at odd positions and all odd bits are at even positions merge them by taking their `OR`. For example,

**1\. SEPARATE:** 00101101011001010111000110001001 & (n) 10101010101010101010101010101010 (0xAAAAAAAA) ———————————————————————————————— 00101000001000000010000010001000 (Contains all even bits) 00101101011001010111000110001001 & (n) 01010101010101010101010101010101 (0x55555555) ———————————————————————————————— 00000101010001010101000100000001 (Contains all odd bits) **2\. SHIFT & MERGE:** 00010100000100000001000001000100 | (Right shift even bits by 1) 00001010100010101010001000000010 (Left shift odd bits by 1) ———————————————————————————————— 00011110100110101011001001000110 (Adjacent bits swapped)

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to swap adjacent bits of a given number
inline int swapAdjacentBits(int n) {
    return (((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1));
}

int main()
{
    int n = 761622921;

    cout << n << " in binary is " << bitset<32>(n) << endl;
    n = swapAdjacentBits(n);
    cout << "\nAfter Swapping… " << endl;
    cout << n << " in binary is " << bitset<32>(n) << endl;

    return 0;
}
```

**Output:** 761622921 in binary is 00101101011001010111000110001001 After Swapping… 513454662 in binary is 00011110100110101011001001000110

##

```java
class Main
{
    public static String toBinaryString(int n)
    {
        return String.format("%32s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    // Function to swap adjacent bits of a given number
    public static int swapAdjacentBits(int n) {
        return (((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1));
    }

    public static void main(String[] args)
    {
        int n = 761622921;

        System.out.println(n + " in binary is " + toBinaryString(n));
        n = swapAdjacentBits(n);
        System.out.println("\nAfter Swapping…");
        System.out.println(n + " in binary is " + toBinaryString(n));
    }
}
```

##

```python3
# Function to swap adjacent bits of a given number
def swapAdjacentBits(n):
    return ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1)

if __name__ == '__main__':

    n = 761622921

    print(f'{n} in binary is {bin(n)}')
    n = swapAdjacentBits(n)
    print('\nAfter Swapping…')
    print(f'{n} in binary is {bin(n)}')
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 99

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
