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
import argparse

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from doramas_crawler.utils import create_database_tables

settings = get_project_settings()

## --- Command Line -- ##
parser = argparse.ArgumentParser()

parser.add_argument('--log-level', type=str.upper,
    choices=['CRITICAL', 'ERROR', 'WARNING', 'INFO', 'DEBUG'])
parser.add_argument('--sem-pipeline', action='store_true')
parser.add_argument('--spider', type=str.lower)

args = parser.parse_args()

if args.log_level:
    settings['LOG_LEVEL'] = args.log_level

if args.sem_pipeline:
    settings['ITEM_PIPELINES'] = {}
## --- ##

process = CrawlerProcess(settings)
spider_loader = process.spider_loader

inactive = ['yumeko', 'dorameirason']
spiders = [ spider_loader.load(spider) for spider in spider_loader.list() if spider not in inactive ]

## --- Command Line -- ##
if args.spider and args.spider in spiders:
    spiders = [args.spider]
## --- ##

create_database_tables(spiders, settings['DATABASE_NAME'])

for spider in spiders:
    process.crawl(spider)
process.start()
