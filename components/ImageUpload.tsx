import { useCallback, useState } from 'react'
import { useDropzone } from "react-dropzone"
import Image from 'next/image'

type Props = {
    change:(base64:string) => void;
    label:string;
    disabled:boolean
    value:string
}

const ImageUpload = ({change, label, disabled , value}: Props) => {
    
    const [ base64, setBase64 ] = useState(value)

    const handleChange = useCallback((base64:string)=>{
        change(base64)
    },[change])

    const handleDrop = useCallback((files:any)=>{
        const file = files[0]
        const reader = new FileReader();

        reader.onload = (event:any)=>{
            // once base64 encoded is obtained update state with the string
            setBase64(event.target.result)
            handleChange(event.target.result)
        }

        // convert image binary to base64 encoded
        reader.readAsDataURL(file)
    },[handleChange])


    const {getRootProps, getInputProps} = useDropzone({
        maxFiles:1,
        onDrop: handleDrop,
        disabled,
        accept:{
            'image/jpeg':[],
            'image/png':[],
        }
    });

    return (
        <div {...getRootProps({className:'w-full p-2 text-white text-center border-2 border-dotted rounded-md border-neutral-700'})}>
            <input {...getInputProps()}/>
            {base64
                ? (
                    <div className={`flex items-center justify-center ${disabled ? 'cursor-not-allowed' : "cursor-pointer"}`}>
                        <Image
                            src={base64}
                            height="100"
                            width="100"
                            alt="Uploaded image"
                        />
                    </div>
                )
                : (<p className='text-white'>{label}</p>)
            }
        </div>
    )
}

export default ImageUpload