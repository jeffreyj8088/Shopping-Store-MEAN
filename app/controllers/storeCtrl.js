angular.module("Store")
.controller("storeCtrl",
	function($scope, $sessionStorage, $location, productsFactory){
		var cart = {
			details:{},
			items:0,
			price:0
		};

		$scope.doTheBack = function(){
			window.history.back();
		}

		$scope.go = function (path) {
		  $location.path(path);
		}

		$scope.$on('onAddCart',function(event,args){
			$scope.updateCart(args);
		});

		var setDataToSession = function(data){
	        $sessionStorage.data = {};
	        $sessionStorage.data = data;
	    }

	    var getDataFromSession = function(){
	        if(angular.isDefined($sessionStorage.data)){ 
	            return $sessionStorage.data;
	        } else {
	            return cart;
	        }
	        
	    }

	    $scope.cartDetails = getDataFromSession().details;

	    $scope.cartTotal = function() {
	    	cart = getDataFromSession();
	    	return cart.items;
	    }

	    $scope.cartPrice = function() {
	    	cart = getDataFromSession();
	    	return cart.price;
	    }

		$scope.updateCart = function(product){
			cart.items++;
			cart.price += product.price;
			if(angular.isDefined(cart.details) &&  
					angular.isDefined(cart.details[product.objectId])){
				cart.details[product.objectId].total += 1;
			}else{
				cart.details[product.objectId] = {
					objectId: product.objectId,
					name : product.name,
					price : product.price,
					total : 1,
					imgSrc : product.imgSrc
				}
			}
			$scope.cartDetails = cart.details;	
			setDataToSession(cart);
		}

		$scope.deleteCart = function(product){
			delete cart.details[product.objectId];
			cart.items -= product.total;
			cart.price -= product.total * product.price;
			$scope.cartDetails = cart.details;	
			setDataToSession(cart);
		}

		$scope.emptyCart = function(){
            cart.items = 0;
            cart.price = 0;
            cart.details = {};
            $scope.cartDetails = {};
            setDataToSession(cart);
        }
        
		$scope.updateItems = function(product){
			var totalItems = 0;
			var totalPrice = 0;
			for(var product in cart.details){
				totalItems += cart.details[product].total;
				totalPrice += cart.details[product].total * cart.details[product].price;
			}
			cart.items = totalItems;
			cart.price = totalPrice;
			$scope.cartDetails = cart.details;	
			setDataToSession(cart);		
		}

		$scope.shipData = {};
		$scope.checkoutOrder = function (shippingDetails) {
		 	var order = angular.copy(shippingDetails);
            order.products = getDataFromSession().details;
            productsFactory.sendOrder(order)
            .success(function (data) {
            	$scope.shipData.orderId = data.objectId;
                $scope.emptyCart();
            })
            .error(function (error) {
                    $scope.shipData.orderError = error;
                }).finally(function () {
                    $location.path("/complete");
                });
		}

	}
);