# Find all n-digit numbers with equal sum of digits at even and odd indices

> Source: https://www.techiedelight.com/find-n-digit-numbers-with-equal-sum-even-odd-digits/

Find all n–digit numbers with an equal sum of digits at even and odd indices, where `n` varies from `2` to `9`.

For example,

3–digit numbers with an equal sum of digits at even and odd indices 110 121 132 143 154 165 176 187 198 220 231 242 253 264 275 286 297 330 341 352 363 374 385 396 440 451 462 473 484 495 550 561 572 583 594 660 671 682 693 770 781 792 880 891 990 5–digit numbers with an equal sum of digits at even and odd indices 10010 10021 10032 10043 10054 10065 10076 10087 10098 10120 10131 10142 10153 10164 10175 10186 10197 10230 10241 10252 10263 10274 10285 10296 10340 10351 10362 10373 10384 10395 10450 10461 10472 10483 10494 10560 10571 10582 10593 10670 10681 10692 10780 10791 10890 11000 11011 11022 11033 11044 11055 11066 11077 11088 11099 11110 11121 11132 11143 11154 11165 11176 11187 11198 11220 …… …… and many more…

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We append digits from `0` to `9` to the partially formed number and recur with one less digit at each point in the recursion. We also maintain a variable to store the difference between even and odd digits so far in the partially formed number. If we have filled n–digits and the difference is `0`, print the number. One special case we need and handle that the number should not start with `0`.

The algorithm can be implemented as follows in C, C++, Java, and Python in a bottom-up manner, i.e., we start from the first index and recursively fill the digits from left to right.

```c
#include <stdio.h>
#include <math.h>

// Function to find all n–digit numbers with an equal sum of digits at even
// and odd index digits in a bottom-up manner
void findNdigitNums(char result[], int index, int n, int diff)
{
    // if the number is less than n–digit
    if (index < n)
    {
        char d = '0';
        // special case: number cannot start from 0
        if (index == 0) {
            d = '1';
        }

        // consider every valid digit and put it in the current
        // index and recur for the next index
        while (d <= '9')
        {
            // update difference between odd and even digits
            if (index & 1) {
                diff += (d - '0');    // add value to `diff` if the digit is odd
            }
            else {
                diff -= (d - '0');    // subtract value from `diff` if the digit is even
            }

            result[index] = d;
            findNdigitNums(result, index + 1, n, diff);

            // backtrack (or use a temp variable instead of updating diff)
            if (index & 1) {
                diff -= (d - '0');    // subtract value from `diff` if the digit is odd
            }
            else {
                diff += (d - '0');    // add value to `diff` if the digit is even
            }

            d++;
        }
    }
    // if the number becomes n–digit with an equal sum of even and odd
    // digits, print it
    else if (index == n && abs(diff) == 0) {
        printf("%s ", result);
    }
}

int main(void)
{
    int n = 3;        // n–digit

    // character array to store the result
    char result[n + 1];

    // null terminate the array
    result[n] = '\0';

    findNdigitNums(result, 0, n, 0);

    return 0;
}
```

##

```cpp
#include <iostream>
using namespace std;

// Function to find all n–digit numbers with an equal sum of digits at even
// and odd index in a bottom-up manner
void findNdigitNums(string result, int n, int diff)
{
    // if the number is less than n–digit
    if (n)
    {
        char ch = '0';
        // special case: number cannot start from 0
        if (result == "") {
            ch = '1';
        }

        // consider every valid digit and put it in the current
        // index and recur for the next index
        while (ch <= '9')
        {
            int absdiff;

            // update difference between odd and even digits
            if ((n & 1) != 0)
            {
                // add value to `diff` if the digit is odd
                absdiff = diff + (ch - '0');
            }
            else {
                // subtract a value from `diff` if even
                absdiff = diff - (ch - '0');
            }

            findNdigitNums(result + ch, n - 1, absdiff);
            ch++;
        }
    }
    // if the number becomes n–digit with an equal sum of even and odd
    // digits, print it
    else if (n == 0 && abs(diff) == 0) {
        cout << result << " ";
    }
}

int main()
{
    int n = 3;        // n–digit
    string result;

    findNdigitNums(result, n, 0);

    return 0;
}
```

##

```java
class Main
{
    // Function to find all n–digit numbers with an equal sum of digits at even
    // and odd index in a bottom-up manner
    public static void findNdigitNums(String result, int n, int diff)
    {
        // if the number is less than n–digit
        if (n > 0)
        {
            char ch = '0';

            // special case: number cannot start from 0
            if (result.equals("")) {
                ch = '1';
            }

            // consider every valid digit and put it in the current
            // index and recur for the next index
            while (ch <= '9')
            {
                int absdiff;

                // update difference between odd and even digits
                if ((n & 1) != 0)
                {
                    // add value to `diff` if the digit is odd
                    absdiff = diff + (ch - '0');
                }
                else {
                    // subtract a value from `diff` if even
                    absdiff = diff - (ch - '0');
                }

                findNdigitNums(result + ch, n - 1, absdiff);
                ch++;
            }
        }

        // if the number becomes n–digit with an equal sum of even and odd
        // digits, print it
        else if (n == 0 && Math.abs(diff) == 0) {
            System.out.println(result);
        }
    }

    public static void main(String[] args)
    {
        int n = 3;        // n–digit
        String result = "";

        findNdigitNums(result, n, 0);
    }
}
```

##

```python3
# Function to find all n–digit numbers with an equal sum of digits at even
# and odd index in a bottom-up manner
def findNdigitNums(n, result='', diff=0):

    # if the number is less than n–digit
    if n > 0:

        ch = ord('0')

        # special case: number cannot start from 0
        if result == '':
            ch = ord('1')

        # consider every valid digit and put it in the current
        # index and recur for the next index
        while ch <= ord('9'):

            # update difference between odd and even digits
            if n & 1:
                # add value to `diff` if the digit is odd
                absdiff = diff + (ch - ord('0'))
            else:
                # subtract a value from `diff` if even
                absdiff = diff - (ch - ord('0'))

            findNdigitNums(n - 1, result + chr(ch), absdiff)
            ch = ch + 1

    # if the number becomes n–digit with an equal sum of even and odd
    # digits, print it
    elif n == 0 and abs(diff) == 0:
        print(result, end=' ')

if __name__ == '__main__':

    n = 3    # n–digit

    findNdigitNums(n)
```

**Output:** 110 121 132 143 154 165 176 187 198 220 231 242 253 264 275 286 297 330 341 352 363 374 385 396 440 451 462 473 484 495 550 561 572 583 594 660 671 682 693 770 781 792 880 891 990

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find all n-digit binary numbers with an equal sum of bits in their two halves](https://www.techiedelight.com/find-n-digit-binary-numbers-equal-sum-bits-two-halves/ "Find all n-digit binary numbers with an equal sum of bits in their two halves")

> [Find all n-digit numbers with a given sum of digits](https://www.techiedelight.com/find-all-n-digit-numbers-given-sum-digits/ "Find all n-digit numbers with a given sum of digits")

> [Find all n-digit strictly increasing numbers (Bottom-up and Top-down approach)](https://www.techiedelight.com/find-n-digit-strictly-increasing-numbers-bottom-top-approach/ "Find all n-digit strictly increasing numbers \(Bottom-up and Top-down approach\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
