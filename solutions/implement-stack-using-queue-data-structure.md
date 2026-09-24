# Implement a stack using the queue data structure

> Source: https://www.techiedelight.com/implement-stack-using-queue-data-structure/

This post will implement a [stack](https://techiedelight.com/stack-implementation/) using the [queue data structure](https://techiedelight.com/circular-queue-implementation-c/). In other words, design a stack that supports push and pop operations using standard enqueue and dequeue operations of the queue.

A stack is a _Last–In, First–Out_ (LIFO) data structure in which elements are inserted and removed from one end of the stack known as the top of the stack. It has two major operations: The push operation, which adds an element into the stack, and the pop operation, which removes the most recently added element from the stack, but not yet removed.

There are several ways to implement a stack using one or two queues by tweaking their enqueue and dequeue operations.

## 1\. Using Two Queues

The idea is to implement the queue’s enqueue operation such that the last entered item always ends up at the queue’s front. To achieve this, we need an additional queue.

  1. To push an item into the stack, first move all elements from the first queue to the second queue, then enqueue the new item into the first queue, and finally move all elements back to the first queue. This ensures that the new item lies in front of the queue and hence would be the first one to be removed.
  2. To pop an item from the stack, return the front item from the first queue.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <cstdlib>
using namespace std;

// Implement stack using two queues
class Stack
{
    queue<int> q1, q2;

public:
    // Insert an item into the stack
    void push(int data)
    {
        // Move all elements from the first queue to the second queue
        while (!q1.empty())
        {
            q2.push(q1.front());
            q1.pop();
        }

        // Push the given item into the first queue
        q1.push(data);

        // Move all elements back to the first queue from the second queue
        while (!q2.empty())
        {
            q1.push(q2.front());
            q2.pop();
        }
    }

    // Remove the top item from the stack
    int pop()
    {
        // if the first queue is empty
        if (q1.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }

        // return the front item from the first queue
        int front = q1.front();
        q1.pop();

        return front;
    }
};

int main()
{
    vector<int> keys = { 1, 2, 3, 4, 5 };

    // insert the above keys into the stack
    Stack s;
    for (int key: keys) {
        s.push(key);
    }

    for (int i = 0; i <= keys.size(); i++) {
        cout << s.pop() << endl;
    }

    return 0;
}
```

**Output:** 5 4 3 2 1 Underflow!!

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// Implement stack using two queues
class Stack<T>
{
    Queue<T> q1, q2;

    // Constructor
    public Stack()
    {
        q1 = new ArrayDeque<>();
        q2 = new ArrayDeque<>();
    }

    // Insert an item into the stack
    void add(T data)
    {
        // Move all elements from the first queue to the second queue
        while (!q1.isEmpty())
        {
            q2.add(q1.peek());
            q1.poll();
        }

        // Push the given item into the first queue
        q1.add(data);

        // Move all elements back to the first queue from the second queue
        while (!q2.isEmpty())
        {
            q1.add(q2.peek());
            q2.poll();
        }
    }

    // Remove the top item from the stack
    public T poll()
    {
        // if the first queue is empty
        if (q1.isEmpty())
        {
            System.out.println("Underflow!!");
            System.exit(0);
        }

        // return the front item from the first queue
        T front = q1.peek();
        q1.poll();

        return front;
    }
}

class Main
{
    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };

        // insert the above keys into the stack
        Stack<Integer> s = new Stack<Integer>();
        for (int key: keys) {
            s.add(key);
        }

        for (int i = 0; i <= keys.length; i++) {
            System.out.println(s.poll());
        }
    }
}
```

##

```python3
from collections import deque

# Implement stack using two queues
class Stack:

    # Constructor
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    # Insert an item into the stack
    def add(self, data):
        # Move all elements from the first queue to the second queue
        while len(self.q1):
            self.q2.append(self.q1.pop())

        # Push the given item into the first queue
        self.q1.append(data)

        # Move all elements back to the first queue from the second queue
        while len(self.q2):
            self.q1.append(self.q2.pop())

    # Remove the top item from the stack
    def pop(self):
        # if the first queue is empty
        if not self.q1:
            print('Underflow!!')
            exit(0)
        # return the front item from the first queue
        front = self.q1.popleft()
        return front

if __name__ == '__main__':

    keys = [1, 2, 3, 4, 5]

    # insert the above keys into the stack
    s = Stack()
    for key in keys:
        s.add(key)

    while s:
        print(s.pop())

    print(s.pop())
```

Note that the elements are exchanged between the queue twice for every push operation. This can impact performance if push operations are frequent. Here’s an alternative approach that affects the pop operation’s time complexity instead of the push operation.

  1. To push an item into the stack, enqueue the item to the first queue.
  2. To pop an item from the stack, move all elements from the first queue to the second queue except the last element, and then return the last element after moving all elements back to the first queue.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <queue>
#include <algorithm>
#include <vector>
#include <cstdlib>
using namespace std;

// Implement stack using two queues
class Stack
{
    queue<int> q1, q2;

public:
    // Insert an item into the stack
    void push(int data)
    {
        // Push the given item into the first queue
        q1.push(data);
    }

    // Remove the top item from the stack
    int pop()
    {
        // if the first queue is empty
        if (q1.empty())
        {
            cout << "Stack Underflow!!";
            exit(0);
        }

        // Move all elements except last from the first queue to the second queue
        int front;
        while (!q1.empty())
        {
            if (q1.size() == 1) {
                front = q1.front();
            }
            else {
                q2.push(q1.front());
            }

            q1.pop();
        }

        // Return the last element after moving all elements back
        // to the first queue
        while (!q2.empty())
        {
            q1.push(q2.front());
            q2.pop();
        }

        /* The above loop can be replaced with a call to `swap(q1, q2)` */

        return front;
    }
};

int main()
{
    vector<int> keys = { 1, 2, 3, 4, 5 };

    // insert the above keys into the stack
    Stack s;
    for (int key: keys) {
        s.push(key);
    }

    for (int i = 0; i <= keys.size(); i++) {
        cout << s.pop() << endl;
    }

    return 0;
}
```

**Output:** 5 4 3 2 1 Stack Underflow!!

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// Implement stack using two queues
class Stack<T>
{
    Queue<T> q1, q2;

    // Constructor
    public Stack()
    {
        q1 = new ArrayDeque<>();
        q2 = new ArrayDeque<>();
    }

    // Insert an item into the stack
    void add(T data)
    {
        // Push the given item into the first queue
        q1.add(data);
    }

    // Remove the top item from the stack
    public T poll()
    {
        // if the first queue is empty
        if (q1.isEmpty())
        {
            System.out.println("Stack Underflow!!");
            System.exit(0);
        }

        // Move all elements except last from the first queue to the second queue
        T front = null;
        while (!q1.isEmpty())
        {
            if (q1.size() == 1) {
                front = q1.peek();
            }
            else {
                q2.add(q1.peek());
            }

            q1.poll();
        }

        // Return the last element after moving all elements back to
        // the first queue
        while (!q2.isEmpty())
        {
            q1.add(q2.peek());
            q2.poll();
        }

        return front;
    }
}

class Main
{
    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };

        // insert the above keys into the stack
        Stack<Integer> s = new Stack<Integer>();
        for (int key: keys) {
            s.add(key);
        }

        for (int i = 0; i <= keys.length; i++) {
            System.out.println(s.poll());
        }
    }
}
```

##

```python3
from collections import deque

# Implement stack using two queues
class Stack:

    # Constructor
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    # Insert an item into the stack
    def add(self, data):
        # Push the given item into the first queue
        self.q1.append(data)

    # Remove the top item from the stack
    def poll(self):
        # if the first queue is empty
        if not self.q1:
            print('Stack Underflow!!')
            exit(0)

        # Move all elements except last from the first queue to the second queue
        front = None
        while self.q1:
            if len(self.q1) == 1:
                front = self.q1.popleft()
            else:
                self.q2.append(self.q1.popleft())

        # Return the last element after moving all elements back to the first queue.
        while self.q2:
            self.q1.append(self.q2.popleft())

        return front

if __name__ == '__main__':

    keys = [1, 2, 3, 4, 5]

    # insert the above keys into the stack
    s = Stack()

    for key in keys:
        s.add(key)

    while s:
        print(s.poll())
```

## 2\. Using one queue with call stack

We can also use an implicit stack (call stack) along with a queue to construct a stack, as shown below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <cstdlib>
using namespace std;

// Implement stack using a single queue and recursion
class Stack
{
    queue<int> q;

public:
    // Insert an item into the stack
    void push(int x) {
        q.push(x);
    }

    // Utility function to reverse contents of a queue
    void reverseQueue()
    {
        // base case
        if (q.empty()) {
            return;
        }

        // hold the front element in the call stack and enqueue
        // it again after the recursive call is over

        int front = q.front();
        q.pop();

        reverseQueue();

        q.push(front);
    }

    // Remove the top item from the stack
    int pop()
    {
        // if the queue is empty
        if (q.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }

        // reverse the queue
        reverseQueue();

        // dequeue front element from the reversed queue
        int front = q.front();
        q.pop();

        // revert the queue to the original state
        reverseQueue();

        return front;
    }
};

int main()
{
    vector<int> keys = { 1, 2, 3, 4, 5 };

    // insert the above keys into the stack
    Stack s;
    for (int key: keys) {
        s.push(key);
    }

    for (int i = 0; i <= keys.size(); i++) {
        cout << s.pop() << endl;
    }

    return 0;
}
```

**Output:** 5 4 3 2 1 Underflow!!
