import FormCreate from "@/iview";
import FcDesigner from "./components/FcDesigner";
import draggable from "vuedraggable";
import DragBox from "./components/DragBox";
import DragTool from "./components/DragTool";

FormCreate.component("draggable", draggable);
FormCreate.component("DragBox", DragBox);
FormCreate.component("DragTool", DragTool);

FcDesigner.install = function (Vue) {
    Vue.component("FcDesigner", FcDesigner);
};

export default FcDesigner;
