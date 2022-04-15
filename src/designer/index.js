import { unique } from "@/utils";
import FormCreate from "@/iview";
import FcDesigner from "./components/FcDesigner";
import draggable from "vuedraggable";
import DragBox from "./components/DragBox";
import DragTool from "./components/DragTool";
import Validate from "./components/Validate";
import Struct from "./components/Struct";

FormCreate.register("_fc", {
    init(fc, rule) {
        // rule.field重复时更新rule.field
        if (fc.repeat) {
            rule.field = unique();
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
