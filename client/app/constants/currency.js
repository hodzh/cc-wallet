(function(angular, undefined) {
  angular.module("walleApp.constants", [])

.constant("bitcoin", {
	"name": "bitcoin",
	"decimal": 8,
	"description": "Bitcoin"
})

.constant("litecoin", {
	"name": "litecoin",
	"decimal": 8,
	"description": "Litecoin"
})

.constant("dogecoin", {
	"name": "dogecoin",
	"decimal": 8,
	"description": "Dogecoin"
})

;
})(angular);