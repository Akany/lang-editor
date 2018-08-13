<template>
    <div>
        <div class="content">
            <input
                class="input"
                type="text"
                name="remove"
                placeholder="key"
                ref="key"
                v-focus-select />
        </div>
        <div class="action">
            <button
                class="button is-primary"
                :class="{'is-loading': processing}"
                @click="onApply($refs.key.value)"
                >
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
            processing: false
        }
    },

    directives: {
        FocusSelect
    },

    methods: {
        onApply(key) {
            this.processing = true;

            this.$emit('submit', {
                key,
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

<style lang="scss">
.content {
    margin-bottom: 15px;
}

.action {
    display: flex;
    justify-content: center;
}
</style>