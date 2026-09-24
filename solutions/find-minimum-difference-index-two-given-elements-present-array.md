# Find the minimum difference between the index of two given elements present in an array

> Source: https://www.techiedelight.com/find-minimum-difference-index-two-given-elements-present-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array `nums` and two integers `x` and `y` present in it, find the minimum absolute difference between indices of `x` and `y` in a single traversal of the array.

For example,

**Input:** arr = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 } x = 3, y = 2 **Output:** 2 **Explanation:** Element 3 is present at index 1 and 7, and element 2 is present at index 5. Their minimum absolute difference is min(abs(1-5), abs(7-5)) = 2 **Input:** arr = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 } x = 2, y = 5 **Output:** 3 **Explanation:** Element 2 is present at index 5, and element 5 is present at index 2 and 9. Their minimum absolute difference is min(abs(5-2), abs(5-9)) = 3

> 

The idea is to traverse the array and keep track of the last occurrence of `x` and `y`.

  1. If the current element is `x`, find the absolute difference between the current index of `x` and the index of the last occurrence of `y` and update the result if required.
  2. If the current element is `y`, find the absolute difference between the current index of `y` and the index of the last occurrence of `x` and update the result if required.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>
#include <math.h>

// Utility function to find a minimum of two integers
int min (int x, int y) {
    return (x < y) ? x : y;
}

// Function to find the minimum difference between the index of two
// elements `x` and `y` present in an array
int findMinDifference(int arr[], int n, int x, int y)
{
    // base case
    if (n <= 1) {
        return 0;
    }

    int x_index = n, y_index = n;
    int min_diff = INT_MAX;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // if the current element is `x`
        if (arr[i] == x)
        {
            // set `x_index` to the current index
            x_index = i;

            // if `y` is seen before, update the result if required
            if (y_index != n) {
                min_diff = min(min_diff, abs(x_index - y_index));
            }
        }

        // if the current element is `y`
        if (arr[i] == y)
        {
            // set `y_index` to the current index
            y_index = i;

            // if `x` is seen before, update the result if required
            if (x_index != n) {
                min_diff = min(min_diff, abs(x_index - y_index));
            }
        }
    }

    return min_diff;
}

int main(void)
{
    int arr[] = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 };
    int x = 2, y = 5;

    int n = sizeof(arr) / sizeof(arr[0]);
    int diff = findMinDifference(arr, n, x, y);

    if (diff != INT_MAX) {
        printf("The minimum difference is %d", diff);
    }
    else {
        printf("Invalid input");
    }

    return 0;
}
```

**Output:** The minimum difference is 3

##

```java
class Main
{
    // Function to find the minimum difference between the index of two
    // elements `x` and `y` present in the array
    public static int findMinDifference(int[] A, int x, int y)
    {
        int n = A.length;

        // base case
        if (n <= 1) {
            return 0;
        }

        int x_index = n, y_index = n;
        int min_diff = Integer.MAX_VALUE;

        // traverse the given array
        for (int i = 0; i < n; i++)
        {
            // if the current element is `x`
            if (A[i] == x)
            {
                // set `x_index` to the current index
                x_index = i;

                // if `y` is seen before, update the result if required
                if (y_index != n)
                {
                    min_diff = Integer.min(min_diff, Math.abs(x_index - y_index));
                }
            }

            // if the current element is `y`
            if (A[i] == y)
            {
                // set `y_index` to the current index
                y_index = i;

                // if `x` is seen before, update the result if required
                if (x_index != n)
                {
                    min_diff = Integer.min(min_diff, Math.abs(x_index - y_index));
                }
            }
        }

        return min_diff;
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 };
        int x = 2, y = 5;

        int diff = findMinDifference(A, x, y);

        if (diff != Integer.MAX_VALUE) {
            System.out.print("The minimum difference is " + diff);
        }
        else {
            System.out.print("Invalid input");
        }
    }
}
```

##

```python3
import sys

# Function to find the minimum difference between the index of two
# elements `x` and `y` present in a list
def findMinDifference(A, x, y):

    # base case
    if len(A) <= 1:
        return 0

    x_index = y_index = len(A)
    min_diff = sys.maxsize

    # traverse the given list
    for i in range(len(A)):

        # if the current element is `x`
        if A[i] == x:
            # set `x_index` to the current index
            x_index = i

            # if `y` is seen before, update the result if required
            if y_index != len(A):
                min_diff = min(min_diff, abs(x_index - y_index))

        # if the current element is `y`
        if A[i] == y:
            # set `y_index` to the current index
            y_index = i

            # if `x` is seen before, update the result if required
            if x_index != len(A):
                min_diff = min(min_diff, abs(x_index - y_index))

    return min_diff

if __name__ == '__main__':

    A = [1, 3, 5, 4, 8, 2, 4, 3, 6, 5]
    x = 2
    y = 5

    diff = findMinDifference(A, x, y)

    if diff != sys.maxsize:
        print("The minimum difference is", diff)
    else:
        print("Invalid input")
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find a pair with a minimum absolute sum in an array](https://www.techiedelight.com/find-pair-array-minimum-absolute-sum/ "Find a pair with a minimum absolute sum in an array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
