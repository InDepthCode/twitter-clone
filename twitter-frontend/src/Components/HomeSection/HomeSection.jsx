import { Avatar } from '@mui/material'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image'
const validationSchema = () =>{
  content:Yup.string().required("Tweet text is required")
}



const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit= (value) =>{
    console.log("values ", value);
  }

  const formik = useFormik({
    intialValue:{
      content:"",
      image:""
    },
    onSubmit:handleSubmit,
    validationSchema,
  })

  const handleSelectImage =(event) =>{

  }

  return (
    <div className='space-y-5'>

      <section>
        <h1 className='py-5 text-xl font-bold opacity-90 text-red-500 '>Home</h1>
      </section>

      <section className={`pb-10`}> 
        <div className='flex items-start space-x-5'>
          <Avatar alt='username'
          src= "https://i.pravatar.cc/150?u=consistentmaleid" />
        <div className='w-full'>
          <form>
            <div>
              <input type="text" name='content' placeholder='What is happening' className={`border-none outline-none text-xl bg-transparent`}  {...formik.getFieldProps("content")}/>
              {formik.errors.content && formik.touched
              .content && ( <span className='text-red-500'>{formik.errors.content}</span>)}
            </div>

            {/* <div>

            </div> */}

            <div className='flex justify-between items-center mt-5'>
              <div className='flex space-x-5 items-center'>
                 <ImageIcon className='text-[#1d9bf0]' />
                  <input type="file" name='imageFile' className='hidden' onChange={handleSelectImage} />
              </div>

            </div>

          </form>
        </div>
        </div>

      </section>
    </div>
  )
}

export default HomeSection