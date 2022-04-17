<template>
    <div class="drag-tool" @click.stop="active" :class="{ active: state.active === id }">
        <div class="drag-move">
            <div class="drag-btn fc-drag-btn" style="cursor: move" v-if="state.active === id && dragBtn !== false">
                <Icon type="md-move" color="#fff" />
            </div>
        </div>
        <div class="drag-oprate">
            <div class="drag-btn" @click="$emit('add')">
                <Icon type="md-add" color="#fff" />
            </div>
            <div class="drag-btn" @click="$emit('copy')">
                <Icon type="md-copy" color="#fff" />
            </div>
            <div class="drag-btn" v-if="children" @click="$emit('addChild')">
                <Icon type="md-albums" color="#fff" />
            </div>
            <div class="drag-btn drag-btn-delete" @click="$emit('delete')">
                <Icon type="md-trash" color="#fff" />
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
let id = 1;
export default {
    name: "DragTool",
    inject: ["fcx"],
    props: ["dragBtn", "children", "unique"],
    data() {
        return {
            id: this.unique || id++,
            state: this.fcx,
        };
    },
    methods: {
        active() {
            if (this.state.active === this.id) return;
            this.state.active = this.id;
            this.$emit("active");
        },
    },
    beforeDestroy() {
        this.state = {};
    },
};
</script>

<style>
.drag-tool {
    min-height: 20px;
    outline: 1px dashed #2e73ff;
    position: relative;
    padding: 2px;
    overflow: hidden;
    /* word-wrap: break-word;
    word-break: break-all; */

}

.drag-tool .drag-btn {
    width: 20px;
    height: 20px;
    background-color: #2e73ff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.drag-tool .drag-btn-delete {
    background-color: #ff2e2e;
}

.drag-tool > .drag-move {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.drag-tool > .drag-oprate {
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.drag-tool > .drag-oprate > .drag-btn {
    margin-left: 2px;
}

.drag-tool.active {
    outline: 2px solid #2e73ff;
}

.drag-tool.active > .drag-move {
    display: block;
}
.drag-tool.active > .drag-oprate {
    display: flex;
}

.drag-tool .drag-tool {
    margin: 5px;
}
.drag-tool + .drag-tool {
    margin-top: 6px;
}
</style>
