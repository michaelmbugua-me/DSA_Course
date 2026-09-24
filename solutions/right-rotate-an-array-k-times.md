# Right rotate an array `k` times

> Source: https://www.techiedelight.com/right-rotate-an-array-k-times/

[Array](https://www.techiedelight.com/Category/Array/)

In this post, we will see how to right-rotate an array by specified positions. For example, right rotating array `{ 1, 2, 3, 4, 5, 6, 7 }` three times will result in array `{ 5, 6, 7, 1, 2, 3, 4 }`.

> 

## 1\. Rotating `k` times

The idea is to right-rotate all array elements by one position `k` times, where `k` is the given rotation count. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to right-rotate an array by one position
void rightRotateByOne(int A[], int n)
{
    int last = A[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        A[i + 1] = A[i];
    }

    A[0] = last;
}

// Function to right-rotate an array by `k` positions
void rightRotate(int A[], int k, int n)
{
    // base case: invalid input
    if (k < 0 || k >= n) {
        return;
    }

    for (int i = 0; i < k; i++) {
        rightRotateByOne(A, n);
    }
}

int main(void)
{
    int A[] = { 1, 2, 3, 4, 5, 6, 7 };
    int k = 3;

    int n = sizeof(A)/sizeof(A[0]);

    rightRotate(A, k, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 5, 6, 7, 1, 2, 3, 4

##

```java
import java.util.Arrays;

class Main
{
    // Function to right-rotate an array by one position
    public static void rightRotateByOne(int[] A)
    {
        int last = A[A.length - 1];
        for (int i = A.length - 2; i >= 0; i--) {
            A[i + 1] = A[i];
        }

        A[0] = last;
    }

    // Function to right-rotate an array by `k` positions
    public static void rightRotate(int[] A, int k)
    {
        // base case: invalid input
        if (k < 0 || k >= A.length) {
            return;
        }

        for (int i = 0; i < k; i++) {
            rightRotateByOne(A);
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 3, 4, 5, 6, 7 };
        int k = 3;

        rightRotate(A, k);

        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Function to right-rotate a list by one position
def rightRotateByOne(A):

    last = A[-1]
    for i in reversed(range(len(A) - 1)):
        A[i + 1] = A[i]

    A[0] = last

# Function to right-rotate a list by `k` positions
def rightRotate(A, k):

    # base case: invalid input
    if k < 0 or k >= len(A):
        return

    for i in range(k):
        rightRotateByOne(A)

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6, 7]
    k = 3

    rightRotate(A, k)
    print(A)
```

The time complexity of the above solution is O(n.k), where `n` is the size of the input and `k` is the rotation count.

## 2\. Using Auxiliary Array

We can reduce the time complexity of the above solution to linear using some extra space. The idea is to store the last `k` elements of the input array in an auxiliary array of size `k`. Then shift the first `n-k` elements of the input array at the end. Finally, put elements of the auxiliary array at their correct positions in the input array.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

// Function to right-rotate an array by `k` positions
void rightRotate(int A[], int k, int n)
{
    // base case: invalid input
    if (k < 0 || k >= n) {
        return;
    }

    // construct an auxiliary array of size `k` and
    // fill it with the last `k` elements of the input array
    int aux[k];
    for (int i = 0; i < k; i++) {
        aux[i] = A[n-k+i];
    }

    // shift the first `n-k` elements of the input array at the end
    for (int i = n-k-1; i >= 0; i--) {
        A[i+k] = A[i];
    }

    // put the elements of the auxiliary array at their
    // correct positions in the input array
    for (int i = 0; i < k; i++) {
        A[i] = aux[i];
    }
}

int main(void)
{
    int A[] = { 1, 2, 3, 4, 5, 6, 7 };
    int k = 3;

    int n = sizeof(A)/sizeof(A[0]);

    rightRotate(A, k, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 5, 6, 7, 1, 2, 3, 4

##

```java
import java.util.Arrays;

class Main
{
    // Function to right-rotate an array by `k` positions
    public static void rightRotate(int[] A, int k)
    {
        int n = A.length;

        // base case: invalid input
        if (k < 0 || k >= n) {
            return;
        }

        // construct an auxiliary array of size `k` and
        // fill it with the last `k` elements of the input array
        int[] aux = new int[k];
        for (int i = 0; i < k; i++) {
            aux[i] = A[n - k + i];
        }

        // shift the first `n-k` elements of the input array at the end
        for (int i = n - k - 1; i >= 0; i--) {
            A[i + k] = A[i];
        }

        // put the elements of the auxiliary array at their
        // correct positions in the input array
        for (int i = 0; i < k; i++) {
            A[i] = aux[i];
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 3, 4, 5, 6, 7 };
        int k = 3;

        rightRotate(A, k);

        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Function to right-rotate a list by `k` positions
def rightRotate(A, k):

    n = len(A)

    # base case: invalid input
    if k < 0 or k >= n:
        return

    # construct an auxiliary space of size `k` and
    # fill it with the last `k` elements of the input list
    aux = [A[n - k + i] for i in range(k)]

    # shift the first `n-k` elements of the input list at the end
    for i in reversed(range(n - k)):
        A[i + k] = A[i]

    # put the elements of the auxiliary space at their
    # correct positions in the input list
    for i in range(k):
        A[i] = aux[i]

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6, 7]
    k = 3

    rightRotate(A, k)
    print(A)
```

The time complexity of the above solution is O(n), and the auxiliary space used is O(k).

## 3\. By reversing array

We can even solve this problem in O(n) time and O(1) extra space. The idea is to reverse the last `k` elements of the input array and then reverse the remaining `n-k` elements. Finally, get the right-rotated array by reversing the complete array.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Function to reverse a given subarray
void reverse(int A[], int low, int high)
{
    for (int i = low, j = high; i < j; i++, j--)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
}

// Function to right-rotate an array by `k` positions
void rightRotate(int A[], int k, int n)
{
    // base case: invalid input
    if (k < 0 || k >= n) {
        return;
    }

    // Reverse the last `k` elements
    reverse(A, n - k, n - 1);

    // Reverse the first `n-k` elements
    reverse(A, 0, n - k - 1);

    // Reverse the whole array
    reverse(A, 0, n - 1);
}

int main(void)
{
    int A[] = { 1, 2, 3, 4, 5, 6, 7 };
    int k = 3;

    int n = sizeof(A)/sizeof(A[0]);

    rightRotate(A, k, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 5, 6, 7, 1, 2, 3, 4
