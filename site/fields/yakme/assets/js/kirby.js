/* Ref 1. https://github.com/NextStepWebs/simplemde-markdown-editor */
/* Ref 2. http://stackoverflow.com/a/33258611 */
/* Ref 3. http://stackoverflow.com/a/35452496 */

/* Inject some Kirby-like tags */

var yakme_text = function(index, data) {

  var cm = $('.CodeMirror')[index].CodeMirror;
  var doc = cm.getDoc();
  var cursor = doc.getCursor();
  var line = doc.getLine(cursor.line);
  var pos = {
      line: cursor.line,
      ch: line.length - 1
  }

  doc.replaceRange(data, pos);

}

/* Save preferences per yakme-field */

  if (localStorage.getItem('yakme_prefs') === null) {
    var yakme_prefs = { yakme: [] };
  } else {
    var yakme_prefs = { yakme: JSON.parse(localStorage.getItem('yakme_prefs')) };
  }

/* Initialize (each) yakme-field */

var yakme_ini = function (index) {

  var yakme_field = $('.yakme_editor:eq(' + index + ')');

  var yakme_id = yakme_field.attr('id');

  var simplemde = new SimpleMDE( {
    autoDownloadFontAwesome : false,
    element      : $('.yakme_editor')[index],
    spellChecker : false,
    toolbar      : ['bold',
                    'italic',
                    'heading',
                      '|',
                    'quote',
                    'unordered-list',
                    'ordered-list',
                    'table',
                    'horizontal-rule',
                      '|',
                    'link',
                    'image',
                    {
                      name: 'kirby_mail',
                      action: function yakme_txt() {
                        yakme_text(index, '(email: mail@example.com text: mail me)');
                      },
                      className: 'fa fa-envelope',
                      title: 'Kirby Mail',
                    },
                      '|',
                    {
                      name: 'kirby_url',
                      action: function yakme_txt() {
                        yakme_text(index, '(link: http://site.com/ text: text)');
                      },
                      className: 'fa fa-link kirby',
                      title: 'Kirby Link',
                    },
                    {
                      name: 'kirby_img',
                      action: function yakme_txt() {
                        yakme_text(index, '(image: image.png alt: text)');
                      },
                      className: 'fa fa-image kirby',
                      title: 'Kirby Image',
                    },
                      '|',
                    {
                      name: 'font',
                      action: function yakme_font() {

                        yakme_field.parent().toggleClass('yakme_fixed');
                        yakme_set_prefs(yakme_id);

                      },
                      className: 'fa fa-font',
                      title: 'Toggle Font',
                    },
                    {
                      name: 'wysiwyg',
                      action: function yakme_wysiwyg() {

                        yakme_field.parent().toggleClass('yakme_wysiwyg');
                        yakme_set_prefs(yakme_id);

                      },
                      className: 'fa fa-hashtag',
                      title: 'Toggle Wysiwyg',
                    },
                      '|',
                    'preview',
                    'side-by-side',
                    'fullscreen'
                  ],
    insertTexts : {
                    horizontalRule  : ['', '\n\n---\n\n'],
                    image           : ['', '![alt](http://site.com/image.png)'],
                    link            : ['', '[text](http://site.com/)']
                  }

  } );

/* Don't fire twice */

  yakme_field.attr('data-yakme', 'true');
  yakme_field.parent().addClass('yakme_wrapper');

/* Disable Kirby-default AJAX-behaviour */

  $('.yakme_wrapper .editor-toolbar a').each(function(index) {
    $(this).attr('href', '#');
  });

/* Get the user-prefs for this particular field */

  $.each( yakme_prefs['yakme'], function( index ) {

    if ((yakme_prefs['yakme'][index]['id']) == yakme_id) {

      $('#' + yakme_id).parent().addClass(yakme_prefs['yakme'][index]['fixed']);
      $('#' + yakme_id).parent().addClass(yakme_prefs['yakme'][index]['wysiwyg']);

        if(window.console) {
          console.log('[yakme] : #' + yakme_id + ' > ' + $('#' + yakme_id).parent().attr('class'));
        };

      return;
    }

  });

}

/* Set | save the preferences for each field */

function yakme_set_prefs(yakme_id) {

var yakme_set = 0;

/* Check if a field is already in the array (and modify it, when found) */

  $.each( yakme_prefs['yakme'], function( index ) {

    if ((yakme_prefs['yakme'][index]['id']) == yakme_id) {

      yakme_set++;
      yakme_prefs['yakme'][index]['fixed'] = $('#' + yakme_id).parent().hasClass('yakme_fixed')?'yakme_fixed':'yakme_sans';
      yakme_prefs['yakme'][index]['wysiwyg'] = $('#' + yakme_id).parent().hasClass('yakme_wysiwyg')?'yakme_wysiwyg':'yakme_code';

      return;
    }

  });

/* The field is not yet saved, push it into the array with the new settings */

  if(yakme_set < 1) {

    yakme_prefs.yakme.push( {
      id      : yakme_id,
      fixed   : $('#' + yakme_id).parent().hasClass('yakme_fixed')?'yakme_fixed':'yakme_sans',
      wysiwyg : $('#' + yakme_id).parent().hasClass('yakme_wysiwyg')?'yakme_wysiwyg':'yakme_code'
    } );

  }

/* Save the settings, one entry per field#ID */

  localStorage.setItem('yakme_prefs', JSON.stringify(yakme_prefs['yakme']));

  if(window.console) {
    console.log('[yakme] : ' + JSON.stringify(yakme_prefs['yakme']));
  };

}

