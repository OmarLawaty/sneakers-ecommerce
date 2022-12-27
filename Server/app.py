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


@app.route('/product')
def product():
    product_id = request.args.get("productId")
    product = db.execute(
        "SELECT * FROM products WHERE ID = ?", product_id)

    if len(product) == 0:
        return {"product": {}, "ErrMessage": "Product Not Found"}

    product_price = db.execute(
        "SELECT * FROM prices WHERE PRODUCT_ID = ?", product[0]["ID"])
    product_images = db.execute(
        "SELECT * FROM images WHERE PRODUCT_ID = ?", product[0]["ID"])

    product[0]["PRICE"] = product_price[0]
    product[0]["IMAGES"] = product_images[0]

    return {"product": product[0]}


if __name__ == "__main__":
    app.run(debug=True)
