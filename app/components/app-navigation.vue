<template>
    <nav class="nav">
        <div
            class="nav-item"
            :class="{'active': selected === 'add'}"
            @click="onAdd()">
            Add Line
        </div>
        <div
            class="nav-item"
            :class="{'active': selected === 'remove'}"
            @click="onRemove()">
            Remove Line
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            selected: 'add'
        }
    },

    created() {
        console.log(this.active);
    },

    methods: {
        onAdd() {
            this.selected = 'add';
            this.$emit('change', this.selected);
        },

        onRemove() {
            this.selected = 'remove'
            this.$emit('change', this.selected);
        }
    }
};
</script>

<style lang="scss" scoped>
.nav {
    display: flex;
    border-bottom: 1px solid #ddd;

    .nav-item {
        padding: 10px;
        color: black;

        &:hover {
            cursor: pointer;
        }

        &.active {
            color: #3273dc;
            border-bottom: 1px solid #3273dc;
            margin-bottom: -1px;
        }
    }
}
</style>