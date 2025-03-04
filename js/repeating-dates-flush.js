/**
 * @file
 * Provides a button to flush all rrule start input fields at once.
 */
(function ($) {

  'use strict';

  Backdrop.behaviors.repeatingDatesFlush = {
    attach: function () {
      $('.rd-group-dtstart').each(function () {
        // Find relevant form items.
        const $startDateInput = $(this).find('.rrule-start-date .form-date');
        const $startTimeInput = $(this).find('.rrule-start-date .form-time');
        const $endDateInput = $(this).find('.rrule-to-date .form-date');
        const $endTimeInput = $(this).find('.rrule-to-date .form-time');

        let label = Backdrop.t('Empty start and to input fields');
        let button = '<button class="button button-secondary del-button" type="button" title="' + label + '">' + label + '</button>';
        $(this).append(button);
        $(this).find('.del-button').on('click', function(event) {
          event.preventDefault();

          $startDateInput.val('');
          $startTimeInput.val('');
          if ($endDateInput.length && $endTimeInput.length) {
            // Trigger change event on these to inform
            // Backdrop.behaviors.repeatingDatesSyncWidget.
            $endDateInput.val('').trigger('change');
            $endTimeInput.val('').trigger('change');
          }
        });
      });
    }
  };
})(jQuery);
