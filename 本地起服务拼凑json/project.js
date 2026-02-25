const newPost = [
  {
    id: 9006,
    name: 'Richard Yuen',
    logo: 'https://public.rootdata.com/images/b6/1697873715803.jpg',
  },
].map(item => {
  return {...item, type: 'person'}
})

document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const data = {data: newPost};
  
  fetch('http://localhost:3000/dingkaile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Created Post:', data);
      alert('Post created successfully!');
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error creating post.');
  });
});

