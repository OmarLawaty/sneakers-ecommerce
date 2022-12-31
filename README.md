# Sneakers E-commerce

Sneakers E-commerce is a sneakers shopping and buying site. This site lets you list all the products and show them with 2-4 images with product's name, company, description and price. You can also sign in with your google account and add items to your cart.

## Table of contents

- [Overview](#overview)
  - [Built With](#built-with)
  - [Main Files: Project Structure](#main-files-project-structure)
- [Getting Started](#getting-started)

  - [Installation](#installation)

    - [Front-end](#front-end)

      - [Install Dependencies](#install-dependencies)
      - [Environment Variables](#environment-variables)

    - [Back-end](#back-end)

      - [Create Virtual Environment](#create-virtual-environment)
      - [Database Configuration](#database-configuration)

  - [Starting The Site](#starting-the-site)

## Overview

### Built With

- **SQLite3** as my database of choice.
- **Python3** and **Flask** as my server-side language and server-side framework.
- **ReactJs** with **Redux** and **Chakra-ui** for the website's frontend.

### Main Files: Project Structure

```sh
├── README.md
├── Client *** Website Frontend files.
│   │   ...
│   └── src
│       ├── actions
│       ├── components
│       ├── hooks
│       ├── pages
│       ├── reducers
│       ├── utils
│       ├── App.jsx
│       ├── index.js
│       └── theme.js
│       ...
└── Server *** Website Backend files.
    ├── app.py
    └──database.db
```

## Getting Started

### Installation

#### Front-end

Make sure to be in the Client directory.

##### Install Dependencies

Make sure that you have nodejs 16.17.0 or above installed.

Run the following to install yarn

```bash
npm install yarn
```

Install all the required dependencies

```bash
yarn install
```

##### Environment Variables

Create `.env` file and type in this:

```bash
REACT_APP_CLIENT_ID=<YOUR GOOGLE OAUTH CLIENT ID>
```

#### Back-end

Make sure to be in the Server directory and that you have Python 3.6 or above and sqlite3 installed.

##### Create Virtual Environment

Run the following to create a virtual environment:

```bash
python3 -m venv env
```

Activate your newly created virtual environment by running:

```bash
source env/bin/activate
```

##### Database Configuration

Run the following:

```bash
sqlite3 database.db
```

Run the following command to get all the tables:

```sql
.schema
```

You will get 5 Tables:

Products:

```sql
CREATE TABLE IF NOT EXISTS "products"("ID" integer, "NAME" text, "COMPANY" text, "DESCRIPTION" text);
```

Prices:

```sql
CREATE TABLE IF NOT EXISTS "prices"("PRODUCT_ID" integer, "PRICE" integer, "DISCOUNT" integer, "CURRENCY" text);
```

Images:

```sql
CREATE TABLE IF NOT EXISTS "images"("PRODUCT_ID" integer, "IMAGES" text);
```

Users:

```sql
CREATE TABLE IF NOT EXISTS "users"("ID" text, "NAME" text);
```

Carts:

```sql
CREATE TABLE IF NOT EXISTS "carts"("USER_ID" text, "PRODUCT_ID" integer, "PRODUCT_AMOUNT" integer);
```

### Starting The Site

In Client directory run:

```bash
yarn start
```

In Server directory in another terminal window run:

```bash
flask run
```

The site will be on http://localhost:3000
