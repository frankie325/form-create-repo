const NAME = "fcTree";

import { mergeProps, deepCopy } from "@form-create/utils";

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    watch: {
        value(n) {
            this.setStatus(n);
        },
    },
    data() {
        return {
            type: "",
        };
    },
    methods: {
        updateType() {
            const props = this.formCreateInject.prop.props;
            let flag = props.showCheckbox || props["show-checkbox"];
            this.type = flag ? "check" : "select";
        },
        setStatus(value) {
            const data = this.formCreateInject.prop.props.data;
            this.type === "select" ? this.checked(data, value, "selected") : this.checked(data, value, "checked");
        },
        // 根据value中的id，判断是否需要选中节点
        checked(_data, value, type) {
            _data.forEach((node) => {
                this.$set(node, type, value.indexOf(node.id) !== -1);
                if (node.children && Array.isArray(node.children)) {
                    this.checked(node.children, value, type);
                }
            });
        },
        // 双向绑定的数据为数组id
        onInput(list) {
            this.$emit(
                "input",
                list.map((node) => node.id).filter((node) => node)
            );
        },
    },
    created() {
        this.updateType();
        this.setStatus(this.value);
    },
    render() {
        this.updateType();
        let on = deepCopy(this.formCreateInject.prop.on);
        delete this.formCreateInject.prop.on;

        const _on = {},
            props = this.formCreateInject.prop.props,
            hasData = !!props.data;
        if (props.showCheckbox || props["show-checkbox"]) {
            _on["on-check-change"] = this.onInput;
        } else {
            _on["on-select-change"] = this.onInput;
        }
        on = mergeProps({ on }, [
            {
                on: _on,
            },
        ]);
        /* 外面套一层布局解决.ivu-tree 继承了.ivu-form-item的lineHeight，导致高度没对齐*/
        return (
            <Row
                type="flex"
                align="middle"
                style={{
                    height: hasData ? "" : "34px",
                }}
            >
                <Col span={24} style={{ lineHeight: "20px" }}>
                    <Tree {...this.formCreateInject.prop} {...on}></Tree>
                </Col>
            </Row>
        );
    },
};
