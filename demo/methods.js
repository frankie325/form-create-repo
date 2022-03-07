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
        // 表单校验
        validateForm() {
            this.fApi.validate((arg) => {
                console.log(arg);
            });
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
    };
}
