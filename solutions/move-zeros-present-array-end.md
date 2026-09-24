# Move all zeros present in an array to the end

> Source: https://www.techiedelight.com/move-zeros-present-array-end/

Given an integer array, move all zeros present in it to the end. The solution should maintain the relative order of items in the array and should not use constant space.

For example,

**Input:** { 6, 0, 8, 2, 3, 0, 4, 0, 1 } **Output:** { 6, 8, 2, 3, 4, 1, 0, 0, 0 }

> 

The idea is simple – if the current element is non-zero, place the element at the next available position in the array. After all elements in the array are processed, fill all remaining indices by 0. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to move all zeros present in an array to the end
void reorder(int A[], int n)
{
    // `k` stores the index of the next available position
    int k = 0;

    // do for each element
    for (int i = 0; i < n; i++)
    {
        // if the current element is non-zero, put the element at the
        // next free position in the array
        if (A[i] != 0) {
            A[k++] = A[i];
        }
    }

    // move all 0's to the end of the array (remaining indices)
    for (int i = k; i < n; i++) {
        A[i] = 0;
    }
}

int main(void)
{
    int A[] = { 6, 0, 8, 2, 3, 0, 4, 0, 1 };
    int n = sizeof(A) / sizeof(A[0]);

    reorder(A, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 6 8 2 3 4 1 0 0 0

##

```java
import java.util.Arrays;

class Main
{
    // Function to move all zeros present in the array to the end
    public static void reorder(int[] A)
    {
        // `k` stores the index of the next available position
        int k = 0;

        // do for each element
        for (int i: A)
        {
            // if the current element is non-zero, put the element at the
            // next free position in the array
            if (i != 0) {
                A[k++] = i;
            }
        }

        // move all 0's to the end of the array (remaining indices)
        for (int i = k; i < A.length; i++) {
            A[i] = 0;
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 6, 0, 8, 2, 3, 0, 4, 0, 1 };

        reorder(A);
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Function to move all zeros present in the list to the end
def reorder(A):

    # `k` stores the index of the next available position
    k = 0

    # do for each element
    for i in A:
        # if the current element is non-zero, put the element at the
        # next free position in the list
        if i:
            A[k] = i
            k = k + 1

    # move all 0's to the end of the list (remaining indices)
    for i in range(k, len(A)):
        A[i] = 0

if __name__ == '__main__':

    A = [6, 0, 8, 2, 3, 0, 4, 0, 1]

    reorder(A)
    print(A)
```

The time complexity of the above solution is O(n), where `n` is the size of the input.

## Using partitioning logic of Quicksort

We can also solve this problem in one scan of the array by modifying [Quicksort’s partitioning logic](https://techiedelight.com/quicksort/). The idea is to use 0 as a pivot element and make one pass of the partition process. The partitioning logic reads all elements and swap every non-pivot element with the first occurrence of the pivot.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to move all zeros present in an array to the end
void partition(int A[], int n)
{
    int j = 0;

    // each time we encounter a non-zero, `j` is incremented, and
    // the element is placed before the pivot
    for (int i = 0; i < n; i++)
    {
        if (A[i] != 0)        // pivot is 0
        {
            swap(A, i, j);
            j++;
        }
    }
}

int main()
{
    int A[] = { 6, 0, 8, 2, 3, 0, 4, 0, 1 };
    int n = sizeof(A) / sizeof(A[0]);

    partition(A, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 6 8 2 3 4 1 0 0 0

##

```java
import java.util.Arrays;

class Main
{
    public static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Function to move all zeros present in the array to the end
    public static void partition(int[] A)
    {
        int j = 0;

        // each time we encounter a non-zero, `j` is incremented, and
        // the element is placed before the pivot
        for (int i = 0; i < A.length; i++)
        {
            if (A[i] != 0)        // pivot is 0
            {
                swap(A, i, j);
                j++;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 6, 0, 8, 2, 3, 0, 4, 0, 1 };

        partition(A);
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to move all zeros present in a list to the end
def partition(A):

    j = 0

    # each time we encounter a non-zero, `j` is incremented, and
    # the element is placed before the pivot
    for i in range(len(A)):
        if A[i]:            # pivot is 0
            swap(A, i, j)
            j = j + 1

if __name__ == '__main__':

    A = [6, 0, 8, 2, 3, 0, 4, 0, 1]

    partition(A)
    print(A)
```

The time complexity of the above solution is O(n), where `n` is the size of the input.

**Exercise:** Modify the solution so that all `1's` would come first.
