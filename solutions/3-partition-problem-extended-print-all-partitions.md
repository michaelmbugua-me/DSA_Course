# 3–partition problem extended | Printing all partitions

> Source: https://www.techiedelight.com/3-partition-problem-extended-print-all-partitions/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of positive integers, which can be partitioned into three disjoint subsets having the same sum, print the partitions.

For example, consider the following set:

`S = { 7, 3, 2, 1, 5, 4, 8 }`

We can partition `S` into three partitions, each having a sum of 10.

`S1 = {7, 3}` `S2 = {5, 4, 1}` `S3 = {8, 2}`

> 

As discussed in the [previous post](https://techiedelight.com/3-partition-problem/), the 3–partition problem is a special case of the [Partition Problem](https://techiedelight.com/partition-problem/). The goal is to partition `S` into 3 subsets with an equal sum, unlike the partition problem, where the goal is to partition `S` into two subsets with an equal sum.

This post will extend the previous solution to print the partitions. The idea is to maintain a separate array `A[]` to keep track of subsets elements. The implementation can be seen below in C++, Java, and Python. Note that if the value of `A[i]` is `k`, it means that the `i'th` item of `S` is part of the `k'th` subset.

```cpp
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

// Helper function to 3–partition problem.
// It returns true if there exist three subsets with a given sum
bool isSubsetExist(vector<int> const &S, int n, int a, int b, int c, vector<int> &arr)
{
    // return true if the subset is found
    if (a == 0 && b == 0 && c == 0) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    // Case 1. The current item becomes part of the first subset
    bool A = false;
    if (a - S[n] >= 0)
    {
        arr[n] = 1;        // current element goes to the first subset
        A = isSubsetExist(S, n - 1, a - S[n], b, c, arr);
    }

    // Case 2. The current item becomes part of the second subset
    bool B = false;
    if (!A && (b - S[n] >= 0))
    {
        arr[n] = 2;        // current element goes to the second subset
        B = isSubsetExist(S, n - 1, a, b - S[n], c, arr);
    }

    // Case 3. The current item becomes part of the third subset
    bool C = false;
    if ((!A && !B) && (c - S[n] >= 0))
    {
        arr[n] = 3;        // current element goes to the third subset
        C = isSubsetExist(S, n - 1, a, b, c - S[n], arr);
    }

    // return true if we get a solution
    return A || B || C;
}

// Function for solving the 3–partition problem. It prints the subset if
// the given set `S[0…n-1]` can be divided into three subsets with an equal sum
void partition(vector<int> const &S)
{
    // get the sum of all elements in the set
    int sum = accumulate(S.begin(), S.end(), 0);

    // total number of items in `S`
    int n = S.size();

    // construct an array to track the subsets
    // `arr[i] = k` represents i'th item of `S` is part of k'th subset
    vector<int> arr(n);

    // set result to true if the sum is divisible by 3 and the set `S` can
    // be divided into three subsets with an equal sum
    bool result = (n >= 3) && !(sum % 3) &&
            isSubsetExist(S, n - 1, sum/3, sum/3, sum/3, arr);

    if (!result)
    {
        cout << "3-Partition of set is not possible";
        return;
    }

    // print the partitions
    for (int i = 0; i < 3; i++)
    {
        cout << "Partition " << i << " is ";
        for (int j = 0; j < n; j++)
        {
            if (arr[j] == i + 1) {
                cout << S[j] << " ";
            }
        }
        cout << endl;
    }
}

int main()
{
    // Input: a set of integers
    vector<int> S = { 7, 3, 2, 1, 5, 4, 8 };

    partition(S);

    return 0;
}
```

**Output:** Partition 0 is 2 8 Partition 1 is 1 5 4 Partition 2 is 7 3

##

```java
import java.util.Arrays;

class Main
{
    // Helper function to 3–partition problem.
    // It returns true if there exist three subsets with a given sum
    public static boolean isSubsetExist(int[] S, int n, int a, int b, int c, int[] arr)
    {
        // return true if the subset is found
        if (a == 0 && b == 0 && c == 0) {
            return true;
        }

        // base case: no items left
        if (n < 0) {
            return false;
        }

        // Case 1. The current item becomes part of the first subset
        boolean A = false;
        if (a - S[n] >= 0)
        {
            arr[n] = 1;        // current element goes to the first subset
            A = isSubsetExist(S, n - 1, a - S[n], b, c, arr);
        }

        // Case 2. The current item becomes part of the second subset
        boolean B = false;
        if (!A && (b - S[n] >= 0))
        {
            arr[n] = 2;        // current element goes to the second subset
            B = isSubsetExist(S, n - 1, a, b - S[n], c, arr);
        }

        // Case 3. The current item becomes part of the third subset
        boolean C = false;
        if ((!A && !B) && (c - S[n] >= 0))
        {
            arr[n] = 3;        // current element goes to the third subset
            C = isSubsetExist(S, n - 1, a, b, c - S[n], arr);
        }

        // return true if we get a solution
        return A || B || C;
    }

    // Function for solving the 3–partition problem. It prints the subset if
    // the given set `S[0…n-1]` can be divided into three subsets with an equal sum
    public static void partition(int[] S)
    {
        // get the sum of all elements in the set
        int sum = Arrays.stream(S).sum();

        // construct an array to track the subsets
        // `A[i] = k` represents i'th item of `S` is part of k'th subset
        int[] A = new int[S.length];

        // set result to true if the sum is divisible by 3 and the set `S` can
        // be divided into three subsets with an equal sum
        boolean result = (S.length >= 3) &&
                    (sum % 3) == 0 &&
                    isSubsetExist(S, S.length - 1, sum/3, sum/3, sum/3, A);

        if (!result)
        {
            System.out.print("3-Partition of set is not possible");
            return;
        }

        // print the partitions
        for (int i = 0; i < 3; i++)
        {
            System.out.print("Partition " + i + " is ");
            for (int j = 0; j < S.length; j++)
            {
                if (A[j] == i + 1) {
                    System.out.print(S[j] + " ");
                }
            }
            System.out.print(System.lineSeparator());
        }
    }

    public static void main(String[] args)
    {
        // Input: a set of integers
        int[] S = { 7, 3, 2, 1, 5, 4, 8 };
        partition(S);
    }
}
```

##

```python3
# Helper function to 3–partition problem.
# It returns true if there exist three subsets with a given sum
def isSubsetExist(S, n, a, b, c, list):

    # return true if the subset is found
    if a == 0 and b == 0 and c == 0:
        return True

    # base case: no items left
    if n < 0:
        return False

    # Case 1. The current item becomes part of the first subset
    A = False
    if a - S[n] >= 0:
        list[n] = 1        # current element goes to the first subset
        A = isSubsetExist(S, n - 1, a - S[n], b, c, list)

    # Case 2. The current item becomes part of the second subset
    B = False
    if not A and (b - S[n] >= 0):
        list[n] = 2        # current element goes to the second subset
        B = isSubsetExist(S, n - 1, a, b - S[n], c, list)

    # Case 3. The current item becomes part of the third subset
    C = False
    if (not A and not B) and (c - S[n] >= 0):
        list[n] = 3        # current element goes to the third subset
        C = isSubsetExist(S, n - 1, a, b, c - S[n], list)

    # return true if we get a solution
    return A or B or C

# Function for solving the 3–partition problem. It prints the subset if
# given set `S[0…n-1]` can be divided into three subsets with an equal sum
def partition(S):

    # get the sum of all elements in the set
    total = sum(S)

    # construct a list to track the subsets
    # `A[i] = k` represents i'th item of `S` is part of k'th subset
    A = [None] * len(S)

    # set result to true if the sum is divisible by 3 and the set `S` can
    # be divided into three subsets with an equal sum
    result = (len(S) >= 3) and (total % 3) == 0 and \
        isSubsetExist(S, len(S) - 1, total / 3, total / 3, total / 3, A)

    if not result:
        print('3-Partition of set is not possible')
        return

    # print the partitions
    for i in range(3):
        print(f'Partition {i} is', [S[j] for j in range(len(S)) if A[j] == i + 1])

if __name__ == '__main__':

    # Input: a set of integers
    S = [7, 3, 2, 1, 5, 4, 8]
    partition(S)
```

The time complexity of the above solution is exponential and occupies space in the call stack. It can be optimized using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/), as discussed in the [previous post](https://techiedelight.com/3-partition-problem/).

**Exercise:** Extend the solution to [print k–partitions](https://techiedelight.com/k-partition-problem-print-all-subsets/)

Also See:

> [K–Partition Problem | Printing all partitions](https://www.techiedelight.com/k-partition-problem-print-all-subsets/ "K–Partition Problem | Printing all partitions")

> [3–Partition Problem](https://www.techiedelight.com/3-partition-problem/ "3–Partition Problem")

> [Partition Problem using Dynamic Programming](https://www.techiedelight.com/partition-problem/ "Partition Problem using Dynamic Programming")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 152

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
