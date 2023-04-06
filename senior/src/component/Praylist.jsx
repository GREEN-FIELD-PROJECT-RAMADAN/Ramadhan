import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Praylist = () => {
    const [prayer, setPrayer] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3005/ramadhan/prayerTime')
          .then(({ data }) =>
            setPrayer(data))
          .catch((err) => console.log(err))
      }, [])
    return (
        <div className="table d-flex p-5" >
            <table class="table table-light  table-hover ">
                <thead>
                 <tr className="text-center"><th colspan="8" class="text-center display-5" >بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</th></tr>
                    <tr className="text-center"> <th colspan="8" class="text-center h1 mb-5">Prayer Times</th> </tr>
                  <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Fajr</th>
                        <th scope="col">Imsak</th>
                        <th scope="col">Sunrise</th>
                        <th scope="col">Dhuhr</th>
                        <th scope="col">Asr</th>
                        <th scope="col">Maghrib</th>
                        <th scope="col">Isha</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {prayer.length > 0 ? (
                        prayer.map((pray, i) => (
                            <tr key={i}>
                                <td>{pray.date}</td>
                                <td>{pray.Fajr}</td>
                                <td>{pray.Imsak} </td>
                                <td>{pray.Sunrise}</td>
                                <td>{pray.Dhuhr}</td>
                                <td>{pray.Asr} </td>
                                <td>{pray.Maghrib} </td>
                                <td>{pray.Isha} </td>
                            </tr>
                        ))
                    ) : null}
                </tbody>
            </table>
        </div>
       
    )
}

export default Praylist
