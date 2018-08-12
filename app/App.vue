<template>
    <div class="app">
        <section>
            <h1 class="title">Language Editor</h1>
        </section>
        <AppFilesPicker
            class="files-picker"
            @change="onFilesChange($event)" />
        <section class="container">
            <AppAddLine @submit="onAddLine($event)" />
        </section>
    </div>
</template>

<script>
import {readFile, writeFile} from './services/file-system';
import AppFilesPicker from './components/app-files-picker.vue';
import AppAddLine from './components/app-add-line.vue';

export default {
    data() {
        return {
            files: [],
            key: null,
            value: null
        }
    },

    components: {
        AppFilesPicker,
        AppAddLine
    },

    methods: {
        onFilesChange(files) {
            this.files = files;
        },
        onAddLine({key, value}) {
            this.files
                .forEach((file) => {
                    readFile(file.path)
                        .then((raw) => {
                            return JSON.parse(raw);
                        })
                        .then((content) => {
                            content[key] = value;

                            return JSON.stringify(content, null, 4);
                        })
                        .then((raw) => {
                            writeFile(file.path, raw);
                        });

                })
        }
    }
};
</script>

<style lang="scss" scoped>
    .app {
        padding: 25px;
    }

    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .files-picker {
        margin-bottom: 15px;
    }
</style>