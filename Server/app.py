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
    if not product_id:
        return {"status": 404, "message": "Messing Product Id"}

    return get_product(product_id)


@app.route("/addProduct")
def add_product():
    id = int(str(uuid.uuid1().int)[:10])
    name = request.args.get("name")
    company = request.args.get("company")
    description = request.args.get("description")
    images = [request.args.get("firstImage"),
              request.args.get("secondImage"),
              request.args.get("thirdImage"),
              request.args.get("fourthImage")
              ]
    price = request.args.get("price")
    discount = request.args.get("discount") or 0
    currency = request.args.get("currency") or "$"

    if name == "" or company == "" or description == "" or len(" ".join(images).split(" ")) != 4 or price == "" or discount == "" or currency == "":
        return {"status": "400"}

    db.execute(
        "INSERT INTO products(ID, NAME, COMPANY, DESCRIPTION) VALUES(?, ?, ?, ?)", id, name, company, description)
    db.execute(
        "INSERT INTO prices(PRODUCT_ID, PRICE, DISCOUNT, CURRENCY) VALUES(?, ?, ?, ?)", id, price, discount, currency
    )
    db.execute(
        "INSERT INTO images(PRODUCT_ID, IMAGES) VALUES(?, ?)", id, " ".join(
            images)
    )

    return {"status": 200}


@app.route("/removeProduct")
def remove_product():
    id = request.args.get("id")

    db.execute("DELETE FROM products WHERE ID=?", id)
    db.execute("DELETE FROM prices WHERE PRODUCT_ID=?", id)
    db.execute("DELETE FROM images WHERE PRODUCT_ID=?", id)

    return {"status": 200}


def get_product(product_id, keys=["NAME", "COMPANY", "DESCRIPTION", "IMAGES", "PRICE"]):
    if len(db.execute("SELECT * FROM products WHERE ID = ?", product_id)) == 0:
        return {"status": 404, "message": "Product Not Found"}

    product = {}
    for key in keys:
        if key == "IMAGES":
            images = db.execute(
                "SELECT IMAGES FROM images WHERE PRODUCT_ID = ?", product_id)[0][key].split(" ")
            product[key] = images

        elif key == "PRICE":
            price = db.execute(
                "SELECT PRICE,DISCOUNT,CURRENCY FROM prices WHERE PRODUCT_ID = ?", product_id)[0]
            product[key] = price

        else:
            product[key] = db.execute(
                "SELECT {} FROM products WHERE ID = ?".format(key), product_id)[0][key]

    return product


if __name__ == "__main__":
    app.run(debug=True)
