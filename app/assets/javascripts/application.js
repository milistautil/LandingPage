$('input').focusin(function () {
  $('input').parent().removeClass('active');
  $(this).parent().addClass('active');
});

$('input').focusout(function () {
  $('input').parent().removeClass('active');
});
