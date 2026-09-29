
// Program 1: Count the number of digits in a number
const countDigit = (num) => {
    // edge case
    if (num == 0) return 1;

    let count = 0;

    // to handle negative numbers
    let n = Math.abs(num);
    while(n > 0) {
        n = Math.floor(n / 10);
        count++;
    }
    return count;
};


// const result = countDigit(-2345);
// console.log("result",  result);


// Program 2: Palindrome number
const isPalindrome = (num) => {
    if (num < 0) return false;
    let originalNum = num;
    let reversedNum = 0;

    while(originalNum > 0) {
        let rem = originalNum % 10;
        reversedNum = reversedNum * 10 + rem;
        originalNum = Math.floor(originalNum / 10);
    }
    return num === reversedNum;
};

// const result = isPalindrome(12321);
// console.log("result",  result);