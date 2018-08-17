<template>
    <div class="app">
        <section>
            <h1 class="title">Language Editor</h1>
        </section>
        <AppFilesPicker
            class="files-picker"
            @change="onFilesChange($event)" />
        <section class="container">
            <AppNavigation
                class="app-navigation"
                @change="onTabChange($event)"/>

            <AppLineAdd
                v-show="activeTab === 'add'"
                @submit="onAddLine($event)" />

            <AppLineRemove
                v-show="activeTab === 'remove'"
                @submit="onLineRemove($event)" />
        </section>
    </div>
</template>

<script>
import {lineAdd, lineRemove} from './services/commands';
import {notify} from './services/notification';

import AppFilesPicker from './components/app-files-picker.vue';
import AppLineAdd from './components/app-line-add.vue';
import AppNavigation from './components/app-navigation.vue';
import AppLineRemove from './components/app-line-remove.vue';

export default {
    data() {
        return {
            files: [],
            activeTab: 'add'
        }
    },

    components: {
        AppFilesPicker,
        AppLineAdd,
        AppNavigation,
        AppLineRemove
    },

    methods: {
        onFilesChange(files) {
            this.files = files;
        },
        onAddLine({key, value, waitUntil}) {
            const command$ = lineAdd(this.files, key, value);

            command$
                .then(() => notify('Command add completed.'));

            waitUntil(command$);
        },
        onLineRemove({key, waitUntil}) {
            const command$ = lineRemove(this.files, key);

            command$
                .then(() => notify('Command remove completed.'));

            waitUntil(command$);
        },
        onTabChange(tab) {
            this.activeTab = tab;
        }
    }
};
</script>

<style lang="scss" scoped>
    .app {
        padding: 25px;

        .container {
            padding: 10px;
            box-shadow: 0px 0px 2px 0px #ddd;
        }
    }

    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .files-picker {
        margin-bottom: 15px;
    }

    .app-navigation {
        margin-bottom: 15px;
    }
</style>