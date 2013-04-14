( function ($){
  var methods = {
    init: function(options){
      var _this = this;
      
      this.elements = {};
      this.elements.list = this.find(' > ul');
      this.elements.list.addClass('parent');
      this.elements.list.children = this.elements.list.find('ul');
    },
    refresh: function(options){
      this.elements.list.children.toggleClass('is-hidden');
      $.each(this.elements.list.find('a'), function(index, link){
        if ($(link).hasClass('active')) {
          $(link).parents('ul').toggleClass('is-hidden is-visible');
          $(link).parents('li').each( function(index, target) {
            if ($(target).find(' > ul').length) {
              $(target).find(' > a').addClass('is-expanded');
            }
          });
          if ($(link).parent('li').find(' > ul').length){
            $(link).parent('li').find(' > ul').toggleClass('is-hidden is-visible');
            $(link).addClass('is-expanded');
          }
        }
      });
    },
    collapse: function(options){
      $.each(this.elements.list.children, function(index,list){
        $(list).addClass('is-hidden');
      });
      var listitems = this.elements.list.find('li');
      $.each(listitems, function(index,item){
        if ($(item).find('ul').length) {
         $(item).find('> a').click( function(event) {
            $(item).find('> ul').toggleClass('is-hidden is-visible'); 

          });
        }
      });
    },
    indent: function(options){
      var indent = options.indent;
      $.each(this.elements.list.children, function(index, list){
        var depth = $(list).parents('ul').length;
        $(list).css({'padding-left' : (depth * indent) });
      });
    },
    classes: function(options){
      $.each(this.elements.list.children, function(index, list){
        var depth = $(list).parents('ul').length;
        $(list).addClass('child');
        $(list).addClass('level-' + depth);
      });
    }
  }
  $.fn.tree = function( method ) {
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tree' );
      }    
  };  
})(jQuery);