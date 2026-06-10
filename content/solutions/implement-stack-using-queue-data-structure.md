# Implement a stack using the queue data structure

> Source: https://www.techiedelight.com/implement-stack-using-queue-data-structure/

This post will implement a [stack](https://techiedelight.com/stack-implementation/) using the [queue data structure](https://techiedelight.com/circular-queue-implementation-c/). In other words, design a stack that supports push and pop operations using standard enqueue and dequeue operations of the queue.

A stack is a _Last–In, First–Out_ (LIFO) data structure in which elements are inserted and removed from one end of the stack known as the top of the stack. It has two major operations: The push operation, which adds an element into the stack, and the pop operation, which removes the most recently added element from the stack, but not yet removed.

There are several ways to implement a stack using one or two queues by tweaking their enqueue and dequeue operations.

## 1\. Using Two Queues

The idea is to implement the queue’s enqueue operation such that the last entered item always ends up at the queue’s front. To achieve this, we need an additional queue.

  1. To push an item into the stack, first move all elements from the first queue to the second queue, then enqueue the new item into the first queue, and finally move all elements back to the first queue. This ensures that the new item lies in front of the queue and hence would be the first one to be removed.
  2. To pop an item from the stack, return the front item from the first queue.

Following is the TypeScript implementation of the idea:

```ts
// Implement stack using two queues
class Stack {

    // Constructor
    q1: number[];
    q2: number[];

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    // Insert an item into the stack
    add(data: number): void {
        // Move all elements from the first queue to the second queue
        while (this.q1.length) {
            this.q2.push(this.q1.shift()!);
        }

        // Push the given item into the first queue
        this.q1.push(data);

        // Move all elements back to the first queue from the second queue
        while (this.q2.length) {
            this.q1.push(this.q2.shift()!);
        }
    }

    // Remove the top item from the stack
    pop(): number {
        // if the first queue is empty
        if (this.q1.length === 0) {
            console.log('Underflow!!');
            process.exit(0);
        }
        // return the front item from the first queue
        const front = this.q1.shift()!;
        return front;
    }
}

const keys = [1, 2, 3, 4, 5];

// insert the above keys into the stack
const s = new Stack();
for (const key of keys) {
    s.add(key);
}

while (s.q1.length) {
    console.log(s.pop());
}

console.log(s.pop());
```

**Output:** 5 4 3 2 1 Underflow!!

Note that the elements are exchanged between the queue twice for every push operation. This can impact performance if push operations are frequent. Here’s an alternative approach that affects the pop operation’s time complexity instead of the push operation.

  1. To push an item into the stack, enqueue the item to the first queue.
  2. To pop an item from the stack, move all elements from the first queue to the second queue except the last element, and then return the last element after moving all elements back to the first queue.

Following is the TypeScript implementation of the idea:

```ts
// Implement stack using two queues
class Stack {

    // Constructor
    q1: number[];
    q2: number[];

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    // Insert an item into the stack
    add(data: number): void {
        // Push the given item into the first queue
        this.q1.push(data);
    }

    // Remove the top item from the stack
    poll(): number {
        // if the first queue is empty
        if (this.q1.length === 0) {
            console.log('Stack Underflow!!');
            process.exit(0);
        }

        // Move all elements except last from the first queue to the second queue
        let front: number | null = null;
        while (this.q1.length) {
            if (this.q1.length === 1) {
                front = this.q1.shift()!;
            } else {
                this.q2.push(this.q1.shift()!);
            }
        }

        // Return the last element after moving all elements back to the first queue.
        while (this.q2.length) {
            this.q1.push(this.q2.shift()!);
        }

        return front!;
    }
}

const keys = [1, 2, 3, 4, 5];

// insert the above keys into the stack
const s = new Stack();

for (const key of keys) {
    s.add(key);
}

while (s.q1.length) {
    console.log(s.poll());
}
```

**Output:** 5 4 3 2 1 Stack Underflow!!

## 2\. Using one queue with call stack

We can also use an implicit stack (call stack) along with a queue to construct a stack, as shown below in TypeScript:

```ts
// Implement stack using a single queue and recursion
class Stack {
    q: number[] = [];

    // Insert an item into the stack
    push(x: number): void {
        this.q.push(x);
    }

    // Utility function to reverse contents of a queue
    reverseQueue(): void {
        // base case
        if (this.q.length === 0) {
            return;
        }

        // hold the front element in the call stack and enqueue
        // it again after the recursive call is over

        const front = this.q.shift()!;

        this.reverseQueue();

        this.q.push(front);
    }

    // Remove the top item from the stack
    pop(): number {
        // if the queue is empty
        if (this.q.length === 0) {
            console.log('Underflow!!');
            process.exit(0);
        }

        // reverse the queue
        this.reverseQueue();

        // dequeue front element from the reversed queue
        const front = this.q.shift()!;

        // revert the queue to the original state
        this.reverseQueue();

        return front;
    }
}

const keys = [1, 2, 3, 4, 5];

// insert the above keys into the stack
const s = new Stack();
for (const key of keys) {
    s.push(key);
}

for (let i = 0; i <= keys.length; i++) {
    console.log(s.pop());
}
```

**Output:** 5 4 3 2 1 Underflow!!
