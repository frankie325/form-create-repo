<template>
    <div>
        <FormCreate :rule="rule" :option="option"></FormCreate>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            rule: [],
            option: {},
        };
    },
};
</script>
