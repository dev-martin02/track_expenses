import { RegisterForm } from "../components/RegisterForm"

export function Register() {
  return (
    <div className="container absolute flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <RegisterForm />
      </div>
    </div>
  )
} 