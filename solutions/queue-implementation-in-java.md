# Queue Implementation in Java

> Source: https://www.techiedelight.com/queue-implementation-in-java/

This article covers queue implementation in TypeScript. A queue is a linear data structure that follows the FIFO (First–In, First–Out) principle. That means the object inserted first will be the first one out, followed by the object inserted next.

The queue supports the following core operations:

  1. Enqueue: Inserts an item at the rear of the queue.
  2. Dequeue: Removes the object from the front of the queue and returns it, thereby decrementing queue size by one.
  3. Peek: Returns the object at the front of the queue without removing it.
  4. IsEmpty: Tests if the queue is empty or not.
  5. Size: Returns the total number of elements present in the queue.

> 

Queue Implementation using an array:

```ts
// A class to represent a queue
class Queue {
    private arr: number[];      // array to store queue elements
    private front: number;      // front points to the front element in the queue
    private rear: number;       // rear points to the last element in the queue
    private capacity: number;   // maximum capacity of the queue
    private count: number;      // current size of the queue

    // Constructor to initialize a queue
    constructor(size: number) {
        this.arr = new Array<number>(size);
        this.capacity = size;
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    // Utility function to dequeue the front element
    dequeue(): number {
        // check for queue underflow
        if (this.isEmpty()) {
            console.log("Underflow\nProgram Terminated");
            process.exit(-1);
        }

        const x = this.arr[this.front];

        console.log("Removing " + x);

        this.front = (this.front + 1) % this.capacity;
        this.count--;

        return x;
    }

    // Utility function to add an item to the queue
    enqueue(item: number): void {
        // check for queue overflow
        if (this.isFull()) {
            console.log("Overflow\nProgram Terminated");
            process.exit(-1);
        }

        console.log("Inserting " + item);

        this.rear = (this.rear + 1) % this.capacity;
        this.arr[this.rear] = item;
        this.count++;
    }

    // Utility function to return the front element of the queue
    peek(): number {
        if (this.isEmpty()) {
            console.log("Underflow\nProgram Terminated");
            process.exit(-1);
        }
        return this.arr[this.front];
    }

    // Utility function to return the size of the queue
    size(): number {
        return this.count;
    }

    // Utility function to check if the queue is empty or not
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // Utility function to check if the queue is full or not
    isFull(): boolean {
        return this.size() === this.capacity;
    }
}

// create a queue of capacity 5
const q = new Queue(5);

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log("The front element is " + q.peek());
q.dequeue();
console.log("The front element is " + q.peek());

console.log("The queue size is " + q.size());

q.dequeue();
q.dequeue();

if (q.isEmpty()) {
    console.log("The queue is empty");
}
else {
    console.log("The queue is not empty");
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 The front element is 2 The queue size is 2 Removing 2 Removing 3 The queue is empty

The time complexity of `enqueue()`, `dequeue()`, `peek()`, `isEmpty()` and `size()` functions is constant, i.e., O(1).

Using an Array:

The TypeScript standard library also provides array operations that specify queue operations. Following is an example of using an array with `push`/`shift` as a queue:

```ts
const queue: string[] = [];

queue.push("A");     // Insert `A` into the queue
queue.push("B");     // Insert `B` into the queue
queue.push("C");     // Insert `C` into the queue
queue.push("D");     // Insert `D` into the queue

// Prints the front of the queue (`A`)
console.log("The front element is " + queue[0]);

queue.shift();       // removing the front element (`A`)
queue.shift();       // removing the front element (`B`)

// Prints the front of the queue (`C`)
console.log("The front element is " + queue[0]);

// Returns the total number of elements present in the queue
console.log("The queue size is " + queue.length);

// check if the queue is empty
if (queue.length === 0) {
    console.log("The queue is empty");
}
else {
    console.log("The queue is not empty");
}
```

**Output:** The front element is A The front element is C The queue size is 2 The queue is not empty

**Also See:**

> [Circular Queue implementation in C](https://techiedelight.com/circular-queue-implementation-c/)

> [Queue Implementation in C++](https://techiedelight.com/queue-implementation-cpp/)

> [Queue Implementation in Python](https://techiedelight.com/queue-implementation-python/)

> [Queue Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/queue-implementation-using-linked-list/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 189

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
