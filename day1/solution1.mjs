import { readFileSync } from 'fs';


const input = readFileSync("./input1.txt", { encoding: 'utf8', flag: 'r' }).split('\r\n');


const getCalibration = line => {
    const arr = [...line]

    const firstNumber = arr.find(Number)
    const lastNumber = arr.findLast(Number)

    return parseInt(`${firstNumber}${lastNumber}`)
}

let result = 0

input.forEach(line =>{    
    const value = getCalibration(line)
    result = result + value
})


console.log(result,typeof result)