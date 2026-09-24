# Print all triplets that form a geometric progression

> Source: https://www.techiedelight.com/print-triplets-forms-geometric-progression/

[Array](https://www.techiedelight.com/Category/Array/)

Given a sorted array of distinct positive integers, print all triplets that forms a geometric progression with an integral common ratio.

A [geometric progression](https://en.wikipedia.org/wiki/Geometric_progression) is a sequence of numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number called the common ratio. For example, sequence 2, 6, 18, 54,… is a geometric progression with a common ratio of 3.

For example,

**Input:** A[] = { 1, 2, 6, 10, 18, 54 } **Output:** 2 6 18 6 18 54 **Input:** A[] = { 2, 8, 10, 15, 16, 30, 32, 64 } **Output:** 2 8 32 8 16 32 16 32 64 **Input:** A[] = { 1, 2, 6, 18, 36, 54 } **Output:** 2 6 18 1 6 36 6 18 54 **Input:** A[] = { 1, 2, 4, 16 } **Output:** 1 2 4 1 4 16 **Input:** A[] = {1, 2, 3, 6, 18, 22}; **Output:** 2 6 18

> 

The idea is to start from the second element and fix every element as the middle element and search the other two elements in a triplet (one smaller and one greater). For an element `A[j]` to be in the middle of geometric progression, there exist elements `A[i]` and `A[k]` such that `(A[j] / A[i] = r)` and `(A[k] / A[j] = r)`. Here, `r` is a positive integer and `(0 <= i < j)` and `(j < k <= n-1)`.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

// Function to print all triplets that forms geometric progression
// in a given sorted array
void findAllTriplets(int A[], int n)
{
    if (n < 3) {
        return;
    }

    // One by one, fix every element as a middle element
    for (int j = 1; j < n - 1; j++)
    {
        // Initialize `i` and `k` for current `j`
        int i = j - 1, k = j + 1;

        // Find all `i` and `k` such that `(i, j, k)` form a GP triplet
        while (1)
        {
            // If `A[j]/A[i] = r`, and `A[k]/A[j] = r`, and `r` is an integer,
            // `(i, j, k)` forms a GP
            while (i >= 0 && k < n && (A[j] % A[i] == 0) &&
                    (A[k] % A[j] == 0) && (A[j] / A[i] == A[k] / A[j]))
            {
                // print the triplet
                printf("%d %d %d\n", A[i], A[j], A[k]);

                // since the array is sorted and elements are distinct
                k++ , i--;
            }

            if (i < 0 || k >= n) {
                break;
            }

            // If `A[j]` is multiple of `A[i]` and `A[k]` is multiple of `A[j]`,
            // then `A[j] / A[i] != A[k] / A[j]`; compare their values to
            // move to the next `k` or previous `i`
            if (A[j] % A[i] == 0 && A[k] % A[j] == 0)
            {
                if (A[j] / A[i] < A[k] / A[j]) {
                    i--;
                }
                else {
                    k++;
                }
            }

            // Otherwise, if `A[j]` is a multiple of `A[i]`, try next `k`.
            // Else, try the previous `i`.
            else if (A[j] % A[i] == 0) {
                k++;
            }
            else {
                i--;
            }
        }
    }
}

int main()
{
    int A[] = { 1, 2, 6, 10, 18, 54 };
    int n = sizeof(A) / sizeof(A[0]);

    findAllTriplets(A, n);

    return 0;
}
```

**Output:** 2 6 18 6 18 54

##

```java
class Main
{
    // Function to print all triplets that forms geometric progression
    // in a given sorted array
    public static void findAllTriplets(int[] A)
    {
        if (A.length < 3) {
            return;
        }

        // One by one, fix every element as a middle element
        for (int j = 1; j < A.length - 1; j++)
        {
            // Initialize `i` and `k` for current `j`
            int i = j - 1, k = j + 1;

            // Find all `i` and `k` such that `(i, j, k)` form a GP triplet
            while (true)
            {
                // If `A[j]/A[i] = r`, and `A[k]/A[j] = r`, and `r` is an integer,
                // `(i, j, k)` forms a GP
                while (i >= 0 && k <= A.length - 1 &&
                        (A[j] % A[i] == 0) && (A[k] % A[j] == 0) &&
                        (A[j] / A[i] == A[k] / A[j]))
                {
                    // print the triplet
                    System.out.println(A[i] + " " + A[j] + " " + A[k]);

                    // since the array is sorted and elements are distinct
                    k++;
                    i--;
                }

                if (i < 0 || k >= A.length) {
                    break;
                }

                // If `A[j]` is multiple of `A[i]` and `A[k]` is multiple of `A[j]`,
                // then `A[j] / A[i] != A[k] / A[j]`; compare their values
                // to move to the next `k` or previous `i`
                if (A[j] % A[i] == 0 && A[k] % A[j] == 0)
                {
                    if (A[j] / A[i] < A[k] / A[j]) {
                        i--;
                    }
                    else {
                        k++;
                    }
                }

                // Otherwise, if `A[j]` is a multiple of `A[i]`, try next `k`.
                // Else, try the previous `i`.
                else if (A[j] % A[i] == 0) {
                    k++;
                }
                else {
                    i--;
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 6, 10, 18, 54 };

        findAllTriplets(A);
    }
}
```

##

```python3
# Function to print all triplets that forms geometric progression
# in a given sorted list
def findAllTriplets(A):

    if len(A) < 3:
        return

    # One by one, fix every element as a middle element
    for j in range(1, len(A) - 1):

        # Initialize `i` and `k` for current `j`
        i = j - 1
        k = j + 1

        # Find all `i` and `k` such that `(i, j, k)` form a GP triplet
        while True:

            # If `A[j]/A[i] = r`, and `A[k]/A[j] = r`, and `r` is an integer,
            # `(i, j, k)` forms a GP
            while (i >= 0 and k <= len(A) - 1 and
                (A[j] % A[i] == 0) and (A[k] % A[j] == 0) and
                (A[j] / A[i] == A[k] / A[j])):

                # print the triplet
                print((A[i], A[j], A[k]))

                # since the list is sorted and elements are distinct
                k = k + 1
                i = i - 1

            if i < 0 or k >= len(A):
                break

            # If `A[j]` is multiple of `A[i]` and `A[k]` is multiple of `A[j]`,
            # then `A[j] / A[i] != A[k] / A[j]`; compare their values
            # to move to the next `k` or previous `i`
            if A[j] % A[i] == 0 and A[k] % A[j] == 0:
                if A[j] / A[i] < A[k] / A[j]:
                    i = i - 1
                else:
                    k = k + 1

            # Otherwise, if `A[j]` is a multiple of `A[i]`, try next `k`.
            # Else, try the previous `i`.
            elif A[j] % A[i] == 0:
                k = k + 1
            else:
                i = i - 1

if __name__ == '__main__':

    A = [1, 2, 6, 10, 18, 54]
    findAllTriplets(A)
```

The time complexity of the above solution is O(n2) as for every `j` in an input array of size `n`, finding `i` and `k` takes linear time. The auxiliary space required by the program is O(1).

**Author:** Aditya Goel

Also See:

> [Print all triplets that form an arithmetic progression](https://www.techiedelight.com/print-triplets-forms-arithmetic-progression/ "Print all triplets that form an arithmetic progression")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
