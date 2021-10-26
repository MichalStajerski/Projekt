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
    <th>
      <th>
        {name}
      </th>
    </th>
  )
}
