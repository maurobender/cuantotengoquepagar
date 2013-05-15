function round(val, dec) {
	dec = dec || 0;
	
	var mul = Math.pow(10, dec);
	val = Math.round(val * mul);
	val = val / mul;
	
	return val;
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

jQuery(function($) {
	$('form#cuanto-tengo-que-pagar-form').submit(function(e) {
		e.preventDefault();
		
		if(_gaq)
			_gaq.push(['_trackEvent', 'Calculadora', 'Calcular', 'Calcular el monto a pagar']);
		
		var amount = $(this).find('input[name=amount]').val().replace(/^\s+|\s+$/g, '');
		var c_from = $(this).find('select[name=currency]').val();
		var c_to   = 'ARS';
		
		if(amount.length == 0 || !/^-?\d*(\.\d+)?$/.test(amount)) {
			$(this).find('input[name=amount]').closest('.control-group').addClass('error');
		} else {
			$(this).find('input[name=amount]').closest('.control-group').removeClass('error');
			
			if(_gaq)
				_gaq.push(['_trackEvent', 'Calculadora', 'Cálculo en ' + c_from, 'La moneda en la que se realizó el cálculo.']);
			
			var result = fx(amount).from(c_from).to(c_to);
			
			var raw     = result;
			var rounded = round(result, 2);
			var taxes   = round(result * 0.2, 2);
			
			result = {
				raw           : raw,
				without_taxes : rounded,
				with_taxes    : rounded + taxes,
				taxes         : taxes
			};
			
			if(_gaq)
				_gaq.push(['_trackEvent', 'Calculadora', 'Cálculo exitoso', 'Se ha podido realizar el cálculo con éxito.']);
			
			$('#cuanto-tengo-que-pagar #result').text('$ ' + addCommas(result.with_taxes.toFixed(2)));
			$('#cuanto-tengo-que-pagar #result-without-taxes').text('$ ' + addCommas(result.without_taxes.toFixed(2)));
			$('#cuanto-tengo-que-pagar #result-taxes').text('$ ' + addCommas(result.taxes.toFixed(2)));
			$('#cuanto-tengo-que-pagar #result-container').fadeIn();
		}
	});
	
	$('form#hasta-cuanto-puedo-gastar-form').submit(function(e) {
		e.preventDefault();
		
		console.log('hasta-cuanto-puedo-pagar');
		
		/*if(_gaq)
			_gaq.push(['_trackEvent', 'Calculadora', 'Calcular', 'Calcular el monto a pagar']);*/
		
		var amount = $(this).find('input[name=amount]').val().replace(/^\s+|\s+$/g, '');
		var c_from = 'ARS';
		var c_to   = $(this).find('select[name=currency]').val();
		
		
		if(amount.length == 0 || !/^-?\d*(\.\d+)?$/.test(amount)) {
			$(this).find('input[name=amount]').closest('.control-group').addClass('error');
		} else {
			$(this).find('input[name=amount]').closest('.control-group').removeClass('error');
			
			/*if(_gaq)
				_gaq.push(['_trackEvent', 'Calculadora', 'Cálculo en ' + c_from, 'La moneda en la que se realizó el cálculo.']);*/
			
			var result = fx(amount).from(c_from).to(c_to);
			
			var raw     = result;
			var rounded = round(result, 2);
			var with_taxes   = round(result/ (1 + 0.2), 2);
			
			result = {
				raw           : raw,
				without_taxes : rounded,
				with_taxes    : with_taxes,
				taxes         : rounded - with_taxes
			};
			
			/*if(_gaq)
				_gaq.push(['_trackEvent', 'Calculadora', 'Cálculo exitoso', 'Se ha podido realizar el cálculo con éxito.']);*/
			
			$('#hasta-cuanto-puedo-gastar #result').text('$ ' + addCommas(result.with_taxes.toFixed(2)));
			$('#hasta-cuanto-puedo-gastar #result-without-taxes').text('$ ' + addCommas(result.without_taxes.toFixed(2)));
			$('#hasta-cuanto-puedo-gastar #result-taxes').text('$ ' + addCommas(result.taxes.toFixed(2)));
			$('#hasta-cuanto-puedo-gastar #result-container').fadeIn();
		}
	});
});
