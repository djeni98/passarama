# -*- coding: utf-8 -*-
import scrapy
from doramas_crawler.spiders.logindata import puripuri

class PuriPuriSpider(scrapy.Spider):
    name = 'puripuri'
    allowed_domains = ['puripurifansub.forumeiros.com']
    fansub = {
        'name': 'Puri Puri Fansub',
        'facebook': 'https://www.facebook.com/puripurifansub',
        # 'image': ''
    }

    def start_requests(self):
        form = {
            'username': puripuri.username,
            'password': puripuri.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://puripurifansub.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://puripurifansub.forumeiros.com/f5-k-dramas',
            'https://puripurifansub.forumeiros.com/f6-j-drama',
            'https://puripurifansub.forumeiros.com/f7-t-dramas',
            'https://puripurifansub.forumeiros.com/f8-c-dramas',

            'https://puripurifansub.forumeiros.com/f2-filmes',
        ]

        yield from response.follow_all(urls, callback=self.parse)

        url = 'https://puripurifansub.forumeiros.com/f1-dramas-em-andamento'
        yield response.follow(url, callback=self.parse)

    def parse(self, response):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')

        announcement = response.xpath('//strong[contains(text(), "Anúncio")]').getall()
        for i in announcement:
            items.pop(0)

        for i in items:
            title = i.xpath('text() | span/text()').get().split('/')[0]
            yield {
                'title': title.strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_prosilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
