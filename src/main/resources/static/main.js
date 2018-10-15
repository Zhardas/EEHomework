var app = angular.module('myApp', []);
app.controller('eeController', function ($scope, $http) {
    $scope.infoStyle = {'display': 'none'};
    $scope.eeData = [];

    var idCounter = 2;
    $scope.edit = function (id) {
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData[i].id === id) {
                $scope.infoEdit = iterationCopy($scope.eeData[i]);
                break;
            }
        }
        $scope.infoStyle = {'display': 'block'};
    };

    $scope.add = function () {
        idCounter++;
        $scope.infoEdit = {};
        $scope.infoEdit.id = idCounter;
        $scope.infoStyle = {'display': 'block'};
    };

    $scope.remove = function (id) {
        $http.delete("users/" + id).then(function (response) {
            $scope.refreshUsers();
        });
    };

    $scope.save = function () {
        if (!isValid()) return;
        $scope.infoStyle = {'display': 'none'};
        var userInfo = $scope.infoEdit;
        $scope.infoEdit = {};
        var date = userInfo.dateOfBirth;
        userInfo.dateOfBirth = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
        $http.post("users/", JSON.stringify(userInfo)).then(function () {
            $scope.refreshUsers();
        });
    };

    function isValid() {
        for (var prop in $scope.infoEdit) {
            if ($scope.infoEdit.hasOwnProperty(prop)) {
                if ($scope.infoEdit[prop] === undefined || $scope.infoEdit[prop] === "") {
                    alert("Palun täitke kõik väljad!");
                    return false;
                }
            }
        }
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData.firstName === $scope.infoEdit.firstName && $scope.eeData.lastName === $scope.infoEdit.lastName) {
                alert("Isik on juba süsteemis olemas!");
                return false;
            }
        }
        if (!isValidEmail($scope.infoEdit.email)) {
            alert("Palun sisestage korrektne email aadress!");
            return false;
        }
        if ($scope.infoEdit.dateOfBirth >= Date.now()) {
            alert("Palun sisestage korrektne sünnikuupäev!");
            return false;
        }
        return true;
    }

    // Sorting and filtering
    $scope.sortType = 'firstName';
    $scope.sortReverse = false;
    $scope.search = '';     // set the default search/filter term
    $scope.hints = [];

    $scope.sort = function (type) {
        if ($scope.sortType === type) {
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortType = type;
            $scope.sortReverse = false;
        }
    };

    $scope.refreshHints = function () {
        $scope.hints = [];
        for (var i = 0; i < $scope.eeData.length; i++) {
            $scope.hints.push($scope.eeData[i].firstName);
            $scope.hints.push($scope.eeData[i].lastName);
            $scope.hints.push($scope.eeData[i].email);
            $scope.hints.push($scope.eeData[i].address);
        }
        console.log($scope.hints);
    };

    $scope.refreshUsers = function () {
        $http.get("users/")
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var bDate = response.data[i].dateOfBirth;
                    response.data[i].dateOfBirth = new Date(bDate.year, bDate.month - 1, bDate.day);
                }
                $scope.eeData = response.data;
                $scope.refreshHints();
            })
    };

    $scope.refreshUsers();
}).directive("autoComplete", function () {
    return function (scope, element, attrs) {
        element.autocomplete({
            source: scope.hints
        });
    };
});

function iterationCopy(src) {
    var target = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            target[prop] = src[prop];
        }
    }
    return target;
}

function isValidEmail(email) {
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    var result = email_regex.exec(email);
    return result !== null && result.length === 1;
}