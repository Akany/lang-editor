import fs from 'fs';

export function readFile(path) {
    return new Promise((resolve) => {
        fs.readFile(path, 'utf-8', (error, file) => {
            resolve(file);
        });
    })
}

export function writeFile(path, content) {
    return new Promise((resolve) => {
        fs.writeFile(path, content, (error) => {
            resolve();
        });
    })
}