define([
    './Module',
	'underscore'
], function(module, _) {
    return module.filter('sortFiles', function() {
        return function(items, field, reverse) {
			//debugger;
			if(field == null)
				return items;
			var output = _.sortBy(items, field);
			if(reverse)
				output = output.reverse();
			return output;
        };
    });
});
