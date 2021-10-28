import { useState } from 'react'
function FillableProductTable ({ products }) {
  const [state, setState] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <section>
      <SearchBar
        state={state}
        search={search}
      />
      <ProductsCategory />
      <ProductRow />
    </section>
  )
}
function ProductsCategory ({ category }) {
  return (
    <tr>
      <th>
        {category}
      </th>
    </tr>
  )
}

function ProductRow ({ product }) {
  const name = product.inStock ? product.name
    : <span style={{ color: 'red' }}>{product.name}</span>
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {product.price}
      </td>
    </tr>
  )
}

function SearchBar ({ state, search }) {
  return (
    <section>
      <input
        type='text'
        value={search}
        // onChange={e => setSearch(e.target.value)}
        placeholder='Search'
      />
      <input
        type='checkbox'
        value={state}
        // onChange={setState(!state)}
      />
    </section>
  )
}

function ProductTable ({ products, state, search }) {
  const rows = []
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' }
]

export default function Products () {
  return <FillableProductTable products={PRODUCTS} />
}
