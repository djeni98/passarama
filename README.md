> README files: [English](README.md), [Português](README-PT.md)
# Passarama

This project aims to help people find doramas and brazilian fansubs. 

## How it works

1. Crawlers inspect fansubs pages searching doramas.
2. Title, link and fansub are stored in a database.
3. Front-end consumes API with this data to search doramas and fansubs.

As crawler inspecting takes a long time, steps 1 and 2 are made a few times
in a month. So, it may have some doramas in a fansub that is not stored in the
database.

## Technologies and Tools

* Crawler: Python and Scrapy
* Back-end: Python, Flask and SQLite
* Front-end: React and React-Bootstrap
