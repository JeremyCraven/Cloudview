define
    './Module'
], function(module) {
    return module.filter('parentFolder', function() {
        return function(items, numLvl) {
            var filtered = {
				list:	[],
				cutoff: true
			};
			if(numLvl > items.legth) {
				filtered.cutoff = false;
				filtered.list = items;
				return filtered;
			}
			var smeti = items.reverse();
			for(var i=0; i<numLvl; i++) {
				filtered.list.push(smeti[i]);
			}
			filtered.list = filtered.lists.reverse();
            return filtered;
        };
    });
});
