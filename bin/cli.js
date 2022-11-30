#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');


// Utility functions
const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
    try {
        const { stdout, stderr } = await exec(command);
        console.log(stdout);
        console.log(stderr);
    } catch {
        (error) => {
            console.log(error);
        };
    }
}


async function hasYarn() {
    try {
        await exec('yarnpkg --version', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

// Validate arguments
if (process.argv.length < 3) {
    console.log('Please specify the target project directory.');
    console.log('For example:');
    console.log('    npx crying-js my-app');
    console.log('    OR');
    console.log('    npm init crying-js my-app');
    process.exit(1);
}


// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/arshadkhan515/crying-js.git';


// Check if directory already exists
try {
    fs.mkdirSync(appPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log('Directory already exists. Please choose another name for the project.');
    } else {
        console.log(error);
    }
    process.exit(1);
}

async function setup() {
    try {
        // Clone repo
        console.log(`Creating a new Crying.js app in ${folderName}.`);
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
        // console.log('Cloned successfully.');
        // console.log('');

        // Change directory
        process.chdir(appPath);

        // Install dependencies
        const useYarn = await hasYarn();
        console.log('Installing dependencies....')
        if (useYarn) {
            await runCmd('yarn install');
        } else {
            await runCmd('npm install');
        }
        console.log();


        console.log('Installation is now complete!');
        console.log();

        console.log('We suggest that you start by typing:');
        console.log(`    cd ${folderName}`);
        console.log(useYarn ? '    yarn dev' : '    npm run dev');
        console.log();
        console.log('Enjoy your production-ready crying.js app, which already supports a large number of ready-made features!');
    } catch (error) {
        console.log(error);
    }
}

setup();
// const runCommand = (command) => {
//     try {
//         exec(`${command}`, { stdio: 'inherit' });
//     }
//     catch (error) {
//         console.log(`Failed to run command: ${command}`, error);
//         return false;
//     }
//     return true;
// };



// const repoName = process.argv[2];
// const repoUrl = `git clone --depth=1 https://github.com/arshadkhan515/crying-js.git ${repoName}`;
// const install = `cd ${repoName} && npm install`;

// console.log(`Creating a new Crying.js app in ${repoName}.`);

// const checkedOut = runCommand(repoUrl);

// if (!checkedOut) {
//     process.exit(-1);
// }

// const spinner = console.log('Installing dependencies').start();

// const installed = runCommand(install);

// if (!installed) {
//     spinner.fail('Failed to install dependencies');
//     process.exit(-1);
// }

// spinner.succeed('Successfully installed dependencies');

// console.log('We suggest that you start by typing:');
// console.log(`    cd ${repoName}`);
// console.log(useYarn ? '    yarn dev' : '    npm run dev');
// console.log();
// console.log('Enjoy your production-ready Node.js app, which already supports a large number of ready-made features!');
