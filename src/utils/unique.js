let id = 0;
// 唯一键
export default function uniqueId() {
    return Math.random().toString(36).substr(3, 3) + Number(`${Date.now()}${++id}`).toString(36);
}
