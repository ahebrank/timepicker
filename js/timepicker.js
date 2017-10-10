(function($) {
    // TODO: make the format configurable
    var format = 'g:i A';

    return Drupal.behaviors.jquery_timepicker = {
      attach: function(context, settings) {
        if (!Modernizr.inputtypes.time) {
            var $timefields = $('input[type="time"]');
            $timefields.timepicker({
                'timeFormat': format
            });

            // on submit, convert back to 24-hour time
            var $forms = $timefields.closest('form');
            var seen = {};
            $forms.each(function() {
                var $form = $(this);
                if (!seen[$form]) {
                    $form.on('submit', function() {
                        $timefields.timepicker({
                            'timeFormat': 'H:i:s'
                        });
                    });
                }
                seen[$form] = true;
            });
        }
      }
    };
  })(jQuery);