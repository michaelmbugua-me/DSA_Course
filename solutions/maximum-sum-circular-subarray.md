# Maximum Sum Circular Subarray

> Source: https://www.techiedelight.com/maximum-sum-circular-subarray/

[Array](https://www.techiedelight.com/Category/Array/)

Given a circular integer array, find a subarray with the largest sum in it.

For example,

**Input:** {**2, 1** , -5, 4, -3, 1, -3,**4, -1**} **Output:** Subarray with the largest sum is {4, -1, 2, 1} with sum 6. **Input:** {-3, 1, -3, **4, -1, 2, 1** , -5, 4} **Output:** Subarray with the largest sum is {4, -1, 2, 1} with sum 6.

> 

The problem differs from the problem of finding the maximum sum circular subsequence. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

The idea is to find the sequence which will have a maximum negative value. If we remove that minimum sum sequence from the input sequence, we will be left with the maximum sum circular sequence. Finally, return the maximum of the maximum-sum circular sequence (includes corner elements) and maximum-sum non-circular sequence.

For example, consider array `{2, 1, -5, 4, -3, 1, -3, 4, -1}`. The sequence having maximum negative value is `{-5, 4, -3, 1, -3}`, i.e., `-6`. If we remove this minimum sum sequence from the array, we will get the maximum sum circular sequence, i.e., `{2, 1, 4, -1}` having sum `6`. Since the maximum sum circular sequence is greater than the maximum sum non-circular sequence, i.e., `{4}` for the given array, it is the answer.

We can find the maximum-sum non-circular sequence in linear time by using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/). We can find a maximum-sum circular sequence by inverting the sign of all array elements and then applying Kadane’s algorithm.

For example, if we invert signs of array `{2, 1, -5, 4, -3, 1, -3, 4, -1}`, we get `{-2, -1, 5, -4, 3, -1, 3, -4, 1}` which has maximum sum sequence `{5, -4, 3, -1, 3}` having sum `6`. Now inverting the signs back, we get a minimum sum sequence `{-5, 4, -3, 1, -3}` having sum `-6`. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <numeric>
#include <algorithm>
using namespace std;

