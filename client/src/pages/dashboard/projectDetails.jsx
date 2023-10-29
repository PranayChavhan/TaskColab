import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    DialogFooter,
    Tooltip,
    Chip,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";

import { Toaster, toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { AddTaskDialog } from "@/widgets/dialogs/AddTaskDialog";
import { useContext } from "react";
import { DataContext } from "@/context/DataProvider";

export function ProjectDetails() {


    const { account } = useContext(DataContext);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const handleUserDialog = () => {
        setOpenUserDialog(!openUserDialog)
    }

    const handleTaskDialog = () => {
        console.log("Helloo")
        console.log(openTaskDialog);
        setOpenTaskDialog(!openTaskDialog)
    }

    const { projectId } = useParams();
    console.log("Project ID:", projectId)

    const [thumbnail, setThumbnail] = useState(null)
    const [loader, setLoader] = useState(false);

    const [project, setProject] = useState(null);
    const [users, setUsers] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Proceed To Signup
                let response = await API.getProjectDetails({ id: projectId });
                if (response.isSuccess) {
                    console.log("Project found!");
                    console.log(response.data);
                    setProject(response.data.project)
                    setThumbnail(import.meta.env.VITE_API_BASE + 'uploads/' + response.data.project.image)
                    console.log(import.meta.env.VITE_API_BASE + 'uploads/' + response.data.project.image)
                    setThumbnail()
                    console.log(response.data)
                } else {
                    console.log("Failed to sign in");
                }
            } catch (err) {
                console.log("# ERROR: ", err)
                console.error("Error:", err);
                toast.error(err.msg);
            }
        };


        const fetchUsers = async () => {
            try {
                let response = await API.getUsers();
                if (response.isSuccess) {
                    console.log("Users found!")
                    console.log(response.data)
                    setUsers(response.data.users)
                } else {
                    console.log("Failed to get users");
                }
            } catch (err) {
                console.log("USER")
                console.log("# ERROR: ", err);
            }
        }

        fetchData(); // Call the async function immediately 
        fetchUsers();

    }, []);

    useEffect(() => {
        console.log("Projects")
        console.log(project)
    }, [loader])

    //Add User Feature
    const addMember = async (userId) => {
        try {
            const memberData = {
                projectId: project.id,
                userId: userId
            }
            console.log("Hiiii")
            console.log(memberData.projectId);
            console.log(memberData.userId);
            const response = await API.addMember(memberData);

            console.log(response)

            if (response.isSuccess) {
                toast.success("User Added!")
            } else {
                toast.error("User Cannot Be Added!!!")
            }
        } catch (err) {
            toast.error("User Cannot Be Added!!!")

            console.log('# ERROR', err)
        }
    }





    return (
        <>
            {/* {
                project ? <Spinner className="h-12 w-12" /> :
                    <> */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className={`relative mt-8 h-72 w-full overflow-hidden rounded-xl ${thumbnail ? `bg-[url(${thumbnail})]` : "bg-[url(https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvamVjdCB0ZWFtfHx8fHx8MTY5ODA4ODE2OQ&ixlib=rb-4.0.3&q=80&w=1080)]"} bg-cover	bg-center`}>
                <div className="absolute inset-0 h-full w-full bg-orange-400/20" />
            </div >
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                <CardBody className="p-4 py-8">
                    <div className="flex flex-col px-4 gap-12 md:flex-row">
                        <div className="w-full md:w-2/3">
                            <Typography variant="h5" color="blue-gray" className="mb-3">
                                {project ? project.name : "Project"}
                            </Typography>
                            <Typography className="mb-3">
                                {project ? project.description : "Project"}
                            </Typography>
                            <div className="flex  mt-10 flex-col">
                                <div className="flex flex-shrink items-center justify-between">
                                    <div className="members-text">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Tasks
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal mb-2 text-blue-gray-500"
                                        >
                                            Architects design houses
                                        </Typography>
                                    </div>
                                    <Button onClick={handleTaskDialog} variant="outlined" size="sm">
                                        <i className="fa fa-plus" /> Add Task
                                    </Button>
                                </div>
                                <table className="w-full mt-4 min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {["Id", "Name", "Status", "Assigne"].map(
                                                (el) => (
                                                    <th
                                                        key={el}
                                                        className="border-b  border-blue-gray-50 py-3 px-5 text-left"
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            className="text-sm font-bold uppercase text-blue-gray-400"
                                                        >
                                                            {el}
                                                        </Typography>
                                                    </th>
                                                )
                                            )}
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            project ? project.tasks.map(
                                                (t, i) => (
                                                    <tr>
                                                        <td className="py-3 px-5">{i + 1}</td>
                                                        <td className="py-3 px-5">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-bold"
                                                            >
                                                                {t.name}
                                                            </Typography>
                                                        </td>
                                                        <td className="py-3 px-5">
                                                            <Chip value={t.status} color="green" size="sm" variant="ghost" />
                                                        </td>
                                                        <td>
                                                            {t.fk_user ?
                                                                <div className="flex items-center gap-4">
                                                                    <Avatar src={task.profile_image_url} alt="avatar" />
                                                                    <div>
                                                                        <Typography variant="h6">Tania Andrew</Typography>
                                                                        <Typography variant="small" color="gray" className="font-normal">
                                                                            Web Developer
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <Button variant="text" size="sm">
                                                                    view
                                                                </Button>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            ) : ''
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className=" w-1/3 px-4 pb-4">
                            <div className="flex flex-shrink items-center justify-between">
                                <div className="members-text mb-6">
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Members
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-500"
                                    >
                                        Architects design houses
                                    </Typography>
                                </div>
                                <Button onClick={handleUserDialog} variant="outlined" size="sm">
                                    Add member
                                </Button>
                            </div>

                            <ul className="flex flex-col gap-6">
                                {project && project.members.map((props) => (
                                    <MessageCard
                                        key={props.name}
                                        name={props.firstname + " " + props.lastname}
                                        img={props.profile_image_url}
                                        action={
                                            <Button variant="text" size="sm">
                                                view
                                            </Button>
                                        }
                                    />
                                ))}
                            </ul>

                        </div>
                    </div>
                </CardBody>
            </Card>

            <Dialog

                size="xs"
                open={openUserDialog}
                handler={handleUserDialog}
            >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <DialogHeader className="justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Add User on Project
                    </Typography>

                    <IconButton
                        color="red"
                        size="sm"
                        variant="text"
                        icon
                        onClick={handleUserDialog}
                    >
                        <i className="fa fa-close text-xl" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="w-full">
                    <ul className="flex flex-col gap-6 px-3 w-full">
                        {users && users.map((props) => (
                            <MessageCard
                                key={props.name}
                                name={props.firstname + " " + props.lastname}
                                img={props.profile_image_url}

                                action={
                                    <Button onClick={() => addMember(props.user_id)} variant="text" size="sm">
                                        ADD
                                    </Button>
                                }
                            />
                        ))}
                    </ul>
                </DialogBody>
            </Dialog>


            {/* Add TASK  MODAL */}
            <AddTaskDialog open={openTaskDialog} handleOpen={handleTaskDialog} projectId={projectId} />
        </>
        //     }
        // </>
    );
}

export default ProjectDetails;
