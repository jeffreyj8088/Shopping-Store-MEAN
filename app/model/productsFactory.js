angular.module("Store")
.constant("dataUrl", "https://api.parse.com/1/classes/Cloths")
.constant("orderUrl", "https://api.parse.com/1/classes/ClothOrders")
.run(function ($http) {
    $http.defaults.headers.common["X-Parse-Application-Id"] = 
			"sCJQ3nlIsUSfAYgP8U7QaW7yBx1gQaQf11KnUNG8";
    $http.defaults.headers.common["X-Parse-REST-API-Key"] = 
			"cSC2xCrmKIEhVWfYa4JONLlURGD5eDNrcIMtbO9R";
})
.factory('productsFactory',function($http, dataUrl, orderUrl){
		var products = {};

		products.getProducts = function(){
			return $http.get(dataUrl);
		}

		products.sendOrder = function (shipdata) {
            return $http.post(orderUrl,shipdata);
        }

		return products;
	});