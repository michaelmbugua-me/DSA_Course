# In-place merge two sorted arrays

> Source: https://www.techiedelight.com/inplace-merge-two-sorted-arrays/

Given two sorted arrays, `X[]` and `Y[]` of size `m` and `n` each, merge elements of `X[]` with elements of array `Y[]` by maintaining the sorted order, i.e., fill `X[]` with the first `m` smallest elements and fill `Y[]` with remaining elements.

Do the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) and without using any other data structure.

For example,

**Input:** X[] = { 1, 4, 7, 8, 10 } Y[] = { 2, 3, 9 } **Output:** X[] = { 1, 2, 3, 4, 7 } Y[] = { 8, 9, 10 }

> 

The idea is simple. Consider each array element `X[]` and ignore it if it is already in the correct order (i.e., the element smallest among all remaining elements); otherwise, swap it with the smallest element, which happens to be the first element of `Y[]`. After swapping, move the element (now present at `Y[0]`) to its correct position in `Y[]` to maintain the sorted order.

Following is the implementation in C++, Java, and Python based on the above idea. The merge process is almost similar to the merge routine of the [merge sort algorithm](https://techiedelight.com/merge-sort/). The only difference is that we are not using an auxiliary array for merging.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Utility function to print contents of an array
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Function to in-place merge two sorted arrays X[] and Y[]
// invariant: `X[]` and `Y[]` are sorted at any point
void merge(int X[], int Y[], int m, int n)
{
    // Consider each element `X[i]` of array `X` and ignore the element if it is
    // already in the correct order; otherwise, swap it with the next smaller
    // element, which happens to be the first element of `Y`.
    for (int i = 0; i < m; i++)
    {
        // compare the current element of `X[]` with the first element of `Y[]`
        if (X[i] > Y[0])
        {
            swap(X[i], Y[0]);
            int first = Y[0];

            // move `Y[0]` to its correct position to maintain the sorted
            // order of `Y[]`. Note: `Y[1…n-1]` is already sorted
            int k;
            for (k = 1; k < n && Y[k] < first; k++) {
                Y[k - 1] = Y[k];
            }

            Y[k - 1] = first;
        }
    }
}

int main()
{
    int X[] = { 1, 4, 7, 8, 10 };
    int Y[] = { 2, 3, 9 };

    int m = sizeof(X) / sizeof(X[0]);
    int n = sizeof(Y) / sizeof(Y[0]);

    merge(X, Y, m, n);

    cout << "X: "; printArray(X, m);
    cout << "Y: "; printArray(Y, n);

    return 0;
}
```

**Output:** X: 1 2 3 4 7 Y: 8 9 10

##

```java
import java.util.Arrays;

class Main
{
    // Function to in-place merge two sorted arrays X[] and Y[]
    // invariant: `X[]` and `Y[]` are sorted at any point
    public static void merge(int[] X, int[] Y)
    {
        int m = X.length;
        int n = Y.length;

        // Consider each element `X[i]` of array `X` and ignore the element if it is
        // already in the correct order; otherwise, swap it with the next smaller
        // element, which happens to be the first element of `Y`.
        for (int i = 0; i < m; i++)
        {
            // compare the current element of `X[]` with the first element of `Y[]`
            if (X[i] > Y[0])
            {
                // swap `X[i]` with `Y[0]`
                int temp = X[i];
                X[i] = Y[0];
                Y[0] = temp;

                int first = Y[0];

                // move `Y[0]` to its correct position to maintain the sorted
                // order of `Y[]`. Note: `Y[1…n-1]` is already sorted
                int k;
                for (k = 1; k < n && Y[k] < first; k++) {
                    Y[k - 1] = Y[k];
                }

                Y[k - 1] = first;
            }
        }
    }

    public static void main (String[] args)
    {
        int[] X = { 1, 4, 7, 8, 10 };
        int[] Y = { 2, 3, 9 };

        merge(X, Y);

        System.out.println("X: " + Arrays.toString(X));
        System.out.println("Y: " + Arrays.toString(Y));
    }
}
```

##

```python3
# Function to in-place merge two sorted lists `X` and `Y`
# invariant: `X` and `Y` are sorted at any point
def merge(X, Y):

    m = len(X)
    n = len(Y)

    # Consider each element `X[i]` of list `X[]` and ignore the element if it is
    # already in the correct order; otherwise, swap it with the next smaller
    # element, which happens to be the first element of `Y[]`.
    for i in range(m):

        # compare the current element of `X[]` with the first element of `Y[]`
        if X[i] > Y[0]:

            # swap `X[i]` with `Y[0]`
            temp = X[i]
            X[i] = Y[0]
            Y[0] = temp

            first = Y[0]

            # move `Y[0]` to its correct position to maintain the sorted
            # order of `Y[]`. Note: `Y[1…n-1]` is already sorted
            k = 1
            while k < n and Y[k] < first:
                Y[k - 1] = Y[k]
                k = k + 1

            Y[k - 1] = first

if __name__ == '__main__':

    X = [1, 4, 7, 8, 10]
    Y = [2, 3, 9]

    merge(X, Y)

    print("X:", X)
    print("Y:", Y)
```

The time complexity of the above solution is O(m.n), where `m` is the size of the first array and `n` is the size of the second array. The solution doesn’t require any extra space. The problem, in fact, can be solved in linear time and constant space. This approach is highly complicated and is discussed [here](http://www.akira.ruc.dk/~keld/teaching/algoritmedesign_f04/Artikler/04/Huang88.pdf). Thanks to Tim for suggesting this optimized approach in the comments.

Also See:

> [Merge two arrays by satisfying given constraints](https://www.techiedelight.com/merge-two-arrays-satisfying-given-constraints/ "Merge two arrays by satisfying given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 199

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
