#!/usr/bin/env python3
''' routes '''
from flask import Flask, render_template
from flask_babel import Babel


class Config():
    ''' config class'''
    LANGUAGES = ["en", "fr"]
    BABEL_LOCALE_DEFAULT = "en"
    BABEL_TIMEZONE_DEFAULT = "UTC"


app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def hola() -> str:
    ''' basic flask app '''
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
