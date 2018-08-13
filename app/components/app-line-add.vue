<template>
    <div>
        <div class="inputs">
            <input
                class="input"
                type="text"
                name="key"
                ref="key"
                placeholder="key"
                v-focus-select />
            <input
                class="input"
                type="text"
                name="value"
                ref="value"
                placeholder="value"
                v-focus-select />
        </div>
        <div class="action">
            <button
                class="button is-primary"
                :class="{'is-loading': this.processing}"
                @click="onClick()">
                Apply
            </button>
        </div>
    </div>
</template>

<script>
import FocusSelect from '../directives/focus-select';

export default {
    data() {
        return {
            key: '',
            value: '',
            processing: false
        };
    },

    directives: {
        FocusSelect
    },

    methods: {
        onClick() {
            this.processing = true;

            this.$emit('submit', {
                key: this.$refs.key.value,
                value: this.$refs.value.value,
                waitUntil: (processor$) => {
                    processor$
                        .then(() => {
                            this.processing = false;
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.inputs {
    display: flex;
    margin-bottom: 15px;

    input {
        flex: 1;

        &:first-child {
            margin-right: 15px
        }
    }
}

.action {
    display: flex;
    justify-content: center;
}
</style>