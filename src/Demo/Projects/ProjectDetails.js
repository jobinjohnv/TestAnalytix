import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Table, Button, Modal} from 'react-bootstrap';
import axios from 'axios'
import { tokenConfig } from '../../Utils/Common';
import { MDBDataTable } from 'mdbreact';
import Aux from "../../hoc/_Aux";

function ProjectDetails(props) {
    const [projects, setProject] = useState("");
    const [projectInfo, setProjectInfo] = useState("");
    const [error, setError] = useState(null);
    const [projectCreateModal, setprojectCreateModal] = useState(false);
    const [projectInfoModal, setprojectInfoModal] = useState(false);
    var projectId;

    useEffect(() => {
        getAllProjects();
      },[]);
    

    const getAllProjects = () => {

        axios.get('http://localhost:3000/projects',tokenConfig).then(response => {
            if (response.status === 200) {
                setProject(response.data)
              }
        }).catch(error => {
          if (error.response.status === 401) setError(error.response.data);
          else setError("Something went wrong. Please try again later.");
        });
      }

      var getProjectInfo = (projectId) => {

        axios.get('http://localhost:3000/projects/'+projectId,tokenConfig).then(response => {
            if (response.status === 200) {
                setProject(response.data)
              }
        }).catch(error => {
        console.log(error)
          if (error.response.status === 401) setError(error.response.data);
          else setError("Something went wrong. Please try again later.");
        });
      }



      
      const data = {
        columns: [
          {
            label: 'Project Name',
            field: 'project_name_link',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Project Team',
            field: 'project_team',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Created By',
            field: 'created_by_firstname',
            sort: 'asc',
            width: 150
          }],
          rows: [
            ]};

            
      for (var i in projects.result) {
        var proObj = projects.result[i]
        proObj["created_by_firstname"]=projects.result[i].created_by.first_name;
        proObj["project_name_link"]=<Button variant="link" onClick={() => setprojectInfoModal(true), getProjectInfo(projects.result[i].id.$oid)}>{projects.result[i].project_name}</Button>
        console.log(proObj)
        data.rows.push(proObj)
        
      };
      
      console.log(projects.id)

        return (
            <Aux>
                <Row>
                    <Col>
                    <Card>
                    <Card.Header>
                                <Card.Title as="h5">All Active Projects</Card.Title>
                                <Row><Col align = "right">
                                <Button variant="outline-primary" onClick={() => setprojectCreateModal(true)}>New Project</Button>
                                    </Col></Row>
                                
                            </Card.Header>
                            <Card.Body>
                                <MDBDataTable
                                    small
                                    order={['project_name', 'desc' ]}
                                    sorting={true}
                                    data={data}
                                />
                     </Card.Body>
                    </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Basic Table</Card.Title>
                                <span className="d-block m-t-5">use bootstrap <code>Table</code> component</span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Hover Table</Card.Title>
                                <span className="d-block m-t-5">use props <code>hover</code> with <code>Table</code> component</span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Striped Table</Card.Title>
                                <span className="d-block m-t-5">use props <code>striped</code> with <code>Table</code> component</span>
                            </Card.Header>
                            <Card.Body>
                                <Table striped responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    size="lg"
                    show={projectCreateModal}
                    onHide={() => setprojectCreateModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        New Project
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>...</Modal.Body>
                </Modal>


                <Modal
                    size="lg"
                    show={projectInfoModal}
                    onHide={() => setprojectInfoModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Project
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>
            </Aux>

        );
    }


export default ProjectDetails;