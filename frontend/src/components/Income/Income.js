import React, { useEffect,useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { useReactToPrint } from 'react-to-print'
import { rupee } from '../../utils/Icons';

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome, updateIncome, searchHandle} =
    useGlobalContext();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className='total-income'>
          Total Income: <span>{rupee}: {totalIncome()}</span>
        </h2>
        <div className='income-content'>
          <div className='form-container'>
            <Form />
          </div>
          <div className='incomes'>
          <input type='' className='search-income-box' placeholder='Search Income' 
                        onChange={searchHandle} />
          <button onClick={handlePrint} className='print_button'> Print </button>
                        <div ref={componentRef} className="card">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem ref={componentRef} className="card"
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)" 
                  deleteItem={deleteIncome}
                  updateItem={updateIncome}
                />
              );
            })}
          </div>
        </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {

      flex: 1;
      .print_button{
        padding:.8rem 1.6rem;
        borderRadius: 30px;
        background-color:#ffc107;
        border:2px solid #ffffff;
        color:white;
        
      }
      .search-income-box{
        width: 400px;
        margin: 20px;
        height: 38px;
        padding-left: 30px;
        border: solid 1px skyblue;
      }
    }
  }
`;

export default Income;
