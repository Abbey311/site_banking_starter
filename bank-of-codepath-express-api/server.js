const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")
const bankRouter = require("./routes/bank")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())
app.use("/bank", bankRouter)

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  console.log('unique');
  
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

const PORT = 8082

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
