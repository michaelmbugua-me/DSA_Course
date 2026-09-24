# Check if the given keys represent the same BSTs or not without building BST

> Source: https://www.techiedelight.com/check-given-keys-represents-same-bsts-not-without-building-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given two integer arrays, X and Y, representing a set of BST keys, check if they represent the same BSTs or not without building the tree. Assume that the keys are inserted into the BST in the same order as they appear in the array.

For example, consider the following arrays:

X[] = { 15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6 } Y[] = { 15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22 }

Both arrays represent the same BSTs, as shown below:

> 

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Recursive function to check if `X[0…n)` and `Y[0…n)`
// represent the same BSTs or not
int isSameBST(int X[], int Y[], int n)
{
    // if no element is present in the array, return true
    if (n == 0) {
        return 1;
    }

    // if the first element differs in both array (root node key),
    // return false
    if (X[0] != Y[0]) {
        return 0;
    }

    // if the array contains only one key, return true
    if (n == 1) {
        return 1;
    }

    // take four auxiliary arrays of size `n-1` each (as maximum
    // keys in left or right subtree can be `n-1`)
    int leftX[n-1], rightX[n-1], leftY[n-1], rightY[n-1];

    int k = 0, l = 0, m = 0, o = 0;

    // process the remaining keys and divide them into two groups
    for (int i = 1; i < n; i++)
    {
        // `leftX[]` will contain all elements less than `X[0]`
        if (X[i] < X[0]) {
            leftX[k++] = X[i];
        }
        // `rightX[]` will contain all elements more than `X[0]`
        else {
            rightX[l++] = X[i];
        }

        // `leftY[]` will contain all elements less than `Y[0]`
        if (Y[i] < Y[0]) {
            leftY[m++] = Y[i];
        }
        // `rightY[]` will contain all elements more than `Y[0]`
        else {
            rightY[o++] = Y[i];
        }
    }

    // return false if the size of `leftX[]` and `leftY[]` differs, i.e.,
    // the total number of nodes in the left subtree of both trees differs
    if (k != m) {
        return 0;
    }

    // return false if the size of `rightX[]` and `rightY[]` differs, i.e.,
    // the total number of nodes in the right subtree of both trees differs
    if (l != o) {
        return 0;
    }

    // check left and right subtree
    return isSameBST(leftX, leftY, k) && isSameBST(rightX, rightY, l);
}

int main(void)
{
    int X[] = { 15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6 };
    int Y[] = { 15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22 };

    int n = sizeof(X) / sizeof(X[0]);
    int m = sizeof(Y) / sizeof(Y[0]);

    if (m == n && isSameBST(X, Y, n)) {
        printf("Given keys represent the same BSTs");
    }
    else {
        printf("Given keys represent different BSTs");
    }

    return 0;
}
```

**Output:** Given keys represent the same BSTs

##

```java
class Main
{
    // Recursive function to check if `X[0…n)` and `Y[0…n)` represent
    // the same BSTs or not
    public static boolean isSameBST(int[] X, int[] Y, int n)
    {
        // if no element is present in the array, return true
        if (n == 0) {
            return true;
        }

        // if the first element differs in both array (root node key),
        // return false
        if (X[0] != Y[0]) {
            return false;
        }

        // if the array contains only one key, return true
        if (n == 1) {
            return true;
        }

        // take four auxiliary arrays of size `n-1` each (as maximum
        // keys in left or right subtree can be `n-1`)
        int[] leftX = new int[n-1];
        int[] rightX = new int[n-1];
        int[] leftY = new int[n-1];
        int[] rightY = new int[n-1];

        int k = 0, l = 0, m = 0, o = 0;

        // process the remaining keys and divide them into two groups
        for (int i = 1; i < n; i++)
        {
            // `leftX[]` will contain all elements less than `X[0]`
            if (X[i] < X[0]) {
                leftX[k++] = X[i];
            }

            // `rightX[]` will contain all elements more than `X[0]`
            else {
                rightX[l++] = X[i];
            }

            // `leftY[]` will contain all elements less than `Y[0]`
            if (Y[i] < Y[0]) {
                leftY[m++] = Y[i];
            }

            // `rightY[]` will contain all elements more than `Y[0]`
            else {
                rightY[o++] = Y[i];
            }
        }

        // return false if the size of `leftX[]` and `leftY[]` differs, i.e.,
        // the total number of nodes in the left subtree of both trees differs
        if (k != m) {
            return false;
        }

        // return false if the size of `rightX[]` and `rightY[]` differs, i.e.,
        // the total number of nodes in the right subtree of both trees differs
        if (l != o) {
            return false;
        }

        // check left and right subtree
        return isSameBST(leftX, leftY, k) && isSameBST(rightX, rightY, l);
    }

    public static void main(String[] args)
    {
        int[] X = { 15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6 };
        int[] Y = { 15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22 };

        if (X.length == Y.length && isSameBST(X, Y, X.length)) {
            System.out.println("Given keys represent the same BSTs");
        }
        else {
            System.out.println("Given keys represent different BSTs");
        }
    }
}
```

##

```python3
# Recursive function to check if `X[0…n)` and `Y[0…n)` represent the same BSTs or not
def isSameBST(X, Y, n):

    # if no element is present in the list, return true
    if n == 0:
        return True

    # if the first element differs in both lists (root node key), return false
    if X[0] != Y[0]:
        return False

    # if the list contains only one key, return true
    if n == 1:
        return True

    # take four auxiliary spaces of size `n-1` each (as maximum keys in
    # left or right subtree can be `n-1`)
    leftX = [None] * (n - 1)
    rightX = [None] * (n - 1)
    leftY = [None] * (n - 1)
    rightY = [None] * (n - 1)

    k = l = m = o = 0

    # process the remaining keys and divide them into two groups
    for i in range(1, n):

        # `leftX` will contain all elements less than `X[0]`
        if X[i] < X[0]:
            leftX[k] = X[i]
            k = k + 1

        # `rightX` will contain all elements more than `X[0]`
        else:
            rightX[l] = X[i]
            l = l + 1

        # `leftY` will contain all elements less than `Y[0]`
        if Y[i] < Y[0]:
            leftY[m] = Y[i]
            m = m + 1

        # `rightY` will contain all elements more than `Y[0]`
        else:
            rightY[o] = Y[i]
            o = o + 1

    # return false if the size of `leftX` and `leftY` differs, i.e.,
    # the total number of nodes in the left subtree of both trees differs
    if k != m:
        return False

    # return false if the size of `rightX` and `rightY` differs, i.e.,
    # the total number of nodes in the right subtree of both trees differs
    if l != o:
        return False

    # check left and right subtree
    return isSameBST(leftX, leftY, k) and isSameBST(rightX, rightY, l)

if __name__ == '__main__':

    X = [15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6]
    Y = [15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22]

    if len(X) == len(Y) and isSameBST(X, Y, len(X)):
        print('Given keys represent the same BSTs')
    else:
        print('Given keys represent different BSTs')
```

The time complexity of the above solution is O(n2), where `n` is the size of the BST. The auxiliary space required by the program is O(n2).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
