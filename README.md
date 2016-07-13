# [Kirby - YAKME](https://github.com/1n3JgKl9pQ6cUMrW/kirby-yakme)

![Kirby - YAKME](kirby_yakme-logotype.png "Kirby - YAKME")

****

#### Version 1.0.0 - 2016-07-13

- Initial Public Offering.

****

### What is it?

**[Kirby - YAKME](https://github.com/1n3JgKl9pQ6cUMrW/kirby-yakme)** (Yet Another Kirby Markdown Editor) is a markdown editor for Kirby.

It uses the **excellent** Simple MDE (editor) from **https://simplemde.com/** as it's core-engine.

More info about Kirby can be found at **http://getkirby.com**

More info about this plug-in can be found at **https://forum.getkirby.com/t/kirby-yakme-yet-another-kirby-markdown-editor/4677/13?u=1n3jgkl9pq6cumrw**

### Installation

- Download the .zip and extract it to the root of your site.
- Optionally you can configure some settings in `site/config/config.php`.

### Usage

The field acts like a normal textarea, but with some extra's;

1. Live preview toggle (eye icon).
2. Hide markdown codes (hashtag icon).
3. Side by side editing (column icon).
4. Fixed font option (font icon).
5. Full support of all markdown codes ( http://www.markitdown.net/markdown ).

The fixed font is helpfull when creating tables or entering codes.

Every instance of a YAKME-field can have individual preferences;

1. Fixed font or default font.
2. Toggle (WYSIWYG) markdown codes.

These settings are saved to the local machine in the localstorage of your browser.

### Config

By default, no `config` is needed. But you can set the height of the YAKME-field;

```
c::set('yakme_height', 0);
```

This will set an "auto-height" for every field; the more the content, the larger the field.

```
c::set('yakme_height', 480);
```

This will set a "fixed-height" for every field; the size is in pixels and when the content becomes to large, a scrollbar will appear.

The settings defaults to 320px - so that's used when no settings are available.

###Known issues###

- Image drag / drop is not (yet) supported.
- Kirby-tags are supported, but not rendered in the live-preview.
- Images are only rendered in the live-preview with a full url.
- Turning of the markdown codes (hastag icon) do not show if text is selected / can hide the cursor.

****

![Kirby - YAKME](kirby_yakme-capture.gif "Kirby - YAKME")

*Kirby YAKME - yet another kirby markdown editor.*