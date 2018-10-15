var app = angular.module('myApp', []);
app.controller('eeController', function ($scope, $http) {
    $scope.infoStyle = {'display': 'none'};
    $scope.eeData = []; // User data

    // Displays user editor with selected user data
    $scope.edit = function (id) {
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData[i].id === id) {
                $scope.infoEdit = iterationCopy($scope.eeData[i]);
                break;
            }
        }
        $scope.infoStyle = {'display': 'block'};
    };

    // Displays user editor
    $scope.add = function () {
        $scope.infoEdit = {};
        $scope.infoEdit.id = -1;
        $scope.infoStyle = {'display': 'block'};
    };

    // Remove user by id
    $scope.remove = function (id) {
        $http.delete("users/" + id).then(function (response) {
            $scope.refreshUsers();
        });
    };

    // Add or update the currently edited user.
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

    // Checks if all fields are valid in editor
    function isValid() {
        // Check if fields are empty
        for (var prop in $scope.infoEdit) {
            if ($scope.infoEdit.hasOwnProperty(prop)) {
                if ($scope.infoEdit[prop] === undefined || $scope.infoEdit[prop] === "") {
                    alert("Palun täitke kõik väljad!");
                    return false;
                }
            }
        }

        // Check if user with the same name already exists
        for (var i = 0; i < $scope.eeData.length; i++) {
            if ($scope.eeData[i].id === $scope.infoEdit.id) continue;
            if ($scope.eeData[i].firstName.toLowerCase() === $scope.infoEdit.firstName.toLowerCase() && $scope.eeData[i].lastName.toLowerCase() === $scope.infoEdit.lastName.toLowerCase()) {
                alert("Isik on süsteemis juba olemas!");
                return false;
            }
        }

        // Check if email address is valid
        if (!isValidEmail($scope.infoEdit.email)) {
            alert("Palun sisestage korrektne email aadress!");
            return false;
        }

        // Check if date of birth is in the future
        if ($scope.infoEdit.dateOfBirth >= Date.now()) {
            alert("Palun sisestage korrektne sünnikuupäev!");
            return false;
        }
        return true;
    }

    // Sorting and filtering
    $scope.sortType = 'firstName';  // Field to be sorted by
    $scope.sortDescending = false;  // Is sort order descending
    $scope.search = '';             // Search/filter term
    $scope.hints = [];              // Auto-complete hints

    // Changes the field to be sorted by. If that field is already used for sorting, reverse the order.
    $scope.sort = function (type) {
        if ($scope.sortType === type) {
            $scope.sortDescending = !$scope.sortDescending;
        } else {
            $scope.sortType = type;
            $scope.sortDescending = false;
        }
    };

    // Enumerate search auto-complete hints.
    $scope.refreshHints = function () {
        $scope.hints.length = 0;
        for (var i = 0; i < $scope.eeData.length; i++) {
            $scope.hints.push($scope.eeData[i].firstName);
            $scope.hints.push($scope.eeData[i].lastName);
            $scope.hints.push($scope.eeData[i].email);
            $scope.hints.push($scope.eeData[i].address);
        }
    };

    // Get users from the backend.
    $scope.refreshUsers = function () {
        $http.get("users/")
            .then(function (response) {
                $scope.eeData.length = 0;
                for (var i = 0; i < response.data.length; i++) {
                    var bDate = response.data[i].dateOfBirth;
                    response.data[i].dateOfBirth = new Date(bDate.year, bDate.month - 1, bDate.day);
                    $scope.eeData.push(response.data[i]);
                }
                $scope.refreshHints();
            })
    };

    // Do the initial user refresh.
    $scope.refreshUsers();
}).directive("autoComplete", function () { // Provides auto-complete functionality
    return function (scope, element, attrs) {
        element.autocomplete({
            source: scope.hints
        });
    };
});

// Copies an object by reference.
function iterationCopy(src) {
    var target = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            target[prop] = src[prop];
        }
    }
    return target;
}

// Check if email is valid.
function isValidEmail(email) {
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    var result = email_regex.exec(email);
    return result !== null && result.length === 1;
}