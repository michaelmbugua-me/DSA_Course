# Print continuous subarray with maximum sum

> Source: https://www.techiedelight.com/print-continuous-subarray-with-maximum-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find and print a contiguous subarray with the maximum sum in it.

For example,

**Input:** {-2, 1, -3, 4, -1, 2, 1, -5, 4} **Output:** The contiguous subarray with the largest sum is {4, -1, 2, 1} **Input:** {8, -7, -3, 5, 6, -2, 3, -4, 2} **Output:** The contiguous subarray with the largest sum is {5, 6, -2, 3}

> 

We can easily solve this problem in linear time by maintaining the maximum subarray sum ending at each array index. Then,

  * The subarray is either empty in which case its sum is zero, or
  * It consists of one more element than the maximum subarray ending at the previous index.

We have already discussed this approach using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/), but that only output the sum of contiguous subarray having the largest sum but do not print the subarray itself. We can easily modify the algorithm to keep track of the maximum subarray’s starting and ending indices. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Function to print contiguous subarray with the largest sum
// in a given set of integers
void kadane(int arr[], int n)
{
    // base case
    if (n <= 0) {
        return;
    }

    // stores maximum sum subarray found so far
    int max_so_far = INT_MIN;

    // stores the maximum sum of subarray ending at the current position
    int max_ending_here = 0;

    // stores endpoints of maximum sum subarray found so far
    int start = 0, end = 0;

    // stores starting index of a positive-sum sequence
    int beg = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // update the maximum sum of subarray "ending" at index `i`
        max_ending_here = max_ending_here + arr[i];

        // if the maximum sum becomes less than the current element,
        // start from the current element
        if (max_ending_here < arr[i])
        {
            max_ending_here = arr[i];
            beg = i;
        }

        // update result if the current subarray sum is found to be greater
        if (max_so_far < max_ending_here)
        {
            max_so_far = max_ending_here;
            start = beg;
            end = i;
        }
    }

    cout << "The contiguous subarray with the largest sum is ";
    for (int i = start; i <= end; i++) {
        cout << arr[i] << " ";
    }
}

int main()
{
    int arr[] = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
    int n = sizeof(arr)/sizeof(arr[0]);

    kadane(arr, n);

    return 0;
}
```

**Output:** The contiguous subarray with the largest sum is 4 -1 2 1

##

```java
import java.util.Arrays;

class Main
{
    // Function to print contiguous subarray with the largest sum
    // in a given set of integers
    public static int[] kadane(int[] A)
    {
        // base case
        if (A.length <= 1) {
            return A;
        }

        // stores the maximum sum subarray found so far
        int maxSoFar = Integer.MIN_VALUE;

        // stores the maximum sum of subarray ending at the current position
        int maxEndingHere = 0;

        // stores endpoints of maximum sum subarray found so far
        int start = 0, end = 0;

        // stores starting index of a positive-sum sequence
        int beg = 0;

        // traverse the given array
        for (int i = 0; i < A.length; i++)
        {
            // update the maximum sum of subarray "ending" at index `i`
            maxEndingHere = maxEndingHere + A[i];

            // if the maximum sum becomes less than the current element,
            // start from the current element
            if (maxEndingHere < A[i])
            {
                maxEndingHere = A[i];
                beg = i;
            }

            // update result if the current subarray sum is found to be greater
            if (maxSoFar < maxEndingHere)
            {
                maxSoFar = maxEndingHere;
                start = beg;
                end = i;
            }
        }

        return Arrays.copyOfRange(A, start, end + 1);
    }

    public static void main(String[] args)
    {
        int[] A = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

        int slice[] = kadane(A);
        System.out.print("The contiguous subarray with the largest sum is " +
                Arrays.toString(slice));
    }
}
```

##

```python3
import sys

# Function to print contiguous sublist with the largest sum
# in a given set of integers
def kadane(A):

    # base case
    if len(A) <= 1:
        return A

    # stores the maximum sum sublist found so far
    maxSoFar = -sys.maxsize

    # stores the maximum sum of sublist ending at the current position
    maxEndingHere = 0

    # stores endpoints of maximum sum sublist found so far
    start = 0
    end = 0

    # stores starting index of a positive-sum sequence
    beg = 0

    # traverse the given list
    for i in range(len(A)):

        # update the maximum sum of sublist "ending" at index `i`
        maxEndingHere = maxEndingHere + A[i]

        # if the maximum sum becomes less than the current element,
        # start from the current element
        if maxEndingHere < A[i]:
            maxEndingHere = A[i]
            beg = i

        # update result if the current sublist sum is found to be greater
        if maxSoFar < maxEndingHere:
            maxSoFar = maxEndingHere
            start = beg
            end = i

    print("The contiguous sublist with the largest sum is", A[start: end + 1])

if __name__ == '__main__':

    A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    kadane(A)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

Also See:

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

> [Maximum Sum Subarray Problem (Kadane’s Algorithm)](https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/ "Maximum Sum Subarray Problem \(Kadane’s Algorithm\)")

> [Find the maximum absolute difference between the sum of two non-overlapping subarrays](https://www.techiedelight.com/find-maximum-absolute-difference-subarrays/ "Find the maximum absolute difference between the sum of two non-overlapping subarrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 183

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
