# Sort an array of 0’s, 1’s, and 2’s (Dutch National Flag Problem)

> Source: https://www.techiedelight.com/sort-array-containing-0s-1s-2s-dutch-national-flag-problem/

Given an array containing only 0’s, 1’s, and 2’s, sort it in linear time and using constant space.

For example,

**Input:** { 0, 1, 2, 2, 1, 0, 0, 2, 0, 1, 1, 0 } **Output:** { 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2 }

> 

A simple solution would be to perform a [counting sort](https://techiedelight.com/counting-sort-algorithm-implementation/). We count the total number of 0’s, 1’s, and 2’s and then put them in the array in their correct order. The time complexity of this solution is O(n), where `n` is the size of the input. However, this requires two traversals of the array.

We can rearrange the array in a single traversal using an alternative **linear-time partition routine** that separates the values into three groups:

  * The values less than the pivot,
  * The values equal to the pivot, and
  * The values greater than the pivot.

To solve this particular problem, consider 1 as a pivot. The following linear-time partition routine in C++, Java, and Python is similar to 3–way partitioning for the [Dutch national flag problem](https://en.wikipedia.org/wiki/Dutch_national_flag_problem).

```cpp
#include <stdio.h>

// Utility function to swap elements `A[i]` and `A[j]` in an array
void swap(int A[], int i, int j)
{
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Linear time partition routine to sort an array containing 0, 1, and 2.
// It is similar to 3–way partitioning for the Dutch national flag problem.
void threeWayPartition(int A[], int end)
{
    int start = 0, mid = 0;
    int pivot = 1;

    while (mid <= end)
    {
        if (A[mid] < pivot)         // current element is 0
        {
            swap(A, start, mid);
            ++start, ++mid;
        }
        else if (A[mid] > pivot)    // current element is 2
        {
            swap(A, mid, end);
            --end;
        }
        else {                      // current element is 1
            ++mid;
        }
    }
}

int main()
{
    int A[] = { 0, 1, 2, 2, 1, 0, 0, 2, 0, 1, 1, 0 };
    int n = sizeof(A)/sizeof(A[0]);

    threeWayPartition(A, n - 1);

    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }

    return 0;
}
```

**Output:** 0 0 0 0 0 1 1 1 1 2 2 2

##

```java
import java.util.Arrays;

class Main
{
    // Linear time partition routine to sort an array containing 0, 1, and 2.
    // It is similar to 3–way partitioning for the Dutch national flag problem.
    public static void threeWayPartition(int[] A)
    {
        int start = 0, mid = 0;
        int pivot = 1;
        int end = A.length - 1;

        while (mid <= end)
        {
            if (A[mid] < pivot)         // current element is 0
            {
                swap(A, start, mid);
                ++start;
                ++mid;
            }
            else if (A[mid] > pivot)    // current element is 2
            {
                swap(A, mid, end);
                --end;
            }
            else {                      // current element is 1
                ++mid;
            }
        }
    }

    // Utility function to swap elements `A[i]` and `A[j]` in the array
    private static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    public static void main (String[] args)
    {
        int[] A = { 0, 1, 2, 2, 1, 0, 0, 2, 0, 1, 1, 0 };

        threeWayPartition(A);
        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# Utility function to swap elements `A[i]` and `A[j]` in the list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Linear time partition routine to sort a list containing 0, 1, and 2.
# It is similar to 3–way partitioning for the Dutch national flag problem.
def threeWayPartition(A):

    start = mid = 0
    pivot = 1
    end = len(A) - 1

    while mid <= end:
        if A[mid] < pivot:      # current element is 0
            swap(A, start, mid)
            start = start + 1
            mid = mid + 1
        elif A[mid] > pivot:    # current element is 2
            swap(A, mid, end)
            end = end - 1
        else:                   # current element is 1
            mid = mid + 1

if __name__ == '__main__':

    A = [0, 1, 2, 2, 1, 0, 0, 2, 0, 1, 1, 0]
    threeWayPartition(A)
    print(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

**Suggested Read:**

> [Quicksort using Dutch National Flag Algorithm](https://techiedelight.com/quicksort-using-dutch-national-flag-algorithm/)

**Exercise:** Modify the program to rearrange the elements in opposite order (in descending order).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
