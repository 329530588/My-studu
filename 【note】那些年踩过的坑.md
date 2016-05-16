#【note】那些年踩过的坑

##JS
###label事件触发两次
写vue的过程中遇到的现象，代码如下.。

```vbscript-html```
<div id="form-controller">
    <label v-on:click="checkboxHandler" class="checkbox">
        <span class="bg" v-bind:class="{'check': isCheck}">
            <i class="fa fa-check"></i>
        </span>
        <input type="checkbox">Check me!
    </label>
</div>
```

```javascript```
new Vue({
    el: '#form-controller',
    data: {
        isCheck: false
    },
    methods: {
        checkboxHandler: function(e) {
            var status = this.isCheck
            this.isCheck = !status;
            console.log(this.isCheck);
        }
    }
})
```
按照剧本演的是点击checkbox后会改变status的值，但实际结果则改变了两次，经过排场，不是`e.stopPropagation()`的原因，而是label标签，原因：
>绑定在label。单击input后，触发input本身的click事件。单击label后，首先触发label本身的click事件，然后由于“某种原因”触发了input的click事件，进而事件冒泡至label，再次触发label的click事件

这可能跟label的语义有关，HTML基础不够扎实！

