# Exponential search

> Source: https://www.techiedelight.com/exponential-search/

Given a sorted array of `n` integers and a target value, determine if the target exists in the array or not in logarithmic time. If the target exists in the array, return the index of it.

For example,

**Input:** A[] = [2, 3, 5, 7, 9] target = 7 **Output:** Element found at index 3 **Input:** A[] = [1, 4, 5, 8, 9] target = 2 **Output:** Element not found

> 

Exponential search is an algorithm used for searching sorted, unbounded/infinite arrays. The idea is to determine a range that the target value resides in and perform a [binary search](https://techiedelight.com/binary-search/) within that range. Assuming that the array is sorted in ascending order, _it looks for the first exponent,`k`, where the value `2k` is greater than the search key_. Now `2k` and `2k-1` becomes the upper bound and lower bound for the binary search algorithm, respectively.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to find a minimum of two numbers
int min(int x, int y) {
    return (x < y) ? x : y;
}

// Binary search algorithm to return the position of key `x` in subarray A[low…high]
int binarySearch(int A[], int low, int high, int x)
{
    // base condition (search space is exhausted)
    if (low > high) {
        return -1;
    }

    // find the mid-value in the search space and
    // compares it with the key

    int mid = (low + high)/2;        // overflow can happen
    // int mid = low + (high - low)/2;

    // base condition (a key is found)
    if (x == A[mid]) {
        return mid;
    }

    // discard all elements in the right search space,
    // including the middle element
    else if (x < A[mid]) {
        return binarySearch(A, low, mid - 1, x);
    }

    // discard all elements in the left search space,
    // including the middle element
    else {
        return binarySearch(A, mid + 1, high, x);
    }
}

// Returns the position of key `x` in a given array `A` of length `n`
int exponentialSearch(int A[], int n, int x)
{
    // base case
    if (n == 0) {
        return -1;
    }

    int bound = 1;

    // find the range in which key `x` would reside
    while (bound < n && A[bound] < x) {
        bound *= 2;        // calculate the next power of 2
    }

    // call binary search on A[bound/2 … min(bound, n-1)]
    return binarySearch(A, bound/2, min(bound, n - 1), x);
}

// Exponential search algorithm
int main(void)
{
    int A[] = {2, 5, 6, 8, 9, 10};
    int target = 9;

    int n = sizeof(A)/sizeof(A[0]);
    int index = exponentialSearch(A, n, target);

    if (index != -1) {
        printf("Element found at index %d", index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** Element found at index 4

##

```java
class Main
{
    // Binary search algorithm to return the position of key `x` in
    // subarray A[left…right]
    private static int binarySearch(int[] A, int left, int right, int x)
    {
        // base condition (search space is exhausted)
        if (left > right) {
            return -1;
        }

        // find the mid-value in the search space and
        // compares it with the key

        int mid = (left + right) / 2;

        // overflow can happen. Use
        // int mid = left + (right - left) / 2;

        // base condition (a key is found)
        if (x == A[mid]) {
            return mid;
        }

        // discard all elements in the right search space,
        // including the middle element
        else if (x < A[mid]) {
            return binarySearch(A, left, mid - 1, x);
        }

        // discard all elements in the left search space,
        // including the middle element
        else {
            return binarySearch(A, mid + 1, right, x);
        }
    }

    // Returns the position of key `x` in a given array `A` of length `n`
    public static int exponentialSearch(int[] A, int x)
    {
        // base case
        if (A == null || A.length == 0) {
            return -1;
        }

        int bound = 1;

        // find the range in which key `x` would reside
        while (bound < A.length && A[bound] < x) {
            bound *= 2;        // calculate the next power of 2
        }

        // call binary search on A[bound/2 … min(bound, n-1)]
        return binarySearch(A, bound/2, Integer.min(bound, A.length - 1), x);
    }

    // Exponential search algorithm
    public static void main(String[] args)
    {
        int[] A = {2, 5, 6, 8, 9, 10};
        int key = 9;

        int index = exponentialSearch(A, key);

        if (index != -1) {
            System.out.println("Element found at index " + index);
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Binary search algorithm to return the position of key `x` in sublist A[left…right]
def binarySearch(A, left, right, x):

    # base condition (search space is exhausted)
    if left > right:
        return -1

    # find the mid-value in the search space and
    # compares it with the key

    mid = (left + right) // 2

    # overflow can happen. Use below
    # mid = left + (right - left) // 2

    # base condition (a key is found)
    if x == A[mid]:
        return mid

    # discard all elements in the right search space,
    # including the middle element
    elif x < A[mid]:
        return binarySearch(A, left, mid - 1, x)

    # discard all elements in the left search space,
    # including the middle element
    else:
        return binarySearch(A, mid + 1, right, x)

# Returns the position of key `x` in a given list `A` of length `n`
def exponentialSearch(A, x):

    # base case
    if not A:
        return -1

    bound = 1

    # find the range in which key `x` would reside
    while bound < len(A) and A[bound] < x:
        bound *= 2        # calculate the next power of 2

    # call binary search on A[bound/2 … min(bound, n-1)]
    return binarySearch(A, bound // 2, min(bound, len(A) - 1), x)

# Exponential search algorithm
if __name__ == '__main__':

    A = [2, 5, 6, 8, 9, 10]
    key = 9

    index = exponentialSearch(A, key)

    if index != -1:
        print('Element found at index', index)
    else:
        print('Element found not in the list')
```

## Performance

The exponential search takes O(log(i)) time, where `i` is the target’s position in the array when the target is in the array or position where the target should be if it isn’t in the array.

We can also use the exponential search to search in bounded arrays. It can even out-perform binary search when the target is near the beginning of the array. This is because the exponential search will run in O(log(i)) time, where `i` is the index of the element being searched for in the array, whereas binary search would run in O(log(n)) time, where `n` is the total number of elements in the array.

**Exercise:** Find where a strictly increasing function (`f(x) > f(x-1)` for all values of x) becomes positive for the first time. Consider `f(x) = x2 + 2x - 400`. It becomes positive for the first time for `x = 20`.

**References:** <https://en.wikipedia.org/wiki/Exponential_search>

Also See:

> [Unbounded Binary Search](https://www.techiedelight.com/unbounded-binary-search/ "Unbounded Binary Search")

> [Interpolation search](https://www.techiedelight.com/interpolation-search/ "Interpolation search")

> [Binary Search Algorithm – Iterative and Recursive Implementation](https://www.techiedelight.com/binary-search/ "Binary Search Algorithm – Iterative and Recursive Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
