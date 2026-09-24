# Print all triplets that form an arithmetic progression

> Source: https://www.techiedelight.com/print-triplets-forms-arithmetic-progression/

[Array](https://www.techiedelight.com/Category/Array/)

Given a sorted array of distinct positive integers, print all triplets that forms an arithmetic progression with an integral common difference.

An [arithmetic progression](https://en.wikipedia.org/wiki/arithmetic_progression) is a sequence of numbers such that the difference between the consecutive terms is constant. For instance, sequence 5, 7, 9, 11, 13, 15, … is an arithmetic progression with a common difference of 2.

For example,

**Input:** A[] = { 5, 8, 9, 11, 12, 15 } **Output:** 5 8 11 9 12 15 **Input:** A[] = { 1, 3, 5, 6, 8, 9, 15 } **Output:** 1 3 5 1 5 9 3 6 9 1 8 15 3 9 15

> 

The idea is to consider every element as the middle element of arithmetic progression, starting from the second element and searching the other two arithmetic triplet elements. For an element `A[j]` to be middle of arithmetic progression, there exist two elements `A[i]` and `A[k]` such that `(A[j] - A[i] = A[k] - A[j])` or `(A[i] + A[k] == 2 × A[j])`, where `(0 <= i < j < k <= n-1)`.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Function to print all triplets that forms arithmetic progression
// in a given sorted array
void findAllTriplets(int A[], int n)
{
    // consider `A[j]` as the middle element of AP
    for (int j = 1; j < n - 1; j++)
    {
        // start with the left and right index of `j`
        int i = j - 1, k = j + 1;

        // Find all `i` and `k` such that `(i, j, k)` form an AP triplet
        while (i >= 0 && k < n)
        {
            // if `(A[i], A[j], A[k])` forms a triplet
            if (A[i] + A[k] == 2 * A[j])
            {
                // print the triplet
                printf("%d %d %d\n", A[i], A[j], A[k]);

                // Since the array is sorted and elements are distinct
                k++, i--;
            }
            // otherwise, if `(A[i] + A[k])` is less than `2×A[j]` then
            // try next `k`. Else, try the previous `i`.
            else if (A[i] + A[k] < 2 * A[j]) {
                k++;
            }
            else {
                i--;
            }
        }
    }
}

int main(void)
{
    int A[] = { 1, 3, 5, 6, 8, 9, 15 };
    int n = sizeof(A) / sizeof(A[0]);

    findAllTriplets(A, n);

    return 0;
}
```

**Output:** 1 3 5 1 5 9 3 6 9 1 8 15 3 9 15

##

```java
class Main
{
    // Function to print all triplets that forms arithmetic progression
    // in a given sorted array
    public static void findAllTriplets(int[] A)
    {
        if (A.length < 3) {
            return;
        }

        // consider `A[j]` as the middle element of AP
        for (int j = 1; j < A.length - 1; j++)
        {
            // start with the left and right index of `j`
            int i = j - 1, k = j + 1;

            // Find all `i` and `k` such that `(i, j, k)` form an AP triplet
            while (i >= 0 && k < A.length)
            {
                // if `(A[i], A[j], A[k])` forms a triplet
                if (A[i] + A[k] == 2 * A[j])
                {
                    // print the triplet
                    System.out.println(A[i] + " " + A[j] + " " + A[k]);

                    // Since the array is sorted and elements are distinct
                    k++; i--;
                }
                // otherwise, if `(A[i] + A[k])` is less than `2×A[j]` then
                // try next `k`. Else, try the previous `i`.
                else if (A[i] + A[k] < 2 * A[j]) {
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
        int[] A = { 1, 3, 5, 6, 8, 9, 15 };

        findAllTriplets(A);
    }
}
```

##

```python3
# Function to print all triplets that forms arithmetic progression
# in a given sorted list
def findAllTriplets(A):

    if len(A) < 3:
        return

    # consider `A[j]` as the middle element of AP
    for j in range(1, len(A) - 1):

        # start with the left and right index of `j`
        i = j - 1
        k = j + 1

        # Find all `i` and `k` such that `(i, j, k)` form an AP triplet
        while i >= 0 and k < len(A):

            # if `(A[i], A[j], A[k])` forms a triplet
            if A[i] + A[k] == 2 * A[j]:

                # print the triplet
                print((A[i], A[j], A[k]))

                # Since the list is sorted and elements are distinct
                k = k + 1
                i = i - 1

            # otherwise, if `(A[i] + A[k])` is less than `2×A[j]` then
            # try next `k`. Else, try the previous `i`.
            elif A[i] + A[k] < 2 * A[j]:
                k = k + 1
            else:
                i = i - 1

if __name__ == '__main__':

    A = [1, 3, 5, 6, 8, 9, 15]
    findAllTriplets(A)
```

The time complexity of the above solution is O(n2) as for every `j` in an input array of size `n`, finding `i` and `k` takes in linear time. The auxiliary space required by the program is O(1).

Also See:

> [Print all triplets that form a geometric progression](https://www.techiedelight.com/print-triplets-forms-geometric-progression/ "Print all triplets that form a geometric progression")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 173

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
