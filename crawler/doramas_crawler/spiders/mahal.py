# -*- coding: utf-8 -*-
import scrapy
from doramas_crawler.spiders.logindata import mahal

class MahalSpider(scrapy.Spider):
    name = 'mahal'
    allowed_domains = ['mahaldramasfansub.forumeiros.com']
    fansub = {
        'name': 'Mahal Dramas Fansub',
        'facebook': 'https://www.facebook.com/mahaldramasfansub',
        'image': 'https://i.servimg.com/u/f15/19/99/49/23/logo_m11.png'
    }

    def start_requests(self):
        form = {
            'username': mahal.username,
            'password': mahal.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://mahaldramasfansub.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://mahaldramasfansub.forumeiros.com/f10-dramas-coreanos',
            'https://mahaldramasfansub.forumeiros.com/f11-dramas-japoneses',
            'https://mahaldramasfansub.forumeiros.com/f12-dramas-tailandeses',
            'https://mahaldramasfansub.forumeiros.com/f13-dramas-taiwaneses-chineses-e-outros',

            'https://mahaldramasfansub.forumeiros.com/f7-dramas-japoneses',
            'https://mahaldramasfansub.forumeiros.com/f4-dramas-filipinos',
            'https://mahaldramasfansub.forumeiros.com/f8-dramas-tailandeses',
            'https://mahaldramasfansub.forumeiros.com/f22-dramas-taiwaneses-chineses-e-outros',

            'https://mahaldramasfansub.forumeiros.com/f14-filmes-coreanos',
            'https://mahaldramasfansub.forumeiros.com/f16-filmes-japoneses',
            'https://mahaldramasfansub.forumeiros.com/f17-filmes-taiwaneses-e-chineses',
            'https://mahaldramasfansub.forumeiros.com/f18-filmes-filipinos',
            'https://mahaldramasfansub.forumeiros.com/f19-filmes-indonesios',
            'https://mahaldramasfansub.forumeiros.com/f20-filmes-tailandeses',
        ]

        yield from response.follow_all(urls, callback=self.parse)

    def parse(self, response):
        for i in response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a'):
            yield {
                'title': i.xpath('text() | span/text()').get().strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
