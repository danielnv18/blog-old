---
title: "Composer and Drupal 8"
cover: "/images/cliff-fir-trees-nature-70219.jpg"
date: "23/04/2018"
category: "drupal"
tags:
    - drupal
    - composer
    - php
---

Composer is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. Drupal,  Symfony or any modern PHP framework uses it.
One of the main reasons Drupal decided to use composer is to not reinvent the wheel. At the very beginning of the development of Drupal 8, the community started wondering how improved the routing system. In the end they decided to use `symfony/http-foundation` and they used composer to integrate it. (Plus half of the symfony components).

Drupal.org builds Drupal core's composer-defined dependencies and packages them (along with Drupal itself) into the .zip and .tar.gz archives that are available for download on Drupal.org. So, if you've downloaded Drupal as a .tar.gz or .zip file from Drupal.org, or if you've used Drush to download Drupal, then the Composer dependencies for Drupal core have already been built and provided to you.

## Why
There are a few scenarios in which you might use Composer on a Drupal project.

### Manage dependencies of an entire Drupal site with Composer
As a Drupal architect, I like to manage dependencies for an entire Drupal site with Composer.

* Install and update Drupal core with Composer
* Install and update contributed the modules, themes and their third party dependencies with Composer.
* Use Composer to manage Drupal site dependencies (applies both to 7.x and 8.x)
* Note: Using composer_manager is deprecated since Drupal 8.1.

### Manage dependencies for a custom module or theme with Composer
As a Drupal developer, I like to manage contributed dependencies for custom modules or custom themes with Composer.

* If you are developing a custom module or custom theme that will not be contributed to the Drupal community, you can manage dependencies for your custom project using Composer.
* Note: Drupal's packaging system does not support dependency management for profiles, distributions, or Drush extensions. You cannot manage dependencies for these project types with Composer. For background, see #2715441: Support for distributions.

### Manage dependencies for a contributed module or theme with Composer
As a maintainer of a contributed Drupal project, I like to manage third party dependencies of my module or theme with Composer.

* If a contributed project has a dependency to third party libraries hosted on Packagist, they can define the dependencies in composer.json, located in the module / theme directory.
* Most contrib developers do not need to do this as long as their dependencies to other Drupal modules / themes are expressed in their info.yml files.
* Use composer to manage dependencies for a contributed project.

## Composer in relation to Drush
Composer will replace all your Drush tasks related to managing dependencies, for example:

| Task                                            | Drush                                   | Composer                                    |
|-------------------------------------------------|-----------------------------------------|---------------------------------------------|
| Installing a contrib project                    | drush pm-download PROJECT               | composer require drupal/PROJECT             |
| Installing a contrib project (specific version) | drush pm-download PROJECT-8.x-1.0-beta3 | composer require drupal/PROJECT:1.0.0-beta3 |
| Updating all contrib projects and Drupal core   | drush pm-update                         | composer update                             |
| Updating a single contrib project               | drush pm-update PROJECT                 | composer update drupal/PROJECT              |
| Updating Drupal core                            | drush pm-update drupal                  | composer update drupal/core                 |

The magic is that Composer, unlike Drush, is a dependency manager. If the module foo version 1.0.0 depends on the baz version 3.2.0, Composer will not let you update the baz to 3.3.0 (or downgrade it to 3.1.0, for that matter). Drush has no concept of dependency management. If you've ever accidentally destroyed a site because of dependency issues like this, you've probably already realized how valuable Composer can be.

## Libraries
If libraries are not available from a composer repository, they can be retrieved by specifying custom packages in the repository section.

```json
{
    "repositories": [
        {
            "type": "package",
            "package": {
                "name": "lodash/lodash",
                "version": "2.17.5",
                "type": "drupal-library",
                "dist": {
                    "url": "https://github.com/lodash/lodash/archive/4.17.5.zip",
                    "type": "zip"
                },
                "require": {
                    "composer/installers": "~1.0"
                }
            }
        }
    ]
}
```
There is also a composer repository for bower/npm packages https://asset-packagist.org/. You just need to add that repository to your composer.json a run `composer require npm-asset/bootstrap` for downloading bootstrap.

Every time you start a new Drupal project, you should use composer to manage your modules and libraries dependencies. If you are currently working in a project and it doesn't use composer, you can easily implemented by using the drupal console `drupal composerize`


## Sources
1. https://www.drupal.org/docs/develop/using-composer/using-composer-with-drupal
2. https://github.com/acquia/lightning-project/blob/master/README.md
3. https://github.com/drupal-composer/drupal-project/blob/8.x/README.md
