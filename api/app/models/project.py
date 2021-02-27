from .settings import db
from datetime import datetime
import json
from bson import json_util
from bson.objectid import ObjectId

project_db = db["Project"]

class Project():   

    def __init__(self):
        super().__init__() 

    def save(self,project_name,project_team,project_dep,project_owner,project_member,created_by):
        return project_db.insert({'project_name': project_name, 
        'project_team': project_team,
        'project_dep': project_dep,
        'project_owner': project_owner,
        'project_member': project_member,
        'created_on': datetime.now(),
        'updated_on':datetime.now(),
        'created_by':created_by
        })
    
    def get_all_projects(self):
        #star = mongo.db.stars
        output = []
        for s in project_db.find():
            print(db["User"].find_one({"_id":s["created_by"]}))
            x = {'project_name' : s['project_name'], 
            'project_team' : s['project_team'], 
            'project_dep' : s['project_dep'],
            'created_on' : s['created_on'],
            'updated_on' : s['updated_on'],
            'id' : s['_id'],
            'created_by':db["User"].find_one({"_id":s["created_by"]})}
            page_sanitized = json.loads(json_util.dumps(x))
            print(page_sanitized)
            output.append(page_sanitized)
            #y = json.dumps(x)
        print(x)
        return output

    def get_project(self, project_id):
        print(project_db.find_one({'_id':ObjectId(project_id)}))
        return project_db.find_one({'_id':ObjectId(project_id)})