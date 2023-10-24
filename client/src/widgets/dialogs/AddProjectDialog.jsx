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
import toast, { Toaster } from "react-hot-toast";
import { API } from "@/services/api";


export function AddProjectDialog({ open, setOpen, handleOpen }) {

  const [imageURL, setImageURL] = useState('');


  useEffect(() => {
    setImageURL('https://source.unsplash.com/random/900x300/?coding');

    console.log(imageURL)

  }, [open])


  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
  });


  const submitCreateProject = async () => {
    if (!projectData.name || !projectData.description) {
      return toast.error("Please fill all details!")

    }
    try {
      const response = await API.addProject(projectData);

      if (response.isSuccess) {
        console.log("Successfully created project")

        toast.success("Project Created!!")
        //Verify OTP
        handleOpen();

      }
      else {
        console.log("Failed to sign in");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      toast.error(err.msg);
    }
  }






  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
          <Input size="lg" label="Project Name" value={projectData.name} onChange={(e) => setProjectData({ ...projectData, name: e.target.value })} />
          <Textarea label="Porject Description" value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} />
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
          <Button variant="gradient" color="blue" onClick={submitCreateProject}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}