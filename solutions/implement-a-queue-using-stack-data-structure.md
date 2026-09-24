# Implement a queue using the stack data structure

> Source: https://www.techiedelight.com/implement-a-queue-using-stack-data-structure/

This post will implement a [queue](https://techiedelight.com/circular-queue-implementation-c/) using the [stack data structure](https://techiedelight.com/stack-implementation/) in C++, Java, and Python. In other words, design a queue that supports enqueue and dequeue operations using standard push and pop operations of the stack.

We know that queue is a _First–In, First–Out_ (FIFO) data structure in which elements are removed in the same order in which they were added to the queue. In an enqueue operation, items are added to the rear of the queue, while in dequeue operation, items are removed from the front of the queue.

There are several ways to implement a queue using one or two stacks by tweaking their push and pop operations.

## 1\. Using two stacks

The idea is to implement the queue’s enqueue operation so that the first entered element always ends up at the top of the stack. To achieve this, we need an additional stack.

  1. To enqueue an item into the queue, first move all elements from the first stack to the second stack, push the item into the first stack, and finally move all elements back to the first stack. This ensures that the new item lies at the bottom of the stack and hence would be the last one to be removed.
  2. To dequeue an item from the queue, return the top item from the first stack.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
#include <cstdlib>
using namespace std;

// Implement a queue using two stacks
class Queue
{
    stack<int> s1, s2;

public:
    // Add an item to the queue
    void enqueue(int data)
    {
        // Move all elements from the first stack to the second stack
        while (!s1.empty())
        {
            s2.push(s1.top());
            s1.pop();
        }

        // push item into the first stack
        s1.push(data);

        // Move all elements back to the first stack from the second stack
        while (!s2.empty())
        {
            s1.push(s2.top());
            s2.pop();
        }
    }

    // Remove an item from the queue
    int dequeue()
    {
        // if the first stack is empty
        if (s1.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }

        // return the top item from the first stack
        int top = s1.top();
        s1.pop();
        return top;
    }
};

int main()
{
    int keys[] = { 1, 2, 3, 4, 5 };
    Queue q;

    // insert above keys
    for (int key: keys) {
        q.enqueue(key);
    }

    cout << q.dequeue() << endl;    // print 1
    cout << q.dequeue() << endl;    // print 2

    return 0;
}
```

##

```java
import java.util.Stack;

// Implement a queue using two stacks
class Queue<T> {
    private Stack<T> s1, s2;

    // Constructor
    Queue()
    {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    // Add an item to the queue
    public void enqueue(T data)
    {
        // Move all elements from the first stack to the second stack
        while (!s1.isEmpty()) {
            s2.push(s1.pop());
        }

        // push item into the first stack
        s1.push(data);

        // Move all elements back to the first stack from the second stack
        while (!s2.isEmpty()) {
            s1.push(s2.pop());
        }
    }

    // Remove an item from the queue
    public T dequeue()
    {
        // if the first stack is empty
        if (s1.isEmpty())
        {
            System.out.println("Underflow!!");
            System.exit(0);
        }

        // return the top item from the first stack
        return s1.pop();
    }
}

class Main
{
    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };
        Queue<Integer> q = new Queue<Integer>();

        // insert above keys
        for (int key: keys) {
            q.enqueue(key);
        }

        System.out.println(q.dequeue());    // print 1
        System.out.println(q.dequeue());    // print 2
    }
}
```

##

```python3
from collections import deque

# Implement a queue using two stacks
class Queue:

    # Constructor
    def __init__(self):
        self.s1 = deque()
        self.s2 = deque()

    # Add an item to the queue
    def enqueue(self, data):

        # Move all elements from the first stack to the second stack
        while len(self.s1):
            self.s2.append(self.s1.pop())

        # push item into the first stack
        self.s1.append(data)

        # Move all elements back to the first stack from the second stack
        while len(self.s2):
            self.s1.append(self.s2.pop())

    # Remove an item from the queue
    def dequeue(self):

        # if the first stack is empty
        if not self.s1:
            print('Underflow!!')
            exit(0)

        # return the top item from the first stack
        return self.s1.pop()

if __name__ == '__main__':

    keys = [1, 2, 3, 4, 5]
    q = Queue()

    # insert above keys
    for key in keys:
        q.enqueue(key)

    print(q.dequeue())        # 1
    print(q.dequeue())        # 2
