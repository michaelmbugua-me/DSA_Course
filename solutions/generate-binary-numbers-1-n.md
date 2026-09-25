# Generate binary numbers between 1 to `n` using a queue

> Source: https://www.techiedelight.com/generate-binary-numbers-1-n/

Given a positive number `n`, efficiently generate binary numbers between 1 and `n` using the [queue data structure](https://techiedelight.com/circular-queue-implementation-c/) in linear time.

For example, for `n = 16`, the binary numbers are:

1 10 11 100 101 110 111 1000 1001 1010 1011 1100 1101 1110 1111 10000

> 

Following is the TypeScript implementation:

```ts
// Function to generate binary numbers between 1 and `n` using the
// queue data structure
function generate(n: number): void {

    // create an empty queue and enqueue 1
    const q: string[] = [];
    q.push('1');

    // run `n` times
    for (let i = 0; i < n; i++) {
        // remove the front element
        const front = q.shift()!;

        // append 0 and 1 to the front element of the queue and
        // enqueue both strings
        q.push(front + '0');
        q.push(front + '1');

        // print the front element
        console.log(front);
    }
}

const n = 16;
generate(n);
```

**Output:** 1 10 11 100 101 110 111 1000 1001 1010 1011 1100 1101 1110 1111 10000

The time complexity of the above solution is O(n) and requires O(n) extra space.

We can also use [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) in TypeScript, as shown below:

```ts
// Function to generate binary numbers between 1 and `n` using `toString(2)`
function generate(n: number): void {
    // run `n` times
    for (let i = 1; i <= n; i++) {
        // convert `i` to an 8–bit binary number
        const binary = i.toString(2).padStart(8, '0');

        // print the current binary number
        console.log(binary);
    }
}

const n = 16;
generate(n);
```

**Output:** 00000001 00000010 00000011 00000100 00000101 00000110 00000111 00001000 00001001 00001010 00001011 00001100 00001101 00001110 00001111 00010000

The time complexity of the above solution is O(n), and the auxiliary space used by the program is O(1).
