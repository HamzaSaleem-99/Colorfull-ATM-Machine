#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 10000;
let myPin = 12421;
console.log(chalk.blue("\n\tWelcome to - ATM_Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is correct , Login Successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Ammount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["Fast cash", "Enter Ammount"],
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Ammount",
                    choices: ["1000", "2000", "5000", "10000", "20000"],
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`\n${fastCashAns.fastCash} withdraw successfully`);
                console.log(`\n\tYour Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Ammount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the ammount to Withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`\n${amountAns.amount} Withdraw Successfully`);
                console.log(`\n\tYour Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`\n\tYour Account Balance is ${myBalance}`);
    }
}
else {
    console.log(chalk.red("\nPin is Incorrect, Try Again!"));
}
