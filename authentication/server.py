"""Python Flask WebApp Auth0 integration example
"""

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request, make_response, jsonify
# from flask_cors import CORS, cross_origin


ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)


print("url---", ENV_FILE, env);

app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = env.get("APP_SECRET_KEY")

app.config.update(
    SESSION_COOKIE_SECURE=False,
)

FE_URL = f'http://{env.get("FE_HOST")}:{env.get("FE_PORT")}'
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
     return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )
    # return render_template(
    #     "home.html",
    #     session=session.get("user"),
    #     pretty=json.dumps(session.get("user"), indent=4),
    # )


@app.route("/callback", methods=["GET", "POST"])
def callback():
    codeVal = request.args.get("code");
    token = oauth.auth0.authorize_access_token()
    
    session["user"] = token
    resp = make_response(redirect(FE_URL)) # add url in auth0 configuration in callback urls
    resp.set_cookie('token', token['id_token'])
    return resp 


@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://"
        + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": FE_URL, # add url in auth0 configuration in logout urls
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
