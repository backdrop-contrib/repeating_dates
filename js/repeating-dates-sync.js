/**
 * @file
 */
(function ($) {

  'use strict';

  Backdrop.behaviors.repeatingDatesSyncWidget = {
    attach: function (context, settings) {
      const widget = this;

      $('.repeating-dates-sync-widget').each(function () {
        if (typeof this.dataset.syncOffset === 'undefined') {
          return;
        }
        const offsetMSec = this.dataset.syncOffset * 1000;

        // Find relevant form items.
        const startDateInput = $(this).find('.rrule-start-date .form-date');
        const startTimeInput = $(this).find('.rrule-start-date .form-time');
        const endDateInput = $(this).find('.rrule-to-date .form-date');
        const endTimeInput = $(this).find('.rrule-to-date .form-time');

        let endInputEmpty = true;
        if (endDateInput.val().length || endTimeInput.val().length) {
          endInputEmpty = false;
        }

        startDateInput.on('change', function (event) {
          if (!endInputEmpty) {
            return;
          }
          let newValue = $(this).val();
          // Reset everything on start date flush.
          if (newValue.length === 0) {
            startTimeInput.val('');
            endDateInput.val('');
            endTimeInput.val('');
            return;
          }

          let startDateTime = new Date(newValue + ' ' + startTimeInput.val());
          let endDateTime = startDateTime;
          endDateTime.setTime(startDateTime.getTime() + offsetMSec);
          let inputFormats = widget.getInputFormats(endDateTime);

          endDateInput.val(inputFormats.date);
          endTimeInput.val(inputFormats.time);
          // Populate time input if it hasn't been set, yet.
          if (startTimeInput.val() === '') {
            startTimeInput.val('00:00');
          }
        });

        startTimeInput.on('change', function (event) {
          if (!endInputEmpty) {
            return;
          }
          let newValue = $(this).val();
          let startDateTime = new Date(startDateInput.val() + ' ' + newValue);

          let endDateTime = startDateTime;
          endDateTime.setTime(startDateTime.getTime() + offsetMSec);

          let inputFormats = widget.getInputFormats(endDateTime);
          endDateInput.val(inputFormats.date);
          endTimeInput.val(inputFormats.time);
        });

        // Stop automatic value sync on user input, to let people freely
        // override the default offset.
        // Restore automatic value sync if to-date and time are emptied.
        endDateInput.on('change', function () {
          if (endDateInput.val() === '' && endTimeInput.val() === '') {
            endInputEmpty = true;
            return;
          }
          endInputEmpty = false;
        });
        endTimeInput.on('change', function () {
          if (endDateInput.val() === '' && endTimeInput.val() === '') {
            endInputEmpty = true;
            return;
          }
          endInputEmpty = false;
        });
      });
    },
    /**
     * JS input for date/time input is supposed to be ISO style but we can not
     * use toISOString, as that would switch to UTC.
     *
     * @param Date date
     *
     * @return object
     */
    getInputFormats: function (date) {
      let inputFormats = {
        date: date.getFullYear() + '-' + this.pad((date.getMonth() + 1)) + '-' + this.pad(date.getDate()),
        time: this.pad(date.getHours()) + ':' + this.pad(date.getMinutes())
      };
      return inputFormats;
    },
    /**
     * @param int number
     *
     * @return string
     */
    pad: function (number) {
      return number.toString().padStart(2, '0');
    }
  };

})(jQuery);
