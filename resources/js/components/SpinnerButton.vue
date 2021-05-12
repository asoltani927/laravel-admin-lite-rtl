<template>
    <button type="button" :class="dataClass" :disabled="loading" @click="onClick">
                <span v-if="loading">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                </span>
        <span v-else>
            {{ dataCaption }}
                </span>

    </button>
</template>

<script>
export default {
    name: "SpinnerButton",
    props: {
        dataClass: {default: '', type: String},
        dataCaption: {default: '', type: String},
        loading: {default: false, type: Boolean},
    },

    methods: {
        async onClick() {
            this.$emit('click');
        }
    }
}
</script>

<style scoped>

</style>
