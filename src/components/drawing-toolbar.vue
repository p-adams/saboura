<template>
    <g>
        <rect
            width="50"
            height="300"
            x="300"
            y="60"
            fill="gray"
        >   
        </rect>
        <circle
            class="close"
            cx="341"
            cy="62"
            r="15"
            fill="black"
        >
        </circle>
        <text
            class="close"
            x="335"
            y="70"
            font-size="20"
            fill="white"
        >
        X
        </text>
    </g>
</template>
<script>
export default {
  name: "DrawingToolbar"
};
</script>
<style scoped>
.close {
  cursor: pointer;
  background: red;
}
</style>
