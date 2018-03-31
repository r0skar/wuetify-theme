<?php
/**
 * Wue Press theme functions
 *
 * @package WordPress
 * @subpackage wue-press
 */

/* This theme only works with the plugin `NodeifyWP` */
if ( !class_exists( '\NodeifyWP\App') && !is_admin() ) {
  wp_die('Wue Press requires the NodeifyWP plugin.');
}

/**
 * Enable `NodeifyWP`
 */
$server_js_path = __DIR__ . '/dist/server.js';
$client_js_url = get_stylesheet_directory_uri() . '/dist/client.js';
$client_css_url = get_stylesheet_directory_uri() . '/dist/client.css';
$includes_js_path = null;
$includes_js_url = null;

if ( class_exists( '\NodeifyWP\App') ) {
  \NodeifyWP\App::setup($server_js_path, $client_js_url, $client_css_url, $includes_js_path, $includes_js_url);
}

/**
 * Theme setups
 */
add_action( 'after_setup_theme', 'theme_setup' );

function theme_setup() {
  // Add title tag to `<head>`
  add_theme_support( 'title-tag' );

  // Remove canonical link as it is provied by the WP Seo plugin
  remove_action('wp_head', 'rel_canonical');

  // Use html5 tags
  add_theme_support( 'html5' );

  // Add menu support
  add_theme_support( 'menus' );

  // Remove feeds
  remove_theme_support( 'automatic-feed-links' );

  // Remove post formats
  remove_theme_support( 'post-formats' );

  // Disable custom background
  remove_theme_support( 'custom-background' );

  // Disable custom header
  remove_theme_support( 'custom-header' );

  // Register menus
  register_nav_menus( array(
    'primary' => 'Primary Menu',
    'secondary' => 'Secondary Menu'
  ));
}

/**
 * Recursively include ACF fields in post querys
 */
add_filter( 'the_posts', 'wue_always_include_acf_fields' );

$GLOBALS['wue_always_include_acf_fields_loops'] = 0;

function wue_always_include_acf_fields( $posts ) {

  // Disable for admin queries
  if ( is_admin() ) {
    return $posts;
  }

  // When $posts is a single post, we wrap it into an array
  if ( $posts && !is_array($posts) ) {
    $posts = [$posts];
  }

  for ( $i = 0; $i < count($posts); $i++ ) {
    $acf_fields = get_post_custom( $posts[$i]->ID );
    $posts[$i]->post_acf = array();

    foreach ( $acf_fields as $label => $value ) {

      // Skip internal fields
      if ($label[0] == '_') {
        continue;
      }

      $field = get_field( $label, $posts[$i]->ID );

      // Loop over custom fields recursively 3 levels deep
      if ( isset($field->ID) || isset($field[0]->ID) ) {
        $GLOBALS['wue_always_include_acf_fields_loops'] += 1;
        if ($GLOBALS['wue_always_include_acf_fields_loops'] < 2) {
          wue_always_include_acf_fields($field);
        }
      }

      $posts[$i]->post_acf[ $label ] = $field;
    }
  }

  /**
   * TODO: ACF creates a new property in the parent for all properties found in the children.
   * This new prperties are prefixed by their parent name and an underscore. We should remove them?
   */

  return $posts;
}

/**
 * Add theme settings page
 *
 * To use the settings in the client app, you need to manually add
 * each settings field to `register_settings` in `wue-plugin/App.php`
 */
add_action( 'init', 'add_afc_options_page' );

function add_afc_options_page() {
  if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
      'page_title' => 'Theme Settings',
      'menu_title' => 'Theme',
      'menu_slug' => 'theme-settings',
      'parent_slug' => 'options-general.php',
      'capability' => 'edit_others_pages',
      'icon_url' => 'dashicons-admin-settings',
      'redirect' => false,
      'post_id' => 'option'
    ));
  }
}
