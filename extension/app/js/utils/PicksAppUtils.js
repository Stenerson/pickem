module.exports = {

  lazyProduct: function(sets,f,context) {
    if (!context) context=this;
    var p=[],max=sets.length-1,lens=[];
    for (var i=sets.length;i--;) lens[i]=sets[i].length;
    function dive(d){
      var a=sets[d], len=lens[d];
      if (d==max) for (var i=0;i<len;++i) p[d]=a[i], f.apply(context,p);
      else        for (var i=0;i<len;++i) p[d]=a[i], dive(d+1);
      p.pop();
    }
    dive(0);
  }

}