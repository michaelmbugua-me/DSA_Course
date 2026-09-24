# K–Partition Problem | Printing all partitions

> Source: https://www.techiedelight.com/k-partition-problem-print-all-subsets/

In the k–partition problem, we need to partition an array of positive integers into `k` disjoint subsets that all have an equal sum, and they completely cover the set.

For example, consider set `S = { 7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4 }`.

1\. `S` can be partitioned into two partitions, each having a sum of 30.

`S1 = { 5, 3, 8, 4, 6, 4 }` `S2 = { 7, 3, 5, 12, 2, 1 }`

2\. `S` can be partitioned into three partitions, each having a sum of 20.

`S1 = { 2, 1, 3, 4, 6, 4 }` `S2 = { 7, 5, 8 }` `S3 = { 3, 5, 12 }`

3\. `S` can be partitioned into four partitions, each having a sum of 15.

`S1 = { 1, 4, 6, 4 }` `S2 = { 2, 5, 8 }` `S3 = { 12, 3 }` `S4 = { 7, 3, 5 }`

4\. `S` can be partitioned into five partitions, each having a sum of 12.

`S1 = { 2, 6, 4 }` `S2 = { 8, 4 }` `S3 = { 3, 1, 5, 3 }` `S4 = { 12 }` `S5 = { 7, 5 }`

> 

