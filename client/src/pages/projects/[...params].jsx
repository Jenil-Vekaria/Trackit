import AddEditProject from "@/components/projects/AddEditProject";
import ViewProject from "@/components/projects/ViewProject";
import { useRouter } from "next/router";
import PageNotFound from "../404";

const Project = () => {
	const router = useRouter();
	const { params = [] } = router.query;

	// ? /projects/add
	if (params[0] === "add") {
		return <AddEditProject />;
	}
	// ? /project/<projectId>
	else if (params.length == 1) {
		return <ViewProject projectId={params[0]} />;
	}
	// ? /project/<projectId>/edit
	else if (params[1] === "edit" && params.length == 2) {
		return <AddEditProject projectId={params[0]} />;
	} else {
		return <PageNotFound />;
	}
};

export default Project;
