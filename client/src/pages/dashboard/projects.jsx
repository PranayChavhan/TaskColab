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
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useEffect, useState } from "react";
import { API } from "@/services/api";

export function Projects() {
  const [loader, setLoader] = useState(false);

  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Proceed To Signup
        let response = await API.getProjects();

        if (response.isSuccess) {
          console.log("Successfully Created Project!");
          console.log(response.data);

          const recievedProjects = response.data.projects;
          if (recievedProjects && Array.isArray(recievedProjects)) {
            setProjects(recievedProjects);
            console.log(response.data.projects);
            setLoader(true);

          }
        } else {
          console.log("Failed to sign in");
        }
      } catch (err) {
        console.log("# ERROR: ", err)
        console.error("Error:", err);
        toast.error(err.msg);
      }
    };

    fetchData(); // Call the async function immediately

  }, []);

  useEffect(() => {
    console.log("Projects")
    console.log(projects)
  }, [loader])





  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvamVjdCB0ZWFtfHx8fHx8MTY5ODA4ODE2OQ&ixlib=rb-4.0.3&q=80&w=1080)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-orange-400/20" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">

        {
          projects ?
            (projects.length > 0) &&
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">

                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1 mt-2">
                      My Projects
                    </Typography>

                  </div>
                </div>

              </div>

              <div className="px-4 pb-4">
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                  {loader && projects !== null ? projects.map(
                    ({ project_id, image, name, description, tag, route, members }) => (
                      <Card key={name} color="transparent" shadow={false}>
                        <CardHeader
                          floated={false}
                          color="gray"
                          className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                        >
                          <img
                            src={import.meta.env.VITE_API_BASE + `uploads/${image}`}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody className="py-0 px-1">
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            #ProjectId{project_id}
                          </Typography>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mt-1 mb-2"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {description}
                          </Typography>
                        </CardBody>
                        <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                          <Link to={`/dashboard/projects/${project_id}`}>
                            <Button variant="outlined" size="sm">
                              view project
                            </Button>
                          </Link>
                          <div>
                            {/* {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                }`}
                            />
                          </Tooltip>
                        ))} */}
                          </div>
                        </CardFooter>
                      </Card>
                    )
                  ) :
                    <p>Hello</p>

                  }
                </div>
              </div>
            </CardBody>
            :
            <p>No Projects</p>
        }

      </Card>
    </>
  );
}

export default Projects;
