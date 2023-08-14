import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { useEffect, useState } from 'react'
import { slicePage,sliceData } from '../common/Functions';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function Container(props) {
 
    const [currentPage, setCurrentPage] = useState(1)
  
    useEffect(() => {
      setCurrentPage(1)
    }, [props.source])
  
    let countries = props.source
    let max = Math.ceil(countries.length/10)
    let pages = []
    let x = 0
    
    while(x<max){
      x++
      pages.push(x)
    }
  
    let data = sliceData(countries,currentPage,10)
    let currentPages = slicePage(pages,currentPage,2)
  
    const handlePrevious = () => {  
      if(currentPage>1){
        setCurrentPage(currentPage-1)
      }
    }
  
    const handleNext = () => {
      if(currentPage<max){
        setCurrentPage(currentPage+1)
      }
    }
  
    const handlePageChange = (e) => {
      setCurrentPage(Number(e.target.innerHTML))
    }
    
    return (
    <section className='homePage__board'>
          <h1 className='homePage__title big-text no-space'>Countries and their flags</h1>
          <div className='homePage__countries'>
            { data.map(c=>{
              return(
                <Link key={c.id} to={`/countries/countries/${c.id}`}  className='homePage__card'>
                  <figure key={c.id}>
                    <img src={c.image} className='homePage__cardImg'/>
                    <figcaption className='homePage__cardText'>{c.name}</figcaption>
                  </figure>
                </Link>
              )
            })}
          </div>
          <div className='homePage__navButtons no-space'>
            {data.length === 0 && <p className='homePage__errorMsg'>{props.errorMessage && props.errorMessage}</p>}
            <button onClick={handlePrevious} className={currentPage === 1 ? "pagination__current--button pagButton" :'pagButton'}><FiChevronLeft className="symbolSearch"/></button>
            {currentPage && <button onClick={()=>setCurrentPage(1)} className={currentPage === 1 ? 'pagination__current--button pagButton' :'pagButton'}>1</button>}
            {(currentPage >4 && pages.length>13) && <span>...</span>}
            {currentPages.filter(p=>p>0 && p<=max).map(p=>{
              return(
                <button onClick={handlePageChange} className={currentPage === p ? "pagination__current--button pagButton": "pagButton"} key={p}>{p}</button>
                )
              }
              )}
            {(currentPage + 4) < max && <>
              <span>...</span>
              <button onClick={()=>setCurrentPage(max)} className='pagButton'>{max}</button>
              </>
            }
            <button onClick={handleNext} className={currentPage === max ? "pagination__current--button pagButton":'pagButton'}><FiChevronRight className="symbolSearch"/></button>
          </div>
        </section>
  )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps,null)(Container)
