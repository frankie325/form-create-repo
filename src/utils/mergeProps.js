/*
    合并option配置和rule选项，都要用到该方法
    不能简单的就用Object.assign合并
    需要考虑的配置项的优先级，全局 > 用户 > 默认
    比如全局设置为
    {
        form: {
            inline: true,
        }
    }
    用户设置为
    {
        form: {
            labelWidth: "100"
            inline: false,
        }
    }
    如果直接简单的拷贝合并 Object.assign(用户的, 全局的)
    form属性会直接覆盖变成
    {
        form: {
            inline: true,
        }
    }
    我们并不期待这样，而是应该
    {
        form: {
            inline: true,
            labelWidth: "100"
            inline: false,
        }
    }
*/

const rule = {
    title: "xxx",
    field: "表单字段",
    value: "",
    name: "自定义组件的字段名称",
    native: false,
    attrs: {}, //与props一样，组件的props如果没有用到，将渲染到组件根标签
    props: {}, //作为组件的props
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
    validate: [], //校验规则
    children: [],
    wrap: {}, //设置FormItem
    options: [], //设置radio,select,checkbox等组件option选择项
};

export const normalMerge = ["attrs", "props", "domProps", "scopedSlots"];
// export const toObjectMerge = [];
export const toArrayMerge = ["class", "style", "directives"];
export const functionalMerge = ["on", "nativeOn"];

export default function mergeProps(target = {}, options, mergeStrategy = {}) {
    // console.log(target, options);
    const _normalMerge = [...normalMerge, ...(mergeStrategy["normal"] || [])];
    const _toArrayMerge = [...toArrayMerge, ...(mergeStrategy["array"] || [])];
    const _toFunctionalMerge = [...functionalMerge, ...(mergeStrategy["function"] || [])];

    return options.reduce((a, b) => {
        for (const key in b) {
            if (a[key]) {
                if (_normalMerge.indexOf(key) > -1) {
                    a[key] = { ...a[key], ...b[key] };
                } else if (_toArrayMerge.indexOf(key) > -1) {
                    const arrA = Array.isArray(a[key]) ? a[key] : [a[key]]; //处理style，有一丢丢问题，如果是字符，不能直接转为数组，后面再处理
                    const arrB = Array.isArray(b[key]) ? b[key] : [b[key]];
                    a[key] = [...arrA, ...arrB];
                } else if (_toFunctionalMerge.indexOf(key) > -1) {
                    for (const event in b[key]) {
                        if (a[key][event]) {
                            const arrA = Array.isArray(a[key][event]) ? a[key][event] : [a[key][event]];
                            const arrB = Array.isArray(b[key][event]) ? b[key][event] : [b[key][event]];
                            a[key][event] = [...arrA, ...arrB];
                        } else {
                            a[key][event] = b[key][event];
                        }
                    }
                } else {
                    a[key] = b[key];
                }
            } else {
                if (_normalMerge.indexOf(key) > -1) {
                    a[key] = b[key];
                } else if (_toArrayMerge.indexOf(key) > -1) {
                    a[key] = Array.isArray(b[key]) ? b[key] : [b[key]];
                } else {
                    a[key] = b[key];
                }
            }
        }
        return a;
    }, target);
}
