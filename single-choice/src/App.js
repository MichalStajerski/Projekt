import logo from './logo.svg'
import './App.css'
import { orders } from './orders'
import Order from './Order'

function App () {
  return (
    <section>
      <h1>Polecenie:</h1>
      {orders.map(singleOrder => (
        singleOrder.id === 0
          ? <Order
              key={singleOrder.id}
              order={singleOrder.order}
            />
          : null
      ))}
    </section>
  )
}

export default App
