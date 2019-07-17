---
author: Daniel Noyola
layout: post
title: 'Creating a media library in Drupal'
image: img/art.jpg
permalink: 'media-library-drupal'
date: 2019-05-11T10:00:00.000Z
tags:
  - drupal
  - library
  - gallery
  - media
---

When Drupal 8.0.0 got released, it didn't have a friendly way to handle media. For example, if you wanted to use an image in multiple places, you have to upload it multiple times. This issue got resolved in the "contrib" space and by version 8.4 we finally got a media module in core. It still needs a lot of configuration and contrib modules.

> Note: This only works in 8.4+ version of Drupal

For this example We'll try to update the `Article` content type to use the new media intead a `Image` field.

## Core media module

When you enable the `Media` module, it adds a new entity to Drupal and you can see the admin page in `/admin/structure/media`. If you are using the `Standard` profile, you will see a list of media entities:

- Audio: For locally hosted audio file.
- File: local files for reusable media.
- Image: local images for reusable media.
- Remote: video A remotely hosted video from YouTube or Vimeo.
- Video: A locally hosted video file.

Now, let's replace the `Image` with a new field. Go to the _Managed Fields_ for the Article content type (Administration >> Structure >> Content types >> Article >> Managed Fields) and add a new `Reference Media` field and make sure that it references to the Image media type. Don't forget to delete the previous image field.
If you try to add an article in order to test the new field, you'll see something like this:
![Drupal media core add](https://i.ibb.co/hdqKCL9/Screenshot-2019-05-30-17-26-53.png)
That's a bad UX. You'll have to go to a different page to add a image then go back and remember the name. it gets even worse. Imagine a week from now, you won't remember all the images that are in the site.

## Differences between Media, File, and Image reference fields

Media reference fields offer several advantages over basic File and Image references:

- Media reference fields can reference multiple media types in the same field.
- Fields can also be added to media types themselves, which means that custom metadata like descriptions and taxonomy tags can be added for the referenced media. (Basic file and image fields do not support this.)
- Media types for audio and video files are provided by default, so there is no need for additional configuration to upload these media.
- Contributed or custom projects can provide additional media sources (such as third-party websites, Twitter, etc.).
- Existing media items can be reused on any other content items with a media reference field.

## Improving the Core media module

First, lets download the contrib modules:

```bash
composer require drupal/entity_browser 'drupal/media_entity_browser:^2.0'
```

> Make sure that you get the version 2 of the module media_entity_browser. The version 1 only works in Drupal >=8.3. If you don't add the `^2.0`, composer will try to download the version 1.

Go ahead and enable the following modules:

- [Entity Browser](https://www.drupal.org/project/entity_browser)
- [Media Entity Browser](https://www.drupal.org/project/media_entity_browser)
- [Inline Entity Form](https://www.drupal.org/project/inline_entity_form)
- [Entity Browser IEF](https://www.drupal.org/project/entity_browser)

In order to use the new entity browser, go to the Form display page for the article content type `/admin/structure/types/manage/article/form-display`. Locate the new Image field. There's a big change that it is at the bottom. Change the widget from `Autocomplete` to _Entity Browser_. Then click the settings option to the far right. Select The _Media Entity Browser (Modal)_ option for the entity browser and _Rendered entity_. Hit Update an save
![Drupal Field setting for Media entity Browser](https://i.ibb.co/8dg5MSk/Screenshot-2019-05-31-17-08-31.png)

If you try to add an article again, you will see that a modal displays immediately the page loads.
![Drupal Entity browser media modal](https://i.ibb.co/FghJyM2/Screenshot-2019-05-31-20-04-54.png)
Go to `/admin/config/content/entity_browser` and edit _Media Entity Browser (Modal)_ and in
_DISPLAY PLUGIN SETTINGS_ un-checked _auto open entity browser_. Go and checkout the article content type. That’s better.

## Minor improments

The current setup is better than the default image field. But there are a couple of things you can checkout.

- If you want to display an smaller image preview in the edit form, go a create a new display type `/admin/structure/display-modes/view` and configure an different resolution. Select the new view type here `/admin/structure/types/manage/article/form-display`
- If you want to hide or add more field to the add tab, go and update the form display for the media type `/admin/structure/media/manage/image/form-display`. You can also have multiple media form views.
- If you want to add drag/drop funcionality for the uploads, download and configure [dropzonejs](https://www.drupal.org/project/dropzonejs)