/* Fire (each) yakme-field, when not already fired before (AJAX) */

var yakme_image_checked = 0;

$.fn.yakmefield = function() {

    $('.yakme_editor').each(function(index) {
      if(!$(this).data('yakme')) {
        yakme_ini(index);
      }
    });

  if(yakme_image_checked != 1) {
    yakme_image_checked = 1;
    yakme_image_check();
  }

}

/* Check markdown-images (not the Kirby-tag images) for their validity */

function yakme_image_check() {

  if(yakme_images == 1) {

    $(document).on('click', '.yakme_wrapper .editor-toolbar .fa-eye, .yakme_wrapper .editor-toolbar .fa-columns', function () {

      $('.yakme_wrapper .editor-preview img, .yakme_wrapper .editor-preview-side img').css({visibility: 'hidden'});

      setTimeout( function() {

        $('.yakme_wrapper .editor-preview img, .yakme_wrapper .editor-preview-side img').each(function(i) {

          if(window.console) {
            console.log('[yakme] src : ' + $(this).attr('src') + ' | width : ' + $(this).prop('naturalHeight') + 'px' );
          }

          if($(this).prop('naturalHeight') === 0) {

            $(this).attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHpJREFUeNrsW1lIVFEYvqOjmVZotuhomo5L2Iq2YZtSErQH2aZEZAtRFBYWqUQp7fkQRA/1Ei0v9lAvBZkQQYUlSdFGDxFFRQTt0KLV9P/Nf2EYZs49995z7izXD74HZ86ce853//P/5zv36vB4PIqdEaPYHI6SkpJQXXsqcDYwDtgOvA78Y/UgYl0uVygmvw64B1hJQkwCJgDvAv9GcwQ4gaeBVUG+vwZcAvwarTngOGPyiArgeSvHZeUSmA9s4WhXAHwP7IymCMBE16yjfSMwOZoE2AAcq6N9OrAhWpLgEOBj4CCdv/sFLAY+ifQI2Gtg8og+wCORvgSKgDUmfj8HODOSBdhPCdAMDtL+IeIEwLu3UEA/44FrI02AeMHr12geCZkADbT+RVaSY5EiQB6wTkK/K8k4CTcnonEY2FejjYeMTxdZ4FFkjRM0fodb6VKRtlm0ADiJxRpt3pAhuuH3+WjgOeAYxm8nAtcAT4XjThAT3z26m6zdXRmwI8j3WRQVqYw+3tE1PoRbDqjWmDyijTF5xCuywyykAbeGWxJMATZxtLvK0aaNo00tMDecBMCyl8HRjidseU6D+gEPhYsAGPabOdsO42iTwdkXHp1VhIMAzeTceFDI0SZHp9dwhFKAMp37/RGCRPL1CdWhEsBJGxM9d8ANHCBAJP8oSA6FAHi2X2xgT5/N+B7FGa6zz0zgLqsFSCWHZuR6hRpJcrCBfrco3tNkywSoNThQrTWebXBM6CF2WyVAPglgFEUC17+/W5xmhQDo9hJNDLSAkTjNCOCgpOyUKQC6vUUmS2cWoxIUmOx7AnC1LAGcBhNfoATqCuImMwX036jhJg0LUK94H2ObRWyQUodJNV1A/5hIj4oWADcwOwRa55wg9TxRUP+rFO/JkTAB8Gw+SaAA7iC5QaTNb6FoMy1AKTkvkXAFiQCRmMwzbi0BHHT3RWNogM/SJFynSWtZadXMaiObCw6gh7jk8zeeEst4TI1ldbvCeDeBdSiKDuuhhNC0Gt8U77sJL/QugboomDyiPysCYhi7tU0SB/WcQnM6cApwI/C+xOsto8MT7iVw1uxJCwN46rsc+MnvczxWO0k1XAbwQUwZTwTgXamSNIjXwBUBJo/AhyY1EiNhBjlGpgCxtI10SBrEGeBHxve/gSckLoUD/kbMX4BKclSy8IijzVOJ18+ifBNQAHzYsE9yRo7naBMneQw7FZ9nDzF+ZS9X8sV5XngqlzyGFN8brVaBPEo+SZIvjoluFvAmY+d2W4+fNwgP7XBvqRGwzYLJq6XuohL4TY+RwMsWTF71OPVqBGBIPFOMn/IaAWb7K8A7ivf/A8YB51l0E1R0A4uclPWtnLxqwhYQQwVMyOW4BPIV+8KNAny3sQA/UYAuGwvQiQI8ALbacPJYbtvVMriesrJd0EEWuVs9EvsCnAtcSk4Qy9JAC7alVgBrfg/ws+L9x41WMmU9ajnyxQXgSzo8QOOQKNEZWokfwLeK9z3GDnXy/9Xp/d9hm6NXALsL8E+AAQBg9KFwvIQmrgAAAABJRU5ErkJggg==');

          }

          $(this).css({visibility: 'visible'});

        });

      }, 500);

    });

  }

}