# Queue Implementation using a Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/queue-implementation-using-linked-list/

A queue is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations: enqueue, dequeue and peek. We have discussed these operations in the [previous post](https://techiedelight.com/circular-queue-implementation-c/) and covered an array implementation of a queue data structure. In this post, the [linked list](https://techiedelight.com/introduction-linked-lists/) implementation of a queue is discussed.

> 

A queue can be easily implemented using a linked list. In singly linked list implementation, enqueuing happens at the tail of the list, and the dequeuing of items happens at the head of the list. We need to maintain a pointer to the last node to keep O(1) efficiency for insertion.

Since a doubly linked list offers O(1) insertion and deletion at both ends, use it if we want to enqueue to happen at the beginning and dequeuing to occur at the tail of the linked list.

Following is the implementation of the queue using a linked list in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;               // integer data
    struct Node* next;      // pointer to the next node
}*rear = NULL, *front = NULL;

// Utility function to allocate the new queue node
struct Node* newNode(int item)
{
    // allocate a new node in a heap
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));

    // check if the queue (heap) is full. Then inserting an element would
    // lead to heap overflow
    if (node != NULL)
    {
        // set data in the allocated node and return it
        node->data = item;
        node->next = NULL;
        return node;
    }
    else {
        printf("\nHeap Overflow");
        exit(EXIT_FAILURE);
    }
}

// Utility function to dequeue the front element
int dequeue()        // delete at the beginning
{
    if (front == NULL)
    {
        printf("\nQueue Underflow");
        exit(EXIT_FAILURE);
    }

    struct Node* temp = front;
    printf("Removing %d\n", temp->data);

    // advance front to the next node
    front = front->next;

    // if the list becomes empty
    if (front == NULL) {
        rear = NULL;
    }

    // deallocate the memory of the removed node and optionally return the removed item
    int item = temp->data;
    free(temp);
    return item;
}

// Utility function to add an item to the queue
void enqueue(int item)        // insertion at the end
{
    // allocate a new node in a heap
    struct Node* node = newNode(item);
    printf("Inserting %d\n", item);

    // special case: queue was empty
    if (front == NULL)
    {
        // initialize both front and rear
        front = node;
        rear = node;
    }
    else {
        // update rear
        rear->next = node;
        rear = node;
    }
}

// Utility function to return the top element in a queue
int peek()
{
    // check for an empty queue
    if (front != NULL) {
        return front->data;
    }
    else {
        exit(EXIT_FAILURE);
    }
}

// Utility function to check if the queue is empty or not
int isEmpty() {
    return rear == NULL && front == NULL;
}

int main()
{
    enqueue(1);
    enqueue(2);
    enqueue(3);
    enqueue(4);

    printf("The front element is %d\n", peek());

    dequeue();
    dequeue();
    dequeue();
    dequeue();

    if (isEmpty()) {
        printf("The queue is empty");
    }
    else {
        printf("The queue is not empty");
    }

    return 0;
}
```

##

```java
// A Linked List Node
class Node
{
    int data;       // integer data
    Node next;      // pointer to the next node

    public Node(int data)
    {
        // set data in the allocated node and return it
        this.data = data;
        this.next = null;
    }
}

class Queue
{
    private static Node rear = null, front = null;
    private static int count = 0;

    // Utility function to dequeue the front element
    public static int dequeue()     // delete at the beginning
    {
        if (front == null)
        {
            System.out.println("\nQueue Underflow");
            System.exit(-1);
        }

        Node temp = front;
        System.out.printf("Removing %d\n", temp.data);

        // advance front to the next node
        front = front.next;

        // if the list becomes empty
        if (front == null) {
            rear = null;
        }

        // decrease the node's count by 1
        count -= 1;

        // return the removed item
        return temp.data;
    }

    // Utility function to add an item to the queue
    public static void enqueue(int item)     // insertion at the end
    {
        // allocate a new node in a heap
        Node node = new Node(item);
        System.out.printf("Inserting %d\n", item);

        // special case: queue was empty
        if (front == null)
        {
            // initialize both front and rear
            front = node;
            rear = node;
        }
        else {
            // update rear
            rear.next = node;
            rear = node;
        }

        // increase the node's count by 1
        count += 1;
    }

    // Utility function to return the top element in a queue
    public static int peek()
    {
        // check for an empty queue
        if (front == null) {
            System.exit(-1);
        }

        return front.data;
    }

    // Utility function to check if the queue is empty or not
    public static boolean isEmpty() {
        return rear == null && front == null;
    }

    // Function to return the size of the queue
    private static int size() {
        return count;
    }
}

class Main
{
    public static void main(String[] args)
    {
        Queue q = new Queue();
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        q.enqueue(4);

        System.out.printf("The front element is %d\n", q.peek());

        q.dequeue();
        q.dequeue();
        q.dequeue();
        q.dequeue();

        if (q.isEmpty()) {
            System.out.println("The queue is empty");
        }
        else {
            System.out.println("The queue is not empty");
        }
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, left=None, right=None):
        # set data in the allocated node and return it
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.rear = None
        self.front = None
        self.count = 0

    # Utility function to dequeue the front element
    def dequeue(self):          # delete at the beginning
        if self.front is None:
            print('Queue Underflow')
            exit(-1)

        temp = self.front
        print('Removing…', temp.data)

        # advance front to the next node
        self.front = self.front.next

        # if the list becomes empty
        if self.front is None:
            self.rear = None

        # decrease the node's count by 1
        self.count -= 1

        # return the removed item
        return temp.data

    # Utility function to add an item to the queue
    def enqueue(self, item):    # insertion at the end
        # allocate the node in a heap
        node = Node(item)
        print('Inserting…', item)

        # special case: queue was empty
        if self.front is None:
            # initialize both front and rear
            self.front = node
            self.rear = node
        else:
            # update rear
            self.rear.next = node
            self.rear = node

        # increase the node's count by 1
        self.count += 1

    # Utility function to return the top element in a queue
    def peek(self):
        # check for an empty queue
        if self.front:
            return self.front.data
        else:
            exit(-1)

    # Utility function to check if the queue is empty or not
    def isEmpty(self):
        return self.rear is None and self.front is None

    # Function to return the size of the queue
    def size(self):
        return self.count

if __name__ == '__main__':

    q = Queue()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    q.enqueue(4)

    print('The front element is', q.peek())

    q.dequeue()
    q.dequeue()
    q.dequeue()
    q.dequeue()

    if q.isEmpty():
        print('The queue is empty')
    else:
        print('The queue is not empty')
```

**Output:** Inserting 1 Inserting 2 Inserting 3 Inserting 4 The front element is 1 Removing 1 Removing 2 Removing 3 Removing 4 The queue is empty

The advantage of using linked lists over arrays is that it is possible to implement a queue that can grow or shrink as much as needed. Since each new node will be dynamically allocated, overflow is not possible unless heap memory is exhausted. Using a static array will restrict the array’s maximum capacity, which can lead to queue overflow.

Also See:

> [Queue Implementation using Templates in C++](https://www.techiedelight.com/queue-implementation-using-templates-cpp/ "Queue Implementation using Templates in C++")

> [Queue Implementation in Java](https://www.techiedelight.com/queue-implementation-in-java/ "Queue Implementation in Java")

> [Queue Implementation in Python](https://www.techiedelight.com/queue-implementation-python/ "Queue Implementation in Python")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
