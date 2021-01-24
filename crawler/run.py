# Passarama - Find doramas and brazilian fansubs.
# Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

import os

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from doramas_crawler.utils import create_database_tables

settings = get_project_settings()
process = CrawlerProcess(settings)
spider_loader = process.spider_loader

inactive = ['yumeko']

spiders = [ spider_loader.load(spider) for spider in spider_loader.list() if spider not in inactive ]

create_database_tables(spiders, settings['DATABASE_NAME'])

for spider in spiders:
    process.crawl(spider)
process.start()
