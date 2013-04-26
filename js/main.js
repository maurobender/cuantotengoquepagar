(function($) {
	window.CurrencyCalc = function CurrencyCalc(options) {
		this._defaults = {
			currencies: {
				from: 'USD',
				to  : 'ARS'
			}
		};
		
		this.init(options);
	}
	
	$.extend(CurrencyCalc.prototype, CurrencyCalc, {
		valid_currencies: ['USD', 'GBP', 'EUR', 'ARS'],
		options : {},
		
		init: function(options) {
			$.extend(this.options, this._defaults, options);
		},
		
		calculate: function(callback, amount, c_from, c_to) {
			if(c_from != undefined && !valid(c_from))
				throw 'La moneda desde la que se va a convertir no es válida.';
			
			if(c_to != undefined && !valid(c_to))
				throw 'La moneda a la que se va a convertir no es válida.';
			
			c_from = c_from || this.options.currencies.from;
			c_to   = c_to   || this.options.currencies.to;
			
			var data = 'hl=es&q=' + amount + c_from + '=?' + c_to;
			
			$.get(
				'http://www.google.com/ig/calculator',
				data,
				function(data, textStatus, jqXHR) {
					console.log(data);
				},
				'json'
			);
		},
		
		valid: function(currency) {
			return this.valid_currencies.indexOf(currency) != -1
		}
	});
})(jQuery);

jQuery(function($) {
	$('form#converter').submit(function(e) {
		e.preventDefault();
		
		var amount = $(this).find('input[name=amount]').val();
		var c_from = $(this).find('select[name=currency]').val();
		var c_to   = 'ARS';
		
		console.log(c_from);
		
		if(amount.length == 0 || !/^-?\d*(\.\d+)?$/.test(amount)) {
			$(this).find('input[name=amount]').closest('.control-group').addClass('error');
		} else {
			$(this).find('input[name=amount]').closest('.control-group').removeClass('error');
			
			var result = fx(amount).from(c_from).to(c_to);
			
			$('#result').text(result);
			$('#result-container').fadeIn();
		}
	});
});
