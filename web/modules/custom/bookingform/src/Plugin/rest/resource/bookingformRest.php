<?php
  namespace Drupal\bookingform\Plugin\rest\resource;

  use Drupal\Core\Session\AccountProxyInterface;
  use Drupal\rest\Plugin\ResourceBase;
  use Drupal\rest\ResourceResponse;
  use Symfony\Component\DependencyInjection\ContainerInterface;
  use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
  use Psr\Log\LoggerInterface;

  /**
  *
  * @RestResource(
  *   id = "bookingformRest",
  *   label = @Translation("Bookingform Rest Resource"),
  *   uri_paths = {
  *     "canonical" = "/api/v2/payment",
  *     "https://www.drupal.org/link-relations/create" = "/api/v2/payment"
  *   }
  * )
  */
  class bookingPayment extends ResourceBase {

    /**
     * Responds to entity POST request.
     * @return \Drupal\rest\ResourceResponse 
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     *
     */
    public function post() {

      return new ResourceResponse("Working!");

    }
  }