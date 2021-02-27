from functools import wraps
from flask import url_for, request, redirect, session,jsonify
from .settings import db

ACCESS = {
    'guest': 0,
    'user': 1,
    'admin': 2
}


# collection

user = db["User"]
class User():

    def __init__(self, first_name,last_name, email, password, access=ACCESS['user']):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.access = access
    
    def is_admin(self):
        return self.access == ACCESS['admin']
    

    def save(self):
        user_info = dict(first_name=self.first_name, last_name=self.last_name, email=self.email, password=self.password,access=self.access)
        user.insert_one(user_info)

    @staticmethod
    def allowed(access_level,email):
         test = user.find_one({"email": email})
         return int(test["access"]) >= ACCESS[access_level]

    @staticmethod
    def get_user_id(email):
         test = user.find_one({"email": email})
         print(test)
         return test["_id"]
