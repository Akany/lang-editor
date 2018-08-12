<template>
    <div>
        <label class="label">Add Lines</label>
        <div class="inputs">
            <input
                class="input"
                type="text"
                name="key"
                ref="key"
                placeholder="key" />
            <input
                class="input"
                type="text"
                name="value"
                ref="value"
                placeholder="value" />
        </div>
        <div class="action">
            <button class="button is-primary" @click="onClick()">
                Apply
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            key: '',
            value: ''
        };
    },

    methods: {
        onClick() {
            this.$emit('submit', {
                key: this.$refs.key.value,
                value: this.$refs.value.value
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