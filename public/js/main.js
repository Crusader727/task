let app = angular.module('app', []);
app.controller('DataCtrl', DataCtrl);
app.filter('myFilter', myFilter);

function DataCtrl($scope, $http, $filter) {
    let tableData = [];
    $http.get("./js/data.json")
        .then((response) => {
            $scope.items = response.data.arr;
            tableData = response.data.arr;
            $scope.utils = {
                currentpage: 1,
                pagearray: []
            };
            $filter.filteredCount = tableData.length;
            $scope.paging($scope.utils.currentpage);
        });

    $scope.paging = (current) => {

        $scope.utils.pagearray = [];
        let totalpages = 1;
        if ($scope.dataCount != '') {
            totalpages = Math.ceil($filter.filteredCount / $scope.dataCount);
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


function myFilter($filter) {
    function greaterThanForDate(item, val) {
        if (val === undefined) {
            return true;
        }
        return new Date(item.Created) > val;
    }

    function statusFilter(item, val) {
        if (val === 'Все') {
            return true;
        }
        if (val === 'Открытые задачи') {
            return item.Status
        } else {
            return !item.Status
        }
    }

    return (items, scope) => {
        if (items != undefined) {
            let filtered = []
            let nameFiltered = $filter('filter')(items, { Name: scope.searchValue });
            nameFiltered.forEach((item) => {
                if (greaterThanForDate(item, scope.dateValue) && statusFilter(item, scope.selectedStatusValue)) {
                    filtered.push(item)
                }
            })
            $filter.filteredCount = filtered.length;
            scope.paging(1);
            return filtered;
        }
    };
}