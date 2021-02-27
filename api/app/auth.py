from __main__ import app
from models.user import User,user
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,verify_jwt_in_request,get_jwt
from pymongo import MongoClient
from functools import wraps
import json
from bson import json_util


@app.route("/dashboard")
@jwt_required()
def dasboard():
    return jsonify(message="Welcome! to the Data Science Learner")


@app.route("/register", methods=["POST"])
def register():
    email = request.form["email"]
    # test = User.query.filter_by(email=email).first()
    test = user.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        password = request.form["password"]
        access = request.form["access"]
        user_info = User(first_name,last_name,email,password,access)
        user_info.save()
        return jsonify(message="User added sucessfully"), 201


@app.route("/login", methods=["POST"])
def login():
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]

    identified_user = user.find_one({"email": email, "password": password})
    if identified_user:
        access_token = create_access_token(identity=email)
        return jsonify(message="Login Succeeded!", access_token=access_token, user=email), 201
    else:
        return jsonify(message="Bad Email or Password"), 401


@app.route("/profile/<username>", methods=["GET"])
@jwt_required()
def get_profile(username):
    email = username
    identified_user = user.find_one({"email": email})
    print(identified_user)
    page_sanitized = json.loads(json_util.dumps(identified_user))
    if identified_user:
        return jsonify(result=page_sanitized), 200
    else:
        return jsonify(message="User_Not_Found"), 401



def requires_access_level(access_level):
    def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                verify_jwt_in_request()
                claims = get_jwt()
                if not User.allowed(access_level,claims["sub"]):
                    return jsonify(message="You do not have access to that page. Sorry!")
                return f(*args, **kwargs)
            return decorated_function
    return decorator