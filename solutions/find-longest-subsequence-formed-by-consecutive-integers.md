# Longest Consecutive Subsequence

> Source: https://www.techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the length of the longest subsequence formed by the consecutive integers. The subsequence should contain all distinct values, and the character set should be consecutive, irrespective of its order.

For example,

Input : [2, 0, 6, 1, 5, 3, 7] Output: 4 Explanation: The longest subsequence formed by the consecutive integers is [2, 0, 1, 3]. It has distinct values and length 4. Input : [2, 4, 6, 3, 7, 4, 8, 1] Output: 4 Explanation: The longest subsequence formed by the consecutive integers is [2, 4, 3, 4, 1]. The distinct subsequence is [2, 4, 3, 1] having length 4.

> 

Note that the problem differs from finding the [largest subarray formed by the consecutive integers](https://techiedelight.com/find-largest-sub-array-formed-by-consecutive-integers/). Unlike subarrays, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original array.

A naive solution would be to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and compare the consecutive elements to find the maximum length subarray with consecutive integers. The time complexity of this solution would be O(n.log(n)), where `n` is the size of the given sequence.

We can do better using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to consider each input sequence element and find the maximum length of a consecutive subsequence starting with `i`, i.e., for every element `e`, check for the presence of elements `e+1`, `e+2`, `e+3`, … in the input. We can optimize the code by using a set for constant-time lookups to determine if the element present in the input sequence or not. The algorithm can be implemented as below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
#include <vector>
using namespace std;

// Function to find the length of the largest subsequence formed by consecutive
// integers
int findMaxLenSubseq(vector<int> &input)
{
    // construct a set out of input elements
    unordered_set<int> S(input.begin(), input.end());

    // initialize result by 0
    int max_len = 0;

    // do for each element of the input sequence
    for (int e: input)
    {
        // check if the current element `e` is a candidate for starting a sequence,
        // i.e., the previous element `e-1` doesn't exist in the set
        if (S.find(e - 1) == S.end())
        {
            // stores the length of subsequence, starting with the current element
            int len = 1;

            // check for presence of elements `e+1`, `e+2`, `e+3`, … ,`e+len` in `S`
            while (S.find(e + len) != S.end()) {
                len++;
            }

            // update result with the length of current consecutive subsequence
            max_len = max(max_len, len);
        }
    }

    // return result
    return max_len;
}

int main()
{
    vector<int> input = { 2, 0, 6, 1, 5, 3, 7 };

    cout << "The length of the maximum consecutive subsequence is "
         << findMaxLenSubseq(input);

    return 0;
}
```

**Output:** The length of the maximum consecutive subsequence is 4

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Main
{
    // Function to find the length of the largest subsequence formed by
    // consecutive integers
    public static int findMaxLenSubseq(int[] arr)
    {
        // construct a set out of input elements
        Set<Integer> S = IntStream.of(arr)        // Returns IntStream
                                .boxed()
                                .collect(Collectors.toSet());

        // initialize result by 0
        int maxLen = 0;

        // do for each element of the input sequence
        for (int e: arr)
        {
            // check if the current element `e` is a candidate for starting a sequence,
            // i.e., the previous element `e-1` doesn't exist in the set
            if (!S.contains(e - 1))
            {
                // `len` stores the length of subsequence, starting with the
                // current element
                int len = 1;

                // check for presence of elements `e+1`, `e+2`, `e+3`, … ,`e+len`
                // in the set
                while (S.contains(e + len)) {
                    len++;
                }

                // update result with the length of current consecutive subsequence
                maxLen = Math.max(maxLen, len);
            }
        }

        // return result
        return maxLen;
    }

    public static void main (String[] args)
    {
        int[] arr = { 2, 0, 6, 1, 5, 3, 7 };

        System.out.println("The length of the maximum consecutive subsequence is " +
                findMaxLenSubseq(arr));
    }
}
```

##

```python3
# Function to find the length of the largest subsequence formed by consecutive integers
def findMaxLenSubseq(A):

    # construct a set out of input elements
    S = set(A)

    # initialize result by 0
    maxlength = 0

    # do for each element of the input sequence
    for e in A:

        # check if the current element `e` is a candidate for starting a sequence;
        # i.e., the previous element `e-1` doesn't exist in the set
        if (e - 1) not in S:

            # `len` stores the length of subsequence, starting with the current element
            len = 1

            # check for presence of elements `e+1`, `e+2`, `e+3`, … ,`e+len` in the set
            while (e + len) in S:
                len += 1

            # update result with the length of current consecutive subsequence
            maxlength = max(maxlength, len)

    # return result
    return maxlength

if __name__ == '__main__':

    A = [2, 0, 6, 1, 5, 3, 7]

    print("The length of the maximum consecutive subsequence is:",
        findMaxLenSubseq(A))
```

The time complexity of the above solution O(n) and requires O(n) extra space.

**Exercise:** Extend the solution to print the maximum length consecutive subsequence.

Also See:

> [Find the largest subarray formed by consecutive integers](https://www.techiedelight.com/find-largest-sub-array-formed-by-consecutive-integers/ "Find the largest subarray formed by consecutive integers")

> [Longest Bitonic Subarray Problem](https://www.techiedelight.com/find-longest-bitonic-subarray-array/ "Longest Bitonic Subarray Problem")

> [Longest Bitonic Subsequence](https://www.techiedelight.com/longest-bitonic-subsequence/ "Longest Bitonic Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
