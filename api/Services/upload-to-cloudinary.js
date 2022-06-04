const axios = require("axios")
const FormData = require("form-data"); 
const uploadToCloud = async file => {
  const data = new FormData()
  data.append('file', file[0])
  data.append('upload_preset', 'chigala')
  data.append('cloud_name', 'chigala')
  console.log(data)

  let response = await axios.post(
    ' https://api.cloudinary.com/v1_1/chigala/image/upload',
    data
  )

  let imageUrl = response.data.url

  return imageUrl; 
}

module.exports = uploadToCloud; 