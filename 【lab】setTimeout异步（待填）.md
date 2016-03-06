###【lab】setTimeout异步（待填）
V8速度太快，实验效果不明显

```
<input id="i1"></input>
<p id="p1"></p>

<input id="i2"></input>
<p id="p2"></p>
```

```javascript
    var i1 = document.getElementById('i1'),
        i2 = document.getElementById('i2'),
        p1 = document.getElementById('p1'),
        p2 = document.getElementById('p2');
        i1.addEventListener('keyup', function(e){
            p1.innerText = i1.value;
            i1.focus();
            i1.select();
        })

        i2.addEventListener('keyup', function(e){
            var value = i2.value;
            setTimeout(function(){
                p2.innerText = value;
                i2.focus();
                i2.select();
            }, 0);
        })
```