from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from doramas_crawler.spiders.kingdom import KingdomSpider
from doramas_crawler.spiders.kkulbeol import KkulbeolSpider
from doramas_crawler.utils import create_database_tables

settings = get_project_settings()

spiders = [ KingdomSpider, KkulbeolSpider ]
create_database_tables(spiders, settings['DATABASE_NAME'])

process = CrawlerProcess(settings)

process.crawl(KingdomSpider)
process.crawl(KkulbeolSpider)
process.start()
