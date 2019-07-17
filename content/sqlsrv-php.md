---
author: Daniel Noyola
layout: post
title: 'Working with SQL server in PHP projects'
image: img/dock.jpg
draft: true
date: 2019-05-17T10:00:00.000Z
tags:
  - php
  - sqlsrv
  - docker
---

Every now and then, there a client which uses SQL server and set it as a requirement. PHP works very well, out of the box, with open sources databases like MySQL, SQLite or PostgreSQL but it requires some manual work with SQL server. If you work with Windows, you can set it up very easily after a couple of wizards. But if you work with OSX or any Linux distro, you will not have a good time.

## Dockerfile

First you need to install all the dependencies

```Dockerfile
RUN apt-get update && apt-get install -y locales unixodbc libgss3 odbcinst \
    devscripts debhelper dh-exec dh-autoreconf libreadline-dev libltdl-dev \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
```

From those dependencies, the most important is `unixODBC`. ODBC is an open specification for providing application developers with a predictable API with which to access Data Sources like SQL server and unixODBC is definition for non MS Windows platforms

After that we need to add the Microsoft ODBC drivers repos for Linux:

```Dockerfile
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y \
    apt-transport-https \
    msodbcsql17 \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update
```

This would be the final dockerfile

```Dockerfile
FROM php:7.3-fpm

MAINTAINER Daniel Noyola <daniel.noyola.dev@gmail.com>

# Install Dependencies
RUN apt-get update && apt-get install -y locales unixodbc libgss3 odbcinst \
    devscripts debhelper dh-exec dh-autoreconf libreadline-dev libltdl-dev \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen

# Add Microsoft repo for Microsoft ODBC Driver 17 for Linux
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y \
    apt-transport-https \
    msodbcsql17 \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update

# Enable the php extensions.
RUN pecl install pdo_sqlsrv-5.6.1 sqlsrv-5.6.1 \
    && docker-php-ext-enable pdo_sqlsrv sqlsrv

CMD ["php-fpm", "-F"]

EXPOSE 9000
```
