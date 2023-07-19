import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button} from '@mui/material';
import {
    EditableText,
    Toaster,
    Position,
  } from "@blueprintjs/core"

  const AppToaster = Toaster.create({
    position: Position.TOP,
  })
  
export default function Reservation() {
    const paperStyle = {padding:'50px 20px', width:600,margin:"20px auto"}
    const [customerName,setCustomerName] = React.useState('')
    const [reservationLocation,setReservationLocation] = React.useState('')
    const [luggageSize,setLuggageSize] = React.useState('')
    const [hotelRoom,setHotelRoom] = React.useState('')
    const [reservations,setReservations]= React.useState([])
  
    const handleClick = (e)=>{
        e.preventDefault()
        const reservation = {customerName,reservationLocation,luggageSize,hotelRoom}
        fetch("http://localhost:8080/booking/reservation",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reservation)

        }).then(()=>{
          AppToaster.show({
            message: "User created successfully",
            intent: "success",
            timeout: 3000,
          })
        })
    }

    React.useEffect(()=>{
         fetch("http://localhost:8080/booking/reservations")
        .then(response=>response.json())
        .then((result)=>{
        setReservations(result)
        }
    )},[])


    const deleteUser = (id) => {
        fetch("http://localhost:8080/booking/reservations/"+id, {
          method:"DELETE"
        })
          .then(response => response.json())
          .then(() => {
            AppToaster.show({
              message: "User deleted successfully",
              intent: "success",
              timeout: 3000,
            })
          })
      }

      const updateUser = (id) => {
        const data = reservations.find(data => data.id === id)
        fetch("http://localhost:8080/booking/reservations/"+id, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
          .then(response => response.json())
          .then(() => {
            AppToaster.show({
                message: "Reservation done successfully",
                intent: "success",
                timeout: 3000,
              })
          })
      }

      const onChangHandler = (id, key, value) => {
        setReservations(values => {
          return values.map(item =>
            item.id === id ? { ...item, [key]: value } : item
          )
        })
      }
    
    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
     <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}><u>Make a Booking Reservation</u></h1>
      <TextField id="outlined-basic" label="Customer Name" variant="outlined" fullWidth
      value={customerName}
      onChange={(e)=>setCustomerName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Reservation Location" variant="outlined" fullWidth
       value={reservationLocation}
       onChange={(e)=>setReservationLocation(e.target.value)}
      />
      <TextField id="outlined-basic" label="Total Luggage"   type="number" variant="outlined" fullWidth
       value={luggageSize}
       onChange={(e)=>setLuggageSize(e.target.value)}
      />
      <TextField id="outlined-basic" label="Room Number"   type="number" variant="outlined" fullWidth
       value={hotelRoom}
       onChange={(e)=>
        setHotelRoom(e.target.value)}
      />
      <Button variant="outlined" size="large" color="primary" onClick={handleClick}>
          Submit
        </Button>
      </Paper>

    
      <h1>Existing Reservations</h1>
      <Paper elevation={3} style={paperStyle}>
      <div className="App">
      <table class="bp4-html-table .modifier">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Luggage Size</th>
            <th>Hotel Room</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reser=> (
            <tr key={reser.id}>
              <td>
               <EditableText value={reser.customerName}  onChange={value => onChangHandler(reser.id, "customerName", value)}/>
            </td>
              <td>
                <EditableText value={reser.reservationLocation}  onChange={value => onChangHandler(reser.id, "reservationLocation", value)}/>
              </td>
              <td>
                <EditableText value={reser.luggageSize} onChange={value => onChangHandler(reser.id, "luggageSize", value)} />
              </td>

              <td>
                <EditableText value={reser.hotelRoom} onChange={value => onChangHandler(reser.id, "hotelRoom", value)}/>
              </td>
              <td>
                <Button intent="primary" onClick={() => updateUser(reser.id)}>Update</Button>
                &nbsp;
                <Button intent="danger" onClick={() => deleteUser(reser.id)}>Delete</Button>
              </td>
            </tr>
          
          ))}
        </tbody>
      </table>
    </div>
      </Paper>
      </Container>
    </Box>
  );
}