import Vue from "vue";

export function $set(target, key, value) {
    Vue.set(target, key, value);
}

export function $del(target, key) {
    Vue.delete(target, key);
}
