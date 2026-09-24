# Longest Bitonic Subarray Problem

> Source: https://www.techiedelight.com/find-longest-bitonic-subarray-array/

[Array](https://www.techiedelight.com/Category/Array/)

The Longest Bitonic Subarray (LBS) problem is to find a subarray of a given sequence in which the subarray’s elements are first sorted in increasing order, then in decreasing order, and the subarray is as long as possible. Strictly ascending or descending subarrays are also accepted.

For example,

Longest bitonic subarray of the sequence { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 } is { 4, 5, 9, 10, 8, 5, 3 } For sequences sorted in increasing or decreasing order, the output is the same as the input sequence, i.e., [1, 2, 3, 4, 5] ——> [1, 2, 3, 4, 5] [5, 4, 3, 2, 1] ——> [5, 4, 3, 2, 1]

> 

The problem differs from the problem of finding the [longest bitonic subsequence](https://techiedelight.com/longest-bitonic-subsequence/). Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

The idea is to maintain two arrays, `I[]` and `D[]`:

  * `I[i]` store the length of the longest increasing subarray, ending at `arr[i]`.
  * `D[i]` store the length of the longest decreasing subarray, starting from `arr[i]`.

Finally, the length of the longest bitonic subarray is maximum among all `I[i] + D[i] - 1`. We can also keep track of two endpoints of the longest bitonic subarray found so far to print LBS. The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find the length of the longest bitonic subarray in an array
void findBitonicSubarray(int arr[], int n)
{
    if (n == 0) {
        return;
    }

    // `I[i]` store the length of the longest increasing subarray,
    // ending at `arr[i]`
    int I[n];
    I[0] = 1;
    for (int i = 1; i < n; i++)
    {
        I[i] = 1;
        if (arr[i - 1] < arr[i]) {
            I[i] = I[i - 1] + 1;
        }
    }

    // `D[i]` store the length of the longest decreasing subarray,
    // starting with `arr[i]`
    int D[n];
    D[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--)
    {
        D[i] = 1;
        if (arr[i] > arr[i + 1]) {
            D[i] = D[i + 1] + 1;
        }
    }

    // consider each element as a peak and calculate LBS
    int lbs_len = 1;
    int beg = 0, end = 0;

    for (int i = 0; i < n; i++)
    {
        if (lbs_len < I[i] + D[i] - 1)
        {
            lbs_len = I[i] + D[i] - 1;
            beg = i - I[i] + 1;
            end = i + D[i] - 1;
        }
    }

    // print the longest bitonic subarray
    printf("The length of the longest bitonic subarray is %d\n", lbs_len);
    printf("The longest bitonic subarray indices is [%d, %d]", beg, end);
}

int main(void)
{
    int A[] = { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 };
    int n = sizeof(A) / sizeof(A[0]);

    findBitonicSubarray(A, n);

    return 0;
}
```

**Output:** The length of the longest bitonic subarray is 7 The longest bitonic subarray indices is [3, 9]

##

```java
class Main
{
    // Function to find the length of the longest bitonic subarray in an array
    public static void findBitonicSubarray(int[] A)
    {
        if (A.length == 0) {
            return;
        }

        // `I[i]` store the length of the longest increasing subarray,
        // ending at `A[i]`
        int[] I = new int[A.length];
        I[0] = 1;
        for (int i = 1; i < A.length; i++)
        {
            I[i] = 1;
            if (A[i - 1] < A[i]) {
                I[i] = I[i - 1] + 1;
            }
        }

        // `D[i]` store the length of the longest decreasing subarray,
        // starting with `A[i]`
        int[] D = new int[A.length];
        D[A.length - 1] = 1;
        for (int i = A.length - 2; i >= 0; i--)
        {
            D[i] = 1;
            if (A[i] > A[i + 1]) {
                D[i] = D[i + 1] + 1;
            }
        }

        // consider each element as a peak and calculate LBS
        int lbs_len = 1;
        int beg = 0, end = 0;

        for (int i = 0; i < A.length; i++)
        {
            int len = I[i] + D[i] - 1;
            if (lbs_len < len)
            {
                lbs_len = len;
                beg = i - I[i] + 1;
                end = i + D[i] - 1;
            }
        }

        // print the longest bitonic subarray
        System.out.println("The length of the longest bitonic subarray is " + lbs_len);
        System.out.printf("The longest bitonic subarray indices is [%d, %d]", beg, end);
    }

    public static void main(String[] args)
    {
        int[] A = { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 };

        findBitonicSubarray(A);
    }
}
```

##

```python3
# Function to find the length of the longest bitonic subarray in a list
def findBitonicSublist(A):

    if len(A) == 0:
        return

    # `I[i]` store the length of the longest increasing sublist,
    # ending at `A[i]`
    I = [1] * len(A)

    for i in range(1, len(A)):
        if A[i - 1] < A[i]:
            I[i] = I[i - 1] + 1

    # `D[i]` store the length of the longest decreasing sublist,
    # starting with `A[i]`
    D = [1] * len(A)

    for i in reversed(range(len(A) - 1)):
        if A[i] > A[i + 1]:
            D[i] = D[i + 1] + 1

    # consider each element as a peak and calculate LBS
    lbs_len = 1
    beg = end = 0

    for i in range(len(A)):
        if lbs_len < I[i] + D[i] - 1:
            lbs_len = (I[i] + D[i] - 1)
            beg = i - I[i] + 1
            end = i + D[i] - 1

    # print the longest bitonic subarray
    print("The length of the longest bitonic subarray is", lbs_len)
    print("The longest bitonic subarray is", A[beg:end+1])

if __name__ == '__main__':

    A = [3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4]
    findBitonicSublist(A)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

We can solve this problem without using extra space. The idea is to check for the longest bitonic subarray starting at `A[i]`. If the longest bitonic subarray starting at `A[i]` ends at `A[j]`, the trick is to skip all elements between `i` and `j` as the longest bitonic subarray starting from them will have less length. Next, check for the longest bitonic subarray starting at `A[j]`. We continue this process until the end of the array is reached and keep track of the longest bitonic subarray found so far.

Following is the C, Java, and Python implementation based on the above idea:

```c
#include <stdio.h>
#include <stdlib.h>

// Function to find the length of the longest bitonic subarray in an array
void findBitonicSubarray(int A[], int n)
{
    int end_index = 0, max_len = 1, i = 0;

    while (i + 1 < n)
    {
        // check for the longest bitonic subarray starting at `A[i]`

        // reset length to 1
        int len = 1;

        // run till sequence is increasing
        while (i + 1 < n && A[i] < A[i + 1]) {
            i++, len++;
        }

        // run till sequence is decreasing
        while (i + 1 < n && A[i] > A[i + 1]) {
            i++, len++;
        }

        // run till sequence is equal
        while (i + 1 < n && A[i] == A[i + 1]) {
            i++;
        }

        // update the longest bitonic subarray if required
        if (len > max_len)
        {
            max_len = len;
            end_index = i;
        }
    }

    // print the longest bitonic subarray
    printf("The length of the longest bitonic subarray is %d\n", max_len);
    printf("The longest bitonic subarray indices is [%d, %d]",
            end_index - max_len + 1, end_index);
}

int main(void)
{
    int A[] = { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 };
    int n = sizeof(A) / sizeof(A[0]);

    findBitonicSubarray(A, n);

    return 0;
}
```

**Output:** The length of the longest bitonic subarray is 7 The longest bitonic subarray indices is [3, 9]

##

```java
class Main
{
    // Function to find the length of the longest bitonic subarray in an array
    public static void findBitonicSubarray(int[] A)
    {
        int n = A.length;
        if (n == 0) {
            return;
        }

        int end_index = 0, max_len = 1, i = 0;

        while (i + 1 < n)
        {
            // check for the longest bitonic subarray starting at `A[i]`

            // reset length to 1
            int len = 1;

            // run till sequence is increasing
            while (i + 1 < n && A[i] < A[i + 1]) {
                i++;
                len++;
            }

            // run till sequence is decreasing
            while (i + 1 < n && A[i] > A[i + 1]) {
                i++;
                len++;
            }

            // run till sequence is equal
            while (i + 1 < n && A[i] == A[i + 1]) {
                i++;
            }

            // update the longest bitonic subarray if required
            if (len > max_len) {
                max_len = len;
                end_index = i;
            }
        }

        // print the longest bitonic subarray
        System.out.println("The length of the longest bitonic subarray is " + max_len);
        System.out.println("The longest bitonic subarray indices is [" +
                        (end_index - max_len + 1) + ", " + end_index + "]");
    }

    public static void main(String[] args)
    {
        int[] A = { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 };

        findBitonicSubarray(A);
    }
}
```

##

```python3
# Function to find the length of the longest bitonic subarray in a list
def findBitonicSublist(A):

    n = len(A)
    if n == 0:
        return

    end_index = 0
    max_len = 1
    i = 0

    while i + 1 < n:

        # check for the longest bitonic subarray starting at `A[i]`

        # reset length to 1
        length = 1

        # run till sequence is increasing
        while i + 1 < n and A[i] < A[i + 1]:
            i = i + 1
            length = length + 1

        # run till sequence is decreasing
        while i + 1 < n and A[i] > A[i + 1]:
            i = i + 1
            length = length + 1

        # run till sequence is equal
        while i + 1 < n and A[i] == A[i + 1]:
            i = i + 1

        # update longest bitonic subarray if required
        if length > max_len:
            max_len = length
            end_index = i

    # print the longest bitonic subarray
    print("The length of the longest bitonic subarray is", max_len)
    print("The longest bitonic subarray is", A[end_index - max_len + 1: end_index + 1])

if __name__ == '__main__':

    A = [3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4]
    findBitonicSublist(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:** Find an array element before which all the items are smaller and after which all are greater.
