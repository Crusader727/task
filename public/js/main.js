let app = angular.module('app', []);
app.controller('DataCtrl', DataCtrl);


function DataCtrl($scope, $http) {
    let tableData = [];
    $http.get("./js/data.json")
        .then((response) => {
            $scope.items = response.data.arr;
            tableData = response.data.arr;
            $scope.utils = {
                currentpage: 1,
                pagearray: []
            };
            $scope.paging($scope.utils.currentpage);
        });
    $scope.greaterThanForDate = (prop, val) => {
        return (item) => {
            if (val === undefined) {
                return true;
            }
            return new Date(item[prop]) > val;
        }
    }
    $scope.statusFilter = (prop, val) => {
        return (item) => {
            if (val === 'Все') {
                return true;
            }
            if (val === 'Открытые задачи') {
                return item[prop]
            } else {
                return !item[prop]
            }
        }
    }


    $scope.paging = (current) => {

        $scope.utils.pagearray = [];
        let totalpages = 1;
        if ($scope.dataCount != '') {
            totalpages = Math.ceil(tableData.length / $scope.dataCount);
        }

        if (totalpages <= 5) {
            for (let i = 1; i <= totalpages; i++)
                $scope.utils.pagearray.push(i);
        }

        if (totalpages > 5) {
            if (current <= 3) {
                for (let i = 1; i <= 5; i++)
                    $scope.utils.pagearray.push(i);

                $scope.utils.pagearray.push('...');
                $scope.utils.pagearray.push(totalpages);
            } else if (totalpages - current <= 3) {
                $scope.utils.pagearray.push(1);
                $scope.utils.pagearray.push('..');
                for (let i = totalpages - 4; i <= totalpages; i++)
                    $scope.utils.pagearray.push(i);
            } else {
                $scope.utils.pagearray.push(1);
                $scope.utils.pagearray.push('..');
                for (let i = current - 2; i <= current + 2; i++)
                    $scope.utils.pagearray.push(i);
                $scope.utils.pagearray.push('...');
                $scope.utils.pagearray.push(totalpages);
            }
        }
    }
}