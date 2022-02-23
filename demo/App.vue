<template>
    <div>
        <FormCreate :rule="rule" :option="option" :value.sync="fValue">
            <!-- <div>11</div> -->
        </FormCreate>
        <Button type="primary" @click="changeProp">按钮</Button>
    </div>
</template>

<script>
const ceshi = {};
export default {
    name: "App",
    watch: {},
    data() {
        return {
            // ceshi: { name: "kfg" },
            rule: [
                {
                    title: "姓名",
                    field: "name",
                    value: "",
                    type: "input",
                    // name: "自定义组件的字段名称",
                    attrs: {}, //与props一样，组件的props如果没有用到，将渲染到组件根标签
                    props: {
                        clearable: true,
                    }, //作为组件的props
                    domProps: {},
                    scopedSlots: {
                        ceshi() {},
                    },
                    // style:  "color:red" ,  //style三种形式
                    // style:  {color:"red"} ,
                    style: [{ color: "red" }],
                    // class: "div1",
                    // class: { div1: true }, //class三种形式
                    // class: [{ div1: true }, "div2", ["div3"]], //组合
                    validate: [{ required: true, message: "姓名不能为空", trigger: "change" }], //校验规则
                    children: [],
                    wrap: {
                        labelWidth: 80,
                        label: "姓名11",
                    }, //设置FormItem
                    options: [], //设置radio,select,checkbox等组件option选择项
                },
                {
                    type: "row",
                    children: [
                        {
                            type: "col",
                            children: [
                                {
                                    title: "年龄",
                                    type: "input",
                                    field: "age",
                                    validate: [{ required: true, message: "年龄不能为空", trigger: "change" }], //校验规则
                                },
                            ],
                        },
                    ],
                },
            ],
            // 全局配置
            option: {
                // iview的Form组件属性
                form: {
                    inline: false,
                    labelWidth: 100,
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
                            "on-change": (value) => {
                                console.log("input-change", value);
                            },
                        },
                    },
                },
                formData: {
                    name: "kfg2",
                },
            },
            /*
                表单控件value的初始值
                通过在form-create组件上绑定的value.sync优先级更高
                option.formData次之
                rule.value最低
            */
            fValue: {
                name: "kfg1",
                age: "22",
                sex: "男",
            },
        };
    },
    methods: {
        changeProp() {
            // this.$set(ceshi, "obj", { name: "kfg" });  //没有绑定过观察者实例的属性，使用$set不会进行响应式处理，只起简单的赋值作用
            // this.ceshi.name = {};
            this.fValue.name = "kfg33";
            // this.fValue = {
            //     name: "kfg22",
            //     age: "22222",
            // };
            console.log(this.fValue);
            // this.option.form.inline = true;
        },
    },
    updated() {
        console.log("update");
    },
    mounted() {
        this.ceshi = {
            name: "kfg",
        };
        // 只有经过响应式处理的数据，才能调用watch进行监听
        this.$watch("ceshi.name", () => {
            console.log("变化了");
        });
    },
};
</script>
