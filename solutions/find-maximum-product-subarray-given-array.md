# Maximum Product Subarray Problem

> Source: https://www.techiedelight.com/find-maximum-product-subarray-given-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the subarray that has the maximum product of its elements. The solution should return the maximum product of elements among all possible subarrays.

For example,

**Input:** { -6, 4, -5, 8, -10, 0, 8 } **Output:** 1600 **Explanation:** The maximum product subarray is {4, -5, 8, -10} having product 1600 **Input:** { 40, 0, -20, -10 } **Output:** 200 **Explanation:** The maximum product subarray is {-20, -10} having product 200

> 

The problem differs from the problem of finding the maximum product subsequence. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution would be to consider every subarray and find the product of their elements. Finally, return the maximum product found among all subarrays. The implementation can be seen [here](https://techiedelight.com/compiler/?run=fTvS9Q). The time complexity of this solution is O(n2), where `n` is the size of the input.

A better solution will be to maintain two variables to store the maximum and minimum product ending in the current position. Then traverse the array once, and for every index `i` in the array, update the maximum and minimum product ending at `A[i]`. Update the result if the maximum product ending at any index is more than the maximum product found so far.

Following is the C, Java, and Python implementation based on the above idea:

```c
#include <stdio.h>

// Utility function to find a minimum of two numbers
int min(int x, int y) {
    return (x < y) ? x : y;
}

// Utility function to find a maximum of two numbers
int max(int x, int y) {
    return (x > y) ? x : y;
}

// Function to return the maximum product of a subarray of a given array
int findMaxProduct(int arr[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // maintain two variables to store the maximum and minimum product
    // ending at the current index
    int max_ending = arr[0], min_ending = arr[0];

    // to store the maximum product subarray found so far
    int max_so_far = arr[0];

    // traverse the given array
    for (int i = 1; i < n; i++)
    {
        int temp = max_ending;

        // update the maximum product ending at the current index
        max_ending = max(arr[i], max(arr[i] * max_ending, arr[i] * min_ending));

        // update the minimum product ending at the current index
        min_ending = min(arr[i], min(arr[i] * temp, arr[i] * min_ending));

        max_so_far = max(max_so_far, max_ending);
    }

    // return maximum product
    return max_so_far;
}

int main(void)
{
    int arr[] = { -6, 4, -5, 8, -10, 0, 8 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("The maximum product of a subarray is %d",
            findMaxProduct(arr, n));

    return 0;
}
```

**Output:** The maximum product of a subarray is 1600

##

```java
class Main
{
    // Function to return the maximum product of a subarray of a given array
    public static int findMaxProduct(int[] A)
    {
        // base case
        if (A.length == 0) {
            return 0;
        }

        // maintain two variables to store the maximum and minimum product
        // ending at the current index
        int max_ending = A[0], min_ending = A[0];

        // to store the maximum product subarray found so far
        int max_so_far = A[0];

        // traverse the given array
        for (int i = 1; i < A.length; i++)
        {
            int temp = max_ending;

            // update the maximum product ending at the current index
            max_ending = Integer.max(A[i], Integer.max(A[i] * max_ending,
                                                A[i] * min_ending));

            // update the minimum product ending at the current index
            min_ending = Integer.min(A[i], Integer.min(A[i] * temp,
                                                A[i] * min_ending));

            max_so_far = Integer.max(max_so_far, max_ending);
        }

        // return maximum product
        return max_so_far;
    }

    public static void main(String[] args)
    {
        int[] A = { -6, 4, -5, 8, -10, 0, 8 };

        System.out.print("The maximum product of a subarray is " + findMaxProduct(A));
    }
}
```

##

```python3
# Function to return the maximum product of a sublist of a given list
def findMaxProduct(A):

    # base case
    if not len(A):
        return 0

    # maintain two variables to store the maximum and minimum product
    # ending at the current index
    max_ending = min_ending = A[0]

    # to store the maximum product sublist found so far
    max_so_far = A[0]

    # traverse the given list
    for i in range(1, len(A)):
        temp = max_ending

        # update the maximum product ending at the current index
        max_ending = max(A[i], max(A[i] * max_ending, A[i] * min_ending))

        # update the minimum product ending at the current index
        min_ending = min(A[i], min(A[i] * temp, A[i] * min_ending))

        max_so_far = max(max_so_far, max_ending)

    # return maximum product
    return max_so_far

if __name__ == '__main__':

    A = [-6, 4, -5, 8, -10, 0, 8]
    print("The maximum product of a sublist is", findMaxProduct(A))
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

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

Average rating 4.62/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
