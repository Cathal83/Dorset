<?php
  /**
   * @file
   */
  namespace Drupal\bookingform\Plugin\Block;

  use Drupal\Core\Block\BlockBase;
  use Drupal\Core\Controller\ControllerBase;

  /**
  * Provides a 'Booking' Block.
  *
  * @Block(
  *   id = "bookingform_block",
  *   admin_label = @Translation("Booking Form Block"),
  * )
  */
  class BookingFormBlock extends BlockBase {

    /**
     * {@inheritdoc}
     */
  	public function build() {
  		return array (
        '#theme' => 'bookingform_view',
        '#attached' => array(
          'library' => array(
            'bookingform/stripe-js',
            'bookingform/angularjs',
            'bookingform/angular-stripe',
            'bookingform/angular-ui-router',
            'bookingform/angular-messages',
            'bookingform/angular-filter',
            'bookingform/angular-animate',
            'bookingform/angular-aria',
            'bookingform/angular-material',
            'bookingform/angular-material-CSS',
            'bookingform/ngFileUpload',
            'bookingform/moment',
            'bookingform/lodash',
            'bookingform/angular-cookies',
            'bookingform/query-string',
            'bookingform/angular-oauth2',
            'bookingform/bookingFormApp',
            'bookingform/bookingFormConfig',
            'bookingform/bookingDateConfig',
            'bookingform/bookingPaymentConfig',
            'bookingform/bookingDataService',
            'bookingform/bookingFormService',
            'bookingform/bookingPostService',
            'bookingform/bookingFormController',
            'bookingform/bookingFormDateConfig',
            'bookingform/bookingPaymentController',
            'bookingform/bookingViewController',
            'bookingform/bookingDocumentsController'

          ),
        ),
      );
  	}
  }
?>