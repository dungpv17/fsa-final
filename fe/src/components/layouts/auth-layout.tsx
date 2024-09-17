import { useUser } from "@/lib/auth";
import { Link } from "../ui/link";
import { useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";

type LayoutProps = {
  title: string;
} & PropsWithChildren;
function AuthLayout({ children, title }: LayoutProps) {
  const user = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate("/app", {
        replace: true,
      });
    }
  }, [user.data, navigate]);
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/">
              <img
                className="h-24 w-auto"
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F14185%2Freact&psig=AOvVaw1IAj2oMdKcTjmulk7_ocuV&ust=1726683372439000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCLvPvKyogDFQAAAAAdAAAAABAE"
                alt="Workflow"
              />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
