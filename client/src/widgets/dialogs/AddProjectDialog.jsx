import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  Textarea,
  DialogBody,
  Input,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";


export function AddProjectDialog({ open, handleOpen }) {

  const [imageURL, setImageURL] = useState('');

  
  useEffect(() => {
    setImageURL('https://source.unsplash.com/random/900x300/?coding');

    console.log(imageURL)

  }, [open])



  return (
    <>
      <Dialog open={open} handler={open}>
        <DialogHeader className="flex flex-col">
          <img

            className="h-56 w-full rounded-lg object-cover object-center"
            src={imageURL}
            alt="nature image"
            loading="lazy"
          />


          <Typography className="text-2xl mt-4 font-bold text-start">Add New Project</Typography>

        </DialogHeader>
        <DialogBody className="flex flex-col gap-8" >
          <Input size="lg" label="Project Name" />
          <Textarea label="Porject Description" />
          <Input size="lg" type="file" label="Project Image" />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}