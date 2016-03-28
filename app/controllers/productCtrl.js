angular.module("Store")
.controller("productCtrl",
	function($scope, $rootScope, $routeParams, $sessionStorage){

        var setProductToSession = function(data) {
            $sessionStorage.prod = {};
            $sessionStorage.prod = data;
        }

        var getProductFromSession = function(){
            if(angular.isDefined($sessionStorage.prod)){ 
                return $sessionStorage.prod;
            } else {
                return {};
            }
        }

        if(angular.isDefined($rootScope.model) && 
              angular.isDefined($rootScope.model[$routeParams.productId])){
            setProductToSession($rootScope.model[$routeParams.productId]);
        }

        $scope.product = getProductFromSession();
        $scope.mainImageUrl = $scope.product.imgSrc;

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }

        $scope.addCart = function(product){
            $rootScope.$broadcast("onAddCart", product);
        }
	}
);