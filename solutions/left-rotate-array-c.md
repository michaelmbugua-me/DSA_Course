# Left rotate an array

> Source: https://www.techiedelight.com/left-rotate-array-c/

[Array](https://www.techiedelight.com/Category/Array/)

In this post, we will see how to left-rotate an array by specified positions. For example, left-rotating array `{ 1, 2, 3, 4, 5 }` twice results in array `{ 3, 4, 5, 1, 2 }`.

> 

## 1\. Rotating `r` times

The idea is to left-rotate all array elements by one position `r` times, where `r` is the given rotation count. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to left-rotate an array by one position
void leftRotateByOne(int arr[], int n)
{
    int first = arr[0];
    for (int i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }

    arr[n-1] = first;
}

// Function to left-rotate an array by `r` positions
void leftRotate(int arr[], int r, int n)
{
    // base case: invalid input
    if (r < 0 || r >= n) {
        return;
    }

    for (int i = 0; i < r; i++) {
        leftRotateByOne(arr, n);
    }
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int r = 2;

    int n = sizeof(arr)/sizeof(arr[0]);

    leftRotate(arr, r, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 3 4 5 1 2

##

```java
import java.util.Arrays;

class Main
{
    // Function to left-rotate an array by one position
    public static void leftRotateByOne(int[] arr)
    {
        int first = arr[0];
        for (int i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }

        arr[arr.length - 1] = first;
    }

    // Function to left-rotate an array by `r` positions
    public static void leftRotate(int[] arr, int r)
    {
        // base case: invalid input
        if (r < 0 || r >= arr.length) {
            return;
        }

        for (int i = 0; i < r; i++) {
            leftRotateByOne(arr);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        int r = 2;

        leftRotate(arr, r);

        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Function to left-rotate a list by one position
def leftRotateByOne(A):

    first = A[0]
    for i in range(len(A) - 1):
        A[i] = A[i + 1]

    A[-1] = first

# Function to left-rotate a list by `r` positions
def leftRotate(A, r):

    # base case: invalid input
    if r < 0 or r >= len(A):
        return

    for i in range(r):
        leftRotateByOne(A)

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5]
    r = 2

    leftRotate(A, r)
    print(A)
```

The time complexity of the above solution is O(n.r), where `n` is the size of the input and `r` is the rotation count.

## 2\. Using Auxiliary Array

We can reduce the time complexity of the above solution to linear using some extra space. The idea is to store first `r` elements of the input array in an auxiliary array of size `r`. Then shift the remaining `n-r` elements of the input array at the beginning. Finally, put elements of the auxiliary array at their correct positions in the input array.

```c
#include <stdio.h>

// Function to left-rotate an array by `r` positions
void leftRotate(int arr[], int r, int n)
{
    // base case: invalid input
    if (r < 0 || r >= n) {
        return;
    }

    // construct an auxiliary array of size `r` and
    // fill it with the first `r` elements of the input array
    int aux[r];
    for (int i = 0; i < r; i++) {
        aux[i] = arr[i];
    }

    // shift the remaining `n-r` elements of the input array at the beginning
    for (int i = r; i < n; i++) {
        arr[i-r] = arr[i];
    }

    // put the elements of the auxiliary array at their
    // correct positions in the input array
    for (int i = n-r; i < n; i++) {
        arr[i] = aux[i-(n-r)];
    }
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int r = 2;

    int n = sizeof(arr)/sizeof(arr[0]);

    leftRotate(arr, r, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Function to left-rotate an array by `r` positions
    public static void leftRotate(int[] arr, int r)
    {
        // get the length of the array
        int n = arr.length;

        // base case: invalid input
        if (r < 0 || r >= n) {
            return;
        }

        // construct an auxiliary array of size `r` and
        // fill it with the first `r` elements of the input array
        int[] aux = new int[r];
        for (int i = 0; i < r; i++) {
            aux[i] = arr[i];
        }

        // shift the remaining `n-r` elements of the input array at the beginning
        for (int i = r; i < n; i++) {
            arr[i - r] = arr[i];
        }

        // put the elements of the auxiliary array at their
        // correct positions in the input array
        for (int i = n-r; i < n; i++) {
            arr[i] = aux[i - (n - r)];
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        int r = 2;

        leftRotate(arr, r);
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Function to left-rotate a list by `r` positions
def leftRotate(A, r):

    # get length of the list
    n = len(A)

    # base case: invalid input
    if r < 0 or r >= n:
        return

    # construct an auxiliary list of size `r` and
    # fill it with the first `r` elements of the input list
    aux = [A[i] for i in range(r)]

    # shift the remaining `n-r` elements of the input list at the beginning
    for i in range(r, n):
        A[i - r] = A[i]

    # put the elements of the auxiliary space at their
    # correct positions in the input list
    for i in range(n - r, n):
        A[i] = aux[i - (n - r)]

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5]
    r = 2

    leftRotate(A, r)
    print(A)
```

The time complexity of the above solution is O(n), where `n` is the size of the input. The auxiliary space required by the program is O(r), where `r` is the rotation count.

## 3\. By reversing array

We can even solve this problem in O(n) time and O(1) extra space. The idea is to reverse the first `r` elements of the input array and then reverse the remaining `n-r` elements. Finally, get the left-rotated array by reversing the complete array.

```c
#include <stdio.h>

// Function to reverse a given subarray
void reverse(int arr[], int low, int high)
{
    for (int i = low, j = high; i < j; i++, j--)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Function to left-rotate an array by `r` positions
void leftRotate(int arr[], int r, int n)
{
    // base case: invalid input
    if (r < 0 || r >= n) {
        return;
    }

    // Reverse the first `r` elements
    reverse(arr, 0, r - 1);

    // Reverse the remaining `n-r` elements
    reverse(arr, r, n - 1);

    // Reverse the whole array
    reverse(arr, 0, n - 1);
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int r = 2;

    int n = sizeof(arr)/sizeof(arr[0]);

    leftRotate(arr, r, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 3 4 5 1 2
