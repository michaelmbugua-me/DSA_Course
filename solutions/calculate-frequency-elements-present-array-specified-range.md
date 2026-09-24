# Efficiently calculate the frequency of all elements present in a limited range array

> Source: https://www.techiedelight.com/calculate-frequency-elements-present-array-specified-range/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array whose elements lie in the range 0 to `n-1` where `n` is the array size, calculate the frequency of all array elements in linear time and using constant space.

For example,

**Input:** { 2, 3, 3, 2, 1 } **Output:** Element 1 appears once. Element 2 appears twice. Element 3 appears twice.

> 

A simple solution is to use a count array. We traverse through the given array and update the frequency of each element in the count array. Finally, after all the array elements are processed, iterate through the count array to print frequencies. We can also use a map instead of a count array but using a map does not take advantage of the fact that array elements lie between 0 and `n-1`.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

// Function to calculate the frequency of all elements in an array
void findFrequency(int A[], int n)
{
    // create a count array of size `n` to store the count of all array elements
    int freq[n];

    for (int i = 0; i < n; i++) {
        freq[i] = 0;
    }

    // update frequency of each element
    for (int i = 0; i < n; i++) {
        freq[A[i]]++;
    }

    // iterate through the array to print frequencies
    for (int i = 0; i < n; i++)
    {
        if (freq[i]) {
            printf("%d appears %d times\n", i, freq[i]);
        }
    }
}

int main(void)
{
    int A[] = { 2, 3, 3, 2, 1 };
    int n = sizeof(A) / sizeof(A[0]);

    findFrequency(A, n);

    return 0;
}
```

##

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to calculate the frequency of all elements in an array
void findFrequency(int A[], int n)
{
    // create an empty map to store the frequency of array elements
    // (we can also use a count array of size `n`)
    unordered_map<int, int> freq;

    // update frequency of each element
    for (int i = 0; i < n; i++) {
        freq[A[i]]++;
    }

    // iterate through the map to print frequencies
    for (auto it: freq) {
        cout << it.first << " appears " << it.second << " times\n";
    }
}

int main()
{
    int A[] = { 2, 3, 3, 2, 1 };
    int n = sizeof(A) / sizeof(A[0]);

    findFrequency(A, n);

    return 0;
}
```

##

```java
class Main
{
    // Function to calculate the frequency of all elements in the array
    public static void findFrequency(int[] A)
    {
        // create a count array of size `n` to store the count of all array elements
        int[] freq = new int[A.length];

        // update frequency of each element
        for (int e: A) {
            freq[e]++;
        }

        // iterate through the array to print frequencies
        for (int i = 0; i < freq.length; i++)
        {
            if (freq[i] > 0) {
                System.out.printf("%d appears %d times\n", i, freq[i]);
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 3, 3, 2, 1 };
        findFrequency(A);
    }
}
```

##

```python3
# Function to calculate the frequency of all the list elements
def findFrequency(A):

    # create a count list of size `n` to store the count of all list elements
    freq = [0] * len(A)

    # update frequency of each element
    for e in A:
        freq[e] = freq[e] + 1

    # iterate through the list to print frequencies
    for i in range(len(A)):
        if freq[i] > 0:
            print(f"{i} appears {freq[i]} times")

if __name__ == '__main__':

    A = [2, 3, 3, 2, 1]
    findFrequency(A)
```

**Output:** Element 1 appears 1 times Element 2 appears 2 times Element 3 appears 2 times

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

We can also solve this problem without using any extra space by taking advantage of the fact that array elements lie in range 0 to `n-1`. For each element `A[i]` present in the array, increment the value present at index `(A[i] % n)` by `n`. Then, traverse the modified array, and if `A[i]` is more than or equal to `n`, then `i` appears in array `(A[i]/n)` times.

For example, consider array `{2, 3, 3, 2, 1}`. After incrementing value present at index `(A[i] % n)` for each element `A[i]` by `n`, the array becomes `{2, 8, 13, 12, 1}`. Now if we take `(arr[i]/n)` for each array index `i`, we get `{0, 1, 2, 2, 0}`. Here, `A[i]` denotes the frequency of index `i`.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to calculate the frequency of all elements in an array
// in linear time and without extra space
void findFrequency(int A[], int n)
{
    // For each element `A[i]`, increment the value present at index
    // `(A[i] % n)` by `n`
    for (int i = 0; i < n; i++) {
        A[A[i] % n] += n;
    }

    // Traverse the modified array and print their frequencies.
    // If `A[i] > n`, then `i` appears in array `A[i]/n` times.
    for (int i = 0; i < n; i++)
    {
        if (A[i]/n != 0) {
            printf("Element %d appears %d times\n", i, A[i]/n);
        }
    }

    // Restore the array
    for (int i = 0; i < n; i++) {
        A[i] = A[i] % n;
    }
}

int main(void)
{
    int A[] = { 2, 3, 3, 2, 1 };
    int n = sizeof(A) / sizeof(A[0]);

    findFrequency(A, n);

    return 0;
}
```

##

```java
class Main
{
    // Function to calculate the frequency of all elements in the array
    // in linear time and without extra space
    public static void findFrequency(int[] A)
    {
        int n = A.length;

        // For each element `A[i]`, increment the value present at index
        // `(A[i] % n)` by `n`
        for (int i = 0; i < n; i++) {
            A[A[i] % n] += n;
        }

        // Traverse the modified array and print their frequencies.
        // If `A[i] > n`, then `i` appears in array `A[i]/n` times.
        for (int i = 0; i < n; i++)
        {
            if (A[i] / n != 0) {
                System.out.printf("Element %d appears %d times\n", i, A[i] / n);
            }
        }

        // Restore the array
        for (int i = 0; i < n; i++) {
            A[i] = A[i] % n;
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 3, 3, 2, 1 };
        findFrequency(A);
    }
}
```

##

```python3
# Function to calculate the frequency of all the list elements
# in linear time and without extra space
def findFrequency(A):

    n = len(A)

    # For each element `A[i]`, increment the value present at index
    # `(A[i] % n)` by `n`
    for i in range(n):
        A[A[i] % n] += n

    # Traverse the modified list and print their frequencies.
    # If `A[i] > n`, then `i` appears in list `A[i]/n` times.
    for i in range(n):
        if A[i] // n:
            print(f"{i} appears {A[i] // n} times")

    # Restore the list
    for i in range(n):
        A[i] = A[i] % n

if __name__ == '__main__':

    A = [2, 3, 3, 2, 1]
    findFrequency(A)
```

**Output:** Element 1 appears 1 times Element 2 appears 2 times Element 3 appears 2 times

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:** Modify the program for array elements lying in range 1 to `n`.
