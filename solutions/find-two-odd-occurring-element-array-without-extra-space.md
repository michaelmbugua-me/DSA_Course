# Find two odd occurring elements in an array without using any extra space

> Source: https://www.techiedelight.com/find-two-odd-occurring-element-array-without-extra-space/

Given an integer array, duplicates appear in it an even number of times except for two elements, which appear an odd number of times. Find both odd appearing elements without using any extra memory.

For example,

**Input:** arr[] = [4, 3, 6, 2, 4, 2, 3, 4, 3, 3] **Output:** The odd occurring elements are 4 and 6 6 appears once. 2 appears twice. 4 appears thrice. 3 appears 4 times.

> 

**Related Post:**

> [Find the odd occurring element in an array in a single traversal](https://techiedelight.com/find-odd-occurring-element-array-single-traversal/)

For an input containing `n` elements, we can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in O(n) time. The idea is to traverse the array and maintain the frequency of each element in a hash table. Then, after each array element is processed, return the elements with odd frequencies. The problem with this approach is that it requires O(n) extra space as well. Also, it requires one traversal of the array and one traversal of the hash table. This approach’s advantage is its simplicity and the fact that it will work for any number of distinct odd elements present in the array.

We can solve this problem in O(1) space by using the XOR operator. We know that if we XOR a number with itself an odd number of times, the result is the number itself; otherwise, if we XOR a number an even number of times with itself, the result is 0. Also, XOR with 0 is always the number itself.

XOR of ‘x’ with 0: x ^ 0 = x XOR of ‘x’ with itself even number of times: x ^ x = 0 x ^ x ^ x ^ x = (x ^ x) ^ (x ^ x) = 0 ^ 0 = 0 XOR of ‘x’ with itself odd number of times: (x ^ x ^ x) = (x ^ (x ^ x)) = (x ^ 0) = x (x ^ x ^ x ^ x ^ x) = (x ^ (x ^ x) ^ (x ^ x)) = (x ^ 0 ^ 0) = x

So, if we take XOR of all array elements, even appearing elements will cancel each other, and we are left with XOR of `x` and `y`, `x ^ y`, where `x` and `y` are two odd appearing elements.

How to find x and y?

Let `result = (x ^ y)`.

We know that any set bit in `result` will be either set in `x` or `y` (but not in both as a bit will only set in `result` when it is set in one number and unset in the other).

The idea is to consider the rightmost set bit in `result` (or any other set bit) and split the array into two subarrays:

  1. All elements that have this bit set.
  2. All elements that have this bit unset.

As this rightmost bit is set in one number and unset in the other, we will have one odd appearing element in each subarray. We have isolated traits of one number with the other, so that both `x` and `y` will go to a different subarray.

Now iterate each subarray once more, do XOR on each element of the subarray, and the result will be the odd appearing element present in the subarray (since even appearing elements will cancel each other).

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

pair<int, int> findOddOccuring(vector<int> const &arr)
{
    int result = 0;

    // take XOR of all array elements
    for (int i: arr) {
        result = result ^ i;
    }

    // find the position of the rightmost set bit in `result`
    int k = log2(result & -result);

    // `x` and `y` are two odd appearing elements
    int x = 0, y = 0;

    // split the array into two subarrays
    for (int i: arr)
    {
        // elements that have k'th bit 1
        if (i & (1 << k)) {
            x = x ^ i;
        }

        // elements that have k'th bit 0
        else {
            y = y ^ i;
        }
    }

    return make_pair(x, y);
}

int main()
{
    vector<int> arr = { 4, 3, 6, 2, 4, 2, 3, 4, 3, 3 };

    pair<int, int> p = findOddOccuring(arr);
    cout << "The odd occurring elements are " << p.first << " and " << p.second;

    return 0;
}
```

**Output:** The odd occurring elements are 6 and 4

##

```java
class Main
{
    public static int log(int x, int base) {
        return (int) (Math.log(x) / Math.log(base));
    }

    public static void findOddOccuring(int[] arr)
    {
        int result = 0;

        // take XOR of all array elements
        for (int i: arr) {
            result = result ^ i;
        }

        // find the position of the rightmost set bit in `result`
        int k = log(result & -result, 2);

        // `x` and `y` are two odd appearing elements
        int x = 0, y = 0;

        // split the array into two subarrays
        for (int i: arr)
        {
            // elements that have k'th bit set
            if ((i & (1 << k)) != 0) {
                x = x ^ i;
            }

            // elements that don't have k'th bit set
            else {
                y = y ^ i;
            }
        }

        System.out.println("The odd occurring elements are " + x + " and " + y);
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 3, 6, 2, 4, 2, 3, 4, 3, 3 };
        findOddOccuring(arr);
    }
}
```

##

```python3
from math import log

def log2(x, base):
    return int(log(x) / log(base))

def findOddOccuring(arr):

    # take XOR of all list elements
    result = 0
    for i in arr:
        result = result ^ i

    # find the position of the rightmost set bit in `result`
    k = log2(result & -result, 2)

    # `x` and `y` are two odd appearing elements
    x = y = 0

    # split the list into two sublists
    for i in arr:

        # elements that have k'th bit set
        if i & (1 << k):
            x = x ^ i

        # elements that don't have k'th bit set
        else:
            y = y ^ i

    return x, y

if __name__ == '__main__':

    arr = [4, 3, 6, 2, 4, 2, 3, 4, 3, 3]
    print('The odd occurring elements are', findOddOccuring(arr))
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
