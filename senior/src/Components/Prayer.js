import React from 'react'



const Prayer = ({prays}) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead >
            {console.log(prays)}
          <tr>
            <th>Date</th>
            <th>Fajr</th>
            <th>Sunrise</th>
            <th>Dhuhr</th>
            <th>Asr</th>
            <th>Maghrib</th>
            <th>Isha </th>
            <th>Imsak </th>
          </tr>
        </thead>
        <tbody>
        {prays.length > 0 ? (
            prays.map((prays, i) => (
              <tr key={i}>
               
                
                <td>{prays.date}</td>
                <td>{prays.Fajr}</td>
                <td>{prays.Imsak} </td>
                <td>{prays.Sunrise}</td>
                <td>{prays.Dhuhr}</td>
                <td>{prays.Asr} </td>
                <td>{prays.Maghrib} </td>
                <td>{prays.Isha} </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
       
        </tbody>
      </table>
    </div>
  )
}

export default Prayer








