<?php

class YakmeField extends TextField {

/* Load some assets (yakme.* = 100% original https://simplemde.com) */

  static public $assets = array(
    'css' => array(
      'simplemde.css',
      'kirby.css'
    ),
    'js' => array(
      'simplemde.js',
      'kirby.js'
    )
  );

  public function content() {

    $content = parent::content();

/* The height of every field; 0 = 'auto' (it grows with the content) | 240 = 'integer' (a fixed height) */

    $yakme_height = c::get('yakme_height', 320);
    $yakme_height = $yakme_height < 1 ? $yakme_height = 'auto' : $yakme_height . 'px';
    $yakme_height = '<style>.yakme_wrapper .CodeMirror, .yakme_wrapper .CodeMirror-scroll {min-height: ' . $yakme_height . ';height: ' . $yakme_height . '}</style>';

/* Check markdown-images (not the Kirby-tag images) for their validity */

    $yakme_images = c::get('yakme_images', 0);
    $yakme_images = '<script>var yakme_images = "' . $yakme_images . '";</script>';
    return $yakme_height . $yakme_images . $content;

  }

/* Create the textarea, that will become the editor */

  public function input() {

    $input = parent::input();
    $input->tag('textarea');
    $input->removeAttr('type');
    $input->removeAttr('value');
    $input->html($this->value() ? htmlentities($this->value(), ENT_NOQUOTES, 'UTF-8') : false);
    $input->data('field','yakmefield');
    $input->addClass('yakme_editor');


    return $input;

  }

/* Add class to wrapper field, that hides certain buttons in the toolbar */

  public function element() {

    $element = parent::element();

    if(isset($this->hide)) {

      if(count($this->hide) != 0) {

        $hidden = $this->hide;

          foreach ($hidden as &$value) {

            $value = 'hide_' . $value;

          }

        $element->addClass('yakme_hide ' . implode(' ', $hidden));

      }

    }

    return $element;

  }

}

?>