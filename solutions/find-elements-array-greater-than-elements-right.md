# Find all elements in an array that are greater than all elements to their right

> Source: https://www.techiedelight.com/find-elements-array-greater-than-elements-right/

Given an unsorted integer array, print all greater elements than all elements present to their right.

For example, consider the array `[10, 4, 6, 3, 5]`. The elements that are greater than all elements to their right are 10, 6, and 5.

> 

A naive solution would be to use two loops. For each element, check if any greater element exists to their right or not. If all elements to their right are less than it, print the element. The time complexity of this solution is O(n2), where `n` is the size of the input.

A better solution is to use a [stack](https://techiedelight.com/stack-implementation-in-cpp/). For each element, pop all the elements present in the stack that are less than it and then push it into the stack. Finally, the stack is left with the elements which are greater than all elements present to their right. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Function to print all elements which are greater than all
// elements present to their right
void find(vector<int> const &arr)
{
    // create an empty stack
    stack<int> s;

    // do for each element
    for (int i: arr)
    {
        // pop all the elements that are less than the current element
        while (!s.empty() && s.top() < i) {
            s.pop();
        }

        // push current element into the stack
        s.push(i);
    }

    // print all elements in the stack
    while (!s.empty())
    {
        cout << s.top() << " ";
        s.pop();
    }
}

int main()
{
    vector<int> arr = { 10, 4, 6, 3, 5 };

    find(arr);

    return 0;
}
```

**Output:** 5 6 10

##

```java
import java.util.Stack;

class Main
{
    // Function to print all elements which are greater than all
    // elements present to their right
    public static void find(int[] arr)
    {
        // base case
        if (arr == null || arr.length == 0) {
            return;
        }

        // create an empty stack
        Stack<Integer> stack = new Stack<>();

        // do for each element
        for (int value: arr)
        {
            // pop all the elements that are less than the current element
            while (!stack.isEmpty() && stack.peek() < value) {
                stack.pop();
            }

            // push current element into the stack
            stack.push(value);
        }

        // print all elements in the stack
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 10, 4, 6, 3, 5 };
        find(arr);
    }
}
```

##

```python3
from collections import deque

# Function to print all elements which are greater than all
# elements present to their right
def find(arr):

    # base case
    if not arr:
        return []

    # create an empty stack
    stack = deque()

    # do for each element
    for i in range(len(arr)):

        # pop all the elements that are less than the current element
        while stack and stack[-1] < arr[i]:
            stack.pop()

        # push current element into the stack
        stack.append(arr[i])

    # print all elements in the stack
    while stack:
        print(stack.pop(), end=' ')

if __name__ == '__main__':

    arr = [10, 4, 6, 3, 5]
    find(arr)
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

We can easily solve this problem in linear time using constant space. The idea is to traverse the array from right to left and maintain a variable that stores the maximum element encountered so far. So if the current element is greater than the maximum so far, print the current element and update the maximum so far. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Function to print all elements which are greater than all
// elements present to their right
void find(int arr[], int n)
{
    int max_so_far = INT_MIN;

    // traverse the array from right to left
    for (int i = n - 1; i >= 0; i--)
    {
        // if the current element is greater than the maximum so far,
        // print it and update `max_so_far`
        if (arr[i] >= max_so_far)
        {
            max_so_far = arr[i];
            printf("%d ", arr[i]);
        }
    }
}

int main(void)
{
    int arr[] = { 10, 4, 6, 3, 5 };
    int n = sizeof(arr)/sizeof(arr[0]);

    find(arr, n);

    return 0;
}
```

**Output:** 5 6 10

##

```java
class Main
{
    // Function to print all elements which are greater than all
    // elements present to their right
    public static void find(int[] arr)
    {
        // base case
        if (arr == null || arr.length == 0) {
            return;
        }

        int max_so_far = Integer.MIN_VALUE;

        // traverse the array from right to left
        for (int i = arr.length - 1; i >= 0; i--)
        {
            // if the current element is greater than the maximum so far,
            // print it and update `max_so_far`
            if (arr[i] >= max_so_far)
            {
                max_so_far = arr[i];
                System.out.printf("%d ", arr[i]);
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 10, 4, 6, 3, 5 };
        find(arr);
    }
}
```

##

```python3
import sys

# Function to print all elements which are greater than all
# elements present to their right
def find(arr):

    # base case
    if not arr:
        return []

    max_so_far = -sys.maxsize

    # traverse the list from right to left
    for i in reversed(arr):
        # if the current element is greater than the maximum so far,
        # print it and update `max_so_far`
        if i >= max_so_far:
            max_so_far = i
            print(i, end=' ')

if __name__ == '__main__':

    arr = [10, 4, 6, 3, 5]
    find(arr)
```
