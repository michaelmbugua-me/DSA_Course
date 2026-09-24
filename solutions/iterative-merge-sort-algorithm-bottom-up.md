# Iterative Merge Sort Algorithm (Bottom-up Merge Sort)

> Source: https://www.techiedelight.com/iterative-merge-sort-algorithm-bottom-up/

This post will sort an integer array using the iterative merge sort algorithm.

Merge sort is an efficient sorting algorithm that falls under the [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) paradigm and produces a stable sort. It operates by dividing a large array into two smaller subarrays and then recursively sorting the subarrays.

In a recursive approach, the problem is broken down into smaller, simple subproblems in a top-down manner until the solution becomes trivial. We have already discussed the merge sort algorithm in detail and covered recursive implementation [here](https://techiedelight.com/merge-sort/).

We can also implement merge sort iteratively in a bottom-up manner. We start by sorting all subarrays of `1` element; then merge results into subarrays of `2` elements, then merge results into subarrays of `4` elements. Likewise, perform successive merges until the array is completely sorted.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

The following code proposes a non-recursive variant of the merge sort in C, Java, and Python, in which a sequence of passes sorts the array in a bottom-up manner:

```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

#define N 10

// Utility function to find a minimum of two numbers
int min(int x, int y) {
    return (x < y) ? x : y;
}

// Merge two sorted subarrays `A[from…mid]` and `A[mid+1…to]`
void merge(int A[], int temp[], int from, int mid, int to)
{
    int k = from, i = from, j = mid + 1;

    // loop till no elements are left in the left and right runs
    while (i <= mid && j <= to)
    {
        if (A[i] < A[j]) {
            temp[k++] = A[i++];
        }
        else {
            temp[k++] = A[j++];
        }
    }

    // copy remaining elements
    while (i < N && i <= mid) {
        temp[k++] = A[i++];
    }

    /* no need to copy the second half (since the remaining items
       are already in their correct position in the temporary array) */

    // copy back to the original array to reflect sorted order
    for (int i = from; i <= to; i++) {
        A[i] = temp[i];
    }
}

// Iteratively sort subarray `A[low…high]` using a temporary array
void mergesort(int A[], int temp[], int low, int high)
{
    // divide the array into blocks of size `m`
    // m = [1, 2, 4, 8, 16…]
    for (int m = 1; m <= high - low; m = 2*m)
    {
        // for m = 1, i = 0, 2, 4, 6, 8…
        // for m = 2, i = 0, 4, 8…
        // for m = 4, i = 0, 8…
        // …
        for (int i = low; i < high; i += 2*m)
        {
            int from = i;
            int mid = i + m - 1;
            int to = min(i + 2*m - 1, high);

            merge(A, temp, from, mid, to);
        }
    }
}

// Utility function to print a given array
int printArray(int A[])
{
    for (int i = 0; i < N; i++) {
        printf("%d ", A[i]);
    }

    printf("\n");
}

// Iterative implementation of merge sort
int main()
{
    int A[N], temp[N];
    srand(time(NULL));

    // generate random input of integers
    for (int i = 0; i < N; i++) {
        temp[i] = A[i] = (rand() % 50);
    }

    printf("Original array: ");
    printArray(A);

    // sort array `A[0…N-1]` using a temporary array temp
    mergesort(A, temp, 0, N - 1);

    printf("Modified array: ");
    printArray(A);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Merge two sorted subarrays `A[from…mid]` and `A[mid+1…to]`
    public static void merge(int[] A, int[] temp, int from, int mid, int to)
    {
        int k = from, i = from, j = mid + 1;

        // loop till no elements are left in the left and right runs
        while (i <= mid && j <= to)
        {
            if (A[i] < A[j]) {
                temp[k++] = A[i++];
            }
            else {
                temp[k++] = A[j++];
            }
        }

        // copy remaining elements
        while (i < A.length && i <= mid) {
            temp[k++] = A[i++];
        }

        /* no need to copy the second half (since the remaining items
           are already in their correct position in the temporary array) */

        // copy back to the original array to reflect sorted order
        for (i = from; i <= to; i++) {
            A[i] = temp[i];
        }
    }

    // Iteratively sort subarray `A[low…high]` using a temporary array
    public static void mergesort(int[] A)
    {
        int low = 0;
        int high = A.length - 1;

        // sort array `A[]` using a temporary array `temp`
        int[] temp = Arrays.copyOf(A, A.length);

        // divide the array into blocks of size `m`
        // m = [1, 2, 4, 8, 16…]
        for (int m = 1; m <= high - low; m = 2*m)
        {
            // for m = 1, i = 0, 2, 4, 6, 8 …
            // for m = 2, i = 0, 4, 8, 12 …
            // for m = 4, i = 0, 8, 16 …
            // …
            for (int i = low; i < high; i += 2*m)
            {
                int from = i;
                int mid = i + m - 1;
                int to = Integer.min(i + 2*m - 1, high);

                merge(A, temp, from, mid, to);
            }
        }
    }

    // Iterative implementation of merge sort
    public static void main(String[] args)
    {
        int[] A = { 5, 7, -9, 3, -4, 2, 8 };

        System.out.println("Original array: " + Arrays.toString(A));
        mergesort(A);
        System.out.println("Modified array: " + Arrays.toString(A));
    }
}
```

##

```python3
# Merge two sorted sublists `A[frm…mid]` and `A[mid+1…to]`
def merge(A, temp, frm, mid, to):

    k = frm
    i = frm
    j = mid + 1

    # loop till no elements are left in the left and right runs
    while i <= mid and j <= to:
        if A[i] < A[j]:
            temp[k] = A[i]
            i = i + 1
        else:
            temp[k] = A[j]
            j = j + 1

        k = k + 1

    # copy remaining elements
    while i < len(A) and i <= mid:
        temp[k] = A[i]
        k = k + 1
        i = i + 1

    ''' no need to copy the second half (since the remaining items
        are already in their correct position in the temporary array) '''

    # copy back to the original list to reflect sorted order
    for i in range(frm, to + 1):
        A[i] = temp[i]

# Iteratively sort sublist `A[low…high]` using a temporary list
def mergesort(A):

    low = 0
    high = len(A) - 1

    # sort list `A` using a temporary list `temp`
    temp = A.copy()

    # divide the list into blocks of size `m`
    # m = [1, 2, 4, 8, 16…]

    m = 1
    while m <= high - low:

        # for m = 1, i = [0, 2, 4, 6, 8…]
        # for m = 2, i = [0, 4, 8, 12…]
        # for m = 4, i = [0, 8, 16…]
        # …

        for i in range(low, high, 2*m):
            frm = i
            mid = i + m - 1
            to = min(i + 2*m - 1, high)
            merge(A, temp, frm, mid, to)

        m = 2*m

# Iterative implementation of merge sort
if __name__ == '__main__':

    A = [5, 7, -9, 3, -4, 2, 8]

    print("Original array:", A)
    mergesort(A)
    print("Modified array:", A)
```

The worst-case time complexity of iterative merge sort remains the same as the recursive implementation, i.e., O(n.log(n)) for an input containing `n` items. However, it saves the auxiliary space required by the call stack.

**Also See:**

> [External Merge Sort Algorithm](https://techiedelight.com/external-merge-sort/)

**References:** <http://csg.sph.umich.edu/abecasis/class/2006/615.09.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 238

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
