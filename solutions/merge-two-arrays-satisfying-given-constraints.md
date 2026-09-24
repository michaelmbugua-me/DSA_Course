# Merge two arrays by satisfying given constraints

> Source: https://www.techiedelight.com/merge-two-arrays-satisfying-given-constraints/

Given two sorted arrays `X[]` and `Y[]` of size `m` and `n` each where `m >= n` and `X[]` has exactly `n` vacant cells, merge elements of `Y[]` in their correct position in array `X[]`, i.e., merge `(X, Y)` by keeping the sorted order.

For example,

**Input:** X[] = { 0, 2, 0, 3, 0, 5, 6, 0, 0 } Y[] = { 1, 8, 9, 10, 15 } The vacant cells in `X[]` is represented by 0 **Output:** X[] = { 1, 2, 3, 5, 6, 8, 9, 10, 15 }

> 

The idea is simple – move non-empty elements of `X[]` at the beginning of `X[]` and then merge `X[]` with `Y[]` starting from the end. The merge process is similar to the merge routine of the [merge sort algorithm](https://techiedelight.com/merge-sort/).

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to merge `X[0… m]` and `Y[0… n]` into `X[0… m+n+1]`
void merge(int X[], int Y[], int m, int n)
{
    // size of `X[]` is `k+1`
    int k = m + n + 1;

    // run if X[] or Y[] has elements left
    while (m >= 0 && n >= 0)
    {
        // put the next greater element in the next free position in `X[]` from the end
        if (X[m] > Y[n]) {
            X[k--] = X[m--];
        }
        else {
            X[k--] = Y[n--];
        }
    }

    // copy the remaining elements of `Y[]` (if any) to `X[]`
    while (n >= 0) {
        X[k--] = Y[n--];
    }

    // fill `Y[]` with all zeros
    for (int i = 0; i < n; i++) {
        Y[i] = 0;
    }
}

// The function moves non-empty elements in `X[]` in the
// beginning and then merge them with `Y[]`
void rearrange(int X[], int Y[], int m, int n)
{
    // return if `X` is empty
    if (m == 0) {
        return;
    }

    // moves non-empty elements of `X[]` at the beginning
    int k = 0;
    for (int i = 0; i < m; i++)
    {
        if (X[i] != 0) {
            X[k++] = X[i];
        }
    }

    // merge `X[0 … k-1]` and `Y[0 … n-1]` into `X[0 … m-1]`
    merge(X, Y, k - 1, n - 1);
}

int main()
{
    // vacant cells in `X[]` is represented by 0
    int X[] = { 0, 2, 0, 3, 0, 5, 6, 0, 0 };
    int Y[] = { 1, 8, 9, 10, 15 };

    int m = sizeof(X) / sizeof(X[0]);
    int n = sizeof(Y) / sizeof(Y[0]);

    /* Validate input before calling `rearrange()`
        1. Both arrays `X[]` and `Y[]` should be sorted (ignore 0's in `X[]`)
        2. Size of array `X[]` >= size of array `Y[]` (i.e., `m >= n`)
        3. Total number of vacant cells in array `X[]` = size of array `Y[]` */

    // merge `Y[]` into `X[]`
    rearrange(X, Y, m, n);

    // print merged array
    for (int i = 0; i < m; i++) {
        printf("%d ", X[i]);
    }

    return 0;
}
```

**Output:** 1 2 3 5 6 8 9 10 15

##

```java
import java.util.Arrays;

class Main
{
    // Function to merge `X[0… m]` and `Y[0… n]` into `X[0… m+n+1]`
    private static void merge(int[] X, int[] Y, int m, int n)
    {
        // size of `X[]` is `k+1`
        int k = m + n + 1;

        // run if X[] or Y[] has elements left
        while (m >= 0 && n >= 0)
        {
            // put the next greater element in the next free position in `X[]`
            // from the end
            if (X[m] > Y[n]) {
                X[k--] = X[m--];
            }
            else {
                X[k--] = Y[n--];
            }
        }

        // copy the remaining elements of `Y[]` (if any) to `X[]`
        while (n >= 0) {
            X[k--] = Y[n--];
        }

        // fill `Y[]` with all zeros
        Arrays.fill(Y, 0);
    }

    // The function moves non-empty elements in `X[]` in the
    // beginning and then merge them with `Y[]`
    public static void rearrange(int[] X, int[] Y)
    {
        // return if `X` is empty
        if (X.length == 0) {
            return;
        }

        // moves non-empty elements of `X[]` at the beginning
        int k = 0;
        for (int value: X)
        {
            if (value != 0) {
                X[k++] = value;
            }
        }

        // merge `X[0…k-1]` and `Y[0… n-1]` into `X[0… m-1]`
        merge(X, Y, k - 1, Y.length - 1);
    }

    public static void main (String[] args)
    {
        // vacant cells in `X[]` is represented by 0
        int[] X = { 0, 2, 0, 3, 0, 5, 6, 0, 0};
        int[] Y = { 1, 8, 9, 10, 15 };

        /* Validate input before calling `rearrange()`
            1. Both arrays `X[]` and `Y[]` should be sorted (ignore 0's in `X[]`)
            2. Size of array `X[]` >= size of array `Y[]` (i.e., `m >= n`)
            3. Total number of vacant cells in array `X[]` = size of array `Y[]` */

        // merge `Y[]` into `X[]`
        rearrange(X, Y);

        // print merged array
        System.out.println(Arrays.toString(X));
    }
}
```

##

```python3
# Function to merge `X[0… m]` and `Y[0… n]` into `X[0… m+n+1]`
def merge(X, Y, m, n):

    # size of `X` is `k+1`
    k = m + n + 1

    # run if `X` or `Y` has elements left
    while m >= 0 and n >= 0:
        # put the next greater element in the next free position in `X[]` from the end
        if X[m] > Y[n]:
            X[k] = X[m]
            m = m - 1
            k = k - 1
        else:
            X[k] = Y[n]
            n = n - 1
            k = k - 1

    # copy the remaining elements of `Y[]` (if any) to `X[]`
    while n >= 0:
        X[k] = Y[n]
        k = k - 1
        n = n - 1

    # fill `Y` with all zeros
    for i in range(len(Y)):
        Y[i] = 0

# The function moves non-empty elements in `X` in the
# beginning and then merge them with `Y`
def rearrange(X, Y):

    # return if `X` is empty
    if not len(X):
        return;

    # moves non-empty elements of `X` at the beginning
    k = 0
    for i in range(len(X)):
        if X[i]:
            X[k] = X[i]
            k = k + 1

    # merge `X[0… k-1]` and `Y[0… n-1]` into `X[0… m-1]`
    merge(X, Y, k - 1, len(Y) - 1)

if __name__ == '__main__':

    # vacant cells in `X[]` is represented by 0
    X = [0, 2, 0, 3, 0, 5, 6, 0, 0]
    Y = [1, 8, 9, 10, 15]

    ''' Validate input before calling `rearrange()`
        1. Both lists `X[]` and `Y[]` should be sorted (ignore 0's in `X[]`)
        2. Size of list `X[]` >= size of list `Y[]` (i.e., `m >= n`)
        3. Total number of vacant cells in list `X[]` = size of list `Y[]` '''

    # merge `Y` into `X`
    rearrange(X, Y)

    # print merged list
    print(X)
```

The time complexity of the above solution is O(m + n) and runs in constant space. Here, `m` and `n` are the size of the first and second array, respectively.

**Exercise:** Merge arrays in descending order

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
