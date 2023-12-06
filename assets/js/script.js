$(window).load(function () {
  $(".goog-logo-link").parent().remove();
  $(".goog-te-gadget").html(
    $(".goog-te-gadget").html().replace('&nbsp;&nbsp;Powered by ', '')
  );
});