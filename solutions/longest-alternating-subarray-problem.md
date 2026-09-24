# Longest Alternating Subarray Problem

> Source: https://www.techiedelight.com/longest-alternating-subarray-problem/

Given an array containing positive and negative elements, find a subarray with alternating positive and negative elements, and in which the subarray is as long as possible.

The Longest Alternating Subarray problem differs from the problem of finding the [Longest Alternating subsequence](https://techiedelight.com/longest-alternating-subsequence/). Unlike a subsequence, a subarray is required to occupy consecutive positions within the original array.

For example, consider array `{ 1, -2, 6, 4, -3, 2, -4, -3 }`. The longest alternating subarray is `{ 4, -3, 2, -4 }`. Note that the longest alternating subarray might not be unique.

> 

We can easily solve this problem in linear time using similar logic as [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/). The idea is to maintain the longest alternating subarray “ending” at each given array index. This subarray can be a single element (if the previous element has the same sign) or consists of one more element than the longest alternating subarray ending at the previous index (if the previous element has an opposite sign).

The algorithm can be implemented as below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Utility function to print subarray `nums[i…j]`
void printSubarray(vector<int> const &nums, int i, int j)
{
    cout << "[";
    for (int k = i; k < j; k++) {
        cout << nums[k] << ", ";
    }
    cout << nums[j] << "]";
}

// Function to find the length of the longest subarray with alternating
// positive and negative elements
void findLongestSubarray(vector<int> const &nums)
{
    // base case
    if (nums.size() == 0) {
        return;
    }

    // stores length of longest alternating subarray found so far
    int max_len = 1;

    // stores ending index of longest alternating subarray found so far
    int ending_index = 0;

    // stores length of alternating subarray ending at the current position
    int curr_len = 1;

    // traverse the given array starting from the second index
    for (int i = 1; i < nums.size(); i++)
    {
        // if the current element has an opposite sign than the previous element
        if (nums[i] * nums[i - 1] < 0)
        {
            // include the current element in the longest alternating subarray ending
            // at the previous index
            curr_len++;

            // update result if the current subarray length is found to be greater
            if (curr_len > max_len)
            {
                max_len = curr_len;
                ending_index = i;
            }
        }
        // reset length if the current element has the same sign as the previous
        // element
        else {
            curr_len = 1;
        }
    }

    cout << "The longest alternating subarray is ";
    printSubarray(nums, (ending_index - max_len + 1), ending_index);
}

int main()
{
    vector<int> nums = { 1, -2, 6, 4, -3, 2, -4, -3 };

    findLongestSubarray(nums);

    return 0;
}
```

**Output:** The longest alternating subarray is [4, -3, 2, -4]

##

```java
import java.util.Arrays;

class Main
{
    // Function to find the length of the longest subarray with alternating
    // positive and negative elements
    public static void findLongestSubarray(int[] nums)
    {
        // base case
        if (nums == null || nums.length == 0) {
            return;
        }

        // stores length of longest alternating subarray found so far
        int maxLen = 1;

        // stores ending index of longest alternating subarray found so far
        int endIndex = 0;

        // stores length of longest alternating subarray ending at the current position
        int currLen = 1;

        // traverse the given array starting from the second index
        for (int i = 1; i < nums.length; i++)
        {
            // if the current element has an opposite sign than the previous element
            if (nums[i] * nums[i - 1] < 0)
            {
                // include the current element in the longest alternating subarray
                // ending at the previous index
                currLen++;

                // update result if the current subarray length is found to be greater
                if (currLen > maxLen)
                {
                    maxLen = currLen;
                    endIndex = i;
                }
            }
            // reset length if the current element has the same sign as the previous
            // element
            else {
                currLen = 1;
            }
        }

        int[] subarray = Arrays.copyOfRange(nums, (endIndex - maxLen + 1), endIndex + 1);
        System.out.println("The longest alternating subarray is "
                            + Arrays.toString(subarray));
    }

    public static void main (String[] args)
    {
        int[] nums = { 1, -2, 6, 4, -3, 2, -4, -3 };

        findLongestSubarray(nums);
    }
}
```

##

```python3
# Function to find the length of the longest sublist with alternating
# positive and negative elements
def findLongestSublist(nums):

    # base case
    if not nums:
        return

    # stores length of longest alternating sublist found so far
    max_len = 1

    # stores ending index of longest alternating sublist found so far
    end_index = 0

    # stores length of longest alternating sublist ending at the current position
    curr_len = 1

    # traverse the given list starting from the second index
    for i in range(1, len(nums)):

        # if the current element has an opposite sign than the previous element
        if nums[i] * nums[i - 1] < 0:

            # include the current element in the longest alternating sublist ending at
            # the previous index
            curr_len = curr_len + 1

            # update result if the current sublist length is found to be greater
            if curr_len > max_len:
                max_len = curr_len
                end_index = i

        # reset length if the current element has the same sign as the previous element
        else:
            curr_len = 1

    sublist = nums[end_index - max_len + 1: end_index + 1]
    print('The longest alternating sublist is:', sublist)

if __name__ == '__main__':

    nums = [1, -2, 6, 4, -3, 2, -4, -3]
    findLongestSublist(nums)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

Because of the way the algorithm uses [optimal substructures](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) (the maximum subarray ending at each position is calculated simply from a related but smaller and overlapping subproblem: the maximum subarray ending at the previous position), this algorithm can be viewed as a simple example of [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/).

Also See:

> [Longest Alternating Subsequence Problem – II](https://www.techiedelight.com/longest-alternating-subsequence-problem/ "Longest Alternating Subsequence Problem – II")

> [Longest Bitonic Subsequence](https://www.techiedelight.com/longest-bitonic-subsequence/ "Longest Bitonic Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 212

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
