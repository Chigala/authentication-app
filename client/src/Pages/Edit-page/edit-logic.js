import { useDispatch, useSelector } from 'react-redux'
import { getImage } from '../../redux/data'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from "axios"


export const useOnDrop = () => {
  const [image, setimage] = useState('')
  const [file, setfile] = useState('')
  const dispatch = useDispatch(); 
  const onDrop = acceptedFile => {
    const filePreview = acceptedFile.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    )
    setfile(filePreview);
    

    const image = filePreview.map(item => item.preview)
    dispatch(getImage(image)); 
    setimage(image)
  }

  const { getRootProps,getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop
  })

  return { getRootProps,getInputProps, image, file }
}


