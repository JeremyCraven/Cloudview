define(['Application', 'angular', 'ngMocks'], function(app, ng, mocks) {
    describe('testing SelectedAccounts Filter', function() {
        beforeEach(module('CloudView'));

        var $filter;

        beforeEach(inject(function(_$filter_) {
            $filter = _$filter_('selectedAccounts');
        }));

        describe('form validation', function() {
			var accounts, items;
			beforeEach(function() {
				accounts = [{
                    type: 'Google',
                    username: 'john.doe123@googlemail.com',
                    active: true,
                    space: {
                        used: 1024,
                        available: 15 * 1024 * 1024 * 1024
                    }
                }, {
                    type: 'Google',
                    username: 'John.Doe@work.com',
                    active: true,
                    space: {
                        used: 960 * 1024 * 1024,
                        available: 5 * 1024 * 1024 * 1024
                    }
                }, {
                    type: 'Dropbox',
                    username: 'john.doe123',
                    active: false,
                    space: {
                        used: 14.5 * 1024 * 1024 * 1024,
                        available: 15 * 1024 * 1024 * 1024
                    }
                }];
				items = [];
				for (var i = 0; i < 100; i++) {
	                items.push({
	                    name: 'File  ' + (i + 1),
	                    type: 'word',
	                    account: i % accounts.length,
						pid: i
	                });
	            }
			})
            it('None should be filtered', function() {
				for(var i = 0; i < accounts.length; i++)
					accounts[i].active = true;
				var result = $filter(items, accounts);
                expect(result).toEqual(items);
            });
            it('NONE SHALL PASS!', function() {
				for(var i = 0; i < accounts.length; i++)
					accounts[i].active = false;
				var result = $filter(items, accounts);
                expect(result).toEqual([]);
            });
            /*it('Only some', function() {

            });*/
			it('Only middle', function() {
				for(var i = 0; i < accounts.length; i++)
					if(i == 0 || i == (accounts.length - 1))
						accounts[i].active = false;
					else
						accounts[i].active = true;
				var result = $filter(items, accounts);
                for(var i = 0; i < result.length; i++)
					expect(result[i].account > 0 || result[i].account < (accounts.length - 1)).toBe(true);
            });
			it('Only Corners', function() {
				for(var i = 0; i < accounts.length; i++)
					if(i == 0 || i == (accounts.length - 1))
						accounts[i].active = true;
					else
						accounts[i].active = false;
				var result = $filter(items, accounts);
                for(var i = 0; i < result.length; i++)
					expect(result[i].account == 0 || result[i].account == (accounts.length - 1)).toBe(true);
            });
        });
    });
});
