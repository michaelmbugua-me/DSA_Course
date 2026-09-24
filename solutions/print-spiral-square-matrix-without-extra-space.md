# Print a spiral square matrix without using any extra space

> Source: https://www.techiedelight.com/print-spiral-square-matrix-without-extra-space/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a positive number `N`, print an `N × N` spiral matrix containing numbers from `1` to `N × N` in a counterclockwise direction and without extra space.

For example,

**Input:** N = 5 **Output:** 25 24 23 22 21 10 9 8 7 20 11 2 1 6 19 12 3 4 5 18 13 14 15 16 17

> 

If we are allowed to use extra space, allocate storage for an `N × N` matrix, and start filling out the matrix in spiral order for each element starting from `N × N` till `1`. To maintain the spiral order, use four loops, each for the top, right, bottom, and left corner of the matrix.

Here’s how we can do it with constant space:

25 24 23 22 21 10 9 8 7 20 11 2 1 6 19 12 3 4 5 18 13 14 15 16 17

An `N × N` matrix has `ceil(N/2)` square cycles. A cycle is formed by `i'th` row, `j'th` column, `j'th` row and `i'th` column, where `i` varies from `1` to `ceil(N/2)` and `j = (n-i+1)`.

  1. The first cycle is formed by elements of its first row, last column, last row, and first column (marked by black). The first cycle consists of elements from `N × N` to `(N-2) × (N-2) + 1`, i.e., from `25` to `10` for `N = 5`.
  2. The second cycle is formed by elements of the second row, second last column, second last row, and second column (marked by red). The second cycle consists of elements from `(N-2) × (N-2)` to `(N-4) × (N-4) + 1`, i.e., from `9` to `2` for `N = 5`.
  3. The third cycle is formed by the third row, third-last column, third-last row, and third column (marked by blue). The third cycle consists of elements from `(N-4) × (N-4)` to `1`, i.e., only element `1` for `N = 5`.

The idea is for each square cycle, associate a marker to it. The marker will have the value `0` for the outer cycle, for the second cycle will have value `1`, and it has value `2` for the third cycle. In general, for an `N × N` matrix, the `i'th` cycle will have a marker value of `i-1`.

25 24 23 22 21 10 9 8 7 20 11 2 1 6 19 12 3 4 5 18 13 14 15 16 17

If we divide the matrix into two parts – upper right triangle (marked by red) and lower left triangle (marked by blue), as shown above, then using marker `x` we can easily calculate the value that will be present at index `(i, j)` in any `N × N` spiral matrix with the following formula:

  * For upper right half, `M[i][j] = (N-2x) × (N-2x)-(i-x)-(j-x)`.
  * For lower left half, `M[i][j] = (N-2x-2) × (N-2x-2) + (i-x) + (j-x)`.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
using namespace std;

// Function to prints an `N × N` spiral matrix without using any extra space.
// The matrix contains numbers from 1 to `N × N`.
void printSpiralMatrix(int N)
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            // `x` stores the layer in which (i, j)'th element lies
            int x;

            // find a minimum of four inputs
            x = min(min(i, j), min(N - 1 - i, N - 1 - j));

            // print upper right half
            if (i <= j) {
                cout << (N - 2*x) * (N - 2*x) - (i - x) - (j - x);
            }
            // print lower left half
            else {
                cout << (N - 2*x - 2) * (N - 2*x - 2) + (i - x) + (j - x);
            }

            cout << '\t';
        }

        cout << endl;
    }
}

int main()
{
    int N = 5;

    printSpiralMatrix(N);

    return 0;
}
```

##

```java
class Main
{
    // Function to prints an `N × N` spiral matrix without using any extra space.
    // The matrix contains numbers from 1 to `N × N`.
    public static void printSpiralMatrix(int N)
    {
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N; j++)
            {
                // `x` stores the layer in which (i, j)'th element lies
                int x;

                // find a minimum of four inputs
                x = Math.min(Math.min(i, j), Math.min(N - 1 - i, N - 1 - j));

                // print upper right half
                if (i <= j) {
                    System.out.print((N - 2*x)*(N - 2*x) - (i - x) - (j - x));
                }
                // print lower left half
                else {
                    System.out.print((N - 2*x - 2)*(N - 2*x - 2) + (i - x) + (j - x));
                }

                System.out.print('\t');
            }

            System.out.println();
        }
    }

    public static void main(String[] args)
    {
        int N = 5;
        printSpiralMatrix(N);
    }
}
```

##

```python3
# Function to prints an `N × N` spiral matrix without using any extra space.
# The matrix contains numbers from 1 to `N × N`.
def printSpiralMatrix(N):

    for i in range(N):
        for j in range(N):

            # `x` stores the layer in which (i, j)'th element lies
            # find a minimum of four inputs
            x = min(min(i, j), min(N - 1 - i, N - 1 - j))

            # print upper right half
            if i <= j:
                print((N - 2*x) * (N - 2*x) - (i - x) - (j - x), end='')

            # print lower left half
            else:
                print((N - 2*x - 2) * (N - 2*x - 2) + (i - x) + (j - x), end='')

            print('\t', end='')

        print()

if __name__ == '__main__':

    N = 5
    printSpiralMatrix(N)
```

**Output:** 25 24 23 22 21 10 9 8 7 20 11 2 1 6 19 12 3 4 5 18 13 14 15 16 17

The time complexity of the proposed solution is O(N2) for an `N × N` matrix and doesn’t require any extra space.

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
