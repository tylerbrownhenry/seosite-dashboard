module.exports = function (a, b, c, d, e, f, g, h, i, j, k, l) {
     var arr = [a, b, c, d, e, f, g, h, i, j, k, l];
     var newArr = [];
     for (var i = 0; i < arr.length; i++) {
          if (typeof arr[i] !== 'undefined') {
               newArr.push(arr[i]);

          }
          //console.log(a, b, c, d, e, f, g, h, i, j, k, l);
     }
     console.log('test');
     console.log(newArr);
}
