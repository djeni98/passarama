from os.path import dirname, join
from setuptools import setup, find_packages

with open(join(dirname(__file__), 'passarama_api/VERSION'), 'r') as f:
    version = f.read().strip()

setup(name='passarama_api', version=version, packages=find_packages())
