export default function Profile ({ name, imageId }) {
  const imageUrl = (`https://i.imgur.com/${imageId}s.jpg`)
  return (
    <div>
      <h1>{name}</h1>
      <img
        className='avatar'
        alt={name}
        src={imageUrl}
      />
    </div>
  )
}
