from pymongo import MongoClient

# Making a Connection with MongoClient
client = MongoClient("mongodb://localhost:27017/")
# database
db = client["app_database"]