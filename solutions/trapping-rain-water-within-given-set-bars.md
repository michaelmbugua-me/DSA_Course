# Trapping Rain Water Problem

> Source: https://www.techiedelight.com/trapping-rain-water-within-given-set-bars/

[Array](https://www.techiedelight.com/Category/Array/)

Trapping rainwater problem: Find the maximum amount of water that can be trapped within a given set of bars where each bar’s width is 1 unit.

For example,

Input: An array containing height of bars `{7, 0, 4, 2, 5, 0, 6, 4, 0, 5}`

The maximum amount of water that can be trapped is 25, as shown below (blue).

> 

The idea is to calculate the maximum height bar on the left and right of every bar. The amount of water stored on top of each bar is equal to the minimum among the leading’ bar to the left and right minus the current bar’s height. This approach is demonstrated below in TypeScript:

```ts
// Function to find the amount of water that can be trapped within
// a given set of bars in linear time and extra space
function trap(bars: number[]): number {
    const n = bars.length;
    if (n <= 2) {
        return 0;
    }

    let water = 0;

    // `left[i]` stores the maximum height of a bar to the left
    // of the current bar
    const left: number[] = new Array(n - 1);
    left[0] = Number.MIN_SAFE_INTEGER;

    // process bars from left to right
    for (let i = 1; i < n - 1; i++) {
        left[i] = Math.max(left[i - 1], bars[i - 1]);
    }

    // `right` stores the maximum height of a bar to the right
    // of the current bar
    let right = Number.MIN_SAFE_INTEGER;

    // process bars from right to left
    for (let i = n - 2; i >= 1; i--) {
        right = Math.max(right, bars[i + 1]);

        // check if it is possible to store water in the current bar
        if (Math.min(left[i], right) > bars[i]) {
            water += Math.min(left[i], right) - bars[i];
        }
    }

    return water;
}

const heights = [7, 0, 4, 2, 5, 0, 6, 4, 0, 5];
console.log('The maximum amount of water that can be trapped is', trap(heights));
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of given bars.

## Constant space solution

The O(1) space solution can be implemented as follows in TypeScript:

```ts
// Function to find the amount of water that can be trapped within
// a given set of bars in linear time and constant space
function trap(heights: number[]): number {
    // maintain two pointers left and right, pointing to the leftmost and
    // rightmost index of the input list
    let left = 0, right = heights.length - 1;
    let water = 0;

    let maxLeft = heights[left];
    let maxRight = heights[right];

    while (left < right) {
        if (heights[left] <= heights[right]) {
            left = left + 1;
            maxLeft = Math.max(maxLeft, heights[left]);
            water += maxLeft - heights[left];
        } else {
            right = right - 1;
            maxRight = Math.max(maxRight, heights[right]);
            water += maxRight - heights[right];
        }
    }

    return water;
}

const heights = [7, 0, 4, 2, 5, 0, 6, 4, 0, 5];
console.log('The maximum amount of water that can be trapped is', trap(heights));
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.
