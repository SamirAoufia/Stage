import { ExclamationTriangleIcon} from "@radix-ui/react-icons"

interface FromerrorProps {
  message: string | undefined
}

export const FormError = ({
  message
}: FromerrorProps) => {
    if(!message) return null
  return (
    <div className="items-center bg-destructive/15 p-3 rounded-md flex gap-x-2 text-xl text-destructive justify-center mt-5">
      <ExclamationTriangleIcon className="h-4 w-4"/>
      <p>{message}</p>
    </div>
  )
}