# Circular Queue implementation in C

> Source: https://www.techiedelight.com/circular-queue-implementation-c/

A queue is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations.

  * Enqueue operation, which adds an element to the rear position in the queue.
  * Dequeue operation, which removes an element from the front position in the queue.
  * Peek or front operation, which returns the front element without dequeuing it or modifying the queue in any way.

The queue is also known as First–In, First–Out (FIFO) data structure considering the order in which elements come off a queue, i.e., the first element inserted into the queue is the first one to be removed. Following is a simple representation of a FIFO queue:

[](https://commons.wikimedia.org/wiki/File%3AData_Queue.svg "By Vegpuff, via Wikimedia Commons")

A queue may be implemented to have a bounded capacity. If the queue is full and does not contain enough space for `enqueue` operation, it will result in queue overflow. When trying to remove an element from an empty queue, queue underflow will happen.

Circular Queue Implementation using an array:

There are several efficient implementations of FIFO queues. A (bounded) queue can be easily implemented using an array using a five elements structure:

**structure stack:** item : array maxsize : integer front : integer rear : integer size : integer

Since fixed-length arrays have limited capacity, we need to convert the array into a closed circle. If `n` is the array’s size, then computing indices modulo `n` will turn the array into a circle. Now, `front` and `rear` can drift around endlessly in that circle, making it unnecessary to move items stored in the array.

Following is the C program that demonstrates it:

```
#include <stdio.h>
#include <stdlib.h>

// Data structure to represent a queue
struct queue
{
    int *items;     // array to store queue elements
    int maxsize;    // maximum capacity of the queue
    int front;      // front points to the front element in the queue (if any)
    int rear;       // rear points to the last element in the queue
    int size;       // current capacity of the queue
};

// Utility function to initialize a queue
struct queue* newQueue(int size)
{
    struct queue *pt = NULL;
    pt = (struct queue*)malloc(sizeof(struct queue));

    pt->items = (int*)malloc(size * sizeof(int));
    pt->maxsize = size;
    pt->front = 0;
    pt->rear = -1;
    pt->size = 0;

    return pt;
}

// Utility function to return the size of the queue
int size(struct queue *pt) {
    return pt->size;
}

// Utility function to check if the queue is empty or not
int isEmpty(struct queue *pt) {
    return !size(pt);
}

// Utility function to return the front element of the queue
int front(struct queue *pt)
{
    if (isEmpty(pt))
    {
        printf("Underflow\nProgram Terminated\n");
        exit(EXIT_FAILURE);
    }

    return pt->items[pt->front];
}

// Utility function to add an element `x` to the queue
void enqueue(struct queue *pt, int x)
{
    if (size(pt) == pt->maxsize)
    {
        printf("Overflow\nProgram Terminated\n");
        exit(EXIT_FAILURE);
    }

    printf("Inserting %d\t", x);

    pt->rear = (pt->rear + 1) % pt->maxsize;    // circular queue
    pt->items[pt->rear] = x;
    pt->size++;

    printf("front = %d, rear = %d\n", pt->front, pt->rear);
}

// Utility function to dequeue the front element
void dequeue(struct queue *pt)
{
    if (isEmpty(pt))    // front == rear
    {
        printf("Underflow\nProgram Terminated\n");
        exit(EXIT_FAILURE);
    }

    printf("Removing %d\t", front(pt));

    pt->front = (pt->front + 1) % pt->maxsize;  // circular queue
    pt->size--;

    printf("front = %d, rear = %d\n", pt->front, pt->rear);
}

int main()
{
    struct queue *pt = newQueue(5);

    enqueue(pt, 1);
    enqueue(pt, 2);
    enqueue(pt, 3);
    enqueue(pt, 4);

    dequeue(pt);
    dequeue(pt);
    dequeue(pt);
    dequeue(pt);

    enqueue(pt, 5);
    enqueue(pt, 6);

    printf("size = %d\n", size(pt));

    if (isEmpty(pt)) {
        printf("The queue is empty");
    }
    else {
        printf("The queue is not empty");
    }

    return 0;
}
```

**Output:** Inserting 1 front = 0, rear = 1 Inserting 2 front = 0, rear = 2 Inserting 3 front = 0, rear = 3 Inserting 4 front = 0, rear = 4 Removing 1 front = 1, rear = 4 Removing 2 front = 2, rear = 4 Removing 3 front = 3, rear = 4 Removing 4 front = 4, rear = 4 Inserting 5 front = 4, rear = 0 Inserting 6 front = 4, rear = 1 size = 2 The queue is not empty

The time complexity of `enqueue()`, `dequeue()`, `front()`, `isEmpty()` and `size()` operations is O(1).

It is possible to implement a queue that can grow or shrink as much as needed using a dynamic array. For example, using [std::vector](https://en.cppreference.com/w/cpp/container/vector) in C++ or [ArrayList](https://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html) in Java.

Applications of a Queue:

  1. [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) algorithm.
  2. Job Scheduling, to maintain a queue of processes in operating systems (FIFO order).
  3. Queue of packets in data communication.
  4. Data synchronization, to transfer data asynchronously between two processes.
  5. A queue’s real-life applications would be waiting in a line at the ticket counter or call waiting for support or vehicles on a one-way lane, and many more…

**Also See:**

> [Queue Implementation in C++](https://techiedelight.com/queue-implementation-cpp/)

> [Queue Implementation in Java](https://techiedelight.com/queue-implementation-in-java/)

> [Queue Implementation in Python](https://techiedelight.com/queue-implementation-python/)

> [Queue Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/queue-implementation-using-linked-list/)

**References:** <https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 76

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
