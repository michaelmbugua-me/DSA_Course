# Check if adjacent bits are set in the binary representation of a number

> Source: https://www.techiedelight.com/check-adjacent-bits-set-binary-representation-number/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a number, check if adjacent bits are set in the binary representation of it.

> 

A naive solution is to consider every bit present in the number one by one and compare it with its previous bit. If the current bit is the same as the previous bit, we have found a pair whose adjacent bits are 1.

The expression `n & (n << 1)` or `n & (n >> 1)` returns true if `n` contains any pair whose adjacent bits are 1. For example,

00101101 & (n) 01011010 left shift n by 1 ~~~~~~~~ 00001000 (n & (n << 1))

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <bitset>
using namespace std;

// Returns true if adjacent bits are set in a binary representation of `n`
bool check(int n) {
    return n & (n << 1);
}

int main()
{
    int n = 67;

    cout << n << " in binary is " << bitset<8>(n) << endl;

    if (check(n)) {
        cout << "Adjacent pair of set bits found";
    }
    else {
        cout << "No adjacent pair of set bits found";
    }

    return 0;
}
```

**Output:** 67 in binary is 01000011 Adjacent pair of set bits found

##

```java
class Main
{
    // Returns true if adjacent bits are set in the binary representation of `n`
    public static boolean check(int n) {
        return (n & (n << 1)) != 0;
    }

    public static void main(String[] args)
    {
        int n = 67;

        System.out.println(n + " in binary is " + Integer.toBinaryString(n));

        if (check(n)) {
            System.out.println("Adjacent pair of set bits found");
        }
        else {
            System.out.println("No adjacent pair of set bits found");
        }
    }
}
```

##

```python3
# Returns true if adjacent bits are set in the binary representation of `n`
def check(n):
    return (n & (n << 1)) != 0

if __name__ == '__main__':

    n = 67
    print(f'{n} in binary is {bin(n)}')

    if check(n):
        print('Adjacent pair of set bits found')
    else:
        print('No adjacent pair of set bits found')
```

**Also See:**

[Bit Hacks – Part 1 (Basic)](https://techiedelight.com/bit-hacks-part-1-basic/) [Bit Hacks – Part 2 (Playing with k’th bit)](https://techiedelight.com/bit-hacks-part-2-playing-kth-bit/) [Bit Hacks – Part 3 (Playing with the rightmost set bit of a number)](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/) [Bit Hacks – Part 4 (Playing with letters of the English alphabet)](https://techiedelight.com/bit-hacks-part-4-playing-letters-english-alphabet/) [Bit Hacks – Part 5 (Find the absolute value of an integer without branching)](https://techiedelight.com/bit-hacks-part-5-find-absolute-value-integer-without-branching/)

**Suggested Read:**

<https://graphics.stanford.edu/~seander/bithacks.html>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 100

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
