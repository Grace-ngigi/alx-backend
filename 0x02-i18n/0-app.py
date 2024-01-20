#!/usr/bin/env python3
''' routes '''
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def ola():
    return render_template('template/index.html')

if __name__ == '__main__':
    app.run("0.0.0.0")