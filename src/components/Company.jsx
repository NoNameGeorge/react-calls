import axios from 'axios';
import React from 'react';

const Company = ({ id, name }) => {
    // Я либо не до конца разобрался с API
    // Либо у меня не получается :)
    // При запросах ?filters=name@="a" или ?filters=name@=a, или ?sorts=name
    // У меня выходит ошибка, поэтому я скопировал "БД" на json-server, чтобы подгружать данные с него
    const pageSize = 10

    const [active, setActive] = React.useState(true)
    const [calls, setCalls] = React.useState([])
    const [callsPage, setCallsPage] = React.useState(1)

    React.useEffect(() => {
        if (active) {
            // axios
            //   .get(`http://test.runcall.ru/Api/GetCallResults?Page=${callsPage}&pageSize=${pageSize}`)
            //   .then(({ data }) => {
            //     setCalls(data)
            //   })
            //   .catch(error => console.log(error))
        }
    }, [])

    const pageHandler = (newPage = 1) => {
        setCallsPage(newPage)
    }
   
    return (
        <div
            className={`company__item ${active ? 'active' : ''}`}
        >
            <span
                onClick={() => setActive(!active)}
            >
                {name}
            </span>
            {
                active &&
                <div className="company__calls">
                    {
                        calls.map(call => {
                            return <div
                                key={call.id}
                                className='compane__call'
                            >

                            </div>
                        })
                    }
                </div>  
            }
        </div>
    );
};

export default Company;