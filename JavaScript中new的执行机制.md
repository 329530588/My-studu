```
var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
```
乍一看，上述代码中第三行`this instanceof _` 中的`this`很可能会误以为是window对象，这就犯了先入为主的错误了。    
按照JavaScript的`new`执行机制，会执行以下步骤（伪代码）    
```
new _(arg) = {

    var obj = {};

    obj.__proto__ = _.prototype;

    var result = _.call(obj, arg);

    return typeof result === 'object'? result : obj;
}
```
细心的你会发现，中间产生了空对象`obj`作为过渡，并用call把构造函数的context改成了obj。所以上面提到的`this`指的是新建的对象，而不是window对象。
