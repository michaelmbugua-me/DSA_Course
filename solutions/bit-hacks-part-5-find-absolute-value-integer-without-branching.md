# Bit Hacks – Part 5 (Find the absolute value of an integer without branching)

> Source: https://www.techiedelight.com/bit-hacks-part-5-find-absolute-value-integer-without-branching/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, compute its absolute value (abs) without branching.

## Using expression `(n+mask)^mask`

The idea is to use the expression `(n+mask)^mask` for computing the absolute value of `n`, where `mask` is `n >> 31` (assuming 32–bit storage for integers). The mask `n >> 31` will be evaluated to `0` for positive numbers and `-1` for negative numbers. For instance,

00000110 (n = 6) 00000000 (mask = 0)

00000110 ^ (n + mask) 00000000 (mask) ~~~~~~~~ 00000110 abs(n)

11111010 (n = -6) 11111111 (mask = -1)

11111001 ^ (n + mask) 11111111 (mask) ~~~~~~~~ 00000110 abs(n)

### How does it works?

For positive integer `n`, the mask will be 0 and `(n + 0) ^ 0 = n`. So, no trick behind this one. For a negative integer `n`, the mask will be `-1` and `(n - 1) ^ -1 = n`. But how?

We know that in `2's` complement notation, a negative number is represented by flipping the bits of its positive counterpart and adding `1` to it. Now to get the positive counterpart of a negative number, subtract `1` from it and flip its bits. i.e.,

-n = ~n + 1 n = ~(-n – 1)

The idea is same here – we subtract a mask `-1` from the given negative number and flip its bits by taking its bitwise `XOR` with the mask. Following is the C++, Java, and Python program that demonstrates the idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

int main()
{
    int n = -6;
    int const mask = n >> sizeof(int) * 8 - 1;

    cout << "n (" << n << ") in binary is " << bitset<8>(n) << endl;

    cout << "mask (" << mask << ") in binary is " << bitset<8>(mask) << endl;

    cout << "(n + mask) in binary is " << bitset<8>(n + mask) << endl;

    cout << "abs(" << n << ") is " << ((n + mask) ^ mask) << endl;

    return 0;
}
```

**Output:** n (-6) in binary is 11111010 mask (-1) in binary is 11111111 (n + mask) in binary is 11111001 abs(-6) is 6

##

```java
class Main
{
    public static void main(String[] args)
    {
        int n = -6;
        final int mask = n >> Integer.SIZE * 8 - 1;

        System.out.println("n (" + n + ") in binary is " + Integer.toBinaryString(n));

        System.out.println("mask (" + mask + ") in binary is " +
                    Integer.toBinaryString(mask));

        System.out.println("n + mask (" + n + mask + ") in binary is " +
                    Integer.toBinaryString(n + mask));

        System.out.println("abs(" + n + ") is " + ((n + mask) ^ mask));
    }
}
```

##

```python3
if __name__ == '__main__':

    SIZE = 32
    n = -6

    mask = n >> SIZE * 8 - 1

    print(f'n {n} in binary is', bin(n))

    print(f'mask {mask} in binary is', bin(mask))

    print(f'n + mask {n + mask} in binary is', bin(n + mask))

    print(f'abs({n}) is', (n + mask) ^ mask)
```

## Alternate Solution

If branching is allowed, we could have directly used the expression `((n >> 31) & 1) ? (~n + 1) : n` to return the absolute value of `n`.

Since branching is not allowed, we can easily modify the above expression to **`((n>> 31) & (~n + 1)) | ((~n >> 31) & n)`** which returns the absolute value of `n` without using the ternary operator. As discussed earlier, the mask `n >> 31` is evaluated to `0` (zero) for positive numbers and `-1` (non-zero) for negative numbers. Similarly, the mask `~n >> 31` is evaluated to `0` (zero) for negative numbers and `-1` (non-zero) for positive numbers.

Now for a positive number, `(n >> 31) & (~n + 1)` will be all `0's` and `(~n >> 31) & n` will be equal to `n`, and for a negative number, `(n >> 31) & (~n + 1)` will be equal to `n` and `(~n >> 31) & n` will be all `0's`. So, in either case, one side of the `OR` operator is `0`, and the `OR` operator will return the non-zero value, which happens to be the absolute value of `n`.

**Also See:**

[Bit Hacks – Part 1 (Basic)](https://techiedelight.com/bit-hacks-part-1-basic/) [Bit Hacks – Part 2 (Playing with k’th bit)](https://techiedelight.com/bit-hacks-part-2-playing-kth-bit/) [Bit Hacks – Part 3 (Playing with the rightmost set bit of a number)](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/) [Bit Hacks – Part 4 (Playing with letters of the English alphabet)](https://techiedelight.com/bit-hacks-part-4-playing-letters-english-alphabet/)

**Reference:**

[https://graphics.stanford.edu/~seander/bithacks.html#IntegerAbs](https://graphics.stanford.edu/~seander/bithacks.html)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 214

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
