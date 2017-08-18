<?php
  header('charset=utf-8');

  //告诉浏览器不要缓存数据
  header('Cache-Control: no-cache');
  header("Access-Control-Allow-Origin:*");

  //产生一个随机浮点数，传入的参数用于限制范围
  function randomFloat($min = 0, $max = 1) {
    return $min + mt_rand() / mt_getrandmax() * ($max - $min);
  }
  $num = number_format(randomFloat(1, 20), 2, '.', '');

  echo $num;
