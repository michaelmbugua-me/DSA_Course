# Circular Queue implementation in TypeScript

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

Following is a TypeScript program that demonstrates it:

```ts
// Data structure to represent a queue
class Queue {
    items: number[];    // array to store queue elements
    maxsize: number;    // maximum capacity of the queue
    front = 0;          // front points to the front element in the queue (if any)
    rear = -1;          // rear points to the last element in the queue
    size = 0;           // current capacity of the queue

    // Utility function to initialize a queue
    constructor(maxsize: number) {
        this.maxsize = maxsize;
        this.items = new Array<number>(maxsize);
    }

    // Utility function to check if the queue is empty or not
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Utility function to return the front element of the queue
    getFront(): number {
        if (this.isEmpty()) {
            console.log("Underflow\nProgram Terminated\n");
            process.exit(1);
        }

        return this.items[this.front];
    }

    // Utility function to add an element `x` to the queue
    enqueue(x: number): void {
        if (this.size === this.maxsize) {
            console.log("Overflow\nProgram Terminated\n");
            process.exit(1);
        }

        console.log(`Inserting ${x}\t`);

        this.rear = (this.rear + 1) % this.maxsize;      // circular queue
        this.items[this.rear] = x;
        this.size++;

        console.log(`front = ${this.front}, rear = ${this.rear}`);
    }

    // Utility function to dequeue the front element
    dequeue(): void {
        if (this.isEmpty()) {   // front == rear
            console.log("Underflow\nProgram Terminated\n");
            process.exit(1);
        }

        console.log(`Removing ${this.getFront()}\t`);

        this.front = (this.front + 1) % this.maxsize;   // circular queue
        this.size--;

        console.log(`front = ${this.front}, rear = ${this.rear}`);
    }
}

const pt = new Queue(5);

pt.enqueue(1);
pt.enqueue(2);
pt.enqueue(3);
pt.enqueue(4);

pt.dequeue();
pt.dequeue();
pt.dequeue();
pt.dequeue();

pt.enqueue(5);
pt.enqueue(6);

console.log(`size = ${pt.size}`);

if (pt.isEmpty()) {
    console.log("The queue is empty");
}
else {
    console.log("The queue is not empty");
}
```

**Output:** Inserting 1 front = 0, rear = 1 Inserting 2 front = 0, rear = 2 Inserting 3 front = 0, rear = 3 Inserting 4 front = 0, rear = 4 Removing 1 front = 1, rear = 4 Removing 2 front = 2, rear = 4 Removing 3 front = 3, rear = 4 Removing 4 front = 4, rear = 4 Inserting 5 front = 4, rear = 0 Inserting 6 front = 4, rear = 1 size = 2 The queue is not empty

The time complexity of `enqueue()`, `dequeue()`, `front()`, `isEmpty()` and `size()` operations is O(1).

It is possible to implement a queue that can grow or shrink as much as needed using a dynamic array, which a plain TypeScript array already provides.

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
