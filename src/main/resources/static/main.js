var app = angular.module('myApp', []);
app.controller('eeController', function ($scope) {
    $scope.infoStyle = {'display': 'none'};
    $scope.eeData = [];
    $scope.eeData.push({
        "id": 0,
        "firstName": "Ain",
        "lastName": "Kala",
        "dateOfBirth": new Date(1900, 0, 11),
        "email": "ain.kala@gmail.com",
        "address": "Viiralti 13 Tallinn"
    });
    $scope.eeData.push({
        "id": 1,
        "firstName": "Siiru",
        "lastName": "Viiru",
        "dateOfBirth": new Date(1980, 0, 11),
        "email": "siiru.viiru@gmail.com",
        "address": "Soo 10 Tallinn"
    });
    $scope.eeData.push({
        "id": 2,
        "firstName": "Heli",
        "lastName": "Kopter",
        "dateOfBirth": new Date(1907, 7, 14),
        "email": "heli.kopter@gmail.com",
        "address": "Prantsusmaa"
    });
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
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData[i].id === id) {
                $scope.eeData.splice(i, 1);
                return;
            }
        }
    };

    $scope.save = function () {
        if (!isValid()) return;
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData[i].id === $scope.infoEdit.id) {
                $scope.eeData[i] = $scope.infoEdit;
                $scope.infoStyle = {'display': 'none'};
                return;
            }
        }
        $scope.eeData.push($scope.infoEdit);
        $scope.infoStyle = {'display': 'none'};
    };

    function isValid() {
        for (var prop in $scope.infoEdit) {
            if ($scope.infoEdit.hasOwnProperty(prop)) {
                console.log(prop);
                console.log($scope.infoEdit[prop]);
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