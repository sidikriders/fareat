import React, { Component } from 'react';
import axios from 'axios'


import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

export default class NewAbsent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      currUser: {
        "name": "Sidik Hidayatullah",
        "password": "$2a$10$t0zFGS2skAdRVQUV1/fl..ehk5dTRJLojPk1Yd5d87T0gyIuWzPie",
        "email": "sidik@guru.com",
        "_id": "598d57ef97ec530ceabb8cdb"
      },
      newAbsentSubject: "",
      newAbsentClassName: "",
      classList: [],
      msg: {
        msg: '',
        color: ""
      }
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", border: "2px solid black", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="title is-3">Create New Absent</p>
          </div>
          <div className="field">
            <p className="subtitle is-4">please fill all the data yaa</p>
          </div>
          <p className="subtitle is-6" style={{color: this.state.msg.color}}>{this.state.msg.msg}</p>
          <div className='field columns' style={{border: "1px solid black", width: '50%', margin: 'auto'}}>
            <div className='column'>
              <div>
                <label className='label'>Subject</label>
              </div>
              <div>
                <input className='input' style={{borderRadius: '0'}} placeholder="New Subject" onChange={(e) => this.setState({newAbsentSubject: e.target.value})}/>
              </div>
            </div>
            <div className='column'>
              <div>
                <label className='label'>Class</label>
              </div>
              <div className="select is-fullwidth">
                <select onChange={(e) => this.setState({newAbsentClassName: e.target.value})}>
                  <option>Select Class Name</option>
                  { this.state.classList.map( x => {
                    return (
                      <option key={x}>{x}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='field columns' style={{border: "1px solid black", width: '20%', margin: 'auto'}}>
            <div className='column'>
              <p className="button is-danger" onClick={() => this.createAbsentGoGo()}>Create</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  createAbsentGoGo() {
    if (this.state.newAbsentClassName === "Select Class Name" || this.state.newAbsentSubject === "" || this.state.newAbsentClassName === "") {
      this.setState({
        msg: {
          msg: "please fill all requirements first",
          color: 'red'
        }
      })
    } else {
      let self = this;
      axios.get('http://localhost:3000/api/students/class/'+this.state.newAbsentClassName+'/'+this.state.currUser._id)
      .then(response => {
        axios.post('http://localhost:3000/api/absents', {
          student_id: response.data,
          subject: self.state.newAbsentSubject,
          class_name: self.state.newAbsentClassName,
          user_id: self.state.currUser._id
        })
        .then(rezponse => {
          self.setState({
            msg: {
              msg: 'Create absent success!',
              color: "#20e8b2"
            }
          })
        })
        .catch(err => {
          alert('ERROR: POSTING ABSENT')
        })
      })
      .catch(err => {
        alert('ERROR: GETTING STUDENT')
        console.log(err);
      })
    }
  }

  getClassListCurrUser() {
    axios.get('http://localhost:3000/api/classList/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        classList: response.data.map(x => x.name)
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    this.getClassListCurrUser()
  }
}
