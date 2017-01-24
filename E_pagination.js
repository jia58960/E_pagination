//E_pagination
/**
2017-01-23 ethan
**/
(function($) {
  var pager = {
    init: function(container, args) {
      this.render(container, args);
      this.bindEvent(container, args);
    },
    //渲染分页器
    render: function(container, args) {
      container.empty();
      console.log('当前页码：'+args.current);
      console.log('总页数：'+args.pageCount);
      //debugger;
      //上一页
      if (args.current > 1) {
        container.append('<li><a href="javascript:;" class="prevPage"><span>上一页</span></a></li>');
      } else {
        container.remove('.prevPage');
        container.append('<li class="disabled"><a href="javascript:;"><span>上一页</span></a></li>');
      }
      
      //中间页码
      if (args.current >= 4 && args.pageCount != 4) {
        container.append('<li><a href="javascript:;" class="tcdNumber">1</a></li>');
      }
      
      if (args.current > 4 && args.current <= args.pageCount && args.pageCount > 5) {
        container.append('<li><a href="javascript:;">...</a></li>');
      }
      var start = args.current - 2,
        end = args.current + 2;
      if ((start > 1 && args.current < 4) || args.current == 1) {
        end++;
      }
      if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
        start--;
      }
      for (; start <= end; start++) {
        if (start <= args.pageCount && start >= 1) {
          if (start != args.current) {
            container.append('<li><a href="javascript:;" class="tcdNumber">' + start + '</a></li>');
          } else {
            container.append('<li class="active"><a href="javascript:;">' + start + '</a></li>');
          }
        }
      }

      if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
        container.append('<li><a href="javascript:;">...</a></li>');
      }
      if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
        container.append('<li><a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a></li>');
      }

      //下一页
      if (args.current < args.pageCount) {
        container.append('<li><a href="javascript:;" class="nextPage"><span>下一页</span></a></li>');
      } else {
        container.remove('.nextPage');
        container.append('<li class="disabled"><a href="javascript:;"><span>下一页</span></a></li>');
      }
    },
    //绑定事件
    bindEvent: function(container, args) {
        var that = this;
        container.on("click", "a.tcdNumber", function() {
          var current = parseInt($(this).text());
          that.render(container, { "current": current, "pageCount": args.pageCount });
          if (typeof(args.callback) == "function") {
            args.callback(current);
          }
        });
        //上一页
        container.on("click", "a.prevPage", function() {
          var current = parseInt(container.children("li.active").find('a').text());
          that.render(container, { "current": current - 1, "pageCount": args.pageCount });
          if (typeof(args.callback) == "function") {
            args.callback(current - 1);
          }
        });
        //下一页
        container.on("click", "a.nextPage", function() {
          var current = parseInt(container.children("li.active").find('a').text());
          that.render(container, { "current": current + 1, "pageCount": args.pageCount });
          if (typeof(args.callback) == "function") {
            args.callback(current + 1);
          }
        });
    }
  };
  $.fn.E_pagination = function(options) {
    var args = $.extend({
      pageCount: 5,
      current: 1,
      callback: function() {}
    }, options);
    this.off();
    pager.init(this, args);
  };
})($);