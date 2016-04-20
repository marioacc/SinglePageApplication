var app = angular.module("spa", ["ngResource", "ngRoute"]);

app.factory("employeeService", function ($resource) {
    return $resource("/api/Employees/:id", 
        {id:"@id"},
        {
            update: { method: "PUT" },
            save: {method:"POST"}
        });
});



app.factory("departmentService", function ($resource) {
    return $resource("/api/departments/:id",
        { id: "@id" },
        {
            update: { method: "PUT" }
        });
});

app.controller("mainController", function ($scope) {
    
});

app.controller("employeeController", function ($scope, employeeService, departmentService) {
    $scope.employees = employeeService.query();

    $scope.employee = {
        Id: 0,
        Name: "",
        Position: "",
        DepartmentId:0
        
    };
    $scope.deleteEmployee = function (dpmt) {
        employeeService.remove(dpmt, $scope.refreshData);
    }

    $scope.refreshData = function () {
        $scope.employees = employeeService.query();
    }

    $scope.showDialog = function () {
        $("#modal-dialog").modal("show");
    }

    $scope.saveEmployee = function () {     
        employeeService.save($scope.employee, $scope.refreshData);
        $("#modal-dialog").modal("hide");
        $scope.ClearCurrentEmployee();
    }

    $scope.departments = departmentService.query();

    $scope.ClearCurrentEmployee = function () {
        $scope.employee = {
            Id: 0,
            Name: "",
            Position: "",
            DepartmentId: 0,

        };
    };
});


app.controller("departmentController", function ($scope, departmentService) {
    $scope.departments = departmentService.query();

    $scope.department = {
        Id:0,
        Name:""
    };
    $scope.deleteDepartment = function (dpmt) {
        departmentService.remove(dpmt, $scope.refreshData);
    }

    $scope.refreshData = function () {
        $scope.departments = departmentService.query();
    }

    $scope.showDialog = function () {
        $("#modal-dialog").modal("show");
    }

    $scope.saveDepartment = function () {
        departmentService.save($scope.department, $scope.refreshData);
        $("#modal-dialog").modal("hide");
        $scope.ClearCurrentDepartment();
    }

    $scope.ClearCurrentDepartment = function () {
        $scope.department = {
            Id: 0,
            Name: ""
        };
    };

});



app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller:"mainController"
        }).when("/employees", {
            templateUrl: "/Content/Views/Employees.html",
            controller: "employeeController"
        }).when("/departments", {
            templateUrl: "/Content/Views/Departments.html",
            controller: "departmentController"
        });
});