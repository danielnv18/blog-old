---
author: danielnv18
layout: post
title: "Overriding a template in Drupal"
image: img/pexels-photo-1002251.jpeg
permalink: "overriding-template-drupal"
date: 2018-05-18T10:00:00.000Z
draft: false
tags:
  - drupal
  - theme
  - suggestions
  - template
  - twig
---

If you are doing a Drupal site, there's a big chance you are creating a Drupal theme also. To do that, you will need to create your markup. By default in Drupal, you can't see how Drupal is handling the HTML or where the content comes from, but that can easily be changed.

## Enabled debug mode
In Drupal 7, this can be done by setting the variable `theme_debug` as true in the settings.php `$conf['theme_debug'] = TRUE;`. In Drupal 8, you'll have to make sure that you have a services.yml in `sites/default` and enable the debug mode in twig.

```yml
parameters:
    twig.config:
        debug: true
```
In Drupal 8, you have an easier way to do it, with DrupalConsole. Just run `drupal site:mode dev`. That will not only enable the debug mode in twig, but it will set other options useful for development like disabling cache.

Once the debug mode is enabled, if you inspect the html you'll be able to see all the file suggestions to override the output in the html comments.
```html
<!-- THEME DEBUG -->
<!-- THEME HOOK: 'node' -->
<!-- FILE NAME SUGGESTIONS:
   * node--1--full.html.twig
   * node--1.html.twig
   * node--article--full.html.twig
   * node--article.html.twig
   * node--full.html.twig
   x node.html.twig
-->
<!-- BEGIN OUTPUT from 'core/themes/bartik/templates/node.html.twig' -->
…
<!-- END OUTPUT from 'core/themes/bartik/templates/node.html.twig' -->
```

## Running the process function
Another thing that the HTML comment tell us is the theme hook. Every preprocess function has a pattern. It combines the machine name of your theme or module, the name of the theme hook, and the word preprocess in the middle. If we applied this to the example above, the result would be like:

```php
function my_theme_preprocess_node(&$vars) {

}
```

One thing to have in mind is that that preprocess function will run for all the nodes. If you want to run a preprocess function for just one node or one specific content type, you only need to follow the same logic of the file suggestions. For example, for all the nodes of type article, the function name would be `my_theme_preprocess_node__article.` For all the teasers would be  `my_theme_preprocess_node__teaser` or for the node #1 the function name would be ` my_theme_preprocess_node__1`. You get the idea, follow the same logic of the file name suggestions.

## Creating more suggestions
Sometimes the template's recommendations are not enough. In that case, you could use the `hook_theme_suggestions_HOOK_alter.` This hook allows you to add an alternative theme function or template name suggestions. The `HOOK` part will be replaced by the name of the `THEME HOOK` that appears in the HTML comments.

The [documentation](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Render%21theme.api.php/function/hook_theme_suggestions_HOOK_alter/8.5.x) explain it better:
> HOOK is the least-specific version of the hook being called. For example, if '#theme' => '`node__article`' is called, then node_theme_suggestions_node() will be invoked, not `node_theme_suggestions_node__article()`.

For example, let's say that we want to add more suggestions to the view fields. The name of the theme is `views_view_fields.`

```php
function hook_theme_suggestions_views_view_fields_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view_fields__' . $view->id();
  $suggestions[] = 'views_view_fields__' . $view->id() . '__' . $view->current_display;
}
```


## Sources
1. https://www.drupal.org/docs/7/theming/template-theme-hook-suggestions