import os

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from doramas_crawler.spiders.kingdom import KingdomSpider
from doramas_crawler.spiders.kkulbeol import KkulbeolSpider
from doramas_crawler.spiders.mahal import MahalSpider
from doramas_crawler.spiders.yumeko import YumekoSpider

from doramas_crawler.utils import create_database_tables

settings = get_project_settings()

spiders = [ KingdomSpider, KkulbeolSpider, MahalSpider, YumekoSpider ]
create_database_tables(spiders, settings['DATABASE_NAME'])

process = CrawlerProcess(settings)

for spider in spiders:
    process.crawl(spider)
process.start()

src = settings['DATABASE_NAME']
dest = 'last.sqlite' #src
print('Copying database file to backend directory')
os.system('mv {} ../back/database/{}'.format(src, dest))
print('Done')
