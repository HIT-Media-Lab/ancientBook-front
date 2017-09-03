<template>
    <div id="1" class="zxw-lit-create-summery"
         v-html="innerText"
         :contenteditable="canEdit"
         @blur="changeText"
         v-bind:class="{'zxw-input-number':summary_error}">
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
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
                if(this.$el.innerHTML.length >= 45){
                    this.summary_error = true;
                    this.$emit('open_warning',this.summary_error);
                } else {
                    this.summary_error = false;
                    this.$emit('open_warning',this.summary_error);
                }
            }
        }
    }
</script>
