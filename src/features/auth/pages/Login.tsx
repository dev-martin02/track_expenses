import { LoginForm } from "../components/LoginForm"

export function Login() {
  return (
    <div className="container absolute flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
      </div>
    </div>
  )
} 