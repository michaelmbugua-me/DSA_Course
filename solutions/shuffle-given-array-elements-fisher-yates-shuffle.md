# Shuffle an array using Fisher–Yates shuffle algorithm

> Source: https://www.techiedelight.com/shuffle-given-array-elements-fisher-yates-shuffle/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) shuffle it. The algorithm should produce an unbiased permutation, i.e., every permutation is equally likely.

> 

Fisher–Yates shuffle is an algorithm to generate random permutations. It takes time proportional to the total number of items being shuffled and shuffles them in place. The algorithm swaps the element at each iteration at random among all remaining unvisited indices, including the element itself.

Here’s the complete algorithm:

**— To shuffle an array ‘a’ of ‘n’ elements:** for i from n-1 down to 1 do j = random integer such that 0 <= j <= i exchange a[j] and a[i]

Following is the implementation of the above algorithm in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Utility function to swap elements `A[i]` and `A[j]` in an array
void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to shuffle an array `A[]` of `n` elements
void shuffle(int A[], int n)
{
    // read array from the highest index to lowest
    for (int i = n - 1; i >= 1; i--)
    {
        // generate a random number `j` such that `0 <= j <= i`
        int j = rand() % (i + 1);

        // swap the current element with the randomly generated index
        swap(A, i, j);
    }
}

int main(void)
{
    int A[] = { 1, 2, 3, 4, 5, 6 };
    int n = sizeof(A) / sizeof(A[0]);

    // seed for random input
    srand(time(NULL));

    shuffle(A, n);

    // print the shuffled array
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.Random;

class Main
{
    // Utility function to swap elements `A[i]` and `A[j]` in the array
    private static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Function to shuffle an array `A[]`
    public static void shuffle(int[] A)
    {
        // read array from the highest index to lowest
        for (int i = A.length - 1; i >= 1; i--)
        {
            Random rand = new Random();

            // generate a random number `j` such that `0 <= j <= i`
            int j = rand.nextInt(i + 1);

            // swap the current element with the randomly generated index
            swap(A, i, j);
        }
    }

    public static void main (String[] args)
    {
        int[] A = { 1, 2, 3, 4, 5, 6 };

        shuffle(A);

        // print the shuffled array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
from random import randrange

# Utility function to swap elements `A[i]` and `A[j]` in a list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to shuffle a list `A`
def shuffle(A):

    # read list from the highest index to lowest
    for i in reversed(range(1, len(A))):

        # generate a random number `j` such that 0 <= j <= i
        j = randrange(i + 1)

        # swap the current element with the randomly generated index
        swap(A, i, j)

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6]

    shuffle(A)

    # print the shuffled list
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input. An equivalent version that shuffles the array in the opposite direction (from the lowest index to the highest) is:

**— To shuffle an array ‘a’ of ‘n’ elements:** for i from 0 to n-2 do j = random integer such that i <= j < n exchange a[i] and a[j]

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Utility function to swap elements `A[i]` and `A[j]` in an array
void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to shuffle an array `A` of `n` elements
void shuffle(int A[], int n)
{
    // read array from the lowest index to highest
    for (int i = 0; i <= n - 2; i++)
    {
        // generate a random number `j` such that `i <= j < n`
        int j = i + rand() % (n - i);

        // swap the current element with the randomly generated index
        swap(A, i, j);
    }
}

int main(void)
{
    int A[] = { 1, 2, 3, 4, 5, 6 };
    int n = sizeof(A) / sizeof(A[0]);

    // seed for random input
    srand(time(NULL));

    shuffle(A, n);

    // print the shuffled array
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.Random;

class Main
{
    // Utility function to swap elements `A[i]` and `A[j]` in the array
    private static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Function to shuffle an array `A[]`
    public static void shuffle(int[] A)
    {
        // read array from the lowest index to highest
        for (int i = 0; i <= A.length - 2; i++)
        {
            Random rand = new Random();

            // generate a random number `j` such that `i <= j < n`
            int j = i + rand.nextInt(A.length - i);

            // swap the current element with the randomly generated index
            swap(A, i, j);
        }
    }

    public static void main (String[] args)
    {
        int[] A = { 1, 2, 3, 4, 5, 6 };

        shuffle(A);

        // print the shuffled array
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
from random import randrange

# Utility function to swap elements `A[i]` and `A[j]` in a list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to shuffle a list `A`
def shuffle(A):

    # read list from the lowest index to highest
    for i in range(len(A) - 1):
        # generate a random number `j` such that `i <= j < n`
        j = randrange(i, len(A))

        # swap the current element with the randomly generated index
        swap(A, i, j)

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6]

    shuffle(A)

    # print the shuffled list
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:**

Modify the code to generate random cyclic permutations of length `n` instead of random permutations (Sattolo’s algorithm).

**Reference:** <https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle>
