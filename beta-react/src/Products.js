import { useState } from 'react'
function ProductTable () {
  const [state, setState] = useState(false)
  const [search, setSearch] = useState('')

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
      : <span style={color = 'red'}>{product.name}</span>
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

  function SearchBar () {
    return (
      <section>
        <input onChange={e => setSearch(e.target.value)}>Search</input>
        <input type='checkbox' onChange={setState(!state)} />
      </section>
    )
  }

  return (
    <state>
      <SearchBar />
      <ProductsCategory />
      <ProductRow />
    </state>
  )
}