// Function to find contiguous subarray with the largest sum
// in a given set of integers
int kadane(int arr[], int n)
{
    // stores the sum of maximum subarray found so far
    int max_so_far = 0;

    // stores the maximum sum of subarray ending at the current position
    int max_ending_here = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // update the maximum sum of subarray "ending" at index `i` (by adding the
        // current element to maximum sum ending at previous index `i-1`)
        max_ending_here = max_ending_here + arr[i];

        // if the maximum sum is negative, set it to 0 (which represents
        // an empty subarray)
        max_ending_here = max(max_ending_here, 0);

        // update result if the current subarray sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

// Function to find the maximum sum circular subarray in a given array
int runCircularKadane(int arr[], int n)
{
    // empty array has sum of 0
    if (n == 0) {
        return 0;
    }

    // find the maximum element present in a given array
    int max_num = *max_element(arr, arr + n);

    // if the array contains all negative values, return the maximum element
    if (max_num < 0) {
        return max_num;
    }

    // negate all the array elements
    for (int i = 0; i < n; i++) {
        arr[i] = -arr[i];
    }

    // run Kadane’s algorithm on the modified array
    int neg_max_sum = kadane(arr, n);

    // restore the array
    for (int i = 0; i < n; i++) {
        arr[i] = -arr[i];
    }

    /* Return the maximum of the following:
        1. Sum returned by Kadane’s algorithm on the original array.
        2. Sum returned by Kadane’s algorithm on the modified array +
           the sum of all the array elements.
    */

    return max(kadane(arr, n), accumulate(arr, arr + n, 0) + neg_max_sum);
}

int main()
{
    int arr[] = { 2, 1, -5, 4, -3, 1, -3, 4, -1 };
    int n = sizeof(arr)/sizeof(arr[0]);

    cout << "The sum of the subarray with the largest sum is " <<
            runCircularKadane(arr, n);

    return 0;
}
```

**Output:** The sum of the subarray with the largest sum is 6

##

```java
import java.util.Arrays;

class Main
{
    // Function to find contiguous subarray with the largest sum
    // in a given set of integers
    public static int kadane(int[] A)
    {
        // stores the sum of maximum subarray found so far
        int max_so_far = 0;

        // stores the maximum sum of subarray ending at the current position
        int max_ending_here = 0;

        // traverse the given array
        for (int value: A)
        {
            // update the maximum sum of subarray "ending" at index `i` (by adding the
            // current element to maximum sum ending at previous index `i-1`)
            max_ending_here = max_ending_here + value;

            // if the maximum sum is negative, set it to 0 (which represents
            // an empty subarray)
            max_ending_here = Integer.max(max_ending_here, 0);

            // update result if the current subarray sum is found to be greater
            max_so_far = Integer.max(max_so_far, max_ending_here);
        }

        return max_so_far;
    }

    // Function to find the maximum sum circular subarray in a given array
    public static int runCircularKadane(int[] A)
    {
        // empty array has sum of 0
        if (A.length == 0) {
            return 0;
        }

        // find the maximum element present in a given array
        int max = Arrays.stream(A).max().getAsInt();

        // if the array contains all negative values, return the maximum element
        if (max < 0) {
            return max;
        }

        // negate all the array elements
        Arrays.setAll(A, i -> -A[i]);

        // run Kadane’s algorithm on the modified array
        int neg_max_sum = kadane(A);

        // restore the array
        Arrays.setAll(A, i -> -A[i]);

        /* Return the maximum of the following:
            1. Sum returned by Kadane’s algorithm on the original array.
            2. Sum returned by Kadane’s algorithm on the modified array +
               the sum of all the array elements.
        */

        return Integer.max(kadane(A), Arrays.stream(A).sum() + neg_max_sum);
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 1, -5, 4, -3, 1, -3, 4, -1 };

        System.out.println("The sum of the subarray with the largest sum is " +
                runCircularKadane(A));
    }
}
```

##

```python3
# Function to find contiguous sublist with the largest sum
# in a given set of integers
def kadane(A):

    # stores the sum of maximum sublist found so far
    max_so_far = 0

    # stores the maximum sum of sublist ending at the current position
    max_ending_here = 0

    # traverse the given list
    for i in range(len(A)):

        # update the maximum sum of sublist "ending" at index `i` (by adding the
        # current element to maximum sum ending at previous index `i-1`)
        max_ending_here = max_ending_here + A[i]

        # if the maximum sum is negative, set it to 0 (which represents
        # an empty sublist)
        max_ending_here = max(max_ending_here, 0)

        # update result if the current sublist sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# Function to find the maximum sum circular sublist in a given list
def runCircularKadane(A):

    # empty array has sum of 0
    if len(A) == 0:
        return 0

    # find the maximum element present in a given list
    maximum = max(A)

    # if the list contains all negative values, return the maximum element
    if maximum < 0:
        return maximum

    # negate all elements in the list
    for i in range(len(A)):
        A[i] = -A[i]

    # run Kadane’s algorithm on the modified list
    neg_max_sum = kadane(A)

    # restore the list
    for i in range(len(A)):
        A[i] = -A[i]

    ''' return the maximum of the following:
        1. Sum returned by Kadane’s algorithm on the original list.
        2. Sum returned by Kadane’s algorithm on modified list +
           the sum of all elements in the list.
    '''

    return max(kadane(A), sum(A) + neg_max_sum)

if __name__ == '__main__':

    A = [2, 1, -5, 4, -3, 1, -3, 4, -1]

    print("The sum of the sublist with the largest sum is", runCircularKadane(A))
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Maximum Sum Subarray Problem (Kadane’s Algorithm)](https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/ "Maximum Sum Subarray Problem \(Kadane’s Algorithm\)")

> [Print continuous subarray with maximum sum](https://www.techiedelight.com/print-continuous-subarray-with-maximum-sum/ "Print continuous subarray with maximum sum")

> [Find the maximum absolute difference between the sum of two non-overlapping subarrays](https://www.techiedelight.com/find-maximum-absolute-difference-subarrays/ "Find the maximum absolute difference between the sum of two non-overlapping subarrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
