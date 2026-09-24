# Count set bits using a lookup table

> Source: https://www.techiedelight.com/count-set-bits-using-lookup-table/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, count set bits in it using a lookup table.

For example,

**Input:** n = -1 (11…1111) **Output:** The total number of set bits in -1 is 32 **Input:** n = 16 (00001000) **Output:** The total number of set bits in 16 is 1

> 

We have discussed a naive solution and Brian Kernighan’s algorithm to count the total number of set bits in the [previous post](https://techiedelight.com/brian-kernighans-algorithm-count-set-bits-integer/). Both solutions have the worst-case time complexity of O(log(n)). In this post, an O(1) time solution is discussed.

The idea is to use a lookup table to return the total number of set bits in constant time. An integer in C/C++ usually takes 4 bytes for storage. That means the maximum number it can store is `232-1`. A lookup table for all `232-1` integers will be infeasible (Not to forget, we have negative numbers too).

The trick is to create an `8–bit (1 byte)` version of the table, then iterate over each byte in the integer to be checked and summing the table lookup results. 1 byte with all its bits set is 255 in decimal (`11111111` in binary), and all bits unset is 0 in decimal (`00000000` in binary). So, the lookup table should be of size 256 `(0-255)`.

The following C++ solution uses the macros to generate the lookup table. The lookup table will be generated at compile time by the preprocessor.

The first and last few numbers of the sequence will be: { 0, 1, 1, 2, 1, … , 7, 6, 7, 7, 8 } since 0 has 0 bits 1 has 1 bit 2 has 1 bit 3 has 2 bits 4 has 1 bit … … 251 has 7 bits 252 has 6 bits 253 has 7 bits 254 has 7 bits 255 has 8 bits

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Macros to generate the lookup table (at compile-time)
#define B2(n) n, n + 1, n + 1, n + 2
#define B4(n) B2(n), B2(n + 1), B2(n + 1), B2(n + 2)
#define B6(n) B4(n), B4(n + 1), B4(n + 1), B4(n + 2)
#define COUNT_BITS B6(0), B6(1), B6(1), B6(2)

// Lookup table to store the total number of bits set for each index
// in the table. The macro `COUNT_BITS` generates the table.
unsigned int lookup[256] = { COUNT_BITS };

// Function to count the total number of set bits in `n` using a lookup table
int countSetBits(int n)
{
    // print lookup table (number of bits set for integer `i`)

    /*
    for (int i = 0; i < 256; i++) {
        cout << i << " has " << lookup[i] << " bits\n";
    }
    */

    // Assuming a 32–bit (4 bytes) integer, break the integer into 8–bit chunks.
    // Note that mask used `0xff` is `11111111` in binary

    int count = lookup[n & 0xff] +      // consider the first 8 bits
        lookup[(n >> 8) & 0xff] +       // consider the next 8 bits
        lookup[(n >> 16) & 0xff] +      // consider the next 8 bits
        lookup[(n >> 24) & 0xff];       // consider last 8 bits

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

**References:** <https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetTable>

Also See:

> [Reverse bits of an integer using a lookup table](https://www.techiedelight.com/reverse-bits-integer-using-lookup-table/ "Reverse bits of an integer using a lookup table")

> [Compute the parity of a number using a lookup table](https://www.techiedelight.com/compute-parity-number-using-lookup-table/ "Compute the parity of a number using a lookup table")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 93

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
