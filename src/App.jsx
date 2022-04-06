import axios from "axios";
import React from "react";
import Pagination from "./components/Pagination";

function App() {
  // Если не задавать статически это значение - 
  // То я знаю, что с бэка можно передавать общее значение в header
  const companiesSize = 50
  const pageSize = 10
  const maxCompaniesPage = Math.ceil(companiesSize / pageSize)

  const [companies, setCompanies] = React.useState([])
  const [companiesPage, setCompaniesPage] = React.useState(1)

  React.useEffect(() => {
    axios
      .get(`http://test.runcall.ru/Api/GetCallCampaigns?Page=${companiesPage}&pageSize=${pageSize}`)
      .then(({ data }) => {
        setCompanies(data)
      })
      .catch(error => console.log(error))
  }, [companiesPage])


  console.log(maxCompaniesPage, companiesPage)

  const pageHandler = (newPage = 1) => {
    setCompaniesPage(newPage)
  }

  return (
    <div className="main-wrapper">
      <div className="container">
        {
          companies.length
            ? <div className="company">
              {
                companies.map(company => {
                  return <div
                    key={company.id}
                    className="company__item"
                  >
                    <span>{company.name}</span>
                  </div>
                })
              }
            </div>
            : 'Загрузка'
        }
        
        <Pagination
          className='company__pagination'
          currentPage={companiesPage}
          maxPage={maxCompaniesPage}
          pageHandler={(newPage) => pageHandler(newPage)}
        />
      </div>
    </div>
  );
}

export default App;