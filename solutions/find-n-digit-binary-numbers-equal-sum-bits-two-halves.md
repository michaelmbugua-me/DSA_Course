# Find all n-digit binary numbers with an equal sum of bits in their two halves

> Source: https://www.techiedelight.com/find-n-digit-binary-numbers-equal-sum-bits-two-halves/

[String](https://www.techiedelight.com/Category/String/)

Find all `n`–digit binary numbers with an equal sum of left and right half, where `n` varies from `1` to `9` and the binary number should not start with `0`.

For example,

**6–digit numbers** with an equal sum of left and right half 100001 100010 101011 110011 100100 101101 101110 110101 110110 111111 **7–digit numbers** with an equal sum of left and right half (middle element can be 0 or 1 for odd numbers) 1000001 1001001 1000010 1001010 1010011 1011011 1100011 1101011 1000100 1001100 1010101 1011101 1010110 1011110 1100101 1101101 1100110 1101110 1110111 1111111

> 

A simple solution would be to generate all `n`–digit binary numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to generate only those `n`–digit numbers that satisfy the given constraints. We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to form the left- and right-half of the binary number. The idea is to append `0` and `1` to the partially formed left- and right-half at each point in the recursion and recur with one less bit in both the halves. We also maintain a field to store the difference between the sum of bits in the partially formed left- and right-half. Once we have filled `N/2`–digits in both left- and right-half and the difference is `0`, print the binary number created by the left- and right-half. If the number is odd, the middle element can be either `0` or `1`, i.e., the binary number is formed by (left half + mid + right half).

The algorithm can be implemented as follows in C++, Java, and Python. The code is optimized to return if the difference between left- and right-half becomes more than the total number of bits left to be filled at any point in the recursion, as the solution is not possible by following that path. Also, the code handles the case that the binary number should not start with `0`.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all n–digit binary numbers with an equal sum of
// first and second half bits in a bottom-up manner
void binarySeq(string left, string right, int n, int diff)
{
    // return if the number is invalid
    if (n > 9) {
        return;
    }

    // If the number is less than n–digit, and we can cover the difference
    // with n–digits left

    if (n && (2 * abs(diff) <= n))
    {
        // If `n` is odd, recur with mid as 0 and 1
        if (n == 1)
        {
            binarySeq(left, "0" + right, 0, diff);
            binarySeq(left, "1" + right, 0, diff);
            return;
        }

        // Special case – binary number should not start with 0
        if (left != "")
        {
            // Append 0 to both left and right half.
            // Both left and the right sum remains unchanged.

            binarySeq(left + "0", right + "0", n - 2, diff);

            // Append 0 to the left half, 1 to the right half, and minus 1 from `diff`
            // as the right sum is increased by 1

            binarySeq(left + "0", right + "1", n - 2, diff - 1);
        }

        // Append 1 to the left half, 0 to the right half, and add 1 to `diff`
        // as the left sum is increased by 1

        binarySeq(left + "1", right + "0", n - 2, diff + 1);

        // Append 1 to both left and right half.
        // Both left and the right sum remains unchanged.

        binarySeq(left + "1", right + "1", n - 2, diff);
    }

    // If the number becomes n–digit with an equal sum of left and right
    // half, print it

    else if (n == 0 && diff == 0) {
        cout << left + right << " ";
    }
}

int main()
{
    int n = 6;          // n–digit

    string left, right; // stores left and right half of the binary number
    int diff = 0;       // difference between left and right half

    binarySeq(left, right, n, diff);

    return 0;
}
```

**Output:** 100001 100010 101011 110011 100100 101101 101110 110101 110110 111111

##

```java
class Main
{
    // Function to find all n–digit binary numbers with an equal sum of first
    // and second half bits in a bottom-up manner
    public static void recur(String left, String right, int n, int diff)
    {
        // Return if invalid
        if (n > 9) {
            return;
        }

        // If the number is less than n–digit, and we can cover the difference
        // with n–digits left
        if (n > 0 && (2 * Math.abs(diff) <= n))
        {
            // If `n` is odd, recur with mid as 0 and 1
            if (n == 1)
            {
                recur(left, '0' + right, 0, diff);
                recur(left, '1' + right, 0, diff);
                return;
            }

            // Special case – binary number should not start with 0
            if (!left.equals(""))
            {
                // Append 0 to both left and right half.
                // Both left and the right sum remains unchanged.
                recur(left + '0', right + '0', n - 2, diff);

                // Append 0 to the left half, 1 to the right half, and minus 1
                // from `diff` as the right sum is increased by 1
                recur(left + '0', right + '1', n - 2, diff - 1);
            }

            // Append 1 to the left half, 0 to the right half, and add 1 to `diff`
            // as the left sum is increased by 1
            recur(left + '1', right + '0', n - 2, diff + 1);

            // Append 1 to both left and right half.
            // Both left and the right sum remains unchanged.
            recur(left + '1', right + '1', n - 2, diff);
        }

        // If the number becomes n–digit with an equal sum of left and right
        // digits, print it
        else if (n == 0 && diff == 0) {
            System.out.print(left + right + " ");
        }
    }

    public static void main(String[] args)
    {
        // n–digit number
        int n = 6;

        // stores left and right half of the binary number
        String left = "", right = "";

        // difference between left and right half
        int diff = 0;

        recur(left, right, n, diff);
    }
}
```

##

```python3
# Function to find all n–digit binary numbers with an equal sum of first
# and second half bits in a bottom-up manner
# left, right: stores left and right half of the binary number
# diff: difference between left and right half
def recur(n, left='', right='', diff=0):

    # Return if invalid
    if n > 9:
        return

    # If the number is less than n–digit, and we can cover the difference
    # with n–digits left
    if n > 0 and (2 * abs(diff) <= n):

        # If `n` is odd, recur with mid as 0 and 1
        if n == 1:
            recur(0, left, '0' + right, diff)
            recur(0, left, '1' + right, diff)
            return

        # Special case – binary number should not start with 0
        if left != '':
            # Append 0 to both left and right half.
            # Both left and the right sum remains unchanged.
            recur(n - 2, left + '0', right + '0', diff)

            # Append 0 to the left half, 1 to the right half, and minus 1 from `diff`
            # as the right sum is increased by 1
            recur(n - 2, left + '0', right + '1', diff - 1)

        # Append 1 to the left half, 0 to the right half, and add 1 to `diff`
        # as the left sum is increased by 1
        recur(n - 2, left + '1', right + '0', diff + 1)

        # Append 1 to both left and right half.
        # Both left and the right sum remains unchanged.
        recur(n - 2, left + '1', right + '1', diff)

    # If the number becomes n–digit with an equal sum of left and right
    # digits, print it
    elif n == 0 and diff == 0:
        print(left + right, end=' ')

if __name__ == '__main__':

    n = 6    # n–digit number
    recur(n)
```

Also See:

> [Find all n-digit numbers with equal sum of digits at even and odd indices](https://www.techiedelight.com/find-n-digit-numbers-with-equal-sum-even-odd-digits/ "Find all n-digit numbers with equal sum of digits at even and odd indices")

> [Find all n-digit numbers with a given sum of digits](https://www.techiedelight.com/find-all-n-digit-numbers-given-sum-digits/ "Find all n-digit numbers with a given sum of digits")

> [Find all n-digit binary numbers with k-bits set where `k` ranges from 1 to `n`](https://www.techiedelight.com/find-n-digit-binary-numbers-k-bits-set-k-ranges-1-n/ "Find all n-digit binary numbers with k-bits set where `k` ranges from 1 to `n`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 95

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
