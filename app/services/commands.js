import {readFile, writeFile} from './file-system';

export function lineAdd(files, key, value) {
    const add$ = files
        .map((file) => {
            return readJson(file.path)
                .then((json) => {
                    json[key] = value;

                    return json;
                })
                .then((json) => writeJson(file.path, json));
        });

    return Promise.all(add$);
}

export function lineRemove(files, key) {
    const remove$ = files
        .map((file) => {
            return readJson(file.path)
                .then((content) => {
                    delete content[key];

                    return content;
                })
                .then((raw) => writeJson(file.path, raw));
        });

    return Promise.all(remove$);
}

function readJson(path) {
    return readFile(path)
        .then((raw) => JSON.parse(raw));
}

function writeJson(path, json) {
    return writeFile(
        path,
        JSON.stringify(json, null, 4)
    );
}