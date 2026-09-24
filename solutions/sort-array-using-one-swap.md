# Sort an array in one swap whose two elements are swapped

> Source: https://www.techiedelight.com/sort-array-using-one-swap/

Given an array where all its elements are sorted in increasing order except two swapped elements, sort it in linear time. Assume there are no duplicates in the array.

For example,

**Input:** A[] = [3, 8, 6, 7, 5, 9] or [3, 5, 6, 9, 8, 7] or [3, 5, 7, 6, 8, 9] **Output:** A[] = [3, 5, 6, 7, 8, 9]

> 

The idea is to start from the second array element and compare every element with its previous element. We take two pointers, `x` and `y`, to store the conflict’s location. If the previous element is greater than the current element, update `x` to the previous element index and `y` to the current element index. If we find that the previous element is greater than the current element, update `y` to the current element index. Finally, after we are done processing each adjacent pair of elements, swap the elements at index `x` and `y`.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

void sortArray(int arr[], int n)
{
    // base case
    if (n <= 1) {
        return;
    }

    int x = -1, y = -1;
    int prev = arr[0];

    // process each pair of adjacent elements
    for (int i = 1; i < n; i++)
    {
        // if the previous element is greater than the current element
        if (prev > arr[i])
        {
            // first occurrence of conflict
            if (x == -1) {
                x = i - 1, y = i;
            }
            else {
                // second occurrence of conflict
                y = i;
            }
        }
        prev = arr[i];
    }

    // swap the elements at index `x` and `y`
    swap(arr[x], arr[y]);
}

int main()
{
    // int arr[] = { 3, 8, 6, 7, 5, 9 };
    int arr[] = { 3, 5, 6, 9, 8, 7 };

    int n = sizeof(arr) / sizeof(arr[0]);

    sortArray(arr, n);

    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
```

**Output:** 3 5 6 7 8 9

##

```java
import java.util.Arrays;

class Main
{
    private static void sortArray(int[] arr)
    {
        // base case
        if (arr.length <= 1) {
            return;
        }

        int x = -1, y = -1;
        int prev = arr[0];

        // process each pair of adjacent elements
        for (int i = 1; i < arr.length; i++)
        {
            // if the previous element is greater than the current element
            if (prev > arr[i])
            {
                // first occurrence of conflict
                if (x == -1)
                {
                    x = i - 1;
                    y = i;
                }
                else {
                    // second occurrence of conflict
                    y = i;
                }
            }
            prev = arr[i];
        }

        // swap the elements at index `x` and `y`
        swap(arr, x, y);
    }

    private static void swap(int[] a, int i, int j)
    {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    public static void main(String[] args)
    {
        int[] a = { 3, 5, 6, 9, 8, 7 };

        sortArray(a);
        System.out.println(Arrays.toString(a));
    }
}
```

##

```python3
def sortArray(A):

    # base case
    if len(A) <= 1:
        return

    x = -1
    y = -1
    prev = A[0]

    # process each pair of adjacent elements
    for i in range(1, len(A)):

        # if the previous element is greater than the current element
        if prev > A[i]:
            # first occurrence of conflict
            if x == -1:
                x = i - 1
                y = i
            else:
                # second occurrence of conflict
                y = i

        prev = A[i]

    # swap the elements at index `x` and `y`
    swap(A, x, y)

def swap(a, i, j):

    temp = a[i]
    a[i] = a[j]
    a[j] = temp

if __name__ == '__main__':

    a = [3, 5, 6, 9, 8, 7]

    sortArray(a)
    print(a)
```

The time complexity of the above solution is O(n) since it does only a single scan of the input array of size `n`. The solution doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 188

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
