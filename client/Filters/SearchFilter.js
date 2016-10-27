define([
    './Module'
], function(module) {
    return module.filter('searchFiles', function() {
        return function(items, search) {
			//debugger;
			if(search === "")
				return items;
			var output = [];
			for(var i = 0; i < items.length; i++)
				if(items[i].name.search(search) != -1)
					output.push(items[i]);
			return output;
        };
    });
});
