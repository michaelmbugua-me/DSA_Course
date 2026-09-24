# Reverse every consecutive `m`-elements of a subarray

> Source: https://www.techiedelight.com/reverse-every-consecutive-m-elements-given-subarray/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array, reverse every group of consecutive `m` elements in a given subarray of it.

For example,

Consider the below array. A[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }, m = 3 Then for subarray `[i, j]`, where `i` and `j` is **Input:** i = 1, j = 7 or 8 **Output:** [1, 4, 3, 2, 7, 6, 5, 8, 9, 10] **Input:** i = 1, j = 9 **Output:** [1, 4, 3, 2, 7, 6, 5, 10, 9, 8] **Input:** i = 3, j = 5 **Output:** [1, 2, 3, 6, 5, 4, 7, 8, 9, 10] **Input:** i = 3, j = 4 **Output:** [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

> 

The solution can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to swap elements `A[i]` and `A[j]` in an array
void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Utility function to find a minimum of two numbers
int min(int x, int y) {
    return (x < y) ? x : y;
}

// Utility function to reverse subarray `arr[i, j]`
void reverse_subarray(int arr[], int i, int j)
{
    while (i < j)
    {
        swap(arr, i, j);
        i++, j--;
    }
}

// Function to reverse every consecutive `m` elements of
// subarray `arr[beg, end]`
void reverse(int arr[], int beg, int end, int m)
{
    // base case
    if (m <= 1) {
        return;
    }

    // return if the subarray length is less than `m`
    if (m > end - beg + 1) {
        return;
    }

    // reverse every consecutive `m` elements
    for (int i = beg; i <= end; i = i + m)
    {
        // check if subarray length is at least `m`
        if (i + m - 1 <= end) {
            reverse_subarray(arr, i, i + m - 1);
        }
    }
}

// Utility function to print given array
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

int main()
{
    int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int m = 3;
    int beg = 1, end = 8;

    int n = sizeof(arr) / sizeof(arr[0]);

    // reverse the array
    reverse(arr, beg, min(end, n - 1), m);

    // print the modified array
    printArray(arr, n);

    return 0;
}
```

**Output:** 1 4 3 2 7 6 5 8 9 10

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

    // Utility function to reverse subarray `arr[i, j]`
    public static void reverse (int[] A, int i, int j)
    {
        if (i >= j) {
            return;
        }

        // otherwise, swap two elements
        swap(A, i, j);

        // recur for the next pair
        reverse(A, i + 1, j - 1);
    }

    // Function to reverse every consecutive `m` elements of
    // subarray `arr[beg, end]`
    public static void reverse(int[] A, int beg, int end, int m)
    {
        // base case
        if (m <= 1) {
            return;
        }

        // return if the subarray length is less than `m`
        if (m > end - beg + 1) {
            return;
        }

        // reverse every consecutive `m` elements
        for (int i = beg; i <= end; i = i + m)
        {
            // check if subarray length is at least `m`
            if (i + m - 1 <= end) {
                reverse(A, i, i + m - 1);
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int m = 3;
        int beg = 1, end = 8;

        // reverse the array
        reverse(A, beg, Math.min(end, A.length - 1), m);

        // print the modified array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Utility function to swap elements `A[i]` and `A[j]` in
def swap(A, i, j):
    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Utility function to reverse `[i, j]`
def reverse(A, i, j):
    if i >= j:
        return

    # otherwise, swap two elements
    swap(A, i, j)

    # recur for the next pair
    reverse(A, i + 1, j - 1)

# Function to reverse every consecutive `m` elements of `[beg, end]`
def rev(A, beg, end, m):

    # base case
    if m <= 0:
        return

    # return if the length is less than `m`
    if m > end - beg + 1:
        return

    # reverse every consecutive `m` elements
    for i in range(beg, end + 1, m):
        # check if the length is at least `m`
        if i + m - 1 <= end:
            reverse(A, i, i + m - 1)

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    m = 3

    (beg, end) = (1, 8)

    # reverse
    rev(A, beg, min(end, len(A) - 1), m)

    # print the modified
    print(A)
```

The time complexity of the above solution is O(n), where `n` is the size of the input. Since we pass the subarray’s endpoints (we want to reverse) to the second reverse function, and the subarray size would be exactly `m`, its complexity would be O(m). Inside the main reverse function, there will be exactly `n/m` calls made to the second reverse function so that the overall time complexity will be `m×(n/m) = O(n)`. The auxiliary space required by the program is O(n) for recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 116

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
