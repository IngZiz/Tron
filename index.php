<?php
    require_once 'Mobile_Detect.php';
    $detect = new Mobile_Detect;
    $deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
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
    if($deviceType != 'computer')
    {
        echo "<h3>Sorry but you're not allow to play with your support</h3>";
    }
?>
        <h1>Tron</h1>
        <h2>Made by fan &ndash; for fan</h2>
    </header>
<?php if($deviceType == 'computer') { ?>
    <div id="contain">
        <canvas id="c"></canvas>
            <script type="text/javascript">
                    jQuery.noConflict();
                    jQuery('#jquery').addClass('jquery');
            </script>
    </div>
    <div id="command">
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