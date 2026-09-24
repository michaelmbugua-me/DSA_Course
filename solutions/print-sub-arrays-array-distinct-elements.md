# Print all subarrays of an array having distinct elements

> Source: https://www.techiedelight.com/print-sub-arrays-array-distinct-elements/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, print all maximum size subarrays having all distinct elements in them.

For example,

**Input:** A[] = { 5, 2, 3, 5, 4, 3 } **Output:** The largest subarrays with all distinct elements are: { 5, 2, 3 } { 2, 3, 5, 4 } { 5, 4, 3 }

> 

The problem differs from the problem of finding the maximum size subsequence with distinct elements. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

We can use a [sliding window](https://techiedelight.com/sliding-window-problems/) to solve this problem easily. The idea is to maintain a window with an invariant that all elements inside it must be distinct. The solution keeps on expanding the window to the right, and if any duplicate is encountered, it shrinks the window from the left until all elements are distinct again. To keep track of distinct elements inside a window, use a map.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Utility function to print the subarray formed by `A[i, j]`
void printSubarray(int A[], int i, int j, int n)
{
    if (i < 0 || i > j || j >= n) {        // invalid input
        return;
    }

    for (int index = i; index < j; index++) {
        cout << A[index] << ", ";
    }

    cout << A[j] << endl;
}

// Function to print all subarrays having distinct elements
void calculate(int A[], int n)
{
    // create a map to mark elements as visited in the current window
    unordered_map<int, bool> visited;

    // points to the left and right boundary of the current window;
    // i.e., the current window is formed by `A[left, right]`
    int right = 0, left = 0;

    // loop until the right index of the current window is less
    // than the maximum index
    while (right < n)
    {
        // keep increasing the window size if all elements in the
        // current window are distinct
        while (right < n && !visited[A[right]])
        {
            visited[A[right]] = true;
            right++;
        }

        printSubarray(A, left, right - 1, n);

        // As soon as a duplicate is found (`A[right]`),
        // terminate the above loop, and reduce the window's size
        // from its left to remove the duplicate
        while (right < n && visited[A[right]])
        {
            visited[A[left]] = false;
            left++;
        }
    }
}

int main()
{
    int A[] = { 5, 2, 3, 5, 4, 3 };
    int n = sizeof A / sizeof A[0];

    calculate(A, n);

    return 0;
}
```

**Output:** 5, 2, 3 2, 3, 5, 4 5, 4, 3

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Utility function to print the subarray formed by `A[i, j]`
    public static void printSubarray(int[] A, int i, int j, int n)
    {
        if (i < 0 || i > j || j >= n) { // invalid input
            return;
        }

        for (int index = i; index < j; index++) {
            System.out.print(A[index] + ", ");
        }

        System.out.println(A[j]);
    }

    // Function to print all subarrays having distinct elements
    public static void calculate(int[] A)
    {
        int n = A.length;

        // create a map to mark elements as visited in the current window
        Map<Integer, Boolean> visited = new HashMap<>();

        // put all elements on a map
        for (int val: A) {
            visited.put(val, false);
        }

        // points to the left and right boundary of the current window,
        // i.e., the current window is formed by `A[left, right]`
        int right = 0, left = 0;

        // loop until the right index of the current window is less
        // than the maximum index
        while (right < n)
        {
            // keep increasing the window size if all elements in the
            // current window are distinct
            while (right < n && !visited.get(A[right]))
            {
                visited.put(A[right], true);
                right++;
            }

            printSubarray(A, left, right - 1, n);

            // As soon as a duplicate is found (`A[right]`),
            // terminate the above loop, and reduce the window's size
            // from its left to remove the duplicate

            while (right < n && visited.get(A[right]))
            {
                visited.put(A[left], false);
                left++;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 5, 2, 3, 5, 4, 3 };

        calculate(A);
    }
}
```

##

```python3
# Function to print all sublists having distinct elements
def calculate(A):

    # create a map to mark elements as visited in the current window
    visited = {}

    # put all elements in a dictionary
    for val in A:
        visited[val] = False

    # points to the left and right boundary of the current window,
    # i.e., the current window is formed by `A[left, right]`
    right = 0
    left = 0

    # loop until the right index of the current window is less
    # than the maximum index
    while right < len(A):

        # keep increasing the window size if all elements in the
        # current window are distinct
        while right < len(A) and not visited[A[right]]:
            visited[A[right]] = True
            right = right + 1

        print(A[left: right])

        # As soon as a duplicate is found (`A[right]`), terminate the above loop,
        # and reduce the window's size from its left to remove the duplicate
        while right < len(A) and visited[A[right]]:
            visited[A[left]] = False
            left = left + 1

if __name__ == '__main__':

    A = [5, 2, 3, 5, 4, 3]
    calculate(A)
```

The time complexity of the above solution is O(n), where `n` is the input size and requires O(n) extra space to mark elements in the current window.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 136

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
