# Find all combinations of elements satisfying given constraints

> Source: https://www.techiedelight.com/find-combinations-of-elements-satisfies-given-constraints/

Given a positive number `n`, find all combinations of `2×n` elements such that every element from 1 to `n` appears exactly twice and the distance between its two appearances is exactly equal to the value of the element.

For example,

**Input:** n = 3 **Output:** 3 1 2 1 3 2 2 3 1 2 1 3 **Input:** n = 4 **Output:** 4 1 3 1 2 4 3 2 2 3 4 2 1 3 1 4 **Input:** n = 7 **Output:** 1 7 1 2 5 6 2 3 4 7 5 3 6 4 5 1 7 1 6 2 5 4 2 3 7 6 4 3 4 1 7 1 6 4 2 5 3 2 7 6 3 5 … … Total 52 configurations possible. _Note that no combination of elements is possible for some values of n like 2, 5, 6, etc._

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to try all possible combinations for the first element and recursively explore the remaining elements to check if they will lead to the solution or not. If the current configuration doesn’t result in a solution, backtrack. Note that an element `k` can be placed at position `i` and `(i+k+1)` in the output array where `i >= 0` and `(i+k+1) < 2×n`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Find all combinations that satisfy the given constraints
void findAllCombinations(vector<int> &arr, int x, int n)
{
    // if all elements are filled, print the solution
    if (x > n)
    {
        for (int i: arr) {
            cout << i << " ";
        }
        cout << endl;

        return;
    }

    // try all possible combinations for element `x`
    for (int i = 0; i < 2*n; i++)
    {
        // if position `i` and `i+x+1` are not occupied in the vector
        if (arr[i] == -1 && (i + x + 1) < 2*n &&
            arr[i + x + 1] == -1)
        {
            // place `x` at position `i` and `i+x+1`
            arr[i] = x;
            arr[i + x + 1] = x;

            // recur for the next element
            findAllCombinations(arr, x + 1, n);

            // backtrack (remove `x` from position `i` and `i+x+1`)
            arr[i] = -1;
            arr[i + x + 1] = -1;
        }
    }
}

int main()
{
    // given number
    int n = 7;

    // create a vector of double the size of a given number with
    // all its elements initialized by -1
    vector<int> arr(2*n, -1);

    // start from element 1
    int x = 1;
    findAllCombinations(arr, x, n);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Find all combinations that satisfy the given constraints
    public static void findAllCombinations(int[] arr, int x, int n)
    {
        // if all elements are filled, print the solution
        if (x > n)
        {
            System.out.println(Arrays.toString(arr));
            return;
        }

        // try all possible combinations for element `x`
        for (int i = 0; i < 2*n; i++)
        {
            // if position `i` and `i+x+1` are not occupied in the input
            if (arr[i] == -1 && (i + x + 1) < 2*n && arr[i + x + 1] == -1)
            {
                // place `x` at position `i` and `i+x+1`
                arr[i] = x;
                arr[i + x + 1] = x;

                // recur for the next element
                findAllCombinations(arr, x + 1, n);

                // backtrack (remove `x` from position `i` and `i+x+1`)
                arr[i] = -1;
                arr[i + x + 1] = -1;
            }
        }
    }

    public static void main(String[] args)
    {
        // given number
        int n = 7;

        // create an input array double the size of a given number with
        // all its elements initialized by -1
        int[] arr = new int[2*n];
        Arrays.fill(arr, -1);

        // start from element 1
        int x = 1;
        findAllCombinations(arr, x, n);
    }
}
```

##

```python3
# Find all combinations that satisfy the given constraints
def findAllCombinations(A, x, n):

    # if all elements are filled, print the solution
    if x > n:
        print(A)
        return

    # try all possible combinations for element `x`
    for i in range(2*n):

        # if position `i` and `i+x+1` are not occupied in the input
        if A[i] == -1 and (i + x + 1) < 2*n and A[i + x + 1] == -1:

            # place `x` at position `i` and `i+x+1`
            A[i] = x
            A[i + x + 1] = x

            # recur for the next element
            findAllCombinations(A, x + 1, n)

            # backtrack (remove `x` from position `i` and `i+x+1`)
            A[i] = -1
            A[i + x + 1] = -1

if __name__ == '__main__':

    # given number
    n = 7

    # create an input list of the size of a given number with
    # all its elements initialized by -1
    A = [-1] * (2*n)

    # start from element 1
    x = 1
    findAllCombinations(A, x, n)
```

**Output:** [1, 7, 1, 2, 5, 6, 2, 3, 4, 7, 5, 3, 6, 4] [1, 7, 1, 2, 6, 4, 2, 5, 3, 7, 4, 6, 3, 5] [1, 6, 1, 7, 2, 4, 5, 2, 6, 3, 4, 7, 5, 3] [1, 5, 1, 6, 7, 2, 4, 5, 2, 3, 6, 4, 7, 3] [1, 4, 1, 5, 6, 7, 4, 2, 3, 5, 2, 6, 3, 7] [1, 4, 1, 6, 7, 3, 4, 5, 2, 3, 6, 2, 7, 5] [1, 6, 1, 3, 5, 7, 4, 3, 6, 2, 5, 4, 2, 7] [1, 5, 1, 7, 3, 4, 6, 5, 3, 2, 4, 7, 2, 6] [1, 5, 1, 6, 3, 7, 4, 5, 3, 2, 6, 4, 2, 7] [1, 5, 1, 4, 6, 7, 3, 5, 4, 2, 3, 6, 2, 7] [5, 1, 7, 1, 6, 2, 5, 4, 2, 3, 7, 6, 4, 3] [4, 1, 7, 1, 6, 4, 2, 5, 3, 2, 7, 6, 3, 5] … …

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
