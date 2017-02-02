/**
 * Created by vilin on 1/29/2017.
 */
angular.module('app')
    .factory('dataFactory', ['$http', function($http) {
        
        var urlBase = 'http://www.showme.com/api/explore/recommended?topic=all';
        var dataFactory = {};
        var featuredPeopleObj = {};
        dataFactory.getFeaturedPeople = function () {
            $http.get(urlBase)
                .then (function(data){
                    featuredPeopleObj =  data.data.data[1];
                });
            return featuredPeopleObj;
        };
        
         return dataFactory;
    }]);