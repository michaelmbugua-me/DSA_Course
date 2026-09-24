# Find the minimum number possible by doing at-most `k` swaps

> Source: https://www.techiedelight.com/find-minimum-number-possible-k-swaps/

Given a positive integer, find the minimum number possible by doing at-most `k` swap operations upon its digits.

For example,

**Input:** S = 934651, k = 1 **Output:** 134659 **Input:** S = 934651, k = 2 **Output:** 134569 **Input:** S = 52341, k = 2 **Output:** 12345 (Only 1 swap needed) **Input:** S = 12345, k = 2 **Output:** 12345 (no change as all digits are already sorted in increasing order)

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to consider every digit and swap it with digits following it, one at a time, and see if it leads to the minimum number. This process repeats `k` times.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Find the minimum number formed by doing at-most `k` swap operations upon
// digits of the string
void findMin(string s, int k, string &min_so_far)
{
    // compare the current number with a minimum number so far
    if (min_so_far.compare(s) > 0) {
        min_so_far = s;
    }

    // base case: no swaps left
    if (k < 1) {
        return;
    }

    int n = s.length();

    // do for each digit in the input string
    for (int i = 0; i < n - 1; i++)
    {
        // compare the current digit with the remaining digits
        for (int j = i + 1; j < n; j++)
        {
            // if the digit at i'th index is more than the digit at j'th index
            if (s[i] > s[j])
            {
                // swap `s[i]` and `s[j]`
                swap(s[i], s[j]);

                // recur for remaining `k-1` swap
                findMin(s, k - 1, min_so_far);

                // backtrack: restore the string
                swap(s[i], s[j]);
            }
        }
    }
}

// Wrapper over findMin() function
string findMinimum(string s, int k)
{
    string min = s;

    findMin(s, k, min);
    return min;
}

int main()
{
    // input string and number
    string s = "934651";
    int k = 2;

    string min = findMinimum(s, k);

    cout << "The minimum number formed by doing at-most " << k
         << " swaps is " << min;

    return 0;
}
```

**Output:** The minimum number formed by doing at-most 2 swaps is 134569

##

```java
class Main
{
    private static void swap(char[] digits, int i, int j)
    {
        char digit = digits[i];
        digits[i] = digits[j];
        digits[j] = digit;
    }

    // Find the minimum number formed by doing at-most `k` swap operations upon
    // digits of the string
    public static String findMin(char[] digits, int k, String min_so_far)
    {
        // compare the current number with a minimum number so far
        String curr = new String(digits);
        if (curr.compareTo(min_so_far) < 0) {
            min_so_far = curr;
        }

        // base case: no swaps left
        if (k < 1) {
            return min_so_far;
        }

        // do for each digit in the input string
        for (int i = 0; i < digits.length - 1; i++)
        {
            // compare the current digit with the remaining digits
            for (int j = i + 1; j < digits.length; j++)
            {
                // if the digit at i'th index is more than the digit
                // at j'th index
                if (digits[i] > digits[j])
                {
                    // swap `digits[i]` with `digits[j]`
                    swap(digits, i, j);

                    // recur for remaining `k-1` swap
                    min_so_far = findMin(digits, k - 1, min_so_far);

                    // backtrack: restore the array
                    swap(digits, i, j);
                }
            }
        }
        return min_so_far;
    }

    // Wrapper over findMin() function
    public static String findMinimum(String s, int k)
    {
        // base case
        if (s == null || s.length() == 0) {
            return s;
        }

        // convert digits of a given integer to a char array to
        // facilitate operations on them
        char[] digits = s.toCharArray();
        return findMin(digits, k, s);
    }

    public static void main(String[] args)
    {
        // input number
        String s = "934651";
        int k = 2;

        String min = findMinimum(s, k);

        System.out.println("The minimum number formed by doing at-most "
                + k + " swaps is " + min);
    }
}
```

##

```python3
def swap(digits, i, j):
    digit = digits[i]
    digits[i] = digits[j]
    digits[j] = digit

# Find the minimum number formed by doing at-most `k` swap operations upon
# digits of the string
def findMin(digits, k, min_so_far):

    # compare the current number with a minimum number so far
    num = ''.join(digits)
    if num < min_so_far:
        min_so_far = num

    # base case: no swaps left
    if k < 1:
        return min_so_far

    # do for each digit in the input string
    for i in range(len(digits) - 1):

        # compare the current digit with the remaining digits
        for j in range(i + 1, len(digits)):

            # if the digit at i'th index is more than the digit at j'th index
            if digits[i] > digits[j]:
                # swap `digits[i]` with `digits[j]`
                swap(digits, i, j)

                # recur for remaining `k-1` swap
                min_so_far = findMin(digits, k - 1, min_so_far)

                # backtrack: restore the list
                swap(digits, i, j)

    return min_so_far

def findMinimum(s, k):

    # base case
    if not s:
        return s

    # convert digits of a given integer to a list of strings to
    # facilitate operations on them
    digits = list(s)
    return findMin(digits, k, s)

if __name__ == '__main__':

    # input number
    s = '934651'
    k = 2

    min = findMinimum(s, k)
    print(f'The minimum number formed by doing at-most {k} swaps is {min}')
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
