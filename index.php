<?php
$u_agent = $_SERVER['HTTP_USER_AGENT'];
$verif_agent = null;
if(preg_match('/MSIE 8/i',$u_agent) || preg_match('/MSIE 7/i',$u_agent) || preg_match('/MSIE 6/i',$u_agent)) 
{
    $verif_agent = 1;
}
if(preg_match('/android/i',$u_agent) || preg_match('/phone/i',$u_agent) || preg_match('/mobile/i',$u_agent) || preg_match('/xbox/i',$u_agent) || preg_match('/tablet/i',$u_agent)) 
{
    $verif_agent = 2;
}
?>
<!doctype html>
<html lang="fr">
<head>
    <meta name="description" content="Fan Game">
    <meta name="keywords" content="Game">
    <meta name="author" content="Mickael Charfadi &amp; Thomas ZINNATO">
    <meta charset="UTF-8">
    <title>Tron - Made by fan, for fan</title>
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="js/jquery-2.0.min.js"></script>
    <script type="text/javascript" src="js/prototype.js"></script>
    <script type="text/javascript" src="js/tron.js"></script>
</head>
<body>
    <header>
<?php
    if($verif_agent == 1) 
    {
        echo "<h3>Sorry but your web browser is too old to let you play at this game</h3>";
    }
    if($verif_agent == 2) 
    {
        echo "<h3>Sorry but you can't play with your phone</h3>";
    }
?>
        <h1>Tron</h1>
        <h2>Made by fan &ndash; for fan</h2>
    </header>
<?php if($verif_agent<1) { ?>
    <div id="contain">
        <canvas id="c"></canvas>
            <script type="text/javascript">
                    // jQuery en action
                    jQuery.noConflict();
                    jQuery('#jquery').addClass('jquery');
                    // Prototype en action
                    //$('prototype').addClassName('prototype');
            </script>
        <div class="touch">
            <h3>Player 1</h3>
            <p>
                <span class="icon direct_top"><i class="fa fa-caret-up fa-2x"></i>&nbsp;Top</span>
                <span class="icon"><i class="fa fa-caret-left fa-2x"></i>&nbsp;Left</span>
                <span class="icon"><i class="fa fa-caret-down fa-2x"></i>&nbsp;Bottom</span>
                <span class="icon"><i class="fa fa-caret-right fa-2x"></i>&nbsp;Right</span>
            </p>
        </div>
        <div class="touch">
            <h3>Player 2</h3>
            <p>
                <span class="icon_no direct_top">Z</span>
                <span class="icon_no">Q</span>
                <span class="icon_no">S</span>
                <span class="icon_no">D</span>
            </p>
        </div>
    </div>
<?php } ?>
    <footer>
    </footer>
</body>
</html>