from __main__ import app
from flask import session, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt,get_jwt_identity,verify_jwt_in_request
from auth import requires_access_level
from models.project import Project
from models.user import User
import json
from bson import json_util


@app.route("/projects", methods=["GET"])
@jwt_required()
def get():
    project = Project()
    return jsonify({'result' : project.get_all_projects()})


@app.route("/projects/<projectid>", methods=["GET"])
@jwt_required()
def getProjectById(projectid):
    project = Project()
    page_sanitized = json.loads(json_util.dumps(project.get_project(projectid)))
    return jsonify(result = page_sanitized)

@app.route("/projects", methods=["POST"])
@jwt_required()
def post():
    email = get_jwt_identity()
    project_name = request.json['project_name']
    project_team = request.json['project_team']
    project_dep = request.json['project_dep']
    project_owner = request.json['project_owner']
    project_member = request.json['project_member']
    project_created_by = User.get_user_id(email)
    project = Project()
    project_id = project.save(project_name,project_team,project_dep,project_owner,project_member,project_created_by)
    print(project_id)
    new_project = project.get_project(project_id)
    output = {'project_name' : new_project['project_name'], 'project_team' : new_project['project_team']}
    return jsonify({'result' : output})



@requires_access_level("admin")
def getAllProjects():
    string = get_jwt_identity()
    return string

@app.route("/refresh")
@jwt_required(fresh=True)
def createNewToken():
    return "message New Token"


@app.route("/projects2", methods=["POST"])
@jwt_required()
def createProject():
    return "test:ok"