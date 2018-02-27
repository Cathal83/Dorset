<?php
namespace Drupal\example\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the Example module.
 */
class ExampleController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function paymentPage() {
    $element = array(
      '#markup' => 'Hello, world',
    );
    return $element;
  }

}