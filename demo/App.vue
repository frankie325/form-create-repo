<template>
    <div>
        <!-- <Form :label-width="150">
            <Row>
                <Col span="12">
                    <FormItem label="user" prop="user">
                        <Input placeholder="Username"> </Input>
                    </FormItem>
                    <FormItem label="user" prop="user">
                        <Input placeholder="Username"> </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="user" prop="user">
                        <Input placeholder="Username"> </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="user" prop="user">
                        <Input placeholder="Username"> </Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="password" prop="password">
                <Input placeholder="Password"> </Input>
            </FormItem>
        </Form> -->
        <!-- {{fValue}} -->
        <FormCreate v-model="fApi" :rule="rule" :option="option" :value.sync="fValue">
            <!-- <div>11</div> -->
        </FormCreate>
        <Button type="primary" @click="hiddenRule">隐藏规则</Button>
        <Button type="primary" @click="addRule">新增规则</Button>
        <Button type="primary" @click="removeRule">删除规则</Button>
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
            fApi: {},
            // ceshi: { name: "kfg" },
            rule: [
                // "111",
                // {
                //     title: "姓名",
                //     field: "name",
                //     value: "",
                //     type: "input",
                //     // name: "自定义组件的字段名称",
                //     attrs: {}, //与props一样，组件的props如果没有用到，将渲染到组件根标签
                //     props: {
                //         clearable: true,
                //     }, //作为组件的props
                //     domProps: {},
                //     scopedSlots: {
                //         ceshi() {},
                //     },
                //     // style:  "color:red" ,  //style三种形式
                //     // style:  {color:"red"} ,
                //     style: [{ color: "red" }],
                //     // class: "div1",
                //     // class: { div1: true }, //class三种形式
                //     // class: [{ div1: true }, "div2", ["div3"]], //组合
                //     validate: [{ required: true, message: "姓名不能为空", trigger: "change" }], //校验规则
                //     children: [
                //         {
                //             type: "icon",
                //             props: {
                //                 type: "ios-checkmark",
                //             },
                //             slot: "append",
                //         },
                //     ],
                //     wrap: {
                //         labelWidth: 80,
                //         // label: "姓名11",
                //     }, //设置FormItem
                //     options: [], //设置radio,select,checkbox等组件option选择项
                //     // col: {},
                //     control: [
                //         {
                //             handle: (val) => !!val,
                //             append: "name",
                //             rule: [
                //                 // "info",
                //                 {
                //                     type: "input",
                //                     field: "info",
                //                     title: "差评原因",
                //                     value: "default info",
                //                 },
                //             ],
                //         },
                //     ],
                // },
                // {
                //     type: "input",
                //     field: "info",
                //     title: "差评原因",
                //     value: "default info",
                // },
                {
                    type: "row",
                    children: [
                        {
                            type: "col",
                            props: { span: 24 },
                            children: [
                                "哈哈",
                                {
                                    title: "年龄1",
                                    type: "input",
                                    field: "age1",
                                    value: "age1",
                                    validate: [{ required: true, message: "年龄不能为空", trigger: "change" }], //校验规则
                                },
                                {
                                    title: "年龄2",
                                    type: "input",
                                    field: "age2",
                                    value: "age2",
                                    validate: [{ required: true, message: "年龄不能为空", trigger: "change" }], //校验规则
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "row",
                    children: [
                        {
                            type: "col",
                            props: { span: 24 },
                            children: [
                                {
                                    title: "年龄3",
                                    type: "input",
                                    field: "age3",
                                    value: "age3",
                                    validate: [{ required: true, message: "年龄不能为空", trigger: "change" }], //校验规则
                                },
                            ],
                        },
                    ],
                },
                // {
                //     type: "row",
                //     children: [
                //         {
                //             title: "性别",
                //             type: "input",
                //             field: "sex",
                //             col: {
                //                 span: 12,
                //             },
                //             validate: [{ required: true, message: "性别不能为空", trigger: "change" }], //校验规则
                //         },
                //     ],
                // },
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
                            // size: "large",
                        },
                        on: {
                            "on-change": (value) => {
                                // console.log("input-change", value);
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

            // this.fValue.name = Math.random();
            // this.fValue = {
            //     name: "kfg22",
            //     age: "22222",
            // };
            // console.log(this.fValue);
            // this.option.form.inline = true;
            // this.rule[0].children[0].children = [
            //     {
            //         title: "性别",
            //         type: "input",
            //         field: "sex",
            //         // col: {
            //         //     span: 12,
            //         // },
            //         validate: [{ required: true, message: "性别不能为空", trigger: "change" }], //校验规则
            //     },
            // ];
            // this.rule[0].children[0].children.splice(0, 1);
        },
        hiddenRule() {
            this.fApi.hidden(true, "name");
        },
        addRule() {
            this.fApi.append(
                {
                    type: "input",
                    title: "商品简介",
                    field: "goods_info",
                    value: "商品",
                    control: [
                        {
                            handle: (val) => !!val,
                            // append: "age1",
                            rule: [
                                {
                                    type: "input",
                                    field: "info",
                                    title: "差评原因",
                                    value: "default info",
                                },
                            ],
                        },
                    ],
                    props: {
                        type: "text",
                        placeholder: "请输入商品简介",
                    },
                    validate: [{ required: true, message: "请输入商品简介", trigger: "blur" }],
                },
                "age3"
            );
        },
        removeRule() {
            console.log("删除的元素", this.fApi.removeField("info"));
            // console.log("删除的元素", this.fApi.removeField("age2"));
            // console.log("删除的元素", this.fApi.removeField("name"));
            // this.fApi.append(this.fApi.removeField("name"))
        },
    },
    updated() {
        console.log("update", this);
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
