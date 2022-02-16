<template>
    <div>
        <FormCreate :rule="rule" :option="option"></FormCreate>
        <Button type="primary" @click="changeProp">按钮</Button>
    </div>
</template>

<script>
const ceshi = {};
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
                    disabled: false,
                },
                global: {
                    input: {
                        style: "color:red",
                        props: {
                            clearable: true,
                            disabled: false,
                            size: "large",
                        },
                        on: {
                            fun1: () => {
                                console.log("user");
                            },
                        },
                    },
                },
            },
        };
    },
    methods: {
        changeProp() {
            // this.$set(ceshi, "obj", { name: "kfg" });  //没有绑定过观察者实例的属性，使用$set不会进行响应式处理，只起简单的赋值作用
            // this.ceshi = ceshi;
            this.option.form.inline = true;
        },
    },
};
</script>
