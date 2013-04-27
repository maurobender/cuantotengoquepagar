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
	$('form#converter').submit(function(e) {
		e.preventDefault();
		
		var amount = $(this).find('input[name=amount]').val();
		var c_from = $(this).find('select[name=currency]').val();
		var c_to   = 'ARS';
		
		if(amount.length == 0 || !/^-?\d*(\.\d+)?$/.test(amount)) {
			$(this).find('input[name=amount]').closest('.control-group').addClass('error');
		} else {
			$(this).find('input[name=amount]').closest('.control-group').removeClass('error');
			
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
			
			$('#result').text('$ ' + addCommas(result.with_taxes.toFixed(2)));
			$('#result-without-taxes').text('$ ' + addCommas(result.without_taxes.toFixed(2)));
			$('#result-taxes').text('$ ' + addCommas(result.taxes.toFixed(2)));
			$('#result-container').fadeIn();
		}
	});
});
