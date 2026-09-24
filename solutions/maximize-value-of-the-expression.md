# Maximize the value of an expression

> Source: https://www.techiedelight.com/maximize-value-of-the-expression/

Given an array A, maximize value of expression `(A[s] - A[r] + A[q] - A[p])`, where `p`, `q`, `r`, and `s` are indices of the array and `s > r > q > p`.

For example,

**Input:** A[] = [3, 9, 10, 1, 30, 40] **Output:** 46 **Explanation:** The expression (40 – 1 + 10 – 3) will result in the maximum value

> 

A naive solution would be to generate all combinations of such numbers. The time complexity of this solution would be O(n4), where `n` is the size of the input.

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. The idea is to create four lookup tables, `first[]`, `second[]`, `third[]`, and `fourth[]`, where:

  * `first[]` stores the maximum value of `A[s]`.
  * `second[]` stores the maximum value of `A[s] - A[r]`.
  * `third[]` stores the maximum value of `A[s] - A[r] + A[q]`.
  * `fourth[]` stores the maximum value of `A[s] - A[r] + A[q] - A[p]`.

The maximum value would then be present in index 0 of `fourth[]`, which is our required answer. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to print an array
void printArray(vector<int> const &A)
{
    for (int i: A) {
        cout << i << " ";
    }
    cout << endl;
}

// Function to find the maximum value of the expression
// (A[s] - A[r] + A[q] - A[p]), where s > r > q > p
int maximizeExpression(vector<int> const &A)
{
    int n = A.size();

    // input should have at least 4 elements
    if (n < 4) {
        exit(-1);
    }

    // create 4 lookup tables and initialize them to `INT_MIN`
    int first[n + 1], second[n], third[n - 1], fourth[n - 2];

    for (int i = 0; i <= n - 3; i++) {
        first[i] = second[i] = third[i] = fourth[i] = INT_MIN;
    }

    first[n - 2] = second[n - 2] = third[n - 2] = INT_MIN;
    first[n - 1] = second[n - 1] = first[n] = INT_MIN;

    // `first[]` stores the maximum value of `A[l]`
    for (int i = n - 1; i >= 0; i--) {
        first[i] = max(first[i + 1], A[i]);
    }

    // `second[]` stores the maximum value of `A[l] - A[k]`
    for (int i = n - 2; i >= 0; i--) {
        second[i] = max(second[i + 1], first[i + 1] - A[i]);
    }

    // `third[]` stores the maximum value of `A[l] - A[k] + A[j]`
    for (int i = n - 3; i >= 0; i--) {
        third[i] = max(third[i + 1], second[i + 1] + A[i]);
    }

    // `fourth[]` stores the maximum value of `A[l] - A[k] + A[j] - A[i]`
    for (int i = n - 4; i >= 0; i--) {
        fourth[i] = max(fourth[i + 1], third[i + 1] - A[i]);
    }

    // maximum value would be present at `fourth[0]`
    return fourth[0];
}

int main()
{
    vector<int> A = { 3, 9, 10, 1, 30, 40 };

    cout << maximizeExpression(A);

    return 0;
}
```

**Output:** 46

##

```java
import java.util.Arrays;

class Main
{
    // Function to find the maximum value of the expression
    // (A[l] - A[k] + A[j] - A[i]), where l > k > j > i
    public static int maximizeExpression(int[] A)
    {
        // input should have at least 4 elements
        if (A.length < 4) {
            System.exit(-1);
        }

        // create 4 lookup tables and initialize them to `Integer.MIN_VALUE`
        int[] first = new int[A.length + 1];
        Arrays.fill(first, Integer.MIN_VALUE);

        int[] second = new int[A.length];
        Arrays.fill(second, Integer.MIN_VALUE);

        int[] third = new int[A.length - 1];
        Arrays.fill(third, Integer.MIN_VALUE);

        int[] fourth = new int[A.length - 2];
        Arrays.fill(fourth, Integer.MIN_VALUE);

        // `first[]` stores the maximum value of `A[l]`
        for (int i = A.length - 1; i >= 0; i--) {
            first[i] = Integer.max(first[i + 1], A[i]);
        }

        // `second[]` stores the maximum value of `A[l] - A[k]`
        for (int i = A.length - 2; i >= 0; i--) {
            second[i] = Integer.max(second[i + 1], first[i + 1] - A[i]);
        }

        // `third[]` stores the maximum value of `A[l] - A[k] + A[j]`
        for (int i = A.length - 3; i >= 0; i--) {
            third[i] = Integer.max(third[i + 1], second[i + 1] + A[i]);
        }

        // `fourth[]` stores the maximum value of `A[l] - A[k] + A[j] - A[i]`
        for (int i = A.length - 4; i >= 0; i--) {
            fourth[i] = Integer.max(fourth[i + 1], third[i + 1] - A[i]);
        }

        // maximum value would be present at `fourth[0]`
        return fourth[0];
    }

    public static void main(String[] args)
    {
        int[] A = { 3, 9, 10, 1, 30, 40 };

        System.out.println(maximizeExpression(A));
    }
}
```

##

```python3
import sys

# Function to find the maximum value of the expression
# (A[l] - A[k] + A[j] - A[i]), where l > k > j > i
def maximizeExpression(A):

    # input should have at least 4 elements
    if len(A) < 4:
        exit(-1)

    # create 4 lookup tables and initialize them to `-sys.maxsize`
    first = [-sys.maxsize] * (len(A) + 1)
    second = [-sys.maxsize] * len(A)
    third = [-sys.maxsize] * (len(A) - 1)
    fourth = [-sys.maxsize] * (len(A) - 2)

    # `first` stores the maximum value of `A[l]`
    for i in reversed(range(len(A))):
        first[i] = max(first[i + 1], A[i])

    # `second` stores the maximum value of `A[l] - A[k]`
    for i in reversed(range(len(A) - 1)):
        second[i] = max(second[i + 1], first[i + 1] - A[i])

    # `third` stores the maximum value of `A[l] - A[k] + A[j]`
    for i in reversed(range(len(A) - 2)):
        third[i] = max(third[i + 1], second[i + 1] + A[i])

    # `fourth` stores the maximum value of `A[l] - A[k] + A[j] - A[i]`
    for i in reversed(range(len(A) - 3)):
        fourth[i] = max(fourth[i + 1], third[i + 1] - A[i])

    # maximum value would be present at `fourth[0]`
    return fourth[0]

if __name__ == '__main__':

    A = [3, 9, 10, 1, 30, 40]
    print(maximizeExpression(A))
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 182

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
