angular.module('directives',['ngMaterial', 'services'])
  .directive('menuSuperCool', function($menu){
    return {
      templateUrl: 'app/partials/menuItem.html',
      scope : {
      },
      link: function(scope, element, attrs){
        //console.log("Yeaaahh", $menu.getMenu()[0].subList);
        //On passe directement la subList de plus haut niveau : ce qu'on veut afficher !
        scope.menuList = $menu.getMenu()[0].subList;
        scope.breadCrum = [];

        scope.replaceWithSubList = function(item){
              var menu = $menu.getMenu()[0],
                  breadCrumObject =  {
                                        "name": "",
                                        "id": -1
                                      };
              breadCrumObject.name = scope.findNode(item.id, menu).name;
              breadCrumObject.id   = scope.findNode(item.id, menu).id;
              scope.breadCrum.push(breadCrumObject);
              console.log("breadCrum", scope.breadCrum);
              scope.menuList = item.subList;
        };

        scope.replaceWithParentList = function(item){
          //Récupère l'ID du parent
          var id_parent = item.parent,
              menu = $menu.getMenu()[0],
              finalMenuToDisplay = [],
              foundItem;
          scope.breadCrum.splice(scope.breadCrum.length-1,1);
          console.log("breadCrum", scope.breadCrum);
          //Récupère le parent
          id_parent_parent = scope.findNode(id_parent, menu).parent;
/*          console.log("id_parent_parent =", id_parent_parent);
*/          /*Si l'élément de menu n'est pas déjà présent dans le menu à afficher, 
          alors on l'ajoute*/
          foundItem = scope.findParentNode(id_parent_parent, menu, finalMenuToDisplay);
          while (foundItem != false){
                finalMenuToDisplay.push(foundItem);
                foundItem = scope.findParentNode(id_parent_parent, menu, finalMenuToDisplay);
          }
          /*console.log("finalMenuToDisplay-->",finalMenuToDisplay);*/
          /*************** FINAL *******************/
          scope.menuList = finalMenuToDisplay;
          /*****************************************/
        };

        /******************************************/
        /*
        /* Quand on clique dans le breadCrum
        /*
        /******************************************/
        scope.goBackItem = function(breadCrumIndex){
          var menu = $menu.getMenu()[0];
          var item_found = false;
          var i = 0, item_index;
          var foundNode = scope.findNode(scope.breadCrum[breadCrumIndex].id, menu);
          if (breadCrumIndex != scope.breadCrum.length-1){
            scope.replaceWithSubList(foundNode);
            while ((!item_found) && (i<scope.breadCrum.length)) {
              if (scope.breadCrum[i].name == foundNode.name) {
                item_index = i; item_found = true;}
              i++;
            }
            scope.breadCrum.splice(item_index, scope.breadCrum.length - item_index -1);
          }
        };

        scope.goBackToMenu = function(){
          scope.menuList = $menu.getMenu()[0].subList;
          scope.breadCrum = [];
        }

        /**************************************/
        /*  Vérifie l'existence d'un élément
        /*  dans le menu en train d'être
        /*  construit
        /**************************************/
        scope.isItemExisting = function(item, table){
          /*console.log(item, table);*/
          for (var i = 0; i < table.length; i++){
            if (table[i].id == item.id) {return true;}
          }
          return false;
        };

        /**************************************/
        /*  Trouve un noeud en fonction de son
        /*  id (en partant de la racine de
        /*  l'arborescence)
        /**************************************/
        scope.findNode = function(id_parent, currentNode) {
          var i, result;
          if (id_parent == currentNode.id) {
              return currentNode;
          } else {

              // Use a for loop instead of forEach to avoid nested functions
              // Otherwise "return" will not work properly
              for (i = 0; i < currentNode.subList.length; i++) {
                  // Search in the current child
                  result = scope.findNode(id_parent, currentNode.subList[i]);

                  // Return the result if the node has been found
                  if (result !== false) {
                      return result;
                  }
              }

              // The node has not been found and we have no more options
              return false;
          }
        };

        /**************************************/
        /*  Trouve un noeud en fonction de
        /*  l'id de son parent
        /**************************************/
        scope.findParentNode = function(id_parent_parent, currentNode, menu_being_built) {
          var i, result;
          /*console.log("in findParent Node", menu_being_built);*/
          if ((id_parent_parent == currentNode.parent) 
                && (!scope.isItemExisting(currentNode, menu_being_built))) {
              return currentNode;
          } else {

              // Use a for loop instead of forEach to avoid nested functions
              // Otherwise "return" will not work properly
              for (i = 0; i < currentNode.subList.length; i++) {
                  // Search in the current child
                  result = scope.findParentNode(id_parent_parent, currentNode.subList[i],menu_being_built);

                  // Return the result if the node has been found
                  if (result !== false) {
                      return result;
                  }
              }

              // The node has not been found and we have no more options
              return false;
          }
        };
      }
    }
  });
