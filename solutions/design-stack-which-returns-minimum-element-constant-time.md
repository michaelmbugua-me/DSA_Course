# Design a stack that returns the minimum element in constant time

> Source: https://www.techiedelight.com/design-stack-which-returns-minimum-element-constant-time/

[Stack](https://www.techiedelight.com/Category/Stack/)

Design a [stack](https://techiedelight.com/stack-implementation/) to support an additional operation that returns the minimum element from the stack in constant time. The stack should continue supporting all other operations like push, pop, top, size, empty, etc., with no degradation in these operations’ performance.

> 

The first solution that appears in mind is to have a member variable in a stack to keep track of the minimum number. Unfortunately, this won’t work as we can’t get the next minimum number after the minimum one is popped.

The correct approach uses two stacks – the main stack to store the actual stack elements and an auxiliary stack to store the required elements needed to determine the minimum number in constant time. This implementation requires few changes in push and pop operations:

1\. Push operation

The idea is to push the new element into the main stack and push it into the auxiliary stack only if the stack is empty or the new element is less than or equal to the current top element of the auxiliary stack.

2\. Pop operation

For pop operation, remove the top element from the main stack and remove it from the auxiliary stack only if it is equal to the current minimum element, i.e., a top element of both the main stack and the auxiliary stack is the same. After the minimum number is popped, the next minimum number appears on the top of the auxiliary stack.

3\. Min operation

The top of the auxiliary stack always returns the minimum number since we are pushing the minimum number into the auxiliary stack and removing the minimum number from the auxiliary stack only if it is removed from the main stack.

The following table demonstrates the above operations:

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

class MinStack
{
    stack<int> s;       // main stack to store elements
    stack<int> aux;     // auxiliary stack to store minimum elements

public:
    // Inserts a given element on top of the stack
    void push(int val)
    {
        // push the given element into the main stack
        s.push(val);

        // if the auxiliary stack is empty, push the given element into it
        if (aux.empty()) {
            aux.push(val);
        }
        else {
            // push the given element into the auxiliary stack
            // if it is less than or equal to the current minimum
            if (aux.top() >= val) {
                aux.push(val);
            }
        }
    }

    // Removes the top element from the stack and returns it
    int pop()
    {
        // remove the top element from the main stack
        int top = s.top();
        s.pop();

        // remove the top element from the auxiliary stack only if it is minimum
        if (top == aux.top()) {
            aux.pop();
        }

        // return the removed element
        return top;
    }

    // Returns the top element of the stack
    int top() {
        return s.top();
    }

    // Returns the total number of elements in the stack
    int size() {
        return s.size();
    }

    // Returns the true if the stack is empty; false otherwise
    bool isEmpty() {
        return s.empty();
    }

    // Returns the minimum element from the stack in constant time
    int getMin()
    {
        return aux.top();
    }
};

int main()
{
    MinStack s;

    s.push(6);
    cout << s.getMin() << endl;    // prints 6

    s.push(7);
    cout << s.getMin() << endl;    // prints 6

    s.push(8);
    cout << s.getMin() << endl;    // prints 6

    s.push(5);
    cout << s.getMin() << endl;    // prints 5

    s.push(3);
    cout << s.getMin() << endl;    // prints 3

    cout << s.pop() << endl;    // prints 3
    cout << s.getMin() << endl;    // prints 5

    s.push(10);
    cout << s.getMin() << endl;    // prints 5

    cout << s.pop() << endl;    // prints 10
    cout << s.getMin() << endl;    // prints 5

    cout << s.pop() << endl;    // prints 5
    cout << s.getMin() << endl;    // prints 6

    return 0;
}
```

##

```java
import java.util.Stack;

class MinStack
{
    private Stack<Integer> s;       // main stack to store elements
    private Stack<Integer> aux;     // auxiliary stack to store minimum elements

    // Constructor
    public MinStack()
    {
        s = new Stack<>();
        aux = new Stack<>();
    }

    // Inserts a given element on top of the stack
    public void push(int val)
    {
        // push the given element into the main stack
        s.push(val);

        // if the auxiliary stack is empty, push the given element into it
        if (aux.isEmpty()) {
            aux.push(val);
        }
        else {
            // push the given element into the auxiliary stack
            // if it is less than or equal to the current minimum
            if (aux.peek() >= val) {
                aux.push(val);
            }
        }
    }

    // Removes the top element from the stack and returns it
    public int pop()
    {
        if (isEmpty())
        {
            System.out.println("Stack underflow!!");
            System.exit(-1);
        }

        // remove the top element from the main stack
        int top = s.pop();

        // remove the top element from the auxiliary stack
        // only if it is minimum
        if (top == aux.peek()) {
            aux.pop();
        }

        // return the removed element
        return top;
    }

    // Returns the top element of the stack
    public int top() {
        return s.peek();
    }

    // Returns the total number of elements in the stack
    public int size() {
        return s.size();
    }

    // Returns true if the stack is empty; false otherwise
    public boolean isEmpty() {
        return s.isEmpty();
    }

    // Returns the minimum element from the stack in constant time
    public int getMin()
    {
        if (aux.isEmpty())
        {
            System.out.println("Stack underflow!!");
            System.exit(-1);
        }

        return aux.peek();
    }
}

class Main
{
    public static void main (String[] args)
    {
        MinStack s = new MinStack();

        s.push(6);
        System.out.println(s.getMin());    // prints 6

        s.push(7);
        System.out.println(s.getMin());    // prints 6

        s.push(8);
        System.out.println(s.getMin());    // prints 6

        s.push(5);
        System.out.println(s.getMin());    // prints 5

        s.push(3);
        System.out.println(s.getMin());    // prints 3

        System.out.println(s.pop());    // prints 3
        System.out.println(s.getMin());    // prints 5

        s.push(10);
        System.out.println(s.getMin());    // prints 5

        System.out.println(s.pop());    // prints 10
        System.out.println(s.getMin());    // prints 5

        System.out.println(s.pop());    // prints 5
        System.out.println(s.getMin());    // prints 6
    }
}
```

##

```python3
from collections import deque

class MinStack:
    # constructor
    def __init__(self):
        # main stack to store elements
        self.s = deque()
        # auxiliary stack to store minimum elements
        self.aux = deque()

    # Inserts a given element on top of the stack
    def push(self, val):
        # push the given element into the main stack
        self.s.append(val)

        # if the auxiliary stack is empty, push the given element into it
        if not self.aux:
            self.aux.append(val)
        else:
            # push the given element into the auxiliary stack
            # if it is less than or equal to the current minimum
            if self.aux[-1] >= val:
                self.aux.append(val)

    # Removes the top element from the stack and returns it
    def pop(self):
        if self.isEmpty():
            print('Stack underflow')
            exit(-1)

        # remove the top element from the main stack
        top = self.s.pop()

        # remove the top element from the auxiliary stack
        # only if it is minimum
        if top == self.aux[-1]:
            self.aux.pop()

        # return the removed element
        return top

    # Returns the top element of the stack
    def top(self):
        return self.s[-1]

    # Returns the total number of elements in the stack
    def size(self):
        return len(self.s)

    # Returns true if the stack is empty; false otherwise
    def isEmpty(self):
        return not self.s

    # Returns the minimum element from the stack in constant time
    def getMin(self):
        if not self.aux:
            print('Stack underflow')
            exit(-1)
        return self.aux[-1]

if __name__ == '__main__':

    s = MinStack()

    s.push(6)
    print(s.getMin())        # prints 6

    s.push(7)
    print(s.getMin())        # prints 6

    s.push(8)
    print(s.getMin())        # prints 6

    s.push(5)
    print(s.getMin())        # prints 5

    s.push(3)
    print(s.getMin())        # prints 3

    print(s.pop())          # prints 3
    print(s.getMin())        # prints 5

    s.push(10)
    print(s.getMin())        # prints 5

    print(s.pop())          # prints 10
    print(s.getMin())        # prints 5

    print(s.pop())          # prints 5
    print(s.getMin())        # prints 6
```

**Continue Reading:**

> [Design a stack that returns a minimum element without using an auxiliary stack](https://techiedelight.com/design-a-stack-which-returns-minimum-element-without-using-auxiliary-stack/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
