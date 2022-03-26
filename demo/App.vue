<template>
    <div style="height: 100%">
        <FormCreate
            v-model="fApi"
            :rule="rule"
            :option="option"
            :value.sync="fValue"
            @created="created"
            @update="update"
            @input-field-on-change="emitChange"
            @emit-event="emitEvent"
        >
        </FormCreate>
        <Collapse>
            <Panel name="1">
                字段操作
                <p slot="content">
                    <Button type="primary" @click="changeProp">按钮</Button>
                    <Button type="primary" @click="fields">获取所有表单字段</Button>
                    <Button type="primary" @click="getValue">获取指定表单字段的值</Button>
                    <Button type="primary" @click="setValue">设置表单值</Button>
                    <Button type="primary" @click="resetFields">重置表单值</Button>
                    <Button type="primary" @click="hidden">隐藏表单组件</Button>
                    <Button type="primary" @click="disabled">禁用表单组件</Button>
                </p>
            </Panel>
            <Panel name="2">
                规则操作
                <p slot="content">
                    <Button type="primary" @click="removeRule">删除规则</Button>
                    <Button type="primary" @click="addRule">新增规则</Button>
                    <Button type="primary" @click="getAllRule">获取所有表单组件规则</Button>
                    <Button type="primary" @click="updateRule">更新指定规则</Button>
                </p>
            </Panel>
            <Panel name="3">
                验证操作
                <p slot="content">
                    <Button type="primary" @click="updateValidate">更新表单校验规则</Button>
                    <Button type="primary" @click="clearValidateState">清除表单校验</Button>
                    <Button type="primary" @click="validateForm">表单校验</Button>
                </p>
            </Panel>
            <Panel name="4">
                表单操作
                <p slot="content">
                    <Button type="primary" @click="formData">获取表单数据</Button>
                    <Button type="primary" @click="changeStatus">表单值是否改变</Button>
                    <Button type="primary" @click="submitBtnProps">修改提交按钮</Button>
                    <Button type="primary" @click="resetBtnProps">修改重置按钮</Button>
                    <Button type="primary" @click="updateOptions">更新表单配置</Button>
                    <Button type="primary" @click="refreshOptions">刷新表单配置</Button>
                    <Button type="primary" @click="hideForm">隐藏表单</Button>
                    <Button type="primary" @click="reload">重载表单</Button>
                    <Button type="primary" @click="destroy">销毁表单</Button>
                    <Button type="primary" @click="nextTick">表单重新渲染后的回调</Button>
                    <Button type="primary" @click="nextRefresh">自动重新渲染</Button>
                </p>
            </Panel>
        </Collapse>
        <Designer />
    </div>
</template>

<script>
import methods from "./methods.js";
import json from "./json.js";
import Designer from "./Designer";
import FormCreate from "@/iview";
FormCreate.register({
    name: "str",
    components: ["input", "select"], //属性绑定的组件,不设置或者'*'默认为全部组件
    input: true, //拥有rule.field字段才会触发自定义属性的事件
    // rule初始化时
    init(data, rule, api) {
        // api.removeField("input-field");

        console.log("自定义属性init", data, rule, api);
    },
    // rule正在处理时
    load(data, rule, api) {
        // rule.effect.str = "新字符";

        console.log("自定义属性load", data, rule, api);
        // data.mergeProp({
        //     props: {
        //         size: "large",
        //     },
        // });
    },
    // rule处理完成时
    loaded(data, rule, api) {
        // api.removeField("input-field");

        console.log("自定义属性loaded", data, rule, api);
    },
    // 组件值发生变化时
    value(data, rule, api) {
        console.log("自定义属性value", data, rule, api);
    },
    // 组件的control配置处理完成时
    control(data, rule, api) {
        console.log("自定义属性control", data, rule, api);
    },
    //rule 移除时
    deleted(data, rule, api) {
        console.log("自定义属性deleted", data, rule, api);
    },
    //mounted 对应的组件生成时
    mounted(data, rule, api) {
        console.log("自定义属性mounted", data, rule, api);
        // data.mergeProp({
        //     props: {
        //         large: "size",
        //     },
        // });
    },
    //自定义属性值发生变化
    watch(data, rule, api) {
        console.log("自定义属性watch", data, rule, api);
    },
});

