window.onload = function() {
  var input = document.getElementById('mce-EMAIL').focus();
}

$('input').focusin(function () {
  $('input').parent().removeClass('active');
  $(this).parent().addClass('active');
});

$('input').focusout(function () {
  $('input').parent().removeClass('active');
});

var $botonRegistro = $('.js-boton-registro');

$botonRegistro.click(function() {
  ga('send', 'event', 'Botón Registro', 'Nuevo Registro', 'Landing Prelanzamiento');

  fbq('track', 'Lead', {
    value: 0,
    currency: 'USD'
  });
});
