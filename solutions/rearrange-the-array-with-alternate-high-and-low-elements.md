# Rearrange an array with alternate high and low elements

> Source: https://www.techiedelight.com/rearrange-the-array-with-alternate-high-and-low-elements/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, rearrange it such that every second element becomes greater than its left and right elements. Assume no duplicate elements are present in the array.

For example,

**Input:** {1, 2, 3, 4, 5, 6, 7} **Output:** {1, 3, 2, 5, 4, 7, 6} **Input:** {9, 6, 8, 3, 7} **Output:** {6, 9, 3, 8, 7} **Input:** {6, 9, 2, 5, 1, 4} **Output:** {6, 9, 2, 5, 1, 4}

> 

A simple solution would be to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order first. Then take another auxiliary array and fill it with elements starting from the sorted array’s two endpoints in alternate order. Following is the complete algorithm:

**RearrangeArray(arr[], n)**

  1. Sort the array in ascending order.
  2. Take two index variables i and j to that point to two endpoints of the array (i.e., i = 0 and j = n-1).
  3. Create an auxiliary array A[] and initialize an index k with 0.
  4. Do while (i < j) A[k++] = arr[i++] A[k++] = arr[j–]
  5. Print A[].

The time complexity of this solution is O(n.log(n)) and doesn’t require any extra space, where `n` is the size of the input.

An efficient solution doesn’t involve sorting the array or the use of extra space. The idea is to start from the second array element and increment the index by 2 for each loop’s iteration. If the last element is greater than the current element, swap the elements. Similarly, if the next element is greater than the current element, swap both elements. At the end of the loop, we will get the desired array that satisfies given constraints.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

// Utility function to swap elements `arr[i]` and `arr[j]` in an array
void swap(int arr[], int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to rearrange the array such that every second element
// of the array is greater than its left and right elements
void rearrangeArray(int arr[], int n)
{
    // start from the second element and increment index
    // by 2 for each iteration of the loop
    for (int i = 1; i < n; i += 2)
    {
        // if the previous element is greater than the current element,
        // swap the elements
        if (arr[i - 1] > arr[i]) {
            swap(arr, i - 1, i);
        }

        // if the next element is greater than the current element,
        // swap the elements
        if (i + 1 < n && arr[i + 1] > arr[i]) {
            swap(arr, i + 1, i);
        }
    }
}

int main(void)
{
    int arr[] = { 9, 6, 8, 3, 7 };
    int n = sizeof(arr) / sizeof(arr[0]);

    rearrangeArray(arr, n);

    // print output array
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 6 9 3 8 7

##

```java
import java.util.Arrays;

class Main
{
    // Utility function to swap elements `A[i]` and `A[j]` in the array
    private static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Function to rearrange the array such that every second element
    // of the array is greater than its left and right elements
    public static void rearrangeArray(int[] A)
    {
        // start from the second element and increment index
        // by 2 for each iteration of the loop
        for (int i = 1; i < A.length; i += 2)
        {
            // if the previous element is greater than the current element,
            // swap the elements
            if (A[i - 1] > A[i]) {
                swap(A, i - 1, i);
            }

            // if the next element is greater than the current element,
            // swap the elements
            if (i + 1 < A.length && A[i + 1] > A[i]) {
                swap(A, i + 1, i);
            }
        }
    }

    public static void main (String[] args)
    {
        int[] A = { 9, 6, 8, 3, 7 };

        rearrangeArray(A);

        // print output array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Utility function to swap elements `A[i]` and `A[j]` in the list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to rearrange the list such that every second element
# of the list is greater than its left and right elements
def rearrangeArray(A):

    # start from the second element and increment index
    # by 2 for each iteration of the loop
    for i in range(1, len(A), 2):

        # if the previous element is greater than the current element,
        # swap the elements
        if A[i - 1] > A[i]:
            swap(A, i - 1, i)

        # if the next element is greater than the current element,
        # swap the elements
        if i + 1 < len(A) and A[i + 1] > A[i]:
            swap(A, i + 1, i)

if __name__ == '__main__':

    A = [9, 6, 8, 3, 7]

    rearrangeArray(A)

    # print output list
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

Also See:

> [Rearrange an array such that it contains alternate positive and negative numbers](https://www.techiedelight.com/rearrange-array-positive-negative-numbers-alternate-positions/ "Rearrange an array such that it contains alternate positive and negative numbers")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 185

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
