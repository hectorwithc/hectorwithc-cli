#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// Variables
let command;

// Sleep function. Use sleep(ms)
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Welcome function
async function welcome() {
    const figletMsg = `hectorwithc`
    figlet(figletMsg, (err, data) => {
        console.log(gradient.fruit.multiline(data));
    });
    await sleep(100);

    const title = chalkAnimation.karaoke(
        'Made with Javascript...'
    );

    await sleep(2150);
    title.stop();

    console.log(`
    
    ${chalk.bgGreen("HOW TO USE?")}
    Enter a command and see what happens...

    ${chalk.cyan('COMMANDS')}
    quiz - The quiz.
    about - About this app.
    help - This menu.
    clear - Clears the console.
    exit - Exits the app.

    `)
}

// Handle the commands
async function inputCommand() {
    const answers = await inquirer.prompt({
        name: 'command',
        type: 'input',
        message: 'command $'
    });

    command = answers.command;
    // Check command
    if (command === 'quiz') {
        await quiz();
    } else if (command === 'about') {
        await about();
    } else if (command === 'help') {
        await help();
    } else if (command === 'clear') {
        console.clear();
        await inputCommand();
    } else if (command === 'exit') {
        console.log(chalk.red('Bye...'));
        process.exit(0);
    } else {
        console.log(chalk.red('Command does not exist...'))
        await inputCommand();
    }
}

//Clear console before timeline.
console.clear();
// Timeline
await welcome();
await inputCommand()
// Sleep before exit
await sleep();