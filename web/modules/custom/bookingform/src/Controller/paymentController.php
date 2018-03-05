<?php
  namespace Drupal\bookingform\Controller;

  use Drupal\Core\Controller\ControllerBase;

  class PaymentController extends ControllerBase {

    private $apiKey = "sk_test_zJpfrkdwd8oaD56vZr8eumPO";

    public function __construct(){
      \Stripe\Stripe::setApiKey($this->apiKey);
    }

    public function doPayment() {

        $API = \Stripe\Stripe::getApiKey();
        /**
        $customer = \Stripe\Customer::create(array(
         'email' => 'chavi809@gmail.com',
         'source' => 'tok_1C2M7fBFJgKe7XuUbXcLlnsG'
        ));
        $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'amount' => 30000,
        'currency' => 'eur'
        ));*/
        $element = array(
          '#markup' => $this->apiKey,
        );

        return $element;
    }

    public function makePayment($data) {
        return $data;
    }
  }