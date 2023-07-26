import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {preview} from '../assets';
import {getRandomPrompt} from '../utilis';
import { FormField, Loader } from '../component';
import { toast } from 'react-hot-toast'

//This file deals with the createpost page
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const generateImage = async() => {
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })
        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64, ${data.photo}`})
      } catch (error) {
        toast("error")
      }finally{
        setGeneratingImg(false);
      }
    }
    else{
      toast("Please enter a prompt")
    }
  }
  const handleSubmit = ()=> {

  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});{/**name */}
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt : randomPrompt})
  };{/**surprise me prompts */}
  return (
   <section className='max-w-7xl mx-auto'>
     <div>
        <h1 className='mt-1 font-extrabold'>
          Create
          </h1>
          <p>
            Create a collection of visually stunning images
            using DALLE AI 3.0 and share them with the community.
          </p>
      </div> 
      <form 
      className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
          labelName = "Your name"
          type = "text"
          name = "name"
          placeholder= "John Doe"
          value = {form.name}
          handleChange={handleChange}/>
            <FormField
          labelName = "Prompt"
          type = "text"
          name = "prompt"
          placeholder= "an armchair in the shape of an avocado"
          value = {form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe = {handleSurpriseMe}/>
           <div
           className='relative bg-slate-300 border border-slate-400 text-slate-200
           text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64
           p-3 flex justify-center items-center'>
            {form.photo ? (
              <img
              src={form.photo}
              alt={form.prompt}
              className='w-full h-full object-contain'/>
            ): (
              <img
              src={preview}
              alt={preview}
              className='w-9/12 h-9/12 object-contain opacity-30'/>
            )}
            {generatingImg && (
              <div
              className='absolute inset-0 z-0 flex justify-center items-center
              bg-[rgba(249,213,213,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
           </div>
        </div>
        <div 
        className='mt-5 flex gap-5'>
          <button
          type="button"
          onClick={generateImage}
          className='text-white bg-blue-400 font-medium rounded-md text-sm
          w-full sm:w-auto px-5 py-2 hover:bg-blue-600'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-3'>
          <p className=''>Once you have created the image you want, you can share with others in the community.Your contribution is always welcomed and appreciated by the community.</p>
        <button
        type='submit'
        className='mt-3 text-white text-sm text-center bg-green-400 hover:bg-green-600 rounded-md px-5 py-2 w-full sm:w-auto '>
          {loading ? "Sharing" : "Share with the community"}
        </button>
        </div>
      </form>   
   </section>
  )
}

export default CreatePost