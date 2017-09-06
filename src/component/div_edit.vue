<template>
    <div id="1" class="zxw-lit-create-summery"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked === true"
         @blur="changeText"
         v-bind:class="{'zxw-input-number':summary_error}"
         @keydown="forbid_enter()">
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false,
                summary_error:false
            }
        },
        watch: {
            'value'(){
                this.isLocked = false;
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                    if(this.innerText.length >= 45){
                        this.summary_error = true;
                        this.$emit('open_warning',this.summary_error);
                    } else {
                        this.summary_error = false;
                        this.$emit('open_warning',this.summary_error);
                    }
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);

            },

            forbid_enter(){
                if(event.keyCode === 13){
                    event.returnValue = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
        }
    }
</script>

<style>
    .zxw-lit-create-summery{
        display:inline-block;
        width: 560px;
        min-height:60px;
        _height:60px;
        background-color: transparent;
        border: 2px solid black;
        vertical-align:top;
        white-space:pre-wrap;
    }

    .zxw-input-number{
        border-color: #a50000;
    }
</style>
