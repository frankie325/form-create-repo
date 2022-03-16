<script>
import draggable from "vuedraggable";
export default {
    name: "DragBox",
    props: ["rule", "tag"],
    components: { draggable },
    functional: true,
    render(h, ctx) {
        // console.log("-----draggable--------", ctx);
        return h(
            "draggable",
            {
                ...ctx.props.rule,
                on: ctx.listeners,
            },
            ctx.children
        );
    },
};
</script>
