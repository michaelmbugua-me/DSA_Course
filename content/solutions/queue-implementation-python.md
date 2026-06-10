# Queue Implementation in TypeScript

> Source: https://www.techiedelight.com/queue-implementation-python/

This article covers queue implementation in TypeScript. A queue is a linear data structure that follows the FIFO (First–In, First–Out) order, i.e., the item inserted first will be the first one out.

A queue supports the following standard operations:

  1. enqueue: Inserts an element at the rear (right side) of the queue.
  2. dequeue: Removes the element from the front (left side) of the queue and returns it.
  3. peek: Returns the element at the front of the queue without removing it.
  4. isEmpty: Checks whether the queue is empty.
  5. size: Returns the total number of elements present in the queue.

The time complexity of all the above operations should be constant.

> 

Queue Implementation using an Array:

The queue can easily be implemented as an array. Following is the custom queue implementation in TypeScript, which uses an array:

```ts
// Custom queue implementation in TypeScript
class Queue {
    #q: (number | null)[];      // array to store queue elements
    #capacity: number;          // maximum capacity of the queue
    #front: number;             // front points to the front element in the queue
    #rear: number;              // rear points to the last element in the queue
    #count: number;             // current size of the queue

    // Initialize queue
    constructor(size = 1000) {
        this.#q = new Array<number | null>(size).fill(null);
        this.#capacity = size;
        this.#front = 0;
        this.#rear = -1;
        this.#count = 0;
    }

    // Function to dequeue the front element
    dequeue(): number | null {
        // check for queue underflow
        if (this.isEmpty()) {
            console.log('Queue Underflow!! Terminating process.');
            process.exit(-1);
        }
        const x = this.#q[this.#front];
        console.log('Removing element…', x);
        this.#front = (this.#front + 1) % this.#capacity;
        this.#count = this.#count - 1;
        return x;
    }

    // Function to add an element to the queue
    enqueue(value: number): void {
        // check for queue overflow
        if (this.isFull()) {
            console.log('Overflow!! Terminating process.');
            process.exit(-1);
        }
        console.log('Inserting element…', value);
        this.#rear = (this.#rear + 1) % this.#capacity;
        this.#q[this.#rear] = value;
        this.#count = this.#count + 1;
    }

    // Function to return the front element of the queue
    peek(): number | null {
        if (this.isEmpty()) {
            console.log('Queue UnderFlow!! Terminating process.');
            process.exit(-1);
        }
        return this.#q[this.#front];
    }

    // Function to return the size of the queue
    size(): number {
        return this.#count;
    }

    // Function to check if the queue is empty or not
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // Function to check if the queue is full or not
    isFull(): boolean {
        return this.size() === this.#capacity;
    }
}

// create a queue of capacity 5
const q = new Queue(5);

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log('The queue size is', q.size());
console.log('The front element is', q.peek());
q.dequeue();
console.log('The front element is', q.peek());

q.dequeue();
q.dequeue();

if (q.isEmpty()) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 The front element is 2 The queue size is 2 Removing 2 Removing 3 The queue is empty

Using an Array:

The TypeScript standard library offers array operations, which can act as a double-ended queue. A deque is a generalization of [stack](https://techiedelight.com/stack-implementation/) and queues which support constant-time insertions and removals from either side of the deque in either direction.

Following is a simple example demonstrating the usage of array operations to implement queue data structure in TypeScript:

```ts
// Program to demonstrate queue in TypeScript
const queue: number[] = [];

queue.push(1);     // Insert 1 into the queue
queue.push(2);     // Insert 2 into the queue
queue.push(3);     // Insert 3 into the queue
queue.push(4);     // Insert 4 into the queue

// Print front item of the queue
console.log('The front element is', queue[0]);     // 1

queue.shift();     // removing the front element (1)
queue.shift();     // removing the front element (2)

// Print front item of the queue
console.log('The front element is', queue[0]);     // 3

// Print the number of elements present in the queue
console.log('The queue size is', queue.length);      // 2

// check whether the queue is empty
if (queue.length === 0) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
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
