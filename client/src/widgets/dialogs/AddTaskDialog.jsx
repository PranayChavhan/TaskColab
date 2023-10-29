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
    Option,
    Select,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { API } from "@/services/api";


export function AddTaskDialog({ open, setOpen, handleOpen, projectId }) {

    const [imageURL, setImageURL] = useState('https://source.unsplash.com/random/900x200/?coding');

    console.log("Test Dialog")

    useEffect(() => {
        console.log(imageURL)
    }, [open])

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        status: '',
        due_date: '',
        priority: '',
        project_id: projectId ? projectId : ''
    });


    const handleStatus = (value) => {
        console.log("Value: ", value)
        setTaskData({ ...taskData, status: value })
    }

    const handlePriority = (value) => {
        console.log("Priority: ", value);
        setTaskData({ ...taskData, priority: value })
    }

    // useEffect(() => {
    //     setTaskData({ ...taskData, project_id: project._id })
    // }, [project])





    const submitCreateProject = async () => {
        if (!taskData.name || !taskData.description) {
            return toast.error("Please fill all details!")

        }
        try {


            const response = await API.addTask(taskData);

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
            console.log("# ERROR: ", err)
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
                    <Typography className="text-2xl mt-4 font-bold text-start">Add New Task</Typography>

                </DialogHeader>
                <DialogBody className="flex flex-col gap-8" >
                    <Input size="lg" label="Project Name" value={taskData.name} onChange={(e) => setTaskData({ ...taskData, name: e.target.value })} />
                    <Textarea label="Porject Description" value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
                    <div className="flex gap-3">
                        <div className="w-72">
                            <Select value={taskData.status} onChange={handleStatus} label="Status">
                                <Option value="completed">Completed</Option>
                                <Option value="inprogress">In Progress</Option>
                            </Select>
                        </div><div className="w-72">
                            <Select label="Priority" onChange={handlePriority} value={taskData.priority}>
                                <Option value="high">High</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="low">Low</Option>
                            </Select>
                        </div>
                        <div className="w-72">
                            <Input size="lg" type="date" label="Due Date" value={taskData.due_date} onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })} />
                        </div>
                    </div>
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