<?php
	$currencies = array('USD', 'GBP', 'EUR');
	$rates = array();
	ini_set('display_errors', true);
	error_reporting(E_ALL);
	
	foreach($currencies as $currency) {
		$url  = 'http://www.google.com/ig/calculator?hl=es&q=1' . $currency . '=?ARS';
		$json = file_get_contents($url);
		$json = preg_replace("/([a-zA-Z0-9_]+?):/" , "\"$1\":", $json);
		$data = json_decode($json, true);
		$out = array();
		
		preg_match('/([\d\.])+/', $data['rhs'], $out);
		$rates[$currency] = (float) $out[0];
	}
	
	$rates['ARS'] = 1;
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	 <head>
		  <meta charset="utf-8">
		  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		  <title>¿Cuánto tengo que pagar?</title>
		  <meta name="description" content="">
		  <meta name="viewport" content="width=device-width">

		  <link rel="stylesheet" href="css/bootstrap.min.css">
		  <style>
				body {
					 padding-top: 60px;
					 padding-bottom: 40px;
				}
		  </style>
		  <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
		  <link rel="stylesheet" href="css/main.css">

		  <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	 </head>
	 <body>
		  <!--[if lt IE 7]>
				<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		  <![endif]-->
		  <div class="container">
				<header class="masterhead">
					<h1>¿Cuánto tengo que pagar?</h1>
					<p>
						Una página para ayudarte a calcular cuánto terminarías pagando si
						haces una compra en el exterior.
					</p>
				</header>

				<!-- Example row of columns -->
				<div class="row">
					 <div class="span12 form-container">
						<form id="converter" class="form-inline">
							<div class="control-group inline">
								<label class="control-label">Monto:</label>
								<input class="span4" placeholder="Ingrese el monto a calcular..." name="amount" type="text">
							</div>
							
							<div class="control-group inline">
								<label>Moneda:</label>
								<select class="span2" name="currency">
									<option value="USD">$ Dólares</option>
									<option value="GBP">£ Libras</option>
									<option value="EUR">€ Euros</option>
								</select>
							</div>
							
							<div class="control-group inline">
								<button type="submit" class="btn">¡Calcular!</button>
							</div>
						</form>
					 </div>
				</div>
				
				<div class="row">
					<div id="result-container" style="display: none;">
						<div id="result"></div>
					</div>
				</div>

				<hr>

				<footer>
					 <p>&copy; Mauro Bender 2013</p>
				</footer>

		  </div> <!-- /container -->

		  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>

		  <script src="js/vendor/bootstrap.min.js"></script>

		  <script src="js/plugins.js"></script>
		  <?php 	echo '<script>fx.rates = ' . json_encode($rates) . '; fx.base = "ARS";</script>'; ?>
		  <script src="js/main.js"></script>

		  <script>
				var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
				(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
				g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
				s.parentNode.insertBefore(g,s)}(document,'script'));
		  </script>
	 </body>
</html>
