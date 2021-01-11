import React, { useState, useEffect } from 'react';
import {getAllResidents, getResidentsBySemester} from '../apiCalls';
import ControlledOpenSelect from '../Form/Form';
import SingleLineGridList from '../Thumbnails/Thumbnails'

export default function FindARoomate() {
  const [semester, setSemester] = useState('');
  const [residents, setResidents] = useState([]);
  const [availableResidents, setAvailableResidents] = useState([]);


  useEffect(() => {
    if (!availableResidents.length) {
      getResidents();
    } else {
      getAvailableResidents(semester);
    }
  }, [])

  const getResidents = async () => {
    await getAllResidents()
    .then(data => setResidents(data))
    .catch(err => console.log(err))
  }

  const selectSemester = (selectedSemester) => {
    setSemester(selectedSemester)
    getAvailableResidents(semester)
  }

  const getAvailableResidents = async (semester) => {
    await getResidentsBySemester(semester)
    .then(data => setAvailableResidents(data))
    .catch(err => console.log(err))
  }
  
  return(
    <div>
      <div style={{paddingTop: 90, paddingBottom: 80}}>
      <h1 style={{color:"#7c8181"}}>Select a semester:</h1>
      <ControlledOpenSelect style={{marginTop:-20}} selectSemester={selectSemester}/>
      </div>
      <SingleLineGridList availableResidents={availableResidents} allResidents={residents} semesterAvailable={semester}/>
    </div>
  )
}