# Swap individual bits at a given position in an integer

> Source: https://www.techiedelight.com/swap-individual-bits-given-position-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, swap consecutive `b` bits starting from the given positions in a binary representation of an integer. The bits to be swapped should not overlap with each other.

For example,

**Input:** n = 15 (15 in binary is 00001111) p = 2, q = 5 (3rd and 6th bit from the right) b = 2 (Total number of consecutive bits in each sequence) **Output:** 99 (99 in binary is 01100011)

> 

The idea is to store the result of _XOR_ ing the pairs of bit values we want to swap in a variable `x`, and then the bits are set to the result of themselves XORed with `x`. The code goes as:

// isolate the bits to be swapped and take their XOR x = ((n >> p) ^ (n >> q)) & ((1 << b) – 1) // replace the bits to be swapped with the XOR bits and take its XOR with n result = n ^ ((x << p) | (x << q))

Note that the result is undefined if the sequences overlap.

For example, consider `n = 15`, `p = 2`, `q = 5` (3rd and 6th bit from the right) and number of consecutive bits in each sequence `b = 2`.

**00** 00**11** 11 (n = 15) 000000**11** ^ (n >> p) 000000**00** (n >> q) ~~~~~~~~ 00000011 ((n >> p) ^ (n >> q)) 00000011 & ((n >> p) ^ (n >> q)) 00000011 ((1 << b) – 1) ~~~~~~~~ 00000011 x 00001100 | (x << p) 01100000 (x << q) ~~~~~~~~ 01101100 ((x << p) | (x << q)) 00001111 ^ (n = 15) 01101100 (n ^ ((x << p) | (x << q))) ~~~~~~~~ 01100011

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Function to swap b–bits starting from position `p` and `q` in an integer `n`
int swap(int n, int p, int q, int b)
{
    // take XOR of bits to be swapped
    int x = ((n >> p) ^ (n >> q));

    // only consider the last b–bits of `x`
    x = x & ((1 << b) - 1);

    // replace the bits to be swapped with the XORed bits
    // and take its XOR with `n`
    return n ^ ((x << p) | (x << q));
}

int main()
{
    int n = 15;
    int p = 2, q = 5;   // 3rd and 6th bit from the right
    int b = 2;          // total number of consecutive bits in each sequence

    cout << n << " in binary is " << bitset<8>(n) << endl;
    n = swap (n, p, q, b);
    cout << n << " in binary is " << bitset<8>(n) << endl;

    return 0;
}
```

**Output:** 15 in binary is 00001111 99 in binary is 01100011

##

```java
class Main
{
    public static String toBinaryString(int n)
    {
        return String.format("%8s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    // Function to swap b–bits starting from position `p` and `q` in an integer `n`
    public static int swap(int n, int p, int q, int b)
    {
        // take XOR of bits to be swapped
        int x = ((n >> p) ^ (n >> q));

        // only consider the last b–bits of `x`
        x = x & ((1 << b) - 1);

        // replace the bits to be swapped with the XOR bits
        // and take its XOR with `n`
        return n ^ ((x << p) | (x << q));
    }

    public static void main(String[] args)
    {
        int n = 15;
        int p = 2, q = 5;   // 3rd and 6th bit from the right
        int b = 2;          // total number of consecutive bits in each sequence

        System.out.println(n + " in binary is " + toBinaryString(n));
        n = swap (n, p, q, b);
        System.out.println(n + " in binary is " + toBinaryString(n));
    }
}
```

##

```python3
# Function to swap b–bits starting from position `p` and `q` in an integer `n`
def swap(n, p, q, b):

    # take XOR of bits to be swapped
    x = ((n >> p) ^ (n >> q))

    # only consider the last b–bits of `x`
    x = x & ((1 << b) - 1)

    # replace the bits to be swapped with the XOR bits
    # and take its XOR with `n`
    return n ^ ((x << p) | (x << q))

if __name__ == '__main__':

    n = 15

    # 3rd and 6th bit from the right
    p = 2
    q = 5

    # total number of consecutive bits in each sequence
    b = 2

    print(f'{n} in binary is {bin(n)}')
    n = swap(n, p, q, b)
    print(f'{n} in binary is {bin(n)}')
```

**References:** <https://graphics.stanford.edu/~seander/bithacks.html#SwappingBitsXOR>

Also See:

> [Swap two bits at a given position in an integer](https://www.techiedelight.com/swap-two-bits-given-position-integer/ "Swap two bits at a given position in an integer")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 90

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
