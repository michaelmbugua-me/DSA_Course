# Multiply 16-bit integers using an 8-bit multiplier

> Source: https://www.techiedelight.com/multiply-16-bit-integers-using-8-bit-multiplier/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given two 16–bit positive values stored in 32–bit integer variables, find the product using the 8–bit multiply operator that takes two 8–bit numbers and returns a 16–bit value.

The idea is to divide the given 16–bit numbers (say `m` and `n`) into 8–bit numbers first (say `mLow, mHigh` and `nLow, nHigh`). Now the problem is reduced to something similar to the multiplication of a 2–digit number with another 2–digit number. For example,

[mHigh mLow] × [nHigh nLow] – – – – – – – [mHigh * nLow] [mLow * nLow] [mHigh * nHigh] [mLow * nHigh] – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – [mHigh * nHigh] + [mLow * nHigh + mHigh * nLow] + [mLow * nLow] – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – –

Following is the C++, Java, and Python implementation of the idea. We have used an `unsigned char` to represent an 8–bit number and `unsigned short` to represent a 16–bit number.

```
#include <iostream>
#include <bitset>
using namespace std;

// Multiply two 8–bit numbers `m` and `n` (unsigned char)
// and return a 16–bit number (unsigned short)
unsigned short multiply8bit(unsigned char m, unsigned char n) {
    return m*n;
}

// Multiply 16–bit integers using an 8–bit multiplier
int multiply16bit(int m, int n)
{
    unsigned char mLow = (m & 0x00FF);              // stores first 8–bits of `m`
    unsigned char mHigh = (m & 0xFF00) >> 8;        // stores last 8–bits of `m`

    unsigned char nLow = (n & 0x00FF);              // stores first 8–bits of `n`
    unsigned char nHigh = (n & 0xFF00) >> 8;        // stores last 8–bits of `n`

    unsigned short mLow_nLow = multiply8bit(mLow, nLow);
    unsigned short mHigh_nLow = multiply8bit(mHigh, nLow);
    unsigned short mLow_nHigh = multiply8bit(mLow, nHigh);
    unsigned short mHigh_nHigh = multiply8bit(mHigh, nHigh);

    // return 32–bit result (don't forget to shift `mHigh_nLow` and `mLow_nHigh`
    // by 1 byte and `mHigh_nHigh` by 2 bytes)

    return mLow_nLow + ((mHigh_nLow + mLow_nHigh) << 8) + (mHigh_nHigh << 16);
}

int main()
{
    // 16–bit numbers stored in a 32–bit integer
    int m = 23472, n = 2600;

    cout << m << " in binary is " << bitset<16>(m) << endl;
    cout << n << " in binary is " << bitset<16>(n) << endl << endl;

    cout << "Normal multiplication m × n = " << m * n << endl;
    cout << "Using 8–bit multiplier m × n = " << multiply16bit(m, n) << endl;

    return 0;
}
```

**Output:** 23472 in binary is 0101101110110000 2600 in binary is 0000101000101000 Normal multiplication m × n = 61027200 Using 8–bit multiplier m × n = 61027200

**References:** <https://ccrma.stanford.edu/~hugo/cs/>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 30

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
