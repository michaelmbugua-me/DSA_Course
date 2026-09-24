# Find the index that divides an array into two non-empty subarrays with equal sum

> Source: https://www.techiedelight.com/find-index-that-divides-array-non-empty-subarrays-equal-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find an index that divides it into two non-empty subarrays having an equal sum.

For example, consider array `{-1, 6, 3, 1, -2, 3, 3}`. The element 3 at index 2 divides it into two non-empty subarrays `{-1, 6}` and `{1, -2, 3, 3}` having the same sum. Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

> 

A naive solution would calculate the sum of the left and right subarray for each array element and print the index if both sums are the same. The time complexity of this approach O(n2), where `n` is the size of the input.

We can solve this problem in O(n) time by using extra space. The idea is to preprocess the array and store the sum of every index’s left and right subarray in two auxiliary arrays. Then we can calculate the left and right sum in constant time for any index.

To improve the space complexity to constant, preprocess the given array and store the sum of all array elements in a variable. Then traverse the array and maintain another variable to store the left subarray sum till the current item. Now we can calculate the right subarray sum in constant time by using the following formula:

> Right subarray sum = Sum of all elements – (Current element + Left subarray sum)

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find index `i` in an array such that the sum of the left
// subarray of `A[i]` is equal to the sum of its right subarray
void findBreakPoint(int A[], int n)
{
    // base case
    if (n == 0) {
        return;
    }

    int total = 0;

    // calculate the sum of all array elements
    for (int i = 0; i < n; i++) {
        total += A[i];
    }

    // stores sum of the left subarray
    int left_sum = A[0];

    // start from index 1 to find non-empty subarrays
    for (int i = 1; i < n - 1; i++)
    {
        // if the sum of `A[0…i-1]` is equal to `A[i+1, n-1]`
        if (left_sum == total - (A[i] + left_sum)) {
            printf("The index is %d\n", i);
        }

        // update the left subarray sum
        left_sum += A[i];
    }
}

int main(void)
{
    int A[] = { -1, 6, 3, 1, -2, 3, 3 };
    int n = sizeof(A)/sizeof(A[0]);

    // divide the array into two non-empty subarrays with equal sum
    findBreakPoint(A, n);

    return 0;
}
```

**Output:** The index is 2

##

```java
import java.util.stream.IntStream;

class Main
{
    // Function to find index `i` in the array such that the sum of the left
    // subarray of `A[i]` is equal to the sum of its right subarray
    public static void findBreakPoint(int[] A)
    {
        // base case
        if (A.length == 0) {
            return;
        }

        // calculate the sum of all array elements
        int total = IntStream.of(A).sum();

        // stores sum of the left subarray
        int left_sum = A[0];

        // start from index 1 to find non-empty subarrays
        for (int i = 1; i < A.length - 1; i++)
        {
            // if the sum of `A[0…i-1]` is equal to `A[i+1, n-1]`
            if (left_sum == total - (A[i] + left_sum)) {
                System.out.println("The index is " + i);
            }

            // update the left subarray sum
            left_sum += A[i];
        }
    }

    public static void main(String[] args)
    {
        int[] A = { -1, 6, 3, 1, -2, 3, 3 };

        // divide the array into two non-empty subarrays with equal sum
        findBreakPoint(A);
    }
}
```

##

```python3
# Function to find index `i` in the list such that the sum of the left
# sublist of `A[i]` is equal to the sum of its right sublist
def findBreakPoint(A):

    # base case
    if not len(A):
        return -1

    # calculate the sum of all list elements
    total = sum(A)

    # stores sum of the left sublist
    left_sum = A[0]

    # start from index 1 to find non-empty sublists
    for i in range(1, len(A) - 1):

        # if the sum of `A[0…i-1]` is equal to `A[i+1, n-1]`
        if left_sum == total - (A[i] + left_sum):
            print("Index is", i)

        # update the left sublist sum
        left_sum += A[i]

if __name__ == '__main__':

    A = [-1, 6, 3, 1, -2, 3, 3]

    # divide the list into two non-empty sublists with equal sum
    findBreakPoint(A)
```

Also See:

> [Partition an array into two subarrays with the same sum](https://www.techiedelight.com/partition-array-into-two-sub-arrays-with-same-sum/ "Partition an array into two subarrays with the same sum")

> [Print all subarrays with 0 sum](https://www.techiedelight.com/find-sub-array-with-0-sum/ "Print all subarrays with 0 sum")

> [Find the largest subarray having an equal number of 0’s and 1’s](https://www.techiedelight.com/find-maximum-length-sub-array-equal-number-0s-1s/ "Find the largest subarray having an equal number of 0’s and 1’s")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 191

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
