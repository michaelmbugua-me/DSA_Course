# Queue Implementation in C++

> Source: https://www.techiedelight.com/queue-implementation-cpp/

A queue is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure) that serves as a container of objects that are inserted and removed according to the FIFO (First–In, First–Out) principle.

Queue has three main operations: `enqueue`, `dequeue`, and `peek`. We have already covered these operations and implementation of queue data structure using an [array](https://techiedelight.com/circular-queue-implementation-c/) and [linked list](https://techiedelight.com/queue-implementation-using-linked-list/). In this article, a TypeScript implementation of the queue data structure is discussed using a class.

Following is the queue implementation in TypeScript which covers the following operations:

  * Enqueue: Inserts a new element at the rear of the queue.
  * Dequeue: Removes the front element of the queue and returns it.
  * Peek: Returns the front element present in the queue without dequeuing it.
  * IsEmpty: Checks if the queue is empty.
  * IsFull: Checks if the queue is full.
  * Size: Returns the total number of elements present in the queue.

> 

Queue Implementation using an array:

```ts
// A class to store a queue
class Queue {
    private arr: number[];     // array to store queue elements
    private capacity: number;  // maximum capacity of the queue
    private front: number;     // front points to the front element in the queue (if any)
    private rear: number;      // rear points to the last element in the queue
    private count: number;     // current size of the queue

    // Constructor to initialize a queue
    constructor(size = 1000) {
        this.arr = new Array(size);
        this.capacity = size;
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    // Utility function to dequeue the front element
    dequeue(): number {
        // check for queue underflow
        if (this.isEmpty()) {
            throw new Error('Underflow\nProgram Terminated');
        }

        const x = this.arr[this.front];
        console.log(`Removing ${x}`);

        this.front = (this.front + 1) % this.capacity;
        this.count--;

        return x;
    }

    // Utility function to add an item to the queue
    enqueue(item: number): void {
        // check for queue overflow
        if (this.isFull()) {
            throw new Error('Overflow\nProgram Terminated');
        }

        console.log(`Inserting ${item}`);

        this.rear = (this.rear + 1) % this.capacity;
        this.arr[this.rear] = item;
        this.count++;
    }

    // Utility function to return the front element of the queue
    peek(): number {
        if (this.isEmpty()) {
            throw new Error('Underflow\nProgram Terminated');
        }
        return this.arr[this.front];
    }

    // Utility function to return the size of the queue
    size(): number {
        return this.count;
    }

    // Utility function to check if the queue is empty or not
    isEmpty(): boolean {
        return (this.size() === 0);
    }

    // Utility function to check if the queue is full or not
    isFull(): boolean {
        return (this.size() === this.capacity);
    }
}

// create a queue of capacity 5
const q = new Queue(5);

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(`The front element is ${q.peek()}`);
q.dequeue();

q.enqueue(4);

console.log(`The queue size is ${q.size()}`);

q.dequeue();
q.dequeue();
q.dequeue();

if (q.isEmpty()) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 Inserting 4 The queue size is 3 Removing 2 Removing 3 Removing 4 The queue is empty

The time complexity of all the above queue operations is O(1).

Using the built-in array:

JavaScript arrays have `push` and `shift` operations with FIFO semantics like a [queue](https://cplusplus.com/reference/list/list/), and `unshift` and `pop` operations like a [list](https://cplusplus.com/reference/queue/queue/).

```ts
// Queue implementation in TypeScript using a plain array
const q: string[] = [];

q.push('A');        // Insert `A` into the queue
q.push('B');        // Insert `B` into the queue
q.push('C');        // Insert `C` into the queue
q.push('D');        // Insert `D` into the queue

// Returns the total number of elements present in the queue
console.log(`The queue size is ${q.length}`);

// Prints the front of the queue (`A`)
console.log(`The front element is ${q[0]}`);

// Prints the rear of the queue (`D`)
console.log(`The rear element is ${q[q.length - 1]}`);

q.shift();          // removing the front element (`A`)
q.shift();          // removing the next front element (`B`)

console.log(`The queue size is ${q.length}`);

// check if the queue is empty
if (q.length === 0) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
```

##

```ts
// Queue implementation in TypeScript using array front operations
const q: string[] = [];

q.unshift('A');     // Insert `A` into the queue
q.unshift('B');     // Insert `B` into the queue
q.unshift('C');     // Insert `C` into the queue
q.unshift('D');     // Insert `D` into the queue

// Returns the total number of elements present in the queue
console.log(`The queue size is ${q.length}`);

// Prints the front of the queue (`A`)
console.log(`The front element is ${q[q.length - 1]}`);

// Prints the rear of the queue (`D`)
console.log(`The rear element is ${q[0]}`);

q.pop();            // removing the front element (`A`)
q.pop();            // removing the next front element (`B`)

console.log(`The queue size is ${q.length}`);

// check if the queue is empty
if (q.length === 0) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
```

**Output:** The queue size is 4 The front element is A The rear element is D The queue size is 2 The queue is not empty

**Also See:**

> [Queue Implementation in Java](https://techiedelight.com/queue-implementation-in-java/)

> [Queue Implementation in Python](https://techiedelight.com/queue-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