```

Note that the elements are exchanged between the stacks twice for every enqueue operation. This can impact performance if enqueue operations are frequent. Here’s an alternative approach that affects the dequeue operation’s time complexity instead of the enqueue operation.

  1. To enqueue an item into the queue, push the item into the first stack.
  2. To dequeue an item from the queue, move elements from the first stack to the second stack if it is empty, and return the top item from the second stack.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
#include <algorithm>
#include <cstdlib>
using namespace std;

// Implement a queue using two stacks
class Queue
{
    stack<int> s1, s2;

public:
    // Add an item to the queue
    void enqueue(int data)
    {
        // push item into the first stack
        s1.push(data);
    }

    // Remove an item from the queue
    int dequeue()
    {
        // if both stacks are empty
        if (s1.empty() && s2.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }

        // if the second stack is empty, move elements from the first stack to it
        if (s2.empty())
        {
            while (!s1.empty())
            {
                s2.push(s1.top());
                s1.pop();
            }
            // or make a call to `swap(s1, s2)`
        }

        // return the top item from the second stack
        int top = s2.top();
        s2.pop();
        return top;
    }
};

int main()
{
    int keys[] = { 1, 2, 3, 4, 5 };
    Queue q;

    // insert above keys
    for (int key: keys) {
        q.enqueue(key);
    }

    cout << q.dequeue() << endl;    // print 1
    cout << q.dequeue() << endl;    // print 2

    return 0;
}
```

##

```java
import java.util.Stack;

// Implement a queue using two stacks
class Queue<T> {
    private Stack<T> s1, s2;

    // Constructor
    Queue()
    {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    // Add an item to the queue
    public void enqueue(T data)
    {
        // push item into the first stack
        s1.push(data);
    }

    // Remove an item from the queue
    public T dequeue()
    {
        // if both stacks are empty
        if (s1.isEmpty() && s2.isEmpty())
        {
            System.out.println("Underflow!!");
            System.exit(0);
        }

        // if the second stack is empty, move elements from the first stack to it
        if (s2.isEmpty())
        {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }

        // return the top item from the second stack
        return s2.pop();
    }
}

class Main
{
    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };
        Queue<Integer> q = new Queue<Integer>();

        // insert above keys
        for (int key: keys) {
            q.enqueue(key);
        }

        System.out.println(q.dequeue());    // print 1
        System.out.println(q.dequeue());    // print 2
    }
}
```

##

```python3
from collections import deque

# Implement a queue using two stacks
class Queue:

    # Constructor
    def __init__(self):
        self.s1 = deque()
        self.s2 = deque()

    # Add an item to the queue
    def enqueue(self, data):
        # push item into the first stack
        self.s1.append(data)

    # Remove an item from the queue
    def dequeue(self):
        # if both stacks are empty
        if not self.s1 and not self.s2:
            print('Underflow!!')
            exit(0)

        # if the second stack is empty, move elements from the first stack to it
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())

        # return the top item from the second stack
        return self.s2.pop()

if __name__ == '__main__':

    keys = [1, 2, 3, 4, 5]
    q = Queue()

    # insert above keys
    for key in keys:
        q.enqueue(key)

    print(q.dequeue())        # 1
    print(q.dequeue())        # 2
```

## 2\. Using one stack with call stack

We can also use an implicit stack ([call stack](https://en.wikipedia.org/wiki/Call_stack)) and an actual stack for constructing a queue. The dequeue operation pops all elements from the stack and stores them in the call stack. When the stack is left with a single item, remove and return that item. Finally, push all elements back into the stack from the call stack as the recursion unfolds.

```cpp
#include <iostream>
#include <stack>
#include <cstdlib>
using namespace std;

// Implement a queue using a single stack
class Queue
{
    stack<int> s;

public:
    // Add an item to the queue
    void enqueue(int data)
    {
        // push item into the first stack
        s.push(data);
    }

    // Remove an item from the queue
    int dequeue()
    {
        // if the stack is empty
        if (s.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }

        // pop an item from the stack
        int top = s.top();
        s.pop();

        // if the stack becomes empty, return the popped item
        if (s.empty()) {
            return top;
        }

        // recur
        int item = dequeue();

        // push popped item back into the stack
        s.push(top);

        // return the result of dequeue() call
        return item;
    }
};

int main()
{
    int keys[] = { 1, 2, 3, 4, 5 };
    Queue q;

    // insert the above keys into the queue
    for (int key: keys) {
        q.enqueue(key);
    }

    cout << q.dequeue() << endl;    // print 1
    cout << q.dequeue() << endl;    // print 2

    return 0;
}
```
