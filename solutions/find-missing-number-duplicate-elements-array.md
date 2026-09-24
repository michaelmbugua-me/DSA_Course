# Find the missing number and duplicate elements in an array

> Source: https://www.techiedelight.com/find-missing-number-duplicate-elements-array/

Given an integer array of size `n`, with all its elements between 1 and `n` and one element occurring twice and one element missing. Find the missing number and the duplicate element in linear time and without using any extra memory.

For example,

**Input:** arr[] = [4, 3, 6, 5, 2, 4] **Output:** The duplicate and missing elements are 4 and 1, respectively

> 

**Related Posts:**

> [Find two odd occurring elements in an array without using any extra space](https://techiedelight.com/find-two-odd-occurring-element-array-without-extra-space/)

We can solve this problem in linear time and constant space using the **XOR operator**. We know that if we XOR a number with itself an odd number of times, the result is a number itself; otherwise, if we XOR a number an even number of times with itself, the result is 0. Also, XOR with 0 is always the number itself.

XOR of ‘x’ with 0: x ^ 0 = x XOR of ‘x’ with itself even number of times: x ^ x = 0 x ^ x ^ x ^ x = (x ^ x) ^ (x ^ x) = 0 ^ 0 = 0 XOR of ‘x’ with itself odd number of times: (x ^ x ^ x) = (x ^ (x ^ x)) = (x ^ 0) = x (x ^ x ^ x ^ x ^ x) = (x ^ (x ^ x) ^ (x ^ x)) = (x ^ 0 ^ 0) = x

If we take XOR of all array elements with every element in range `[1, n]`, even appearing elements will cancel each other. We are left with XOR of `x` and `y`, `x ^ y`, where `x` and `y` is the duplicate and missing element. Note that the duplicate element will be XORed three times in total, and the missing element will be XORed 1 time, whereas all other elements will be XORed twice.

How to find x and y?

We know that any set bit in `result = (x ^ y)` will be either set in `x` or `y` (but not in both as a bit will only set in `result` when it is set in one number and unset in the other).

The idea is to consider the rightmost set bit in `result` (or any other set bit) and split the array/range into two lists:

  1. The first list contains all the array elements and numbers in the range that have this bit set.
  2. The second list contains all the array elements and numbers in the range that have this bit unset.

As the rightmost bit is set in one number and unset in the other, we will have a duplicate element present in one list and a missing number present. Basically, we have isolated traits of one number with the other, so that both `x` and `y` will go to different lists.

Now iterate both lists once more and do XOR on each element. The result will be the duplicate element present in one list and the missing number present in the other list (since elements appearing twice will cancel each other).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// Function to find the missing number and duplicate element using XOR operator
// in an array of size `n` and range of elements from 1 to `n`
pair<int, int> findMissingAndDuplicate(vector<int> const &arr)
{
    int n = arr.size();

    // take XOR of all array elements from index 0 to `n-1`
    // all numbers in range 1 to `n`
    int result = n;
    for (int i = 0; i < n; i++) {
        result = result ^ arr[i] ^ i;
    }

    // `x` and `y` stores the duplicate element and missing number
    int x = 0, y = 0;

    // `result` stores `x ^ y`

    // find the position of the rightmost set bit in result
    int k = log2(result & -result);

    // split the array into two subarrays
    for (int val: arr)
    {
        // array elements that have k'th bit 1
        if (val & (1 << k)) {
            x = x ^ val;
        }
        // array elements that have k'th bit 0
        else {
            y = y ^ val;
        }
    }

    // split range [1, n] into two subranges
    for (int i = 1; i <= n; i++)
    {
        // number `i` has k'th bit 1
        if (i & (1 << k)) {
            x = x ^ i;
        }

        // number `i` has k'th bit 0
        else {
            y = y ^ i;
        }
    }

    // linear search for the missing element
    if (find(arr.begin(), arr.end(), x) == arr.end()) {
        return make_pair(y, x);
    }

    return make_pair(x, y);
}

int main()
{
    vector<int> arr = { 4, 3, 6, 5, 2, 4 };

    pair<int, int> p = findMissingAndDuplicate(arr);

    cout << "The duplicate and missing elements are "
         << p.first << " and " << p.second;

    return 0;
}
```

**Output:** The duplicate and missing elements are 4 and 1

##

```java
import java.util.Arrays;
import java.util.stream.Collectors;

class Main
{
    public static int log(int x, int base) {
        return (int) (Math.log(x) / Math.log(base));
    }

    // Function to find the missing number and duplicate element
    // using XOR operator in an array of size `n` and range of
    // elements from 1 to `n`
    public static void findMissingAndDuplicate(int[] arr)
    {
        int n = arr.length;

        // take XOR of all array elements from index 0 to `n-1`
        // all numbers in range 1 to `n`
        int result = n;
        for (int i = 0; i < n; i++) {
            result = result ^ arr[i] ^ i;
        }

        // `x` and `y` stores the duplicate element and missing number
        int x = 0, y = 0;

        // `result` stores `x ^ y`

        // find the position of the rightmost set bit in result
        int k = log(result & -result, 2);

        // split the array into two subarrays
        for (int value: arr)
        {
            // array elements that have k'th bit 1
            if ((value & (1 << k)) != 0) {
                x = x ^ value;
            }

            // array elements that have k'th bit 0
            else {
                y = y ^ value;
            }
        }

        // split range [1, n] into two subranges
        for (int i = 1; i <= n; i++)
        {
            // number `i` has k'th bit 1
            if ((i & (1 << k)) != 0) {
                x = x ^ i;
            }

            // number `i` has k'th bit 0
            else {
                y = y ^ i;
            }
        }

        // linear search for the missing element
        System.out.print("The duplicate and missing elements are ");

        if (Arrays.stream(arr).boxed().collect(Collectors.toList()).contains(x)) {
            System.out.println(x + " and " + y);
        }
        else {
            System.out.println(y + " and " + x);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 3, 6, 5, 2, 4 };

        findMissingAndDuplicate(arr);
    }
}
```

##

```python3
from math import log

def log2(x, base):
    return int(log(x) // log(base))

# Function to find the missing number and duplicate element
# using XOR operator in a list of size `n` and range of
# elements from 1 to `n`
def findMissingAndDuplicate(arr):
    n = len(arr)

    # take XOR of all list elements from index 0 to `n-1`
    # all numbers in range 1 to `n`
    result = n
    for i in range(n):
        result = result ^ arr[i] ^ i

    # `x` and `y` stores the duplicate element and missing number
    x = y = 0

    # `result` stores `x ^ y`

    # find the position of the rightmost set bit in result
    k = log2(result & -result, 2)

    # split the list into two sublists
    for val in arr:
        # list elements that have k'th bit 1
        if (val & (1 << k)) != 0:
            x = x ^ val
        # list elements that have k'th bit 0
        else:
            y = y ^ val

    # split range [1, n] into two subranges
    for i in range(1, n + 1):
        # number `i` has k'th bit 1
        if (i & (1 << k)) != 0:
            x = x ^ i
        # number `i` has k'th bit 0
        else:
            y = y ^ i

    # linear search for the missing element
    if x in arr:
        return x, y
    else:
        return y, x

if __name__ == '__main__':
    arr = [4, 3, 6, 5, 2, 4]
    print('The duplicate and missing elements are', findMissingAndDuplicate(arr))
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
