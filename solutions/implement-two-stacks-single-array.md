# Implement two stacks in a single array

> Source: https://www.techiedelight.com/implement-two-stacks-single-array/

[Stack](https://www.techiedelight.com/Category/Stack/)

This post will discuss how to implement two [stacks](https://techiedelight.com/stack-implementation/) in a single array efficiently.

A simple solution would be to divide the array into two halves and allocate each half to implement two stacks. In other words, for an array `A` of size `n`, the solution would allocate `A[0, n/2]` memory for the first stack and `A[n/2+1, n-1]` memory for the second stack. The problem with this approach is that it doesn’t efficiently utilize the available space in the array. For instance, if one half of the array is full, any subsequent push operations would lead to a stack overflow exception even though the other half has space available.

To handle this, we can grow stacks from two extreme corners of the array. In other words, the first stack grows from the `0'th` index, and the second stack grows from the `(n-1)'th` index, where `n` is the array size. Both stacks can grow towards each other with no fixed capacity. Now overflow will only happen if both stacks are full (i.e., top elements of both stacks are adjacent), and there is no space left in the array to accommodate a new element.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

class Stack
{
    int *arr;
    int capacity;
    int top1, top2;

public:

    // Constructor
    Stack(int n)
    {
        capacity = n;
        arr = new int[n];
        top1 = -1;
        top2 = n;
    }

    // Function to insert a given element into the first stack
    void pushFirst(int key)
    {
        // check if the array is full
        if (top1 + 1 == top2)
        {
            cout << "Stack Overflow";
            exit(EXIT_FAILURE);
        }

        top1++;
        arr[top1] = key;
    }

    // Function to insert a given element into the second stack
    void pushSecond(int key)
    {
        // check if the array is full
        if (top1 + 1 == top2)
        {
            cout << "Stack Overflow";
            exit(EXIT_FAILURE);
        }

        top2--;
        arr[top2] = key;
    }

    // Function to pop an element from the first stack
    int popFirst()
    {
        // if no elements are left in the array
        if (top1 < 0)
        {
            cout << "Stack Underflow";
            exit(EXIT_FAILURE);
        }

        int top = arr[top1];
        top1--;
        return top;
    }

    // Function to pop an element from the second stack
    int popSecond()
    {
        // if no elements are left in the array
        if (top2 >= capacity)
        {
            cout << "Stack Underflow";
            exit(EXIT_FAILURE);
        }

        int top = arr[top2];
        top2++;
        return top;
    }
};

int main()
{
    vector<int> arr1 = { 1, 2, 3, 4, 5 };
    vector<int> arr2 = { 6, 7, 8, 9, 10 };

    Stack stack(arr1.size() + arr2.size());

    for (int i: arr1) {
        stack.pushFirst(i);
    }

    for (int j: arr2) {
        stack.pushSecond(j);
    }

    cout << "Popping element from the first stack: " << stack.popFirst() << endl;
    cout << "Popping element from the second stack: " << stack.popSecond() << endl;

    return 0;
}
```

**Output:** Popping element from the first stack: 5 Popping element from the second stack: 10

##

```java
import java.util.Arrays;
import java.util.List;

class Stack
{
    private int[] arr;
    private int capacity;
    private int top1, top2;

    // Constructor
    public Stack(int n)
    {
        capacity = n;
        arr = new int[n];
        top1 = -1;
        top2 = n;
    }

    // Function to insert a given element into the first stack
    public void pushFirst(int key)
    {
        // check if the array is full
        if (top1 + 1 == top2)
        {
            System.out.println("Stack Overflow");
            System.exit(-1);
        }

        top1++;
        arr[top1] = key;
    }

    // Function to insert a given element into the second stack
    public void pushSecond(int key)
    {
        // check if the array is full
        if (top1 + 1 == top2)
        {
            System.out.println("Stack Overflow");
            System.exit(-1);
        }

        top2--;
        arr[top2] = key;
    }

    // Function to pop an element from the first stack
    public int popFirst()
    {
        // if no elements are left in the array
        if (top1 < 0)
        {
            System.out.println("Stack Underflow");
            System.exit(-1);
        }

        int top = arr[top1];
        top1--;
        return top;
    }

    // Function to pop an element from the second stack
    public int popSecond()
    {
        // if no elements are left in the array
        if (top2 >= capacity)
        {
            System.out.println("Stack Underflow");
            System.exit(-1);
        }

        int top = arr[top2];
        top2++;
        return top;
    }
}

class Main
{
    public static void main(String[] args)
    {
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> list2 = Arrays.asList(6, 7, 8, 9, 10);

        Stack stack = new Stack(list1.size() + list2.size());

        for (int i: list1) {
            stack.pushFirst(i);
        }

        for (int j: list2) {
            stack.pushSecond(j);
        }

        System.out.println("Popping element from the first stack: " + stack.popFirst());
        System.out.println("Popping element from the second stack: " + stack.popSecond());
    }
}
```

##

```python3
class Stack:
    # Constructor
    def __init__(self, n):
        self.capacity = n
        self.A = [None] * n
        self.top1 = -1
        self.top2 = n

    # Function to insert a given element into the first stack
    def push_first(self, key):
        # check if the list is full
        if self.top1 + 1 == self.top2:
            print('Stack Overflow')
            exit(-1)
        self.top1 = self.top1 + 1
        self.A[self.top1] = key

    # Function to insert a given element into the second stack
    def push_second(self, key):
        # check if the list is full
        if self.top1 + 1 == self.top2:
            print('Stack Overflow')
            exit(-1)
        self.top2 = self.top2 - 1
        self.A[self.top2] = key

    # Function to pop an element from the first stack
    def pop_first(self):
        # if no elements are left in the list
        if self.top1 < 0:
            print('Stack Underflow')
            exit(-1)
        top = self.A[self.top1]
        self.top1 = self.top1 - 1
        return top

    # Function to pop an element from the second stack
    def pop_second(self):
        # if no elements are left in the list
        if self.top2 >= self.capacity:
            print('Stack Underflow')
            exit(-1)
        top = self.A[self.top2]
        self.top2 = self.top2 + 1
        return top

if __name__ == '__main__':

    first = [1, 2, 3, 4, 5]
    second = [6, 7, 8, 9, 10]

    stack = Stack(len(first) + len(second))

    [stack.push_first(i) for i in first]
    [stack.push_second(j) for j in second]

    print('Popping element from the first stack:', stack.pop_first())
    print('Popping element from the second stack:', stack.pop_second())
```

The time complexity of all stack operations is constant, i.e., O(1).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
