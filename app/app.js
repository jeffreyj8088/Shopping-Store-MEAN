var storeApp = angular.module('Store',['storeFilters','ngRoute','ngStorage']);

storeApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/products',{
            templateUrl:'views/productList.html',
            controller:'productListCtrl'
        }).
        when('/product/:productId',{
            templateUrl:'views/product.html',
            controller:'productCtrl'
        }).
        when('/product',{
            templateUrl:'views/product.html',
            controller:'productCtrl'
        }).
        when('/basket',{
            templateUrl:'views/basket.html',
            controller:'basketCtrl'
        }).
        when('/checkout',{
            templateUrl:'views/checkout.html',
            controller:'checkoutCtrl'
        }).
        when("/complete", {
            templateUrl: "/views/thankYou.html"
        }).
        otherwise({
            redirectTo:'products'
        });
}]);