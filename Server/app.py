from flask import Flask, request
from cs50 import SQL
import uuid


app = Flask(__name__)

db = SQL("sqlite:///database.db")


@app.route('/products')
def products():
    products = db.execute('SELECT * FROM products')

    for product in products:
        price = db.execute(
            "SELECT PRICE,DISCOUNT,CURRENCY FROM prices WHERE PRODUCT_ID = ?", product["ID"])[0]
        product["PRICE"] = price

        image = db.execute(
            "SELECT IMAGES FROM images WHERE PRODUCT_ID = ?", product["ID"])[0]["IMAGES"].split(" ")
        product["IMAGES"] = image

    return {"status": 200, "message": "Returned All products", "products": products}


@app.route('/product')
def product():
    product_id = request.args.get("productId")
    if not product_id:
        return {"status": 404, "message": "Messing Product Id"}

    product = get_product(product_id)

    if len(product) == 0:
        return {"status": 404, "message": "Product Not Found"}

    return {"status": 200, "message": "Product Found", "product": product}


@app.route("/addProduct")
def add_product():
    id = int(str(uuid.uuid1().int)[:10])
    if not id:
        return {"status": 404, "message": "The product couldn't be added"}

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

    if not name or not company or not description or len(" ".join(images).split(" ")) != 4 or not price or not discount or not currency:
        return {"status": "400", "message": "Messing Parameters"}

    db.execute(
        "INSERT INTO products(ID, NAME, COMPANY, DESCRIPTION) VALUES(?, ?, ?, ?)", id, name, company, description)
    db.execute(
        "INSERT INTO prices(PRODUCT_ID, PRICE, DISCOUNT, CURRENCY) VALUES(?, ?, ?, ?)", id, price, discount, currency
    )
    db.execute(
        "INSERT INTO images(PRODUCT_ID, IMAGES) VALUES(?, ?)", id, " ".join(
            images)
    )

    return {"status": 200, "message": "Product Added Successfully"}


@app.route("/removeProduct")
def remove_product():
    id = request.args.get("id")
    if not id:
        return {"status": 404, "message": "Messing Product Id"}

    db.execute("DELETE FROM products WHERE ID=?", id)
    db.execute("DELETE FROM prices WHERE PRODUCT_ID=?", id)
    db.execute("DELETE FROM images WHERE PRODUCT_ID=?", id)

    return {"status": 200, "message": "Product Deleted Successfully"}


@app.route("/addToCart")
def add_to_cart():
    user_id = request.args.get("userId")
    product_id = request.args.get("productId")
    product_amount = int(request.args.get("productAmount"))

    cart_item = db.execute("SELECT * FROM carts WHERE USER_ID=? AND PRODUCT_ID=?",
                           user_id, product_id)

    if len(cart_item) > 0:
        db.execute("UPDATE carts SET PRODUCT_AMOUNT=? WHERE PRODUCT_ID=? AND USER_ID=?",
                   product_amount, product_id, user_id)

    else:
        db.execute("INSERT INTO carts(USER_ID, PRODUCT_ID, PRODUCT_AMOUNT) VALUES(?, ?, ?)",
                   user_id, product_id, product_amount)

    return {"status": 200, "message": "Product {} Added To Cart".format(product_id), "cart": get_cart(user_id)}


@app.route("/deleteFromCart")
def delete_from_cart():
    user_id = request.args.get("userId")
    product_id = request.args.get("productId")

    db.execute(
        "DELETE FROM carts WHERE PRODUCT_ID = ? AND USER_ID = ?", product_id, user_id)

    return {"status": 200, "message": "Product Deleted From Cart", "cart": get_cart(user_id)}


@app.route("/getCart")
def get_user_cart():
    user_id = request.args.get("userId")
    user_name = request.args.get("userName")
    if not user_id or not user_name:
        return {"status": 400, "message": "Invalid UserId Or Username"}

    if len(get_user(user_id)) == 0:
        add_user(user_id, user_name)

        return {"status": 200, "message": "New User Added", "cart": []}

    return {"status": 200, "message": "Cart Loaded", "cart": get_cart(user_id)}


def get_product(product_id, keys=["ID", "NAME", "COMPANY", "DESCRIPTION", "IMAGES", "PRICE"]):
    if len(db.execute("SELECT * FROM products WHERE ID = ?", product_id)) == 0:
        return {}

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


def get_cart(user_id):
    cart_products = db.execute(
        "SELECT * FROM carts WHERE USER_ID = ?", user_id)

    cart = []

    for cart_product in cart_products:
        product = get_product(cart_product["PRODUCT_ID"])
        if len(product) == 0:
            db.execute("DELETE FROM cartes WHERE PRODUCT_ID=?",
                       cart_product["PRODUCT_ID"])
        else:
            product["amount"] = cart_product["PRODUCT_AMOUNT"]
            cart.append(product)

    return cart


def add_user(user_id, name):
    db.execute("INSERT INTO users(ID, NAME) VALUES(?, ?)", user_id, name)


def get_user(id):
    user = db.execute("SELECT * FROM users WHERE ID=?", id)

    if len(user) == 0:
        return {}
    else:
        return user


if __name__ == "__main__":
    app.run(debug=True)
