export default function method() {
    return {
        // 获取所有表单字段
        fields() {
            console.log(this.fApi.fields());
        },
        // 获取指定表单字段的值
        getValue() {
            console.log(this.fApi.getValue("age1"));
        },
        // 设置表单值
        setValue() {
            // 覆盖方式
            // this.fApi.coverValue({
            //     age1: "111",
            // });
            // 合并方式
            this.fApi.setValue({
                age1: "222",
            });
        },
        // 重置表单字段
        resetFields() {
            // this.fApi.resetFields();
            // this.fApi.resetFields("goods_info");
            this.fApi.resetFields(["age1", "age2"]);
        },
        // 隐藏表单组件
        hidden() {
            // 隐藏指定的表单组件，Dom节点不渲染，表单验证不会生效
            // this.fApi.hidden(true, "age1");
            // 隐藏指定的表单组件，Dom节点渲染，表单验证会生效
            this.fApi.display(false, "age1");
        },
        // 禁用表单组件
        disabled() {
            this.fApi.disabled(true);
            // this.fApi.disabled(true, "age1");
        },
        // 删除规则
        removeRule() {
            console.log("删除的元素", this.fApi.removeRule(this.rule[0]));
            // console.log("删除的元素", this.fApi.removeField("info"));
        },
        // 新增规则
        addRule() {
            // this.fApi.append(
            this.fApi.prepend(
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
                }
                // "age3"
            );
        },
        // 获取所有表单组件规则
        getAllRule() {
            console.log(this.fApi.model());
        },
        // 更新指定规则
        updateRule() {
            // this.fApi.mergeRule("age1", {
            //     hidden: true,
            //     style: {
            //         border: "1px solid red",
            //     },
            //     props: {},
            // });
            // this.fApi.mergeRules({
            //     age1: {
            //         hidden: true,
            //         style: {
            //             border: "1px solid red",
            //         },
            //     },
            // });
            // this.fApi.updateRule("age1", {
            //     style: {
            //         border: "1px solid red",
            //     },
            //     props: {},
            // });
            this.fApi.updateRules({
                age1: {
                    hidden: true,
                },
                age2: {
                    style: {
                        border: "1px solid red",
                    },
                },
            });
        },
        // 更新表单校验规则
        updateValidate() {
            // this.fApi.updateValidate("age1", { required: true, message: "年龄1不能为空", trigger: "blur" }, true);
            this.fApi.updateValidates({
                age1: [{ required: true, message: "年龄1不能为空", trigger: "blur" }],
                age2: { required: true, message: "年龄2不能为空", trigger: "blur" },
            });
        },
        // 清除表单校验
        clearValidateState() {
            this.fApi.clearValidateState();
            // this.fApi.clearValidateState("age1");
            // this.fApi.clearValidateState(["age1", "age2"]);
        },
        // 表单校验
        validateForm() {
            // this.fApi.validate((valid) => {
            //     console.log(valid);
            // });
            this.fApi.validateField("age1", (err) => {
                console.log(valid);
            });
            // this.fApi.validateField(("age1", err) => {
            //     console.log(err);
            // });
            // this.fApi.validate().then((arg) => {
            //     console.log(arg)
            // });
            // this.fApi.submit(
            //     (formData, api) => {
            //         console.log(formData, api);
            //     },
            //     (formData, api) => {
            //         console.log(formData, api);
            //     }
            // );
        },
        // 获取表单数据
        formData() {
            // console.log(this.fApi.formData("age1"));
            console.log(this.fApi.formData());
            // console.log((this.fApi.bind().age1 = "age111"));
        },
        // 表单值是否改变
        changeStatus() {
            console.log(this.fApi.changeStatus());
        },
        // 修改提交按钮
        submitBtnProps() {
            // this.fApi.submitBtnProps({ show: false });
            // this.fApi.btn.show(false);
            // this.fApi.btn.disabled(true);
            this.fApi.btn.loading(true);
        },
        // 修改重置按钮
        resetBtnProps() {
            // this.fApi.resetBtnProps({ show: false });
            // this.fApi.resetBtn.show(false);
            // this.fApi.resetBtn.disabled(true);
            this.fApi.resetBtn.loading(true);
        },
        // 更新表单配置
        updateOptions() {
            this.fApi.updateOptions({
                form: {
                    inline: true,
                },
            });
        },
        // 刷新表单配置
        refreshOptions() {
            this.fApi.refreshOptions();
        },
        // 隐藏表单
        hideForm() {
            this.fApi.hideForm(true);
        },
        // 重载表单
        reload() {
            this.fApi.reload([
                {
                    type: "input",
                    title: "重载",
                    field: "rInput",
                },
            ]);
        },
        destroy() {
            this.fApi.destroy();
        },
        nextTick() {
            this.fApi.nextTick(() => {
                console.log("渲染后触发")
            });
        },
        nextRefresh(){
            this.fApi.nextTick(() => {
                console.log("如果该回调没有触发表单重新渲染，会自动重新渲染")
            });
        }
    };
}
