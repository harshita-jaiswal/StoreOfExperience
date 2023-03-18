"""Python Flask WebApp Auth0 integration example
"""

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request, make_response, jsonify
from flask_cors import CORS, cross_origin

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = env.get("APP_SECRET_KEY")

app.config.update(
    SESSION_COOKIE_SECURE=False,
)


oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)


# Controllers API
@app.route("/")
def home():
    return render_template(
        "home.html",
        session=session.get("user"),
        pretty=json.dumps(session.get("user"), indent=4),
    )


@app.route("/callback", methods=["GET", "POST"])
def callback():
    codeVal = request.args.get("code");
    token = oauth.auth0.authorize_access_token()
    print('------', request.args, codeVal, oauth.auth0, token)
    
    session["user"] = token
    userInfo = json.dumps(session.get("user"), indent=4)
    # print(json.dumps(token, indent=4).userinfo)
    val = json.loads(userInfo)
    # resp = make_response(redirect("http://127.0.0.1:5173"))
    resp = make_response(redirect("/"))
    userInfo = val['userinfo']
    print('test----', val['userinfo']['sub'], userInfo['sub'])
    # resp.set_cookie('user_id', value=val['userinfo']['sub'])
    resp.set_cookie('userInfo', value=json.dumps(token))
    return resp 
    # print(val['userinfo']['sub'])
    # session["detail"] = userInfo
    # session["sub"] = userInfo.userinfo.sub
    # print('session---', session.get("sub"))
    # return redirect("http://127.0.0.1:5173")
    # return redirect("/")


@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/get")
@cross_origin()
def get():
    print('hello-----------------------')
    return jsonify(session.get("user"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://"
        + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
