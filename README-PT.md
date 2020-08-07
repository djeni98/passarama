> README files: [English](README.md), [Português](README-PT.md)
# Passarama

Este projeto tem como objetivo ajudar pessoas a encontrar doramas e
fansubs brasileiras.

## Como funciona

1. Crawlers inspecionam as fansubs pesquisando doramas.
2. O Título, o link e a fansub são armazenados em um banco de dado.
3. Front-end consome uma API como estes dados para pesquisar os doramas e
fansubs.

Como o processo de inspecionar leva um tempo considerável, os passos 1 e 2
são feitos poucas vezes no mês. Assim, podem haver alguns doramas de uma
fansub que não estão presentes no banco de dados.

## Tecnologias e Ferramentas

* [Crawler](crawler/README-PT.md): Python e Scrapy
* [Back-end](back/README-PT.md): Python, Flask e SQLite
* [Front-end](front/README-PT.md): React e React-Bootstrap
