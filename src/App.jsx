import axios from "axios";
import React from "react";

import Company from "./components/Company";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

function App() {
  // Если не задавать статически это значение - 
  // То я знаю, что с бэка можно передавать общее значение в header
  const companiesSize = 50
  const pageSize = 10
  const maxCompaniesPage = Math.ceil(companiesSize / pageSize)

  const [companies, setCompanies] = React.useState([])
  const [companiesPage, setCompaniesPage] = React.useState(1)
  const [isSearching, setIsSearching] = React.useState(false)

  const [searchValue, setSearchValue] = React.useState('')
  const [sortType, setSortType] = React.useState(null)

  React.useEffect(() => {
    setIsSearching(prev => !prev)
    let params = `?_page=${companiesPage}&_limit=${pageSize}`

    if (searchValue) {
      params += '&name_like=^' + searchValue
    }
    if (sortType) {
      params += '&' + sortType
    }

    axios
      .get(`http://localhost:3001/companies${params}`)
      .then(({ data }) => {
        setCompanies(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsSearching(prev => !prev)
      })
  }, [companiesPage, searchValue, sortType])

  // Old request
  // React.useEffect(() => {
  //   axios
  //     .get(`http://test.runcall.ru/Api/GetCallCampaigns?Page=${companiesPage}&pageSize=${pageSize}`)
  //     .then(({ data }) => {
  //       setCompanies(data)
  //     })
  //     .catch(error => console.log(error))
  // }, [companiesPage])

  const pageHandler = (newPage = 1) => {
    setCompaniesPage(newPage)
  }

  return (
    <div className="main-wrapper">
      <div className="container main">
        <div className="company-title">Компании</div>
        <Filters
          value={searchValue}
          onChange={setSearchValue}
          sortHandler={setSortType}
          sortType={sortType}
        />
        {
          companies.length
            ? <div className="company">
              {
                companies.map(company => {
                  return <Company
                    key={company.id}
                    {...company}
                  />
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
