import { unique } from "@/utils";
import { $set } from "@/utils/modify";
import FormCreate from "@/iview";
import FcDesigner from "./components/FcDesigner";
import draggable from "vuedraggable";
import DragBox from "./components/DragBox";
import DragTool from "./components/DragTool";
import Validate from "./components/Validate";
import Struct from "./components/Struct";
import "./style/index.css";

FormCreate.register("_fc", {
    init(fc, rule) {
        // rule.field重复时更新rule.field
        if (fc.repeat) {
            rule.field = unique();
        }
    },
});

FormCreate.register("_name", {
    loaded(data, rule) {
        const parent = (this._parent = rule.__fc__.parent.rule);

        // 插入tabPane时，重新设置所有tabPane的index，否则不会按照设置的顺序渲染
        if (parent.children && parent.children.length) {
            parent.children.forEach((c) => {
                const index = parent.children.indexOf(c);
                if (parent.type === "tabs") {
                    $set(c.props, "index", index);
                }
                // collapse的panel只需设置name
                $set(c.props, "name", index + "");
            });
        }
    },
});

FormCreate.component("draggable", draggable);
FormCreate.component("DragBox", DragBox);
FormCreate.component("DragTool", DragTool);
FormCreate.component("Validate", Validate);
FormCreate.component("Struct", Struct);

FcDesigner.install = function (Vue) {
    Vue.component("FcDesigner", FcDesigner);
};

export default FcDesigner;
