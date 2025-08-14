/** 
 * Program 1 to Prints a right-aligned triangle pattern of stars.
 *     *
 *    **
 *   ***
 *  ****
 * *****
 */
const printStar1 = (n) => {
    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= n; j++) {
            if (n - j < i) {
                row = row + "*";
            } else {
                row = row + " ";
            }
        }
        console.log(row);
    }
};
 // printStar1(5);


/** 
 * Program 2 to Prints a left-aligned triangle pattern of stars.
 * *****
 * ****
 * ***
 * **
 * *
 */
const printStar2 = (n) => {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < n-i; j++) {
          row = row + "*";
        }
        console.log(row);
    }
};
// printStar2(5);


/** 
 * Program 3 to Prints a left-aligned triangle pattern of 0 and 1.
 * 1
 * 10
 * 101
 * 1010
 * 10101
 * 101010
 */

const printStar3 = (n) => {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
          row = row + (j % 2 === 0 ? 1 : 0);
        }
        console.log(row);
    }
};
// printStar3(5);



/** 
 * Program 4 to Prints a left-aligned triangle pattern of 1 and 0 alternate.
 * 1
 * 01
 * 010
 * 1010
 * 10101
 * 010101
 */

const printStar4 = (n) => {
        let flag = 1;
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
          row = row + flag;
          if(flag === 1){
            flag = 0;
          } else {
            flag = 1;
          }
        }
        console.log(row);
    }
};
printStar4(5);