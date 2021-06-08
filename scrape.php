<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");
function tableBodyArray($htmlContent) {
  $DOM = new DOMDocument();
  $DOM->loadHTML($htmlContent);
  $Header = $DOM->getElementsByTagName('th');
  $Detail = $DOM->getElementsByTagName('td');
  foreach($Header as $NodeHeader) 
  {
    $aDataTableHeaderHTML[] = trim($NodeHeader->textContent);
  }
  $i = 0;
  $j = 0;
  foreach($Detail as $sNodeDetail) 
  {
    $aDataTableDetailHTML[$j][] = trim($sNodeDetail->textContent);
    $i = $i + 1;
    $j = $i % count($aDataTableHeaderHTML) == 0 ? $j + 1 : $j;
  }
  for($i = 0; $i < count($aDataTableDetailHTML); $i++)
  {
    for($j = 0; $j < count($aDataTableHeaderHTML); $j++)
    {
      $aTempData[$i][$aDataTableHeaderHTML[$j]] = $aDataTableDetailHTML[$i][$j];
    }
  }
  $aDataTableDetailHTML = $aTempData;
  return $aDataTableDetailHTML;
}
function tagStripper($string, $tag) {
  preg_match_all("/<$tag\b[^>]*>([\w\W]*?)<\/$tag\b[^>]*>/", $string, $matches, PREG_SET_ORDER);
  return  $matches;
}
$ch = curl_init("https://www.golcentres.co.uk/results?LeagueId=393018");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$content = curl_exec($ch);
curl_close($ch);
$tables = tagStripper($content, "table");
echo json_encode([
  'division' => tableBodyArray(preg_replace('/[^\S ]+/', '', $tables[0][0])),
  'schedule' => tableBodyArray(preg_replace('/[^\S ]+/', '', $tables[1][0]))
]);
exit;