# Sort binary array in linear time

> Source: https://www.techiedelight.com/sort-binary-array-linear-time/

Given a binary array, sort it in linear time and constant space. The output should print all zeros, followed by all ones.

For example,

**Input:** { 1, 0, 1, 0, 1, 0, 0, 1 } **Output:** { 0, 0, 0, 0, 1, 1, 1, 1 }

> 

A simple solution would be to count the total number of 0’s present in the array, say `k`, and fill the first `k` indices in the array by 0 and all remaining indices by 1.

Alternatively, we can count the total number of 1’s present in the array `k` and fill the last `k` indices in the array by 1 and all remaining indices by 0. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to sort a binary array in linear time
int sort(int A[], int n)
{
    // count number of 0's
    int zeros = 0;
    for (int i = 0; i < n; i++)
    {
        if (A[i] == 0) {
            zeros++;
        }
    }

    // put 0's at the beginning
    int k = 0;
    while (zeros--) {
        A[k++] = 0;
    }

    // fill all remaining elements by 1
    while (k < n) {
        A[k++] = 1;
    }
}

int main(void)
{
    int A[] = { 0, 0, 1, 0, 1, 1, 0, 1, 0, 0 };
    int n = sizeof(A)/sizeof(A[0]);

    sort(A, n);

    // print the rearranged array
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 0 0 0 0 0 0 1 1 1 1

##

```java
import java.util.Arrays;

class Main
{
    // Function to sort a binary array in linear time
    public static void sort(int[] A)
    {
        // count number of 0's
        int zeros = 0;
        for (int value: A)
        {
            if (value == 0) {
                zeros++;
            }
        }

        // put 0's at the beginning
        int k = 0;
        while (zeros-- != 0) {
            A[k++] = 0;
        }

        // fill all remaining elements by 1
        while (k < A.length) {
            A[k++] = 1;
        }
    }

    public static void main (String[] args)
    {
        int[] A = { 0, 0, 1, 0, 1, 1, 0, 1, 0, 0 };

        sort(A);

        // print the rearranged array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Function to sort a binary list in linear time
def sort(A):

    # count number of 0's
    zeros = A.count(0)

    # put 0's at the beginning
    k = 0
    while zeros:
        A[k] = 0
        zeros = zeros - 1
        k = k + 1

    # fill all remaining elements by 1
    for k in range(k, len(A)):
        A[k] = 1

if __name__ == '__main__':

    A = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0]

    sort(A)

    # print the rearranged list
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Instead of counting the total number of zeros, if the current element is 0, we can place 0 at the next available position in the array. After all elements in the array are processed, we fill all remaining indices by 1. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <stdio.h>

// Function to sort a binary array in linear time
int sort(int A[], int n)
{
    // `k` stores index of next available position
    int k = 0;

    // do for each element
    for (int i = 0; i < n; i++)
    {
        // if the current element is zero, put 0 at the next free
        // position in the array
        if (A[i] == 0) {
            A[k++] = 0;
        }
    }

    // fill all remaining indices by 1
    for (int i = k; i < n; i++) {
        A[k++] = 1;
    }
}

int main(void)
{
    int A[] = { 0, 0, 1, 0, 1, 1, 0, 1, 0, 0 };
    int n = sizeof(A)/sizeof(A[0]);

    sort(A, n);

    // print the rearranged array
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 0 0 0 0 0 0 1 1 1 1

##

```java
import java.util.Arrays;

class Main
{
    // Function to sort a binary array in linear time
    public static void sort(int[] A)
    {
        // `k` stores index of next available position
        int k = 0;

        // do for each element
        for (int i: A)
        {
            // if the current element is zero, put 0 at the next free
            // position in the array
            if (i == 0) {
                A[k++] = 0;
            }
        }

        // fill all remaining indices by 1
        for (int i = k; i < A.length; i++) {
            A[k++] = 1;
        }
    }

    public static void main (String[] args)
    {
        int[] A = { 0, 0, 1, 0, 1, 1, 0, 1, 0, 0 };

        sort(A);

        // print the rearranged array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Function to sort a binary list in linear time
def sort(A):

    # `k` stores index of next available position
    k = 0

    # do for each element
    for i in range(len(A)):
        # if the current element is zero, put 0 at the next free
        # position in the list
        if A[i] == 0:
            A[k] = 0
            k = k + 1

    # fill all remaining indices by 1
    for i in range(k, len(A)):
        A[k] = 1
        k = k + 1

if __name__ == '__main__':

    A = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0]

    sort(A)

    # print the rearranged list
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

We can also solve this problem in linear time by using the [partitioning logic of Quicksort](https://techiedelight.com/quicksort/). The idea is to use 1 as a pivot element and make one pass of the partition process. The resultant array will be sorted. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <stdio.h>

// Utility function to swap elements `A[i]` and `A[j]` in an array
void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to sort a binary array in linear time
int partition(int A[], int n)
{
    int pivot = 1;
    int j = 0;

    // each time we encounter a 0, `j` is incremented, and
    // 0 is placed before the pivot
    for (int i = 0; i < n; i++)
    {
        if (A[i] < pivot)
        {
            swap(A, i, j);
            j++;
        }
    }
}

int main(void)
{
    int A[] = { 1, 0, 0, 0, 1, 0, 1, 1 };
    int n = sizeof(A)/sizeof(A[0]);

    partition(A, n);

    // print the rearranged array
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 0 0 0 0 1 1 1 1
