# Min Heap and Max Heap Implementation in C++

> Source: https://www.techiedelight.com/min-heap-max-heap-implementation-c/

Implement a heap data structure in TypeScript.

**Prerequisite:**

> [Introduction to Priority Queues using Binary Heaps](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/)

We have introduced the heap data structure in the above post and discussed `heapify-up`, `push`, `heapify-down`, and `pop` operations. In this post, the implementation of the max-heap and min-heap data structure is provided. Their implementation is somewhat similar to a [priority queue](https://cplusplus.com/reference/queue/priority_queue/).

Max Heap implementation in TypeScript:

```ts
// Data structure to store a max-heap node
class PriorityQueue {
    // array to store heap elements
    private A: number[] = [];

    // return parent of `A[i]`
    // don't call this function if `i` is already a root node
    private PARENT(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    // return left child of `A[i]`
    private LEFT(i: number): number {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    private RIGHT(i: number): number {
        return (2*i + 2);
    }

    // Recursive heapify-down algorithm.
    // The node at index `i` and its two direct children
    // violates the heap property
    private heapify_down(i: number): void {
        // get left and right child of node at index `i`
        const left = this.LEFT(i);
        const right = this.RIGHT(i);

        let largest = i;

        // compare `A[i]` with its left and right child
        // and find the largest value
        if (left < this.size() && this.A[left] > this.A[i]) {
            largest = left;
        }

        if (right < this.size() && this.A[right] > this.A[largest]) {
            largest = right;
        }

        // swap with a child having greater value and
        // call heapify-down on the child
        if (largest !== i) {
            [this.A[i], this.A[largest]] = [this.A[largest], this.A[i]];
            this.heapify_down(largest);
        }
    }

    // Recursive heapify-up algorithm
    private heapify_up(i: number): void {
        // check if the node at index `i` and its parent violate the heap property
        if (i > 0 && this.A[this.PARENT(i)] < this.A[i]) {
            // swap the two if heap property is violated
            [this.A[i], this.A[this.PARENT(i)]] = [this.A[this.PARENT(i)], this.A[i]];

            // call heapify-up on the parent
            this.heapify_up(this.PARENT(i));
        }
    }

    // return size of the heap
    public size(): number {
        return this.A.length;
    }

    // Function to check if the heap is empty or not
    public empty(): boolean {
        return this.size() === 0;
    }

    // insert key into the heap
    public push(key: number): void {
        // insert a new element at the end of the array
        this.A.push(key);

        // get element index and call heapify-up procedure
        const index = this.size() - 1;
        this.heapify_up(index);
    }

    // Function to remove an element with the highest priority (present at the root)
    public pop(): void {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0)
            {
                throw new RangeError("Vector<X>::at() : " +
                        "index is out of range(Heap underflow)");
            }

            // replace the root of the heap with the last element
            // of the array
            this.A[0] = this.A[this.A.length - 1];
            this.A.pop();

            // call heapify-down on the root node
            this.heapify_down(0);
        }
        // catch and print the exception
        catch (oor) {
            console.log("\n" + (oor as RangeError).message);
        }
    }

    // Function to return an element with the highest priority (present at the root)
    public top(): number | undefined {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0)
            {
                throw new RangeError("Vector<X>::at() : " +
                        "index is out of range(Heap underflow)");
            }

            // otherwise, return the top (first) element
            return this.A[0];
        }
        // catch and print the exception
        catch (oor) {
            console.log("\n" + (oor as RangeError).message);
        }
    }
}

(function main() {
    const pq = new PriorityQueue();

    // Note: The element's value decides priority

    pq.push(3);
    pq.push(2);
    pq.push(15);

    console.log("Size is " + pq.size());

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    pq.push(5);
    pq.push(4);
    pq.push(45);

    console.log("\nSize is " + pq.size());

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    console.log("\n" + pq.empty());

    pq.top();    // top operation on an empty heap
    pq.pop();    // pop operation on an empty heap
})();
```

**Output:** Size is 3 15 3 Size is 4 45 5 4 2 true Vector::at() : index is out of range(Heap underflow) Vector::at() : index is out of range(Heap underflow)

Min Heap implementation in TypeScript:

Following is the implementation min-heap data structure in TypeScript, which is very similar to the max-heap implementation discussed above. The highlighted portion marks its differences with the max-heap implementation.

```ts
// Data structure to store a min-heap node
class PriorityQueue {
    // array to store heap elements
    private A: number[] = [];

    // return parent of `A[i]`
    // don't call this function if `i` is already a root node
    private PARENT(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    // return left child of `A[i]`
    private LEFT(i: number): number {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    private RIGHT(i: number): number {
        return (2*i + 2);
    }

    // Recursive heapify-down algorithm.
    // The node at index `i` and its two direct children
    // violates the heap property
    private heapify_down(i: number): void {
        // get left and right child of node at index `i`
        const left = this.LEFT(i);
        const right = this.RIGHT(i);

        let smallest = i;

        // compare `A[i]` with its left and right child
        // and find the smallest value
        if (left < this.size() && this.A[left] < this.A[i]) {
            smallest = left;
        }

        if (right < this.size() && this.A[right] < this.A[smallest]) {
            smallest = right;
        }

        // swap with a child having lesser value and
        // call heapify-down on the child
        if (smallest !== i) {
            [this.A[i], this.A[smallest]] = [this.A[smallest], this.A[i]];
            this.heapify_down(smallest);
        }
    }

    // Recursive heapify-up algorithm
    private heapify_up(i: number): void {
        // check if the node at index `i` and its parent violate the heap property
        if (i > 0 && this.A[this.PARENT(i)] > this.A[i]) {
            // swap the two if heap property is violated
            [this.A[i], this.A[this.PARENT(i)]] = [this.A[this.PARENT(i)], this.A[i]];

            // call heapify-up on the parent
            this.heapify_up(this.PARENT(i));
        }
    }

    // return size of the heap
    public size(): number {
        return this.A.length;
    }

    // Function to check if the heap is empty or not
    public empty(): boolean {
        return this.size() === 0;
    }

    // insert key into the heap
    public push(key: number): void {
        // insert a new element at the end of the array
        this.A.push(key);

        // get element index and call heapify-up procedure
        const index = this.size() - 1;
        this.heapify_up(index);
    }

    // Function to remove an element with the lowest priority (present at the root)
    public pop(): void {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0)
            {
                throw new RangeError("Vector<X>::at() : " +
                        "index is out of range(Heap underflow)");
            }

            // replace the root of the heap with the last element
            // of the array
            this.A[0] = this.A[this.A.length - 1];
            this.A.pop();

            // call heapify-down on the root node
            this.heapify_down(0);
        }
        // catch and print the exception
        catch (oor) {
            console.log("\n" + (oor as RangeError).message);
        }
    }

    // Function to return an element with the lowest priority (present at the root)
    public top(): number | undefined {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0)
            {
                throw new RangeError("Vector<X>::at() : " +
                        "index is out of range(Heap underflow)");
            }

            // otherwise, return the top (first) element
            return this.A[0];
        }
        // catch and print the exception
        catch (oor) {
            console.log("\n" + (oor as RangeError).message);
        }
    }
}

(function main() {
    const pq = new PriorityQueue();

    // Note: The element's value decides priority

    pq.push(3);
    pq.push(2);
    pq.push(15);

    console.log("Size is " + pq.size());

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    pq.push(5);
    pq.push(4);
    pq.push(45);

    console.log("\nSize is " + pq.size());

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    process.stdout.write(`${pq.top()} `);
    pq.pop();

    console.log("\n" + pq.empty());

    pq.top();    // top operation on an empty heap
    pq.pop();    // pop operation on an empty heap
})();
```

**Output:** Size is 3 2 3 Size is 4 4 5 15 45 true Vector::at() : index is out of range(Heap underflow) Vector::at() : index is out of range(Heap underflow)

Following is the time complexity of implemented heap operations:

  1. `push()` and `pop()` takes O(log(n)) time.
  2. `peek()` and `size()` and `isEmpty()` takes O(1) time.

**Exercise:** Convert above code to use a fixed-size array instead of a dynamic array (check simple solution [here](https://techiedelight.com/compiler/?run=2UNCN3)).

**Also See:**

> [Min Heap and Max Heap Implementation in Java](https://techiedelight.com/min-heap-max-heap-implementation-in-java/)

**References:** <https://en.wikipedia.org/wiki/Heap_(data_structure)>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 81

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
