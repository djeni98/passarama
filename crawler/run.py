import os

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from doramas_crawler.utils import create_database_tables

settings = get_project_settings()
process = CrawlerProcess(settings)
spider_loader = process.spider_loader

spiders = [ spider_loader.load(spider) for spider in spider_loader.list() ]
create_database_tables(spiders, settings['DATABASE_NAME'])

for spider in spiders:
    process.crawl(spider)
process.start()