export default {
    name: "App",
    components: {
        Designer,
    },
    watch: {},
    data() {
        return {
            single: [],
            fApi: {},
            ceshi: { name: true },
            rule: [
                ...json(),
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
                //     type: "row",
                //     children: [
                //         {
                //             type: "col",
                //             props: { span: 24 },
                //             children: [
                //                 {
                //                     // show: true,
                //                     title: "年龄1",
                //                     type: "input",
                //                     field: "age1",
                //                     value: "age1",
                //                     // props: {
                //                     //     size: "large",
                //                     // },
                //                     validate: [{ required: true, message: "年龄1不能为空", trigger: "change" }], //校验规则
                //                 },
                //                 {
                //                     title: "年龄2",
                //                     type: "input",
                //                     field: "age2",
                //                     value: "age2",
                //                     validate: [{ required: true, message: "年龄2不能为空", trigger: "change" }], //校验规则
                //                 },
                //             ],
                //         },
                //     ],
                // },
            ],
            // 全局配置
            option: {
                // iview的Form组件属性
                form: {
                    inline: false,
                    labelWidth: 125,
                    labelPosition: "right",
                    disabled: false,
                    // clearable: true,
                },
                global: {
                    input: {
                        style: "color:red",
                        props: {
                            clearable: true,
                            disabled: false,
                            // size: "large",
                        },
                        // on: {
                        //     "on-change": (value) => {
                        //         console.log("input-change", value);
                        //     },
                        // },
                    },
                },
                formData: {
                    name: "kfg2",
                },
                submitBtn: {
                    show: true,
                    // 这里配置了点击事件，则下面的onSubmit不会触发
                    // click(api) {
                    //     console.log(api);
                    // },
                },
                resetBtn: {
                    show: false,
                },
                onSubmit(formData, api) {
                    console.log(formData, api);
                },
                reload(api) {
                    console.log("reload", api);
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
                // age1: "22",
                sex: "男",
                // "input-field": "22",
            },
        };
    },
    methods: {
        ...methods(),
        changeProp() {
            // this.$set(this.ceshi, "name", false);  //没有绑定过观察者实例的属性，使用$set不会进行响应式处理，只起简单的赋值作用
            // this.ceshi.name = false;
            // this.fValue.age1 = 23;
            this.fValue["input-field"] = 23;
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
            // this.rule[0].type = "select";
            // this.rule[0].on["on-change"].push((...args) => {
            //     console.log("哈哈哈", args);
            // });
            // this.rule[0]["emit"].push({
            //     name: "on-blur",
            //     inject: "新增emit",
            // });
            // this.$set(this.rule[0].props, "size", "large");
            //  = "large";
        },
    },
    updated() {
        // console.log("update", this);
    },
    mounted() {
        // 只有经过响应式处理的数据，才能调用watch进行监听
        // this.$watch("ceshi.name", () => {
        //     console.log("变化了");
        // });
        // reload中的rule不是响应式的，$watch无法监听rule中的配置
        // this.fApi.reload([
        //     {
        //         title: "输入框",
        //         type: "input",
        //         field: "input-field",
        //         value: "hhh",
        //         children: [
        //             {
        //                 type: "icon",
        //                 props: {
        //                     type: "ios-checkmark",
        //                 },
        //                 slot: "prefix",
        //             },
        //         ],
        //     },
        // ]);
    },
};

let str = "name";
let obj = {};

// Object.defineProperty(obj, "str", {
//     get() {
//         return str;
//     },
//     set(n) {
//         str = n;
//     },
// });

Object.defineProperties(obj, {
    str: {
        get() {
            return str;
        },
        set(n) {
            str = n;
        },
    },
});
let obj2 = { ...obj };
</script>

<style>
html,
body {
    height: 100%;
}
</style>
