# Queue Implementation in Python

> Source: https://www.techiedelight.com/queue-implementation-python/

This article covers queue implementation in Python. A queue is a linear data structure that follows the FIFO (First–In, First–Out) order, i.e., the item inserted first will be the first one out.

A queue supports the following standard operations:

  1. enqueue: Inserts an element at the rear (right side) of the queue.
  2. dequeue: Removes the element from the front (left side) of the queue and returns it.
  3. peek: Returns the element at the front of the queue without removing it.
  4. isEmpty: Checks whether the queue is empty.
  5. size: Returns the total number of elements present in the queue.

The time complexity of all the above operations should be constant.

> 

Queue Implementation using a List:

The queue can easily be implemented as a list. Following is the custom queue implementation in Python, which uses a list:

```
# Custom queue implementation in Python
class Queue:

    # Initialize queue
    def __init__(self, size=1000):
        self.q = [None] * size      # list to store queue elements
        self.capacity = size        # maximum capacity of the queue
        self.front = 0              # front points to the front element in the queue
        self.rear = -1              # rear points to the last element in the queue
        self.count = 0              # current size of the queue

    # Function to dequeue the front element
    def dequeue(self):
        # check for queue underflow
        if self.isEmpty():
            print('Queue Underflow!! Terminating process.')
            exit(-1)
        x = self.q[self.front]
        print('Removing element…', x)
        self.front = (self.front + 1) % self.capacity
        self.count = self.count - 1
        return x

    # Function to add an element to the queue
    def enqueue(self, value):
        # check for queue overflow
        if self.isFull():
            print('Overflow!! Terminating process.')
            exit(-1)
        print('Inserting element…', value)
        self.rear = (self.rear + 1) % self.capacity
        self.q[self.rear] = value
        self.count = self.count + 1

    # Function to return the front element of the queue
    def peek(self):
        if self.isEmpty():
            print('Queue UnderFlow!! Terminating process.')
            exit(-1)
        return self.q[self.front]

    # Function to return the size of the queue
    def size(self):
        return self.count

    # Function to check if the queue is empty or not
    def isEmpty(self):
        return self.size() == 0

    # Function to check if the queue is full or not
    def isFull(self):
        return self.size() == self.capacity

if __name__ == '__main__':

    # create a queue of capacity 5
    q = Queue(5)

    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)

    print('The queue size is', q.size())
    print('The front element is', q.peek())
    q.dequeue()
    print('The front element is', q.peek())

    q.dequeue()
    q.dequeue()

    if q.isEmpty():
        print('The queue is empty')
    else:
        print('The queue is not empty')
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 The front element is 2 The queue size is 2 Removing 2 Removing 3 The queue is empty

Using `deque()`:

Python’s library offers a [deque](https://docs.python.org/3.3/library/collections.html#collections.deque) object, which stands for the double-ended queue. A deque is a generalization of [stack](https://techiedelight.com/stack-implementation/) and queues which support constant-time insertions and removals from either side of the deque in either direction.

Following is a simple example demonstrating the usage of deque to implement queue data structure in Python:

```
from collections import deque

# Program to demonstrate queue in Python
if __name__ == '__main__':

    queue = deque()

    queue.append(1)     # Insert 1 into the queue
    queue.append(2)     # Insert 2 into the queue
    queue.append(3)     # Insert 3 into the queue
    queue.append(4)     # Insert 4 into the queue

    # Print front item of the queue
    print('The front element is', queue[0])     # 1

    queue.popleft()     # removing the front element (1)
    queue.popleft()     # removing the front element (2)

    # Print front item of the queue
    print('The front element is', queue[0])     # 3

    # Print the number of elements present in the queue
    print('The queue size is', len(queue))      # 2

    # check whether the queue is empty
    if len(queue) == 0:
        print('The queue is empty')
    else:
        print('The queue is not empty')
```

**Output:** The front element is 1 The front element is 3 The queue size is 2 The queue is not empty

**Also See:**

> [Circular Queue implementation in C](https://techiedelight.com/circular-queue-implementation-c/)

> [Queue Implementation in C++](https://techiedelight.com/queue-implementation-cpp/)

> [Queue Implementation in Java](https://techiedelight.com/queue-implementation-in-java/)

> [Queue Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/queue-implementation-using-linked-list/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
