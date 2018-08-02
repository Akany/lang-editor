<template>
    <div>
        Electron + webpack + vue
        <div class="file-picker">
            <input id="file-picker" type="file"
                @change="filesPicked($event.target)" multiple />

            <div class="pick-area" @click="openPicker()"></div>
        </div>
        <div>
            <label>Add line</label>
            <input type="text" name="key" placeholder="Key" v-model="key" />
            <input type="text" name="value" placeholder="Value" v-model="value" />
            <button @click="addLine()">Add</button>
        </div>
        <div>
            <div>Files:</div>
            <div v-for="file in files">
                <label>{{file.name}}</label>
                <div>{{file.content}}</div>
            </div>
        </div>
    </div>
</template>

<script>
const fs = require('fs');

export default {
    data() {
        return {
            files: [],
            key: null,
            value: null
        }
    },

    methods: {
        filesPicked(input) {
            const self = this;

            const files$ = [...input.files]
                .map((file) => {
                    return readFile(file.path)
                        .then((content) => {
                            return {
                                name: file.name,
                                path: file.path,
                                content: JSON.parse(content)
                            };
                        });
                });

            Promise
                .all(files$)
                .then((files) => {
                    self.files = files;
                });
        },
        addLine() {
            const self = this;

            self.files = self
                .files
                .map((file) => {
                    return {
                        ...file,
                        content: {
                            ...file.content,
                            [self.key]: self.value
                        }
                    };
                });

            self
                .files
                .forEach((file) => {
                    return writeFile(
                            file.path,
                            JSON.stringify(file.content, null, 4)
                        );
                });
        },
        openPicker() {
            this.$el.querySelector('#file-picker').click();
        }
    }
};

function readFile(path) {
    return new Promise((resolve) => {
        fs.readFile(path, 'utf-8', (error, file) => {
            resolve(file);
        });
    })
}

function writeFile(path, content) {
    return new Promise((resolve) => {
        fs.writeFile(path, content, (error) => {
            resolve();
        });
    })
}
</script>

<style lang="scss">
    #file-picker {
        display: none;
    }
    
    .pick-area {
        height: 100px;
        background-color: lightgrey;
    }
</style>