<?php
require 'wp-load.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';

print_r(get_plugins());

var_dump( is_plugin_active_for_network( 'pressbooks-mpdf/pressbooks-mpdf.php' ) );