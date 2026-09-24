# Print all quadruplets with a given sum | 4 sum problem extended

> Source: https://www.techiedelight.com/print-all-quadruplets-with-given-sum-4-sum-problem-extended/

Given an unsorted integer array, print all distinct four elements tuple (quadruplets) in it, having a given sum.

For example,

**Input:** A[] = [2, 7, 4, 0, 9, 5, 1, 3] target = 20 **Output:** Below are the quadruplets with sum 20 (0, 4, 7, 9) (1, 3, 7, 9) (2, 4, 5, 9)

> 

In the [previous post](https://techiedelight.com/4-sum-problem/), we have discussed how to check if an array contains a quadruplet or not. In this post, we will print all distinct quadruplets present in an array.

We start by sorting the given array in ascending order and then for each pair `(A[i], A[j])` in the array where `i < j`, check if a quadruplet is formed by the current pair and a pair from subarray `A[j+1…n)`. Refer to [this post](https://techiedelight.com/find-pair-with-given-sum-array/) to find pairs with a given sum in a sorted array in linear time.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to print all quadruplet present in an array with a given sum
void quadTuple(int arr[], int n, int target)
{
    // sort the array in ascending order
    sort (arr, arr + n);

    // check if quadruplet is formed by `arr[i]`, `arr[j]`, and a pair from
    // subarray `arr[j+1…n)`
    for (int i = 0; i <= n - 4; i++)
    {
        for (int j = i + 1; j <= n - 3; j++)
        {
            // `k` stores remaining sum
            int k = target - (arr[i] + arr[j]);

            // check for sum `k` in subarray `arr[j+1…n)`
            int low = j + 1, high = n - 1;

            while (low < high)
            {
                if (arr[low] + arr[high] < k) {
                    low++;
                }

                else if (arr[low] + arr[high] > k) {
                    high--;
                }

                // quadruplet with a given sum found
                else {
                    cout << "(" << arr[i] << " " << arr[j] << " " <<
                            arr[low] << " " << arr[high] << ")\n";

                    low++, high--;
                }
            }
        }
    }
}

int main()
{
    int arr[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 20;

    int n = sizeof(arr) / sizeof(arr[0]);

    quadTuple(arr, n, target);

    return 0;
}
```

**Output:** (0 4 7 9) (1 3 7 9) (2 4 5 9)

##

```java
import java.util.Arrays;

class Main
{
    // Function to print all quadruplet present in an array with a given sum
    public static void quadTuple(int[] A, int target)
    {
        // sort the array in ascending order
        Arrays.sort(A);

        // check if quadruplet is formed by `A[i]`, `A[j]`, and a pair from
        // subarray `A[j+1…n)`
        for (int i = 0; i <= A.length - 4; i++)
        {
            for (int j = i + 1; j <= A.length - 3; j++)
            {
                // `k` stores remaining sum
                int k = target - (A[i] + A[j]);

                // check for sum `k` in subarray `A[j+1…n)`
                int low = j + 1, high = A.length - 1;

                while (low < high)
                {
                    if (A[low] + A[high] < k) {
                        low++;
                    }
                    else if (A[low] + A[high] > k) {
                        high--;
                    }
                    // quadruplet with a given sum found
                    else {
                        System.out.println("(" + A[i] + " " + A[j] + " " +
                                        A[low] + " " + A[high] + ")");
                        low++;
                        high--;
                    }
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 7, 4, 0, 9, 5, 1, 3 };
        int target = 20;

        quadTuple(A, target);
    }
}
```

##

```python3
# Function to print all quadruplet present in a list with a given sum
def quadTuple(A, target):

    # sort the list in ascending order
    A.sort()

    # check if quadruplet is formed by `A[i]`, `A[j]`, and a pair from
    # sublist `A[j+1…n)`
    for i in range(len(A) - 3):
        for j in range(i + 1, len(A) - 2):

            # `k` stores remaining sum
            k = target - (A[i] + A[j])

            # check for sum `k` in sublist `A[j+1…n)`
            low = j + 1
            high = len(A) - 1

            while low < high:
                if A[low] + A[high] < k:
                    low = low + 1
                elif A[low] + A[high] > k:
                    high = high - 1
                # quadruplet with a given sum found
                else:
                    print((A[i], A[j], A[low], A[high]))
                    (low, high) = (low + 1, high - 1)

if __name__ == '__main__':

    A = [2, 7, 4, 0, 9, 5, 1, 3]
    target = 20

    quadTuple(A, target)
```

The time complexity of the above solution is O(n3) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Count quadruplets with a zero sum](https://www.techiedelight.com/count-quadruplets-with-zero-sum/ "Count quadruplets with a zero sum")

> [4–Sum Problem | Quadruplets with a given sum](https://www.techiedelight.com/4-sum-problem/ "4–Sum Problem | Quadruplets with a given sum")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 162

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
