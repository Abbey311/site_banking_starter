import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"

export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [filterInput, setFilterInput] = useState("")
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])


  useEffect(() => {
    const fetchData = async () => {
    setIsFetching(true)
    try {
      const transactionsRes = await axios.get("http://localhost:8082/bank/transactions")
      if (transactionsRes?.data?.transactions) {
        setTransactions(transactionsRes.data.transactions)
      }
      const transfersRes = await axios.get("http://localhost:8082/bank/transfers")
      if (transfersRes?.data?.transfers) {
        setTransfers(transfersRes.data.transfers)
      }
    } catch (err) {
      console.log({ err })
      setError(err)
    }

      setIsFetching(false)
  }

      fetchData()
  }, [])
  


  return (
<div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                />
              }
            />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}