#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// Variables
let command;
let playerName;

// Sleep function. Use sleep(ms)
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Welcome function
async function welcome() {
    const figletMsg = `QUIZ-AGENT`
    figlet(figletMsg, (err, data) => {
        console.log(gradient.fruit.multiline(data));
    });
    await sleep(100);

    const title = chalkAnimation.karaoke(
        'Made with Javascript'
    );

    await sleep(2000);
    title.stop();

    console.log(`
    
    ${chalk.bgGreen(" HOW TO USE? ")}
    Enter a command and see what happens
    There maybe some easter eggs.

    ${chalk.cyan('COMMANDS')}
    play - The quiz.
    about - About this app.
    help - This menu.
    clear - Clears the console.
    exit - Exits the app.

    `)
}

// Command functions
async function quiz() {
    console.log(`
    ${chalk.bgGreen(' RULES ')}
    1. Have fun.
    2. If you get any question wrong i will be ${chalk.redBright('killed')}.
    `)

    await sleep(1000);

    const player = await inquirer.prompt({
        name: 'playerName',
        type: 'input',
        message: `${chalk.green('Whats your name?')} `,
        default() {
            return "Player";
        }
    });

    playerName = player.playerName;

    // Functions
    async function gameOver(rightAnswer) {
        console.log(`
    ${chalk.bgRedBright(' GAME OVER💀 ')}
    Not quiet right it.
    The correct answer is ${chalk.blueBright(rightAnswer)}.
        `)

        await inputCommand();
    }

    async function win(name) {
        const msg = `Congrats, ${name}! \n Prize: undefined`
        figlet(msg, (err, data) => {
            console.log(gradient.fruit.multiline(data));
        });
        await sleep(1000);
        console.log(chalk.green('You got all correct!'))

        await inputCommand();
    }

    const spinner = new createSpinner('Checking answer...');
    async function spinnerStart() {
        spinner.start();
        await sleep(1000);
    }

    async function spinnerCorrect() {
        spinner.success({ text: `Good answer, ${playerName}.` });
    }

    async function spinnerWrong() {
        spinner.error({ text: `Wrong.` });
    }

    // Questions

    const q1 = await inquirer.prompt({
        name: 'q1',
        type: 'list',
        message: `${chalk.green('When was node.js released?')} `,
        choices: ["May 33, 2009", "May 27, 2009", "Oct 14, 2011"]
    });

    const q1input = q1.q1;
    await spinnerStart();

    if (!(q1input === 'May 27, 2009')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    const q2 = await inquirer.prompt({
        name: 'q2',
        type: 'list',
        message: `${chalk.green('What does npm stand for?')} `,
        choices: ["Need Package Manager", "Never Program Mad", "Node Package Manager"]
    });

    const q2input = q2.q2;
    await spinnerStart();

    if (!(q2input === 'Node Package Manager')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    const q3 = await inquirer.prompt({
        name: 'q3',
        type: 'list',
        message: `${chalk.green('Who made Javascript?')} `,
        choices: ["Mark Zuckerberg", "Linus Torvalds", "Brendan Eich"]
    });

    const q3input = q3.q3;
    await spinnerStart();

    if (q3input === 'Mark Zuckerberg') {
        await spinnerWrong();
        await gameOver("HIDDEN");
    } else if (q3input === 'Linus Torvalds') {
        await spinnerWrong();
        console.log(chalk.redBright('No, he is the creator of Linux'))
        await sleep(1000);
        await gameOver("HIDDEN")
    }
    await spinnerCorrect();

    const q4 = await inquirer.prompt({
        name: 'q4',
        type: 'list',
        message: `${chalk.green('Who created Linux?')} `,
        choices: ["Linus Torvalds", "Oracle", "Ubuntu"]
    });

    const q4input = q4.q4;
    await spinnerStart();

    if (!(q4input === 'Linus Torvalds')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    const q5 = await inquirer.prompt({
        name: 'q5',
        type: 'list',
        message: `${chalk.green('What does a Full Stack developer do?')} `,
        choices: ["Backend", "Frontend", "Both"]
    });

    const q5input = q5.q5;
    await spinnerStart();

    if (!(q5input === 'Both')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    const q6 = await inquirer.prompt({
        name: 'q6',
        type: 'list',
        message: `${chalk.green('What does VS Code stand for?')} `,
        choices: ["Virtual Studio Code", "Visual Studio Code", "Various Studio's Code"]
    });

    const q6input = q6.q6;
    await spinnerStart();

    if (!(q6input === 'Visual Studio Code')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    const q7 = await inquirer.prompt({
        name: 'q7',
        type: 'list',
        message: `${chalk.green('What does LAMP stand for?')} `,
        choices: ["Linux, Apache, MySQL, PHP/Perl/Python", "Linux, Apple, Mobile, Pro", "I dont know"]
    });

    const q7input = q7.q7;
    await spinnerStart();

    if (q7input === 'Linux, Apple, Mobile, Pro') {
        await spinnerWrong();
        await gameOver("HIDDEN");
    } else if (q7input === 'I dont know') {
        await spinnerWrong();
        console.log(chalk.redBright('I dont know is NOT correct'))
        await gameOver('NOT "I dont Know"')
    }
    await spinnerCorrect();

    const q8 = await inquirer.prompt({
        name: 'q8',
        type: 'list',
        message: `${chalk.green('What programing language is this made app made with?')} `,
        choices: ["Javascript", "Java", "Python"]
    });

    const q8input = q8.q8;
    await spinnerStart();

    if (!(q8input === 'Javascript')) {
        await spinnerWrong();
        await gameOver("HIDDEN");
    }
    await spinnerCorrect();

    await win(playerName);
}

async function about() {
    console.log(`
    
    ${chalk.bgGreen(' ABOUT ')}
    I am a simple command line app deployed with npm.
    Made with the sole purpuse of being a "fun first npm package".
    Made with Javascript by @hectorwithc.

    ${chalk.blueBright('Type "help" for a list of all commands')}

`)

    await inputCommand()
}

async function help() {

    console.log(`
    
    ${chalk.bgGreen(" HOW TO USE? ")}
    Enter a command and see what happens
    There maybe some easter eggs.

    ${chalk.cyan('COMMANDS')}
    play - The quiz.
    about - About this app.
    help - This menu.
    clear - Clears the console.
    exit - Exits the app.

    `)

    await inputCommand()
}

// Handle the commands
async function inputCommand() {
    const answers = await inquirer.prompt({
        name: 'command',
        type: 'input',
        message: `${gradient.fruit('command ')}${chalk.greenBright('$')} `
    });

    command = answers.command;
    // Check command
    if (command === 'play') {
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