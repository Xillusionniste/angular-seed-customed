angular.module('TemplateController',['ngMaterial', 'directives', 'services'])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $menu) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.sidenavState = false;
    var id_given = [];

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    function newID(){
      var idGivenLength = id_given.length;
      id_given.push(idGivenLength);
      return idGivenLength;
    }

    function recursiveCreateMenu(tree, parent){
      var result;
      var object =  {
          "name": '',
          "id": -1,
          "parent": -1,
          "selected": true,
          "subList": []
        }
        var currentNode = null;
        for(var i = 0; i < tree.length; i++){
          currentNode = tree[i];
          currentNode.id = newID();
          currentNode.parent = parent;
          currentNode.selected = false;
          if(currentNode.subList){
            recursiveCreateMenu(currentNode.subList, currentNode.id);
          }
        }
    }

        
    /********************************/
    /*                              */ 
    /*  WRITE YOUR MENU RIGHT HERE  */
    /*                              */
    /********************************/
    $scope.userMenu =
    [{
        "name": "menu", //Don't touch that item
        "subList":
            [{
              "name": "Recherche", //Start your first menu level here
              "subList": 
                  [{
                    "name": "boutons",
                    "subList": 
                        [{
                          "name": "rond",
                          "subList": []
                        },
                        {
                          "name": "carré",
                          "subList": []
                        }]
                  },
                  {
                    "name": "navbar",
                    "subList": 
                        [{
                          "name": "ouvrante",
                          "subList": []
                        },
                        {
                          "name": "lockée",
                          "subList": []
                        }]                           
                  }]
            },
            {
              "name": "Autre",
              "subList": 
                  [{
                    "name": "logs",
                    "subList": []
                  },
                  {
                    "name": "theming",
                    "subList": 
                        [{
                          "name": "css",
                          "subList": []
                        },
                        {
                          "name": "color palette",
                          "subList": 
                              [{
                                "name": "bleu",
                                "subList": []
                              },
                              {
                                "name": "rouge",
                                "subList": []
                              },
                              {
                                "name": "vert",
                                "subList": []
                              },
                              {
                                "name": "jaune",
                                "subList": []
                              },
                              {
                                "name": "indigo",
                                "subList": []
                              }]    
                        }]    
                  }]
            }]
      }];
    recursiveCreateMenu($scope.userMenu, -1);
    $menu.setMenu($scope.userMenu);
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  });


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/