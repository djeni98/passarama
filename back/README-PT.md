> README files: [English](README.md), [Português](README-PT.md)
# Passarama - API

Disponibiliza informações de fansubs e doramas a partir de um banco de dados (geralmente criado pelo crawler).

## Instalação

Clone o repositório:
```sh
$ git clone https://github.com/djeni98/passarama
$ cd back
```

Crie um ambiente virtual e o ative:
```sh
$ python3 -m venv venv
$ . venv/bin/activate
```

Instale as dependências:
```sh
(venv) $ pip install -r requirements.txt
```

## Execução

```sh
(venv) $ export FLASK_APP=passarama_api
(venv) $ export FLASK_ENV=development
(venv) $ flask run
```
Abra http://127.0.0.1:5000 em um navegador.

## Teste

```sh
(venv) $ pytest
```

Execute com o relatório de cobertura:
```sh
(venv) $ coverage run -m pytest
(venv) $ coverage report
(venv) $ coverage html # abra htmlcov/index.html em um navegador
```

## Tecnologias e Ferramentas

* [Python](https://www.python.org/) ```3.6```
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) ```1.1.2```
* [Pytest](https://docs.pytest.org/en/stable/index.html) ```6.0.1```
* [Coverage](https://coverage.readthedocs.io/en/coverage-5.2.1/) ```5.2.1```
* SQLite

