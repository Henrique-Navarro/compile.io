<?php
function somar(int $a, int $b): int
{
  $result = $a+$b;
  // Escreva seu código aqui
  return $result;
}

// recebimento do input
$arr = explode(' ', $argv[1]);
$result = somar((int) $arr[0], (int) $arr[1]);

echo $result;
