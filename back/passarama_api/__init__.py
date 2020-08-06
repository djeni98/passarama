# coding: utf-8
import os
from flask import Flask, request

from passarama_api import db
from passarama_api.views import get_fansubs, get_doramas

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'db.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.config_app(app)

    # Add routes
    app.add_url_rule('/fansubs', 'fansubs', get_fansubs)
    app.add_url_rule('/doramas', 'doramas', get_doramas)

    return app
