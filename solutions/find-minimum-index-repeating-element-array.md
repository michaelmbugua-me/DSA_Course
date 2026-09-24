# Find the minimum index of a repeating element in an array

> Source: https://www.techiedelight.com/find-minimum-index-repeating-element-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the minimum index of a repeating element in linear time and doing just a single traversal of the array.

For example,

**Input:** { 5, 6, 3, 4, 3, 6, 4 } **Output:** The minimum index of the repeating element is 1 **Input:** { 1, 2, 3, 4, 5, 6 } **Output:** Invalid Input

> 

A naive solution would be to consider each element `arr[i]` present in the array and search it in subarray `arr[i+1…n-1]`. We return its index as soon as a duplicate is found. The implementation can be seen [here](https://techiedelight.com/compiler/?run=A736jL), and requires O(n2) time, where `n` is the size of the input.

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in linear time. The idea is to traverse the array from right to left. If the element is seen for the first time, insert it into the set; otherwise, update the minimum index to the element’s index. Finally, return the minimum index after all elements are processed.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Function to find the minimum index of the repeating element
int findMinIndex(int arr[], int n)
{
    int minIndex = n;

    // create an empty set to store array elements
    unordered_set<int> set;

    // traverse the array from right to left
    for (int i = n - 1; i >= 0; i--)
    {
        // if the element is seen before, update the minimum index
        if (set.find(arr[i]) != set.end()) {
            minIndex = i;
        }
        // if the element is seen for the first time, insert it into the set
        else {
            set.insert(arr[i]);
        }
    }

    // invalid input
    if (minIndex == n) {
        return -1;
    }

    // return minimum index
    return minIndex;
}

int main()
{
    int arr[] = { 5, 6, 3, 4, 3, 6, 4 };
    // int arr[] = { 1, 2, 3, 4, 5, 6 };

    int n = sizeof(arr) / sizeof(arr[0]);

    int minIndex = findMinIndex(arr, n);

    if (minIndex != n) {
        cout << "The minimum index of the repeating element is " << minIndex;
    }
    else {
        cout << "Invalid Input";
    }

    return 0;
}
```

**Output:** The minimum index of the repeating element is 1

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to find the minimum index of the repeating element
    public static int findMinIndex(int[] A)
    {
        int minIndex = A.length;

        // create an empty set to store array elements
        Set<Integer> set = new HashSet<>();

        // traverse the array from right to left
        for (int i = A.length - 1; i >= 0; i--)
        {
            // if the element is seen before, update the minimum index
            if (set.contains(A[i])) {
                minIndex = i;
            }
            // if the element is seen for the first time, insert it into the set
            else {
                set.add(A[i]);
            }
        }

        // invalid input
        if (minIndex == A.length) {
            return -1;
        }

        // return minimum index
        return minIndex;
    }

    public static void main(String[] args)
    {
        int[] A = { 5, 6, 3, 4, 3, 6, 4 };

        int minIndex = findMinIndex(A);

        if (minIndex != A.length) {
            System.out.print("The minimum index of the repeating element is " +
                    minIndex);
        }
        else {
            System.out.print("Invalid Input");
        }
    }
}
```

##

```python3
# Function to find the minimum index of the repeating element
def findMinIndex(A):

    minIndex = len(A)

    # create an empty set to store list elements
    s = set()

    # traverse the list from right to left
    for i in reversed(range(len(A))):

        # if the element is seen before, update the minimum index
        if A[i] in s:
            minIndex = i
        # if the element is seen for the first time, insert it into the set
        else:
            s.add(A[i])

    # invalid input
    if minIndex == len(A):
        return -1

    # return minimum index
    return minIndex

if __name__ == '__main__':

    A = [5, 6, 3, 4, 3, 6, 4]
    # A = [1, 2, 3, 4, 5, 6]

    minIndex = findMinIndex(A)

    if minIndex != len(A):
        print("The minimum index of the repeating element is", minIndex)
    else:
        print("Invalid Input")
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

Also See:

> [Find the minimum difference between the index of two given elements present in an array](https://www.techiedelight.com/find-minimum-difference-index-two-given-elements-present-array/ "Find the minimum difference between the index of two given elements present in an array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 116

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
