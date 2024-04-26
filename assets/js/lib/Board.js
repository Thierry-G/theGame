/**
 * Represents the game engine.
 */
export default class Board {
    /**
     * Creates an instance of the Engine class.
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     */
    constructor(rows, columns) {
        this.matrix = Array(rows).fill().map(() => Array(columns).fill(0));
        do {
            this.randomizeMatrix();
            console.log(this.countPairs() + ' pairs found in the matrix');

        }   
        while (this.countPairs() === 0)
    }

    /**
     * Generates a random number between -22 and 22.
     * @returns {number} The generated random number.
     */
    generateRandomNumber() {
        return Math.floor(Math.random() * 45) - 22;
    }

    /**
     * Randomizes the matrix with random values.
     */
    randomizeMatrix() {
        this.matrix = this.matrix.map(row => row.map(() => this.generateRandomNumber()));
    }

    /**
     * Sets all values in a specific row to a given value.
     * @param {number} row - The row index.
     * @param {number} value - The value to set.
     */
    setRow(row, value) {
        this.matrix[row] = Array(this.matrix[0].length).fill(value);
    }

    /**
     * Sets all values in a specific column to a given value.
     * @param {number} column - The column index.
     * @param {number} value - The value to set.
     */
    setColumn(column, value) {
        this.matrix.forEach(row => row[column] = value);
    }

    /**
     * Adds a new row to the matrix with random values.
     */
    addRow() {
        this.matrix.push(Array(this.matrix[0].length).fill().map(() => this.generateRandomNumber()));
    }

    /**
     * Removes a row from the matrix.
     * @param {number} row - The row index to remove.
     */
    removeRow(row) {
        this.matrix.splice(row, 1);
    }

    /**
     * Counts the number of adjacent pairs in the matrix.
     * @returns {number} The number of adjacent pairs.
     */
    countPairs() {
        let pairs = 0;
        this.matrix.forEach(row => {
            let rowPairs = row.reduce((acc, val, i, arr) => {
                if (i < arr.length - 1 && val === arr[i + 1]) acc++;
                return acc;
            }, 0);
            pairs += rowPairs;
        });
       // console.log(pairs  + ' pairs found in the matrix');
        return pairs;
    }

    /**
     * Counts the number of adjacent pairs in a specific row.
     * @param {number} row - The row index.
     * @returns {number} The number of adjacent pairs in the row.
     */
    countPairsInRow(row) {
        console.log(row);
        return 2
        let pairs = this.matrix[row].reduce((acc, val, i, arr) => {
            if (i < arr.length - 1 && val === arr[i + 1]) acc++;
            return acc;
        }, 0);
        return pairs;
    }

    /**
     * Ensures that the matrix has a minimum number of adjacent pairs.
     * @param {number} x - The minimum number of adjacent pairs.
     */
    ensurePairs(x) {
        while (this.countPairs() < x) {
            this.randomizeMatrix();
        }
    }

    /**
     * Checks if the matrix contains any zeros.
     * @returns {boolean} True if the matrix contains zeros, false otherwise.
     */
    checkZeros() {
        for (let row of this.matrix) {
            if (row.includes(0)) return true;
        }
        for (let i = 0; i < this.matrix[0].length; i++) {
            if (this.matrix.map(row => row[i]).includes(0)) return true;
        }
        return false;
    }
}