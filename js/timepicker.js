(function($, drupalSettings) {
    return Drupal.behaviors.jquery_timepicker = {
      attach: function(context, settings) {
        if (drupalSettings.jquery_timepicker.force_enable || !Modernizr.inputtypes.time) {
            var $timefields = $('input[type="time"]');
            $timefields.each(function() {
                var $timefield = $(this);
                $timefield.hide();

                // replace the actual time field with a picker-enabled text field
                var $replace = $('<input type="text" class="form-text" data-timepicker-replacement>');
                $replace
                    .insertAfter($timefield)
                    .timepicker({
                        'step': 15,
                        'timeFormat': 'g:ia'
                    })
                    .on('change', function() {
                        var $r = $(this);
                        var v = $r.val();
                        var $i = $r.prev();
                        var f = moment(v, 'h:mma').format('HH:mm:ss');
                        $i
                            .val(f)
                            .attr('value', f);

                    });

                // on load
                var v = $timefield.val();
                if (v) {
                    $replace.val(moment(v, 'HH:mm:ss').format('h:mma'));
                }
            });
        }
      }
    };
  })(jQuery, drupalSettings);