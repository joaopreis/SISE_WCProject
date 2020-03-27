var app = angular.module('inSureApp', []);
app.controller('inSureCtrl', function ($scope, $http) {
    $scope.appstatus = "main";
    $scope.product = {
        product: "",
        value: "",
        brand: "",
        model: "",
        year: "",
    };

    $scope.candidate = {
        name: "",
        email: "",
        nif: "",
    };

    $scope.resetForm = function () {
        document.getElementById("insureAutoForm").reset();
        document.getElementById("insureCandidateForm").reset();
    }


    $scope.validate = function () {
        return ($scope.inSureCandidateQRForm.name.$dirty && $scope.inSureCandidateQRForm.name.$invalid) ||
            ($scope.inSureCandidateQRForm.email.$dirty && $scope.inSureCandidateQRForm.email.$invalid) ||
            ($scope.inSureCandidateQRForm.nif.$dirty && $scope.inSureCandidateQRForm.nif.$invalid) ||
            ($scope.inSureCandidateQRForm.name.$viewValue == '') ||
            ($scope.inSureCandidateQRForm.email.$viewValue == '') || ($scope.inSureCandidateQRForm.nif.$viewValue == '')
            || ($scope.inSureAutoQRForm.value.$dirty && $scope.inSureAutoQRForm.value.$invalid) || ($scope.inSureAutoQRForm.year.$dirty && $scope.inSureAutoQRForm.year.$invalid) ||
            ($scope.inSureAutoQRForm.value.$viewValue == '') || ($scope.inSureAutoQRForm.brands.$viewValue == null) || ($scope.inSureAutoQRForm.models.$viewValue == null)
            || ($scope.inSureAutoQRForm.year.$viewValue == '') || ($scope.inSureAutoQRForm.product.$viewValue == null)
    };

    $scope.brands = [];
    $scope.getBrandsData = function () {
        $http.get('http://localhost:8080/brands').then(function (response) {
            $scope.brands = response.data;
        }, function (error) {
            $scope.brands = ['Error! Could not access database.']
        })
    };
    $scope.getBrandsData();

    $scope.models = ['Trying to get data'];
    $scope.getModelsData = function () {
        var brand_id = $scope.brands.findIndex(brand => brand.name == $scope.product.brand);
        $http.get('http://localhost:8080/models?id=' + brand_id).then(function (response) {
            $scope.models = response.data
        }, function (error) {
            $scope.models = ['Error! Could not access database.']
        })
    };

    $scope.products = ['Trying to get data'];
    $scope.getProductsData = function () {
        $http.get('http://localhost:8080/products').then(function (response) {
            $scope.products = response.data
        }, function (error) {
            $scope.products = ['Error! Could not access database.']
        })
    };
    $scope.getProductsData();

    $scope.descritpion = "";
    $scope.getDescriptionData = function () {
        var pos = $scope.products.findIndex(p => p.name == $scope.product.product)
        $scope.description = $scope.products[pos].descr
    };



})