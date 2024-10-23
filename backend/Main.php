
    <?php
        $lista = explode(",", $argv[1]);
        sort($lista);
        echo implode(",", $lista);
    ?>