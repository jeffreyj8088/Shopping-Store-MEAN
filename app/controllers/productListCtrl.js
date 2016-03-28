angular.module("Store")
.controller('productListCtrl',
	function($scope, $rootScope, $filter, productsFactory){
		var selectedCategory = null;
		$scope.data = {};
        $scope.data.products = [];
        productsFactory.getProducts().success(function(data) { 
            $scope.data.products = data.results;
            $rootScope.model = dataToHash(data.results);
        });
        dataToHash = function(data){
            var tmpData = {};
            for(var i=0;i<data.length;i++){
                tmpData[data[i].objectId] = data[i];
            }
            return tmpData;
        }
		$scope.categorySelect = function(category){
			selectedCategory = category;
		}

		$scope.categoryFilter = function(product){
			return product.category == selectedCategory || selectedCategory == null;
		}

		$scope.addCart = function(product){
			$rootScope.$broadcast("onAddCart", product);
		}
	}
);