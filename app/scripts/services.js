angular.module('services',[])
  .service('$menu', function(){
    
    var menu = [{}];

    return {
      setMenu : function(memenu){
        menu = memenu;
      },
      getMenu : function(){
        return menu;
      }
    }
  });
