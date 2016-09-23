define([
    './Module'
], function(module) {
    return module.filter('selectedAccounts', function() {
        return function(items, accounts) {
			function filter() {
				var filtered = [];
				angular.forEach(items, function(key, value) {
					if(accounts[key.account].active)
						filtered.push(key);
				});
				return filtered;
			}
			function noactive_test() {
				for(var i = 0; i < accounts.length; i++) {
					if(accounts[i].active) {
						return filter();
					}
				}
				return [];
			}
			function allactive_test() {
				for(var i = 0; i < accounts.length; i++) {
					if(!accounts[i].active) {
						if(i > 0)
							return filter();
						else
							return noactive_test();
					}
				}
	            return items;
			}
			return allactive_test();
        };
    });
});
