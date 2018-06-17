let app = angular.module('app', []);
app.controller('DataCtrl', DataCtrl);



let tableData = [];

function DataCtrl($scope, $http) {
    $http.get("./js/data.json")
        .then(function(response) {
            $scope.items = response.data.arr;
            tableData = response.data.arr;
        });
}