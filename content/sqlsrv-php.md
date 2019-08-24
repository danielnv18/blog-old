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

Every now and then, there a client which uses SQL server and set it as a requirement. By default PHP can work with databases like MySQL, SQLite or PostgreSQL. In the case for SQL serve, you can do it but it requires some manual. If you work with Windows, you can set it up very easily after a couple of wizards. But if you work with OSX or any Linux distro, you will not have a good time. Docker to the rescue!.

> TL;DR I use docker to install the drivers and the oficial MS SQL Server docker image

## Dockerfile

I'm going to use the oficial php docker image

```Dockerfile
FROM php:fpm

CMD ["php-fpm", "-F"]

EXPOSE 9000

```

Below `FROM php:fpm` we're going to the several things. First you need to install all the dependencies

```Dockerfile
RUN apt-get update && apt-get install -y locales unixodbc libgss3 odbcinst \
    devscripts debhelper dh-exec dh-autoreconf libreadline-dev libltdl-dev \
    tdsodbc unixodbc-dev wget unzip libbz2 apt-transport-https \
    libfreetype6-dev libmcrypt-dev libjpeg-dev libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
```

From those dependencies, the most important is `unixODBC`. ODBC is an open specification for providing application developers with a predictable API with which to access Data Sources like SQL server and unixODBC is definition for non MS Windows platforms

After that we need to add and install the Microsoft ODBC drivers for Linux:

```Dockerfile
RUN apt-get update \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install --yes --no-install-recommends msodbcsql17 mssql-tools \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*
```

Then we just install and enable the PHP extensions.

```Dockerfile
RUN pecl install WINCACHE-1.3.7.12 pdo_sqlsrv-5.6.1 sqlsrv-5.6.1 \
    && docker-php-ext-enable pdo_sqlsrv sqlsrv \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
```

And finally, we run the SQL Server process

```Dockerfile
CMD /opt/mssql/bin/sqlservr
```

This would be the final dockerfile

```Dockerfile
FROM php:fpm

RUN apt-get update && apt-get install -y locales unixodbc libgss3 odbcinst \
    devscripts debhelper dh-exec dh-autoreconf libreadline-dev libltdl-dev \
    tdsodbc unixodbc-dev wget unzip libbz2 apt-transport-https \
    libfreetype6-dev libmcrypt-dev libjpeg-dev libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen

RUN apt-get update \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install --yes --no-install-recommends msodbcsql17 mssql-tools \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN pecl install WINCACHE-1.3.7.12 pdo_sqlsrv-5.6.1 sqlsrv-5.6.1 \
    && docker-php-ext-enable pdo_sqlsrv sqlsrv \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/

CMD /opt/mssql/bin/sqlservr

CMD ["php-fpm", "-F"]

EXPOSE 9000
```

## Adding SQL Server

docker compose

## Testing