k-partition problem is a special case of [Partition Problem](https://techiedelight.com/partition-problem/), where the goal is to partition `S` into two subsets with equal sum. This post will extend the [3-partition](https://techiedelight.com/3-partition-problem/) solution to find and print k–partitions.

We can start by calculating the sum of all elements in the set. If the sum is not divisible by `k`, we can’t divide the array into `k` subsets with an equal sum. If the sum is divisible by `k`, check if `k` subsets with the sum of elements equal to `sum/k` exists or not. We can find this by considering each item in the given array one by one, and for each item, include it in the `i'th` subset & recur for the remaining items with the remaining sum. We [backtrack](https://techiedelight.com/backtracking-interview-questions/) if the solution is not found by including a current item in the `i'th` subset and try for the `(i+i)'th` subset.

The solution should return true and print the subsets when `k` subsets each with zero-sum are found. For printing the partitions, maintain a separate array `A[]` to keep track of subsets elements. If the value of `A[i]` is `k`, then it means that the `i'th` item of `S` is part of the `k'th` subset.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <numeric>
using namespace std;

// Function to check if all subsets are filled or not
bool checkSum(int sumLeft[], int k)
{
    int r = true;
    for (int i = 0; i < k; i++)
    {
        if (sumLeft[i] != 0) {
            r = false;
        }
    }

    return r;
}

// Helper function for solving `k` partition problem.
// It returns true if there exist `k` subsets with the given sum
bool subsetSum(int S[], int n, int sumLeft[], int A[], int k)
{
    // return true if a subset is found
    if (checkSum(sumLeft, k)) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    bool result = false;

    // consider current item `S[n]` and explore all possibilities
    // using backtracking
    for (int i = 0; i < k; i++)
    {
        if (!result && (sumLeft[i] - S[n]) >= 0)
        {
            // mark the current element subset
            A[n] = i + 1;

            // add the current item to the i'th subset
            sumLeft[i] = sumLeft[i] - S[n];

            // recur for remaining items
            result = subsetSum(S, n - 1, sumLeft, A, k);

            // backtrack: remove the current item from the i'th subset
            sumLeft[i] = sumLeft[i] + S[n];
        }
    }

    // return true if we get a solution
    return result;
}

// Function for solving k–partition problem. It prints the subsets if
// set `S[0…n-1]` can be divided into `k` subsets with equal sum
void partition(int S[], int n, int k)
{
    // base case
    if (n < k)
    {
        cout << "k-partition of set S is not possible";
        return;
    }

    // get the sum of all elements in the set
    int sum = accumulate(S, S + n, 0);

    int A[n], sumLeft[k];

    // create an array of size `k` for each subset and initialize it
    // by their expected sum, i.e., `sum/k`
    for (int i = 0; i < k; i++) {
        sumLeft[i] = sum/k;
    }

    // return true if the sum is divisible by `k` and set `S` can
    // be divided into `k` subsets with equal sum
    bool result = !(sum % k) && subsetSum(S, n - 1, sumLeft, A, k);

    if (!result)
    {
        cout << "k-partition of set S is not possible";
        return;
    }

    // print all k–partitions
    for (int i = 0; i < k; i++)
    {
        cout << "Partition " << i << " is ";
        for (int j = 0; j < n; j++)
        {
            if (A[j] == i + 1) {
                cout << S[j] << " ";
            }
        }
        cout << endl;
    }
}

int main()
{
    // Input: a set of integers
    int S[] = { 7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4 };

    // total number of items in `S`
    int n = sizeof(S) / sizeof(S[0]);
    int k = 5;

    partition(S, n, k);

    return 0;
}
```

**Output:** Partition 0 is 2 6 4 Partition 1 is 8 4 Partition 2 is 3 1 5 3 Partition 3 is 12 Partition 4 is 7 5

##

```java
import java.util.Arrays;
import java.util.stream.IntStream;

class Main
{
    // Function to check if all subsets are filled or not
    private static boolean checkSum(int[] sumLeft, int k)
    {
        boolean r = true;
        for (int i = 0; i < k; i++)
        {
            if (sumLeft[i] != 0) {
                r = false;
            }
        }

        return r;
    }

    // Helper function for solving `k` partition problem.
    // It returns true if there exist `k` subsets with the given sum
    private static boolean subsetSum(int[] S, int n, int[] sumLeft, int[] A, int k)
    {
        // return true if a subset is found
        if (checkSum(sumLeft, k)) {
            return true;
        }

        // base case: no items left
        if (n < 0) {
            return false;
        }

        boolean result = false;

        // consider current item `S[n]` and explore all possibilities
        // using backtracking
        for (int i = 0; i < k; i++)
        {
            if (!result && (sumLeft[i] - S[n]) >= 0)
            {
                // mark the current element subset
                A[n] = i + 1;

                // add the current item to the i'th subset
                sumLeft[i] = sumLeft[i] - S[n];

                // recur for remaining items
                result = subsetSum(S, n - 1, sumLeft, A, k);

                // backtrack: remove the current item from the i'th subset
                sumLeft[i] = sumLeft[i] + S[n];
            }
        }

        // return true if we get a solution
        return result;
    }

    // Function for solving k–partition problem. It prints the subsets if
    // set `S[0…n-1]` can be divided into `k` subsets with equal sum
    public static void partition(int[] S, int k)
    {
        // get the total number of items in `S`
        int n = S.length;

        // base case
        if (n < k)
        {
            System.out.println("k-partition of set S is not possible");
            return;
        }

        // get the sum of all elements in the set
        int sum = IntStream.of(S).sum();
        int[] A = new int[n];

        // create an array of size `k` for each subset and initialize it
        // by their expected sum, i.e., `sum/k`
        int[] sumLeft = new int[k];
        Arrays.fill(sumLeft, sum/k);

        // return true if the sum is divisible by `k` and set `S` can
        // be divided into `k` subsets with equal sum
        boolean result = (sum % k) == 0 && subsetSum(S, n - 1, sumLeft, A, k);

        if (!result)
        {
            System.out.println("k-partition of set S is not possible");
            return;
        }

        // print all k–partitions
        for (int i = 0; i < k; i++)
        {
            System.out.print("Partition " + i + " is ");
            for (int j = 0; j < n; j++)
            {
                if (A[j] == i + 1) {
                    System.out.print(S[j] + " ");
                }
            }
            System.out.println();
        }
    }

    public static void main(String[] args)
    {
        // Input: a set of integers
        int[] S = { 7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4 };
        int k = 5;

        partition(S, k);
    }
}
```

##

```python3
# Function to check if all subsets are filled or not
def checkSum(sumLeft, k):

    r = True
    for i in range(k):
        if sumLeft[i]:
            r = False

    return r

# Helper function for solving `k` partition problem.
# It returns true if there exist `k` subsets with the given sum
def subsetSum(S, n, sumLeft, A, k):

    # return true if a subset is found
    if checkSum(sumLeft, k):
        return True

    # base case: no items left
    if n < 0:
        return False

    result = False

    # consider current item `S[n]` and explore all possibilities
    # using backtracking
    for i in range(k):
        if not result and (sumLeft[i] - S[n]) >= 0:

            # mark the current element subset
            A[n] = i + 1

            # add the current item to the i'th subset
            sumLeft[i] = sumLeft[i] - S[n]

            # recur for remaining items
            result = subsetSum(S, n - 1, sumLeft, A, k)

            # backtrack: remove the current item from the i'th subset
            sumLeft[i] = sumLeft[i] + S[n]

    # return true if we get a solution
    return result

# Function for solving k–partition problem. It prints the subsets if
# set `S[0…n-1]` can be divided into `k` subsets with equal sum
def partition(S, k):

    # get the total number of items in `S`
    n = len(S)

    # base case
    if n < k:
        print("k-partition of set S is not possible")
        return

    # get the sum of all elements in the set
    total = sum(S)
    A = [None] * n

    # create a list of size `k` for each subset and initialize it
    # by their expected sum, i.e., `sum/k`
    sumLeft = [total // k] * k

    # return true if the sum is divisible by `k` and set `S` can
    # be divided into `k` subsets with equal sum
    result = (total % k) == 0 and subsetSum(S, n - 1, sumLeft, A, k)

    if not result:
        print("k-partition of set S is not possible")
        return

    # print all k–partitions
    for i in range(k):
        print(f"Partition {i} is", [S[j] for j in range(n) if A[j] == i + 1])

if __name__ == '__main__':

    # Input: a set of integers
    S = [7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4]
    k = 5

    partition(S, k)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [3–partition problem extended | Printing all partitions](https://www.techiedelight.com/3-partition-problem-extended-print-all-partitions/ "3–partition problem extended | Printing all partitions")

> [3–Partition Problem](https://www.techiedelight.com/3-partition-problem/ "3–Partition Problem")

> [Partition Problem using Dynamic Programming](https://www.techiedelight.com/partition-problem/ "Partition Problem using Dynamic Programming")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
