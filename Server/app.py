from flask import Flask, request
from cs50 import SQL
import uuid


app = Flask(__name__)

db = SQL("sqlite:///database.db")


@app.route('/products')
def products():
    products = db.execute('SELECT * FROM products')
    prices = db.execute("SELECT * FROM prices")
    images = db.execute("SELECT * FROM images")

    for product in products:
        for price in prices:
            if product["ID"] == price["PRODUCT_ID"]:
                product["PRICE"] = price
        for image in images:
            if product["ID"] == image["PRODUCT_ID"]:
                product["IMAGES"] = image

    return {"products": products}


if __name__ == "__main__":
    app.run(debug=True)
