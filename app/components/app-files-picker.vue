<template>
    <div class="container">
        <div
            class="empty"
            v-if="files.length === 0"
            @click="openPicker()"
        >
            <span>Click here to select files</span>
        </div>
        <div v-if="files.length > 0">
            <div>
                <span v-for="file in files">
                    <label>
                        <input
                            type="checkbox"
                            name="file.name"
                            v-model="file.selected"
                            @change="onChange()" />
                        {{file.name}}
                    </label>
                </span>
                <span>
                    <a @click="openPicker()">Change</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            files: []
        };
    },

    methods: {
        openPicker() {
            const self = this;

            pickFile((files) => {
                self.files = files
                    .map((file) => {
                        return {
                            name: file.name,
                            path: file.path,
                            selected: true
                        };
                    });

                self.onChange();
            });
        },

        onChange() {
            const selected = [...this.files]
                .filter((file) => file.selected);

            this.$emit('change', selected);
        }
    }
};

function pickFile(onSelect) {
    const picker = document.createElement('input');

    picker.type = 'file';
    picker.multiple = true;

    picker.addEventListener('change', onChange);

    picker.click();

    function onChange() {
        onSelect([...picker.files]);
        picker.removeEventListener('change', onChange);
    }
}
</script>

<style lang="scss" scoped>
.container {
    box-shadow: 0px 0px 1px 0px #ddd;
    padding: 10px;

    .empty {
        text-align: center;
    }
}
</style>