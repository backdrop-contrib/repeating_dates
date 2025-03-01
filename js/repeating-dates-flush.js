/**
 * @file
 * Provides a button to delete all rrule start input fields at once.
 */
(function ($) {

  'use strict';

  Backdrop.behaviors.repeatingDatesFlush = {
    attach: function (context, settings) {
      $('.rd-group-dtstart').each(function () {
        // Find relevant form items.
        const $startDateInput = $(this).find('.rrule-start-date .form-date');
        const $startTimeInput = $(this).find('.rrule-start-date .form-time');
        const $endDateInput = $(this).find('.rrule-to-date .form-date');
        const $endTimeInput = $(this).find('.rrule-to-date .form-time');

        let button = '<button class="button del-button">' + Backdrop.t('Empty start and to input') + '</button>';
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
