# Find the smallest subarray length whose sum of elements is greater than `k`

> Source: https://www.techiedelight.com/length-of-smallest-subarray-with-sum-greater-number/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of positive integers, find the smallest subarray’s length whose sum of elements is greater than a given number `k`.

For example,

**Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 20 **Output:** The smallest subarray length is 3 **Explanation:** The smallest subarray with sum > 20 is {6, 7, 8} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 7 **Output:** The smallest subarray length is 1 **Explanation:** The smallest subarray with sum > 7 is {8} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 21 **Output:** The smallest subarray length is 4 **Explanation:** The smallest subarray with sum > 21 is {4, 5, 6, 7} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 40 **Output:** No subarray exists

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements. Also note that we don’t have to print the subarray but return its length.

We can solve this problem by using a [sliding window](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window that ends at the current element, and the sum of its elements is less than or equal to the given sum. If the current window’s sum becomes more than the given sum at any point of time, then the window is unstable and continue removing elements from the window’ left till it becomes stable again. Also update the result if the unstable window’s length is less than the minimum found so far. The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Utility function to find a minimum of two numbers
int min(int x, int y) {
    return (x < y) ? x : y;
}

// Function to find the length of the smallest subarray whose sum
// of elements is greater than the given number
int findSmallestSubarrayLen(int arr[], int n, int k)
{
    // stores the current window sum
    int windowSum = 0;

    // stores the result
    int len = INT_MAX;

    // stores the window's starting index
    int left = 0;

    // maintain a sliding window `[left…right]`
    for (int right = 0; right < n; right++)
    {
        // include the current element in the window
        windowSum += arr[right];

        // the window becomes unstable if its sum becomes more than `k`
        while (windowSum > k && left <= right)
        {
            // update the result if the current window's length is less than the
            // minimum found so far
            len = min(len, right - left + 1);

            // remove elements from the window's left side till the window
            // becomes stable again
            windowSum -= arr[left];
            left++;
        }
    }

    // invalid input
    if (len == INT_MAX) {
        return 0;
    }

    // return result
    return len;
}

int main()
{
    // an array of positive numbers
    int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
    int k = 21;

    int n = sizeof(arr) / sizeof(arr[0]);

    // find the length of the smallest subarray
    int len = findSmallestSubarrayLen(arr, n, k);

    if (len != INT_MAX) {
        printf("The smallest subarray length is %d", len);
    }
    else {
        printf("No subarray exists");
    }

    return 0;
}
```

**Output:** The smallest subarray length is 4

##

```java
class Main
{
    // Function to find the length of the smallest subarray whose sum
    // of elements is greater than the given number
    public static int findSmallestSubarrayLen(int[] A, int k)
    {
        // stores the current window sum
        int windowSum = 0;

        // stores the result
        int len = Integer.MAX_VALUE;

        // stores the window's starting index
        int left = 0;

        // maintain a sliding window `[left…right]`
        for (int right = 0; right < A.length; right++)
        {
            // include the current element in the window
            windowSum += A[right];

            // the window becomes unstable if its sum becomes more than `k`
            while (windowSum > k && left <= right)
            {
                // update the result if the current window's length is less than the
                // minimum found so far
                len = Integer.min(len, right - left + 1);

                // remove elements from the window's left side till the window
                // becomes stable again
                windowSum -= A[left];
                left++;
            }
        }

        // invalid input
        if (len == Integer.MAX_VALUE) {
            return 0;
        }

        // return result
        return len;
    }

    public static void main(String[] args)
    {
        // an array of positive numbers
        int[] A = {1, 2, 3, 4, 5, 6, 7, 8};
        int k = 21;

        // find the length of the smallest subarray
        int len = findSmallestSubarrayLen(A, k);

        if (len != Integer.MAX_VALUE) {
            System.out.print("The smallest subarray length is " + len);
        }
        else {
            System.out.print("No subarray exists");
        }
    }
}
```

##

```python3
import sys

# Function to find the length of the smallest sublist whose sum
# of elements is greater than the given number
def findSmallestSublistLen(A, k):

    # stores the current window sum
    windowSum = 0

    # stores the result
    length = sys.maxsize

    # stores the window's starting index
    left = 0

    # maintain a sliding window `[left…right]`
    for right in range(len(A)):

        # include the current element in the window
        windowSum += A[right]

        # the window becomes unstable if its sum becomes more than `k`
        while windowSum > k and left <= right:

            # update the result if the current window's length is less than the
            # minimum found so far
            length = min(length, right - left + 1)

            # remove elements from the window's left side till the window
            # becomes stable again
            windowSum -= A[left]
            left = left + 1

    # invalid input
    if length == sys.maxsize:
        return 0

    # return result
    return length

if __name__ == '__main__':

    # a list of positive numbers
    A = [1, 2, 3, 4, 5, 6, 7, 8]
    k = 21

    # find the length of the smallest sublist
    length = findSmallestSublistLen(A, k)

    if length != sys.maxsize:
        print("The smallest sublist length is", length)
    else:
        print("No sublist exists")
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find minimum sum subarray of size `k`](https://www.techiedelight.com/find-minimum-sum-subarray-given-size-k/ "Find minimum sum subarray of size `k`")

> [Find a subarray having the given sum in an integer array](https://www.techiedelight.com/find-subarray-having-given-sum-given-array/ "Find a subarray having the given sum in an integer array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 289

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
