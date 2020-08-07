> README files: [English](README.md), [Português](README-PT.md)
# Passarama - API

Serve fansub and dorama infos from a database (usually created by crawler).

## Install

Clone the repository:
```sh
$ git clone https://github.com/djeni98/passarama
$ cd back
```

Create a virtual environment and activate it:
```sh
$ python3 -m venv venv
$ . venv/bin/activate
```

Install dependencies:
```sh
(venv) $ pip install -r requirements.txt
```

## Run

```sh
(venv) $ export FLASK_APP=passarama_api
(venv) $ export FLASK_ENV=development
(venv) $ flask run
```
Open http://127.0.0.1:5000 in a browser.

## Test

```sh
(venv) $ pytest
```

Run with coverage report:
```sh
(venv) $ coverage run -m pytest
(venv) $ coverage report
(venv) $ coverage html # open htmlcov/index.html in a browser
```

## Technologies and Tools

* [Python](https://www.python.org/) ```3.6```
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) ```1.1.2```
* [Pytest](https://docs.pytest.org/en/stable/index.html) ```6.0.1```
* [Coverage](https://coverage.readthedocs.io/en/coverage-5.2.1/) ```5.2.1```
* SQLite

