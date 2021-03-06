import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import { CoursesList } from './courses-list';
import { employeeController } from '../controllers';

export const EmployeeCard = ({ name, position, gender, hascourses, courses }) => {
  const handleEdit = event => {
    let arr = "";
    for(let i =0; i<courses.length-1; i++){
      arr+=courses[i]+",";
    }
    arr+= courses[courses.length-1];
    Router.push("/employee/edit/?nameToEdit="+name+"&rolPos="+position+"&gen="+gender+"&arrel="+arr);
  };

  const handleDelete = async event => {
    await employeeController.delete(name)
    Router.reload()
  };

  return (
    <Card data-testid={`${name}-container`} style={{ width: "340px", height: "680px", alignContent:"center", alignItems:"center" }}> 
      <CardContent>
        <CardContent>
        
          <Grid container>
          <Button
              data-testid="delete-button"
              fullWidth
              color="primary"
              style={{
                marginLeft: "240px",
                width: "40px",
                height: "20px",
              }}
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </Button>
            <img src={gender=="Male"?"/img/employeeM.png":"/img/employeeW.png"} alt="employee-experience-featured-image" border="0" style={{
            marginLeft: "66px",
            marginTop: "-20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}/>
            <Grid>
              <Typography gutterBottom variant="h4" component="h2" name="name-employee">
                {name}
              </Typography>
              <Grid item xs={4} name="gender-employee" style ={{marginLeft: "44px"}}>
              <table >
                
                <td>
              {gender == "Male" ?
                <Avatar
                  variant="square"
                  src="/icons/icons8-male-96.png"
                  name="male-icon"
                  style={{ width: "30px", height: "30px" }} />
                :
                <Avatar variant="square"
                  src="/icons/icons8-female-96.png"
                  name="female-icon"
                  style={{ width: "30px", height: "30px" }} />
              }
               </td>
               <td >
              {hascourses ?
                <Avatar
                  variant="square"
                  src="/icons/aprove.png"
                  name="health-icon"
                  style={{ width: "30px", height: "30px" }} />
                :
                <Avatar
                  variant="square"
                  src="/icons/megative.png"
                  name="unhealthy-icon"
                  style={{ width: "30px", height: "30px" }} />
              }</td>
              <td>
              <Button
              data-testid="register-button"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                marginTop: "3px",
                marginBottom: "24px",
                marginLeft: "16px",
                marginRight: "16px",
                width: "100px",
                height: "30px"
              }}
              onClick={handleEdit}
            >
              Editar
            </Button>
              </td>
              </table>
           </Grid>
              <Typography gutterBottom variant="h6" component="h2" name="position-employee">
                <strong>Puesto:</strong> {position}
              </Typography>
            </Grid>
            
          </Grid>
          <CoursesList courses={courses} />
        </CardContent>
      </CardContent>
    </Card >
  );
}
