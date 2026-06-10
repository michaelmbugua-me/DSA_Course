# Implement a queue using the stack data structure

> Source: https://www.techiedelight.com/implement-a-queue-using-stack-data-structure/

This post will implement a [queue](https://techiedelight.com/circular-queue-implementation-c/) using the [stack data structure](https://techiedelight.com/stack-implementation/) in TypeScript. In other words, design a queue that supports enqueue and dequeue operations using standard push and pop operations of the stack.

We know that queue is a _First–In, First–Out_ (FIFO) data structure in which elements are removed in the same order in which they were added to the queue. In an enqueue operation, items are added to the rear of the queue, while in dequeue operation, items are removed from the front of the queue.

There are several ways to implement a queue using one or two stacks by tweaking their push and pop operations.

## 1\. Using two stacks

The idea is to implement the queue’s enqueue operation so that the first entered element always ends up at the top of the stack. To achieve this, we need an additional stack.

  1. To enqueue an item into the queue, first move all elements from the first stack to the second stack, push the item into the first stack, and finally move all elements back to the first stack. This ensures that the new item lies at the bottom of the stack and hence would be the last one to be removed.
  2. To dequeue an item from the queue, return the top item from the first stack.

Following is the TypeScript implementation of the idea:

```ts
// Implement a queue using two stacks
class Queue {

    // Constructor
    s1: number[];
    s2: number[];

    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    // Add an item to the queue
    enqueue(data: number): void {

        // Move all elements from the first stack to the second stack
        while (this.s1.length) {
            this.s2.push(this.s1.pop()!);
        }

        // push item into the first stack
        this.s1.push(data);

        // Move all elements back to the first stack from the second stack
        while (this.s2.length) {
            this.s1.push(this.s2.pop()!);
        }
    }

    // Remove an item from the queue
    dequeue(): number {

        // if the first stack is empty
        if (this.s1.length === 0) {
            console.log('Underflow!!');
            process.exit(0);
        }

        // return the top item from the first stack
        return this.s1.pop()!;
    }
}

const keys = [1, 2, 3, 4, 5];
const q = new Queue();

// insert above keys
for (const key of keys) {
    q.enqueue(key);
}

console.log(q.dequeue());        // 1
console.log(q.dequeue());        // 2
```

Note that the elements are exchanged between the stacks twice for every enqueue operation. This can impact performance if enqueue operations are frequent. Here’s an alternative approach that affects the dequeue operation’s time complexity instead of the enqueue operation.

  1. To enqueue an item into the queue, push the item into the first stack.
  2. To dequeue an item from the queue, move elements from the first stack to the second stack if it is empty, and return the top item from the second stack.

Following is the TypeScript implementation of the idea:

```ts
// Implement a queue using two stacks
class Queue {

    // Constructor
    s1: number[];
    s2: number[];

    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    // Add an item to the queue
    enqueue(data: number): void {
        // push item into the first stack
        this.s1.push(data);
    }

    // Remove an item from the queue
    dequeue(): number {
        // if both stacks are empty
        if (this.s1.length === 0 && this.s2.length === 0) {
            console.log('Underflow!!');
            process.exit(0);
        }

        // if the second stack is empty, move elements from the first stack to it
        if (this.s2.length === 0) {
            while (this.s1.length) {
                this.s2.push(this.s1.pop()!);
            }
        }

        // return the top item from the second stack
        return this.s2.pop()!;
    }
}

const keys = [1, 2, 3, 4, 5];
const q = new Queue();

// insert above keys
for (const key of keys) {
    q.enqueue(key);
}

console.log(q.dequeue());        // 1
console.log(q.dequeue());        // 2
```

## 2\. Using one stack with call stack

We can also use an implicit stack ([call stack](https://en.wikipedia.org/wiki/Call_stack)) and an actual stack for constructing a queue. The dequeue operation pops all elements from the stack and stores them in the call stack. When the stack is left with a single item, remove and return that item. Finally, push all elements back into the stack from the call stack as the recursion unfolds.

```ts
// Implement a queue using a single stack
class Queue {
    s: number[] = [];

    // Add an item to the queue
    enqueue(data: number): void {
        // push item into the first stack
        this.s.push(data);
    }

    // Remove an item from the queue
    dequeue(): number {
        // if the stack is empty
        if (this.s.length === 0) {
            console.log('Underflow!!');
            process.exit(0);
        }

        // pop an item from the stack
        const top = this.s.pop()!;

        // if the stack becomes empty, return the popped item
        if (this.s.length === 0) {
            return top;
        }

        // recur
        const item = this.dequeue();

        // push popped item back into the stack
        this.s.push(top);

        // return the result of dequeue() call
        return item;
    }
}

const keys = [1, 2, 3, 4, 5];
const q = new Queue();

// insert the above keys into the queue
for (const key of keys) {
    q.enqueue(key);
}

console.log(q.dequeue());    // print 1
console.log(q.dequeue());    // print 2
```
