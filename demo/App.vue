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
            // 全局配置
            option: {
                // iview的Form组件属性
                form: {
                    inline: false,
                    labelWidth: "100",
                    labelPosition: "left",
                },
            },
        };
    },
};
</script>
