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
            'bookingform/angularjs',
            'bookingform/angular-ui-router',
            'bookingform/angular-messages',
            'bookingform/angular-filter',
            'bookingform/angular-animate',
            'bookingform/angular-aria',
            'bookingform/angular-material',
            'bookingform/angular-material-CSS',
            'bookingform/moment',
            'bookingform/lodash',
            'bookingform/bookingFormApp',
            'bookingform/bookingFormConfig',
            'bookingform/bookingPostService',
            'bookingform/bookingDataService',
            'bookingform/bookingFormService',
            'bookingform/bookingFormController',
            'bookingform/bookingFormDateConfig',

          ),
        ),
      );
  	}
  }
?>
