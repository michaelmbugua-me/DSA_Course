# Find the largest number possible from a given set of numbers

> Source: https://www.techiedelight.com/find-largest-number-possible-set-given-numbers/

Find the largest number possible from a set of given numbers where the numbers append to each other in any order to form the largest number.

For example,

**Input:** { 10, 68, 75, 7, 21, 12 } **Output:** 77568211210

> 

Simply sorting the array in descending order and considering the sorted order is not possible here as the sorted array `{75, 68, 21, 12, 10, 7}` will result in the number `75682112107`, which is less than the largest number possible `77568211210`.

The idea is to write our [custom comparator function for the sorting](https://techiedelight.com/sort-array-ascending-order-cpp/) routine. For two numbers, `X` and `Y`, the custom comparator function will not compare `X` and `Y` with each other, but it compares `XY` with `YX`, and the greater number will come first in sorted order. Here, `XY` denotes a number formed by appending `Y` to `X`, and `YX` denotes a number formed by appending `X` to `Y`. For example, for `X = 15` and `Y = 4`, `XY = 154` and `YX = 415`.

As evident from the above example, `X > Y` but `XY < YX`, so the comparator function will consider `Y > X`. This is demonstrated below in TypeScript:

```ts
function findLargestNumber(numbers: number[]): string {

    // sort using a custom comparator
    const customCompare = (a: number, b: number): number => {
        const value1 = String(a) + String(b);
        const value2 = String(b) + String(a);

        if (value1 < value2) {
            return 1;
        }
        else if (value1 > value2) {
            return -1;
        }
        else {
            return 0;
        }
    };

    numbers.sort(customCompare);

    // join and return
    return numbers.join('');
}

const numbers = [10, 68, 97, 9, 21, 12];

const largestNumber = findLargestNumber(numbers);
console.log('The largest number is', largestNumber);
```

**Output:** The largest number is 99768211210

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space, where `n` is the size of the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 196

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
